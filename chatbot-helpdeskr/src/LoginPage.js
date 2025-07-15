
import React, { useState } from 'react';
import axios from 'axios';
import logo from './img/logoOcp.png';
import 'bootstrap/dist/css/bootstrap.min.css';


function LoginPageWithCallback({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email et mot de passe requis !");
      return;
    }

    try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
  email,
  password,
});
      const token = response.data.token;
      localStorage.setItem('token', token);
      const role = response.data.role;
      localStorage.setItem('role', role);
      const name = response.data.name;
      localStorage.setItem('username', name);

      onLogin(); 
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Email ou mot de passe incorrect");
      } else {
        alert("Erreur lors de la connexion");
        console.error(error);
      }
    }
  };

  return (
      <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt="Logo"
            style={{ height: '30px', marginRight: '10px' }}
          />
          Helpdesk</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            
          </button>
          
         
        </div>
      </nav>
  
    <div style={{
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f2f5',
      fontFamily: 'sans-serif'
    }}>
      <form onSubmit={handleLogin} style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src={logo}
            alt="OCP Logo"
            style={{ width: '80px', marginBottom: '10px' }}
          />
          <h2 style={{marginTop:0}}>Welcome back</h2>
          <p style={{ textAlign: 'center', marginTop: '20px', color:'gray',fontSize:12 }}>
          sign in into your account to continue </p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px', position: 'relative' }}>
  <label>Password</label>
  <input
    type={showPassword ? "text" : "password"}
    required
    value={password}
    onChange={e => setPassword(e.target.value)}
    style={{
      width: '100%',
      padding: '10px',
      marginTop: '5px',
      borderRadius: '5px',
      border: '1px solid #ccc',

    }}
  />
  <i
    onClick={() => setShowPassword(!showPassword)}
    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
    style={{
      position: "absolute",
      top: "50px",
      right: "12px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#888"
    }}
  ></i>
</div>


        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#2e7d32',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          Sign In
        </button>

        
      </form>
    </div>
    </>
  );


}


export default LoginPageWithCallback;
