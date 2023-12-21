import axios from 'axios';
import AppHeader from '../AppHeader/AppHeader'
import Cards from '../Cards/Cards'
import './App.css'
import { useEffect, useState } from 'react';
import IWeather from '../@types/weather';

function App() {
  // On récupère la clef API depuis .env.local
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_URL

  // On créer un state pour stocker toutes les météos des villes voulues (tableau d'objet)
  const [dataWeathers, setDataWeathers] = useState<[] | IWeather[]>([]);


  // Cette fonction récupère la météo de la ville voulue et l'ajoute dans le state
  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric&lang=fr&appid=${apiKey}`
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
  }, [])


  return (
    <>
    <AppHeader />
    <Cards dataWeathers={dataWeathers}/>
    </>
  )
}

export default App
