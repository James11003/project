import { Flex, HStack, Checkbox, Text, IconButton, Button, useDisclosure, Input } from "@chakra-ui/react";
import { MdEditNote } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { update_todo } from "../api/endpoints";
import { useState, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'


const Todo = ({id, todo_name, completed, deleteTodo }) => {
    const [clientTodoName, setClientTodoName]= useState(todo_name);
    const [clientCompleted, setClientCompleted] = useState(completed);
    
    const handleComplete = async() => {
        await update_todo(id, {'completed':!clientCompleted});
        setClientCompleted(!clientCompleted);
    }

    const handleDelete = async () => {
        await deleteTodo(id);
    }

    const handleUpdate = async (name) => {
        await update_todo(id, {'todo_name': name});
        setClientTodoName(name);
    }

    return(
        <Flex bg='white' w='100%' border='1px solid' borderRadius='8px' borderColor='black' p='20px 20px'> 
            <HStack w='100%' justifyContent='space-between' gap='20px'>
                <Checkbox onChange={handleComplete} isChecked={clientCompleted}  />
                <Text>
                    {clientTodoName}
                </Text>
                <HStack gap='18px'>
                    <TodoUpdate todo_name={clientTodoName} handleUpdate={handleUpdate}/>
                    <IconButton onClick={handleDelete} icon={<RiDeleteBin5Fill size='18px' />}/>
                </HStack>                
            </HStack>
        </Flex>
    )
}

const TodoUpdate = ({ todo_name, handleUpdate }) => {
    const [inputName, setName] = useState(todo_name);
    const { isOpen, onOpen, onClose } = useDisclosure();

    // When modal opens, reset inputName to the initial todo_name
    useEffect(() => {
        if (isOpen) {
            setName(todo_name);
        }
    }, [isOpen, todo_name]);

    const handleCancel = () => {
        setName(todo_name);  // Reset changes if user cancels
        onClose();           // Close the modal
    };

    return (
      <>
        <IconButton onClick={onOpen} icon={<MdEditNote size='18px'/>}/>
        <Modal isCentered={true} isOpen={isOpen} onClose={handleCancel}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update this Todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Input value={inputName} onChange={(e) => setName(e.target.value)} />
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={() => { handleUpdate(inputName); onClose(); }} bg='brown' _hover={{bg:'red.300'}} color='white' mr={3}>
                save
              </Button>
              <Button onClick={handleCancel} variant='ghost'>cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default Todo;
