import React, { useState } from 'react';
import { signIn, signUp } from '../auth';
import logo from '../assets/cloud.png';

const AuthForm = ({ isSignUp, toggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
      <div className="login-container">
        <div className="login-form">
          <img src={logo} alt="Logo" className="logo"/>
          <h1 className="logo">Tic-Tac-Toe</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button">
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <a href="#" onClick={() => {/* Toggle sign up */
            }}>
              {isSignUp ? ' Login' : ' Sign Up'}
            </a>
          </p>
        </div>
      </div>
  );
};

export default AuthForm;

