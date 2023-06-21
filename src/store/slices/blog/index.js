import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { deleteArticle, getArticles, getCarouselArticles, getCategory, getFavoriteArticles, getLikedArticles, likeArticle, postBlog} from "./slices"

const INITIAL_STATE = {
    articles : [],
    carouselArticles : [],
    favoriteArticles : [],
    totalPage : 1,
    currentPage : 1,
    isLoading : false,
    isCategoryLoading:false,
    category : [],
    blogList : "",
    likedArticles : []

}

const blogsSlice = createSlice({
    name : "blogs",
    initialState : INITIAL_STATE,
    extraReducers : builder => {
        builder.addCase(getArticles.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getArticles.fulfilled, (state, action) => {
            state.isLoading = false
            state.articles = action.payload?.result
            state.totalPage = action.payload?.page
            state.currentPage = action.payload?.blogPage
        })
        builder.addCase(getArticles.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(getCategory.pending, (state, action) => {
            state.isCategoryLoading = true
        })
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.isCategoryLoading = false
            state.category = action.payload
        })
        builder.addCase(getCategory.rejected,(state, action) => {
            state.isCategoryLoading = false
        })
        
        builder.addCase(getCarouselArticles.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getCarouselArticles.fulfilled, (state, action) => {
            state.isLoading = false
            state.carouselArticles = action.payload?.result
        })
        builder.addCase(getCarouselArticles.rejected,(state, action) => {
            state.isLoading = false
        })
        builder.addCase(getFavoriteArticles.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getFavoriteArticles.fulfilled, (state, action) => {
            state.isLoading = false
            state.favoriteArticles = action.payload?.result
        })
        builder.addCase(getFavoriteArticles.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(likeArticle.pending,(state, action) => {
            state.isLoading = true
        })
        builder.addCase(likeArticle.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(likeArticle.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(deleteArticle.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(deleteArticle.fulfilled, (state, action) => {
            state.isLoading = false
            state.articles = action.payload?.data_all?.data?.result
            state.carouselArticles = action.payload?.data_recent?.data?.result
        })
        builder.addCase(deleteArticle.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(postBlog.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(postBlog.fulfilled, (state, action) => {
            state.isLoading = false
            state.articles = action.payload?.data_all?.data?.result
            state.carouselArticles = action.payload?.data_recent?.data?.result
        })
        builder.addCase(postBlog.rejected, (state, action) => {
            state.isLoading = false 
        })
        builder.addCase(getLikedArticles.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getLikedArticles.fulfilled, (state, action) => {
            state.isLoading = false
            state.likedArticles = action.payload?.result
        })
        builder.addCase(getLikedArticles.rejected, (state, action) => {
            state.isLoading = false
        })

    }
})

export default blogsSlice.reducer