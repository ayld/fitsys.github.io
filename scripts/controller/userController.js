let userController = (() => {
    function handleRegisterGet(ctx) {
        ctx.anonymous = true;
        ctx.isAuth = sessionStorage.getItem('authtoken');
        ctx.trainer = sessionStorage.getItem('trainer');

        ctx.loadPartials({
            header: './views/basic/header.hbs',
            footer: './views/basic/footer.hbs',
        }).then(function () {
            this.partial('./views/register/register.hbs');
        });
    }

    function handleRegisterPost(ctx) {
        ctx.anonymous = true;
        ctx.isAuth = sessionStorage.getItem('authtoken');

        let name = ctx.params['name-register'];
        let username = ctx.params['username-register'];
        let email = ctx.params['email-register'];
        let password = ctx.params['password-register'];
        let repeatPass = ctx.params.repeatPass;

        let emailCheck = /^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/gm;
        let passCheck = new RegExp(password);
        if ((!passCheck.test(repeatPass)) || (password !== repeatPass)) {
            notifyService.showError('Both passwords should match!');
            return;
        } else if((name === '') || (name.length < 3)) {
            notifyService.showError('Name is required and must be at least 3 characters long!');
            return;
        } else if((username === '') || (username.length < 3)) {
            notifyService.showError('Username is required and must be at least 3 characters long!');
            return;
        } else if(!emailCheck.test(email)) {
            notifyService.showError('Please use a valid email address!');
            return;
        }

        userService.register(name, username, email, password, repeatPass).then((userData) => {
            authService.saveSession(userData);
            notifyService.showInfo('User registration successful.');
            ctx.redirect('#/accounting');
        }).catch(notifyService.handleError);
    }

    function handleLoginGet(ctx) {
        ctx.anonymous = true;

        ctx.loadPartials({
            footer: './views/basic/footer.hbs',
        }).then(function () {
            this.partial('./views/login/login.hbs');
        });
    }

    function handleLoginPost(ctx) {
        ctx.username = sessionStorage.getItem('username');
        ctx.isAuth = sessionStorage.getItem('authtoken');

        let username = ctx.params['username-login'];
        let password = ctx.params['password-login'];

        userService.login(username, password).then((userData) => {
            authService.saveSession(userData);
            notifyService.showInfo('Login successful.');
            ctx.redirect('#/accounting');
        }).catch(notifyService.handleError);
    }

    function handleLogout(ctx) {
        let authtoken = sessionStorage.getItem('authtoken');

        userService.logout(authtoken).then((userData) => {
            authService.clearSession(userData);
            notifyService.showInfo('Logout successful.');
            ctx.redirect('#/login');
        }).catch(notifyService.handleError);
    }

    function resetPass(ctx) {
        if (window.confirm('CONFIRM ACTION!')) {
            let reset = prompt('Enter your email here!');
            let emailCheck = /^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/gm;
            document.getElementById('prompt').value = reset;
            let email = document.getElementById('prompt').value;
            console.log(email);
            if(!emailCheck.test(email)) {

            }
            userService.resetPass(email).then(() => {
                notifyService.showInfo('Password reset link was sent to your email.');
                setTimeout(function(){
                    history.back();
                }, 3000);
            })
        } else {
            setTimeout(function(){
                history.back();
            }, 0);
        }
    }

    return {
        handleRegisterGet,
        handleRegisterPost,
        handleLoginGet,
        handleLoginPost,
        handleLogout,
        resetPass
    };
})();
