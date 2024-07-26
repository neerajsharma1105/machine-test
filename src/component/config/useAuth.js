import React, { useState } from "react";
import { useSelector } from "react-redux";
import Login from "../Pages/Login";

const useAuth = (Wrapper, allowedRoles) => {
  const employee = useSelector((state) => state.employee);

  return (props) => {
    const { role } = props;

    if (employee.isLogin) {
      if (allowedRoles.includes(role)) {
        return (
          <>
            <Wrapper {...props} />
          </>
        );
      }
    } else {
      return <Login />;
    }
  };
};

export default useAuth;
