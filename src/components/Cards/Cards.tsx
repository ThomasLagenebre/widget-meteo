import IWeather from '../@types/weather';
import Card from '../Card/Card';
import './Cards.scss';

interface ICards {
  dataWeathers: IWeather[];
}


function Cards({dataWeathers}: ICards) {
 
  // Pour chaque ligne du tableau dataWeathers (donc pour chaque ville présente) on retourne un élément Card et on lui transmet en props les données correponds
  const cardsWeathers = dataWeathers.map((data, index) => <Card key={index} weather={data}/>)

  return (
    <div className='cards'>
      {cardsWeathers}
    </div>
  );
}

export default Cards
