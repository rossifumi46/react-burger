import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'
import AppHeader from '../app-header';
import BurgerConstructor from '../burger-constructor';
import BurgerIngredients from '../burger-ingredients';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(URL);
        if (response.ok) {
          const { data } = await response.json();
          setData(data);
        } else {
          throw new Error(response.status + ': ' + response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main className={`${styles.main}`}>
        {data.length > 0 && (
          <>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
