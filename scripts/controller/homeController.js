let homeController = (() => {
    function displayHome(ctx) {
        if (authService.isAuth()) {
            ctx.username = sessionStorage.getItem('username');
            ctx.isAuth = sessionStorage.getItem('authtoken');

            ctx.loadPartials({
                header: './views/basic/header.hbs',
                footer: './views/basic/footer.hbs'
            }).then(function () {
                this.partial('./views/home/home.hbs')
            })
        } else {
            ctx.anonymous = true;

            ctx.loadPartials({
                footer: './views/basic/footer.hbs'
            }).then(function () {
                this.partial('./views/login/login.hbs')
            })
        }
    }

    return {
        displayHome
    }
})();