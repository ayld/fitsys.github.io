let userController = (() => {
		function handleRegisterGet(ctx) {
				ctx.anonymous = true;
				ctx.isAuth = sessionStorage.getItem('authtoken');

				ctx.loadPartials({
						header: './views/basic/header.hbs',
						footer: './views/basic/footer.hbs',
				}).then(function() {
						this.partial('./views/register/register.hbs');
				});
		}

		function handleRegisterPost(ctx) {
				ctx.anonymous = true;
				ctx.isAuth = sessionStorage.getItem('authtoken');

				let name = ctx.params['name-register'].toLowerCase();
				let username = ctx.params['username-register'];
				let password = ctx.params['password-register'];
				let repeatPass = ctx.params.repeatPass;

				let regExp = new RegExp(password);
				if (!regExp.test(repeatPass)) {
						notifyService.showError('Both passwords should match!');
						return;
				}

				userService.register(name, username, password, repeatPass).then((userData) => {
						authService.saveSession(userData);
						notifyService.showInfo('User registration successful.');
						ctx.redirect('#/login');
				}).catch(notifyService.handleError);
		}

		function handleLoginGet(ctx) {
				ctx.anonymous = true;

				ctx.loadPartials({
						footer: './views/basic/footer.hbs',
				}).then(function() {
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

		return {
				handleRegisterGet,
				handleRegisterPost,
				handleLoginGet,
				handleLoginPost,
				handleLogout,
		};
})();