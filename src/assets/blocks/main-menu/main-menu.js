$(()=> {
    $(`.main-menu__burger`).on(`click`, function(){
        let menuUl = $(this).parent();
        menuUl.toggleClass('main-menu--hidden');
        if ( menuUl.hasClass('main-menu--hidden') ) $(this).html('&#9776;')
        else $(this).html('&#10006;');
    });

});