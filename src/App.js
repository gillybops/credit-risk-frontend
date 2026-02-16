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

  return <div>TEST</div>;
}

export default App;
