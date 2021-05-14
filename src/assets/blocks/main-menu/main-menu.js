$(()=> {
    $(`.main-menu__burger`).on(`click`, function(){
        $(this).parents('ul').toggleClass('main-menu--hidden');
    });

});