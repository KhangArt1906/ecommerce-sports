import React from "react";

const ChooseOption = ({ icon }) => {
  return (
    <div className="w-10 h-10 bg-white rounded-full border shadow-md flex justify-center items-center hover:bg-gray-800 hover:text-white cursor-pointer hover:border-gray-800">
      {icon}
    </div>
  );
};

export default ChooseOption;
