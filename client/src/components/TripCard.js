import React from 'react'
import { FaUserFriends } from 'react-icons/fa'

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
        console.log(date.getHours());
        console.log(date.getMinutes());
    };

    formatTime(trip.startDate)

    return (
        <div id="tripCard">
            <h3>{trip.name}</h3>
            <p>{formatDate(trip.startDate)}</p>
            <span><FaUserFriends /> {trip.riders.length}</span>
        </div>
    );
};

export default TripCard;