import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data, setData] = useState();
    const [isPending, setIsPending] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        fetch(url).then(res => {
            if (!res.ok) {
                throw Error("could not fetch the data ")
            }
            return res.json();
        })
            .then(data => {
                setData(data);
                setError(null);
                setIsPending(false);
            }).catch(err => {
                setIsPending(false);
                setError(err.message)
            })
    }, [url])
    return { data, isPending, error }
}

export default useFetch;