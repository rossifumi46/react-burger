import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { registerRequest } from "../../../services/slices/authSlice";
import styles from "../styles.module.css";
import { Redirect, useHistory } from "react-router";
import { useDispatch, useSelector } from "../../../services/store";

function RegisterPage() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store.auth);
  const history = useHistory();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      registerRequest({ ...state })
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
            <Input type="text" name="name" placeholder="Имя" value={state.name} onChange={handleChange} />
          </div>
          <div className="mt-6">
            <Input type="email" name="email" placeholder="Email" value={state.email} onChange={handleChange} />
          </div>
          <div className="mt-6"> 
            <PasswordInput
              name="password"
              value={state.password} onChange={handleChange}
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
