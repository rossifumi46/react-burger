import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import IngredientDetails from "../../components/ingredient-details";
import Modal from "../../components/modal";

function ModalPage() {
  let history = useHistory();
  let { id } = useParams();
  const { ingredients } = useSelector(store => store.ingredients);
  const ingredient = ingredients.find(({ _id }) => _id === id)
  if (!ingredient) return null;

  const back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <Modal header="Детали ингредиента" onClose={back}>
    <IngredientDetails ingredient={ingredient} />
  </Modal>
  )
}

export default ModalPage;