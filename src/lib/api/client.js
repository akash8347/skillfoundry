/**
 * API Client Helper
 * Centralized fetch wrapper with error handling
 */

import { createLogger } from "../api/logger";

const logger = createLogger("APIClient");

/**
 * API Client for making HTTP requests
 */
class APIClient {
  constructor(baseURL = process.env.NEXT_PUBLIC_API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Make API request
   */
  async request(endpoint, options = {}) {
    const {
      method = "GET",
      body = null,
      headers = {},
      timeout = 10000,
    } = options;

    const url = `${this.baseURL}${endpoint}`;
    const requestOptions = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...requestOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (data.status === "error") {
        const error = new APIError(data.error, data.message, response.status);
        error.details = data.details;
        logger.warn(
          `API Error: ${data.error}`,
          { endpoint, error: data.message }
        );
        throw error;
      }

      logger.debug(
        `${method} ${endpoint} - ${response.status}`,
        { data }
      );

      return data;
    } catch (error) {
      if (error instanceof APIError) throw error;

      if (error.name === "AbortError") {
        logger.error("API Request Timeout", new Error(url));
        throw new Error("Request timeout");
      }

      logger.error("API Request Failed", error, { endpoint, method });
      throw error;
    }
  }

  /**
   * GET request
   */
  get(endpoint, options) {
    return this.request(endpoint, { method: "GET", ...options });
  }

  /**
   * POST request
   */
  post(endpoint, body, options) {
    return this.request(endpoint, { method: "POST", body, ...options });
  }

  /**
   * PUT request
   */
  put(endpoint, body, options) {
    return this.request(endpoint, { method: "PUT", body, ...options });
  }

  /**
   * DELETE request
   */
  delete(endpoint, options) {
    return this.request(endpoint, { method: "DELETE", ...options });
  }
}

/**
 * Custom API Error
 */
class APIError extends Error {
  constructor(code, message, statusCode = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = "APIError";
  }
}

/**
 * Export singleton instance
 */
export const apiClient = new APIClient();

export { APIError };
