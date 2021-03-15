import React, { useState } from 'react';
import { FaTimesCircle, FaArrowAltCircleLeft } from 'react-icons/fa';

import DateTimePicker from './DateTimePicker';
import StartingMapPicker from './StartingLocationMap';


const AddTripForm = ({ setShowForm }) => {
    const [errors, setErrors] = useState([]);
    const [formProgress, setFormProgress] = useState(0);
    const [date, setDate] = useState(new Date());

    return (
        <div id="addTripForm">
            <h4>Add a Trip!</h4>
            <FaTimesCircle onClick={() => setShowForm(false)} id="closeForm" />
            {formProgress > 0 && <FaArrowAltCircleLeft id="formBack" onClick={() => setFormProgress(formProgress - 1)} />}
            {
                formProgress === 0 ?
                    <>
                        <h5>Select Date and Time for Ride</h5>
                        <DateTimePicker date={date} setDate={setDate} />
                        <button onClick={() => setFormProgress(formProgress + 1)} className="addFormButton">Next</button>
                        {errors && errors.map((err, idx) => <p key={idx}>{err}</p>)}
                    </> :

                    formProgress === 1 ?
                        <>
                            <h5>Ping a meetup location</h5>
                            <StartingMapPicker />
                            <button onClick={() => setFormProgress(formProgress + 1)} className="addFormButton">Next</button>
                            {errors && errors.map((err, idx) => <p key={idx}>{err}</p>)}
                        </> :

                        formProgress === 2 ?
                            <>
                                <h5>Ping the final ride destination</h5>
                                <button onClick={() => setFormProgress(formProgress + 1)} className="addFormButton">Next</button>
                                {errors && errors.map((err, idx) => <p key={idx}>{err}</p>)}
                            </> :

                            <>
                                <h5>Are you sure my brutha?</h5>
                                <button onClick={() => setFormProgress(0)} className="addFormButton">Submit</button>
                                {errors && errors.map((err, idx) => <p key={idx}>{err}</p>)}
                            </>
            }
        </div>
    );
};

export default AddTripForm;