import React, { useState, useEffect } from 'react';
import { authenticateUser } from './Authenticate';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.js'; 

function LoginPage() {
    
    const [password, setPassword] = useState('');
    const { login, isAuthenticated } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = () => {
        authenticateUser(password)
            .then(response => {
                if (response.status === 200) {
                    alert(response.body.message);
                    login();
                } else {
                    alert(response.body.error);
                }
            })
            .catch(error => {
                console.error("There was an error verifying the password:", error);
            });
    }

    return (
        <div className="login-page">
            <h2>Login</h2>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;
