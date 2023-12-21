import { FormEvent, useState } from 'react';
import './Input.scss';

interface IInput {
    setCity: React.Dispatch<React.SetStateAction<string>>;
}

function Input({setCity}: IInput) {
 
    const [inputValue, setInputValue] = useState(''); 

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setCity(inputValue);
        setInputValue('');
    }

  return (
    <form className='form' onSubmit={handleSubmit}>
        <input type="text" className='form-input-city' placeholder="Saisissez le nom d'une ville" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
    </form>
  );
}

export default Input
