const draggable = {
    inserted: function (el) {
      el.style.cursor = 'move'
      el.onmousedown = function (e) {
        let disx = e.pageX - el.offsetLeft
        let disy = e.pageY - el.offsetTop
        document.onmousemove = function (e) {
          let x = e.pageX - disx //document.body.clientWidth //
          let y = e.pageY - disy //document.body.clientHeight //
          let maxX =window.screen.width - parseInt(window.getComputedStyle(el).width)
          let maxY =window.screen.height - parseInt(window.getComputedStyle(el).height)
          if (x < 0) {
            x = 0
          } else if (x >= maxX) {
            x = maxX
          }
  
          if (y < 0) {
            y = 0
          } else if (y >= maxY) {
            y = maxY
          }
  
          el.style.left = x + 'px'
          el.style.top = y + 'px'
          
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null
        }
        
      }
    },
  }
  export default draggable
  