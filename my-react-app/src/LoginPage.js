// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


    const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();

        // Validate email and password
     if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

      try {
        // Simulating an API call
        const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/authorize/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        // Check if authentication was successful
        if (response.ok) {
          // Assuming the server returns the user role
          const { role } = await response.json();

          // Redirect based on the user role
          switch (role) {
            case 'admin':
              navigate('/admin');
              break;
            case 'driver':
              navigate('/driver');
              break;
            case 'maintainer':
              navigate('/maintenance-page');
              break;
            case 'fueler':
            navigate('/fuel-page');
            break;
            default:
              navigate('/user-profile');
          }
        } else {
          alert('Sign-in failed. Please check your email and password.');
        }
      } catch (error) {
        console.error('Error during sign-in:', error);
        alert('An error occurred during sign-in. Please try again.');
      }
    };


    return (
      
        <div>

            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Sign In</button>
            </form>
        </div>

        
    );
};

export default LoginPage;
