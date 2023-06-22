import {
  render,
  Banner,
  useSettings,
  useAppMetafields,
  TextBlock,
  BlockStack,
  Divider,
  TextField,
  useApplyAttributeChange
} from '@shopify/checkout-ui-extensions-react';
import {
  ExtensionSettings,
  AppMetafieldEntry
} from '@shopify/checkout-ui-extensions';

render('Checkout::Dynamic::Render', () => <App />);

interface Settings extends ExtensionSettings {
  banner_title?: string;
  banner_description?: string;
}

function App() {
  const { banner_title, banner_description }: Settings = useSettings();
  const [data]: AppMetafieldEntry[] = useAppMetafields();
  const updateAttribute = useApplyAttributeChange();

  async function onCheckboxChange(v: string) {
    try {
      await updateAttribute({
        type: 'updateAttribute',
        key: 'ATTRIBUTE_KEY',
        value: v
      });
    } catch (error) {
      console.log(error, 'error attr');
    }
  }

  return (
    <BlockStack spacing="loose">
      <Banner title={banner_title}>
        <TextBlock>{banner_description}</TextBlock>
        <TextBlock>{data?.metafield?.value || 0}</TextBlock>
      </Banner>
      <Divider />
      <TextField
        label="Discount"
        onChange={(e: string) => onCheckboxChange(e)}
      />
    </BlockStack>
  );
}
