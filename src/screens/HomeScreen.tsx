import {
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets
} from "react-native-safe-area-context";
import { Feather as Icon } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { useAtom } from "jotai";

import { theme } from "../style/theme";
import TodoCard from "../components/TodoCard";
import { storedTodosAtom, todosAtom } from "../store/states";
import { TodoModal } from "../components";

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.m
  }
});

export const HomeScreen = () => {
  const [todos, setTodos] = useAtom(todosAtom);
  const [storedTodos, setStoredTodos] = useAtom(storedTodosAtom);
  const [visible, setVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [viewId, setViewId] = useState<number | null>(null);

  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const hideModal = useCallback(() => setVisible(false), []);
  const showModal = useCallback(() => {
    setIsEditable(true);
    setViewId(null);
    setVisible(true);
  }, []);
  // const showModalWithValues = useCallback((id: number) => {

  // }, [])

  console.log("testingn storage ", storedTodos, " and norms ", todos);

  useEffect(() => {
    if (todos.length > 0) {
      setStoredTodos(todos);
    } else {
      setTodos(storedTodos);
    }
  }, [todos]);

  const showDivider = useCallback(
    () => (
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          width,
          marginVertical: theme.spacing.s,
          backgroundColor: theme.colors.grey
        }}
      />
    ),
    []
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({ item }) => {
          return (
            <TodoCard
              {...{ item }}
              onPress={() => {
                setIsEditable(false);
                setVisible(true);
                setViewId(item.id);
              }}
            />
          );
        }}
        ItemSeparatorComponent={showDivider}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 40 }}
      />

      <TodoModal
        visible={visible}
        setVisible={setVisible}
        isEditable={isEditable}
        onRequestClose={hideModal}
        viewId={viewId}
      />

      <Pressable
        onPress={showModal}
        style={{
          position: "absolute",
          bottom: bottom + 16,
          right: theme.spacing.m,
          justifyContent: "center",
          alignItems: "center",
          height: visible ? 0 : 56,
          width: visible ? 0 : 56,
          backgroundColor: theme.colors.primary,
          borderRadius: 28,
          overflow: "hidden"
        }}
      >
        <Icon name="plus" color={theme.colors.body} size={34} />
      </Pressable>
    </SafeAreaView>
  );
};
