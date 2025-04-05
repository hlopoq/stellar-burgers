import { describe, test } from '@jest/globals';
import { rootReducer } from '../store';
import store from '../store';

describe('rootReducer tests', () => {
  test('should initialize with default state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(store.getState());
  });
});
