import Sidebar from './Sidebar'

export default function Layout({ children }: { children?: any }) {
  return (
    <div className="flex min-h-screen flex-col transition-colors duration-150">
      <div className="flex flex-1">
        <Sidebar className="w-72" />
        <main className="container mx-auto w-full px-4 sm:px-6">{children}</main>
      </div>
    </div>
  )
}
