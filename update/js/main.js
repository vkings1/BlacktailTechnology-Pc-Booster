const popUp = document.getElementById('popUP');
const close = document.getElementById('close');
const os = document.getElementById('os');
const symptoms = document.getElementById('symptoms');
const fix = document.getElementById('fix');

//modal pop up
// popUp.addEventListener('click', function() {
//     document.getElementById('modalPopUP').style.display="block";
//     document.getElementById('bodyblack').style.display="block";
// });

//close the modal
close.addEventListener('click', function() {
  document.getElementById('modalPopUP').style.display="none";
   document.getElementById('bodyblack').style.display="none";
    // clearTimeout(mmodalPopUPo, bodyblack);
});

//slide in show the image
symptoms.addEventListener('click', function() {
    document.getElementById('symptomsInfo').style.display="block";
});
//slide in show the image
fix.addEventListener('click', function() {
    document.getElementById('fixInfo').style.display="block";
});

// setTimeout(function(){
//     document.getElementById('modalPopUP').style.display="block";
//     document.getElementById('bodyblack').style.display="block";
// }, 2000);

