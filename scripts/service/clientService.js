let clientService = (() => {
		function getClients() {
				const endpoint = 'clients?query={}&sort={"name": 1}';

				return remoteService.get('appdata', endpoint, 'kinvey');
		}

		function addClient(client) {
				const endpoint = 'clients';

				return remoteService.post('appdata', endpoint, 'kinvey', client);
		}

		function getTrainerClients(userId) {
				const endpoint = `clients?query={"_acl.creator":"${userId}","active": "true"}&sort={"name": 1}`;

				return remoteService.get('appdata', endpoint, 'kinvey');
		}

		function getAllTrainerClients(userID) {
				const endpoint = `clients?query={"_acl.creator":"${userID}"}&sort={"name": 1}`;

				return remoteService.get('appdata', endpoint, 'kinvey');
		}

		function getClientInfoById(clientId) {
				const endpoint = `clients/${clientId}`;

				return remoteService.get('appdata', endpoint, 'kinvey');
		}

		function addClientCard(clientId, card) {
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

		function updateCard(cardId, card) {
				const endpoint = `cards/${cardId}`;

				return remoteService.update('appdata', endpoint, 'kinvey', card);
		}

		function updateClient(clientId, client) {
				const endpoint = `clients/${clientId}`;

				return remoteService.update('appdata', endpoint, 'kinvey', client);
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
				getAllTrainerClients,
				getClientInfoById,
				addClientCard,
				getClientCard,
				getCardById,
				updateCard,
				getAllCards,
				deleteCardById,
				updateClient,
		};
})();