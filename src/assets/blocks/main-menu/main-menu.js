$(()=> {
    $(`.main-menu__burger`).on(`click`, function(){
        let parentUl = $(this).parents('ul');
        parentUl.toggleClass('main-menu--hidden');
        if ( parentUl.hasClass('main-menu--hidden') ) $(this).html('&#9776;')
        else $(this).html('&#10006;');
    });

});