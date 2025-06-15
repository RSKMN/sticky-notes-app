function Note({ note, onEdit, onDelete }) {
  const colors = ['bg-yellow-100', 'bg-pink-100', 'bg-green-100', 'bg-blue-100', 'bg-purple-100'];
  const randomColor = colors[note.id.charCodeAt(0) % colors.length];

  return (
    <div
      className={`${randomColor} transform rotate-[-1deg] hover:rotate-0 transition-all duration-200 p-4 rounded-xl shadow-md mb-4 break-words relative`}
    >
      <h2 className="text-xl font-bold mb-1 text-gray-800">{note.title}</h2>
      <p className="text-gray-700">{note.content}</p>
      <div className="absolute bottom-2 right-2 flex gap-2 text-sm">
        <button
          className="text-blue-600 hover:underline font-semibold"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>
        <button
          className="text-red-600 hover:underline font-semibold"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default Note;
