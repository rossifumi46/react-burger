import { FormEvent, useEffect } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerRequest } from "../../../services/slices/authSlice";
import styles from "../styles.module.css";
import { Redirect, useHistory } from "react-router";

function RegisterPage() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store: any) => store.auth);
  const history = useHistory();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      password: { value: string };
      email: { value: string };
    };
    dispatch(
      // @ts-ignore
      registerRequest({
        name: target.name.value,
        email: target.email.value,
        password: target.password.value,
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
      <main className={styles.auth}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className="text text_type_main-medium primary">Регистрация</h1>
          <div className="mt-6">
            {/* @ts-ignore */} 
            <Input type="text" name="name" placeholder="Имя" />
          </div>
          <div className="mt-6">
            {/* @ts-ignore */} 
            <Input type="email" name="email" placeholder="Email" />
          </div>
          <div className="mt-6">
            {/* @ts-ignore */} 
            <PasswordInput
              name="password"
            />
          </div>
          <div className="mt-6">
            <Button type="primary" size="medium">
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
