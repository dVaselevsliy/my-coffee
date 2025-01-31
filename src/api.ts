const API_URL = "https://fake-coffee-api.vercel.app/api"

export function getCoffee() {
  return fetch(API_URL)
    .then((res) => res.json())
    .catch(() => {
      throw new Error('Loading error')
    })
}
