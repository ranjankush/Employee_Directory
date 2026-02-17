import React, { useEffect, useState } from "react";

/**
 * SearchBar Component (Debounced)
 */
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [localValue, setLocalValue] = useState(searchTerm);

  // ✅ Sync parent state → local state
  useEffect(() => {
    setLocalValue(searchTerm);
  }, [searchTerm]);

  // ✅ Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localValue);
    }, 400);

    return () => clearTimeout(timer);
  }, [localValue, setSearchTerm]);

  return (
    <div className="relative">

      {/* Search Icon */}
      <div className="absolute left-4 top-3.5 text-gray-400 pointer-events-none">
        🔍
      </div>

      <input
        type="text"
        placeholder="Search by ID, name or department..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none
                   shadow-sm transition"
      />

      {/* Clear Button */}
      {localValue && (
        <button
          type="button"
          onClick={() => {
            setLocalValue("");
            setSearchTerm("");
          }}
          className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
