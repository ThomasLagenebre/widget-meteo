import { FormEvent, useEffect, useState } from 'react';
import './Input.scss';
import axios from 'axios';

interface IInput {
    setCity: React.Dispatch<React.SetStateAction<string>>;
}

function Input({setCity}: IInput) {
 
    const [inputValue, setInputValue] = useState(''); 

    const [autoCompletClick, setAutoCompletClik] = useState(true);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setCity(inputValue);
        setInputValue('');
    }

    const [listCities, setListCities] = useState([]);
    const autoCompletCity = async (value: string) => {
      try {
        const response = await axios.get(
          `https://geo.api.gouv.fr/communes?nom=${value}&fields=departement&boost=population&limit=5`
        );

        setListCities(response.data)
        
      } catch (error) {
        console.log("Erreur lors du chargement de l'API");
      }
    };

    useEffect(() => {
      setAutoCompletClik(false)
      autoCompletCity(inputValue);
    }, [inputValue])


    const liCities = listCities.map((city, index) => (
      <li 
        key={index} 
        className='li-city' 
        onClick={() => {
          setAutoCompletClik(true); 
          setInputValue(''); 
          setCity(city.nom);
          }}
        >
        {city.nom}, 
        <span className='li-city-code'>{city.code}</span>
      </li>
    ))    

  return (
    <form className='form' onSubmit={handleSubmit}>
        <input 
          type="text" 
          className='form-input-city' 
          placeholder="Saisissez le nom d'une ville" 
          value={inputValue} 
          onChange={(e) => {
            setInputValue(e.target.value)
            }}/>
        {inputValue && !autoCompletClick && (
          <ul className='autocomplet-city-list'>
            {liCities}
          </ul>
        )}
    </form>
  );
}

export default Input
