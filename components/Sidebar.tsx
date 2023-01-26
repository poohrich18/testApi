import { classNames } from 'utils/classnames'

export default function Sidebar({ className }: { className?: string }) {
  return (
    <div className={classNames(className, 'bg-primary shadow')}>
      <div className="flex flex-col space-y-3 p-3">
        <div className="flex items-center">
          <h2 className="text-xl font-bold uppercase leading-none text-white drop-shadow">Test API</h2>
        </div>
        <div className="flex-1">
          <ul className="space-y-1 pt-2 pb-4 text-sm">
            <li className="drop-shadows rounded-sm">
              <a href="/list" className="flex items-center space-x-3 rounded-md p-2 font-bold uppercase leading-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-gray-100 drop-shadow">Home</span>
              </a>
            </li>
            <li className="rounded-sm">
              <a href="/logout" className="flex items-center space-x-3 rounded-md p-2 font-bold uppercase leading-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span className="text-gray-100 drop-shadow">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
