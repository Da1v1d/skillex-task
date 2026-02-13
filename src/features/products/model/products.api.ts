import type {
  Filters,
  Product,
  ProductsRequest,
} from "@/features/products/lib/types";
import type { Response } from "@/shared/lib/types";
import { apiService } from "@/shared/services";

class ProductsApi {
  static getAll(params: ProductsRequest) {
    return apiService.get<Response<Product[]>>("/products", { params });
  }

  static getFilters() {
    return apiService.get<Filters>("/filters");
  }
}

export default ProductsApi;
