


import { useEffect, useState , useRef} from 'react';
import { Formik } from "formik"
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { ChangePasswordValidationSchema } from '../../store/slices/auth/validation';
import { changePassword } from '../../store/slices/auth/slices';

export default function Change(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [hidden,setHidden] = useState("hidden");
    // useref for input
    const passwordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const rePasswordRef = useRef(null);
    //state for hide button
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    function onButtonChange(){
        const password = {
            currentPassword : passwordRef.current?.value,
            password : newPasswordRef.current?.value,
            confirmPassword : rePasswordRef.current?.value

        } 
        dispatch(changePassword(password))
        return navigate("/login")
    }



    return(
        <div className="h-full w-full flex justify-center items-center">
            <div className="h-2/3 bg-base-200 px-10 flex items-center">
                <div className="form-control w-full max-w-xs">
                    <h3 className="pl-2 pb-10 text-2xl">Change Password</h3>
                <div className="space-y-2 py-2">
                <Formik
                    initialValues={{
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    }}
                    validate={values => {
                        try {
                            ChangePasswordValidationSchema.validateSync(values)  
                            return {}
                        } catch (error) {
                            setHidden("")
                            console.log("error", error?.message)
                            return { message : error?.message }
                        }
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(changePassword(values))
                        setSubmitting(false)
                    }}
                    >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <form className="space-y-2"onSubmit={handleSubmit}>
                        <input 
                            ref={passwordRef}
                            autoComplete="off"
                            name="currentPassword"
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Current Password" 
                            className="input input-bordered w-full max-w-xs"
                            value={values.currentPassword}
                            onChange={handleChange}
                            onClick={()=>{setHidden("hidden")}} 
                        />

                    <input 
                            ref={newPasswordRef}
                            autoComplete="off"
                            name="newPassword"
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="New Password" 
                            className="input input-bordered w-full max-w-xs"
                            value={values.newPassword}
                            onChange={handleChange}
                            onClick={()=>{setHidden("hidden")}} 
                        />


                        <input 
                            ref={rePasswordRef}
                            autoComplete="off"
                            name="confirmPassword"
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Confirm Password" 
                            className="input input-bordered w-full max-w-xs"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onClick={()=>{setHidden("hidden")}} 
                        />
                        <label className="flex items-center mt-2">
                            <input
                            type="checkbox"
                            className="mr-2 w-4 h-4"
                            checked={isPasswordVisible}
                            onChange={togglePasswordVisibility}
                            />
                            <span className="text-sm text-gray-600">Show password</span>
                        </label>            

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
                    </form>
                    )}
        </Formik>
        </div>
                    <div className="py-4"></div>
                    <button class="flex justify-center items-center btn btn-neutral"
                            onClick={onButtonChange}
                    >
                        Submit
                    </button>

                </div>
            </div>
        </div>
    )
}