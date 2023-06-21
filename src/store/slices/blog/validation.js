import * as Yup from "yup"

export const createBlogSchema = Yup.object({
    title : Yup.string()
        .required("title is required."),
    content : Yup.string()
        .required("content is required."),
    keyword : Yup.string()
        .required("keyword is required")
})