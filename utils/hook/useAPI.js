import { useState, useCallback } from 'react'
import API from '../api'

/**
 * @param {string} name ชื่อ API ที่ใช้
 * @param {string} loadType is config load => [overlay, none]
 */
const useAPI = (name, loadType, locale) => {
  // State สำหรับการจัดการสถานะ
  const [loading, setLoading] = useState(false)
  const [errors, setError] = useState(null)
  const [tokenExpired, setTokenExpired] = useState(false)
  const [apiName, setApiName] = useState('')
  const [loadtype, setLoadType] = useState('none')

  // ฟังก์ชันเริ่มต้นการทำ API call
  const start = () => {
    setLoading(true)
    setError(null)
    setApiName(name)
    setLoadType(loadType)
  }

  // ฟังก์ชันสิ้นสุดการทำ API call
  const end = useCallback(() => {
    setLoading(false)
    setApiName(name)
  }, [])

  // ฟังก์ชันจัดการข้อผิดพลาด
  const error = useCallback((err) => {
    setLoading(false)
    setError(err)
    setApiName(name)
    if (err?.response?.status === 401) {
      setTokenExpired(true)  // หรืออาจทำการรีเฟรช token ที่นี่
    }
  }, [])

  // ฟังก์ชันตรวจสอบ token หมดอายุ
  const onExpire = useCallback(() => {
    setTokenExpired(true)
    // อาจจะทำการลบ token หรือรีไดเร็กต์ไปหน้าล็อกอิน
  }, [])

  // สร้าง API client
  const api = API(
    { token: 'your-user-token' },  // คุณสามารถใช้ token ที่ได้จาก context หรือ prop อื่นๆ
    start,
    end,
    error,
    locale,
    onExpire
  )
  return api
}

export default useAPI

