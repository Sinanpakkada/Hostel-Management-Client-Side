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

  const handleStaffSelect = (staffId) => {
    setSelectedStaffId(staffId);
  };

  const handleStaffDelete = async () => {
    if (!selectedStaffId) {
      console.error('No staff selected for deletion.');
      return;
    }

    try {
      await axios.delete(`/staffs/${selectedStaffId}`);
      setStaffs((staffs) => staffs.filter((staff) => staff.Staff_id !== selectedStaffId));
      setSelectedStaffId(null);
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  

  return (
    <div className="staffdiv">
      {staffs.map((staff) => (
        <div
          key={staff.Staff_id}
          className="staffdiv-child"
          onClick={() => handleStaffSelect(staff.Staff_id)}
          style={{ backgroundColor: selectedStaffId === staff.Staff_id ? '#eee' : 'white' }}
        >
          <p>{staff.Staff_id}</p>
          <p>{staff.Name}</p>
          <p>{staff.Type}</p>
          <p>Rs. {staff.Salary}</p>
        </div>
      ))}
      <div className="staffdiv-bottom">
        <button onClick={handleStaffDelete} disabled={!selectedStaffId}>
          Delete Selected Staff
        </button>
      </div>
    </div>
  );
};

export default StaffDiv;
