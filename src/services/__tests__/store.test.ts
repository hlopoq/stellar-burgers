import { describe, test } from '@jest/globals';
import { rootReducer } from '../store';
import { initialState as constructorInitial } from '../constructorSlice';
import { initialState as feedInitial } from '../feedSlice';
import { initialState as ingredientsInitial } from '../ingredientsSlice';
import { initialState as orderInitial } from '../orderSlice';
import { initialState as userInitial } from '../userSlice';

describe('rootReducer tests', () => {
  test('should initialize with default state', () => {
    const expectedState = {
      constructorBurgers: constructorInitial,
      feed: feedInitial,
      ingredients: ingredientsInitial,
      order: orderInitial,
      user: userInitial
    };

    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(expectedState);
  });
});
