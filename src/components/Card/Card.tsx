import { CloudRain } from 'react-feather';
import './Card.scss';


function Card() {
  return (
    <div className='card'>
      <div className='card-left'>
        <div className='card-left-data'>
          <p className='card-left-data-city'>Paris</p>
          <p className='card-left-data-weather-description'>Brumes</p>
        </div>
        <p className='card-left-temperature'>11°</p>
      </div>
      <div className='card-right'>
        <div className='card-right-weather-icon'>
          <CloudRain size={60}></CloudRain>
        </div>
      </div>
    </div>
  );
}

export default Card;
