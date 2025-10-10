import WeatherNav from './components/WeatherNav.jsx';
import { AppProvider } from './context/AppContext.jsx';
import AppBody from "./components/AppBody.jsx";
import Footer from './components/Footer.jsx';
import GoogleMaps from './components/GoogleMaps.jsx';

function App() {
  return (
    <AppProvider>
      <div className="container">
        <WeatherNav />
        <AppBody />
        <GoogleMaps />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
