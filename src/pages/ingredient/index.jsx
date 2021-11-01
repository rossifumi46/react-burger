import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import IngredientDetails from "../../components/ingredient-details";
import { Redirect, useParams } from "react-router";

function IngredientPage() {
  const { ingredients } = useSelector(store => store.ingredients);
  const { id } = useParams();
  const ingredient = ingredients.find(({ _id }) => _id === id)

  if (!ingredient) return <Redirect to="/404" />;

  return (
    <>
      <main className={[styles.ingredient, "main mt-30"].join(" ")}>
        <IngredientDetails ingredient={ingredient} />
      </main>
    </>
  );
}

export default IngredientPage;
