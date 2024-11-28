import config from "../../../../config";
import Axios  from "axios";

Axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

export const axios = Axios.create({
    baseURL: config.hostBackend
  })

  const url = config.hostBackend + '/api/sale_items'