import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL, pending, error, success } from "../URL";

export const getData = createAsyncThunk("getData", async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
});

export const deleteItem = createAsyncThunk("deleteItem", async (id) => {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  const status = response.status;
  console.log(status);
});

export const getItemById = createAsyncThunk("getItemById", async (id) => {
  const response = await fetch(`${URL}/${id}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
});

export const editItem = createAsyncThunk("editItem", async (item) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const status = response.status;
  console.log(status);
});

const data = [];
const item = {
  id: null,
  name: "",
  price: "",
  content: "",
};

export const listSlice = createSlice({
  name: "list",
  initialState: {
    data,
    status: pending,
    item,
  },
  reducers: {
    clearForm: (state) => {
      state.item = item;
    },
    changeForm: (state, action) => {
      const { name, value } = action.payload;
      state.item = { ...state.item, [name]: value };
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = pending;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = success;
        state.data = action.payload;
      })
      .addCase(getData.rejected, (state) => {
        state.status = error;
      })
      .addCase(deleteItem.pending, (state) => {
        state.status = pending;
      })
      .addCase(deleteItem.fulfilled, (state) => {
        state.status = success;
      })
      .addCase(deleteItem.rejected, (state) => {
        state.status = error;
      })
      .addCase(getItemById.pending, (state) => {
        state.status = pending;
      })
      .addCase(getItemById.fulfilled, (state, action) => {
        state.item = action.payload;
        state.status = success;
      })
      .addCase(getItemById.rejected, (state) => {
        state.status = error;
      })
      .addCase(editItem.pending, (state) => {
        state.status = pending;
      })
      .addCase(editItem.fulfilled, (state) => {
        state.status = success;
      })
      .addCase(editItem.rejected, (state) => {
        state.status = error;
      });
  },
});

// Action creators are generated for each case reducer function
export const { clearForm, changeForm, changeStatus } = listSlice.actions;

export const lastId = (state) => state.data[state.data.length - 1].id;

export default listSlice.reducer;
