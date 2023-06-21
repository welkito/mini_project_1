
import {  useState , useRef} from 'react';
import { Formik } from "formik"
import { useLocation } from 'react-router-dom';
import { useDispatch} from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { ResetPasswordValidationSchema } from '../../store/slices/auth/validation';
import { resetPassword } from '../../store/slices/auth/slices';

export default function Reset(){
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [hidden,setHidden] = useState("hidden");
    // useref for input
    const passwordRef = useRef(null);
    const rePasswordRef = useRef(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    //harus refresh biar muncul

    function onButtonReset(){
        const password = {
            password : passwordRef.current?.value,
            confirmPassword : rePasswordRef.current?.value
        } 
        const dummyToken = location.pathname.slice(16)
        localStorage.setItem("token",dummyToken)
        dispatch(resetPassword(password))
        return navigate("/login")
    }



    return(
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-550 bg-base-200 px-10 flex items-center">
                <div className="form-control w-full max-w-xs py-10">
                    <h3 className="pl-2 pb-10 text-2xl font-semibold">Reset Password</h3>
                <div className="space-y-2 py-2">
                <Formik
                    initialValues={{
                        password: "",
                        rePassword: "",
                    }}
                    validate={values => {
                        try {
                            ResetPasswordValidationSchema.validateSync(values)  
                            return {}
                        } catch (error) {
                            setHidden("")
                            console.log("error", error?.message)
                            return { message : error?.message }
                        }
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(resetPassword(values))
                        setSubmitting(false)
                    }}
                    >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                    <input 
                            ref={passwordRef}
                            autoComplete="off"
                            name="password"
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="New Password" 
                            className="input input-bordered w-full max-w-xs"
                            value={values.password}
                            onChange={handleChange}
                            onClick={()=>{setHidden("hidden")}} 
                        />
                        {/* <label className="flex items-center mt-2">
                            <input
                            type="checkbox"
                            className="mr-2 w-4 h-4"
                            checked={isPasswordVisible}
                            onChange={togglePasswordVisibility}
                            />
                            <span className="text-sm text-gray-600">Show password</span>
                        </label> */}

                        <input 
                            ref={rePasswordRef}
                            autoComplete="off"
                            name="rePassword"
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Confirm Password" 
                            className="input input-bordered w-full max-w-xs"
                            value={values.rePassword}
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
                    <div className="pb-4"></div>
                    <button class="flex justify-center items-center btn btn-neutral"
                            onClick={onButtonReset}
                    >
                        Submit
                    </button>

                </div>
            </div>
        </div>
    )
}