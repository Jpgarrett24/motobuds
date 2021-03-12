import React, { useCallback, useEffect, useState } from 'react';
import { FaUserPlus, FaUserMinus } from 'react-icons/fa';

import Footer from '../components/Footer';
import { formatDate } from '../helper/formatDate';
import Navbar from '../components/Navbar';
import tripsApi from '../api/trips';
import useAuth from '../auth/useAuth';

const TripDetails = ({ match }) => {
    const [trip, setTrip] = useState();
    const [date, setDate] = useState();
    const [loading, setLoading] = useState(true);
    const [joined, setJoined] = useState(false);
    const auth = useAuth();

    const getTrip = useCallback(async (_id) => {
        let result = await tripsApi.getOne(_id);
        setTrip(result.data);
        setDate(formatDate(result.data.startDate));
        result.data.riders.forEach((rider) => {
            if (rider._id === auth.user._id) return setJoined(true);
        });
    }, [auth.user._id]);

    const joinRide = async () => {
        tripsApi.joinRide(trip._id, trip.riders, auth.user._id);
        setLoading(true);
    };

    const leaveRide = async () => {
        tripsApi.leaveRide(trip._id, trip.riders, auth.user._id);
        setLoading(true);
        setJoined(false);
    };

    useEffect(() => {
        getTrip(match.params._id);
    }, [match.params._id, loading, getTrip]);

    useEffect(() => {
        if (auth.location && trip) return setLoading(false);
    }, [auth.location, trip, loading]);

    return (
        <>
            <Navbar />
            <main id="tripDetails">
                <div id="backgroundLogo" />
                {loading ? <></> :
                    <>
                        {joined ? <button onClick={leaveRide} id="leaveRide"><FaUserMinus className="joinLeave" /><span>Leave ride</span></button> : <button onClick={joinRide}><FaUserPlus className="joinLeave" /><span>Join ride</span></button>}
                        <h1>{trip.from.city} to {trip.to.city}</h1>
                        <h2>{date.date} {date.time}</h2>
                        <p>Riders:</p>
                        <ul>
                            {trip.riders.map((rider) => <li key={rider._id}>{rider.firstName} {rider.lastName}</li>)}
                        </ul>
                    </>
                }
            </main>
            <Footer />
        </>
    );
};

export default TripDetails;