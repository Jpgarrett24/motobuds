import React from 'react';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from 'react-flatpickr';

const DateTimePicker = ({ date, setDate }) => {
    return (
        <Flatpickr
            data-enable-time
            onChange={(date) => setDate(date)}
            options={{
                minDate: 'today'
            }}
            value={date}
        />
    );
};

export default DateTimePicker;