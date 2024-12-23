import { useState, useCallback } from 'react'
import API from '../api'
import { useSession } from 'next-auth/react'
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "../../src/app/lib/nextAuthOptions"

/**
 * @param {string} name ชื่อ API ที่ใช้
 * @param {string} loadType is config load => [overlay, none]
 */
const useAPI = (name, loadType, locale) => {
  // State สำหรับการจัดการสถานะ
  // const session = getServerSession(authOptions)
  const { data: session, status } = useSession()
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
    { token: session?.user?.id },
    start,
    end,
    error,
    locale,
    onExpire
  )
  return api
}

export default useAPI

