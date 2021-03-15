import React, { useState } from 'react';
import { FaTimesCircle, FaArrowAltCircleLeft } from 'react-icons/fa';


const AddTripForm = ({ setShowForm }) => {
    const [formProgress, setFormProgress] = useState(0);
    return (
        <div id="addTripForm">
            <h4>Add a Trip!</h4>
            <FaTimesCircle onClick={() => setShowForm(false)} id="closeForm" />
            {formProgress > 0 && <h5 onClick={() => setFormProgress(formProgress - 1)}><FaArrowAltCircleLeft id="formBack" /></h5>}
            {
                formProgress === 0 ?
                    <h5 onClick={() => setFormProgress(formProgress + 1)}>Select Date and Time for Ride</h5> :

                    formProgress === 1 ?
                        <h5 onClick={() => setFormProgress(formProgress + 1)}>Ping a meetup location</h5> :

                        formProgress === 2 ?
                            <h5 onClick={() => setFormProgress(formProgress + 1)}>Ping the final ride destination</h5> :

                            <h5>Are you sure my brutha?</h5>
            }
        </div>
    );
};

export default AddTripForm;