import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';

import { formatDate } from '../helper/formatDate';

const TripCard = ({ trip }) => {
    const date = formatDate(trip.startDate);

    return (
        <Link to={`/rides/${trip._id}`}>
            <div id="tripCard">
                <h3>{trip.name}</h3>
                <p>{date.date}</p>
                <p>{date.time}</p>
                <span><FaUserFriends /> {trip.riders.length}</span>
            </div>
        </Link>
    );
};

export default TripCard;