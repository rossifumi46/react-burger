import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppHeader from "../../../components/app-header";
import { loginRequest } from "../../../services/store";
import styles from "../styles.module.css";
import { Redirect, useHistory} from "react-router";

function LoginPage() {
  const dispatch = useDispatch();
  const { accessToken, refreshToken, loginRequestFailed } = useSelector(
    (store) => store.auth
  );
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginRequest({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
  }, [accessToken, refreshToken, history]);

  const token = localStorage.getItem('accessToken');

  if (token || accessToken) {
    return (
      // Переадресовываем авторизованного пользователя на главную страницу
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        to={history.location.state?.from || "/"}
      />
    );
  }

  return (
    <>
      <AppHeader />
      <main className={styles.auth}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className="text text_type_main-medium primary">Вход</h1>
          <div className="mt-6">
            <Input type="email" name="email" placeholder="Email" />
          </div>
          <div className="mt-6">
            <Input type="password" name="password" placeholder="Пароль" />
          </div>
          <div className="mt-6">
            <Button type="primary" size="medium">
              Войти
            </Button>
          </div>
          <span className="text text_type_main-default secondary mt-20">
            Вы — новый пользователь?{" "}
            <Link to="/register">Зарегистрироваться</Link>
          </span>
          <span className="text text_type_main-default secondary mt-4">
            Забыли пароль?{" "}
            <Link to="/forgot-password">Восстановить пароль</Link>
          </span>
        </form>
      </main>
    </>
  );
}

export default LoginPage;
