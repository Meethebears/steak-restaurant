// import React from 'react'
import { message } from 'antd'
import { MESSAGE } from './constant'

export const resOK = (response, msg = false) => {
  if (response?.success === true) {
    if (msg !== false) {
      message.success(msg || MESSAGE?.SAVE_SUCCESS)
    }
    return { success: response?.success, data: response?.data || {}, message: response?.message }
  } else {
    throw response
  }
}

export const resError = (error, msg = false) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(error)
    console.log(error.message)
  }

  if (error?.response?.data?.message) {
    message.error(error?.response?.data?.message)
    return { errorMessages: [], errorMessage: error.message, errorCode: 999, data: null, statusCode: null }
  }

  let errorMessages = error?.response?.error_messages || []
  let errorMessage = error?.response?.error_message || error?.response?.error_messages?.[0] || null
  const errorCode = error?.response?.error_code || null
  const statusCode = error?.response?.status || null
  const data = error?.response?.data || null
  if (error.message === 'Network Error') {
    errorMessages = []
    errorMessage = error.message
    message.destroy()
    message.error(error.message)
  }

  if (msg !== false) {
    message.error(msg || MESSAGE?.API_FAIL)
  }

  return { errorMessages, errorMessage, errorCode, data, statusCode }
}

export const resIMG = async (response, msg) => {
  const contentType = response.headers['content-type']
  const data = response.data

  if (/application\/json/.test(contentType)) {
    return null
  } else {
    return data
  }
}
