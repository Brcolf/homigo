import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Onboarding from './Onboarding';
import SearchListings from './SearchListings';
import MortgagePrequal from './MortgagePrequal';
import OfferBuilder from './OfferBuilder';
import Professionals from './Professionals';
import DocumentVault from './DocumentVault';
import BuyerJourney from './BuyerJourney';
import { AuthProvider } from './firebase';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchListings /></ProtectedRoute>} />
          <Route path="/mortgage" element={<ProtectedRoute><MortgagePrequal /></ProtectedRoute>} />
          <Route path="/offer" element={<ProtectedRoute><OfferBuilder /></ProtectedRoute>} />
          <Route path="/pros" element={<ProtectedRoute><Professionals /></ProtectedRoute>} />
          <Route path="/vault" element={<ProtectedRoute><DocumentVault /></ProtectedRoute>} />
          <Route path="/journey" element={<ProtectedRoute><BuyerJourney /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;