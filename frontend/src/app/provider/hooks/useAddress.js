import React, {useState} from "react";

export default function useAddress() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [addressInfo, setAddressInfo] = useState({})

    async function getAddressInfo() {
        setIsLoading(true)
        try {
            const response = await fetch('http://159.223.225.226:8080/api/v1/transaction/0xB3764761E297D6f121e79C32A65829Cd1dDb4D32/group?blockchain=ethereum')
            response.json().then(result => {
                console.log("RESPONSE", result)
                setAddressInfo(addressInfo)
            })
        } catch (e) {
            console.error(e);
            // setError(e.response?.data?.message)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        getAddressInfo,
        addressInfo,
        isLoading,
        error
    }

}