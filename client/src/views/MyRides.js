import React, { useCallback, useEffect, useState } from 'react';

import Footer from '../components/Footer';
import moto from '../assets/animations/motoGIF.gif';
import Navbar from '../components/Navbar';
import TripCard from '../components/TripCard';
import useAuth from '../auth/useAuth';
import usersApi from '../api/users';

const MyRides = () => {
    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState(null);
    const auth = useAuth();

    const getMyRides = useCallback(async () => {
        let result = await usersApi.getMyRides(auth.user._id);
        console.log(result);
        setTrips(result.data.trips);
    }, [auth.user._id]);

    useEffect(() => {
        window.scrollTo(0, 0);
        getMyRides();
    }, [getMyRides]);

    useEffect(() => {
        if (auth.location && trips) return setLoading(false);
    }, [auth.location, trips])

    return (
        <>
            <Navbar />
            <main>
                <div id="backgroundLogo" />
                {loading ? <img src={moto} alt="Animation of a moving motorcylce to indiate loading." id="loadingGIF" /> :
                    <section id="dashboard">
                        {trips.map((trip, idx) => {
                            return (
                                <TripCard key={trip._id} trip={trip} />
                            )
                        })}
                    </section>
                }
            </main>
            <Footer />
        </>
    );
};

export default MyRides;