import { PropsWithChildren, ReactDOM, useMemo, useState } from 'react'
import { Path, useLocation, useNavigate } from 'react-router-dom'
import { Provider } from '@shopify/app-bridge-react'

export interface AppBridgeProps {
  children: ReactDOM
}

declare global {
  interface Window {
    __SHOPIFY_DEV_HOST: string
  }
}

export function AppBridgeProvider({ children }: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()
  const history = useMemo(
    () => ({
      replace: (path: Path) => {
        navigate(path, { replace: true })
      },
    }),
    [navigate],
  )

  const routerConfig = useMemo(() => ({ history, location }), [history, location])

  const [appBridgeConfig] = useState(() => {
    const host = new URLSearchParams(location.search).get('host') || window.__SHOPIFY_DEV_HOST

    window.__SHOPIFY_DEV_HOST = host

    return {
      host,
      apiKey: import.meta.env.VITE_API_SHOPIFY_KEY,
      forceRedirect: true,
    }
  })

  if (!appBridgeConfig.host) {
    return (
      <>
        Your app can only load if the URL has a <b>host</b> argument. Please ensure that it is set, or access your app
        using the Partners Dashboard
        <b>Test your app</b> feature
      </>
    )
  }

  return (
    <Provider config={appBridgeConfig} router={routerConfig}>
      {children}
    </Provider>
  )
}
