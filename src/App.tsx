import { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";

import styles from "./App.module.scss";

type Data = {
  toppings: string[];
};

function App() {
  const [topTwenty, setTopTwenty] = useState<[string, number][]>();

  const { data, isPending, error } = useFetch(
    "http://files.olo.com/pizzas.json"
  );

  useEffect(() => {
    if (data) findTopTwenty(data);
  }, [data]);

  const findTopTwenty = (data: Data[]) => {
    const map = new Map();
    for (let i = 0; i < data.length; i++) {
      const toppings = data[i].toppings.join(", ");

      if (map.has(toppings)) {
        map.set(toppings, map.get(toppings) + 1);
      } else map.set(toppings, 1);
    }

    const sorted = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    const sortedArray = Array.from(sorted).slice(0, 20);
    const topTwenty = new Map(sortedArray);
    const topTwentyArr = [...topTwenty.entries()];
    setTopTwenty(topTwentyArr);
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <section className={styles["top-toppings-section"]}>
      <h1>Most Popular Pizza Toppings</h1>
      <h2>
        <span>Not sure how to top your pizza?</span>
        <span>Top it with one of our top 20 most popular combinations!</span>
      </h2>
      {isPending && <p>Loading...</p>}
      <div>
        {error && (
          <>
            <p>Oh dear, an error occured. Please try again later.</p>
          </>
        )}
        {topTwenty && (
          <ol>
            {topTwenty.map((topping) => (
              <li>
                <div className={styles["list-grid"]}>
                  <span>{capitalize(topping[0])}:</span>
                  <span className={styles["order-count"]}>
                    {topping[1]} orders
                  </span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default App;
