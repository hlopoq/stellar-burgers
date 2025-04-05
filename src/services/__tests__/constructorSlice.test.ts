import { describe, test } from '@jest/globals';
import { TIngredient } from '@utils-types';
import {
  addIngredient,
  constructorBurgersReducer,
  initialState,
  moveUpIngredient,
  moveDownIngredient,
  removeIngredient
} from '../constructorSlice';

describe('constructor slice tests', () => {
  const mainIngredient: TIngredient = {
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
  };

  const additionalIngredient: TIngredient = {
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
  };

  const stateWithMain = {
    ...initialState,
    ingredients: [{ ...mainIngredient, id: 'mainId' }]
  };

  const stateWithTwo = {
    ...initialState,
    ingredients: [
      { ...mainIngredient, id: 'firstId' },
      { ...additionalIngredient, id: 'secondId' }
    ]
  };

  test('should add ingredient to constructor', () => {
    const newState = constructorBurgersReducer(
      initialState,
      addIngredient(mainIngredient)
    );
    const { ingredients } = newState;

    expect(ingredients).toHaveLength(1);
    expect(ingredients[0]).toEqual({
      ...mainIngredient,
      id: expect.any(String)
    });
  });

  test('should remove ingredient from constructor', () => {
    const newState = constructorBurgersReducer(
      stateWithMain,
      removeIngredient('mainId')
    );
    const { ingredients } = newState;

    expect(ingredients).toHaveLength(0);
  });

  test('should move ingredient up', () => {
    const newState = constructorBurgersReducer(
      stateWithTwo,
      moveUpIngredient(1)
    );
    const { ingredients } = newState;

    expect(ingredients).toHaveLength(2);
    expect(ingredients[0]).toEqual({
      ...additionalIngredient,
      id: 'secondId'
    });
  });

  test('should move ingredient down', () => {
    const newState = constructorBurgersReducer(
      stateWithTwo,
      moveDownIngredient(0)
    );
    const { ingredients } = newState;

    expect(ingredients).toHaveLength(2);
    expect(ingredients[1]).toEqual({
      ...mainIngredient,
      id: 'firstId'
    });
  });

  test('should not move first ingredient up', () => {
    const newState = constructorBurgersReducer(
      stateWithTwo,
      moveUpIngredient(0)
    );

    expect(newState.ingredients).toEqual(stateWithTwo.ingredients);
  });

  test('should not move last ingredient down', () => {
    const newState = constructorBurgersReducer(
      stateWithTwo,
      moveDownIngredient(1)
    );

    expect(newState.ingredients).toEqual(stateWithTwo.ingredients);
  });
});
