
import { useNavigate } from "react-router-dom";
import LikedBlog from "./component.likeblog";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLikedArticles} from "../../store/slices/blog/slices"



export default function LikedPage(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { loading,
        articles,  loadingCategory,
      } = useSelector(state => {
        return {
            loading : state.blogs.isLoading,
            articles : state.blogs.likedArticles,
        }
    })

    // @side-effect
    useEffect(() => {
        dispatch(getLikedArticles())
    }, [])


    // @render loading
    if (loading || loadingCategory) return (
        <div className="h-screen w-screen flex flex-row align-bottom justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    )

    return(
        <div className="w-full h-full">
            <button className="btn bg-base-100 mr-3 m-10 h-10 w-fit leading-none"
                    onClick={() => navigate("/Profile")}>
                    «  Back to Profile
            </button>
            <div className="flex flex-col h-full w-full items-center justify-start">      
                <h1 className="text-4xl m-8 font-bold">Liked Articles</h1>
                <h1 className="text-2xl mb-20">Headsup of any blogs you liked.</h1>
                <div className="w-2/3 h-fit bg-base-200 rounded-lg flex flex-row justify-start items-start ">
                    <div className="flex flex-row flex-wrap items-center justify-center gap-5 my-5">
                        <LikedBlog
                            articles = {articles}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

