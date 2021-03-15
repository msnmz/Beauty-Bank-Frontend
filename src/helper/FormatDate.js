import moment from 'moment';

export const FormatDate = (date) => {
    const formattedDate = moment(date).format('DD/MM/YYYY');
    return formattedDate;
}

export const FormatDateTime = (date) => {
    const formattedDate = moment(date).format('DD/MM/YYYY hh:mm');
    return formattedDate;
}


