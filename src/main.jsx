import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

// StrictMode intentionally omitted: it double-mounts effects in dev, which
// would re-initialize the WebGL context on the same canvas.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
