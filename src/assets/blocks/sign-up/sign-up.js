$(()=> {
  const signupBlockSelector = '#signup-ball';

  class Block {
    constructor(JQueryselector) {
      this.widthHeightIncrement = 7;
      this.selector = $(`${JQueryselector}`);
      this.parentOfSelector = $(this.selector).parent();
      this.width = this.parentOfSelector.width()+this.widthHeightIncrement;
      this.height = this.parentOfSelector.height()+this.widthHeightIncrement;
      this.modalSelector = 'signup';
      this.modalHTML = `
      <div id='${this.modalSelector}'>
        <div class='signup__modal-container'>
        </div>
        <div class='signup__modal-form-wrapper'>
          <form class='signup__modal-form' method='post' action='https://www.vse-nevestam.ru/mail.php'>
            <p>
              Для записи на примерку оставь свои контактные данные, пожалуйста.
            </p>
            <p class='signup__modal-form-line'>Как можно обращаться<input type='text' name='name'></p>
            <p class='signup__modal-form-line'>Оставьте контактный телефон<input type='tel' name='phone'></p>
            <p class='signup__modal-form-line'>Подтвердите отправку данных<input type='submit' value='Записаться'></p>
            <p class='signup__modal-form-line'>Передумали писать? Звоните!<input type='button' id='signup__modal-form-close' value='Закрыть форму'></p>
          </form>
        </div>
      </div>
      `;
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

    startClickListner() {
      this.selector.parent().on('click', () => {
        this.openModal();
      })
    }

    openModal(){
      this.selector.parent().css({
        'display' : 'none',
      });
      $('body').append(this.modalHTML);

      $('.signup__modal-form').one('submit', function() {
        event.preventDefault();
        const formData = new FormData(this);
        fetch('https://www.vse-nevestam.ru/mail.php', {
          mode : 'no-cors',
          method : 'POST',
          body: formData,
        })
          .then((response) => {
            console.log(response);
            $('#signup__modal-form-close').click();
          });

      });

      $('#signup__modal-form-close').one('click', () => {
        this.closeModal();
      });
    }

    closeModal(){
      this.selector.parent().css({
        'display' : 'block',
      });
      $(`#${this.modalSelector}`).remove();
    }

  }
  const blockSignup = new Block(signupBlockSelector);

  blockSignup.setCircle(blockSignup.width);
  blockSignup.renderBlock();
  blockSignup.startPulsation(1.1);
  blockSignup.startClickListner();
  // setTimeout(()=> blockSignup.stopPulsation(), 5000 );
  
  // .addEventListener("transitionend", showMessage, false);
  // console.log(blockSignup.offsetTop);



})