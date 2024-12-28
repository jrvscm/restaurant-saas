import axios from 'axios';

export async function fetchReservations() {
  try {
    const response = await axios.get('/api/reservations'); // Adjust the endpoint as needed
    const reservations = response.data;

    return {
      reservations,
      totalReservations: reservations.length, // Adjust based on API response
    };
  } catch (error) {
    console.error('Failed to fetch reservations:', error);
    return {
      reservations: [],
      totalReservations: 0,
    };
  }
}
