import { describe, test } from '@jest/globals';
import {
  initialState,
  orderReducer,
  getOrderDataThunk,
  getOrdersThunk,
  orderBurgerThunk
} from '../orderSlice';
import { TOrder } from '@utils-types';

describe('order slice tests', () => {
  const orderData: TOrder = {
    _id: '67f11003e8e61d001cec090e',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный био-марсианский люминесцентный бургер',
    createdAt: '2025-04-05T11:12:03.823Z',
    updatedAt: '2025-04-05T11:12:04.520Z',
    number: 73514
  };

  describe('getOrders thunk tests', () => {
    test('should handle getOrders reducer state on pending', () => {
      const newState = orderReducer(initialState, getOrdersThunk.pending(''));
      expect(newState).toEqual({
        order: null,
        isLoading: true,
        error: null,
        ordersList: [],
        orderRequest: false
      });
    });

    test('should handle getOrders reducer state on rejected', () => {
      const testError = new Error('Something went wrong');
      const newState = orderReducer(
        initialState,
        getOrdersThunk.rejected(testError, '')
      );
      expect(newState).toEqual({
        order: null,
        isLoading: false,
        error: 'Something went wrong',
        ordersList: [],
        orderRequest: false
      });
    });

    test('should handle getOrders reducer state on fulfilled', () => {
      const newState = orderReducer(
        initialState,
        getOrdersThunk.fulfilled([orderData], '')
      );
      expect(newState).toEqual({
        order: null,
        isLoading: false,
        error: null,
        ordersList: [orderData],
        orderRequest: false
      });
    });
  });

  describe('getOrderData thunk tests', () => {
    test('should handle getOrderData reducer state on pending', () => {
      const newState = orderReducer(
        initialState,
        getOrderDataThunk.pending('', 73514)
      );
      expect(newState).toEqual({
        order: null,
        isLoading: true,
        error: null,
        ordersList: [],
        orderRequest: false
      });
    });

    test('should handle getOrderData reducer state on rejected', () => {
      const testError = new Error('Something went wrong');
      const newState = orderReducer(
        initialState,
        getOrderDataThunk.rejected(testError, '', 73514)
      );
      expect(newState).toEqual({
        order: null,
        isLoading: false,
        error: 'Something went wrong',
        ordersList: [],
        orderRequest: false
      });
    });

    test('should handle getOrderData reducer state on fulfilled', () => {
      const responseData = { success: true, orders: [orderData] };
      const newState = orderReducer(
        initialState,
        getOrderDataThunk.fulfilled(responseData, '', 73514)
      );
      expect(newState).toEqual({
        order: orderData,
        isLoading: false,
        error: null,
        ordersList: [],
        orderRequest: false
      });
    });
  });

  describe('orderBurger thunk tests', () => {
    test('should handle orderBurger reducer state on pending', () => {
      const newState = orderReducer(
        initialState,
        orderBurgerThunk.pending('', [])
      );
      expect(newState).toEqual({
        order: null,
        isLoading: true,
        error: null,
        ordersList: [],
        orderRequest: true
      });
    });

    test('should handle orderBurger reducer state on rejected', () => {
      const testError = new Error('Something went wrong');
      const newState = orderReducer(
        initialState,
        orderBurgerThunk.rejected(testError, '', [])
      );
      expect(newState).toEqual({
        order: null,
        isLoading: false,
        error: 'Something went wrong',
        ordersList: [],
        orderRequest: false
      });
    });

    test('should handle orderBurger reducer state on fulfilled', () => {
      const responseData = {
        name: 'Краторный био-марсианский люминесцентный бургер',
        order: orderData
      };
      const newState = orderReducer(
        initialState,
        orderBurgerThunk.fulfilled(responseData, '', orderData.ingredients)
      );
      expect(newState).toEqual({
        order: orderData,
        isLoading: false,
        error: null,
        ordersList: [orderData],
        orderRequest: false
      });
    });
  });
});
