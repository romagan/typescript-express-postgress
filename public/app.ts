const toCurrency = (price: number) => {
  return new Intl.NumberFormat(`ru-RU`, {
    currency: `rub`,
    style: `currency`
  }).format(price)
}

document.querySelectorAll<HTMLElement>(`.price`).forEach((node: HTMLElement) => {
  const price = node.textContent
  if (price) {
    node.textContent = toCurrency(+price)
  }
})

const $cart: HTMLElement | null = document.querySelector(`#cart`)
if ($cart) {
  $cart.addEventListener(`click`, (event: Event) => {
    const target = event.target as HTMLElement
    if (target.classList?.contains(`js-cart-remove`)) {
      const id = target.dataset.id

      fetch(`/cart/remove/${id}`, {
        method: `delete`
      }).then((res) => res.json())
        .then((cart) => {
          if (cart.courses.length) {
            const html = cart.courses.map((course: {
              title: string
              price: string
              img: string
              id: string
              count: number
            }) => {
              const {title, count, id} = course

              return `
                <tr>
                  <td>${title}</td>
                  <td>${count}</td>
                  <td>
                    <button class="btn btm-small js-cart-remove" data-id="${id}">Удалить</button>
                  </td>
                </tr>
              `
            }).join(``)
            const $tbody = $cart.querySelector(`tbody`)
            if ($tbody) $tbody.innerHTML = html

            const $price = $cart.querySelector(`.price`)
            if ($price) $price.textContent = toCurrency(cart.price)
          } else {
            $cart.innerHTML = `<p>Корзина пуста</p>`
          }
        })
    }

  })
}

const toggleFullScreean = (evt: Event) => {
  const target = evt.target as HTMLImageElement

  if (!document.fullscreenElement) {
    target.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

document.querySelectorAll<HTMLImageElement>(`.js-image`).forEach((image: HTMLImageElement) => {
  image.addEventListener(`click`, toggleFullScreean)
})
