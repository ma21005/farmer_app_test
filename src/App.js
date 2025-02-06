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
      <p>HOME</p>
    </div>
  );
}

export default App;
