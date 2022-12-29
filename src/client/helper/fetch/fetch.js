
export async function fetchFromDb(endpoint, fetchMethod, postBody = {}) {
  try {

    let error = false
    let status
    let data
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
    if (response.status != 200) {
      return { response: "", error: true, status: response.status + " " + response.statusText }
    }
    if (fetchMethod === 'get') {
      data = await response.json();
      return { data, error, status };;
    }
    return { data: response, error, status };
  } catch (error) {
    return { data: "", error: true, status: error }
  }
}