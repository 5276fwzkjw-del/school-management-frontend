import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/apiRequest';

function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const data = await apiRequest('/api/student/dashboard');
      setDashboardData(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboardData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--secondary)' }}>
        Loading Dashboard Parameters...
      </div>
    );
  }

  const { profile, classDetails, subjects, attendance } = dashboardData;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '32px', letterSpacing: '-0.5px' }}>Student Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '600' }}>Academic Profile</h2>
          <div style={{ lineHeight: '1.8' }}>
            <div><span style={{ color: 'var(--secondary)' }}>Full Name:</span> <strong>{profile.name}</strong></div>
            <div><span style={{ color: 'var(--secondary)' }}>Email:</span> {profile.email}</div>
            <div><span style={{ color: 'var(--secondary)' }}>Phone:</span> {profile.profileDetails?.phone || 'N/A'}</div>
            <div><span style={{ color: 'var(--secondary)' }}>Address:</span> {profile.profileDetails?.address || 'N/A'}</div>
          </div>
        </div>

        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '600' }}>Class Allocation</h2>
          <div style={{ lineHeight: '1.8' }}>
            <div><span style={{ color: 'var(--secondary)' }}>Assigned Class:</span> <strong>{classDetails.name}</strong></div>
            <div><span style={{ color: 'var(--secondary)' }}>Section Allocation:</span> {classDetails.section}</div>
            <div><span style={{ color: 'var(--secondary)' }}>Class In-Charge:</span> {classDetails.classTeacher?.name || 'N/A'}</div>
            <div><span style={{ color: 'var(--secondary)' }}>Contact Email:</span> {classDetails.classTeacher?.email || 'N/A'}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '600' }}>Enrolled Courses & Subjects</h2>
          <ul style={{ listStyle: 'none' }}>
            {subjects.map((sub) => (
              <li key={sub._id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                <span><strong>{sub.name}</strong> ({sub.code})</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--secondary)' }}>Instructor: {sub.teacher?.name || 'N/A'}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '600' }}>Attendance History Tracker</h2>
          <ul style={{ listStyle: 'none' }}>
            {attendance.map((record, index) => (
              <li key={index} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                <span>{new Date(record.date).toLocaleDateString()}</span>
                <span style={{ 
                  fontWeight: '600', 
                  color: record.status === 'Present' ? '#2e7d32' : record.status === 'Absent' ? 'var(--error)' : '#d84315' 
                }}>{record.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
