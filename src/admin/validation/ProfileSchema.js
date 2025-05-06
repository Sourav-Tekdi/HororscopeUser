// ProfileSchema.js
import * as Yup from 'yup';

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default ProfileSchema;
