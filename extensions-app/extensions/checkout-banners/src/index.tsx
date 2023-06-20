import {
  render,
  Banner,
  useSettings,
  TextBlock
} from '@shopify/checkout-ui-extensions-react';
import { ExtensionSettings } from '@shopify/checkout-ui-extensions';

render('Checkout::Dynamic::Render', () => <App />);

interface Settings extends ExtensionSettings {
  banner_title?: string;
  banner_description?: string;
}

function App() {
  const { banner_title, banner_description }: Settings = useSettings();

  return (
    <Banner title={banner_title}>
      <TextBlock>{banner_description}</TextBlock>
    </Banner>
  );
}
