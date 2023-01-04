
export async function getMethod(url) {
    try {
        const response = await fetch(url)
        if(response.status !== 200){return {error:true}}
        const dataFetched = await response.json()
        return { data:dataFetched, error: false, status: "" }
    } catch (err) {
        return {error:true}
    }
}

export const postMethod = async (url, body = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        console.log(response);
        return response.status !== 201 ? { error: true, status: response.status } : { data: response, error: false, status: response.status + " " + response.statusText }
    } catch (err) {
        return { error :true}
    }
}
