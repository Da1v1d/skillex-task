import type { TODO } from "@/shared/lib/types";
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export interface BaseApiServiceOptions {
  baseURL: string;
}

export default class BaseApiService {
  protected axiosInstance: AxiosInstance;
  protected baseURL: string;

  constructor({ baseURL }: BaseApiServiceOptions) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({ baseURL: this.baseURL });
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get<T>(url, config).then(this.handleResponse);
  }

  public post<T>(
    url: string,
    data?: TODO,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance
      .post<T>(url, data, config)
      .then(this.handleResponse);
  }

  public put<T>(
    url: string,
    data: TODO,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance
      .put<T>(url, data, config)
      .then(this.handleResponse);
  }

  public patch<T>(
    url: string,
    data: TODO,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance
      .patch<T>(url, data, config)
      .then(this.handleResponse);
  }

  public del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.delete<T>(url, config).then(this.handleResponse);
  }
}
