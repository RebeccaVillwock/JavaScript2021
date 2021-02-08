$(function(){
   var $modal = $("#myModalEmail");
   var $span = $(".close")[0];
   $('.info').on('click', function(e){
       e.preventDefault();
       $modal.css({"display": "block"});
       $("#modalContent").html($(this).data('info'));

       $($span).on('click', function(){
           $modal.css({"display": "none"})
       });

       $(document).on('click', function(event){
           if(event.target == $modal){
               $modal.css({"display": "none"})
           }
       });
   });
});
