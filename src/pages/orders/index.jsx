import styles from "./styles.module.css";
import AppHeader from "../../components/app-header";
import Navigation from "../../components/navigation";

function OrdersPage() {

  return (
    <>
      <AppHeader />
      <main className={[styles.orders, "main mt-30"].join(" ")}>
        <Navigation location="orders" />
      </main>
    </>
  );
}

export default OrdersPage;
