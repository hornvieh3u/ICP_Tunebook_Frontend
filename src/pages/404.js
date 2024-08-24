import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function Page404() {
  const history = useHistory();

  return (
    <div className="font-plus flex flex-col items-center justify-center pt-[150px]">
      <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">404</h1>
      <p className="text-gray-700 dark:text-gray-300 pt-4">
        Page not found. Check the address or{' '}
        <div className="text-purple-600 hover:underline dark:text-darkblue-300 cursor-pointer flex items-center justify-center" onClick={() => {history.goBack()}}>
          go back
        </div>
      </p>
    </div>
  )
}

export default Page404
