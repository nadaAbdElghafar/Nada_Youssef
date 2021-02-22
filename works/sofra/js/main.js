$('#btnDelete1').click(function(){
    $('#food-type1').css("display", "none");
});
$('#btnDelete2').click(function(){
    $('#food-type2').css("display", "none");
});
$('#btnDelete3').click(function(){
    $('#food-type3').css("display", "none");
});
$('#btnDelete4').click(function(){
    $('#food-type4').css("display", "none");
});
$('#btnDelete5').click(function(){
    $('#food-type5').css("display", "none");
});
$('#btnDelete6').click(function(){
    $('#food-type6').css("display", "none");
});




$('#deleteOrder1').click(function(){
    $('#order1').css("display", "none");
});
$('#deleteOrder2').click(function(){
    $('#order2').css("display", "none");
});




var owl = $('#owl-services');
owl.owlCarousel({
    margin: 10,
    loop: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        300: {
            items: 2,
            nav: true
        },
        600: {
            items: 3,
            nav: true
        },
        1000: {
            items: 4,
            nav: true,
            loop: false,
            margin: 20
        }
    }
});
