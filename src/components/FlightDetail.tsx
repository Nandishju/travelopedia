import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
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

const FlightDetail: React.FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://flight-status-mock.core.travelopia.cloud/flights/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFlight(data);
        setError(null);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, [id]);

  const formatDepartureTime = (departureTime: string): string => {
    return moment(departureTime).format('MMMM Do YYYY, h:mm:ss a');
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {error && <ErrorComponent message={error} />}
      {flight && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Flight Detail</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-semibold text-gray-700">Flight Number</p>
              <p className="text-lg text-gray-900">{flight.flightNumber}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Airline</p>
              <p className="text-lg text-gray-900">{flight.airline}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Origin</p>
              <p className="text-lg text-gray-900">{flight.origin}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Destination</p>
              <p className="text-lg text-gray-900">{flight.destination}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Departure Time</p>
              <p className="text-lg text-gray-900">{formatDepartureTime(flight.departureTime)}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Status</p>
              <span className={`text-lg text-white font-semibold px-2 py-1 rounded-full ${flight.status === 'On Time' ? 'bg-green-500' : flight.status === 'Delayed' ? 'bg-red-500' : flight.status === 'Boarding' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                {flight.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightDetail;
