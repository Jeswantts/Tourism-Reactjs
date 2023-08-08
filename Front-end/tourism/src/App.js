import './App.css';
import AllRoutes from './Routes/AllRoutes';
import { AuthProvider } from './Context/AuthContext';
import NavBar from './Components/Navbar';

function App() {
  return (
    <div>
        <AllRoutes/>
    </div>
  );
}

export default App;
