export const PRODUCTS = `query ($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        images(first:1){
          nodes {
            url
          }
        }
        variants(first: 1) {
          nodes {
            id
            price {
              amount
            }
          }
        }
      }
    }
  }`;
