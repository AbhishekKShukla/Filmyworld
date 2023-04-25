import Header from './components/Header';
import Cards from './components/Cards';
import {Routes,Route} from 'react-router-dom'
import AddMovie from './components/AddMovie';
import Detail from './components/Detail';
import {createContext,useState} from 'react'
import Login from './components/Login';
import Signup from './components/Signup';


const Appstate=createContext();
function App() {
  const [userLogin,setUserLogin]=useState(false);
  const [userName,setUserName]=useState("");


  return (
    <Appstate.Provider value={{userLogin,userName,setUserLogin,setUserName}}>
    <div className="App relative">
      <Header/>
      <Routes>
        <Route path='/' element={<Cards/>}></Route>
        <Route path='/addmovie' element={<AddMovie/>}/>
        <Route path='/Detail/:id' element={<Detail/>}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/Signup' element={<Signup />}/>
      </Routes>
    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};
