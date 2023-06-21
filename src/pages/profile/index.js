import { useNavigate } from "react-router-dom" 
import { useRef, useState } from "react"
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux"
import { UpdateProfileValidationSchema } from "../../store/slices/auth/validation"
import { changeProfile } from "../../store/slices/auth/slices"
import { Navigate } from "react-router-dom";
import Modal from "./component.confirmation";
import ImageProfile from "./component.profile";


export default function Profile(){
    //hide the error message
    const [hidden,SetHidden] = useState("hidden");
    //status of update profile button based on scenario
    const [isDisabled,SetIsDisabled] = useState(true)
    //status of profile update's validation status 
    const [updateStatus, SetUpdateStatus] = useState(false)

    const [showModalUpdateProfile, setShowModalUpdateProfile] = useState(false);
    const [showModalChangePassword, setShowModalChangePassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userData = useSelector(state => {
        return {
            loading : state.auth.loading,
            username : state.auth.username,
            telephone : state.auth.phone,
            email : state.auth.email,
        }
    })
    
    
    // data reference
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const telephoneRef = useRef(null);

    //GENERAL buttons logic
    const onButtonUpdate = () =>{
            SetHidden("")
            SetIsDisabled(false)
    }

 
    async function onButtonConfirm () {
        //if updateStatus still false, user cant go anywhere xcept cancel
        if(!updateStatus){
            return SetIsDisabled(false)
        }
        //object for username
        const usernameObj = {
            currentUsername : userData.username ,
            newUsername : usernameRef.current?.value
        }
        //object for email
        const emailObj = {
            currentEmail : userData.email,
            newEmail : emailRef.current?.value
        }
        //object for telephone
        const phoneObj = {
            currentPhone : userData.telephone ,
            newPhone : telephoneRef.current?.value

        }

        dispatch(changeProfile({
            usernameObj, emailObj, phoneObj    
        }))


        navigate("/login")
    }

            
    const onButtonCancel = () => {

        SetHidden("hidden")

        usernameRef.current.value = "";
        emailRef.current.value = "";
        telephoneRef.current.value = "";

        return SetIsDisabled(true)
    }
    //edit buttons logic

    return(
<div> 
    <div className="h-full w-full flex flex-col justify-center items-center pt-5"
            >
            <Modal 
                onConfirm={
                    ()=>{
                        onButtonConfirm()}              
                     }
                type="submit"
                title="Confirmation"
                message={"Are you sure you want to change your profile data?\nYou need to re-login to see any changes"}
                status = {showModalUpdateProfile}
               /> 

            <Modal 
                onConfirm={
                    ()=>{
                        navigate("/change")}              
                     }
                type="submit"
                title="Confirmation"
                message={"Are you sure you want to change your password?\nYou need to re-login to see any changes"}
                status = {showModalChangePassword}
               /> 

        <h1 className="text-5xl font-semibold pb-10">Profile</h1>
                {/* whole center container */}
        <div className="h-3/4 w-2/3 flex flex-row">
            {/* left box */}
            <ImageProfile/>  
            <Formik
            
                initialValues={{ 
                username : "" ,
                email : "",
                telephone: "",
                // image : ""
                }}
                //belum diganti semua
                    validate={values => {
                        try {
                            // conditional : hanya mau ubah 1 data, tapi data lama ttp kepake
                            if(!values.username){
                                values.username = userData.username
                            }
                            if(!values.email){
                                values.email = userData.email
                            }
                            if(!values.telephone){
                                values.telephone = userData.telephone
                            }
                            UpdateProfileValidationSchema.validateSync(values)
                            SetHidden("hidden")
                            SetUpdateStatus(true)
                            return {}
                        } catch (error) {
                            //error modal only trigger, if button "comfirm" and cancel exist
                            if(!isDisabled){           
                                SetHidden("")
                            }
                            SetUpdateStatus(false)
                            console.log("error", error?.message)
                            return { message : error?.message }
                        }
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        // dispatch(changeProfile(values))
                        setSubmitting(false)
                    }}
                >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,validateForm,resetForm }) => (
                <form className="h-full w-full" onSubmit={handleSubmit}>


                    {/* right box :
                    box for show username, email, number, and update profile button */}
                    <div className="h-full flex flex-col ml-10 w-full bg-neutral-content drop-shadow-2xl">
                        <div className="flex flex-col justify-center">
                            <div className="flex mb-5 w-full bg-base-200 p-5 font-semibold">
                                <h1>Account Details</h1>
                            </div>
                            
                            <div className="px-5 space-y-1 flex flex-col justify-center">
                                <label className="label pt-1" >
                                    <span className="label-text font-medium">Name : </span>
                                </label>
                                <input type="text" 
                                    ref={usernameRef}
                                    name="username"
                                    disabled={isDisabled} 
                                    placeholder={userData.username}
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="input input-bordered w-full max-w-xs font-medium
                                     disabled:placeholder:text-yellow-950" />
                                    
                                <label className="label pt-1">
                                    <span className="label-text font-medium">E-mail : </span>
                                </label>
                                <input type="email" 
                                    ref={emailRef}
                                    name="email"
                                    disabled={isDisabled} 
                                    placeholder={userData.email} 
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="input input-bordered w-full max-w-xs font-medium
                                     disabled:placeholder:text-yellow-950" />
                                    
                                <label className="label pt-1">
                                    <span className="label-text font-medium">Telephone : </span>
                                </label>
                                <input type="tel"
                                    ref={telephoneRef}
                                    name="telephone"
                                    disabled={isDisabled} 
                                    placeholder={userData.telephone}
                                    value={values.telephone}
                                    onChange={handleChange}
                                    onBlur={handleBlur} 
                                    className="input input-bordered w-full max-w-xs font-medium
                                     disabled:placeholder:text-yellow-950" />
                            </div>
                        </div>

                        {/* left buttons section */}
                        <div className="flex flex-row h-full w-full mt-14">
                            <div className="h-full w-full flex flex-row items-end pb-5">
                                <div hidden={!isDisabled}>
                                    <button className="btn btn-neutral left-0 mx-5 w-40 flex-grow"
                                        onClick={onButtonUpdate}
                                        >Update Profile</button>

                                    <button className="btn btn-neutral left-0 mx-5 w-44"
                                        onClick={()=>{
                                            setShowModalChangePassword(!showModalChangePassword);
                                        }}
                                        >Change Password</button>

                                </div>
                                <div hidden={isDisabled}>
                                    <button className="btn btn-success left-0 mx-5 w-40"
                                        onClick={()=>{
                                            validateForm();
                                            setShowModalUpdateProfile(!showModalUpdateProfile);
                                        }}
                                        type="submit"
                                    >Confirm</button>


                                    <button className="btn btn-error left-0 mx-5 w-40"
                                        onClick={()=>{
                                            onButtonCancel()
                                            resetForm()
                                    }}        
                                    >Cancel</button>
                                </div>
                            </div>
 
                        </div>
                        {
                        errors.message && (
                            <div className={hidden}> 
                            <div className="alert alert-error fixed top-0 w-full left-0 gap-0 gap-y-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{errors.message}</span>
                            </div>
                            </div>
                        )
                    }
                    </div>
                </form>
                )}
            </Formik> 
        </div>
    </div>
</div>
    )
}
