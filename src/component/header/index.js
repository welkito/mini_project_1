import { useNavigate,Navigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../../store/slices/auth/slices";



export default function Header(){
    const blankProfileURL = "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"
    const dispatch = useDispatch()
    const toNavigate = useNavigate();
    const {  loading,image } = useSelector(state => {
        return {
            loading : state.auth.loading,
            image : state.auth.imgProfile
        }
    })
    const token = localStorage.getItem("token")
    const[hiddenLogOut,setHiddenLogOut] = useState(false)
    const[relogin,setRelogin] = useState(false)
    const[tokenStatus, setTokenStatus] = useState(token)
    
    useEffect (() =>{
        if(!tokenStatus){
            console.log("tombol login")
            setHiddenLogOut(false)
        }
    },[])

    useEffect (() =>{
        if(tokenStatus){
            console.log("tombol logout")
            setHiddenLogOut(true)
        }
        
    },[])
    

  
    const onButtonLogout = () => {
        console.log("done")
        if(token){
            console.log(token)
            dispatch(logout());
            return setHiddenLogOut(false);
        }
 
    }
  
    const onButtonLogin = () => {
        setRelogin(true)
    }
    
    if(relogin){
        return <Navigate to="/login" replace/>
    }

    
    return(
        <div className="w-full pl-3.5 py-3.5 flex flex-row items-center space-between fixed top-0 z-10">
            <div>
                {
                    (image !== null) ?
                        <img className="w-16 h-16 rounded-full" 
                        onClick={()=>
                            window.open(process.env.REACT_APP_IMAGE_URL + image, '_blank', 'noopener,noreferrer')} 
                        src={process.env.REACT_APP_IMAGE_URL + image} alt="user-profile" />
                    :
                        <img className="w-16 h-16 rounded-full" 
                        onClick={()=>
                            window.open(blankProfileURL, '_blank', 'noopener,noreferrer')}
                        src={blankProfileURL} alt="blank-profile"/>     
                }
            </div>
            <div className="flex-grow pl-4">
                <h1 className="text-xl font-semibold">Mini Project.</h1>
            </div>
            {/* hide one of button according to token status in local storage*/}
            <div className="pr-1 flex flex-row items-center justify-end gap-4">
                {/* hide when log out */}
                <div className={hiddenLogOut ? "": "hidden"}>
                    <div className=" flex flex-row items-center justify-end gap-4">
                        <button className="btn btn-ghost font-bold"
                            onClick={()=>{toNavigate("/Profile")}}
                            >Profile.
                        </button>
                    {/* logout button section */}
                        <button className="btn btn-ghost font-bold text-red-600 w-fit"
                            onClick={onButtonLogout}>
                            Log out.
                        </button>            
                    </div>
                </div>
                {/* hide when log in */}
                <div className={hiddenLogOut? "hidden": " "}>
                    <button className="flex btn btn-ghost text-netural font-bold justify-self-end"
                        onClick={onButtonLogin}
                        >Login.
                    </button>
                </div>
            </div>

        </div>
    )
}