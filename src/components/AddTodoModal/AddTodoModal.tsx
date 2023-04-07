import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTodoState } from "../../store/todoReducer";
import { validateInput } from "../../utils/validateInput";
import { postTodo } from "../../store/actions";

const USER_ID = 1;

const AddTodoModal = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(getTodoState);

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setInputError("");
      setInputValue("");
    }
  }, [isOpen]);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const onAdd = () => {
    const { isValid, errorText } = validateInput(inputValue);
    if (!isValid) {
      setInputError(errorText);
      return;
    }

    dispatch(postTodo({ userId: USER_ID, completed: false, title: inputValue }));
    setIsOpen(false);
  };

  const isError = inputError.length > 0;

  return (
    <>
      <Flex justifyContent="flex-end" mt={10}>
        <Button
          colorScheme="teal"
          size="md"
          onClick={onOpen}
          isDisabled={loading}
          data-testid="open-modal-button"
        >
          Add new
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new task here</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter the task..."
              isInvalid={isError}
              autoFocus
            />
            {isError && (
              <Text color="red.500" fontSize={13}>
                {inputError}
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onAdd} data-testid="add-new-button">
              Add new task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTodoModal;
