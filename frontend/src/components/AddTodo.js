import { Input,Button, HStack } from "@chakra-ui/react";
import { useState } from "react";

const AddTodo = ({addTodo}) => {
    const [todo_name, setTodoName] = useState('');

    const handleAdd = () =>{

        addTodo(todo_name)
    }

    return(
        <HStack w='100%' mt='30px' gap='0'>
            <Input onChange={(e) => setTodoName(e.target.value)} placeholder='add your todo here...' bg='white' border='1px solid' borderColor='grey.300' borderRadius='8px 0 0 8px' />
            <Button onClick={handleAdd} bg='brown' color='white' _hover={{bg:'red.400'}} border='1px solid' borderColor='grey.300' borderRadius='0 8px 8px 0' >
                Add
            </Button>
        </HStack>
    )
}
export default AddTodo;