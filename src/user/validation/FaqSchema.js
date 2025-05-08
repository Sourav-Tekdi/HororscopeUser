import * as Yup from 'yup';

const commonSchema = Yup.object().shape({
  question: Yup.string()
    .required('Question is required!'),
  answer: Yup.string()
    .required('Answer is required!'),
});

const FaqSchema = commonSchema.shape({
});

// Schema for update with optional file validation
const UpdateFaqSchema = commonSchema.shape({
});

export { FaqSchema, UpdateFaqSchema };
