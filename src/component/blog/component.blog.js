import { useNavigate } from "react-router-dom";
import Modal from "../confirmation";

    function BlogCard ({

        title = "",
        content = "",
        thumbnail = "",
        category ="",
        keywords = "",
        onClick = (id) => {},
        onDelete= (id) => {}
    }) {
        const token = localStorage.getItem("token")
        const navigate = useNavigate()
        return (

            <div className={`card w-96 min-h-[650px] bg-base-100 shadow-xl`}>
                <figure onClick={()=>{
                   
                    window.open(process.env.REACT_APP_IMAGE_URL + thumbnail, '_blank', 'noopener,noreferrer');
                }
                    }>
                    <img src={process.env.REACT_APP_IMAGE_URL + thumbnail} alt="Header" /></figure>
                <div className="card-body ">
                    <h2 className="card-title flex flex-col items-start font-semibold">
                            {title}
                        <div className="badge badge-secondary">{category}</div> 
                    </h2>
                    <p>{content}</p>
                    <div className="flex flex-row w-full justify-around ">
                    <button className="btn flex-grow hover:bg-pink-400 hover:text-white shadow-lg" 
                    onClick={()=>{
                        if(!token){
                            navigate("/login")
                        }
                        if(token){
                            onClick()
                        }                   
                    }
                    }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        
                    </button>

                    <Modal className="btn btn-square
                    flex flex-row-reverse flex-nowrap 
                    hover:bg-red-600 hover:text-white shadow-lg" 
                     onConfirm={()=>{
                        if(!token){
                            navigate("/login")
                        }
                        if(token){
                            onDelete()
                        }                   
                    }
                    }
                    title="Confirmation"
                    message={"Are you sure you want to permanently delete this article?"}
                    buttonName={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>}
                    /> 
                    


                    </div>
                    <div className="card-actions justify-end">
                        <div className="space-x-1">
                            {keywords.map((item) => {
                                return( <div className="badge badge-accent"> 
                                            {`- ${item.Keyword.name}`} 
                                        </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
    
     
    export default function MainBlog ({
        articles = [],
        image = "",
        onButtonLike = (id) => {},
        onDelete = (id) => {},
    
    }) {
        return articles.map((article, index) => {
            return (
                <BlogCard key={article.id}
                    title={article.title}
                    category={article.Category?.name}
                    content={article.content}
                    thumbnail={article.imageURL}
                    keywords={article.Blog_Keywords}
                    onClick={() => onButtonLike(article.id)}
                    onDelete={() => onDelete(article.id)}
                   
                />
            )
        })
    }

