$(()=> {
  const signupBlockSelector = '#signup-ball';

  class Block {
    constructor(JQueryselector) {
      this.widthHeightIncrement = 7;
      this.selector = $(`${JQueryselector}`);
      this.parentOfSelector = $(this.selector).parent();
      this.width = this.parentOfSelector.width()+this.widthHeightIncrement;
      this.height = this.parentOfSelector.height()+this.widthHeightIncrement;
      // this.offsetBottom = this.selector.offset().top - this.width/2;
      // this.offsetLeft = this.selector.offset().left + this.width/2;
    }

    setCircle(diameter){
      this.height = diameter;
      this.width = diameter;
    }

    renderBlock(){
      this.parentOfSelector.css({
        'left' : `${$(window).width()-this.width*1.2}px`,
        'bottom' : `${this.left}px`,
        

      });
      this.selector.css({
        'visibility' : 'visible',
        'width' : `${this.width}px`,
        'height' : `${this.height}px`,
        'top' : `-${this.height/2-this.widthHeightIncrement}px`,
        'left' : `-${this.widthHeightIncrement/2}px`,
        'line-height' : `${this.height}px`,
      });
    }

    startPulsation(PulseScale){
      this.pulsation = setInterval(() => {
        this.selector.css('transform', `scale(${PulseScale})`);
        this.selector.one('transitionend', ()=>{
          this.selector.css('transform','scale(1)');
        });
        
      }, 2000);
    }

    stopPulsation(){
      clearInterval(this.pulsation);
    }

  }
  const blockSignup = new Block(signupBlockSelector);
  

  blockSignup.setCircle(blockSignup.width);
  blockSignup.renderBlock();
  blockSignup.startPulsation(1.1)
  // setTimeout(()=> blockSignup.stopPulsation(), 5000 );
  
  // .addEventListener("transitionend", showMessage, false);
  // console.log(blockSignup.offsetTop);



})