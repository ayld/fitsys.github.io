let homeController = (() => {
    function displayHome(ctx) {
        if (authService.isAuth()) {
            ctx.username = sessionStorage.getItem('username');
            ctx.isAuth = sessionStorage.getItem('authtoken');

            ctx.loadPartials({
                footer: './views/basic/footer.hbs',
            }).then(function () {
                this.partial('./views/basic/header.hbs');
            });
        } else {
            ctx.anonymous = true;

            ctx.loadPartials({
                footer: './views/basic/footer.hbs',
            }).then(function () {
                this.partial('./views/login/login.hbs');
            });
        }
    }

    return {
        displayHome,
    };
})();
