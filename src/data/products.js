const products = [
  {
    id: "1",
    image: "⌚",
    name: "Watch",
    details: "Buy is for 156 INR"
  },
  {
    id: "2",
    image: "🥒",
    name: "Cucumber",
    details: "2 KGS for 45.76 INR"
  },
  {
    id: "3",
    image: "💻",
    name: "Laptop",
    details: "23K INR Without EMI"
  }
]

export const getAllProducts = () => {
  return products;
}

export const getProductById = (id) => {
  const found = products.find(product => product.id === id);
  return found;
}