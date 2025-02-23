const API_URL = "https://fake-coffee-api.vercel.app/api"

export function getAllProducts(limit?: number) {
  let url = API_URL

  if (limit) {
    url += `?limit=${limit}`
  }

  return fetch(url)
    .then((res) => res.json())
    .catch(() => {
      throw new Error('Loading error')
    })
}

export function getProduct(coffeeId: number) {
  return fetch(`${API_URL}/${coffeeId}`)
    .then((res) => res.json())
}
