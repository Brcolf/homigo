import React from 'react';
import { useAuth } from './firebase';

function Home() {
  const { user, login, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏡 Welcome to Homigo</h1>
      {!user ? (
        <button onClick={login} className="px-4 py-2 bg-blue-600 text-white rounded">Sign in with Google</button>
      ) : (
        <>
          <p className="mb-2">Signed in as <strong>{user.displayName}</strong></p>
          <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">Sign out</button>
        </>
      )}
    </div>
  );
}

export default Home;