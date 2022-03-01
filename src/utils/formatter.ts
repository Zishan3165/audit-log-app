import moment from 'moment';

export function formatDateTime(time: Date | number | string) {
  if (!time) return '';
  let date = new Date(time);
  if (date.toString() === 'Invalid Date') {
    date = new Date(Number(time));
  }
  if (!date) return '';
  return moment(date).format('DD/M/YYYY hh:mm:ss A');
}

export function formatAction(action: string) {
  switch (action) {
    case 'DELETE':
      return 'Deleted';
    case 'UPDATE':
      return 'Updated';
    case 'CREATE':
      return 'Created';
    default:
      return action;
  }
}
