// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");
  const [money, setMoney] = useState(1);
  const [total, setTotal] = useState(money);
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      setLoading(true);
      async function fetchData() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${money}&from=${convertFrom}&to=${convertTo}`
          );
          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();
          setTotal(data.rates[convertTo]);
        } catch (err) {
          setTotal(err);
        } finally {
          setLoading(false);
        }
      }
      if (convertTo === convertFrom) {
        setTotal(money);
        return;
      }
      if (!money) {
        setTotal(0);
        setLoading(false);
        return;
      }
      fetchData();
      return function () {
        setTotal(money);
      };
    },
    [convertFrom, convertTo, money]
  );
  return (
    <div className="money-container">
      <input
        className="money"
        type="text"
        value={money}
        onChange={(e) => setMoney(e.target.value)}
        disabled={loading}
      />
      <div>
        <select
          className="select-currency"
          value={convertFrom}
          onChange={(e) => setConvertFrom(e.target.value)}
          disabled={loading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <span>
          <p className="to">TO</p>
        </span>

        <select
          className="select-currency"
          value={convertTo}
          onChange={(e) => setConvertTo(e.target.value)}
          disabled={loading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        {loading ? <p>"Calculating"</p> : <p>{total}</p>}
      </div>
    </div>
  );
}
