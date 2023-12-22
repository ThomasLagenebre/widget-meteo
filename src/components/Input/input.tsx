import { FormEvent, useEffect, useState } from 'react';
import './Input.scss';
import axios from 'axios';

interface IInput {
    setCity: React.Dispatch<React.SetStateAction<string>>;
}

interface ICity {
    "codesPostaux": string[],
    "nom": string,
    "code": string,
    "_score": number,
    "departement": {
        "code": string;
        "nom": string;
    }
}

function Input({setCity}: IInput) {
  
    const [inputValue, setInputValue] = useState(''); 

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setCity(inputValue);
        setInputValue('');
    }

    const [citiesList, setCitiesList] = useState<ICity[]>([]);

    const autoCompletCity = async (value: string) => {
      try {
        const response = await axios.get(
          `https://geo.api.gouv.fr/communes?nom=${value}&fields=departement,codesPostaux&boost=population&limit=5`
        );

        setCitiesList(response.data)
        
      } catch (error) {
        console.log("Erreur lors du chargement de l'API");
      }
    };

    useEffect(() => {
      autoCompletCity(inputValue);
    }, [inputValue])


     const liCities = citiesList.map((city, index) => (
      <li 
        key={index} 
        className='li-city' 
        onClick={() => {
          setInputValue(''); 
          setCity(city.nom);
          }}
        >
        {city.nom}, 
        <span className='li-city-code'> {city.codesPostaux[0]}</span>
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
        {inputValue && (
          <ul className='autocomplet-city-list'>
            {liCities}
          </ul>
        )}
    </form>
  );
}

export default Input
