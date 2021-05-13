const later = (dealy = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, dealy)
  })
}

export { later }
