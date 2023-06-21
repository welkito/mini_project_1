

    function BlogCard ({
        title = "",
        content = "",
        category ="",
    }) {
        
        return (

            <div className={`card w-96 min-h-[350px] bg-base-100 shadow-xl`}>
            
                <div className="card-body">
                    <h2 className="card-title flex flex-col items-start font-semibold">
                            {title}
                        <div className="badge badge-secondary">{category}</div> 
                    </h2>
                    <p>{content}</p>
                    
                </div>
            </div>
            
        )
    }
    
    
    export default function LikedBlog ({
        articles = []
    }) {
        return articles.map((article, index) => {
            return (
                <BlogCard key={article.id}
                    title={article.Blog.title}
                    category={article.Blog.Category.name}
                    content={article.Blog.content}
                />
            )
        })
    }

