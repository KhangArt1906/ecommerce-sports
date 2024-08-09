import React from "react";
import { navigation } from "../utils/Constants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-main h-[48px] py-2 border-y mb-6 text-sm flex items-center">
      {navigation.map((el) => (
        <NavLink
          to={el.path}
          key={el.id}
          className={({ isActive }) =>
            isActive
              ? "pr-12 hover:text-[#4dac8b] text-[#4dac8b]"
              : "pr-12 hover:text-[#4dac8b]"
          }
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;
