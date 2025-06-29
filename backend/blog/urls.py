from django.urls import path, include
from .views import BlogListCreateView, BlogDetailDeleteView, CommentListCreateView, SignupView, MyBlogView, BlogByCategoryView,  GenerateContentView, MeView, run_migrations


urlpatterns = [
    path('blogs/', BlogListCreateView.as_view()),
    path('blogs/<int:pk>/', BlogDetailDeleteView.as_view()),
    path('blogs/category/<str:category>/', BlogByCategoryView.as_view(), name='blogs-by-category'),
    path('myblogs/', MyBlogView.as_view(), name = 'myblogs'),
    path('blogs/<int:pk>/comments/', CommentListCreateView.as_view()),
    path('signup/', SignupView.as_view(), name='signup'),
    path('me/', MeView.as_view(), name='me'),
    path('run-migrations/', run_migrations, name='run_migrations'),
    path('generate/', GenerateContentView.as_view()),
]