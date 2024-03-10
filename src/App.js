import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightBoard from './components/FlightBoard.tsx';
import FlightDetail from './components/FlightDetail.tsx';
import Layout from './components/Layout.tsx';

function App(): JSX.Element {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" exact element={<FlightBoard/>} />
        <Route path="/flight/:id" element={<FlightDetail/>} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
