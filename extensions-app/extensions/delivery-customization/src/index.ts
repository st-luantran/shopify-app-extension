const NO_CHANGES = {
  operations: []
};

export default (input) => {
  const configuration = JSON.parse(
    input?.deliveryCustomization?.metafield?.value ?? '{}'
  );
  if (!configuration.countryCode || !configuration.message) {
    return NO_CHANGES;
  }

  let toRename = input.cart.deliveryGroups
    .filter(
      (group) =>
        (group.deliveryAddress?.provinceCode &&
          group.deliveryAddress.provinceCode == configuration.countryCode) ||
        group.deliveryAddress.countryCode === 'VN'
    )
    .flatMap((group) => group.deliveryOptions)
    .map((option) => ({
      rename: {
        deliveryOptionHandle: option.handle,
        title: option.title
          ? `${option.title} - ${configuration.message}`
          : configuration.message
      }
    }));

  return {
    operations: toRename
  };
};
