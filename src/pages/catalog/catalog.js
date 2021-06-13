$(()=> {
  
  $.getJSON('./catalog/dresses-list.json', function(data) {
    const dressesData = data;
    console.log(dressesData);
  });
  
})