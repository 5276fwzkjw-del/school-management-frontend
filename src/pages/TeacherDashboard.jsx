import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/apiRequest';

function TeacherDashboard() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState({});

  useEffect(() => {
    fetchTeacherClasses();
  }, []);

  const fetchTeacherClasses = async () => {
    try {
      const data = await apiRequest('/api/teacher/classes');
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClassChange = (classId) => {
    setSelectedClass(classId);
    const targetClass = classes.find((c) => c._id === classId);
    if (targetClass) {
      setStudents(targetClass.students || []);
      const initialRecords = {};
      targetClass.students.forEach((student) => {
        initialRecords[student._id] = 'Present';
      });
      setRecords(initialRecords);
    } else {
      setStudents([]);
      setRecords({});
    }
  };

  const handleStatusChange = (studentId, status) => {
    setRecords((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClass) return;

    const formattedRecords = Object.keys(records).map((studentId) => ({
      student: studentId,
      status: records[studentId],
    }));

    try {
      await apiRequest('/api/teacher/attendance', {
        method: 'POST',
        data: {
          classId: selectedClass,
          date: attendanceDate,
          records: formattedRecords,
        },
      });
      alert('Attendance saved successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '32px', letterSpacing: '-0.5px' }}>Teacher Dashboard</h1>

      <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: '600' }}>Select Class & Date</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--secondary)', marginBottom: '6px' }}>Class</label>
            <select value={selectedClass} onChange={(e) => handleClassChange(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)' }}>
              <option value="">Choose a class...</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>{cls.name} - Section {cls.section}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--secondary)', marginBottom: '6px' }}>Date</label>
            <input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)' }} />
          </div>
        </div>
      </div>

      {students.length > 0 && (
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: '600' }}>Student Attendance Roster</h2>
          <form onSubmit={handleAttendanceSubmit}>
            <div style={{ marginBottom: '24px' }}>
              {students.map((student) => (
                <div key={student._id} style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ flex: '1' }}>
                    <span style={{ fontWeight: '500', display: 'block' }}>{student.name}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--secondary)' }}>{student.email}</span>
                  </div>
                  <div>
                    <select value={records[student._id] || 'Present'} onChange={(e) => handleStatusChange(student._id, e.target.value)} style={{ padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--background)' }}>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <button type="submit" style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontWeight: '500', cursor: 'pointer' }}>Submit Attendance</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
