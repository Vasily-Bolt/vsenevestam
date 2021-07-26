$(()=> {
  const catalogPath = $(location).attr('pathname');
  $('nav').find('a').each( function(ind,elem) {
    if ( elem.href.includes(catalogPath) ) $(elem).addClass('mark-menu-item');
  });
})