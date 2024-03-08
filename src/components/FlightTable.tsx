// FlightTable.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

interface Props {
  flights: Flight[];
}

const FlightTable: React.FC<Props> = ({ flights }): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          <th>Flight Number</th>
          <th>Airline</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Departure Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {flights.map(flight => (
          <tr key={flight.id}>
            <td><Link to={`/flight/${flight.id}`}>{flight.flightNumber}</Link></td>
            <td>{flight.airline}</td>
            <td>{flight.origin}</td>
            <td>{flight.destination}</td>
            <td>{flight.departureTime}</td>
            <td>{flight.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlightTable;
