export function validateUrl(url: string): { isValid: boolean; message: string } {
  // Check if the URL is not empty
  if (!url || url.trim() === '') {
    return { isValid: false, message: 'URL is required' };
  }
  
  // Basic URL validation
  try {
    const urlObj = new URL(url);
    
    // Check if protocol is HTTP or HTTPS
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { 
        isValid: false, 
        message: 'URL must start with http:// or https://' 
      };
    }
    
    // Check if it's HTTPS (preferred but not required)
    if (urlObj.protocol === 'http:') {
      return { 
        isValid: true, 
        message: 'URL is valid, but HTTPS is recommended for security'
      };
    }
    
    return { isValid: true, message: 'URL is valid and secure (HTTPS)' };
  } catch (error) {
    // URL constructor throws an error if the URL is invalid
    return { 
      isValid: false, 
      message: 'Invalid URL format. Please enter a complete URL (e.g., https://example.com)'
    };
  }
}

// Advanced URL validation that could be implemented to check if the URL is active
// This would require a server-side check, so it's commented out as an example
/*
export async function checkUrlIsActive(url: string): Promise<boolean> {
  try {
    // This would need to be implemented server-side due to CORS restrictions
    // For example using a serverless function or backend API
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}
*/