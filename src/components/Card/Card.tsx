import { X } from 'react-feather';
import IWeather from '../@types/weather';
import './Card.scss';

interface ICard {
  weather: IWeather;
  id: number;
  deleteCard: (row: number, cityToRemove: string) => void;
}


function Card({weather, id, deleteCard}: ICard) {

  // Pour chaque élément du tableau weather (chaque ville peut avoir plusieurs conditions météorologiques en même temps), on retourne un span avec la description de la condition
  const weatherConditionsDescription = weather.weather.map((condition, index) => {
    return <span key={index}>{condition.description}{index < weather.weather.length - 1 && ' / '} </span>
  })

  // Pour chaque élément du tableau weather on récupère également l'icône correpondant et on le place dans une balise img
  const weatherIcons = weather.weather.map((condition, index) => {
    return <img key={index} src={`http://openweathermap.org/img/wn/${condition.icon}@2x.png`} alt="" />
  })

  const handleClick = () => {
    deleteCard(id, weather.name)
  }
 
  

  return (
    <div className='card'>
      <div className='card-left'>
        <div className='card-left-data'>
          <p className='card-left-data-city'>{weather.name}, {weather.sys.country}</p>
          <p className='card-left-data-weather-description'>{weatherConditionsDescription}</p>
        </div>
        <p className='card-left-temperature'>{Math.round(weather.main.temp)}°</p>
      </div>
      <div className='card-right'>
        <div className='card-right-weather-icon'>
          {weatherIcons}
        </div>
        <span className='card-right-close' onClick={handleClick}><X /></span>
      </div>
    </div>
  );
}

export default Card;
