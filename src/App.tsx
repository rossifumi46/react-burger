import React from 'react';
import './App.css';
import AppHeader from './components/app-header';
import BurgerConstructor from './components/burger-constructor';
import BurgerIngredients from './components/burger-ingredients';

import data from './utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className="main">
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
