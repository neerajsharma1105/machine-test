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
  const employee = useSelector((state) => state.employee);
  const [initialValues, setInitialValues] = useState({
    name: "",
    gender: "",
    status: "",
    email: "",
  });

  useEffect(() => {
    const update = employee?.list?.find((val) => val.email === employee.email);
    if (update) {
      setInitialValues(update);
    }
  }, [email, employee]);

  console.log();
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(addEmployee(values));
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              id="name"
              value={values.name}
              size="small"
              onChange={handleChange}
              margin="normal"
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              id="email"
              size="small"
              value={values.email}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />

            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <InputLabel id="status">Status</InputLabel>
              <Select
                size="small"
                labelId="status"
                id="status"
                name="status"
                value={values.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="InActive">InActive</MenuItem>
              </Select>
            </FormControl>

            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Update;
