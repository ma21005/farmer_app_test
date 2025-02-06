import 'admin-lte/dist/css/adminlte.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    require('admin-lte');
  }, []);

  return (
    <div className="wrapper">
      <div
        className="content-wrapper d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <p>HOME</p>
      </div>
    </div>
  );
}

export default App;
