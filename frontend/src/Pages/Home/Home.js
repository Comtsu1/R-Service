import './Home.css';
import {Header} from "./Components/Header/Header";
import {Footer} from './Components/Footer';
import { Profile } from './Components/Header/Profile_Bar/Profile';

function Home() {
  return (
    <div className='Home'>
      <Header/>
      <div className='Main-Content'></div>
      <Footer/>
    </div>
  );
}

export {Home};
