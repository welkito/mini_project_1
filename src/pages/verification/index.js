import { useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verified } from '../../store/slices/auth/slices';
import { Navigate } from 'react-router-dom';

export default function Verification () {
    const location = useLocation();
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        // @request verification
  
        const dummyToken = location.pathname.slice(14)
        const timeoutID = setTimeout(() => {
            dispatch(verified({token : dummyToken}))
        }, 4000)

        return () => clearTimeout(timeoutID)
    },[])

     
    if(localStorage.getItem("token")){
        return <Navigate to="/" replace/>
    }
   

    return (
        <div className='h-full w-full flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold'>Welcome! You have been verified!</h1>
            <h3>...</h3>
            <h3>We will redirect you to home page soon.</h3>
        </div>
    )
}

