import { z } from "zod";

const loginSchema = z.object({
  identifier: z.string().min(3, 'Email or username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
});

export default loginSchema;


/**
 * ✅ Why this change?
We no longer require both email and username.

The identifier field is flexible — it can be either one.

This change aligns the schema with what you're actually sending from the frontend.
 */