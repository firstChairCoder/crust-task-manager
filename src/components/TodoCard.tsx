import { type FC, useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAtom } from "jotai";
import { Feather as Icon } from "@expo/vector-icons";

import type { Todo } from "../models/todo";
import { theme } from "../style/theme";
import { completeTodoAtom, deleteTodoAtom } from "../store/states";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    aspectRatio: 6,
    backgroundColor: theme.colors.lightGrey,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    paddingLeft: 8,
    width: "100%"
  },
  checkCircle: {
    alignItems: "center",
    aspectRatio: 1,
    borderColor: theme.colors.primary,
    borderRadius: 16,
    borderWidth: 2,
    height: "60%",
    justifyContent: "center"
  },
  titleWrapper: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    height: "100%"
  },
  deleteWrapper: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    height: "100%",
    justifyContent: "center",
    width: 40,
    zIndex: 10
  }
});
interface TaskCardProps {
  item: Todo;
  onPress: (id: number) => void;
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
    <View style={styles.container}>
      <Pressable style={styles.checkCircle} onPress={handleComplete}>
        {item.isDone ? (
          <Icon name="check" size={20} color={theme.colors.background} />
        ) : null}
      </Pressable>
      <Pressable style={styles.titleWrapper} onPress={() => onPress(item.id)}>
        <Text
          numberOfLines={1}
          style={{
            ...theme.textVariants.body,
            includeFontPadding: false,
            flex: 1,
            color: theme.colors.body2,
            marginHorizontal: 16,
            textDecorationLine: item.isDone ? "line-through" : "none"
          }}
        >
          {item.title}
        </Text>
      </Pressable>

      <View style={styles.deleteWrapper}>
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
