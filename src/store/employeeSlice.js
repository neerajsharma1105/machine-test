import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    open: false,
    email: "",
    isLogin: false,
    list: [
      {
        name: "neeraj",
        email: "n@gmail.com",
        gender: "male",
        status: "Active",
      },
      {
        name: "anu",
        email: "anu@gmail.com",
      },
    ],
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    removeEmployee: (state, action) => {
      const update = state.list.filter((val) => val.email !== action.payload);
      state.list = update;
    },
    addEmployee: (state, action) => {
      const user = {
        text: action.payload,
      };

      state.list.push(action.payload);
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { addEmployee, setLogin, removeEmployee, setOpen, setEmail } =
  employeeSlice.actions;

export default employeeSlice.reducer;
