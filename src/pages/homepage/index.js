import Header from "../../component/header";
import Footer from "../../component/footer";
import MainBlog from "../../component/blog/component.blog";
import { SortButton,CategoryButton } from "../../component/blog/component.blogfilter";
import Pagination from "../../component/blog/component.pagination";
import Favorite from "../../component/blog/component.favorite";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getArticles,getCarouselArticles,
    getCategory,getFavoriteArticles,likeArticle,deleteArticle} from "../../store/slices/blog/slices";
import { useState } from "react";
import Carousel from "../../component/blog/component.carousel";

export default function HomePage(){
    

    const dispatch = useDispatch()
    const [currentSort, setCurrentSort] = useState("ASC")
    const [currentCategory, setCurrentCategory] = useState("")
    const { loading, currentPage, totalPage, 
        articles, category, loadingCategory,
        carouselArticles, favoriteArticles} = useSelector(state => {
        return {
            loading : state.blogs.isLoading,
            loadingCategory: state.blogs.isCategoryLoading,
            articles : state.blogs.articles,
            currentPage : state.blogs.currentPage,
            totalPage : state.blogs.totalPage,
            category : state.blogs.category,
            carouselArticles : state.blogs.carouselArticles,
            favoriteArticles : state.blogs.favoriteArticles,
        }
    })
    
    // @side-effect
    useEffect(() => {
        dispatch(getFavoriteArticles())
        dispatch(getCarouselArticles())
        dispatch(getArticles({ id_cat : "", page : 1, sort : "ASC" }))
        dispatch(getCategory())
    }, [])

    // @event handler
    const onChangePagination = (type) => {
        dispatch(getArticles({ 
            id_cat : currentCategory,
            page : type === "prev" ? currentPage - 1 : currentPage + 1, 
            sort : currentSort
        }))
    }
    const onChangeSort= (sort) => {
        console.log(sort)
        setCurrentSort(sort)
        dispatch(getArticles({ 
            id_cat : currentCategory, 
            page : 1, 
            sort : sort
        }))
    }

    const onChangeCategory = (category) => {
        setCurrentCategory(category)
        dispatch(getArticles({ 
            id_cat : category, 
            page : 1, 
            sort : currentSort
        }))
    }

    const onNoCategory = () => {
        setCurrentCategory("")
        dispatch(getArticles({ 
            id_cat : "", 
            page : 1, 
            sort : currentSort
        }))
    }
    const onButtonLike = (id) => dispatch(likeArticle({ BlogId : id }))
    const onDelete = (id) => dispatch(deleteArticle(id))

    // @render loading
    if (loading || loadingCategory) return (
        <div className="h-screen w-screen flex flex-row align-bottom justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    )

    return(
        <div className="w-full h-full">
        <Header/>
            {/* Head Section */}
            <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md ">
                    <h1 className="text-5xl font-bold m-5">Hello 
                        <a className="text-yellow-900 font-bold"> there.</a></h1>
                    <p className="text-xl italic mt-10 text-gray-500">Scroll down for more.</p>
                </div>
            </div>
            </div>

            <div className="flex flex-col items-center my-48">
                {/* most recent carousel section*/}
                <div className="p-10 w-4/5 h-full flex flex-row items-center justify-evenly mb-24">
                    <div className="h-96 carousel carousel-vertical rounded-box">
                    <Carousel articles={carouselArticles}/>
                    </div>
                    <div className="text-right ml-32 leading-6">
                        <h1 className="text-4xl font-bold">Newly arrived blogs.</h1>
                        <h1 className="text-2xl my-5">Fresh from the oven.</h1>
                    </div>
                </div>

                {/* most favorite carousel section */}
                <div className="p-10 w-4/5 h-full flex flex-row items-center justify-evenly">
                    <div className="mr-32 text-left">
                        <h1 className="text-4xl font-bold">All time favorites.</h1>
                        <h1 className="text-2xl my-5">Best picks, only for you.</h1>
                    </div>
                    <div className="h-96 carousel carousel-vertical rounded-box">
                    <Favorite articles={favoriteArticles}/>
                    </div>
                </div>
            </div>
            {/* all blogs section */}
            <div id="section-1" className="flex flex-col h-full w-full items-center justify-start">      
                <h1 className="text-4xl m-8 font-bold">Explore the world of blogs.</h1>
                <h1 className="text-2xl mb-20 ">Sort? Filter? Like? Delete?</h1>
                <h1 className="text-2xl mb-20 italic text-gray-600">Say no more, Boss.</h1>
                <div className="flex flex-row justify-evenly w-full">
                    <SortButton onChangeSort={onChangeSort}/>
                    <CategoryButton onChangeCategory={onChangeCategory}
                    onNoCategory={onNoCategory}
                    category={category}/>
                </div>
                <div className="w-2/3 h-fit bg-base-200 rounded-lg flex flex-row justify-start items-start ">
                    <div className="w-full px-14 flex flex-row flex-wrap items-center justify-start gap-5 my-5">
                        <MainBlog
                            articles = {articles}
                            onButtonLike = {onButtonLike}
                            onDelete={onDelete}
                        />
                        <Pagination
                            hiddenPrev = {currentPage <= 1 ? "hidden" : ""}
                            hiddenNext = {currentPage >= totalPage ? "hidden" : ""}
                            currentPage = {currentPage}
                            onChangePagination ={onChangePagination}
                            handleClickScroll= {handleClickScroll}
                        />
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}




