import { type FC, useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { useAtom } from "jotai";
import { Feather as Icon } from "@expo/vector-icons";

import type { Todo } from "../models/todo";
import { theme } from "../style/theme";
import { completeTodoAtom, deleteTodoAtom } from "../store/states";

interface TaskCardProps {
  item: Todo;
  // user: User;
}
const TodoCard: FC<TaskCardProps> = ({ item, onPress }) => {
  const [_, deleteTodo] = useAtom(deleteTodoAtom);
  const [, setIsComplete] = useAtom(completeTodoAtom);

  const handleDelete = useCallback(() => {
    deleteTodo(item.id);
  }, []);

  const handleComplete = useCallback(() => {
    setIsComplete(item.id);
  }, []);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.colors.lightGrey,
        borderRadius: 16,
        paddingLeft: 8,
        aspectRatio: 6,
        width: "100%",
        overflow: "hidden"
      }}
    >
      <Pressable
        style={{
          height: "60%",
          aspectRatio: 1,
          borderRadius: 16,
          borderWidth: 2,
          borderColor: theme.colors.primary,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={handleComplete}
      >
        {item.isDone ? (
          <Icon name="check" size={20} color={theme.colors.background} />
        ) : null}
      </Pressable>
      <Pressable
        style={{
          flex: 1,
          flexDirection: "row",
          height: "100%",
          alignItems: "center"
        }}
        onPress={onPress}
      >
        <Text
          numberOfLines={1}
          style={{
            ...theme.textVariants.body,
            includeFontPadding: false,
            // textAlignVertical: "center",
            // alignSelf: "center",
            flex: 1,
            color: theme.colors.body2,
            marginHorizontal: 16,
            // paddingVertical: "100%",
            textDecorationLine: item.isDone ? "line-through" : "none"
          }}
        >
          {item.title}
        </Text>
      </Pressable>

      <View
        style={{
          height: "100%",
          width: 40,
          zIndex: 10,
          backgroundColor: theme.colors.primary,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Icon
          name="x-circle"
          size={24}
          color={theme.colors.danger}
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};

export default TodoCard;
