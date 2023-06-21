import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import Toast from "react-hot-toast"

const URL = "https://minpro-blog.purwadhikabootcamp.com/api/blog"

export const getArticles = createAsyncThunk(
    "blogs/getArticles",
    async (payload, { rejectWithValue }) => {
        try {
            // @generate parameter
            const { id_cat, page, sort } = payload
            const PARAMETER = `?id_cat=${id_cat}&sort=${sort}&page=${page}`

            // @request to get articles
            const { data } = await Axios.get(URL + encodeURI(PARAMETER))
            
            // @return data
            return data
        } catch (error) {
            console.error(error)
            Toast.error("Error : something went wrong.")
            return rejectWithValue(error.response.data)
        }
    }
)

export const getCategory = createAsyncThunk(
    "blogs/getCategory",
    async (payload, { rejectWithValue }) => {
        try {
            const PARAMETER = "/allCategory"
            // @request to get all category
            const data = await Axios.get(URL + PARAMETER)
            
            // @return data
            return data.data
        } catch (error) {
            console.error(error)
            Toast.error("Error : something went wrong.")
            return rejectWithValue(error.response.data)
        }
    }
)

export const getCarouselArticles = createAsyncThunk(
    "blogs/getCarouselArticles",
    async (payload, { rejectWithValue }) => {
        try {
            // @generate parameter
            const PARAMETER = `?id_cat=${""}&sort=${"DESC"}&page=${1}`

            // @request to get articles
            const { data } = await Axios.get(URL + encodeURI(PARAMETER))
            
            // @return data
            return data
        } catch (error) {
            console.error(error)
            Toast.error("Error : something went wrong.")
            return rejectWithValue(error.response.data)
        }
    }
)

export const getFavoriteArticles = createAsyncThunk(
    "blogs/getFavoriteArticles",
    async (payload, { rejectWithValue }) => {
        try {
            // @generate parameter
            const PARAMETER = `/pagFav`

            // @request to get articles
            const { data } = await Axios.get(URL + encodeURI(PARAMETER))
            
            // @return data
            return data
        } catch (error) {
            Toast.error("Error : something went wrong.")
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
) 

export const likeArticle= createAsyncThunk(
    "blogs/likeArticle",
        async (payload, { rejectWithValue }) => {
            try {
                const token = localStorage.getItem("token")
                await Axios.post(URL+"/like", payload, {headers :{"Authorization" : `Bearer ${token}`}})
    
                Toast.success("Like article success.")
                return {}
            } catch (error) {
                Toast.error("Uhm, you have liked this article before")
                return rejectWithValue(error.response.data)
            }
        }
    
)

export const deleteArticle= createAsyncThunk(
    "blogs/deleteArticle",
        async (payload, { rejectWithValue }) => {
            try {
                const token = localStorage.getItem("token")
                const PARAMETER = `/remove/${payload}`
               
                await Axios.patch(URL+PARAMETER, {headers :{"Authorization" : `Bearer ${token}`}})
                Toast.success("Delete article success.")

                //UPDATE new list of articles data from server, for recent articles and pagination articles
                    // @generate parameter for pagination articles
                    const PARAMETER_PAGINATION = `?id_cat=${3}&sort=${"ASC"}&page=${1}`

                    // @request to get articles
                    const  data_all  = await Axios.get(URL + encodeURI(PARAMETER_PAGINATION))
    
                        //generate parameter for recent articles
                    const PARAMETER_RECENT = `?id_cat=${""}&sort=${"DESC"}&page=${1}`
    
                    // @request to get articles
                    const  data_recent = await Axios.get(URL + encodeURI(PARAMETER_RECENT))
    
                    
                    const data = {data_all, data_recent}
          
                    // @return data
                    return data


                
            } catch (error) {
                Toast.error("Error : something went wrong.")
                return rejectWithValue(error.response.data)
            }
        }
    
)


export const postBlog= createAsyncThunk(
    "blogs/postBlog",
        async (payload, { rejectWithValue }) => {
            try {
                //@post blog to server via API
                const token = localStorage.getItem("token")
                await Axios.post(URL, payload, {headers :{"Authorization" : `Bearer ${token}` , "Content-Type": "multipart/form-data"}})
                
                //Update new articles data from server, for recent articles and pagination articles
                    // @generate parameter for pagination articles
                const PARAMETER = `?id_cat=${3}&sort=${"ASC"}&page=${1}`

                // @request to get articles
                const  data_all  = await Axios.get(URL + encodeURI(PARAMETER))

                    //generate parameter for recent articles
                const PARAMETER_RECENT = `?id_cat=${""}&sort=${"DESC"}&page=${1}`

                // @request to get articles
                const  data_recent = await Axios.get(URL + encodeURI(PARAMETER_RECENT))

                
                const data = {data_all, data_recent}
      
                // @return data
                Toast.success("Keep posting, Legend!")
                return data
            
            } catch (error) {
                Toast.error("Post Blog: something went wrong.")
                return rejectWithValue(error.response.data)
            }
        }
    
)

export const getLikedArticles = createAsyncThunk(
    "blogs/getLikedBlog",
        async (payload, { rejectWithValue }) => {
            try {
                const token = localStorage.getItem("token")
                const {data} = await Axios.get(URL+"/pagLike" ,{headers :{"Authorization" : `Bearer ${token}`}})
           
          
                Toast.success("Your favorites is comin' up!")
                return data
            } catch (error) {
                Toast.error("Liked Articles : something went wrong.")
                return rejectWithValue(error.response.data)
                }
            }
        

)