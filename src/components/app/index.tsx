import React, { useEffect } from "react";
import styles from "./styles.module.css";
import AppHeader from "../app-header";
import BurgerConstructor from "../burger-constructor";
import BurgerIngredients from "../burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { fetchIngredients } from "../../services";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      <main className={`${styles.main}`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
