const btnCopy = document.querySelector('.btn-copy')

btnCopy.addEventListener('click', () => {
  const content = document.querySelector('.info-url').innerText
  navigator.clipboard.writeText(content).then(() => {
    alert('The shorten URL is copied to clipboard!')
  }).catch(e => console.log(e))
})