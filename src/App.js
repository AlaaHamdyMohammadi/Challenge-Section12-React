// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState('EUR');
  const [toCur, setToCur] = useState('USD');
  const [converted, setConverted] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(function(){
    async function fetchCurrency(){
      setIsLoading(true);
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`);
      const data = await res.json();
      setConverted(data.rates[toCur]);
    }
    if(fromCur === toCur) return setConverted(amount);
    fetchCurrency();
    setIsLoading(false);
  }, [amount, fromCur, toCur]);

  return (
    <div>
      <input type="text" value={amount} onChange={(e) => setAmount(+e.target.value)} disabled={isLoading}/>
      <select value={fromCur} onChange={(e) => setFromCur(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCur} onChange={(e) => setToCur(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>Output = {converted} {toCur}</p>
    </div>
  );
}
