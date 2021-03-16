import React from 'react';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from 'react-flatpickr';

const DateTimePicker = ({ formData, setFormData }) => {
    return (
        <Flatpickr
            data-enable-time
            onChange={(startDate) => setFormData({ ...formData, startDate })}
            options={{
                minDate: 'today'
            }}
            value={formData.startDate}
        />
    );
};

export default DateTimePicker;