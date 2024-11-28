import useAPI from "../../../../utils/hook/useAPI";
import { message } from 'antd'
import { resError, resOK } from "../../../../utils/response";
import { useState } from "react";

const useCreateUser = () => {
  const name = "createuser";
  const API = useAPI(name, 'overlay')
  const [result, useResult ] = useState();
  const [loading, setLoading] = useState(false);
  const createuser = async (body) => {
    try {
      setLoading(true);
      API.begin();
      const { data } = await API.post(`/register`, body)
      const res = resOK(data)
      useResult(res)
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
  };

  return [result?.data, loading, createuser];
};

export default useCreateUser;