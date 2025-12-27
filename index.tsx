
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("Starting Velo App...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  const err = new Error("Could not find root element to mount to");
  console.error(err);
  throw err;
}

try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React mounted successfully.");
} catch (e) {
    console.error("React mount failed:", e);
    throw e;
}
