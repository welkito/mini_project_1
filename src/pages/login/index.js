import { useNavigate } from "react-router-dom";
import {useEffect, useRef,useState} from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { Formik } from "formik";
import {  login } from "../../store/slices/auth/slices"
import { loginValidationSchema } from "../../store/slices/auth/validation";

export default function Login(){
    const toNavigate = useNavigate();
    const dispatch = useDispatch()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [fieldType, setFieldType] = useState("username");
    const [hidden,setHidden] = useState("hidden");
    //belum tau kepake atau engga
    const { loading, isVerified } = useSelector(state => {
        return {
            loading : state.auth.loading,
            isVerified : state.auth.isVerified
        }
    })

    const token = localStorage.getItem("token")
    console.log(isVerified)
    // @ref
    const fieldRef = useRef(null)
    const passwordRef = useRef(null)
    
    // @event handler :// when login
    const onButtonLogin = () => {
        setHidden("")
        const field = fieldRef.current?.value
        const password = passwordRef.current?.value
        const type = fieldType;
        dispatch(login({ field : field,
             password : password, 
             type : type }))
        // @redirect
    }
    
   
       if (token) {
           return <Navigate to="/" replace/>
       }


    const onReset = () => {
        toNavigate("/email")
    }

    const onRegister = () =>{
        setHidden("hidden")
        toNavigate("/register")
    }

    
    const onChooseType = (event) => {
        event?.preventDefault()
        console.log(event?.target?.value)
        setFieldType((prevState) => prevState = event?.target?.value)
    }
    
    
    // helping functions
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }



    return(
        <div className="h-full w-full flex justify-center items-center">
           
            <div className="w-550 h-fit bg-base-200 px-10 pt-55 flex items-center">

            <Formik
                initialValues={{ 
                    isUsername : true,
                    isEmail : false,
                    isTelephone : false,
                    username : "", 
                    password: "" ,
                    email : "",
                    telephone: ""
                }}
                    validate={values => {
                        try {
                            if(fieldType === "username" ){
                                values.isUsername = true;
                                values.isEmail = false;
                                values.isTelephone = false;
                            }
                            if(fieldType === "email" ){
                                values.isUsername = false;
                                values.isEmail = true;
                                values.isTelephone = false;
                            }
                            if(fieldType === "telephone" ){
                                values.isUsername = false;
                                values.isEmail = false;
                                values.isTelephone = true;
                            }
                            loginValidationSchema.validateSync(values)

                            return {}
                        } catch (error) {
                            console.log("error : ", error?.message)
                            return { message : error?.message }
                        }
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(login(values))
                        setSubmitting(false)
                    }}
                >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    
                <div className="form-control w-full max-w-xs"
                    onSubmit={handleSubmit}
                >

                    <h3 className="flex justify-center items-center py-10 text-lg font-medium"
                        >
                        Sign In
                    </h3>
                    <select className="select select-ghost w-full max-w-xs pl-1 my-0 focus:outline-none focus:bg-base-200"
                        onChange={onChooseType} >
                            {/* <option value="" disabled selected>Login Method :</option> */}
                            <option value="username">Username : </option>
                            <option value="email">E-mail : </option>
                            <option value="telephone">Telephone : </option>
                    </select>
                    <input 
                        type="text" 
                        name={fieldType}
                        ref={fieldRef}
                        placeholder="Type here..." 
                        className="input input-bordered w-full max-w-xs" 
                        value={values[fieldType]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onClick={()=>{setHidden("hidden")}}
                    />
                    <label className="label pt-3">
                        <span className="label-text font-semibold">Password : </span>
                    </label>
                    <input 
                            name="password"
                            ref={passwordRef}
                            autoComplete="off"
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Type Here" 
                            className="input input-bordered w-full max-w-xs"
                            value={values.password}
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
                    <div className="py-4"></div>
                    <button disabled={isSubmitting} type="submit" className="flex justify-center items-center btn btn-neutral"
                            onClick={onButtonLogin}
                    >
                        Login
                    </button>
                    <label className="label pt-8 space-x-10 mb-4">
                        <a className="label-text  font-semibold" 
                            onClick={onRegister}>
                            I'm new here!
                        </a>
                        <a className="label-text font-semibold" 
                            onClick={onReset}>
                            Forgot password?
                        </a>
                        
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
 
                </div>
                )}
                </Formik>
            </div>
        </div>
    )
}