import { describe, test } from '@jest/globals';
import { initialState, feedReducer, getFeedThunk } from '../feedSlice';

describe('Тест слайса: feed', () => {
  const orderData = {
    orders: [
      {
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
      }
    ],
    total: 73514,
    totalToday: 1,
    success: true
  };

  test('should handle feed reducer state on pending', () => {
    const newState = feedReducer(initialState, getFeedThunk.pending(''));
    expect(newState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null
    });
  });

  test('should handle feed reducer state on rejected', () => {
    const testError = new Error('Something went wrong');
    const newState = feedReducer(
      initialState,
      getFeedThunk.rejected(testError, '')
    );
    expect(newState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: 'Something went wrong'
    });
  });

  test('should handle feed reducer state on fulfilled', () => {
    const newState = feedReducer(
      initialState,
      getFeedThunk.fulfilled(orderData, '')
    );
    expect(newState).toEqual({
      orders: orderData.orders,
      total: orderData.total,
      totalToday: orderData.totalToday,
      isLoading: false,
      error: null
    });
  });
});
