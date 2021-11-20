import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import styles from '../styles.module.css';
import { useHistory } from 'react-router';
import { TLocationState } from "../../../types";

function ResetPasswordPage() {
  const history = useHistory<TLocationState>(); 
  const isActive = history.location.state && history.location.state.isActive;

  useEffect(() => {
    if (!isActive) {
      history.goBack();
    } else {
      history.replace('/');
    }
  }, [history, isActive]);

  async function handleSubmit(e: FormEvent) {
    try {
      const target = e.target as typeof e.target & {
        code: { value: string };
        password: { value: string };
      };
      e.preventDefault();
      await api.resetPassword({ password: target.password.value, token: target.code.value });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main className={styles.auth}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className="text text_type_main-medium primary">Восстановление пароля</h1>
          {/* @ts-ignore */} 
          <div className="mt-6"><Input type="password" name="password" placeholder="Введите новый пароль"/></div>
          {/* @ts-ignore */} 
          <div className="mt-6"><Input type="text" name="code" placeholder="Введите код из письма"/></div>
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