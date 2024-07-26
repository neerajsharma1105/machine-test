import {
  Button,
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
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, updateEmployee } from "../../../store/employeeSlice";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  hobby: Yup.string().required('Hobby is required'),
  gender: Yup.string().required('Gender is required'),
  status: Yup.string().required('Status is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

const Update = () => {
  const dispatch = useDispatch();
  const { email } = useParams()
  const employee = useSelector((state) => state.employee);
  const [initialValues, setInitialValues] = useState({
    name: "",
    hobby: "",
    gender: "",
    status: "",
    email: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const update = employee?.list?.find((val) => val?.email === email);
    if (update) {
      setInitialValues(update);
    }
  }, [email, employee]);
  return (
    <div>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(updateEmployee(values));
          navigate("/employee-list")
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting, errors, touched }) => (
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
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
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
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Hobby"
              name="hobby"
              id="hobby"
              size="small"
              value={values.hobby}
              onChange={handleChange}
              margin="normal"
              fullWidth
              error={touched.hobby && Boolean(errors.hobby)}
              helperText={touched.hobby && errors.hobby}
            />

            <FormControl component="fieldset" margin="normal" error={touched.gender && Boolean(errors.gender)}>
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
              {touched.gender && errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}
            </FormControl>

            <FormControl margin="normal" fullWidth error={touched.status && Boolean(errors.status)}>
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
              {touched.status && errors.status && <div style={{ color: 'red' }}>{errors.status}</div>}

            </FormControl>

            <div>
              <Button type="submit" disabled={isSubmitting} variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Update;
