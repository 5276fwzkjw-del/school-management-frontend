import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: '600', fontSize: '1.1rem', letterSpacing: '-0.3px' }}>
        School Management System
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ fontSize: '0.9rem', textAlign: 'right' }}>
          <span style={{ display: 'block', fontWeight: '500' }}>{user.name}</span>
          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--secondary)', textTransform: 'uppercase' }}>{user.role}</span>
        </div>
        <button onClick={handleLogoutClick} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
