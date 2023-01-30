import React from "react";

const Showcase = ({ images }) => {
  return (
    <div  className="flex justify-center items-center p-2 md:p-4 gap-4 flex-wrap max-w-7xl m-auto mt-8">
      {images.map((img) => (
        <img key={img.prompt} src={img.image}  className="w-11/12 max-w-xs rounded-md"  />
      ))}
    </div>
  );
};

export default Showcase;
