import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "./component/config/useAuth";
import Home from "./component/Pages/Home";
import Login from "./component/Pages/Login";
import List from "./component/Pages/Crud/List";
import NavBar from "./component/Layout/Navbar";
import { createContext, useState } from "react";
import { Provider, useSelector } from "react-redux";

import store from "./store/store";
import Update from "./component/Pages/Crud/Update";

export const EmployeeContext = createContext();

function App() {
  const EmployeeList = useAuth(List, ["user"]);
  const EmployeeEdit = useAuth(Update, ["user"]);

  return (
    <Provider store={store}>
      {" "}
      <div className="App">
        {<NavBar />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/employee-list"
              element={<EmployeeList role={"user"} />}
            />
            <Route path="/edit" element={<EmployeeEdit role={"user"} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
