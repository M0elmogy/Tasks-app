function DaySelector({ days, selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 p-4">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => onSelect(day)}
          className={`py-2 px-4 rounded-full text-sm font-semibold transition-all duration-200
            ${selected === day
              ? "bg-orange-700 text-white shadow-md scale-105"
              : "bg-orange-300 hover:bg-orange-500 text-black"}
          `}
        >
          {day}
        </button>
      ))}
    </div>
  );
}

export default DaySelector;
