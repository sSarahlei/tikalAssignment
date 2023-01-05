import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getByParams } from "../../api/MainApi";

export interface LocationsState {
  info: Array<CharacterLocationInfo>;
}

const initialState: LocationsState = {
  info: [],
};

type LocationParams = Partial<Record<keyof CharacterLocationInfo, string>>;

export const getLocationByParams = createAsyncThunk(
  "location/getByParams",
  async (params: LocationParams) => {
    const response = await getByParams("location", params);
    return response?.data.results;
  }
);

export const locationsSlice = createSlice({
  name: "location",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLocations: (state, action) => {
      state.info = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocationByParams.pending, (state, action) => {
        //  state.status = 'pending'
      })
      .addCase(getLocationByParams.fulfilled, (state, action) => {
        // state.status = 'idle';
        state.info = action.payload;
      })
      .addCase(getLocationByParams.rejected, (state) => {
        //state.status = 'failed';
      });
  },
});

export const { setLocations } = locationsSlice.actions;

export default locationsSlice.reducer;
