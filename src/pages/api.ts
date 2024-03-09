const API_BASE_URL = 'https://flight-status-mock.core.travelopia.cloud';

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

export const getFlights = async (): Promise<Flight[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/flights`);
    if (!response.ok) {
      throw new Error('Failed to fetch flights');
    }
    const data: Flight[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    return [];
  }
};

export const getFlightById = async (id: string): Promise<Flight | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/flights/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch flight details');
    }
    const data: Flight = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching flight details:', error);
    return null;
  }
};
