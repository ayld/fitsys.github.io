let clientService = (() => {
    function getClients() {
        const endpoint = 'clients?query={}&sort={"name": 1}';

        return remoteService.get('appdata', endpoint, 'kinvey');
    }

    function addClient(name, sex, height, wrist, ankle, birth, phone, email, description, discount, pt, active) {
        let client = {
            name: name,
            info: {
                sex: sex,
                height: height,
                wrist: wrist,
                ankle: ankle
            },
            birth: birth,
            phone: phone,
            email: email,
            description: description,
            discount: discount,
            pt: pt,
            active: active
        };

        const endpoint = 'clients';

        return remoteService.post('appdata', endpoint, 'kinvey', client)
    }

    function getTrainerClients(userId) {
        const endpoint = `clients?query={"_acl.creator":"${userId}","active": "true"}`;

        return remoteService.get('appdata', endpoint, 'kinvey');
    }

    function getClientInfoById(clientId) {
        const endpoint = `clients/${clientId}`;

        return remoteService.get('appdata', endpoint, 'kinvey');
    }

    function addClientCard(clientId, client_name, qty, zone, price, payment, start, end, duration, active) {
        let card = {
            clientId: clientId,
            client_name: client_name,
            qty: qty,
            zone: zone,
            price: price,
            payment: payment,
            start: start,
            end: end,
            duration: duration,
            active: active
        };

        const endpoint = 'cards';

        return remoteService.post('appdata', endpoint, 'kinvey', card);
    }
    
    function getClientCard(userId) {
        const endpoint = `cards?query={"_acl.creator":"${userId}","active": "true"}&sort={"client_name": 1}`;

        return remoteService.get('appdata', endpoint, 'kinvey');
    }

    function getCardById(cardId) {
        const endpoint = `cards/${cardId}`;

        return remoteService.get('appdata', endpoint, 'kinvey');
    }

    function updateCard(cardId, clientId, client_name, qty, zone, price, payment, start, end, duration, active) {
        const endpoint = `cards/${cardId}`;

        let card = {
            clientId: clientId,
            client_name: client_name,
            qty: qty,
            zone: zone,
            price: price,
            payment: payment,
            start: start,
            end: end,
            duration: duration,
            active: active
        };

        return remoteService.update('appdata', endpoint, 'kinvey', card);
    }
    
    function updateClient(clientId, name, sex, height, wrist, ankle, birth, phone, email, discount, description, active) {
        const endpoint = `clients/${clientId}`;

        let client = {
            name: name,
            info: {
                sex: sex,
                height: height,
                wrist: wrist,
                ankle: ankle
            },
            birth: birth,
            phone: phone,
            email: email,
            discount: discount,
            description: description,
            active: active
        };

        return remoteService.update('appdata', endpoint, 'kinvey', client)
    }

    function getAllCards(userId) {
        const endpoint = 'cards';

        return remoteService.get('appdata', endpoint, 'kinvey');
    }

    function deleteCardById(cardId) {
        const endpoint = `cards/${cardId}`;

        return remoteService.remove('appdata', endpoint, 'kinvey');
    }

    return {
        getClients,
        addClient,
        getTrainerClients,
        getClientInfoById,
        addClientCard,
        getClientCard,
        getCardById,
        updateCard,
        getAllCards,
        deleteCardById,
        updateClient
    }
})();
