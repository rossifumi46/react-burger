import styles from "./styles.module.css";
import IngredientDetails from "../../components/ingredient-details";
import { Redirect, useParams } from "react-router";
import { TParams } from "../../types";
import { useSelector } from "../../services/store";

function IngredientPage() {
  const { ingredients } = useSelector((store) => store.ingredients);
  const { id } = useParams<TParams>();
  const ingredient = ingredients.find(({ _id }: { _id: string }) => _id === id)

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
