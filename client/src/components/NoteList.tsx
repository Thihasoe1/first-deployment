import { useEffect, useState } from "react";
import { addNote, deleteNote, getNotes, updateNote } from "../services/todo";
import type { Note } from "../types/note";

function NoteList() {
  const [note, setNote] = useState<Note[]>([]);

  const [msg, setMsg] = useState("");

  const [refresh, setRefresh] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [editId, setEditId] = useState("");

  const handelModeChange = (title: string, id: string) => {
    setEditMode(true);
    setMsg(title);
    setEditId(id);
  };

  const makeRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchNote = async () => {
      const data = await getNotes();
      setNote(data);
    };
    fetchNote();
  }, [refresh]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (msg.trim().length === 0) {
      return;
    }
    try {
      if (editMode) {
        await updateNote(editId, msg);
      } else {
        await addNote(msg);
      }

      setMsg("");
      makeRefresh();
    } catch (error) {
      throw new Error(`failed to add note. ${error}`);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      makeRefresh();
    } catch (error) {
      throw Error(`failed to delete note ${error}`);
    }
  };

  return (
    <div>
      <h2>Note Lists</h2>
      <ul>
        {note.map((item) => (
          <li key={item._id}>
            {item.title}{" "}
            <button onClick={() => handelModeChange(item.title, item._id)}>
              Edit
            </button>
            <button onClick={() => handleDeleteNote(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form action="" onSubmit={submitHandler}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button>{editMode ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default NoteList;
