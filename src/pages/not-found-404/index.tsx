import styles from "./styles.module.css";

function NotFound404() {
  return (
    <>
      <main className={[styles.not_found, "main mt-30"].join(" ")}>
        <h1 className="text text_type_main-large">Упсс... Страница не нашлась</h1>
      </main>
    </>
  );
}

export default NotFound404;
