import { useEffect,useState } from "react";

export default  function useGet(url){
    const [data,setData] = useState([])
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await fetch(url )
                    if(!response.ok){
                        setLoading(false)
                        setError(true)
                    }
                    const data = await response.json()
                    setLoading(false)
                    setData(data)
                }catch(err){
                    setLoading(false)
                    setError(true)
                }
            }
        )()
    }, [url])
    return { data, error, loading }
}
  