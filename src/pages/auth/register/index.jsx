import { useEffect } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppHeader from "../../../components/app-header";
import { registerRequest } from "../../../services/store";
import styles from "../styles.module.css";
import { Redirect, useHistory } from "react-router";

function RegisterPage() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store.auth);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerRequest({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

  useEffect(() => {
    if (accessToken) {
      history.replace("/");
    }
  }, [accessToken, history]);

  const token = localStorage.getItem("accessToken");

  if (token) {
    return (
      // Переадресовываем авторизованного пользователя на главную страницу
      <Redirect to={"/"} />
    );
  }

  return (
    <>
      <AppHeader />
      <main className={styles.auth}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className="text text_type_main-medium primary">Регистрация</h1>
          <div className="mt-6">
            <Input type="text" name="name" placeholder="Имя" />
          </div>
          <div className="mt-6">
            <Input type="email" name="email" placeholder="Email" />
          </div>
          <div className="mt-6">
            <PasswordInput
              type="password"
              name="password"
              placeholder="Пароль"
            />
          </div>
          <div className="mt-6">
            <Button type="primary" size="medium" className="mt-6">
              Зарегестрироваться
            </Button>
          </div>
          <span className="text text_type_main-default secondary mt-20">
            Уже зарегистрированы? <Link to="/login">Войти</Link>
          </span>
        </form>
      </main>
    </>
  );
}

export default RegisterPage;
