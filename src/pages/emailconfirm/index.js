
import { useState } from "react";
import { Formik } from "formik";
import { ForgotPasswordValidationSchema } from "../../store/slices/auth/validation";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { forgotPassword } from "../../store/slices/auth/slices";

export default function Email(){
    //@error hide event
    const [hidden,setHidden] = useState("hidden");
    //email value
    const emailRef = useRef("");
    const dispatch = useDispatch();

    function onButtonForgotPassword(){
        const email = emailRef.current?.value;
        dispatch(forgotPassword({email : email}))
    }
    return(
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-550 h-2/3 bg-base-200 px-10 flex items-center">
                <div className="form-control w-full max-w-xs">
                    <h3 className="pl-2 pb-10 text-2xl">Email Confirmation</h3>
                <div className="space-y-2 py-2">
                <label className="label">
                        <span className="label-text text-sm">We will send verification link to your email.<br></br> Make sure to click the link in given time.</span>
                </label>
                <Formik
                    initialValues={{
                        email : ""
                    }}
                    validate={values => {
                        try {
                            ForgotPasswordValidationSchema.validateSync(values)  
                            return {}
                        } catch (error) {
                            setHidden("")
                            console.log("error", error?.message)
                            return { message : error?.message }
                        }
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(forgotPassword(values))
                        setSubmitting(false)
                    }}
                    >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                    <input 
                    ref={emailRef}
                    name = "email"
                    type="email" 
                    placeholder="Email" 
                    value={values.email}
                    onChange={handleChange}
                    onClick={()=>{setHidden("hidden")}}
                    className="input input-bordered w-full max-w-xs" />
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
                    //based on the verif link, reset/
                            onClick={onButtonForgotPassword}
                    >
                        Submit
                    </button>

                </div>
            </div>
        </div>
    )
}