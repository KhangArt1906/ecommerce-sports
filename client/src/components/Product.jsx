import React, { useState } from "react";
import { formatedPrice } from "../utils/Helper";
import label from "../assets/label.png";
import trending from "../assets/trending.png";
import { numberStarRatings } from "../utils/Helper";
import { ChooseOption } from "./";
import icons from "../utils/Icons";

const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill } = icons;

const Product = ({ productData, isNew }) => {
  const [isOptionShow, setOptionShow] = useState(false);

  return (
    <div className="w-full text-base px-[10px]">
      <div
        className="w-full border rounded-xl p-[15px] flex flex-col items-center"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setOptionShow(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setOptionShow(false);
        }}
      >
        <div className="w-full relative">
          {/* Options Hover Product */}
          {isOptionShow && (
            <div className="absolute bottom-[10px] left-0 right-0 flex justify-center gap-2 animate-slide-top">
              <ChooseOption icon={<AiFillEye />} />
              <ChooseOption icon={<AiOutlineMenu />} />
              <ChooseOption icon={<BsFillSuitHeartFill />} />
            </div>
          )}
          <img
            src={
              productData?.thumb ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFlhSWwrzGBZnqDlW7uLEEJWBhFc8sW_Ruw&s"
            }
            alt="Thumb"
            className="w-[260px] h-[260px] object-cover rounded-xl mx-auto"
          />
          <img
            src={isNew ? label : trending}
            alt="Label Price"
            className="absolute top-0 right-[-20px] w-[100px] h-[35px] object-cover rounded-xl"
          />
        </div>

        {/* Information of Product */}
        <div className="flex flex-col mt-[15px] w-full items-start gap-1">
          <span className="flex h-4">
            {numberStarRatings(productData?.totalRatings)}
          </span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatedPrice(productData?.price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
