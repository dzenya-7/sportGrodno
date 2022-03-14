import {useState, useCallback, useEffect, useContext} from 'react'
import {AuthContext} from "../context/AuthContext";

const storageName = 'userData'

export const useApi = () => {
    const getData = useCallback(async () => {
        try{
            let data
            await fetch('https://jsonplaceholder.typicode.com/todos')
                .then(response => response.json())
                .then(json => {
                    data = json
                })
            return data
        }
        catch (e){
            console.log(e)
            return null
        }

    }, [])
    return {getData}
}

export const useAuth = () => {

    const auth = useContext(AuthContext)
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [UserID, setUserId]= useState(null)

    const log = useCallback((jwtToken, ID)=>{
        try{
            setToken(jwtToken)
            setUserId(ID)


            auth.token = jwtToken
            auth.userId = ID
            auth.isAuthenticated = true

        }
        catch (e) {
            console.log(e)
        }

    },[auth])



    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        console.log("Logout")
        localStorage.removeItem(storageName)
    },[])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            log(data.token, data.userId)
        }
        setReady(true)
    }, [log])


    return { log, logout, token, UserID, ready }
}

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'POST', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, {method, body, headers})

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}