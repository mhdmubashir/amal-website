import React, { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  const [input, setInput] = useState(value);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="mb-4 flex justify-center">
      <input
        type="text"
        value={input}
        onChange={handleInput}
        placeholder={placeholder || "Search..."}
        className="w-full max-w-md px-4 py-2 border rounded shadow"
      />
    </div>
  );
};

export default SearchBar;
