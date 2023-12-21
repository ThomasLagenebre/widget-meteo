import axios from 'axios';
import AppHeader from '../AppHeader/AppHeader'
import Cards from '../Cards/Cards'
import './App.css'
import { useEffect, useState } from 'react';
import IWeather from '../@types/weather';
import Input from '../Input/input';

function App() {
  // On récupère la clef API depuis .env.local
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_URL

  // On créer un state pour stocker toutes les météos des villes voulues (tableau d'objet)
  const [dataWeathers, setDataWeathers] = useState<[] | IWeather[]>([]);

  const [city, setCity] = useState('Paris');


  // Cette fonction récupère la météo de la ville voulue et l'ajoute dans le state
  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`
      );
        const newDataWeathers = [...dataWeathers, response.data]
        setDataWeathers(newDataWeathers)
        
    } catch (error) {
      console.log("Erreur lors du chargement de l'API");
    }
  };
  
  // Au premier rendu on récupère au moins le premier GeoCode (Paris)
  useEffect(() => {
    getWeather();
  }, [city])


  return (
    <>
    <AppHeader />
    <Input setCity={setCity}/>
    <Cards dataWeathers={dataWeathers}/>
    </>
  )
}

export default App
