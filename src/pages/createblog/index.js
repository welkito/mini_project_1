import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getCategory } from "../../store/slices/blog/slices";
import { useEffect } from "react";
import { CategoryOption } from "./component.createcategory";
import ImageProfile from "./component.image";
import { useState } from "react";
import { createBlogSchema } from "../../store/slices/blog/validation";
import { postBlog} from "../../store/slices/blog/slices";
import { Formik } from "formik";
import { useRef } from "react";
import  Toast  from "react-hot-toast";
export default function Create(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [categoryIdInput, setCategoryIdInput] = useState("")
    const [status,setStatus] = useState("");
    const [hidden,setHidden] = useState("hidden");
    const [file,setFile] = useState(null);

    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const keywordRef = useRef(null);
    const URLRef = useRef(null);

    const {category} = useSelector(state=>{
        return{
            category : state.blogs.category
        }
    })

    //use-effect
    useEffect(() => {
        dispatch(getCategory())
    }, [])

    //buttons logic
    const onCreateCategory = (event) =>{
        event?.preventDefault()
        console.log(event?.target?.value)
        setCategoryIdInput(event?.target?.value)

    }
 
    const onSubmitBlog= () => {
        setHidden("")
        if(!file){
            return {}
            
        }
        if(status === "success" && file){
            const data = {
                title : titleRef.current?.value,
                content : contentRef.current?.value,
                keywords : keywordRef.current?.value,
                url : URLRef.current?.value,
                CategoryId : categoryIdInput,
                country : "Indonesia",
            }
            const formData = new FormData()
            formData.append('data', JSON.stringify(data))
            formData.append('file', file)
            console.log(formData)
            dispatch(postBlog(formData))
            navigate("/login")
        }
    } 

    const getFileData = (Imgfile) => {
        setFile(Imgfile)
    }
    useEffect(()=>{
        console.log(file)
        console.log("betul, jadi isinya adalah" +file)

    },[file])

    return(
        <div className="w-full flex flex-col justify-center items-start pl-32 py-10">
            <Formik
                initialValues={{ 
                    title : "", 
                    content: "" ,
                    keyword: ""
                }}
                    validate={values => {
                        try {
                            createBlogSchema.validateSync(values)
                            setStatus("success")
                            return {}
                        } catch (error) {
                            setStatus("")
                            console.log("error", error?.message)
                            return { message : error?.message }
                        }
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false)
                    }}
                >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <div className="form-control w-full max-w-xs">
                    <div className="flex flex-row flex-nowrap items-center">
                    <button className="btn bg-base-100 mr-3 p-0 h-10 w-10 leading-none"
                        onClick={() => navigate("/Profile")}>
                        «
                        </button>
                    <h3 className="flex justify-center items-center py-10 text-3xl font-medium">Create a Blog</h3>
                    </div>
                    <label className="label">
                        <span className="label-text font-semibold">Title : </span>
                    </label>
                    <input type="text"
                    ref={titleRef}
                    name="title" 
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={()=>{setHidden("hidden")}} 
                    placeholder="Type here..." 
                    className="input input-bordered w-full max-w-xs" />
                    <div className="flex flex-row w-full">
                    <label className="label flex-grow">
                        <span className="label-text font-semibold">Image : 
                    
                    {
                        file ?
                        <span className="text-yellow-900">{` ${file.name}`}</span>
                        :
                        <span> No Image Uploaded</span>
                       
                    }</span>
                    </label>
                    <ImageProfile getFileData={getFileData}/>
                    </div>
                    <label className="label">
                        <span className="label-text font-semibold">Category</span>
                    </label>
                    <CategoryOption category={category} onCreateCategory={onCreateCategory} />
                    <label className="label">
                        <span className="label-text font-semibold">Content : </span>
                    </label>
                    <textarea placeholder="Type here..."
                    ref={contentRef}
                    name="content" 
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={()=>{setHidden("hidden")}} 
                    className="textarea textarea-bordered textarea-lg w-full max-w-3xl" ></textarea>
                    <label className="label">
                        <span className="label-text font-semibold">Keywords :  </span>
                    </label>
                    <input type="text" 
                        ref={keywordRef}
                        name="keyword" 
                        value={values.keyword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onClick={()=>{setHidden("hidden")}}
                        placeholder="Type here..." 
                        className="input input-bordered w-full max-w-xs" />
                    <label className="label">
                        <span className="label-text font-semibold">URL : </span>
                    </label>
                    <input type="text" 
                        ref={URLRef}
                        placeholder="Type here..." 
                        className="input input-bordered w-full max-w-xs" />

                    <div className="py-4"></div>
                    <button disabled={isSubmitting} 
                        className="flex justify-center items-center btn btn-neutral"
                            onClick={onSubmitBlog}
                    >
                        Submit
                    </button>

                {
                    errors.message && (
                        <div className={hidden}> 
                        <div className="alert alert-error fixed top-0 w-full left-0 gap-0 gap-y-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{errors.message}</span>
                        </div>
                        </div>
                    )
                }
                {
                    !file && (
                        <div className={hidden}> 
                        <div className="alert alert-error fixed top-0 w-full left-0 gap-0 gap-y-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>You must submit blog image.</span>
                        </div>
                        </div>
                    )
                }
                </div>

            )}
        </Formik>
    </div>
    )
}