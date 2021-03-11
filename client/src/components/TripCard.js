import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';

const TripCard = ({ trip }) => {
    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let month = date.getMonth();
        month =
            month === 0 ? 'Jan' :
                month === 1 ? 'Feb' :
                    month === 2 ? 'Mar' :
                        month === 3 ? 'Apr' :
                            month === 4 ? 'May' :
                                month === 5 ? 'Jun' :
                                    month === 6 ? 'Jul' :
                                        month === 7 ? 'Aug' :
                                            month === 8 ? 'Sep' :
                                                month === 9 ? 'Oct' :
                                                    month === 10 ? 'Nov' : 'Dec'
        return (`${month} ${date.getDate()}, ${date.getFullYear()}`);
    };

    const formatTime = (rawDate) => {
        let date = new Date(rawDate);
        let AMPM = 'AM';
        let hour = date.getHours();
        if (hour > 12) {
            hour = date.getHours() - 12;
            AMPM = 'PM'
        }
        return (`${hour}:${date.getMinutes()} ${AMPM}`);
    };

    formatTime(trip.startDate)

    return (
        <Link to={`/rides/${trip._id}`}>
            <div id="tripCard">
                <h3>{trip.name}</h3>
                <p>{formatDate(trip.startDate)}</p>
                <p>{formatTime(trip.startDate)}</p>
                <span><FaUserFriends /> {trip.riders.length}</span>
            </div>
        </Link>
    );
};

export default TripCard;