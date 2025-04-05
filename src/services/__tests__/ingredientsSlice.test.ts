import { describe, test } from '@jest/globals';
import {
  initialState,
  getIngredientsThunk,
  ingredientsReducer
} from '../ingredientsSlice';

describe('ingredients slice tests', () => {
  const ingredientsData = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ];

  test('should handle ingredients reducer state on pending', () => {
    const newState = ingredientsReducer(
      initialState,
      getIngredientsThunk.pending('')
    );

    expect(newState).toEqual({
      ingredients: [],
      isIngredientsLoading: true,
      error: null
    });
  });

  test('should handle ingredients reducer state on rejected', () => {
    const testError = new Error('Something went wrong');
    const newState = ingredientsReducer(
      initialState,
      getIngredientsThunk.rejected(testError, '')
    );

    expect(newState).toEqual({
      ingredients: [],
      isIngredientsLoading: false,
      error: 'Something went wrong'
    });
  });

  test('should handle ingredients reducer state on fulfilled', () => {
    const newState = ingredientsReducer(
      initialState,
      getIngredientsThunk.fulfilled(ingredientsData, '')
    );

    expect(newState).toEqual({
      ingredients: ingredientsData,
      isIngredientsLoading: false,
      error: null
    });
  });
});
