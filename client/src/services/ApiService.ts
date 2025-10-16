import { AxiosError, AxiosRequestConfig } from "axios";
import apiClient from "@/api-client";
import { ICommonResponse } from "@/types";

class ApiService {
  private handleResponse<T>(response: ICommonResponse<T>): T {
    if (!response.success || response.data === undefined) {
      throw new Error(response.message || "Request failed");
    }

    return response.data;
  }

  private handleError(error: unknown): never {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;

      throw new Error(message);
    }

    throw error;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.get<ICommonResponse<T>>(url, config);

      return this.handleResponse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await apiClient.post<ICommonResponse<T>>(
        url,
        data,
        config
      );

      return this.handleResponse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await apiClient.put<ICommonResponse<T>>(
        url,
        data,
        config
      );

      return this.handleResponse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.delete<ICommonResponse<T>>(url, config);

      return this.handleResponse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const api = new ApiService();
