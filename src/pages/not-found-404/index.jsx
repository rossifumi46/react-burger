import styles from "./styles.module.css";
import AppHeader from "../../components/app-header";

function NotFound404() {
  return (
    <>
      <AppHeader />
      <main className={[styles.not_found, "main mt-30"].join(" ")}>
        <h1 className="text text_type_main-large">Упсс... Страница не нашлась</h1>
      </main>
    </>
  );
}

export default NotFound404;
