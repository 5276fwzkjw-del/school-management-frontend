import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/apiRequest';
function AdminDashboard() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  
  const [className, setClassName] = useState('');
  const [classSection, setClassSection] = useState('');
  const [selectedClassTeacher, setSelectedClassTeacher] = useState('');
  
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectClassId, setSubjectClassId] = useState('');
  const [selectedSubjectTeacher, setSelectedSubjectTeacher] = useState('');
  
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('student');

  const [assignStudentId, setAssignStudentId] = useState('');
  const [assignClassId, setAssignClassId] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const classesData = await apiRequest('/api/admin/classes');
      const subjectsData = await apiRequest('/api/admin/subjects');
      const teachersData = await apiRequest('/api/admin/teachers');
      const studentsData = await apiRequest('/api/admin/students');
      setClasses(classesData);
      setSubjects(subjectsData);
      setTeachers(teachersData);
      setStudents(studentsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('/api/admin/users/register', {
        method: 'POST',
        data: { name: newUserName, email: newUserEmail, password: newUserPassword, role: newUserRole },
      });
      alert(`${newUserRole} registration complete`);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPassword('');
      fetchAdminData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('/api/admin/classes', {
        method: 'POST',
        data: { name: className, section: classSection, teacher: selectedClassTeacher },
      });
      setClassName('');
      setClassSection('');
      setSelectedClassTeacher('');
      fetchAdminData();
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateSubject = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('/api/admin/subjects', {
        method: 'POST',
        data: { name: subjectName, code: subjectCode, classId: subjectClassId, teacher: selectedSubjectTeacher },
      });
      setSubjectName('');
      setSubjectCode('');
      setSubjectClassId('');
      setSelectedSubjectTeacher('');
      fetchAdminData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignStudent = async (e) => {
    e.preventDefault();
    try {
      const selectedClass = classes.find(c => c._id === assignClassId);
      const updatedStudents = [...(selectedClass.students || []).map(s => s._id || s), assignStudentId];
      await apiRequest(`/api/admin/classes/${assignClassId}`, {
        method: 'PUT',
        data: { students: updatedStudents },
      });
      alert('Student assigned to class successfully');
      setAssignStudentId('');
      setAssignClassId('');
      fetchAdminData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '32px', letterSpacing: '-0.5px' }}>Admin Dashboard</h1>
      
      <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '600' }}>Register New User Account (Teacher/Student)</h2>
        <form onSubmit={handleCreateUser} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--secondary)' }}>Full Name</label>
            <input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--secondary)' }}>Email</label>
            <input type="email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--secondary)' }}>Initial Password</label>
            <input type="password" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--secondary)' }}>System Role</label>
            <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)' }}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" style={{ gridColumn: 'span 4', justifySelf: 'start', padding: '10px 20px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontWeight: '500', cursor: 'pointer' }}>Create User Instance</button>
        </form>
      </div>
      <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '600' }}>Assign Student to Class</h2>
        <form onSubmit={handleAssignStudent} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--secondary)' }}>Select Student</label>
            <select value={assignStudentId} onChange={(e) => setAssignStudentId(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)' }}>
              <option value="">Choose Student...</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--secondary)' }}>Select Target Class</label>
            <select value={assignClassId} onChange={(e) => setAssignClassId(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)' }}>
              <option value="">Choose Class...</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>{c.name} - Section {c.section}</option>
              ))}
            </select>
          </div>
          <button type="submit" style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontWeight: '500', cursor: 'pointer' }}>Assign Student</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '600' }}>Create New Class</h2>
          <form onSubmit={handleCreateClass}>
            <div style={{ marginBottom: '12px' }}>
              <input type="text" placeholder="Class Name" value={className} onChange={(e) => setClassName(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <input type="text" placeholder="Section" value={classSection} onChange={(e) => setClassSection(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <select value={selectedClassTeacher} onChange={(e) => setSelectedClassTeacher(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)' }}>
                <option value="">Select Class Teacher...</option>
                {teachers.map((t) => (
                  <option key={t._id} value={t._id}>{t.name} ({t.email})</option>
                ))}
              </select>
            </div>
            <button type="submit" style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontWeight: '500', cursor: 'pointer' }}>Add Class</button>
          </form>
        </div>

        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '600' }}>Create New Subject</h2>
          <form onSubmit={handleCreateSubject}>
            <div style={{ marginBottom: '12px' }}>
              <input type="text" placeholder="Subject Name" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <input type="text" placeholder="Subject Code" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <select value={subjectClassId} onChange={(e) => setSubjectClassId(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)' }}>
                <option value="">Select Target Class...</option>
                {classes.map((c) => (
                  <option key={c._id} value={c._id}>{c.name} - Section {c.section}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <select value={selectedSubjectTeacher} onChange={(e) => setSelectedSubjectTeacher(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)' }}>
                <option value="">Select Subject Teacher...</option>
                {teachers.map((t) => (
                  <option key={t._id} value={t._id}>{t.name} ({t.email})</option>
                ))}
              </select>
            </div>
            <button type="submit" style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontWeight: '500', cursor: 'pointer' }}>Add Subject</button>
          </form>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '600' }}>System Classes</h2>
          <ul style={{ listStyle: 'none' }}>
            {classes.map((cls) => (
              <li key={cls._id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <strong>{cls.name}</strong> - Section {cls.section} (Teacher: {cls.teacher?.name || 'Unassigned'})
                <div style={{ fontSize: '0.8rem', color: 'var(--secondary)', marginTop: '4px' }}>
                  Students: {cls.students?.length || 0} enrolled
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '600' }}>System Subjects</h2>
          <ul style={{ listStyle: 'none' }}>
            {subjects.map((sub) => (
              <li key={sub._id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <strong>{sub.name}</strong> ({sub.code}) - Class: {sub.classId?.name || 'N/A'} (Teacher: {sub.teacher?.name || 'N/A'})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
