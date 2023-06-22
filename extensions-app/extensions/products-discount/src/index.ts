import { DiscountApplicationStrategy } from '../generated/api';

const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: []
};

export default (input) => {
  const targets = input.cart.lines.map((line) => {
    return {
      productVariant: {
        id: line.merchandise.id
      }
    };
  });

  if (!targets.length) {
    return EMPTY_DISCOUNT;
  }

  return {
    discounts: [
      {
        targets,
        value: {
          fixedAmount: {
            amount: input.cart.attribute.value || 0
          }
        }
      }
    ],
    discountApplicationStrategy: DiscountApplicationStrategy.First
  };
};
