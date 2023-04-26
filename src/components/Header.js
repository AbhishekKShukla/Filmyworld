import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useContext } from 'react';
import {Link} from 'react-router-dom';
import { Appstate } from '../App';

const Header=()=>{
    const useAppstate=useContext(Appstate);
    return (
        <div className="sticky z-10 header text-2xl flex justify-between text-red-500 font-bold p-1 border-b-2 border-gray-500">
           <Link to='/'> <span>Filmy<span className="text-white">Verse</span></span></Link>
           
           {
            useAppstate.login?
            <h1 className="text-lg text-right text-white flex items-center cursor-pointer">
            <Link to='/addmovie'> <Button><AddIcon className='mt-1' color='secondary' /> 
            <span className='text-white'> Add New</span></Button></Link></h1>
            :
            <h1 className="text-lg text-right bg-green-500 flex items-center cursor-pointer">
            <Link to='/login'> <Button>
             <span className='text-white font-medium capitalize'> Login</span></Button></Link></h1>
           }
           
          
            
            </div>
    )
}
export default Header;