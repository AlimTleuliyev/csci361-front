// LoginPage.js
import React, { useState } from 'react';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();

        // Validate email and password
     if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    // Simulate authentication logic
    // In a real-world scenario, you would make an API call to your server for authentication
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
        alert('Sign-in successful!');
        // Redirect or perform other actions after successful sign-in
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
