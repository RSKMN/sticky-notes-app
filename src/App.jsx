import { useState, useEffect } from "react";
import NoteList from "components/NoteList.jsx";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Load from localStorage on start
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    if (editId) {
      setNotes(prev =>
        prev.map(note =>
          note.id === editId ? { ...note, title: form.title, content: form.content } : note
        )
      );
      setEditId(null);
    } else {
      const newNote = {
        id: uuidv4(),
        title: form.title,
        content: form.content,
        createdAt: new Date().toISOString()
      };
      setNotes([newNote, ...notes]);
    }

    setForm({ title: "", content: "" });
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditId(note.id);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-6">
        <h1 className="text-4xl font-extrabold text-center text-yellow-600 mb-6">
          📝 Sticky Notes
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <textarea
            placeholder="Write your note here..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full h-28 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            {editId ? "✅ Update Note" : "➕ Add Note"}
          </button>
        </form>

        <input
          type="text"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <NoteList notes={filteredNotes} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
