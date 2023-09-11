import type { ModalProps } from "react-native";
import {
  Modal,
  Pressable,
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

interface TodoModalProps extends ModalProps {
  setVisible: any;
  isEditable?: boolean;
  viewId?: number;
}

const TodoModal: FC<TodoModalProps> = ({
  onRequestClose,
  setVisible,
  isEditable = true,
  viewId,
  ...rest
}) => {
  const { height } = useWindowDimensions();
  const [todos] = useAtom(todosAtom);
  const [storedTodo, setStoredTodo] = useAtom(storedTodosAtom);
  const [todo, setTodo] = useAtom(newTodoAtom);
  const [description, setDescription] = useAtom(newTodoDescriptionAtom);
  const [_, addTodo] = useAtom(addTodoAtom);

  const viewedTask = storedTodo?.filter((todo) => todo.id === viewId);

  console.log("any viewers ", viewedTask);

  // console.log("any todos ", todos);
  // console.log("any stored here ", storedTodo);
  // console.log("todo update? ", todo, ".... ", description);

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
      <Pressable
        style={{
          position: "absolute",
          // backgroundColor: "rgba(0,0,0,0.4)",
          width: "100%",
          height: "100%"
        }}
        onPress={onRequestClose}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: theme.colors.lightGrey,
          padding: 16,
          aspectRatio: 1.3,
          borderWidth: 1,
          borderColor: theme.colors.grey,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          width: "100%",
          minHeight: height * 0.5,
          shadowColor: theme.colors.background,
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5
        }}
      >
        <Text
          style={{
            ...theme.textVariants.header,
            color: theme.colors.background,
            marginBottom: 8
          }}
        >
          {isEditable ? "Create task" : "View Task"}
        </Text>

        <Input
          icon="book-open"
          placeholder="Enter a new task here"
          placeholderTextColor={theme.colors.secondary}
          // textAlign="center"
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
            // justifyContent: "center"
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
        <Text
          style={{
            fontSize: 10,
            marginTop: theme.spacing.s,
            fontStyle: "italic"
          }}
        >
          Max 280 chars
        </Text>

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
