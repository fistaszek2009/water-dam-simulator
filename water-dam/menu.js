
const inputs = $$('.menuInput input[type=range]')
inputs.forEach((input)=>{inputChange(input);input.addEventListener('input',()=>inputChange(input))})

function inputChange(input){
  const value = input.value;
  const id = input.getAttribute('id')
  const outputPlace = $(`label[for=${id}]+p`)
  outputPlace.innerText = value
  simulation[id] = value
  simulation.drawJets()
}

const menuOpen = $('.menu-button')
const menuClose = $('.menu-close')
const menu = $('aside')
document.addEventListener('click',(event)=>{
  if(!event.target.closest('aside') && menu.classList.contains('open') && event.target.closest('.menu-button') != menuOpen){
    menu.classList.remove('open')
    }
    
})
menuOpen.addEventListener('click',()=>{menu.classList.add('open')})
menuClose.addEventListener('click',()=>{menu.classList.remove('open')})
