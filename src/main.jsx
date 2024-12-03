import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', function() {
  window.scrollTo(0, 0);
});

window.onload = function() {
  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 0);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
