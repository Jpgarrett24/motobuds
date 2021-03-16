import React from 'react'
import { FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { formatDate } from '../helper/formatDate';

const TripTable = ({ trips }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th><FaUserFriends size={30} id="numRiders" /></th>
                </tr>
            </thead>
            <tbody>
                {trips.map((trip) =>
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
    );
};

export default TripTable;