import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import head from "lodash.head";
import { getInfo, getByIds, getByParams } from "../../../api/MainApi";
import { sortByField } from "../../general/utils/utils";

export interface CharctersState {
  leastPopularCharacter: CharacterInfo;
  popularityCharacters: Array<CharacterInfo>;
}

const initialState: CharctersState = {
  leastPopularCharacter: {} as CharacterInfo,
  popularityCharacters: [],
};

export const getAllCharacters = createAsyncThunk(
  "character/getAll",
  async () => {
    const response = await getInfo("character");
    return response?.data.results;
  }
);

export const getCharactersByIds = createAsyncThunk(
  "character/getByIds",
  async (ids: Array<number>) => {
    const response = await getByIds("character", ids);
    return response?.data;
  }
);

export const getLeastPopular = createAsyncThunk(
  "character/getLeastPopuplar",
  async (ids: Array<number>, { dispatch }) => {
    const characters = await dispatch(getCharactersByIds(ids));
    dispatch(setLeastPopularCharacter(characters.payload));
  }
);

export const getPopularityCharacters = createAsyncThunk(
  "location/getPopularityCharacters",
  async (names: Array<string>, { dispatch }) => {
    const characters = await Promise.all(
      names.map(async (name: string) => {
        const response = await getByParams("character", { name });
        const character: CharacterInfo | undefined = head(
          response?.data.results
        );
        if (!!character) return character;
      })
    );
    dispatch(setPopularityCharacters(characters));
  }
);

export const popularitySlice = createSlice({
  name: "popularity",
  initialState,
  reducers: {
    setPopularityCharacters(state, action) {
      state.popularityCharacters = action.payload;
    },
    setLeastPopularCharacter: (state, action) => {
      const characters = action.payload;
      const sortingOptions: SortingOptions = {
        byLength: true,
        asc: false,
        onEqual: {
          fieldName: "name",
          asc: false,
        },
      };
      let sortedCharacters = [...characters].sort((a, b) =>
        sortByField(a, b, "episode", sortingOptions)
      );

      if (sortedCharacters.length)
        state.leastPopularCharacter = sortedCharacters[0];
    },
    reset(state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharactersByIds.pending, (state, action) => {
        // todo in real life add loader
      })
      .addCase(getCharactersByIds.rejected, (state) => {
        //todo in real life stop loader
      });
  },
});

export const { setLeastPopularCharacter, setPopularityCharacters, reset } =
  popularitySlice.actions;

export default popularitySlice.reducer;
