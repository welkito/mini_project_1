
import { Formik } from "formik";
import {useRef,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { register } from "../../store/slices/auth/slices"
import { registerValidationSchema } from "../../store/slices/auth/validation"

export default function Register(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [status,setStatus] = useState("");
    const [hidden,setHidden] = useState("hidden");
    // useref for input
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const rePasswordRef = useRef(null);
    const telephoneRef = useRef(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    const onSignUp = () => {
        setHidden("")
        if(status === "login"){
            dispatch(register({
                username : usernameRef.current?.value,
                email : emailRef.current?.value,
                password : passwordRef.current?.value,
                telephone : telephoneRef.current?.value,
                rePassword : rePasswordRef.current?.value
            }))
            // navigate("/login")
        }
    }

    return(
        
        <div className="h-full w-full flex justify-center items-center">
            
            <div className="w-550 h-4/5 bg-base-200 px-10 flex items-center">
                <Formik
                initialValues={{ 
                    username : "", 
                    password: "" ,
                    rePassword : "",
                    email : "",
                    telephone: ""
                }}
                    validate={values => {
                        try {
                            registerValidationSchema.validateSync(values)
                            setStatus("login")
                            console.log(status)
                            return {}
                        } catch (error) {
                            console.log(status)
                            setStatus("")
                            console.log("error", error?.message)
                            return { message : error?.message }
                        }
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch.login(values)
                        setSubmitting(false)
                    }}
                >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    
                <div className="form-control w-full max-w-xs"
                onSubmit={handleSubmit}
                >
                    <h3 className="pl-2 pb-10 text-2xl">Register to continue</h3>
                    <div className="space-y-2 py-2">
                        <input 
                            ref={usernameRef}
                            autoComplete="off"
                            type="text"
                            placeholder="Name" 
                            className="input input-bordered w-full max-w-xs" 
                            name="username" 
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onClick={()=>{setHidden("hidden")}}
                            
                        />
                        <input 
                            ref={emailRef}
                            autoComplete="off"
                            name="email"
                            type="email" 
                            placeholder="Email" 
                            className="input input-bordered w-full max-w-xs" 
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onClick={()=>{setHidden("hidden")}}
                        />
                        <input 
                            ref={telephoneRef}
                            autoComplete="off"
                            name="telephone"
                            type="tel" 
                            placeholder="Telephone" 
                            className="input input-bordered w-full max-w-xs"
                            value={values.telephone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onClick={()=>{setHidden("hidden")}} 
                        />
                        <input 
                            ref={passwordRef}
                            autoComplete="off"
                            name="password"
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Password" 
                            className="input input-bordered w-full max-w-xs"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onClick={()=>{setHidden("hidden")}} 
                        />

                        <input 
                            ref={rePasswordRef}
                            autoComplete="off"
                            name="rePassword"
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Confirm Password" 
                            className="input input-bordered w-full max-w-xs"
                            value={values.rePassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                    </div>

                    <div className="py-4"></div>
                    <button disabled={isSubmitting} type="submit" className="flex justify-center items-center btn btn-neutral"
                            onClick={onSignUp}
                    >
                        Sign Up
                    </button>

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
                )}
                </Formik>

            </div>
        </div>
    )
}