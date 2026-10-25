import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';
import '../index.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginBtn = async (e) => {
    e.preventDefault();
    try {
      const role = await login(email, password);
      if (role === 'admin') navigate('/admin');
      else if (role === 'teacher') navigate('/teacher');
      else navigate('/student');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ background: 'var(--surface)', padding: '40px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', letterSpacing: '-0.5px' }}>School Management System</h2>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', letterSpacing: '-0.5px' }}>for testing, admin@school.com, admin123</h3>
        <form onSubmit={handleLoginBtn}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--secondary)', marginBottom: '6px', fontWeight: '500' }}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', outline: 'none', background: 'var(--background)' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--secondary)', marginBottom: '6px', fontWeight: '500' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', outline: 'none', background: 'var(--background)' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', background: 'var(--primary)', color: '#ffffff', border: 'none', borderRadius: 'var(--radius)', fontWeight: '500', cursor: 'pointer' }}>Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
