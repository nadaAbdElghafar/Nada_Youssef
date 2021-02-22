$(function(){
    $('.smsForm').submit(function(event){
        var name = $('#name').val();
        var message = $('#message').val();
        validateNameField(name,event);
        validateMessageField(message,event);
    });
});

function validateNameField(name,event){
    if(!isValidName(name)){
        $('#nameFeedback').text('Please Enter at least two characters');
        event.preventDefault();
    }else{
        $('#nameFeedback').text('');
    }
}

function validateMessageField(message,event){
    if(!isValidMessage(message)){
        $('#messageFeedback').text('Please Enter a Message');
        event.preventDefault();
    }else{
        $('#messageFeedback').text('');
    }
}

function isValidName(name){
    return name.length >= 2;
}
function isValidMessage(message){
    return message.trim() !== "";
}

















