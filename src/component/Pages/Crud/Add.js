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

const Add = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Formik
        initialValues={{ name: "", email: "", gender: "", status: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(addEmployee(values));
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
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
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
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
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl margin="normal" sx={{ width: 230 }}>
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
