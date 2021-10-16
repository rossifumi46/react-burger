import AppHeader from "../../../components/app-header";
import styles from '../../../../components/app/styles.module.css';

function BaseAuthPage() {
  return (
    <>
      <AppHeader />
      <main className={`${styles.main}`}>
        <form className="form">
          <input type="email" name="email" placeholder="Email" className="input" />
          <input type="password" name="password" placeholder="Пароль" className="input" />
          <button className="button">Войти</button>
        </form>
      </main>
    </>
  )
}

export default BaseAuthPage;