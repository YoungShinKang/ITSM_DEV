import moment from 'moment';

export const formatDate = (date, format = 'YYYY-MM-DD') =>
  date ? moment(date).format(format) : date;

export const formatDateTime = (date, format = 'MMMM D, YYYY, h:mm A') =>
  date ? moment(date).format(format) : date;

export const formatDateTimeForAPI = date =>
  date
    ? moment(date)
        .local()
        .format()
    : date;

export const formatDateTimeConversational = date => (date ? moment(date).fromNow() : date);
