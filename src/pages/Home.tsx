import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonSpinner } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const apiKey = '0a572f3d0cc8dc28691929f3ac50c5e4'; // Ganti dengan API Key OpenWeather-mu
  const city = 'Manado';

  useEffect(() => {
    // Fungsi untuk fetch data cuaca dari API
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>WeatherApp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">WeatherApp</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading ? (
          <div className="spinner-container">
            <IonSpinner name="crescent" />
          </div>
        ) : weatherData ? (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{weatherData.name}</IonCardTitle>
              <IonCardSubtitle>{weatherData.weather[0].description}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="weather-info">
                <IonImg src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />
                <h2>{weatherData.main.temp} °C</h2>
                <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
                <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
              </div>
            </IonCardContent>
          </IonCard>
        ) : (
          <p>Data cuaca tidak tersedia</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
