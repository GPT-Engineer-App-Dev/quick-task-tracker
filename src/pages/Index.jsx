import { useState } from "react";
import { Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, Text } from "@chakra-ui/react";
import { FaTrash, FaCheckCircle } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: inputValue, isCompleted: false }]);
      setInputValue("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      }),
    );
  };

  return (
    <Container centerContent maxW="container.md" padding={4}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">
          Todo App
        </Text>
        <Input placeholder="Add a new task..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTodo()} />
        <Button colorScheme="blue" onClick={handleAddTodo}>
          Add Task
        </Button>
        <List spacing={3} width="100%">
          {todos.map((todo) => (
            <ListItem key={todo.id} display="flex" justifyContent="space-between" alignItems="center">
              <Text as={todo.isCompleted ? "s" : ""}>{todo.text}</Text>
              <div>
                <IconButton icon={<FaCheckCircle />} aria-label="Complete Task" colorScheme={todo.isCompleted ? "green" : "gray"} onClick={() => handleToggleComplete(todo.id)} />
                <IconButton icon={<FaTrash />} aria-label="Delete Task" colorScheme="red" marginLeft={2} onClick={() => handleDeleteTodo(todo.id)} />
              </div>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
