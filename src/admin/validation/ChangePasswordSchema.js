import * as Yup from 'yup';

const ChangePasswordSchema = Yup.object().shape({
  current_password: Yup.string()
  .min(8, 'Password must be at least 8 characters!')
    .required('Current password is required!'),
  new_password: Yup.string()
    .min(8, 'Password must be at least 8 characters!')
    .required('New password is required!'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'New password & confirm password must match!')
    .required('Confirm Password is required!'),
})

export default ChangePasswordSchema
