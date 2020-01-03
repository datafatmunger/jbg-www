(() => {

const fonts = ['incon', 'term', 'troja']
const colors = ['#fff']
const ac = new AudioContext()

function wrapWords(str, tmpl) {
  return str.replace(/\w+/g, tmpl || "<span>$&</span>")
}

function wrapChars(str, tmpl) {
  return str.replace(/\w/g, tmpl || "<span>$&</span>");
}

function initNote() {
  o1 = ac.createOscillator()
  o1.type = 'sine'
  o1.frequency.value = Math.random() * 400 + 200; 
  g = ac.createGain()
  o1.connect(g).connect(ac.destination)
  g.gain.setValueAtTime(0, ac.currentTime)
  o1.start()
}

function note() {
  o1.frequency.value = Math.random() * 400 + 200; 
  g.gain.setValueAtTime(0, ac.currentTime)
  g.gain.linearRampToValueAtTime(0.5, ac.currentTime + 0.1)
  g.gain.linearRampToValueAtTime(0, ac.currentTime + 0.2)
}

function textNodesUnder(el) {
  let n, a = []
  const walk = document.createTreeWalker(
    el,
    NodeFilter.SHOW_TEXT,
    null,
    false) 
  while(n = walk.nextNode()) a.push(n)
  return a
}

function randomFont() {
  return fonts[Math.floor(Math.random() * fonts.length)]
}

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

function findAncestor(el, sel) {
  while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,sel)));
    return el
}

function showImage(n) {
  document.querySelectorAll('img').forEach(i => i.style.display = 'none')
  const section = findAncestor(n, 'section')
  if(section) {
    const images = section.querySelectorAll('img')
    if(images.length > 0) {
      const i = Math.floor(Math.random() * images.length)
      images[i].style.display = 'block'
      images[i].style.width = (Math.floor(Math.random() * 1024)) + 'px'
      images[i].style.top = -(images[i].clientHeight) + 'px'

    }
  }
}

function wrapSpans() {
  textNodesUnder(document.querySelector('body')).forEach(t => {
    const span = document.createElement('span')
    span.innerHTML = wrapChars(t.nodeValue) 
    t.replaceWith(span)
  })
}

function initEvents() {
  document.querySelectorAll('span').forEach(n => {

    // Browser - JBG
    n.addEventListener('mouseover', e => {
      e.target.className = randomFont()
      note()
      showImage(e.target)
    }) 

    // Mobile - JBG
    n.addEventListener('touchmove', e => {
      e.target.className = randomFont()
      note()
      showImage(e.target)
    }) 

    n.className = randomFont()
    n.style.color = randomColor()
  })
}

function init() {
  wrapSpans()
  initEvents()
  initNote()
}

init()

})()

