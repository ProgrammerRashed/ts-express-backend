import { z } from 'zod';

const blogValidationSchema = z.object({
   body: z.object({
    title: z.string({
        required_error: "Name must be provided and must be a string",
    }).max(50),
    content: z
    .string({
      required_error: 'Password is required for your safety',
    }),
    // author: z.string({
    //     required_error: "Author must be provided and must be a string",
    // }),
    // isPublished: z.boolean({
    //     required_error: 'IsBlocked must be provided and must be a boolean',
    // })
   })
})

export const blogValidation = {
    blogValidationSchema
}