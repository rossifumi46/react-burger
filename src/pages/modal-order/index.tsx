import { useHistory, useParams } from "react-router";
import Modal from "../../components/modal";
import { OrderInfo } from "../../components/order-info";
import { useSelector } from "../../services/store";
import { TParams } from "../../types";

function ModalOrderPage() {
  const history = useHistory();
  const { id } = useParams<TParams>();
  const { orders } = useSelector(store => store.orders);

  const order = orders.find(({ number }) => number === +id)
  if (!order) return null;

  const back = () => {
    history.goBack();
  };

  return (
    <Modal onClose={back}>
      <OrderInfo order={order} />
    </Modal>
  )
}

export default ModalOrderPage;