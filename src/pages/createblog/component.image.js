import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useDropzone } from "react-dropzone"
import { updateImageProfile } from "../../store/slices/auth/slices"


export default function ImageProfile({
    getFileData = (Imgfile) => {
    }

}
   
){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [file, setFile] = useState(null)
    const [uploadFile, setUploadFile] = useState(null)

    // @event handler
    const onDrop = (acceptedFiles) => {
        // console.log(acceptedFiles)
        setFile(file => file = acceptedFiles[0])
        // console.log(acceptedFiles[0])
    }


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
    const onButtonImageConfirm = () => {
        // @create form data
        console.log(file)
        const formData = new FormData()
        formData.append('fileInput', file)
        console.log(formData)
    }



    //status of update profile picture button based on scenario
    const [isImageDisabled,SetIsImageDisabled] = useState(true)


    return(
        <div className="h-full w-1/2 ">
            
        
            <div className=" bg-base-100 box-border flex flex-col items-center mb-5  px-3">
                        
                <div className="box-content border-none w-full flex flex-col items-center mt-2 text-center mx-5 my-5">
                            {/* //logic tampilin preview image */}
                        </div>
                        <div hidden={!isImageDisabled}> 
                            <div className="flex flex-row justify-center items-center">
                                <button                                       
                                    className="btn btn-secondary my-8 w-fit"
                                    onClick={onButtonImageUpdate}>
                                        Upload Image
                                </button>               
                            </div>                  
                        </div>

                        <div hidden={isImageDisabled}>
                            <div 
                            className="flex flex-col justify-center pb-5">
                                {/* all in one handle-image-input button */}
                                <div  {...getRootProps()}>
                                <button onClick={open}
                                onChange= { ()=>{
         
                                    getFileData(prevState => prevState = file)
                                }}
                                className="file-input   
                                file-input-bordered w-full flex flex-row justify-center
                                max-w-xs" >{file ? file.name : "Upload"}</button>
                                 <input 
                                 {...getInputProps({ name : 'image' })}/>
                                </div>
                                <label className="label flex flex-row justify-center items-start">
                                    <span className="label-text-alt leading-none"></span>
                                </label>                            

                                    <button                         
                                        className="btn btn-success"
                                        onClick={()=>{
                                            getFileData(prevState => prevState = file)
                                            SetIsImageDisabled(true)
                                        }}>
                                            Save
                                    </button>
                              
                            </div>
                        </div>                  
            </div>
        </div>
    )
}