import * as Yup from 'yup';

const commonSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required!'),
  description: Yup.string()
    .required('Description is required!'),
});

const PostSchema = commonSchema.shape({
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
const UpdatePostSchema = commonSchema.shape({
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

export { PostSchema, UpdatePostSchema };
