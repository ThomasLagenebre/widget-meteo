import { Cloud } from 'react-feather';
import './AppHeader.scss';


function AppHeader() {
  return (
    <header className='appHeader'><Cloud size={40}></Cloud><h1>Widget Météo</h1></header>
  );
}

export default AppHeader;
