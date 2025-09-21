const $ = (sel)=>{return document.querySelector(sel)}
const $$ = (sel)=>{return [...document.querySelectorAll(sel)]}

const canvas = $('canvas')
const ctx = canvas.getContext('2d')

const backgroundCanvas = $('#background')
const bgCtx = backgroundCanvas.getContext('2d')

const damsCanvas = $('#dams')
const damsCtx = damsCanvas.getContext('2d')

const simulation = {
  damAFlow: 0,
  damBFlow: 0,
  float: 0,
  drawBackground(){
    bgCtx.clearRect(0,0,canvas.width,canvas.height)
    bgCtx.save()
    bgCtx.fillStyle = '#63B7F8' // niebo
    bgCtx.fillRect(0,0,canvas.width,canvas.height)
    bgCtx.fillStyle = '#149026'  // zielony pasek trawy (górna granica wody)
    bgCtx.fillRect(0,canvas.height/3,canvas.width,5)
    bgCtx.fillStyle = '#75380F'  // ziemia
    bgCtx.fillRect(0,canvas.height/3+5,canvas.width,canvas.height)
    bgCtx.fillStyle = '#3F1E08'  // ciemnobrązowy pas dna (dolna granica wody)
    bgCtx.fillRect(0,canvas.height/3*2.5,canvas.width,canvas.height)
    bgCtx.restore()
  },
  drawJets(){
    damsCtx.clearRect(0,0,canvas.width,canvas.height)
    this.drawJetA()
    this.drawJetB()
  },
  drawJetA(){
    const width = Math.max(Math.min(canvas.width/18,100),50)
    const leftOffset =  Math.max(Math.min(canvas.width/10,160),80)

    damsCtx.fillStyle = '#282828ff'
    damsCtx.beginPath()
    damsCtx.roundRect(leftOffset,(canvas.height/3+5)-((this.damAFlow/100)*(canvas.height*0.5-5)),width,canvas.height*0.5-5,[5])
    damsCtx.fill()
  },
  drawJetB(){
    damsCtx.save()
    const width = Math.max(Math.min(canvas.width/18,100),50)
    const leftOffset =  Math.max(Math.min(canvas.width/10,160),80)

    damsCtx.fillStyle = '#282828ff'
    damsCtx.translate(canvas.width, 0)
    damsCtx.scale(-1,1)
    damsCtx.beginPath()
    damsCtx.roundRect(leftOffset,(canvas.height/3+5)-((this.damBFlow/100)*(canvas.height*0.5-5)),width,canvas.height*0.5-5,[5])
    damsCtx.fill()
    damsCtx.restore()
  },
  drawWater(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    console.log(this.damAFlow,this.damBFlow,this.float)
  }
}

function animate(){
  simulation.drawWater()
  requestAnimationFrame(animate)
}
animate()


function resize(){
  const minWidth = 600;
  const minHeight = (minWidth*9)/16;

  canvas.width = Math.max(window.innerWidth,minWidth)
  canvas.height = Math.max(window.innerHeight,minHeight)
  backgroundCanvas.width = canvas.width;
  backgroundCanvas.height = canvas.height;
  damsCanvas.width = canvas.width;
  damsCanvas.height = canvas.height;

  simulation.drawBackground()
  simulation.drawJets()
}
resize()
window.addEventListener('resize',resize)
//document.addEventListener("fullscreenchange", resize);