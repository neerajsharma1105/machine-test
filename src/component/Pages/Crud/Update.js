import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../../store/employeeSlice";

const Update = ({ email }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    gender: "",
    status: "",
    email: "",
  });

  const employee = useSelector((state) => state.employee);

  useEffect(() => {
    const update = employee?.list?.filter((val) => val.email === email);
    console.log({ update });
    setData(...update);
  }, [email]);

  return (
    <div>
      {" "}
      <Formik
        initialValues={data}
        onSubmit={(values) => {
          dispatch(addEmployee(values));
          //   setData({});
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Form>
              <TextField
                label="Name"
                name="name"
                id="name"
                value={data?.name}
                size="small"
                onChange={(e) => {
                  setFieldValue("name", e.target.value);
                }}
              />

              <TextField
                label="Email"
                name="email"
                id="email"
                size="small"
                value={data?.email}
                onChange={(e) => {
                  setFieldValue("email", e.target.value);
                }}
              />

              <FormLabel id="gender">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="gender"
                name="gender"
                label="Gender"
                onChange={(e) => {
                  setFieldValue("gender", e.target.value);
                }}
              >
                <FormControlLabel
                  value={data?.gender === "female" ? true : false}
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value={data.gender === "male" ? true : false}
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>

              <FormControl sx={{ width: 300 }}>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  size="small"
                  labelId="status"
                  id="status"
                  name="status"
                  value={data?.status}
                  label="Status"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setFieldValue("status", e.target.value);
                  }}
                >
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"InActive"}>InActive</MenuItem>
                </Select>
              </FormControl>

              <div>
                <button type="submit">submit</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Update;
