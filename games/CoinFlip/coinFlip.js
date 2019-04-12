jQuery(document).ready(function($){

  $('#flip').on('click', function(){
    var flipResult = Math.random();
    $('#penge').removeClass();
    setTimeout(function(){
      if(flipResult <= 0.5){
        $('#penge').addClass('heads');
        console.log('it is head');
      }
      else{
        $('#penge').addClass('tails');
        console.log('it is tails');
      }
    }, 100);
  });
});
