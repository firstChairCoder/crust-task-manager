import type { ModalProps } from "react-native";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { useCallback } from "react";
import type { FC } from "react";
import { useAtom } from "jotai";

import Input from "./Input";
import Button from "./Button";
import { theme } from "../style/theme";
import {
  addTodoAtom,
  newTodoAtom,
  newTodoDescriptionAtom,
  storage,
  storedTodosAtom,
  todosAtom
} from "../store/states";
import type { Todo } from "../models/todo";

const styles = StyleSheet.create({
  bg: { height: "100%", position: "absolute", width: "100%" },
  modalContainer: {
    aspectRatio: 1.3,
    backgroundColor: theme.colors.lightGrey,
    borderColor: theme.colors.grey,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    bottom: 0,
    elevation: 5,
    padding: 16,
    position: "absolute",
    shadowColor: theme.colors.background,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "100%"
  },
  title: {
    ...theme.textVariants.header,
    color: theme.colors.background,
    marginBottom: 8
  },
  sub: {
    fontSize: 10,
    fontStyle: "italic",
    marginTop: theme.spacing.s
  }
});

interface TodoModalProps extends ModalProps {
  setVisible: any;
  isEditable?: boolean;
  viewId: number | null;
}

const TodoModal: FC<TodoModalProps> = ({
  onRequestClose,
  setVisible,
  isEditable = true,
  viewId = null,
  ...rest
}) => {
  const { height } = useWindowDimensions();
  const [todos] = useAtom(todosAtom);
  const [storedTodo] = useAtom(storedTodosAtom);
  const [todo, setTodo] = useAtom(newTodoAtom);
  const [description, setDescription] = useAtom(newTodoDescriptionAtom);
  const [_, addTodo] = useAtom(addTodoAtom);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const viewedTask = storedTodo?.filter((todo: Todo) => todo.id === viewId);

  const handleAddTask = useCallback(() => {
    addTodo();
    storage.setItem("todos", todos);
    setVisible(false);
  }, []);
  return (
    <Modal
      animationType="slide"
      transparent
      onRequestClose={onRequestClose}
      {...rest}
    >
      <Pressable style={styles.bg} onPress={onRequestClose} />
      <View style={[styles.modalContainer, { minHeight: height * 0.5 }]}>
        <Text style={styles.title}>
          {isEditable ? "Create task" : "View Task"}
        </Text>

        <Input
          icon="book-open"
          placeholder="Enter a new task here"
          placeholderTextColor={theme.colors.secondary}
          value={viewId ? viewedTask[0].title : todo}
          onChangeText={setTodo}
          inputStyle={[
            { height: undefined },
            viewId ? { borderColor: theme.colors.background } : {}
          ]}
          style={{
            color: theme.colors.primary,
            fontFamily: todo.length < 1 ? "Poppins" : "PoppinsBold",
            fontSize: todo.length < 1 ? undefined : 18
          }}
          multiline
          maxLength={50}
          autoFocus
          editable={isEditable}
        />

        <View style={{ height: theme.spacing.m }} />

        <Input
          icon="book-open"
          placeholder="Add a short description..."
          placeholderTextColor={theme.colors.secondary}
          value={viewId ? viewedTask[0].description : description}
          onChangeText={setDescription}
          inputStyle={[
            { height: undefined },
            viewId ? { borderColor: theme.colors.background } : {}
          ]}
          multiline
          style={{
            color: theme.colors.primary,
            fontFamily: "Poppins"
          }}
          maxLength={280}
          editable={isEditable}
        />
        <Text style={styles.sub}>Max 280 chars</Text>

        <View style={{ flex: 0.7 }} />

        {viewId ? null : (
          <Button
            label="Add Task"
            onPress={handleAddTask}
            style={{ alignSelf: "center" }}
          />
        )}
      </View>
    </Modal>
  );
};

export default TodoModal;
