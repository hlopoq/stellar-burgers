import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  burgerConstructSelector,
  clearIngredients
} from '../../services/constructorSlice';
import {
  clearOrder,
  orderBurgerThunk,
  orderRequestSelector,
  orderSelector
} from '../../services/orderSlice';
import { useNavigate } from 'react-router-dom';
import { isUserAuthenticatedSelector } from '../../services/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(burgerConstructSelector);

  const orderRequest = useSelector(orderRequestSelector);
  const orderModalData = useSelector(orderSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useSelector(isUserAuthenticatedSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (constructorItems.ingredients.length === 0) return;

    if (!isAuth) {
      return navigate('/login');
    }

    try {
      const newBurgerItems = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ];

      dispatch(orderBurgerThunk(newBurgerItems))
        .then(() => dispatch(clearIngredients()))
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
