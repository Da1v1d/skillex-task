// ! I know in most cases this is not the solution, cause we get data as strings and they can be more then 100 various categories and brands.
// ! This was done by professionals and we don't suggest to do it like this ))).
type Category = "Electronics" | "Clothing" | "Footwear";
type Brand = `Brand ${Uppercase<string>}`;

type PriceRange = { min: number; max: number };
type RatingRange = { min: number; max: number };

export interface Product {
  id: number;
  name: string;
  category: Category;
  brand: Brand;
  price: number;
  rating: number;
  imageUrl: string;
}

export interface ProductsRequest {
  page?: number;
  limit?: number;
  category?: Category;
  brand?: Brand;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

export interface Filters {
  categories: Category[];
  brands: Brand[];
  priceRange: PriceRange;
  ratingRange: RatingRange;
}
