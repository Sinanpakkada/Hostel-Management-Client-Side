import React, { useState, useEffect } from 'react';
import './StaffDiv.css';
import axios from '../../axios';

const StaffDiv = () => {
  const [staffs, setStaffs] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  useEffect(() => {
    axios.get('/staffs')
      .then((response) => {
        console.log(response.data);
        setStaffs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleStaffDelete = async (staffId) => {
    try {
      await axios.delete(`/staffs/${staffId}`);
      setStaffs((staffs) => staffs.filter((staff) => staff.Staff_id !== staffId));
      setSelectedStaffId(null);
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const ConfirmationModal = () => (
    selectedStaffId && (
      <div className="confirm-modal">
        <p>Are you sure you want to delete Staff {selectedStaffId}?</p>
        <button onClick={() => handleStaffDelete(selectedStaffId)}>
          Yes, Delete
        </button>
        <button onClick={() => setSelectedStaffId(null)}>Cancel</button>
      </div>
    )
  );

  return (
    <div className="staffdiv">
      {staffs.map((staff) => (
        <div key={staff.Staff_id} className="staffdiv-child">
          <p>{staff.Staff_id}</p>
          <p>{staff.Name}</p>
          <p>{staff.Type}</p>
          <p>Rs. {staff.Salary}</p>
          <button onClick={() => setSelectedStaffId(staff.Staff_id)}>
            Delete
          </button>
        </div>
      ))}
      <ConfirmationModal />
    </div>
  );
};

export default StaffDiv;
