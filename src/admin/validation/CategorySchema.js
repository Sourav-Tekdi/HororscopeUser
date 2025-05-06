// CategorySchema.js
import * as Yup from 'yup';

const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required!'),
  description: Yup.string()
    .min(4, 'Description must be at least 4 characters!')
    .required('Description is required!'),
})

export default CategorySchema;
