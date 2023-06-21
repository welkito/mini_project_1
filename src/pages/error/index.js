import { useNavigate } from "react-router-dom"
import Modal from "../../component/confirmation";
export default function Error404(){
    const navigate =useNavigate();

    return(
        <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="text-xl">Sorry, the page doesn't exist.<br></br></h1>
 
            <a className="pt-6" onClick={()=>{
                navigate("/")
            }}>Click this sentence to redirect to homepage.</a>
 
        </div>


    )



}



