import React from "react";

const Button = ({ primary, text, clickHandler }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        clickHandler();
      }}
      className={`px-2 md:px-4 py-2 font-inter font-normal md:font-medium rounded text-center cursor-pointer ${
        primary ? "bg-purple-600 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
