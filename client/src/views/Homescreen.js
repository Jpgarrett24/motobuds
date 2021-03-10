import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer';
import moto from '../assets/animations/motoGIF.gif';
import Navbar from '../components/Navbar';
import tripsApi from '../api/trips';
import useAuth from '../auth/useAuth';

const Homescreen = () => {
    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState(null);
    const auth = useAuth();

    const getTrips = async () => {
        const result = await tripsApi.getAll();
        setTrips(result.data);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getTrips();
    }, []);

    useEffect(() => {
        if (auth.location) {
            if (trips) return setLoading(false);
        }
    }, [auth.location, trips])

    console.log(auth.location);

    return (
        <>
            <Navbar />
            <main>
                <div id="backgroundLogo" />
                {loading ? <img src={moto} alt="Animation of a moving motorcylce to indiate loading." id="loadingGIF" /> :
                    <section>
                        {trips.map((trip, idx) => {
                            return (
                                <p key={idx}>
                                    {trip.name}
                                </p>
                            )
                        })}
                    </section>
                }
            </main>
            <Footer />
        </>
    );
};

export default Homescreen;