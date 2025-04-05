import { describe, test } from '@jest/globals';
import {
  initialState,
  userReducer,
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk
} from '../userSlice';

describe('user slice tests', () => {
  describe('getUser thunk tests', () => {
    const userData = {
      user: {
        email: 'test@mail.com',
        name: 'TestUser'
      },
      success: true
    };

    test('should handle getUser reducer state on pending', () => {
      const newState = userReducer(initialState, {
        type: getUserThunk.pending.type
      });
      expect(newState.user).toEqual(null);
      expect(newState.loading).toEqual(true);
    });

    test('should handle getUser reducer state on rejected', () => {
      const newState = userReducer(initialState, {
        type: getUserThunk.rejected.type,
        error: new Error('Something went wrong')
      });
      expect(newState.user).toEqual(null);
      expect(newState.error).toEqual('Something went wrong');
    });

    test('should handle getUser reducer state on fulfilled', () => {
      const newState = userReducer(initialState, {
        type: getUserThunk.fulfilled.type,
        payload: userData
      });
      expect(newState.user).toEqual(userData.user);
      expect(newState.isUserAuthChecked).toEqual(true);
      expect(newState.isUserAuthenticated).toEqual(true);
    });
  });

  describe('registerUser thunk tests', () => {
    const userData = {
      email: 'test@mail.com',
      name: 'TestUser',
      password: '123qwerty'
    };

    test('should handle registerUser reducer state on pending', () => {
      const newState = userReducer(initialState, {
        type: registerUserThunk.pending.type
      });
      expect(newState.user).toEqual(null);
      expect(newState.loading).toEqual(true);
    });

    test('should handle registerUser reducer state on rejected', () => {
      const newState = userReducer(initialState, {
        type: registerUserThunk.rejected.type,
        error: new Error('Something went wrong')
      });
      expect(newState.user).toEqual(null);
      expect(newState.error).toEqual('Something went wrong');
    });

    test('should handle registerUser reducer state on fulfilled', () => {
      const newState = userReducer(initialState, {
        type: registerUserThunk.fulfilled.type,
        payload: userData
      });
      expect(newState.user).toEqual(userData);
      expect(newState.isUserAuthChecked).toEqual(true);
      expect(newState.isUserAuthenticated).toEqual(true);
    });
  });

  describe('loginUser thunk tests', () => {
    const userData = {
      email: 'test@mail.ru',
      name: 'TestUser',
      password: '123qwerty'
    };

    test('should handle loginUser reducer state on pending', () => {
      const newState = userReducer(initialState, {
        type: loginUserThunk.pending.type
      });
      expect(newState.user).toEqual(null);
      expect(newState.loading).toEqual(true);
    });

    test('should handle loginUser reducer state on rejected', () => {
      const newState = userReducer(initialState, {
        type: loginUserThunk.rejected.type,
        error: new Error('Something went wrong')
      });
      expect(newState.user).toEqual(null);
      expect(newState.error).toEqual('Something went wrong');
    });

    test('should handle loginUser reducer state on fulfilled', () => {
      const newState = userReducer(initialState, {
        type: loginUserThunk.fulfilled.type,
        payload: userData
      });
      expect(newState.user).toEqual(userData);
      expect(newState.isUserAuthChecked).toEqual(true);
      expect(newState.isUserAuthenticated).toEqual(true);
    });
  });

  describe('logoutUser thunk tests', () => {
    test('should handle logoutUser reducer state on pending', () => {
      const newState = userReducer(initialState, {
        type: logoutUserThunk.pending.type
      });
      expect(newState.user).toEqual(null);
      expect(newState.loading).toEqual(true);
    });

    test('should handle logoutUser reducer state on rejected', () => {
      const newState = userReducer(initialState, {
        type: logoutUserThunk.rejected.type,
        error: new Error('Something went wrong')
      });
      expect(newState.user).toEqual(null);
      expect(newState.error).toEqual('Something went wrong');
    });

    test('should handle logoutUser reducer state on fulfilled', () => {
      const newState = userReducer(initialState, {
        type: logoutUserThunk.fulfilled.type
      });
      expect(newState.user).toEqual(null);
    });
  });

  describe('updateUser thunk tests', () => {
    const userData = {
      email: 'test@mail.com',
      name: 'TestUser'
    };

    test('should handle updateUser reducer state on pending', () => {
      const newState = userReducer(initialState, {
        type: updateUserThunk.pending.type
      });
      expect(newState.user).toEqual(null);
      expect(newState.loading).toEqual(true);
    });

    test('should handle updateUser reducer state on rejected', () => {
      const newState = userReducer(initialState, {
        type: updateUserThunk.rejected.type,
        error: new Error('Something went wrong')
      });
      expect(newState.user).toEqual(null);
      expect(newState.error).toEqual('Something went wrong');
    });

    test('should handle updateUser reducer state on fulfilled', () => {
      const newState = userReducer(initialState, {
        type: updateUserThunk.fulfilled.type,
        payload: userData
      });
      expect(newState.user).toEqual(userData);
    });
  });
});
