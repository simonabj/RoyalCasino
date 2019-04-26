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

var greenEl=document.querySelector("#gronn");
greenEl.addEventListener("click",selected("green"));

var yellowEl=document.querySelector("#gul");
yellowEl.addEventListener("click",selected("yellow"));

function selected(color) {
  if(color==="green"){
    yellowEl.style.borderWidth = "0px";
    greenEl.style.borderWidth = "5px";
  } else {
    greenEl.style.borderWidth = "0px";
    yellowEl.style.borderWidth = "5px";

  }
}
