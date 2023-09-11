import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Todo } from "../models/todo";

export const storage = createJSONStorage(() => AsyncStorage);
// const content = JSON.stringify(false);
export const isAuthenticatedAtom = atomWithStorage("isAuth", false, storage);

export const newTodoAtom = atom<string>("");
export const newTodoDescriptionAtom = atom<string>("");
export const todosAtom = atom<Todo[]>([]);
export const storedTodosAtom = atomWithStorage<any[]>("todos", [], storage);

//---------------TODO FUNCTIONS-----------------------------//
const handleAdd = (
  todos: Todo[],
  title: string,
  description: string
): Todo[] => [...todos, { id: Date.now(), title, description, isDone: false }];

const handleComplete = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) =>
    todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
  );

const handleDelete = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);
//----------------------------------------------------------//

export const addTodoAtom = atom(
  () => "",
  (get, set) => {
    set(
      todosAtom,
      handleAdd(get(todosAtom), get(newTodoAtom), get(newTodoDescriptionAtom))
    );
    set(newTodoAtom, "");
    set(newTodoDescriptionAtom, "");
  }
);

export const completeTodoAtom = atom(
  () => "",
  (get, set, id: number) => {
    set(todosAtom, handleComplete(get(todosAtom), id));
  }
);

export const deleteTodoAtom = atom(
  () => "",
  (get, set, id: number) => {
    set(todosAtom, handleDelete(get(todosAtom), id));
  }
);
