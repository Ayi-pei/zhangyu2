import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from 'react';
import AppRouter from './AppRouter';
import { AuthProvider } from './context/AuthProvider';
import { BindingProvider } from './context/BindingProvider';

function App() {
  return (
    <AuthProvider>
      <BindingProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <AppRouter />
          </Suspense>
        </Router>
      </BindingProvider>
    </AuthProvider>
  );
}

export default App;
