from django.contrib import admin
from .models import Blog, Comment


admin.site.site_header = "SmartBlog Admin"
admin.site.site_title = "SmartBlog Admin Panel"
admin.site.index_title = "Manage SmartBlog Content"

# Register your models here.
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['title', 'author__username']
    ordering = ['-created_at']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['name', 'text', 'blog', 'created_at']
    search_fields = ['name', 'text']