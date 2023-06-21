import HomePage from "./pages/homepage"
import Login from "./pages/login"
import Register from "./pages/register"
import Error404 from "./pages/error";
import Reset from "./pages/resetpassword";
import Change from "./pages/changepassword";
import Create from "./pages/createblog";
import Profile from "./pages/profile"; 
import Email from "./pages/emailconfirm";
import Verification from "./pages/verification";  
import VerificationChangeEmail from "./pages/verificationchange";
import LikedPage from "./pages/likeblog";
import { Toaster } from "react-hot-toast"

import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Route,Routes } from 'react-router-dom';
import { generatePath } from "react-router";

import ProtectedRoute from "./protected.routes"
import { keepLogin } from "./store/slices/auth/slices"


function App() {
  const dispatch = useDispatch()
  
  const { isKeepLoginLoading, } = useSelector(state => {
		return {
			isKeepLoginLoading : state.auth?.loading

		}
	})
  useEffect(() => {
    dispatch(keepLogin())
  }, [])
  
  
  if (isKeepLoginLoading) return (
    <div className="h-screen w-screen flex flex-row align-bottom justify-center">
			<span className="loading loading-dots loading-lg"></span>
		</div>
	)
  


  return (
		<div className="h-screen w-screen bg-base-100">
       <Toaster
         position="top-center"
         reverseOrder={false}
         gutter={8}
         containerClassName=""
         containerStyle={{}}
         toastOptions={{
           // Define default options
           className: '',
           duration: 5000,
           style: {
             background: '#363636',
             color: '#fff',
           },
       
           // Default options for specific types
           success: {
             duration: 8000,
             theme: {
               primary: 'green',
               secondary: 'black',
             },
           },
         }}
       />
			<Routes>
				<Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/verification-change-email/*" element={<VerificationChangeEmail/>} />
        <Route path="/verification/*" element={<Verification/>} />
        <Route path="/reset-password/*" element={
							<Reset />
         } />
        <Route path="/email" element={
							<Email />
						} />
        {/* protected routes */}
        <Route path="/change" element={<ProtectedRoute>
							<Change />
						</ProtectedRoute>} />
        <Route path="/create" 
        element={
            <ProtectedRoute>
							<Create />
						</ProtectedRoute>} />
        <Route path="/profile" 
        element={
            <ProtectedRoute>
							<Profile />
						</ProtectedRoute>} />
        <Route path="/liked" element={
        <ProtectedRoute>
          <LikedPage />
          </ProtectedRoute>} />
			</Routes>
     
		</div>
  );
}

export default App;
