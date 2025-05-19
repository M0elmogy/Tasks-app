import { useState } from "react";

function TaskList({ tasks, onDelete, onEdit, onToggleComplete, allCompleted }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleToggleComplete = (index) => {
    onToggleComplete(index);
  };

  const handleEdit = (index, currentText) => {
    setEditingIndex(index);
    setEditedText(currentText);
  };

  const handleSaveEdit = (index) => {
    if (editedText.trim() !== "") {
      onEdit(index, editedText);
      setEditingIndex(null);
      setEditedText("");
    }
  };

  return (
    <div className="mt-8 w-full">
      <div
        className={`flex justify-between items-center px-4 py-3 mb-4 rounded-lg shadow-md ${
          allCompleted ? "bg-green-300" : "bg-orange-100"
        }`}
      >
        <span className="font-bold text-lg text-gray-800">مهام اليوم</span>
      </div>

      <ul className="space-y-3">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 py-3 rounded-lg shadow-md transition ${
              task.completed ? "bg-green-100" : "bg-orange-50"
            }`}
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(index)}
                className="h-5 w-5 accent-orange-600"
              />
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="border border-orange-300 rounded px-2 py-1 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              ) : (
                <span
                  className={`text-gray-800 text-sm font-medium break-words ${
                    task.completed ? "line-through text-green-600" : ""
                  }`}
                >
                  {task.text}
                </span>
              )}
            </div>

            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => onDelete(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                حذف
              </button>
              {editingIndex === index ? (
                <button
                  onClick={() => handleSaveEdit(index)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  حفظ
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(index, task.text)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  تعديل
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
