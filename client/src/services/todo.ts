import type { Note } from "../types/note";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_URL
    : import.meta.env.VITE_API_URL;

export const getNotes = async (): Promise<Note[]> => {
  const { data } = await axios.get(`${API_URL}/getTodos`);
  return data.todo;
  // const response = await fetch(`${API_URL}/getTodos`);
  // const data = await response.json();
  // return data.todo;
};

export const addNote = async (title: string) => {
  await axios.post(`${API_URL}/create`, { title });
  // const response = await fetch(`${API_URL}/create`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ title }),
  // });
  // const data = await response.json();
  // return data.todo;
};

export const updateNote = async (id: string, title: string) => {
  await axios.put(`${API_URL}/updateTodo/${id}`, { title });
  // const response = await fetch(`${API_URL}/updateTodo/${id}`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ title }),
  // });
  // const data = await response.json();

  // return data.todo;
};

export const deleteNote = async (id: string) => {
  // await fetch(`${API_URL}/deleteTodo/${id}`, {
  //   method: "DELETE",
  // });
  await axios.delete(id);
};
