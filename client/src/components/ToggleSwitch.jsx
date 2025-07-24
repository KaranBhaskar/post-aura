import React from "react";

export default function ToggleSwitch({ isOn, handleToggle, id = "toggle" }) {
  return (
    <label
      htmlFor={id}
      className={`relative inline-flex h-8 w-14 cursor-pointer items-center rounded-full p-1 transition-colors duration-200 ${
        isOn ? "bg-green-500" : "bg-gray-300"
      }`}
      aria-live="polite"
    >
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        role="switch"
        aria-checked={isOn}
        checked={isOn}
        onChange={handleToggle}
      />
      <span
        className={`h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></span>
    </label>
  );
}
