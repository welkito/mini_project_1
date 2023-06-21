import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { login, keepLogin ,register,
     changeProfile,logout,verified, forgotPassword, 
     resetPassword, changePassword, verifiedChangeEmail, 
     updateImageProfile} from "./slices";

     const INITIAL_STATE = {
        keepLoginLoading : false,
        loading : false,
        isVerified : false,
        role : false,
        id : "",
        username : "",
        email : "",
        phone : "",
        imgProfile : null,
    }

// @create slice
const authSlice = createSlice({
    name : "auth",
    initialState : INITIAL_STATE,
    extraReducers : builder =>{
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.isVerified = action.payload?.isVerified
            state.role = action.payload?.role
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.email = action.payload?.email
            state.phone = action.payload?.phone
            state.imgProfile = action.payload?.imgProfile    
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(keepLogin.pending, (state, action) => {
            state.loading = true
            state.keepLoginLoading = true
        })
        builder.addCase(keepLogin.fulfilled, (state, action) => {
            state.keepLoginLoading = false
            state.loading = false
            state.isVerified = action.payload?.isVerified
            state.role = action.payload?.role
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.email = action.payload?.email
            state.phone = action.payload?.phone
            state.imgProfile = action.payload?.imgProfile             
        })
        builder.addCase(keepLogin.rejected, (state, action) => {
            state.keepLoginLoading = false
            state.loading = false
        })
        builder.addCase(logout.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false
            state.isVerified = false 
            state.role = false
            state.id = ""
            state.username = ""
            state.email = ""
            state.phone = ""
            state.imgProfile = null
            state.updatedAt = ""
            state.createdAt = ""
            state.token = ""              
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(register.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.isVerified = action.payload?.isVerified
            state.role = action.payload?.role
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.email = action.payload?.email
            state.phone = action.payload?.phone
            state.imgProfile = action.payload?.imgProfile        
        })
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(changeProfile.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(changeProfile.fulfilled,(state,action) =>{
            state.loading = false
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.phone= action.payload?.phone
            state.email = action.payload?.email 
        })
        builder.addCase(changeProfile.rejected, (state,action) =>{
            state.loading = false
        })
        builder.addCase(verified.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(verified.fulfilled, (state, action) => {
            state.loading = false
            state.isVerified = action.payload?.isVerified
            state.role = action.payload?.role
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.email = action.payload?.email
            state.phone = action.payload?.phone
            state.imgProfile = action.payload?.imgProfile 
        })
        builder.addCase(verified.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(forgotPassword.pending,(state, action) => {
            state.loading = true
        })
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(resetPassword.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false
            state.isVerified = action.payload?.isVerified
            state.role = action.payload?.role
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.email = action.payload?.email
            state.phone = action.payload?.phone
            state.imgProfile = action.payload?.imgProfile 
        })
        builder.addCase(resetPassword.rejected,(state, action) => {
            state.loading = false
        })
        builder.addCase(changePassword.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.loading = false
            state.isVerified = action.payload?.isVerified
            state.role = action.payload?.role
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.email = action.payload?.email
            state.phone = action.payload?.phone
            state.imgProfile = action.payload?.imgProfile 
        })
        builder.addCase(changePassword.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(verifiedChangeEmail.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(verifiedChangeEmail.fulfilled, (state, action) => {
            state.loading = false
            state.isVerified = action.payload?.isVerified
            state.role = action.payload?.role
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.email = action.payload?.email
            state.phone = action.payload?.phone
            state.imgProfile = action.payload?.imgProfile 
        })
        builder.addCase(verifiedChangeEmail.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(updateImageProfile.pending,(state, action) => {
            state.loading = true
            state.updateImageLoading = true
        })
        builder.addCase(updateImageProfile.fulfilled, (state, action) => {
            state.loading = false
            state.updateImageLoading = false
            state.imgProfile = action.payload?.imgProfile           
        })
        builder.addCase(updateImageProfile.rejected, (state, action) => {
            state.updateImageLoading = false
            state.loading = false
        })
       
    }
})

// export reducer
export default authSlice.reducer

