// Example starter JavaScript for disabling form submissions if there are invalid fields
$(document).ready(function(){
  //show billing tab and hide previous tab
  $("#billing a").click(function(e){
    e.preventDefault();
    $(this).tab('show');


  });
  //show payment tab and hide previous tab
  $("#payment a").click(function(e){
    e.preventDefault();
    $(this).tab('show');
    var billingTab = document.getElementById("billing-link");
    billingTab.classList.remove("active");
  });
  //show confirmation tab and hide previous tab
  $("#confirmation a").click(function(e){
    e.preventDefault();
    $(this).tab('show');
  });

})

(function () {
  'use strict'

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
  }, false)
})()
