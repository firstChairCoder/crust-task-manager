import { atom } from "jotai";

import type { Todo } from "../models/todo";

export const isAuthenticatedAtom = atom<boolean>(false);

export const searchQueryAtom = atom<string>("");
export const searchInputHasFocusAtom = atom<boolean>(false);

export const newTodoAtom = atom<string>("");
export const todosAtom = atom<Todo[]>([]);

//---------------TODO FUNCTIONS-----------------------------//
const handleAdd = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  { id: Date.now(), todo: text, isDone: false }
];

const handleUpdate = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((task) => ({
    ...task,
    todo: task.id === id ? text : task.todo
  }));

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
    set(todosAtom, handleAdd(get(todosAtom), get(newTodoAtom)));
    set(newTodoAtom, "");
  }
);

export const updateTodoAtom = atom(
  () => "",
  (get, set, { id, text }: { id: number; text: string }) => {
    set(todosAtom, handleUpdate(get(todosAtom), id, text));
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
