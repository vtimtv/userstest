window.addEventListener('load', function () {
    const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    document.getElementById('newuserbtn').addEventListener('click', function () {
        let fields = ['fname', 'lname', 'email', 'password', 'confirm_password'];
        for(var k in fields){
            document.getElementById(fields[k]).value = '';
        }
        handleFormErrors($('#staticBackdrop').find('form'), null);
        myModal.show();
    });

    document.getElementById('closebtn').addEventListener('click', function () {
        myModal.hide();
    });
    document.getElementById('createuserbtn').addEventListener('click', function () {
        try {
            let fields = ['fname', 'lname', 'email', 'password', 'confirm_password'];
            var user = new URLSearchParams();
            for (var k in fields) {
                user.append(fields[k], document.getElementById(fields[k]).value);
            }
            handleFormErrors($('#staticBackdrop').find('form'), null);
            console.log(user);
            axios.post('./create', user).then(function (res) {
                    console.log(res);
                    handleFormErrors($('#staticBackdrop').find('form'), res.data);
                    if(!res.data.errors) {
                        myModal.hide();
                        fillusers(res);
                    }
                }
            ).catch((error) => {
                    console.log(error);
                    if (error.response) {
                        handleFormErrors($('#staticBackdrop').find('form'), error.response.data);
                    }
                }
            );
        } catch (ex) {}
    });
    axios.get('./list').then(function(res){
            console.log(res);
            fillusers(res);
        }
    );
    function fillusers(res){
        var tbl = $('#userstable');
        tbl.empty();
        if(res && res.data){
            for(var k in res.data){
                var user = res.data[k];
                var tr = $('<tr></tr>').appendTo(tbl);
                $('<td></td>').text(user.fname).appendTo(tr);
                $('<td></td>').text(user.lname).appendTo(tr);
                $('<td></td>').text(user.email).appendTo(tr);
            }
        }
    }
});

function handleFormErrors(form, res){
    form.find('.alert').remove();
    form.find('.form-control.is-invalid').removeClass('is-invalid');
    if(res && res.errors){
        var alertW = $('<div class="alert alert-danger">').prependTo(form);
        var lst = $('<ul>').appendTo(alertW);
        for (var errs in res.errors){
            $('[name="' + errs + '"]').addClass('is-invalid');
            $('<li>').text(res.errors[errs]).appendTo(lst);
        }
    }
}
