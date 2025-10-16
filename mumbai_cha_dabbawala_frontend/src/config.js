// Centralized client config
// Use REACT_APP_BACKEND_URL in .env to override the default
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export { BACKEND_BASE_URL };
