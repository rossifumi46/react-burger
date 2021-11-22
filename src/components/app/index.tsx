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
import { Redirect, useHistory, useLocation } from "react-router";
import ModalPage from "../../pages/modal/ModalPage";
import NotFound404 from "../../pages/not-found-404";
import AppHeader from "../app-header";
import { TLocationState } from "../../types";
import { FeedPage } from "../../pages/feed";
import { OrderHistoryPage } from "../../pages/order-history";
import { OrderInfoPage } from "../../pages/order-info";
import ModalOrderPage from "../../pages/modal-order";
import { useDispatch, useSelector } from "../../services/store";

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
  const ingredient = history.action === 'PUSH' && location.state && location.state.ingredient;
  const order = history.action === 'PUSH' && location.state && location.state.order;

  return (
    <>
      <AppHeader />
      <Switch location={ingredient || order|| location}>
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
          <OrderHistoryPage />
        </ProtectedRoute>
        <Route path="/feed" exact>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderInfoPage type="feed" />
        </Route>
        <ProtectedRoute path="/profile/orders" exact>
          <OrderHistoryPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrderInfoPage type="history" />
        </ProtectedRoute>
        <Route path="/404">
          <NotFound404 />
        </Route>
        <Redirect to="/404" />
      </Switch>

      {ingredient && <Route path="/ingredients/:id" children={<ModalPage />} />}
      {order && (
        <>
          <Route path="/feed/:id">
            <ModalOrderPage />
          </Route>
          <Route path="/profile/orders/:id">
            <ModalOrderPage />
          </Route>
        </>
      )}
    </>
  );
}

function App() {
  const dispatch = useDispatch();

  const { ingredients } = useSelector(store => store.ingredients);

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
