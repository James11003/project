from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Todo
from .serializer import TodoSerializer
@api_view(['GET'])
def get_todos(request):
    todos= Todo.objects.all()[::-1]
    serializer = TodoSerializer(todos, many= True )

    return Response(serializer.data)

@api_view(['POST'])
def create_todo(request):
    data = request.data
    todo = Todo.objects.create(
        todo_name = data['todo_name']
    )

    serializer = TodoSerializer(todo, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def update_todo(request, pk):
    data = request.data
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response('error cant find todo')
    serializer = TodoSerializer(todo, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response('todo updated')
    return Response(serializer.errors)
@api_view(['DELETE'])
def delete_todo(request, pk):
    print(f"Attempting to delete todo with id: {pk}")  # Debugging line
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response('error: cannot find todo', status=404)
    todo.delete()
    return Response('todo has been deleted')
