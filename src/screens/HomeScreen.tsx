import {
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather as Icon } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { useAtom } from "jotai";

import { theme } from "../style/theme";
import TodoCard from "../components/TodoCard";
import AddTodoModal from "../components/AddTodoModal";
import { todosAtom } from "../store/states";

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
  const [todos] = useAtom(todosAtom);
  const [visible, setVisible] = useState(false);

  const { width } = useWindowDimensions();

  const hideModal = useCallback(() => setVisible(false), []);
  const showModal = useCallback(() => setVisible(true), []);

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
      <View style={styles.container}>
        <FlatList
          data={todos}
          renderItem={({ item }) => {
            return <TodoCard {...{ item }} />;
          }}
          ItemSeparatorComponent={showDivider}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 40 }}
        />

        <AddTodoModal
          visible={visible}
          setVisible={setVisible}
          // user={user}
          onRequestClose={hideModal}
        />

        <Pressable
          onPress={showModal}
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
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
      </View>
    </SafeAreaView>
  );
};
