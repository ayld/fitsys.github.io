let userService = (() => {
    function register(name, username, password, repeatPass) {
        let userData = {name: name, username: username, password: password};

        return remoteService.post('user', '', 'basic', userData);
    }

    function login(username, password) {
        let userData = {
            username: username,
            password: password,
        };

        return remoteService.post('user', 'login', 'basic', userData);
    }

    function logout() {
        let userData = {
            authtoken: sessionStorage.getItem('authtoken'),
        };

        return remoteService.post('user', '_logout', 'kinvey', userData);
    }

    function getAllTrainers() {
        return remoteService.get('user', '', 'kinvey');
    }
    
    function resetPass() {
        const req = {
            method: 'POST',
            url: 'https://baas.kinvey.com' + '/rpc' + '/' + 'kid_HJIhnSky7' + '/' + 'bearhold@gmail.com/user-password-reset-initiate',
            headers: {
                Authorization: 'Basic ' + btoa('kid_HJIhnSky7' + ':' + '6083dad903f147caace16693ea73f2b3'),
            },
        };

        return $.ajax(req);
    }
    
    function getRole(id) {
        const req = {
            method: 'GET',
            url: `https://baas.kinvey.com/roles/kid_HJIhnSky7/${id}`,
            headers: {
                Authorization: 'Basic ' + btoa('kid_HJIhnSky7' + ':' + 'fd0656d78b7e4f20bb0b13d9b7b96255'),
            },
        };

        return $.ajax(req);
    }

    return {
        register,
        login,
        logout,
        getAllTrainers,
        resetPass,
        getRole
    };
})();
