import * as Yup from "yup";

export const SignUpValidationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
  });

  
export const SignInValidationSchema = Yup.object({
email: Yup.string().email('Invalid email address').required('Email is required'),
password: Yup.string().required('Password is required'),
});
