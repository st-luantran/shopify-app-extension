import { describe, it, expect } from 'vitest';
import deliveryCustomization from './index';
import { FunctionResult } from '../generated/api';

describe('delivery customization function', () => {
  it('returns no operations without configuration', () => {
    const result = deliveryCustomization({
      deliveryCustomization: {
        metafield: null
      }
    });
    const expected: FunctionResult = { operations: [] };

    expect(result).toEqual(expected);
  });
});
