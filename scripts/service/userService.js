let userService = (() => {
    function register(name, username, password, repeatPass) {
        let userData = {name: name, username: username, password: password};

        return remoteService.post('user', '', 'basic', userData);
    }

    function login(username, password) {
        let userData = {
            username: username,
            password: password
        };

        return remoteService.post('user', 'login', 'basic', userData);
    }

    function logout() {
        let userData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return remoteService.post('user', '_logout', 'kinvey', userData);
    }

    function getAllTrainers() {
        return remoteService.get('user', '', 'kinvey');
    }

    return {
        register,
        login,
        logout,
        getAllTrainers
    }
})();