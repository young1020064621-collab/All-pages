import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('focusin', (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' && 
        ['text', 'number', 'email', 'password', 'search', 'tel', 'url'].includes((target as HTMLInputElement).type)) {
      setTimeout(() => {
        (target as HTMLInputElement).select();
      }, 0);
    }
  });
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
