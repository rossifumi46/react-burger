import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import styles from '../styles.module.css';
import { useHistory } from 'react-router';
import { TLocationState } from "../../../types";

function ResetPasswordPage() {
  const history = useHistory<TLocationState>(); 
  const isActive = history.location.state && history.location.state.isActive;
  const [state, setState] = useState({
    password: "",
    code: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!isActive) {
      history.goBack();
    } else {
      history.replace('/');
    }
  }, [history, isActive]);

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault();
      await api.resetPassword({ password: state.password, token: state.code });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main className={styles.auth}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className="text text_type_main-medium primary">Восстановление пароля</h1>
          <div className="mt-6"><Input type="password" name="password" placeholder="Введите новый пароль" value={state.password} onChange={handleChange} /></div>
          <div className="mt-6"><Input type="text" name="code" placeholder="Введите код из письма" value={state.code} onChange={handleChange} /></div>
          <div className="mt-6"><Button>Сохранить</Button></div>
          <span className="text text_type_main-default secondary mt-20">
            Вспомнили пароль? <Link to='/login'>Войти</Link>
          </span>
        </form>
      </main>
    </>
  )
}

export default ResetPasswordPage;