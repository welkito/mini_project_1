
function BlogCard ({
    title = "",
    content = "",
    thumbnail = "",
    category ="",
    keywords = "",
    onClick = (id) => {},
}) {
    return (
    <div className="carousel-item h-full">
        <div className={`card w-96 bg-base-200 box-border border-solid border-green-400 shadow-xl`}>
            <figure><img src={process.env.REACT_APP_IMAGE_URL + thumbnail} alt="Header" /></figure>
            <div className="card-body">
                <h2 className="card-title flex flex-col items-start font-semibold">
                        {title}
                    <div className="badge badge-secondary">{category}</div> 
                </h2>
                <p>{content}</p>
                <div className="card-actions justify-end">
                    <div className="space-x-1">
                        {keywords.map((item) => {
                            return( <div className="badge badge-primary"> 
                                        {`${item?.Keyword?.name}`} 
                                    </div>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}


export default function Carousel ({
    articles = [],
    onButtonLike = (id) => {},
}) {
    return articles.map((article, index) => {
        return (
            <BlogCard key={article.id}
                title={article.title}
                category={article.Category?.name}
                content={article?.content}
                thumbnail={article?.imageURL}
                keywords={article.Blog_Keywords}
                onClick={() => onButtonLike(article.id)}
            />
        )
    })
}

