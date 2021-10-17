import { Redirect, Route } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setTokenAction, userRequest } from "../services/slices/authSlice";

export function ProtectedRoute({ children, ...rest }) {
  const [isUserLoaded, setUserLoaded] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector(store => store.auth);

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
