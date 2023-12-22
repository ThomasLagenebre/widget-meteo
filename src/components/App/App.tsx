import axios from 'axios';
import AppHeader from '../AppHeader/AppHeader'
import Cards from '../Cards/Cards'
import './App.css'
import { useEffect, useState } from 'react';
import IWeather from '../@types/weather';
import Input from '../Input/input';
import { removeCityFromLocalStorage, setCitiesSelectedToLocalStorage } from '../../localStorage/localStorage';

function App() {
  // On récupère la clef API depuis .env.local
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

  // On créer un state pour stocker toutes les météos des villes voulues (tableau d'objet)
  const [dataWeathers, setDataWeathers] = useState<[] | IWeather[]>([]);

  const [city, setCity] = useState('Paris');

  const [citiesSelected, setCitiesSelected] = useState<string[]>([]);

  // Cette fonction récupère la météo de la ville voulue et l'ajoute dans le state
  // On lui passe un argument afin de pouvoir lui passer autre chose que ce qui est présent dans le state = au premier rendu 
  // on souhaite récupèrer les données de toutes les villes présentes dans le local storage
  const getWeather = async (city: string) => {
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
  
  const deleteCard = (row: number, cityToRemove: string) => {
    // On récupère le tableau et on supprime le numéro de la ligne passé en argument
    dataWeathers.splice(row, 1);
    // Puis on modifie le state de dataWeathers avec ce nouveau tableau
    setDataWeathers([...dataWeathers]);
    // On supprime la ville également du local storage
    removeCityFromLocalStorage(cityToRemove);
  }


  // Dès que le state 'city' change
  useEffect(() => {
    getWeather(city);
    const newCitiesSelected = [...citiesSelected, city]
    setCitiesSelected(newCitiesSelected)
  }, [city])

  useEffect(() => {
    setCitiesSelectedToLocalStorage(citiesSelected);
  }, [citiesSelected])


  return (
    <>
    <AppHeader />
    <Input setCity={setCity}/>
    <Cards dataWeathers={dataWeathers} deleteCard={deleteCard}/>
    </>
  )
}

export default App
