from django.urls import path
from .views import get_todos, create_todo, update_todo, delete_todo  # Import correct functions

urlpatterns = [
    path('todos/', get_todos),
    path('create/', create_todo),
   
    path('update/<int:pk>/', update_todo,),  
    path('delete/<int:pk>/', delete_todo),

]
