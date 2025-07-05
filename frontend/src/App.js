import { ChakraProvider, Flex, VStack } from '@chakra-ui/react';
import Title from './components/Title';
import TodoList from './components/TodoList';
import {useState, useEffect } from 'react';
import { get_todos, create_todo, delete_todo} from './api/endpoints';
import AddTodo from './components/AddTodo';


function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await get_todos();
      setTodos(todos);
      
    }
    fetchTodos();

  }, [])
  const addTodo = async (todo_name) => {
    const todo = await create_todo(todo_name);
    setTodos([todo, ...todos])
  }

  const deleteTodo = async (id) => {
    await delete_todo(id);
    setTodos(todos.filter((todo)=> todo.id !== id))
  }

  return (
    <ChakraProvider>
      <Flex minH='100vh' w='100vw' bg='burlywood' justifyContent='center'>
        <VStack w='92%' maxW='600px' mt='50px'>
          <Title/>
          <AddTodo addTodo = {addTodo} />
          <TodoList todos= {todos} deleteTodo={deleteTodo} />
        </VStack>
      </Flex>

    </ChakraProvider>
  );
}

export default App;
