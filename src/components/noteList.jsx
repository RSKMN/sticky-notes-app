import Note from './note.jsx';

function NoteList({ notes, onEdit, onDelete }) {
  if (!notes.length)
    return <p className="text-gray-500 text-center italic">No notes yet. Start writing!</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map(note => (
        <Note key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
export default NoteList;
