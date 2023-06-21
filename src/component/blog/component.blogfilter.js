function Sort({
    onChangeSort= (sort) => {}
}){
    return(
        <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <li onClick={() => 
                onChangeSort("ASC")}><a>Ascending</a></li>
            <li onClick={() => 
                onChangeSort("DESC")}><a>Descending</a></li>
        </ul>
    )
}

function Category({
 categoryList = [],
 onChangeCategory = (category) => {},
}){
    return categoryList[0].map((item,index) => {
        return(
            <li onClick={() =>{
                console.log(item.id)
                onChangeCategory(item.id)} }><a >{item.name}</a></li>
    )
}
    )} 


export function CategoryButton({
    category = [],
    onChangeCategory = (category) => {},
    onNoCategory = () =>{}
}){
    return(
        <details className="dropdown dropdown-end mb-32 z-50">
        <summary className="m-1 btn">Category : </summary>
        <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <li onClick={onNoCategory}><a>Semua Kategori</a></li>
            <Category
                categoryList = {[category]}
                    onChangeCategory={onChangeCategory}
            />
        </ul>
        </details>
    )
}

export function SortButton({
    onChangeSort = (sort) => {}
}){
    return(
        <details className="dropdown mb-32">
        <summary className="m-1 btn">Sort By : </summary>
            <Sort onChangeSort={onChangeSort}/>
        </details>
    )
}