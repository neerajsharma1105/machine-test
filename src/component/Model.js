import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { removeEmployee, setOpen } from "../store/employeeSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Model({ email }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.employee.open);
  // const [open, setOpen] = React.useState(false);
  const handleOpen = () => dispatch(setOpen(true));
  const handleClose = () => dispatch(setOpen(false));

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          ></Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure, you want to delete this employee ?
          </Typography>
          <Button
            varient="outlined"
            onClick={() => {
              dispatch(removeEmployee(email));
              dispatch(setOpen(false));
            }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
