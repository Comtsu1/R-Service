import './Home.css';
import {Header} from "./Components/Header";
import {Footer} from './Components/Footer';

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
