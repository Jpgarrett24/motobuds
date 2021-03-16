import React, { useEffect, useState } from 'react';
import { FaTimesCircle, FaArrowAltCircleLeft } from 'react-icons/fa';

import DateTimePicker from './DateTimePicker';
import EndLocationMap from './EndLocationMap';
import StartingMapPicker from './StartingLocationMap';
import useAuth from '../auth/useAuth';
import tripsApi from '../api/trips';
import TripCard from './TripCard';
import GoogleMap from './GoogleMap';


const AddTripForm = ({ setShowForm }) => {
    const auth = useAuth();
    const [errors, setErrors] = useState([]);
    const [from, setFrom] = useState({});
    const [to, setTo] = useState({});
    const [formProgress, setFormProgress] = useState(0);
    const [routeUrl, setRouteUrl] = useState("");
    const [formData, setFormData] = useState(
        {
            riders: [auth.user._id],
            startDate: new Date(),
            creator: auth.user._id,
        }
    );

    const addUrl = () => {
        return (
            routeUrl ?
                setFormData(
                    {
                        ...formData,
                        routeUrl
                    }
                ) :
                null
        );
    };

    useEffect(() => {
        return formProgress !== 1 && formProgress !== 2 ? window.scrollTo(0, 0) : null
    }, [formProgress]);

    const submitForm = async (formData) => {
        const result = await tripsApi.create(formData);
        console.log(result);
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
                                    <input type="text" id="url" onChange={(event) => setRouteUrl(event.target.value)} placeholder="https://www.google.com/maps" value={routeUrl} />
                                    <button
                                        onClick={() => {
                                            addUrl();
                                            setFormData({ ...formData, from, to })
                                            setFormProgress(formProgress + 1);
                                        }}
                                        className="addFormButton"
                                    >
                                        Next
                                    </button>
                                    {errors && errors.map((err, idx) => <p key={idx}>{err}</p>)}
                                </> :
                                formData.from && formData.to ?
                                    <>
                                        <h5>Does this look correct?</h5>
                                        <TripCard trip={formData} />
                                        <GoogleMap trip={formData} />
                                        <button onClick={() => submitForm(formData)} className="addFormButton">Let's Ride!</button>
                                        {errors && errors.map((err, idx) => <p key={idx}>{err}</p>)}
                                    </> :
                                    <></>
            }
        </div >
    );
};

export default AddTripForm;