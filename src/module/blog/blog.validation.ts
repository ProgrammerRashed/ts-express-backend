import { z } from 'zod';

const blogValidationSchema = z.object({
   body: z.object({
    title: z.string({
        required_error: "Title must be provided and must be a string",
    }).max(50),
    content: z
    .string({
      required_error: 'Content is required for your safety',
    }),

   })
})

export const blogValidation = {
    blogValidationSchema
}