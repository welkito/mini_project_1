export default function Pagination ({
    hiddenPrev = "hidden",
    hiddenNext = "hidden",
    currentPage = 1,
    onChangePagination = (type = "next") => {},

}) {
    return (
        <div className="w-full flex-grow flex flex-row justify-center">
            <button className={`join-item btn ${hiddenPrev}`}  
            onClick={() => 
                onChangePagination("prev") 
               }>
            «
            </button>
            <button className="join-item btn">Page {currentPage}</button>
            <button className={`join-item btn ${hiddenNext}`}  
            onClick={() => 
                onChangePagination("next")}>
            »
            </button>
        </div>
    )
}
