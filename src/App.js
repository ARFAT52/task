import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({ studentName: '', amount: '', method: 'Cash' });
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/payments')
      .then(res => res.json())
      .then(data => setPayments(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => {
      fetch('http://localhost:5000/payments')
        .then(res => res.json())
        .then(data => setPayments(data));
      setForm({ studentName: '', amount: '', method: 'Cash' });
    });
  };

  return (
    <div className="container">
      <h2>Payment Tracker</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          name="studentName"
          className="inputt"
          placeholder="Student Name"
          value={form.studentName}
          onChange={handleChange}
          required
        />
        <input
          name="amount"
          type="number"
          className="inputt"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <select
          name="method"
          value={form.method}
          onChange={handleChange}
          className="inputt"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Online">Online</option>
        </select>
        <button type="submit" className="submit-btn">Add Payment</button>
      </form>

      <h3>All Payments</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={i}>
              <td>{p.studentName}</td>
              <td>{p.amount}</td>
              <td>{p.method}</td>
              <td>{new Date(p.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
