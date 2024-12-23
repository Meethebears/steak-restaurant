import useAPI from "../../../../utils/hook/useAPI";
import { resError, resOK } from "../../../../utils/response"
import { message } from 'antd'
import { useState, useEffect, useCallback } from "react";
import { useSession } from 'next-auth/react'

const useFetchProduct = () => {
    const { data: session, status } = useSession()
    const name = "fetchProduct";
    const API = useAPI(name, 'overlay')
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(false);

    const FetchProduct = useCallback(async (filter = {}) => {
        try {
            setLoading(true);
            API.begin();
            const { data } = await API.get(`/product`, { params: { ...filter } })
            const res = resOK(data)
            setResult(res)
            message.success(res.message)
            return res
        } catch (error) {
            const e = resError(error);
            API.error(e);
            message.error(e?.errorMessage);
        } finally {
            setLoading(false);
            API.end();
        }
        return {
            success: false
        }
    }, [])

    return [result?.data, loading, FetchProduct];
};

export default useFetchProduct;