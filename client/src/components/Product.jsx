import React from "react";

const Product = ({ productData }) => {
  return (
    <div className="w-full text-base">
      <img
        src={
          productData?.thumb ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFlhSWwrzGBZnqDlW7uLEEJWBhFc8sW_Ruw&s"
        }
        alt=""
        className="w-[240px] h-[240px] object-cover rounded-xl"
      />

      {/* Information of Product */}
      <div className="flex flex-col gap-2">
        <span>{productData?.title}</span>
        <span>{`${productData.price} VND`}</span>
      </div>
    </div>
  );
};

export default Product;
