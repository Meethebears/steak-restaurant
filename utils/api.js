import Axios from 'axios'
import { useSession } from 'next-auth/react'
import config from '../config'

Axios.defaults.timeout = (1000 * 60) * 3
Axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

export const axios = Axios.create({
  baseURL: config.hostBackend
})

class ApiClient {
  constructor(apiEndpoint, userAuth, callBegin, callEnd, callError, locale, onExpire) {
    this.token = userAuth?.accessToken // ใช้ access token จาก session
    this.cancelTokenSource = Axios.CancelToken.source()
    this.axios = Axios.create({
      baseURL: apiEndpoint
    })
    this.begin = () => callBegin?.(this.cancelTokenSource)
    this.end = callEnd
    this.error = callError
    this.locale = locale || 'en-US'
    this.onExpire = onExpire
  }

  _setOption(access, options) {
    return {
      ...options,
      headers: {
        ...access,
        ...options?.headers
      },
      cancelToken: this.cancelTokenSource.token
    }
  }

  _checkAuth(auth) {
    if (auth && !this.token) {
      throw { error_message: 'ไม่มีสิทธิ' }
    }
    return auth ? { Authorization: `Bearer ${this.token}` } : null
  }

  get(url, options = {}) {
    url = String(url).replace('/api/v1', '')
    const { auth = true, ...optionsAxios } = options
    const access = this._checkAuth(auth)
    return this.axios.get(url, { ...this._setOption(access, optionsAxios) })
      .catch((reason) => {
        if (reason?.response?.status === 401) {
          this.onExpire()
        }
        throw reason
      })
      .finally(() => {
        if (typeof this.callback === 'function' && this.option.autoCallFinished) {
          this.callback()
        }
      })
  }

  post(url, body, options = {}) {
    url = String(url).replace('/api/v1', '')
    const { auth = true, ...optionsAxios } = options
    const access = this._checkAuth(auth)
    return this.axios.post(url, body, { ...this._setOption(access, optionsAxios) })
      .catch((reason) => {
        if (reason?.response?.status === 401) {
          this.onExpire()
        }
        throw reason
      })
      .finally(() => {
        if (typeof this.callback === 'function' && this.option.autoCallFinished) {
          this.callback()
        }
      })
  }

  put(url, body, options = {}) {
    url = String(url).replace('/api/v1', '')
    const { auth = true, ...optionsAxios } = options
    const access = this._checkAuth(auth)
    return this.axios.put(url, body, { ...this._setOption(access, optionsAxios) })
      .catch((reason) => {
        if (reason?.response?.status === 401) {
          this.onExpire()
        }
        throw reason
      })
      .finally(() => {
        if (typeof this.callback === 'function' && this.option.autoCallFinished) {
          this.callback()
        }
      })
  }

  delete(url, options = {}) {
    url = String(url).replace('/api/v1', '')
    const { auth = true, ...optionsAxios } = options
    const access = this._checkAuth(auth)
    return this.axios.delete(url, { ...this._setOption(access, optionsAxios) })
      .catch((reason) => {
        if (reason?.response?.status === 401) {
          this.onExpire()
        }
        throw reason
      })
      .finally(() => {
        if (typeof this.callback === 'function' && this.option.autoCallFinished) {
          this.callback()
        }
      })
  }

  patch(url, body, options = {}) {
    url = String(url).replace('/api/v1', '')
    const { auth = true, ...optionsAxios } = options
    const access = this._checkAuth(auth)
    return this.axios.patch(url, body, { ...this._setOption(access, optionsAxios) })
      .catch((reason) => {
        if (reason?.response?.status === 401) {
          this.onExpire()
        }
        throw reason
      })
      .finally(() => {
        if (typeof this.callback === 'function' && this.option.autoCallFinished) {
          this.callback()
        }
      })
  }
}

const useApiClient = (callBegin, callEnd, callError, option, onExpire) => {
  const { data: session } = useSession();  // ใช้ session จาก NextAuth
  return new ApiClient(config.hostBackend, session?.user, callBegin, callEnd, callError, option, onExpire);
};

export const useApiService = (callBegin, callEnd, callError, option, onExpire) => {
  const { data: session } = useSession();  // ใช้ session จาก NextAuth
  return new ApiClient(config.host, session?.user, callBegin, callEnd, callError, option, onExpire);
};

export default useApiClient;
