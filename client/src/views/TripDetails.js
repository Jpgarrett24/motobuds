import React, { useEffect, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';

import Footer from '../components/Footer';
import { formatDate } from '../helper/formatDate';
import Navbar from '../components/Navbar';
import tripsApi from '../api/trips';
import useAuth from '../auth/useAuth';

const TripDetails = ({ match }) => {
    const [trip, setTrip] = useState();
    const [date, setDate] = useState();
    const [loading, setLoading] = useState(true);
    const auth = useAuth();

    const getTrip = async (_id) => {
        let result = await tripsApi.getOne(_id);
        setTrip(result.data);
        setDate(formatDate(result.data.startDate));
    };

    const joinRide = async () => {
        const updatedRiders = {
            "riders": []
        }
        trip.riders.forEach((rider) => updatedRiders.riders.push(rider._id));
        updatedRiders.riders.push(auth.user._id);
        tripsApi.joinRide(trip._id, updatedRiders);
        setLoading(true);
    };

    useEffect(() => {
        getTrip(match.params._id);
    }, [match.params._id, loading]);

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
                        <button onClick={joinRide}><FaUserPlus id="joinLogo" /><span>Join ride</span></button>
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