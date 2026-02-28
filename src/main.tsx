import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { PrivyProvider } from '@privy-io/react-auth';

const rootElement = document.getElementById('root')!;
const privyAppId = import.meta.env.VITE_PRIVY_APP_ID;

if (!privyAppId || privyAppId === 'your_privy_app_id_here') {
  createRoot(rootElement).render(
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '1rem' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', textAlign: 'center', maxWidth: '32rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1rem' }}>Missing Privy Configuration</h2>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Your app crashed because the Privy App ID is invalid or missing.</p>
        <p style={{ color: '#64748b' }}>Please open your <code>.env</code> file, replace <code>your_privy_app_id_here</code> with your actual Privy App ID, and restart the development server.</p>
      </div>
    </div>
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <PrivyProvider
        appId={privyAppId}
        config={{
          loginMethods: ['email', 'google'],
          appearance: {
            theme: 'light',
            accentColor: '#4f46e5',
            showWalletLoginFirst: false,
          },
        }}
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </PrivyProvider>
    </StrictMode>
  );
}
