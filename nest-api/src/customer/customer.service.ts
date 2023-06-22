import { Injectable } from '@nestjs/common';
import Shopify = require('shopify-api-node');

enum ResourceType {
  Customer = 'customer',
  Product = 'product',
  Order = 'order',
  Shop = 'shop',
  Variant = 'variant',
  Collection = 'collection',
}

export interface CustomerRequest {
  email: string;
  shop: string;
  namespace?: string;
  key?: string;
  value?: string;
}

interface CustomerResponse {
  id?: number;
  verified_email?: boolean;
  status: boolean;
  message: string;
}

interface MetaFieldResponse {
  status: boolean;
  message: string;
  data?: any;
}

@Injectable()
export class CustomerService {
  async searchEmail(event: CustomerRequest): Promise<CustomerResponse> {
    const { email, shop } = event;

    const shopify = new Shopify({
      shopName: shop,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    });

    const resp = await shopify.customer.search({ email });

    if (!resp[0]) {
      return {
        status: false,
        message: 'Not find customer',
      };
    }
    return {
      id: resp[0].id,
      verified_email: resp[0].verified_email,
      status: true,
      message: 'OK',
    };
  }

  async searchMetaField(event: CustomerRequest): Promise<CustomerResponse> {
    const { email, shop, namespace, key, value } = event;

    const customer = await this.searchEmail(event);

    if (!customer.status) return customer;

    const shopify = new Shopify({
      shopName: shop,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    });

    const resp = await shopify.metafield.list({
      metafield: {
        owner_resource: 'customer',
        owner_id: customer.id,
        namespace: 'POINTS',
      },
    });

    const metaField = resp.find((res) => res.namespace === namespace);

    if (!metaField.id) {
      return {
        status: false,
        message: 'MetaField Not Found',
      };
    }
    return {
      status: true,
      message: 'OK',
      ...metaField,
    };
  }

  async createMetaField(event: CustomerRequest): Promise<MetaFieldResponse> {
    const { shop, namespace, key, value } = event;

    const customer = await this.searchEmail(event);

    if (!customer.status) return customer;
    const shopify = new Shopify({
      shopName: shop,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    });

    try {
      const resp = await shopify.metafield.create({
        key,
        value,
        namespace,
        owner_resource: ResourceType.Customer,
        owner_id: customer.id,
        type: 'string',
      });

      return {
        status: true,
        message: 'ok',
        data: resp,
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error Create MetaField',
      };
    }
  }

  async updateMetaField(event: CustomerRequest): Promise<MetaFieldResponse> {
    const { shop, namespace, key, value } = event;

    const customer = await this.searchEmail(event);

    if (!customer.status) return customer;

    const shopify = new Shopify({
      shopName: shop,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    });

    try {
      const resp = await shopify.metafield.update(12121, {
        key,
        value,
        namespace,
        owner_resource: ResourceType.Customer,
        owner_id: customer.id,
        type: 'string',
      });

      return {
        status: true,
        message: 'ok',
        data: resp,
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error Create MetaField',
      };
    }
  }
}
