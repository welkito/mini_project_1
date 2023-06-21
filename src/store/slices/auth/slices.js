import { createAsyncThunk } from "@reduxjs/toolkit"
// import { registerValidationSchema } from "./validation"
// import { encrypt } from "./encryption"
// import api from "../../utils/api.instance"
import axios from "axios";
import Toast from "react-hot-toast"
// import 'react-toastify/dist/ReactToastify.css';

// @import schema validation
import { loginValidationSchema, UpdateProfileValidationSchema, 
    registerValidationSchema, ForgotPasswordValidationSchema } from "./validation";


const urlAuth = "https://minpro-blog.purwadhikabootcamp.com/api/auth/";
const urlProfile = "https://minpro-blog.purwadhikabootcamp.com/api/profile/";

// @create async thunk

//done
export const login = createAsyncThunk(
    "auth/login",
    async (payload, { rejectWithValue }) => {
        try {

            await loginValidationSchema.validate(payload)
            
            //conditional according type data
            const data = {
                username : (payload.type === "username" ? payload.field : "" ),
                email : (payload.type === "email" ? payload.field : "" ),
                phone : (payload.type === "telephone" ? payload.field : "" ),
                password : payload.password
            }
            
            //ubah
            const response = await axios.post( urlAuth+"login",data)
            if(!response.data){
                return rejectWithValue({message : "Account not verify"})
            }

            Toast.success("Welcome!")
            // @save token to local storage
            localStorage.setItem("token", response?.data?.token)
            // console.log("berhasil!")
            //toaster:
            //welcome!

            return response.data["isAccountExist"]
        } catch (error) {
            console.error(error)
            Toast.error("Login : something went wrong.")
            return rejectWithValue(error.response.data)
        }
    }
)

//????
export const changeProfile = createAsyncThunk(
    "auth/change",
    async (payload, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token")
            //deconstruct payload
            const { usernameObj, phoneObj, emailObj } = payload;

            //payload.username,payload.email,payload.telephone
                //username
                if(usernameObj.currentUsername !== usernameObj.newUsername){
                    await axios.patch(urlAuth+"changeUsername",
                        usernameObj, 
                        {headers :{"Authorization" : `Bearer ${token}`}})
                        //toaster:
                        Toast.success("Username has been changed.")
                        
                }
                
                //phone
                if(phoneObj.currentPhone !== phoneObj.newPhone){
                    await axios.patch(urlAuth+"changePhone",
                        phoneObj, 
                        {headers :{"Authorization" : `Bearer ${token}`}})
                        //toaster:
                        //phone has been changed.
                        Toast.success("Phone Number has been changed")
                }

                //email : harus confirmation dulu
                if(emailObj.currentEmail !== emailObj.newEmail){
                    await axios.patch(urlAuth+"changeEmail",
                        emailObj, 
                        {headers :{"Authorization" : `Bearer ${token}`}})
                    //toaster : you need to click on verification link on your email to see
                    //changes on email section
                    Toast.success("Click the verification link on your email to see any changes")
                }


            //get data user lagi via token (cara keepLogin)
            const response = await axios.get(urlAuth,{headers :{"Authorization" : `Bearer ${token}`}})
            localStorage.removeItem("token")
            return response.data

        } catch (error) {
            Toast.error("changeProfile : something went wrong.")
            return rejectWithValue(error.response.data)
        }
    }
)

//done
export const keepLogin = createAsyncThunk(
    "auth/keepLogin",
    async (payload, { rejectWithValue }) => {
        try {
            // get token from local storage
            const token = localStorage.getItem("token")
            // console.log("#token dalam keeplogin : "+token)
            // @if token empty
            if (!token) {
                return rejectWithValue({ message : "token not found." })
            }

            // @get data user
            const response = await axios.get(urlAuth,{headers :{"Authorization" : `Bearer ${token}`}})
            // console.log("#data dalam keeplogin : "+response)
            return response.data
        } catch (error) {
            // Toast.error("KeepLogin : something went wrong.")
            return rejectWithValue(error.response.data)
        }
    }
)

