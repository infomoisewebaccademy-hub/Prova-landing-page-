
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("CRITICAL APP ERROR:", error);
  // Fallback visivo in caso di crash totale all'avvio
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif; color: #333;">
      <h1>Si è verificato un errore durante il caricamento.</h1>
      <p>Controlla la console del browser (F12) per i dettagli.</p>
      <pre style="background: #eee; padding: 10px; border-radius: 5px; overflow: auto;">${error instanceof Error ? error.message : String(error)}</pre>
    </div>
  `;
}
