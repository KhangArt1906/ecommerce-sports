import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Home, Public } from "./pages/public";
import path from "./utils/Path";
import { getCategories } from "./store/asyncAction";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="min-h-screen overflow-y-auto font-main">
      <Routes>
        {/* Route cha Public */}
        <Route path={path.PUBLIC} element={<Public />}>
          {/* Các route con của Public */}
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
