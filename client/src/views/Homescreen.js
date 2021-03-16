import React, { useEffect, useState } from 'react';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { ImTable } from "react-icons/im";

import Footer from '../components/Footer';
import moto from '../assets/animations/motoGIF.gif';
import Navbar from '../components/Navbar';
import tripsApi from '../api/trips';
import useAuth from '../auth/useAuth';
import TripCard from '../components/TripCard';
import TripTable from '../components/TripTable';

const Homescreen = () => {
    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState(null);
    const [view, setView] = useState('table');
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
        if (auth.location && trips) return setLoading(false);
    }, [auth.location, trips])

    return (
        <>
            <Navbar />
            <main>
                <div id="backgroundLogo" />
                {loading ? <img src={moto} alt="Animation of a moving motorcylce to indiate loading." id="loadingGIF" /> :
                    <section id="dashboard">
                        {view === 'table' ?
                            <span id="toggleView"><BsFillGrid3X3GapFill onClick={() => setView('card')} /></span> :
                            <span id="toggleView"><ImTable onClick={() => setView('table')} /></span>
                        }
                        {view === 'table' ?
                            <TripTable trips={trips} /> :
                            trips.map((trip) => <TripCard trip={trip} key={trip._id} />)
                        }
                    </section>
                }
            </main>
            <Footer />
        </>
    );
};

export default Homescreen;