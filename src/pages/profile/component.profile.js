import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useDropzone } from "react-dropzone"
import { keepLogin, updateImageProfile } from "../../store/slices/auth/slices"


export default function ImageProfile(){
    const blankProfileURL = "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [file, setFile] = useState(null)
    const {image} = useSelector(state =>{
        return{
            image : state.auth?.imgProfile,
        }
    })
    
    //initialize preview dengan imageuRL state dari login    
    const [preview, setPreview] = useState(image)

    const { loading } = useSelector(state => {
        return {
            loading : state.auth.isUploadImageLoading
        }
    })
    
    // @event handler
    const onDrop = (acceptedFiles) => {
        // console.log(acceptedFiles)
        setFile(file => file = acceptedFiles[0])
        // console.log(acceptedFiles[0])
    }
    
    const [isImageDisabled,SetIsImageDisabled] = useState(true)
    // @hooks
    const { getRootProps, getInputProps, open} = useDropzone({
        onDrop , 
        maxFiles: 1 , 
        accept : {'image/*' : [ ".jpg" , ".png" , ".jpeg" ]} ,
        noClick : true ,
        noKeyboard : true
    }) 

    // @another event handler
    //button logic
    const onButtonImageUpdate = () =>{
        SetIsImageDisabled(false)
    }
    const onButtonImageConfirm =  () => {
    
        const formData = new FormData()
        formData.append('file', file)
        dispatch(updateImageProfile(formData))
        setFile(null)
        SetIsImageDisabled(true)
        // navigate("/login")
 
    }
    
    useEffect(()=>{

    },[file])
    
    //to display a preview image
    const PreviewImage = ({
        file}) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreview(reader.result)
        }
        return(
           <img className="h-56 w-56 rounded-3xl" src={preview} alt="preview"/> 
        )
    }
    //status of update profile picture button based on scenario


    return(
        <div className="h-full w-1/2">
            {/* profile box */}
            <div className="flex flex-row justify-start w-full bg-base-200 py-5 pl-2 font-semibold">
            <button className="btn mr-3 p-0 h-fit min-h-6 w-6 leading-none"
              onClick={() => navigate("/")}>
            «
            </button>
                    <h1 className="min-h-6 ">Profile Picture</h1>
            </div>
        
                    <div className=" bg-neutral-content flex flex-col items-center mb-5 drop-shadow-2xl">
                        
                        <div className="box-content border-none w-full flex flex-col items-center mt-2 text-center mx-5 my-5">
                            {/* //logic tampilin preview image */}
                            {
                                file ?
                                <PreviewImage file={file}/>
                                :
                                //masukin state image 
                                <div>
                                    {
                                        (preview !== null) ?
                                        <img className="h-56 w-56 rounded-3xl" 
                                        src ={process.env.REACT_APP_IMAGE_URL + image} alt="user-profile" />
                                        :
                                        <img className="h-56 w-56 rounded-3xl" 
                                        src={blankProfileURL} alt="blank-profile"/>     
                                    }
                                </div>
                            }    
                        </div>
                        <div hidden={!isImageDisabled}> 
                            <div className="flex flex-row justify-center items-center">
                                <button                                       
                                    className="btn btn-secondary my-8"
                                    onClick={onButtonImageUpdate}>
                                        Change Profile Pict.
                                </button>               
                            </div>                  
                        </div>

                        <div hidden={isImageDisabled}>
                            <div 
                            className="flex flex-col justify-center pb-6">
                                {/* all in one handle-image-input button */}
                                <div  {...getRootProps()}>
                                    <button
                                    className="btn btn-neutral max-w-xs z-10" 
                                    onClick={open}                               
                                    >Choose a file
                                    <input {...getInputProps({ name : 'image' })}/>
                                    </button>
                                </div>
                                <label className="label flex flex-row justify-center items-start mb-4">
                                    <span className="label-text-alt leading-none"></span>
                                </label>
                             
                                    <button                         
                                        className="btn btn-success"
                                        onClick={onButtonImageConfirm}>
                                            Confirm
                                    </button>
                              
                            </div>
                        </div>                  
            </div>
  
                {/* blog buttons section */}
                <div className="flex flex-row items-center justify-center space-x-5 w-full">
                    <button className="btn btn-neutral w-1/2"
                    onClick={()=>{
                        navigate("/liked")
                    }}
                    >
                        LIKED BLOG
                    </button>
                    <button className="btn btn-neutral w-1/2"
                        onClick={()=>{
                            navigate("/create")
                        }}
                    >CREATE BLOG</button>
                </div>

        </div>
    )
}