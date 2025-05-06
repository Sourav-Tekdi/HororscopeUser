import * as Yup from 'yup';

const AstrologerSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required!'),
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters!')
    .required('Username is required!'),
  mobile: Yup.string()
    .length(10, 'Mobile number must be exactly 10 digits!')
    .required('Mobile number is required!'),
  email: Yup.string()
    .email('Invalid email address!')
    .required('Email is required!'),
  gender: Yup.string()
    .required('Gender is required!'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters!')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match!')
    .required('Confirm Password is required!'),
})

export default AstrologerSchema
