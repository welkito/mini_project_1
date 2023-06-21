

  
function BlogCard ({
    title = "",
    category ="",
    total_fav = "",
   
}) {
    return (
    <div className="carousel-item h-full">
        <div className={`card w-96 bg-base-200 shadow-xl box`}>
            <div className="card-body">
                <h2 className="card-title flex flex-col items-start font-semibold">
                        {title}
                    <div className="badge badge-secondary">{category}</div> 
                </h2>
                <div className="stat">
                    <div className="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div className="stat-title">Total Favorites: </div>
                    <div className="stat-value text-primary">{total_fav}</div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default function Favorite ({
    articles = [],

}) {
    return articles.map((article, index) => {
        return (
            <BlogCard key={article.id}
            title = {article.title}
            category={article.Category.name}
            total_fav = {article.total_fav}
            />
        )
    })
}