import type { ModalProps } from "react-native";
import {
  Modal,
  Pressable,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { type FC, useCallback } from "react";
import { useAtom } from "jotai";

import Input from "./Input";
import Button from "./Button";
import { theme } from "../style/theme";
import { addTodoAtom, newTodoAtom } from "../store/states";

const AddTodoModal: FC<ModalProps> = ({
  onRequestClose,
  setVisible,
  ...rest
}) => {
  const { height } = useWindowDimensions();
  const [todo, setTodo] = useAtom(newTodoAtom);
  const [_, addTodo] = useAtom(addTodoAtom);

  const handleAddTask = useCallback(() => {
    addTodo();
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
        <Text style={{ color: theme.colors.body, marginBottom: 8 }}>
          Create task
        </Text>

        <Input
          icon="lock"
          placeholder="Enter a new task here"
          textAlign="center"
          value={todo}
          onChangeText={setTodo}
          style={{ textAlign: "justify", color: theme.colors.primary }}
          maxLength={50}
          autoFocus
        />

        <View style={{ height: theme.spacing.m }} />

        <Input
          icon="lock"
          placeholder="Describe your task here"
          textAlign="center"
          value={todo}
          onChangeText={setTodo}
          inputStyle={{ height: undefined }}
          multiline
          style={{ textAlign: "justify", color: theme.colors.primary }}
          maxLength={280}
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

        <Button
          label="Add Task"
          onPress={handleAddTask}
          style={{ alignSelf: "center" }}
        />
      </View>
    </Modal>
  );
};

export default AddTodoModal;
