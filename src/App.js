import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://credit-risk-api-re8l.onrender.com';

function App() {
  const [formData, setFormData] = useState({
    applicant_income: '',
    loan_amount: '',
    loan_term_months: '360',
    credit_history_months: '',
    employment_status: 'employed',
    property_area: 'urban',
    dependents: '0',
    education: 'graduate',
    existing_debt: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const payload = {
        applicant_income: parseFloat(formData.applicant_income),
        loan_amount: parseFloat(formData.loan_amount),
        loan_term_months: parseInt(formData.loan_term_months),
        credit_history_months: parseInt(formData.credit_history_months),
        employment_status: formData.employment_status,
        property_area: formData.property_area,
        dependents: parseInt(formData.dependents),
        education: formData.education,
        existing_debt: parseFloat(formData.existing_debt)
      };
      const url = API_URL + '/api/v1/score';
      const response = await axios.post(url, payload);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to score application.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      applicant_income: '', loan_amount: '', loan_term_months: '360',
      credit_history_months: '', employment_status: 'employed',
      property_area: 'urban', dependents: '0', education: 'graduate', existing_debt: ''
    });
    setResult(null);
    setError('');
  };

  if (!result) {
    return (
      <div className="app">
        <header className="header"><h1>Credit Risk Scoring</h1></header>
        <main>
          <h2>Loan Application</h2>
          {error && <div className="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input type="number" name="applicant_income" placeholder="Income" value={formData.applicant_income} onChange={handleChange} required />
            <input type="number" name="loan_amount" placeholder="Loan" value={formData.loan_amount} onChange={handleChange} required />
            <input type="number" name="existing_debt" placeholder="Debt" value={formData.existing_debt} onChange={handleChange} required />
            <input type="number" name="credit_history_months" placeholder="Credit History" value={formData.credit_history_months} onChange={handleChange} required />
            <button type="submit">{loading ? 'Loading...' : 'Calculate'}</button>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Score: {result.risk_score}</h1>
      <div>Category: {result.risk_category}</div>
      <div>Recommendation: {result.approval_recommendation}</div>
      <button onClick={resetForm}>New</button>
    </div>
  );
}

export default App;
