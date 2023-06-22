# Update Run Server Local

## Create Discount Auto wwithout Value

Install GraphQL Full Access : https://shopify-graphiql-app.shopifycloud.com/login

Mutation Create Discount :

```js
  mutation {
    discountAutomaticAppCreate(
      automaticAppDiscount: {title: "Volume discount 1", functionId: "01H1KG57P340K18J3DT76W0TE3", startsAt: "2022-06-22T00:00:00"}
    ) {
      automaticAppDiscount {
        title
        discountId
      }
      userErrors {
        field
        message
        code
      }
    }
  }
```

![Alt text](/discount.png 'Discount')
![Alt text](/function.png 'Function')
![Alt text](/logs.png 'Logs')

https://www.loom.com/share/e440e817e1f44c2bb7ad4af7ae9f60cb

## Notes file shopify.app.toml scopes : write_discounts
