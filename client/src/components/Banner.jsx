import React from "react";
import bannerImage from "../assets/banner.jpg";
const Banner = () => {
  return (
    <div className="w-full">
      <img
        src={bannerImage}
        alt="Banner"
        className="w-full object-cover h-[400px]"
      />
    </div>
  );
};

export default Banner;
