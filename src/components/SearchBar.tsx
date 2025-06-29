import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
    const [input, setInput] = useState(value);
    const { theme } = useTheme();

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
                className={`w-full max-w-md px-4 py-2 border rounded shadow outline-none transition
                    ${theme.background} ${theme.text}
                    border-gray-300 focus:border-green-500
                    placeholder-gray-400
                `}
                style={{
                    backgroundColor: theme.background === "bg-white" ? "#fff" : "#222",
                    color: theme.text === "text-gray-800" ? "#222" : "#fff"
                }}
            />
        </div>
    );
};

export default SearchBar;
