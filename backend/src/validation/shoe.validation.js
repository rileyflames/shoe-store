import { z } from 'zod';

const createShoeSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  category: z.enum(['sneakers', 'boots', 'dress', 'casual', 'athletic', 'sandals', 'heels']),
  gender: z.enum(['men', 'women', 'unisex']),
  price: z.coerce.number().min(0),
  currency: z.string().length(3).default('USD'),
  description: z.string().max(1000),

  variants: z.array(z.object({
    color: z.string().min(1),
    size: z.string().min(1),
    stock: z.coerce.number().int().nonnegative()
  }))
});

export default createShoeSchema;
