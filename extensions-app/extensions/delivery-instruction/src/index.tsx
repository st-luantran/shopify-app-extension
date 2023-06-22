import { useState } from 'react';
import {
  render,
  useMetafield,
  useApplyMetafieldsChange,
  BlockStack,
  Checkbox,
  TextField
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::ShippingMethods::RenderAfter', () => <App />);

function App() {
  const [checked, setChecked] = useState(false);

  const namespace = 'delivery_instruction';
  const key = 'delivery_instruction';

  const deliveryInstructions = useMetafield({
    namespace,
    key
  });

  const applyMetafieldsChange = useApplyMetafieldsChange();

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <BlockStack>
      <Checkbox checked={checked} onChange={handleChange}>
        Provide delivery instructions
      </Checkbox>
      {checked && (
        <TextField
          label="Delivery instructions"
          multiline={3}
          onChange={(value) => {
            applyMetafieldsChange({
              type: 'updateMetafield',
              namespace,
              key,
              valueType: 'string',
              value
            });
          }}
          value={deliveryInstructions?.value}
        />
      )}
    </BlockStack>
  );
}
