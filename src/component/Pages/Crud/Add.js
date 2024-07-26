import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../../store/employeeSlice";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  gender: Yup.string().required('Gender is required'),
  status: Yup.string().required('Status is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
});
const Add = () => {

  const dispatch = useDispatch();

  return (
    <div>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={{ name: "", email: "", gender: "", status: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(addEmployee(values));
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Name"
                    name="name"
                    id="name"
                    size="small"
                    value={values.name}
                    onChange={handleChange}
                    margin="normal"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    size="small"
                    value={values.email}
                    onChange={handleChange}
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
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
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl margin="normal" sx={{ width: 230 }} error={touched.status && Boolean(errors.status)}>
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
                </Grid>
              </Grid>

              <div style={{ paddingBottom: 4 }}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Add;
