import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import AppConstant from './constants/app'

import router from './router'

const App = () => {
  const [isAppInstalled, setAppInstalled] = useState(false)

  const query = new URLSearchParams(window.location.search)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location) {
      const apiKey = import.meta.env.VITE_API_SHOPIFY_KEY
      const hmac = query.get('hmac')
      const shop = query.get('shop')
      // co nst host = query.get('host')
      const timestamp = query.get('timestamp')
      const embedded = query.get('embedded')

      if (timestamp && hmac && shop && embedded != '1') {
        const redirect_uri = `${import.meta.env.VITE_API_ENDPOINT}/shopify/callback`
        const nonce = 'nonce'
        const access_mode = 'per-user'
        const client_id = apiKey
        const scopes = 'read_customers,read_orders'
        const authorizeUrl = `https://${shop}/admin/oauth/authorize?client_id=${client_id}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${nonce}&grant_options[]=${access_mode}`
        window.location.replace(authorizeUrl)

        setAppInstalled(false)
      } else {
        setAppInstalled(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isAppInstalled) return <div>You Must Install App Before Use It</div>

  return <RouterProvider router={router} />
}

export default App
