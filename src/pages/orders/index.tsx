import styles from "./styles.module.css";
import Navigation from "../../components/navigation";

function OrdersPage() {

  return (
    <>
      <main className={[styles.orders, "main mt-30"].join(" ")}>
        <Navigation location="orders" />
      </main>
    </>
  );
}

export default OrdersPage;
