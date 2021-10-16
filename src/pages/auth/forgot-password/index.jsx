import { Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router";
import AppHeader from "../../../components/app-header";
import styles from '../styles.module.css';
import api from "../../../services/api";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

function ForgotPasswordPage() {
  const history = useHistory();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await api.forgotPassword({ email: e.target.email.value});
      history.replace({
        pathname: '/reset-password', 
        state: {
         isActive: true
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

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
      <main className={[styles.auth, 'mt-100'].join(' ')}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className="text text_type_main-medium primary">Восстановление пароля</h1>
          <div className="mt-6"><Input type="email" name="email" placeholder="Укажите e-mail" /></div>
          <div className="mt-6"><Button>Восстановить</Button></div>
          <span className="text text_type_main-default secondary mt-20">
            Вспомнили пароль? <Link to='/login'>Войти</Link>
          </span>
        </form>
      </main>
    </>
  )
}

export default ForgotPasswordPage;