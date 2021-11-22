import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { loginRequest } from "../../../services/slices/authSlice";
import styles from "../styles.module.css";
import { Redirect, useHistory} from "react-router";
import { ChangeEvent, FormEvent, useState } from "react";
import { TLocationState } from "../../../types";
import { useDispatch, useSelector } from "../../../services/store";

function LoginPage() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(
    (store) => store.auth
  );
  const history = useHistory<TLocationState>();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      loginRequest({
        ...state
      })
    );
  };

  const token = localStorage.getItem('accessToken');

  if (accessToken || token) {
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
      <main className={styles.auth}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className="text text_type_main-medium primary">Вход</h1>
          <div className="mt-6">
            <Input type="email" name="email" placeholder="Email" value={state.email} onChange={handleChange} />
          </div>
          <div className="mt-6">
            <Input type="password" name="password" placeholder="Пароль" value={state.password} onChange={handleChange} />
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
