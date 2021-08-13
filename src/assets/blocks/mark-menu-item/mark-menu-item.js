$(()=> {
  const catalogPath = $(location).attr('pathname').substring(1);
  if (catalogPath != '') {
    $('nav').find('a').each( function(ind,elem) {
      if ( elem.href.includes(catalogPath) ) $(elem).addClass('mark-menu-item');
    });
  }
  
})