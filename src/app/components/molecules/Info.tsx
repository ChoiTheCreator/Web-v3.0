import React from "react";

interface InfoProps {
  folderName: string;
  professorName: string;
}

const Info: React.FC<InfoProps> = ({ folderName, professorName }) => {
  return (
    <div className="px-6 py-3">
      <h1 className="text-xl font-semibold text-white">{folderName}</h1>
      <p className="text-gray-400">{professorName}</p>
    </div>
  );
};

export default Info;
