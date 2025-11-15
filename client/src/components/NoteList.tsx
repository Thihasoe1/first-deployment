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
      <ul>
        {note.map((item) => (
          <li key={item._id} className="flex items-center gap-2 mb-4">
            <p className="font-semibold">{item.title}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handelModeChange(item.title, item._id)}
                className="text-amber-500 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteNote(item._id)}
                className="text-red-500 underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <form action="" onSubmit={submitHandler} className="space-x-2">
        <input
          type="text"
          value={msg}
          className="border p-2 text-sm"
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2 border border-black text-sm">
          {editMode ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default NoteList;
