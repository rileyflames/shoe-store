import Shoe from '../../models/shoe/Shoe.model.js'
import catchAsync from '../../utils/catchAsync.js'

/**
 *  @desc Get all shoes (with filtering, search, sorting and pagination)
 *  @route GET /api/v1/shoes
 *  @access Public
 */
const getAllShoes = catchAsync(async (req, res) => {
  const {
  category,
  gender,
  brand,
  color,
  size,
  minPrice,
  maxPrice,
  search,
  page = 1,
  limit = 10,
  sort = '-createdAt',
} = req.query;

    // 🧠 Custom Sort Logic
    let sortOption;

    switch (sort) {
    case 'price_asc':
        sortOption = 'price';
        break;
    case 'price_desc':
        sortOption = '-price';
        break;
    case 'oldest':
        sortOption = 'createdAt';
        break;
    case 'newest':
    default:
        sortOption = '-createdAt';
    }

  const filter = {isActive: true}

    if (category) filter.category = category.toLowerCase();
    if (gender) filter.gender = gender.toLowerCase();
    if (brand) filter.brand = brand.toLowerCase();
    if (color) filter['variants.color'] = { $regex: color, $options: 'i' };
    if (size) filter['variants.size'] = size;


  // 🧠 Price range filter
  if (minPrice || maxPrice) {
    filter.price = {}
    if (minPrice) filter.price.$gte = Number(minPrice)
    if (maxPrice) filter.price.$lte = Number(maxPrice)
  }

  // 🧠 Search by name or description (case-insensitive, partial match)
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ]
  }

  // Pagination
  const pageNumber = Number(page)
  const limitNumber = Number(limit)
  const skip = (pageNumber - 1) * limitNumber

  const total = await Shoe.countDocuments(filter)
  const totalPages = Math.ceil(total / limitNumber)

  const shoes = await Shoe.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(limitNumber)

  res.status(200).json({
    status: 'success',
    results: shoes.length,
    total,
    totalPages,
    page: pageNumber,
    data: shoes,
  })
})


/**
 *  🧠 Why This Approach?
Filtering: Optional query strings (?category=boots&gender=men) let the frontend refine results.

Pagination: Prevents overloading with large data sets; scalable for long product lists.

Sorting: Enables frontend to sort by newest (-createdAt), price, etc.

Flexible & Extensible: Easy to add filters for price range, size, etc. later.


  ✅ Summary
  | Concept      | Purpose                                | Example                        |
| ------------ | -------------------------------------- | ------------------------------ |
| `limit`      | How many results to return             | `limit(10)` = 10 results       |
| `skip`       | How many results to skip               | `skip(10)` = skip first 10     |
| Pagination   | Break large results into pages         | Page 2 = `skip(10), limit(10)` |
| Empty Result | No matching shoes or reached last page | Returns empty array `[]`       |

 */

/**
 * 🧠 Quick Mongoose Refresher
    $gte → greater than or equal
    $lte → less than or equal
 * 
 * 🧠 Why This Works:
 *
 * - `price.$gte` and `price.$lte` are Mongoose query operators.
 * - Dynamic filters allow combining category, gender, brand, and price.
 * - `Number(...)` ensures query strings are treated as numbers.
 *
 * ✅ Examples:
 * - `?minPrice=1000` → All shoes with price ≥ 1000
 * - `?maxPrice=5000` → All shoes with price ≤ 5000
 * - `?minPrice=1000&maxPrice=5000` → Shoes in between
 */

/**
 *  ✅ Test Cases You Can Try
    | Query                                       | What It Does                       |
| ------------------------------------------- | ---------------------------------- |
| `/api/v1/shoes?minPrice=800`                | All shoes with price ≥ 800         |
| `/api/v1/shoes?maxPrice=2000`               | All shoes with price ≤ 2000        |
| `/api/v1/shoes?minPrice=1000&maxPrice=1500` | All shoes priced between 1000–1500 |

 */

export default getAllShoes

