import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../api/product";
import { Product } from "./";
import Slider from "react-slick";

const Tabs = [
  { id: 1, name: "Best Seller" },
  { id: 2, name: "New Arrivals" },
];

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activedTab, setActivedTab] = useState(1);

  const fetchProduct = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) setBestSellers(response[0].products);
    if (response[1]?.success) setNewProducts(response[1].products);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
        {Tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold font-main capitalize border-r cursor-pointer ${
              activedTab === el.id ? "text-black" : "text-gray-500"
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <Slider {...settings}>
          {bestSellers?.map((el) => (
            <Product key={el.id} productData={el} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSeller;
