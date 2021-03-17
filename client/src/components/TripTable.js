import React, { useEffect, useState } from 'react'
import { FaUserFriends, FaSearchLocation } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { formatDate } from '../helper/formatDate';

const TripTable = ({ trips }) => {
    const [search, setSearch] = useState('');
    const [tripsList, setTripsList] = useState(trips);

    useEffect(() => {
        return setTripsList(
            trips.filter((trip) => trip.from.city.toLowerCase().includes(search.toLowerCase()) || trip.to.city.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search, trips])

    return (
        <>
            <div id="searchBar">
                <label htmlFor="search"><FaSearchLocation /></label>
                <input type="text" id="search" placeholder="San Jose" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Meeting Location</th>
                        <th>End</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th><FaUserFriends size={30} id="numRiders" /></th>
                    </tr>
                </thead>
                <tbody>
                    {tripsList.map((trip) =>
                        <Link to={`/rides/${trip._id}`} key={trip._id}>
                            <tr>
                                <td>{trip.from.city}</td>
                                <td>{trip.to.city}</td>
                                <td>{formatDate(trip.startDate).date}</td>
                                <td>{formatDate(trip.startDate).time}</td>
                                <td>{trip.riders.length}</td>
                            </tr>
                        </Link>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default TripTable;