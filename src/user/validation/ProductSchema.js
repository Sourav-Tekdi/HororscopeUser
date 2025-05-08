import * as Yup from 'yup';

// Common schema for title, price, and category
const commonSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required!'),
  price: Yup.number()
    .required('Price is required!')
    .typeError('Price must be a number'),
  category: Yup.string()
    .required('Category is required!'),
  description: Yup.string()
    .required('Category is required!'),
});

// Schema for create with file validation
const ProductSchema = commonSchema.shape({
  file: Yup.mixed()
    .required('Image is required!')
    .test(
      "fileSize",
      "File size is too large",
      value => value && value.size <= 5000000 // 5MB size limit
    )
    .test(
      "fileType",
      "Unsupported file format",
      value => value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
    ),
});

// Schema for update with optional file validation
const UpdateProductSchema = commonSchema.shape({
  file: Yup.mixed()
    .notRequired() // Make file optional
    .test(
      "fileSize",
      "File size is too large",
      value => !value || value.size <= 5000000 // 5MB size limit
    )
    .test(
      "fileType",
      "Unsupported file format",
      value => !value || ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
    ),
});

export { ProductSchema, UpdateProductSchema };
