import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import './StudentDiv.css';

const StudentDiv = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    axios.get('/students')
      .then((response) => {
        console.log(response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleStudentDelete = async (studentId) => {
    try {
      await axios.delete(`/students/${studentId}`);
      setStudents((students) => students.filter((student) => student.Student_id !== studentId));
      setSelectedStudentId(null);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const ConfirmationModal = () => (
    selectedStudentId && (
      <div className="confirm-modal">
        <p>Are you sure you want to delete Student {selectedStudentId}?</p>
        <button onClick={() => handleStudentDelete(selectedStudentId)}>
          Yes, Delete
        </button>
        <button onClick={() => setSelectedStudentId(null)}>Cancel</button>
      </div>
    )
  );

  return (
    <div className="studentdiv">
      {students.map((student) => (
        <div key={student.Student_id} className="studentdiv-child">
          <p>{student.Student_id}</p>
          <p>{student.Name}</p>
          <p>{student.Room_id}</p>
          <p>{student.Place}</p>
          <p>{student.Phone_no}</p>
          <button onClick={() => setSelectedStudentId(student.Student_id)}>
            Delete
          </button>
        </div>
      ))}
      <ConfirmationModal />
    </div>
  );
};

export default StudentDiv;
