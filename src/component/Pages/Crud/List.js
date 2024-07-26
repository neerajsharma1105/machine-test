import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { EmployeeContext } from "../../../App";
import { Edit } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { removeEmployee, setOpen } from "../../../store/employeeSlice";
import Model from "../../Model";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

export default function List() {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee);
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();
  const [model, setModel] = React.useState(false);

  console.log(employee);
  const handleDelete = (email) => {
    dispatch(removeEmployee(email));
    // setStore(update);
  };
  return (
    <Box
      sx={{
        padding: 4,
      }}
    >
      <Button
        onClick={() => {
          setModel(true);
        }}
      >
        Add Employee
      </Button>
      {model && <Add email={email} />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "gray", color: "#ffffff" }}>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee?.list?.map((row) => (
              <TableRow key={row.email}>
                <TableCell align="left">{row?.name}</TableCell>
                <TableCell align="left">{row?.email}</TableCell>
                <TableCell align="left">{row?.gender}</TableCell>
                <TableCell align="left">{row?.status}</TableCell>
                <TableCell align="left">
                  <CreateIcon
                    color="info"
                    onClick={() => {
                      navigate("/edit");
                    }}
                  />
                </TableCell>
                <TableCell align="left">
                  <DeleteIcon
                    onClick={() => {
                      setEmail(row.email);
                      dispatch(setOpen(true));
                      //   handleDelete(row.email);
                    }}
                    color="error"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Model email={email} />
    </Box>
  );
}
