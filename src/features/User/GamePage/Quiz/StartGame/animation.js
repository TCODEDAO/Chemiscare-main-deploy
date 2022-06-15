export default function ripplesAnimateBtn(btn, e) {
    let x = e.clientX - e.target.offsetLeft
    let y = e.clientY - e.target.offsetTop
    let ripples = document.createElement('span')
    ripples.className = 'ripples'
    ripples.style.left = x + 'px'
    ripples.style.top = y + 'px'
    btn.appendChild(ripples)
    setTimeout(() => {
        ripples.remove()
        ripples.classList.remove('ripples')
    }, 1000)
}
