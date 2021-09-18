import React from 'react';
import styles from './styles.module.css'
import AppHeader from '../app-header';
import BurgerConstructor from '../burger-constructor';
import BurgerIngredients from '../burger-ingredients';

import data from '../../utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={`${styles.main}`}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
