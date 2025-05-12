const BASE_URL = 'https://feature10vvvkv8vv.phot.ai/app/api/v1';

// Common headers
const headers = {
  'Content-Type': 'application/json',
};

// Common API configurations
const apiConfig = {
  baseURL: BASE_URL,
  headers,
};

// API endpoints
const endpoints = {
  bulkProcessing: {
    signedUrls: '/bulk-processing/signed-urls',
  },
};

/**
 * Common API request handler
 * @param {string} url - API endpoint
 * @param {Object} options - Request options
 * @returns {Promise<Object>} - Returns the response data
 */
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...apiConfig.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * Get signed URLs for bulk processing
 * @param {number} count - Number of signed URLs to generate
 * @returns {Promise<Object>} - Returns the response data containing signed URLs
 */
export const getSignedUrls = async (count) => {
  const url = `${apiConfig.baseURL}${endpoints.bulkProcessing.signedUrls}?count=${count}`;
  return apiRequest(url, { method: 'GET' });
};

// Export common configurations and utilities
export const api = {
  config: apiConfig,
  endpoints,
  request: apiRequest,
}; 