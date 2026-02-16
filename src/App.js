import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Configure API - update this URL after deployment
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

      const response = await axios.post(`${API_URL}/api/v1/score`, payload);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to score application. Please check your inputs.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
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
    setResult(null);
    setError('');
  };

  return (
    <div className="app">
      <div className="background-grid"></div>
      
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📊</span>
            <h1>CREDIT<span className="accent">RISK</span></h1>
          </div>
          <p className="subtitle">AI-Powered Loan Assessment System</p>
        </div>
      </header>

      <main className="main-content">
        {!result ? (
          <div className="application-form">
            <div className="form-header">
              <h2>Loan Application Assessment</h2>
              <p>Enter applicant details for instant risk analysis</p>
            </div>

            {error && (
              <div className="alert alert-error">
                <span className="alert-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-section">
                  <h3>Financial Information</h3>
                  
                  <div className="form-group">
                    <label>Annual Income (USD)</label>
                    <input
                      type="number"
                      name="applicant_income"
                      value={formData.applicant_income}
                      onChange={handleChange}
                      placeholder="50000"
                      required
                      min="0"
                      step="1000"
                    />
                  </div>

                  <div className="form-group">
                    <label>Loan Amount (USD)</label>
                    <input
                      type="number"
                      name="loan_amount"
                      value={formData.loan_amount}
                      onChange={handleChange}
                      placeholder="150000"
                      required
                      min="0"
                      step="1000"
                    />
                  </div>

                  <div className="form-group">
                    <label>Existing Debt (USD)</label>
                    <input
                      type="number"
                      name="existing_debt"
                      value={formData.existing_debt}
                      onChange={handleChange}
                      placeholder="15000"
                      required
                      min="0"
                      step="1000"
                    />
                  </div>

                  <div className="form-group">
                    <label>Loan Term (Months)</label>
                    <select
                      name="loan_term_months"
                      value={formData.loan_term_months}
                      onChange={handleChange}
                    >
                      <option value="60">5 Years (60 months)</option>
                      <option value="120">10 Years (120 months)</option>
                      <option value="180">15 Years (180 months)</option>
                      <option value="240">20 Years (240 months)</option>
                      <option value="360">30 Years (360 months)</option>
                    </select>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Personal Information</h3>
                  
                  <div className="form-group">
                    <label>Credit History (Months)</label>
                    <input
                      type="number"
                      name="credit_history_months"
                      value={formData.credit_history_months}
                      onChange={handleChange}
                      placeholder="84"
                      required
                      min="0"
                      max="600"
                    />
                  </div>

                  <div className="form-group">
                    <label>Employment Status</label>
                    <select
                      name="employment_status"
                      value={formData.employment_status}
                      onChange={handleChange}
                    >
                      <option value="employed">Employed</option>
                      <option value="self_employed">Self-Employed</option>
                      <option value="unemployed">Unemployed</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Education</label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                    >
                      <option value="graduate">Graduate</option>
                      <option value="not_graduate">Not Graduate</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Property Area</label>
                    <select
                      name="property_area"
                      value={formData.property_area}
                      onChange={handleChange}
                    >
                      <option value="urban">Urban</option>
                      <option value="suburban">Suburban</option>
                      <option value="rural">Rural</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Number of Dependents</label>
                    <select
                      name="dependents"
                      value={formData.dependents}
                      onChange={handleChange}
                    >
                      {[0, 1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span>⚡</span>
                    Calculate Risk Score
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="results-container">
            <div className="results-header">
              <h2>Risk Assessment Complete</h2>
              <button onClick={resetForm} className="btn-secondary">
                New Assessment
              </button>
            </div>

            <div className="results-grid">
              <div className="score-display">
                <div className="score-gauge">
                  <svg viewBox="0 0 200 120" className="gauge-svg">
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#e0e0e0"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke={
                        result.risk_category === 'LOW' ? '#10b981' :
                        result.risk_category === 'MEDIUM' ? '#f59e0b' : '#ef4444'
                      }
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeDasharray={`${(result.risk_score / 100) * 251.2} 251.2`}
                      className="gauge-progress"
                    />
                  </svg>
                  <div className="score-value">
                    <div className="score-number">{result.risk_score}</div>
                    <div className="score-label">/100</div>
                  </div>
                </div>

                <div className={`risk-badge risk-${result.risk_category.toLowerCase()}`}>
                  {result.risk_category} RISK
                </div>

                <div className={`recommendation rec-${result.approval_recommendation.toLowerCase()}`}>
                  <strong>Recommendation:</strong> {result.approval_recommendation}
                </div>

                <div className="confidence-bar">
                  <div className="confidence-label">
                    <span>Confidence</span>
                    <span>{(result.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="confidence-track">
                    <div 
                      className="confidence-fill" 
                      style={{width: `${result.confidence * 100}%`}}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="analysis-details">
                <div className="detail-card">
                  <h3>Financial Ratios</h3>
                  <div className="ratio-item">
                    <span>Debt-to-Income</span>
                    <strong>{result.debt_to_income_ratio}%</strong>
                  </div>
                  <div className="ratio-item">
                    <span>Loan-to-Income</span>
                    <strong>{result.loan_to_income_ratio}×</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <h3>✅ Positive Factors</h3>
                  <ul className="factor-list positive">
                    {result.key_factors.positive.map((factor, idx) => (
                      <li key={idx}>{factor}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-card">
                  <h3>⚠️ Risk Factors</h3>
                  <ul className="factor-list negative">
                    {result.key_factors.negative.map((factor, idx) => (
                      <li key={idx}>{factor}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-card metadata">
                  <div className="meta-item">
                    <span>Application ID</span>
                    <code>{result.application_id}</code>
                  </div>
                  <div className="meta-item">
                    <span>Processed</span>
                    <span>{new Date(result.processed_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Credit Risk Scoring System | Powered by Machine Learning</p>
        <p>
          <a href={`${API_URL}/docs`} target="_blank" rel="noopener noreferrer">
            API Documentation
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
