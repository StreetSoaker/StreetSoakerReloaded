$(document).ready(function(){
    
    $('#settingsEdit').click(function(){
        alert();
        $('.editable').prop('disabled', false);
        $('.editable').css({'background' : 'rgba(40, 40, 40, 0.1)'});
        $(this).hide();
    });
    $('#settingsBack').click(function(){
        alert();
        $('.editable').prop('disabled', true);
        $('.editable').css({'background' : 'none'});
        $('#settingsEdit').show();        
    });
    
});
