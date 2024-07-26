import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/employeeSlice";
import { Box, Button, TextField } from "@mui/material";

const validate = yup.object().shape({
  username: yup.string().required("Please Enter Eamil"),
  password: yup.string().required("Enter Name"),
});
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div style={{ paddingTop: "10%" }}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log({ values });
          if (
            values.username === "admin@gmail.com/admin" &&
            values.password === "123"
          ) {
            dispatch(setLogin(true));
            navigate("/employee-list");
          } else {
            navigate("/");
          }
        }}
      >
        {({ isSubmitting, setFieldValue, errors }) => {
          console.log({ errors });
          return (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <TextField
                  label="Email"
                  name="username"
                  id="username"
                  size="small"
                  onChange={(e) => {
                    setFieldValue("username", e.target.value);
                  }}
                  error={errors.username}
                  helperText={errors.username}
                />

                <TextField
                  label="Password"
                  name="password"
                  id="password"
                  size="small"
                  type="password"
                  onChange={(e) => {
                    setFieldValue("password", e.target.value);
                  }}
                />
                <div>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </div>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
