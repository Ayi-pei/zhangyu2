import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from 'react';
import AppRouter from './AppRouter';
import { AuthProvider } from './context/AuthProvider'; // 修改为导入 AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRouter />
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
