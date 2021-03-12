import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer';
import { formatDate } from '../helper/formatDate';
import moto from '../assets/animations/motoGIF.gif';
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
    }

    useEffect(() => {
        getTrip(match.params._id);
    }, [match.params._id]);

    useEffect(() => {
        if (auth.location && trip) return setLoading(false);
    }, [auth.location, trip])

    console.log(trip);

    return (
        <>
            <Navbar />
            <main id="tripDetails">
                <div id="backgroundLogo" />
                {loading ? <img src={moto} alt="Animation of a moving motorcylce to indiate loading." id="loadingGIF" /> :
                    <>
                        <h1>{trip.name}</h1>
                        <h2>{date.date} {date.time}</h2>
                        <p>From: {trip.from.address}</p>
                        <p>To: {trip.to.address}</p>
                    </>
                }
            </main>
            <Footer />
        </>
    );
};

export default TripDetails;