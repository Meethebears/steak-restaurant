import { useState, useCallback } from 'react'
import { useApiService as API } from '../api'

/**
 * @param {string} name is name api
 * @param {string} loadType is config load => [overlay, none]
 */
const useAPIService = (name, loadType, locale, userAuth) => {
  // State สำหรับจัดการการโหลด, ข้อผิดพลาด และการหมดอายุของ token
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [tokenExpired, setTokenExpired] = useState(false)

  // ฟังก์ชันเริ่มต้นการทำงานของ API
  const start = useCallback(() => {
    setLoading(true)  // เมื่อเริ่มการทำงานตั้งค่า loading เป็น true
  }, [])

  // ฟังก์ชันสิ้นสุดการทำงานของ API
  const end = useCallback(() => {
    setTimeout(() => setLoading(false), 200)  // สิ้นสุดการโหลดหลังจากเวลาหน่วง
  }, [])

  // ฟังก์ชันจัดการข้อผิดพลาด
  const handleError = useCallback((err) => {
    setError(err)
    if (err?.response?.status === 401) {
      setTokenExpired(true)  // หากเกิดข้อผิดพลาด 401 ให้ตั้งค่าการหมดอายุของ token
    }
  }, [])

  // ฟังก์ชันจัดการการหมดอายุของ token
  const onExpire = useCallback(() => {
    setTokenExpired(true)  // กำหนดให้ token หมดอายุ
    // อาจจะดำเนินการเพิ่มเติม เช่น รีไดเรกต์ไปหน้าล็อกอิน
  }, [])

  // ตรวจสอบว่ามี `userAuth` และ `userAuth.token` หรือไม่
  const token = userAuth?.token || null

  // สร้าง API client
  const api = API(
    { token },    // ส่ง token จาก userAuth
    start,        // เริ่มโหลด
    end,          // สิ้นสุดโหลด
    handleError,  // จัดการข้อผิดพลาด
    locale,       // กำหนดค่า locale
    onExpire      // จัดการเมื่อ token หมดอายุ
  )

  return {
    api,          // api client
    loading,      // สถานะการโหลด
    error,        // ข้อผิดพลาด
    tokenExpired  // สถานะการหมดอายุของ token
  }
}

export default useAPIService
