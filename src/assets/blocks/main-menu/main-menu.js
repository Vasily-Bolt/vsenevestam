$(()=> {
    let isMenuShown = false;
    function showMenu(target){
        $(target).parent().removeClass(`main-menu--hidden`).css('z-index','100');
        $(target).html(`&#10006;`);
        // setTimeout( function(){
        //     $(document).on(`click`, function(event){
        //         if ( $(event.target).parents(`.main-menu`).length == 0 ) hideMenu(target);
        //     })
        // }, 10);
    }

    function hideMenu(target){
        $(target).parent().addClass(`main-menu--hidden`).css('z-index','0');;
        $(target).html(`&#9776;`);
    }
    $(document).on(`click`, function(event){
        if ( $(event.target).hasClass(`main-menu__burger`) ) {
            if ( !isMenuShown ) {
                    showMenu(event.target); 
                    isMenuShown = true;
                } else {
                    hideMenu(event.target);
                    isMenuShown = false;
                }
            return;
        }
        if ( isMenuShown && $(event.target).parents(`.main-menu`).length == 0 ) {
            hideMenu(`.main-menu__burger`);
            isMenuShown = false;
            return;
        }
        // if ( $(event.target).parents(`.main-menu`).length == 0 ) hideMenu(target);
    });
    // $(`.main-menu__burger`).on(`click`, function(event){
    //     const menuUl = $(this).parent();
    //     const isMenuShown = !menuUl.hasClass('main-menu--hidden');
    //     if ( !isMenuShown ) {
    //         showMenu(this); 
    //         // isMenuShown = true;
    //     } else {
    //         hideMenu(this);
    //         // isMenuShown = false;
    //     }
        // let menuUl = $(this).parent();
        // menuUl.toggleClass('main-menu--hidden');
        // if ( menuUl.hasClass('main-menu--hidden') ) $(this).html('&#9776;')
        // else $(this).html('&#10006;');

    // });

});