import { useState, useEffect } from "react";
import Header from "./components/Header";
import DaySelector from "./components/DaySelector";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import "./index.css";

const daysOfWeek = [
  "1 السبت", "2 الأحد", "3 الإثنين", "4 الثلاثاء", "5 الأربعاء", "6 الخميس", "7 الجمعة",
  "8 السبت", "9 الأحد", "10 الإثنين", "11 الثلاثاء", "12 الأربعاء", "13 الخميس", "14 الجمعة",
  "15 السبت", "16 الأحد", "17 الإثنين", "18 الثلاثاء", "19 الأربعاء", "20 الخميس", "21 الجمعة",
  "22 السبت", "23 الأحد", "24 الإثنين", "25 الثلاثاء", "26 الأربعاء", "27 الخميس", "28 الجمعة",
  "29 السبت", "30 الأحد", "31 الإثنين"
];

const getCurrentDay = () => {
  const dayOfMonth = new Date().getDate();
  return daysOfWeek[dayOfMonth - 1];
};

function App() {
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasksByDay")) || {};
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if (Object.keys(tasks).length > 0) {
      localStorage.setItem("tasksByDay", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAdd = (task) => {
    if (task.trim() === "") return;
    setTasks((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), { text: task, completed: false }]
    }));
  };

  const handleDelete = (index) => {
    const updatedTasks = [...(tasks[selectedDay] || [])];
    updatedTasks.splice(index, 1);
    setTasks((prev) => ({
      ...prev,
      [selectedDay]: updatedTasks
    }));
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = [...(tasks[selectedDay] || [])];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks((prev) => ({
      ...prev,
      [selectedDay]: updatedTasks
    }));
  };

  const handleEdit = (index, newText) => {
    const updatedTasks = [...(tasks[selectedDay] || [])];
    updatedTasks[index].text = newText;
    setTasks((prev) => ({
      ...prev,
      [selectedDay]: updatedTasks
    }));
  };

  const areAllTasksCompleted = tasks[selectedDay]?.every(task => task.completed);

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center px-4 py-8 ">
      <div className="w-full max-w-3xl space-y-6 bg-white shadow-lg rounded-xl p-6">
        <Header />
        <DaySelector days={daysOfWeek} selected={selectedDay} onSelect={setSelectedDay} />
        <AddTask onAdd={handleAdd} />
        <TaskList
          tasks={tasks[selectedDay] || []}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
          allCompleted={areAllTasksCompleted}
        />
      </div>
    </div>
  );
}

export default App;
