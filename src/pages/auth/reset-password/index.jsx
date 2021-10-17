import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import styles from '../styles.module.css';
import { useHistory } from 'react-router';

function ResetPasswordPage() {
  const history = useHistory(); 
  const isActive = history.location.state && history.location.state.isActive;

  useEffect(() => {
    if (!isActive) {
      history.goBack();
    } else {
      history.replace();
    }
  }, [history, isActive]);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await api.resetPassword({ password: e.target.password.value, token: e.target.code.value });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main className={styles.auth}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className="text text_type_main-medium primary">Восстановление пароля</h1>
          <div className="mt-6"><Input type="password" name="password" placeholder="Введите новый пароль"/></div>
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