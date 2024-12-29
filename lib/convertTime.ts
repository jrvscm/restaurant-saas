export const convertTo24HourFormat = (time: string): string => {
  const [hours, minutesPart] = time.split(':');
  const [minutes, period] = minutesPart.split(' ');

  let hours24 = parseInt(hours, 10);
  if (period === 'PM' && hours24 < 12) {
    hours24 += 12;
  } else if (period === 'AM' && hours24 === 12) {
    hours24 = 0;
  }

  return `${hours24.toString().padStart(2, '0')}:${minutes}`;
};
