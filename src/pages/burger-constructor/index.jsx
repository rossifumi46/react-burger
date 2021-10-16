import React from "react";
import styles from "./styles.module.css";
import AppHeader from "../../components/app-header";
import BurgerConstructor from "../../components/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function BurgerConstructorPage() {
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

export default BurgerConstructorPage;
