import Router from 'next/router'
import { useEffect } from 'react'

export default function Logout() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth')
      Router.push('/')
    }
  }, [])

  return <></>
}
