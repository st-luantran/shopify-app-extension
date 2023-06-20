import { PropsWithChildren, ReactNode, useCallback } from 'react'
import { AppProvider } from '@shopify/polaris'
import { useNavigate } from '@shopify/app-bridge-react'

import translations from '@shopify/polaris/locales/en.json'

import '@shopify/polaris/build/esm/styles.css'
import { Navigate, To } from '@shopify/app-bridge-react/hooks/useNavigate/useNavigate'

export interface Props {
  url: string
  external: string
  children: ReactNode | string
  rest?: string
}

function AppBridgeLink({ url, children, external, ...rest }: Props) {
  const navigate: Navigate<To> = useNavigate()
  const handleClick = useCallback(() => {
    navigate(url)
  }, [url, navigate])

  const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/

  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    return (
      <a {...rest} href={url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <a {...rest} onClick={handleClick}>
      {children}
    </a>
  )
}

export function PolarisProvider({ children }: PropsWithChildren) {
  return (
    <AppProvider i18n={translations} linkComponent={AppBridgeLink}>
      {children}
    </AppProvider>
  )
}
