import { stepButtonClasses } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';
import { reducerReuseAddValue } from '../utils/utils';

export const modalSlice = createSlice({
  name: ' modal',
  initialState: {
    visible: true,
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    title: undefined,
    description: undefined,
    location: undefined,
  },
  reducers: {
    changeVisibility: (state) => {
      state.visible = !state.visible;
    },
    addStartDate: (state, action) => {
      reducerReuseAddValue(state, action, 'startDate');
    },
    addEndDate: (state, action) => {
      reducerReuseAddValue(state, action, 'endDate');
    },
    addStartTime: (state, action) => {
      reducerReuseAddValue(state, action, 'startTime');
    },
    addEndTime: (state, action) => {
      reducerReuseAddValue(state, action, 'endTime');
    },
    addTitle: (state, action) => {
      reducerReuseAddValue(state, action, 'title');
    },
    addDescription: (state, action) => {
      reducerReuseAddValue(state, action, 'description');
    },
    addLocation: (state, action) => {
      reducerReuseAddValue(state, action, 'location');
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setStartDate,
  setEndDate,
  setStartTime,
  setEndTime,
  setTitle,
  setDescription,
  setLocation,
  addStartDate,
  addEndDate,
  addStartTime,
  addEndTime,
  addTitle,
  addDescription,
  addLocation,
} = modalSlice.actions;

export default modalSlice.reducer;
