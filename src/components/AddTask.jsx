import { useState } from "react";

function AddTask({ onAdd }) {
  const [task, setTask] = useState("");

  const handleSubmit = () => {
    if (task.trim() === "") return;
    onAdd(task);
    setTask("");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-6">
      <input
        type="text"
        placeholder="أدخل مهمة جديدة"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full sm:w-auto flex-1 rounded-full bg-orange-100 border border-orange-300 text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
      />
      <button
        onClick={handleSubmit}
        className="w-full sm:w-auto rounded-full bg-orange-700 hover:bg-orange-600 text-white px-6 py-2 transition"
      >
        إضافة
      </button>
    </div>
  );
}

export default AddTask;
