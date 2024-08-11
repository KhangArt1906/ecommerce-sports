import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../api/product";
import { Product } from "./";
import Slider from "react-slick";
import bannerSlider from "../assets/banner_slider.png";
import bannerSlider2 from "../assets/banner_slider_2.png";

const Tabs = [
  { id: 1, name: "Best Seller" },
  { id: 2, name: "New Arrivals" },
];

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [products, setProducts] = useState(null);

  const fetchProduct = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) {
      setBestSellers(response[0].products);
      setProducts(response[0].products);
    }

    if (response[1]?.success) {
      setNewProducts(response[1].products);
    }
  };

  // Fetch Product
  useEffect(() => {
    fetchProduct();
  }, []);

  // Fetch Product rely onClick activeTab
  useEffect(() => {
    if (activedTab === 1) setProducts(bestSellers);
    if (activedTab === 2) setProducts(newProducts);
  }, [activedTab]);

  return (
    <div>
      <div className="flex text-[20px] ml-[32px]">
        {Tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold font-main capitalize px-8 border-r cursor-pointer ${
              activedTab === el.id ? "text-black" : "text-gray-500"
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px] border-t-2 border-main pt-4">
        <Slider {...settings}>
          {products?.map((el) => (
            <Product
              key={el.id}
              pid={el.id}
              productData={el}
              isNew={activedTab === 1 ? false : true}
            />
          ))}
        </Slider>
      </div>

      {/* Banner */}
      <div className="w-full flex gap-4 mt-8">
        <img
          className="flex-1 object-contain w-[200px] h-[250px] rounded-xl"
          alt="banner"
          src={bannerSlider}
        />
        <img
          className="flex-1 object-contain w-[200px] h-[250px] rounded-xl"
          alt="banner"
          src={bannerSlider2}
        />
      </div>
    </div>
  );
};

export default BestSeller;
