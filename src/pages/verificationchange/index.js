

import { useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { verifiedChangeEmail } from '../../store/slices/auth/slices';


export default function VerificationChangeEmail () {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        // @request verification
        const dummyToken = location.pathname.slice(27)
   
        const timeoutID = setTimeout(() => {
            dispatch(verifiedChangeEmail({token : dummyToken}))
            .then(()=> navigate("/login"))
 
            
        }, 4000)
        
        return () => clearTimeout(timeoutID)
    },[])
    
    


    return (
        <div className='h-full w-full flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold'>Welcome! Your new email has been verified!<br/></h1>
            <h3>...</h3>
            <h3>We will redirect you to login page soon.</h3>
        </div>
    )
}

