export function formatDate(rawDate) {
    let date = {}

    let newDate = new Date(rawDate);
    let month = newDate.getMonth();
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
    date = ({ ...date, date: (`${month} ${newDate.getDate()}, ${newDate.getFullYear()}`) });

    let AMPM = 'AM';
    let hour = newDate.getHours();
    if (hour > 12) {
        hour = newDate.getHours() - 12;
        AMPM = 'PM'
    }
    date = ({ ...date, time: (`${hour}:${newDate.getMinutes()} ${AMPM}`) });

    return date;
};