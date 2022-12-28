import * as yup from "yup";
export const yupLoginSchema = yup.object({
  identity: yup.string().required().trim(),
  password: yup.string().required().trim(),
});

export type LoginSchema = yup.InferType<typeof yupLoginSchema>;

export const yupSignupSchema = yup.object().shape({
  first_name: yup.string().trim().required("please provide first name"),
  last_name: yup.string().trim().required("please provide last name"),
  email: yup.string().email().trim().required("please provide email id"),
  username: yup.string().trim().required("please provide username"),
  password: yup.string().trim().required("please provide last name"),
});

export type SignupSchema = yup.InferType<typeof yupSignupSchema>;

export const yupCreatePostsSchema = yup.object({
  title: yup.string().required().trim(),
});

export type PostsSchema = yup.InferType<typeof yupCreatePostsSchema>;

export const yupCreateCommentsSchema = yup.object({
  content: yup.string().required().trim(),
  postId: yup.string().required().trim(),
});

export type CommentsSchema = yup.InferType<typeof yupCreateCommentsSchema>;

export const yupObjIdSchema = yup.object({
  id: yup
    .string()
    .required("Please provide ID")
    .trim()
    .matches(
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
      "Not a Valid UUID"
    ),
});

export type ObjIdSchema = yup.InferType<typeof yupObjIdSchema>;
