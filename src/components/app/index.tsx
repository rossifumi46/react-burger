import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../../pages/auth/login";
import ProfilePage from "../../pages/profile";
import { ProtectedRoute } from "../protected-route";
import ForgotPasswordPage from "../../pages/auth/forgot-password";
import ResetPasswordPage from "../../pages/auth/reset-password";
import RegisterPage from "../../pages/auth/register";
import BurgerConstructorPage from "../../pages/burger-constructor";
import IngredientPage from "../../pages/ingredient";
import { fetchIngredients } from "../../services/slices/ingredientsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router";
import ModalPage from "../../pages/modal/ModalPage";
import OrdersPage from "../../pages/orders";
import NotFound404 from "../../pages/not-found-404";
import AppHeader from "../app-header";
import { TLocationState } from "../../types";

function ModalSwitch() {
  const location = useLocation<TLocationState>();
  const history = useHistory();

  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  const background = history.action === 'PUSH' && location.state && location.state.background;

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <BurgerConstructorPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>
        <Route path="/ingredients/:id" exact>
          <IngredientPage />
        </Route>
        <ProtectedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <OrdersPage />
        </ProtectedRoute>
        <Route path="/404">
          <NotFound404 />
        </Route>
        <Redirect to="/404" />
      </Switch>

      {background && <Route path="/ingredients/:id" children={<ModalPage />} />}
    </>
  );
}

function App() {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((store: any) => store.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (ingredients.length === 0) {
    return null;
  }


  return (
    <div className="App">
      <Router>
        <ModalSwitch />
      </Router>
    </div>
  );
}

export default App;
