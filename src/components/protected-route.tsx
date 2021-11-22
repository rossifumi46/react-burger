import { Redirect, Route } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { setTokenAction, userRequest } from "../services/slices/authSlice";
import { useDispatch, useSelector } from '../services/store';

type TProps = {
  path: string;
  exact: boolean;
};

export const ProtectedRoute: React.FC<TProps> = ({ children, ...rest }) => {
  const [isUserLoaded, setUserLoaded] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);

  const init = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!user && token) {
      dispatch(setTokenAction(token));
      await dispatch(userRequest(token))
    }
    setUserLoaded(true);
  }, [dispatch, user]);

  useEffect(() => {
    init();
  }, [init]);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
