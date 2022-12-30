import { ReactNode } from 'react'
import Sidebar from './Sidebar'

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidebar className="w-60" />
      <main className="flex w-full flex-col">{children}</main>
    </div>
  )
}
