import { useEffect, useState } from 'react';
import {
  useExtensionApi,
  render,
  Banner,
  BlockStack,
  Divider,
  Heading,
  InlineLayout,
  Image,
  Button,
  Text,
  useApplyCartLinesChange,
  SkeletonImage,
  SkeletonText,
  useCartLines
} from '@shopify/checkout-ui-extensions-react';
import { PRODUCTS } from './query';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const { query, i18n } = useExtensionApi();
  const applyCartLinesChange = useApplyCartLinesChange();
  const lines = useCartLines();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchProducts() {
      const { data } = await query(PRODUCTS, {
        variables: { first: 5 }
      });

      setProducts(data.products.nodes);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  if (loading) {
    return (
      <BlockStack spacing="loose">
        <Divider />
        <Heading level={2}>You might also like</Heading>
        <BlockStack spacing="loose">
          <InlineLayout
            spacing="base"
            columns={[64, 'fill', 'auto']}
            blockAlignment="center"
          >
            <SkeletonImage aspectRatio={1} />
            <BlockStack spacing="none">
              <SkeletonText inlineSize="large" />
              <SkeletonText inlineSize="small" />
            </BlockStack>
            <Button kind="secondary" disabled={true}>
              Add
            </Button>
          </InlineLayout>
        </BlockStack>
      </BlockStack>
    );
  }

  if (!loading && products.length === 0) {
    return null;
  }

  const cartLineProductVariantIds = lines.map((item) => item.merchandise.id);
  const productsOnOffer = products.filter((product) => {
    const isProductVariantInCart = product.variants.nodes.some(({ id }) =>
      cartLineProductVariantIds.includes(id)
    );
    return !isProductVariantInCart;
  });

  if (!productsOnOffer.length) {
    return null;
  }

  const { images, title, variants } = productsOnOffer[0];

  const renderPrice = i18n.formatCurrency(variants.nodes[0].price.amount);

  const imageUrl =
    images.nodes[0]?.url ??
    'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_medium.png?format=webp&v=1530129081';

  return (
    <BlockStack spacing="loose">
      <Divider />
      <Heading level={2}>You might also like</Heading>
      <BlockStack spacing="loose">
        <InlineLayout
          spacing="base"
          columns={[64, 'fill', 'auto']}
          blockAlignment="center"
        >
          <Image
            border="base"
            borderWidth="base"
            borderRadius="loose"
            source={imageUrl}
            description={title}
            aspectRatio={1}
          />
          <BlockStack spacing="none">
            <Text size="medium" emphasis="strong">
              {title}
            </Text>
            <Text appearance="subdued">{renderPrice}</Text>
          </BlockStack>
          <Button
            kind="secondary"
            loading={adding}
            accessibilityLabel={`Add ${title} to cart`}
            onPress={async () => {
              setAdding(true);
              const result = await applyCartLinesChange({
                type: 'addCartLine',
                merchandiseId: variants.nodes[0].id,
                quantity: 1
              });
              setAdding(false);
              if (result.type === 'error') {
                setShowError(true);
                console.error(result.message);
              }
            }}
          >
            Add
          </Button>
        </InlineLayout>
      </BlockStack>
      {showError && (
        <Banner status="critical">
          There was an issue adding this product. Please try again.
        </Banner>
      )}
    </BlockStack>
  );
}
