
//vider le formulaire de recherche qd on loade/reloade la page
setTimeout(
  function() { $('#search').val(''); },
  500  //1,000 milliseconds = 1 second
);
 
function bindPrecedent () {

  $('#blocprecedent').on('click', function(e){
    var parameters = { search: $("#blocprecedent").html() };
      $.get( '/searchabloc',parameters, function(data) {
      $('#results').html(data);
      bindPrecedent();
      
    });
  
 });


}

//envoyer le contenu du input id "search" quand on appuye sur entree
 $(function(){
$('#search').on('keyup', function(e){
 if(e.keyCode === 13) {
   var parameters = { search: $(this).val() };
     $.get( '/searchabloc',parameters, function(data) {
     $('#results').html(data);
     $('#search').val("");
     bindPrecedent();


   });
  };
});
});

