import { z } from 'zod'


const createUserSchema = z.object({
     name: z.string().min(1, 'Name is required'),

  username: z.string().min(3, 'Username must be at least 3 characters long'),

  password: z.string().min(8, 'Password must be at least 8 characters long'),

  phonenumber: z.string().regex(/^\+\d{10,15}$/, 'Phone number must be in international format, e.g. +27830001111'),

  email: z.string().email('Invalid email address').refine(
    (val) => val.endsWith('@domain.com'),
    'Email must end with @domain.com'
  )
})



export default createUserSchema