import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export interface IngredientsState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state: IngredientsState) => state.ingredients
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.isIngredientsLoading = true;
      state.error = null;
    });
    builder.addCase(getIngredientsThunk.fulfilled, (state, action) => {
      state.isIngredientsLoading = false;
      state.ingredients = action.payload;
    });
    builder.addCase(getIngredientsThunk.rejected, (state, action) => {
      state.isIngredientsLoading = false;
      state.error = action.error.message as string;
    });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { ingredientsSelector } = ingredientsSlice.selectors;
