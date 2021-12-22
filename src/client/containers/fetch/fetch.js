
export async function fetchFromDb(endpoint, fetchMethod, postBody = {}) {
 
  
    const fetchOptions = {
      method: fetchMethod,
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',

      },
    };
    if (fetchMethod === 'post' || fetchMethod === 'put') {
      fetchOptions.body = JSON.stringify(postBody);
    }
    const response = await fetch(`/api${endpoint}`, fetchOptions);
    if (!response.ok) {
      throw new ApiError(response.statusText, response.status);
    }
    if (fetchMethod === 'get') {
      const dbData = await response.json();
      return dbData;
    }
    return response;
  }