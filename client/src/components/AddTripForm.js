import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';


const AddTripForm = ({ setShowForm }) => {
    return (
        <div id="addTripForm">
            <h4>Add a Trip!</h4>
            <FaTimesCircle onClick={() => setShowForm(false)} id="closeForm" />
        </div>
    );
};

export default AddTripForm;