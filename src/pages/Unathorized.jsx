import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '16px', color: 'var(--primary)' }}>403</h1>
      <h2 style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--secondary)', marginBottom: '24px' }}>Access Forbidden: Insufficient Permissions</h2>
      <Link to="/login" style={{ padding: '10px 20px', background: 'var(--primary)', color: '#ffffff', textDecoration: 'none', borderRadius: 'var(--radius)', fontWeight: '500' }}>Return to Login</Link>
    </div>
  );
}

export default Unauthorized;
