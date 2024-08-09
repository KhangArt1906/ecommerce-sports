import React from "react";
import logo from "../assets/logo.png";
import icons from "../utils/Icons";
import { Link } from "react-router-dom";
import path from "../utils/Path";

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;

const Header = () => {
  return (
    <div className="w-main flex justify-between h-[110px] py-[35px]">
      {/* Image Logo */}
      <Link to={`/${path.HOME}`}>
        <img
          src={logo}
          className="w-[300px] h-[150px] object-contain translate-y-[-50px] translate-x-[30px]"
          alt="Logo"
        />
      </Link>
      {/* Contact */}
      <div className="flex text-[13px]">
        {/* Flex 1: Contact*/}
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-4 items-center">
            <RiPhoneFill color="green" />
            <span className="font-semibold">(+84)987 360 767</span>
          </span>
          <span>Mon-Sun 09:00 AM - 21:00 PM</span>
        </div>
        {/* Flex 2: Information Email */}
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-4 items-center">
            <MdEmail color="green" />
            <span className="font-semibold">KEWTIEE@GMAIL.COM</span>
          </span>
          <span>Support 24/7 send email</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-6 border-r">
          <BsHandbagFill color="green" />
          <span>0 item(s)</span>
        </div>
        <div className="flex items-center justify-center px-6">
          <FaUserCircle size={24} />
        </div>
      </div>
    </div>
  );
};

export default Header;
