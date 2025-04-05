import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export interface OrderState {
  ordersList: TOrder[];
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
  orderRequest: boolean;
}

export const initialState: OrderState = {
  ordersList: [],
  order: null,
  isLoading: false,
  error: null,
  orderRequest: false
};

export const getOrdersThunk = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

export const getOrderDataThunk = createAsyncThunk(
  'orders/getOrderData',
  async (number: number) => await getOrderByNumberApi(number)
);

export const orderBurgerThunk = createAsyncThunk(
  'orders/postOrderBurger',
  async (ingredients: string[], { rejectWithValue }) => {
    const response = await orderBurgerApi(ingredients);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return { order: response.order, name: response.name };
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.order = null;
    }
  },
  selectors: {
    orderSelector: (state) => state.order,
    ordersListSelector: (state) => state.ordersList,
    orderRequestSelector: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOrdersThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ordersList = action.payload;
    });
    builder.addCase(getOrderDataThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOrderDataThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getOrderDataThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload.orders[0];
    });
    builder.addCase(orderBurgerThunk.pending, (state) => {
      state.isLoading = true;
      state.orderRequest = true;
      state.error = null;
    });
    builder.addCase(orderBurgerThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.orderRequest = false;
      state.error = action.error.message as string;
    });
    builder.addCase(orderBurgerThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderRequest = false;
      state.order = action.payload.order;
      state.ordersList.push(action.payload.order);
    });
  }
});

export const { orderSelector, ordersListSelector, orderRequestSelector } =
  orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
