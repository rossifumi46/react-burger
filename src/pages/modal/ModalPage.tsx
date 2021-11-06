import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import IngredientDetails from "../../components/ingredient-details";
import Modal from "../../components/modal";
import { TParams } from "../../types";

function ModalPage() {
  let history = useHistory();
  let { id } = useParams<TParams>();
  const { ingredients } = useSelector((store: any) => store.ingredients);
  const ingredient = ingredients.find(({ _id }: { _id: string }) => _id === id)
  if (!ingredient) return null;

  const back = () => {
    history.goBack();
  };

  return (
    <Modal header="Детали ингредиента" onClose={back}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  )
}

export default ModalPage;