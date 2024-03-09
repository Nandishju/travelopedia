import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ErrorComponent from './ErrorComponent.tsx';

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

const getStatusBadgeColor = (status: string): string => {
  switch (status) {
    case 'On Time':
      return 'bg-green-500';
    case 'Delayed':
      return 'bg-yellow-500';
    case 'Boarding':
      return 'bg-blue-500';
    case 'Departed':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusTextColor = (status: string): string => {
  switch (status) {
    case 'On Time':
    case 'Boarding':
      return 'text-white';
    default:
      return 'text-gray-800';
  }
};

const FlightBoard: React.FC = (): JSX.Element => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://flight-status-mock.core.travelopia.cloud/flights');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFlights(data);
        setError(null);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const formatDepartureTime = (departureTime: string): string => {
    return moment(departureTime).format('MMMM Do YYYY, h:mm:ss a');
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      {error && <ErrorComponent message={error} />}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left py-4 px-4">Flight Number</th>
              <th className="text-left py-4 px-4">Airline</th>
              <th className="text-left py-4 px-4">Origin</th>
              <th className="text-left py-4 px-4">Destination</th>
              <th className="text-left py-4 px-4">Departure Time</th>
              <th className="text-left py-4 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.flightNumber} className="hover:bg-gray-100">
                <td className="border-t py-3 px-4">
                  <Link to={`/flight/${flight.id}`} className="text-blue-500 hover:underline">{flight.flightNumber}</Link>
                </td>
                <td className="border-t py-3 px-4">{flight.airline}</td>
                <td className="border-t py-3 px-4">{flight.origin}</td>
                <td className="border-t py-3 px-4">{flight.destination}</td>
                <td className="border-t py-3 px-4">{formatDepartureTime(flight.departureTime)}</td>
                <td className="border-t py-3 px-2">
                  <span className={`${getStatusBadgeColor(flight.status)} ${getStatusTextColor(flight.status)}  px-3 py-1 rounded-full text-center shadow-md`}>{flight.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightBoard;
