import React, { useEffect, useState } from 'react';
import { FaTimesCircle, FaArrowAltCircleLeft } from 'react-icons/fa';

import DateTimePicker from './DateTimePicker';
import EndLocationMap from './EndLocationMap';
import { formatDate } from '../helper/formatDate';
import StartingMapPicker from './StartingLocationMap';
import useAuth from '../auth/useAuth';
import tripsApi from '../api/trips';
import GoogleMap from './GoogleMap';


const AddTripForm = ({ setShowForm, setLoading }) => {
    const auth = useAuth();
    const [errors, setErrors] = useState([]);
    const [from, setFrom] = useState({});
    const [to, setTo] = useState({});
    const [formProgress, setFormProgress] = useState(0);
    const [formData, setFormData] = useState(
        {
            riders: [auth.user._id],
            startDate: new Date(),
            creator: auth.user._id,
            routeUrl: ""
        }
    );

    useEffect(() => {
        return formProgress !== 1 && formProgress !== 2 ? window.scrollTo(0, 0) : null
    }, [formProgress]);

    const submitForm = async (formData) => {
        const result = await tripsApi.create(formData, auth.user);
        setShowForm(false);
        setLoading(true);
    }

    return (
        <div id="addTripForm">
            <h4>Create a Ride!</h4>
            <FaTimesCircle onClick={() => setShowForm(false)} id="closeForm" />
            {formProgress > 0 && <FaArrowAltCircleLeft id="formBack" onClick={() => setFormProgress(formProgress - 1)} />}
            {
                formProgress === 0 ?
                    <>
                        <h5>Select Date and Time for Ride</h5>
                        <DateTimePicker formData={formData} setFormData={setFormData} />
                        <button onClick={() => setFormProgress(formProgress + 1)} className="addFormButton">Next</button>
                        {errors && errors.map((err, idx) => <p key={idx}>{err}</p>)}
                    </> :

                    formProgress === 1 ?
                        <>
                            <h5>Add a meetup location</h5>
                            <StartingMapPicker setFrom={setFrom} />
                            <button onClick={() => setFormProgress(formProgress + 1)} className="addFormButton">Next</button>
                            {errors && errors.map((err, idx) => <p key={idx}>{err}</p>)}
                        </> :

                        formProgress === 2 ?
                            <>
                                <h5>Add the ride destination</h5>
                                <EndLocationMap setTo={setTo} />
                                <button onClick={() => setFormProgress(formProgress + 1)} className="addFormButton">Next</button>
                                {errors && errors.map((err, idx) => <p key={idx}>{err}</p>)}
                            </> :

                            formProgress === 3 ?
                                <>
                                    <h5><label htmlFor="url">Add an addition URL for a specific route (optional)</label></h5>
                                    <input type="text" id="url" onChange={(event) => setFormData({ ...formData, routeUrl: event.target.value })} placeholder="https://www.google.com/maps" value={formData.routeUrl} />
                                    <button
                                        onClick={() => {
                                            setFormData({ ...formData, from, to })
                                            setFormProgress(formProgress + 1);
                                        }}
                                        className="addFormButton"
                                    >
                                        Next
                                    </button>
                                    {errors && errors.map((err, idx) => <p key={idx}>{err}</p>)}
                                </> :
                                <>
                                    <h5 id="confirm">Does this look correct?</h5>
                                    <div>
                                        <h5>{formData.from.city}</h5>
                                        <h5>{formData.to.city}</h5>
                                        <p>{formatDate(formData.startDate).date} {formatDate(formData.startDate).time}</p>
                                        {formData.routeUrl && <a href={formData.routeUrl} target="_blank" rel="noreferrer">Specific Route</a>}
                                        <GoogleMap trip={formData} />
                                    </div>
                                    <button onClick={() => submitForm(formData)} className="addFormButton">Let's Ride!</button>
                                    {errors && errors.map((err, idx) => <p key={idx}>{err}</p>)}
                                </>
            }
        </div >
    );
};

export default AddTripForm;