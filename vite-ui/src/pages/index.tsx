import { AppBridgeProvider } from '../components/Providers'

const IndexPage = () => {
  return (
    <AppBridgeProvider>
      <div>App Installed</div>
    </AppBridgeProvider>
  )
}

export default IndexPage