//done (hopefully)
export const register = createAsyncThunk(
    "auth/register",
    async (payload, { rejectWithValue }) => {
        try {
            // @do validation
            await registerValidationSchema.validate(payload)

            // @save data to database
            const registerData = {
                username : payload.username,
                email : payload.email,
                phone : payload.telephone,
                password : payload.password,
                confirmPassword : payload.rePassword
            }
            
            const {data, token} = await axios.post(urlAuth, registerData)
            Toast.success("we have sent the verification link to your email. you need to be verified.")
            

            //
            // localStorage.clear()
            // @save token to local storage
            // localStorage.setItem("token", token)


            //toaster : 
            //we have sent the verification link to your email. you need to be verified.
            return data;
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

//done
export const logout = createAsyncThunk(
    "auth/logout",
    async (payload, { rejectWithValue }) => {
        try {
            // @delete token from local storage
            localStorage.removeItem("token")
            // localStorage.clear()
            Toast.success("Good Bye! See you soon!")
            return {}
        } catch (error) {
            Toast.error("Error : something went wrong.")
            return rejectWithValue(error.response.data)
        }
    }
) 

export const verified = createAsyncThunk(
    "auth/verify",
    async (payload, {rejectWithValue}) => {
        try{
            //merefresh local storage dari null/undefined token
            localStorage.clear()

            localStorage.setItem("token", payload.token)

            await axios.patch(urlAuth + "verify", {}, {headers :{"Authorization" : `Bearer ${payload.token}`}})
            
            const response = await axios.get(urlAuth, {headers :{"Authorization" : `Bearer ${payload.token}`}} )
            Toast.success("Welcome Verified Legend!")

            return response.data;
        } catch(error){ 
            Toast.error("Verification : something went wrong.")
            return rejectWithValue(error.response.data)
    }
 

    }
)


export const forgotPassword = createAsyncThunk(
    "async/forgotPassword",
    async(payload, {rejectWithValue}) => {
        try{

            //put req. to send verification link
            await axios.put(urlAuth+"forgotPass",
                payload)
            Toast.success("Click the verification link on your email to see any changes")
            
            return{}
        }
        catch(error){
            Toast.error("ForgotPassword: something went wrong.")
            return rejectWithValue(error.response.data)
        }
    }
)

export const resetPassword = createAsyncThunk(
    "async/resetPassword",
    async(payload, {rejectWithValue}) => {
        try{
            const token = localStorage.getItem("token")

            //create data
            const data = {
                password : payload.password,
                confirmPassword : payload.confirmPassword
            }
            //patch
            const response = await axios.patch(urlAuth+"resetPass",
                            data, 
                            {headers :{"Authorization" : `Bearer ${token}`}})
            Toast.success("your new password is ready!")
            localStorage.removeItem("token")
            return response.data
        }
        catch(error){
            Toast.error("Reset Password : something went wrong.")
            return rejectWithValue(error.response.data)
        }
    }
)

export const changePassword = createAsyncThunk(
    "async/changePassword",
    async(payload, {rejectWithValue}) => {
        try{
            const token = localStorage.getItem("token")
            //patch
            const response = await axios.patch(urlAuth+"changePass",
                            payload, 
                            {headers :{"Authorization" : `Bearer ${token}`}})

             //toaster:
             Toast.success("Your changed password is ready!")

             localStorage.removeItem("token")               
            return response.data
        }
        catch(error){
            Toast.error("Error : something went wrong.")
            return rejectWithValue(error.response.data)
        }
    }
)


export const verifiedChangeEmail = createAsyncThunk(
    "auth/verifyChangeEmail",
    async (payload, {rejectWithValue}) => {
        try{
            await axios.patch(urlAuth + "verify", {}, {headers :{"Authorization" : `Bearer ${payload.token}`}})
            
            const response = await axios.get(urlAuth, {headers :{"Authorization" : `Bearer ${payload.token}`}} )
            localStorage.clear()
            
            
            //toaster : changed email has been verified
            Toast.success("Your new email is verified, welcome back legend!")
            return response.data;
        } catch(error){ 
            Toast.error("Verified Change Email: something went wrong.")
            return rejectWithValue(error.response.data)
    }


    }
)

export const updateImageProfile = createAsyncThunk(
    "auth/updateChangeProfile",
    async (payload, {rejectWithValue}) => {
        try{
            const token = localStorage.getItem("token")
            const response = await axios.post(urlProfile + "single-uploaded", payload, {headers :{"Authorization" : `Bearer ${token}`}})
            Toast.success("Cool picture you got there!")
         
            
            return response.data
        }
        catch(error){
            Toast.error("Update Image : something went wrong.")
            return rejectWithValue(error.response.data)
        }
    }
)
 