
function Category({
 categoryList = []
}){
    return categoryList[0].map((item,index) => {
        return(
            <option
            value={item.id}>
                {item.name}</option>
    )
}
    )} 

 
export function CategoryOption({
    category = [],
    onCreateCategory = (event) => {}
}){
    return(
        <select 
        onChange={onCreateCategory}
        className="select w-full max-w-xs z-50">
        <option>...</option>
        <Category
                categoryList = {[category]}
                    onCreateCategory={onCreateCategory}
            />
        </select>
    )
}