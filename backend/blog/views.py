from django.shortcuts import render
from django.core.management import call_command
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from .models import Blog, Comment
from .serializers import BlogSerializer, CommentSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .permissions import IsAuthorOwner
import google.generativeai as genai
from django.conf import settings


# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])  # optional: restrict later
def run_migrations(request):
    try:
        call_command('makemigrations', interactive=False)
        call_command('migrate', interactive=False)
        return JsonResponse({'message': 'Migrations ran successfully.'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    

genai.configure(api_key=settings.GEMINI_API_KEY)

class GenerateContentView(APIView):
    def post(self, request):
        title = request.data.get("title")
        if not title:
            return Response({"error": "Title is required"}, status=400)

        try:
            model = genai.GenerativeModel("models/gemini-1.5-flash")
            response = model.generate_content(f"Write a high-quality blog post on: {title}")
            return Response({"content": response.text})
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username
        })
    
class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error':"Username and Password required"}, status=400)
        
        if User.objects.filter(username=username).exists():
            return Response({'error':"Username already taken"}, status=400)
        
        user = User.objects.create_user(username=username,password=password)

        refresh = RefreshToken.for_user(user)


        return Response({'message':'User created succesfully','access':str(refresh.access_token),'refresh':str(refresh)}, status=201)



class BlogListCreateView(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)

class BlogByCategoryView(generics.ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        category = self.kwargs['category']
        return Blog.objects.filter(category=category)

class MyBlogView(generics.ListAPIView):
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print("User:", self.request.user)
        return Blog.objects.filter(author = self.request.user)


class BlogDetailDeleteView(generics.RetrieveDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOwner]


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(blog_id = self.kwargs['pk'])
    def perform_create(self,serializer):
        blog_id = self.kwargs['pk']
        serializer.save(blog_id = blog_id)

