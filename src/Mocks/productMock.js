import { fakerES_MX as faker } from "@faker-js/faker";

export const generateFakeProduct = () => {
  const fakeProduct = {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.number.int(100),
    category: faker.commerce.department(),
    thumbnails: [faker.image.url()],
  };
  return fakeProduct;
};