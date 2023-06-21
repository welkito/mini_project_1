import * as Yup from "yup"
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const getCharacterValidationError = (str) => {
    return `Your password must have at least 1 ${str} character`;
  };
// @define register validation schema
export const registerValidationSchema = Yup.object({
    username : Yup.string()
        .min(5, "username must be at least 5 characters.")
        .max(20, "username must be less than 20 characters.")
        .required("username is required."),
    email : Yup.string()
        .email("email must be a valid email.")
        .required("email is required."),
    telephone : Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "telephone must be at least 10 characters.")
    .max(12, "telephone must be less than 12 characters."),
    //harus 1 huruf besar, 1 angka
    password : Yup.string()
        .min(6, "password must be at least 6 characters.")
        .matches(/^[a-zA-Z0-9]+$/, "password must be alphanumeric.")
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .required("password is required."),
    rePassword : Yup.string()
        .oneOf([Yup.ref("password"), null], "password must match.")
})

export const loginValidationSchema = Yup.object({
    isUsername: Yup.boolean(),
    isEmail : Yup.boolean(),
    isTelephone : Yup.boolean(),
    username : Yup.string().when('isUsername', {
        is: true,
        then: () => Yup.string().required("username is required.")
      }),
    email : Yup.string().when('isEmail', {
        is: true,
        then: () => Yup.string().email("email must be a valid email.")
        .required("email is required.")
      }),

    telephone : Yup.string().when('isTelephone', {
        is: true,
        then: () => Yup.string()
        .min(10, "telephone must be at least 10 characters.")
        .max(12, "telephone must be less than 12 characters.")
        .matches(phoneRegExp, 'Phone number is not valid')
        .required("Telephone is required")
      }),

    password : Yup.string()
    .min(6, "password must be at least 6 characters.")
    .matches(/^[a-zA-Z0-9]+$/, "password must be alphanumeric.")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .required("password is required."),
})

export const UpdateProfileValidationSchema = Yup.object({
    username : Yup.string()
        .min(5, "username must be at least 5 characters.")
        .max(20, "username must be less than 20 characters."),
    email : Yup.string()
        .email("email must be a valid email."),
    telephone : Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "telephone must be at least 10 characters.")
    .max(12, "telephone must be less than 12 characters."),

})

export const ForgotPasswordValidationSchema = Yup.object({
    email : Yup.string()
        .email("email must be a valid email."),
})

export const ResetPasswordValidationSchema = Yup.object({
    password : Yup.string()
    .min(6, "password must be at least 6 characters.")
    .matches(/^[a-zA-Z0-9]+$/, "password must be alphanumeric.")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .required("password is required."),
    rePassword : Yup.string()
        .oneOf([Yup.ref("password"), null], "password must match.")

})

export const ChangePasswordValidationSchema = Yup.object({
    currentPassword : Yup.string()
    .min(6, "password must be at least 6 characters.")
        .matches(/^[a-zA-Z0-9]+$/, "password must be alphanumeric.")
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .required("old password is required."),
    newPassword : Yup.string()
    .min(6, "password must be at least 6 characters.")
        .matches(/^[a-zA-Z0-9]+$/, "password must be alphanumeric.")
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .required("new password is required."),
    confirmPassword : Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "confirm password must match.")
})

