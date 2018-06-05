function calcPrice() {
		let clientId = document.getElementById('client-card');
		clientId = clientId.options[clientId.options.selectedIndex].value;

		clientService.getClientInfoById(clientId).then((client) => {
				let discount = client.discount;
				let quantity = document.getElementById('qty');
				quantity = quantity.options[quantity.options.selectedIndex].value;
				let zone = document.getElementById('zone');
				zone = zone.options[zone.options.selectedIndex].value;
				let payment = document.getElementById('payment');
				payment = payment.options[payment.options.selectedIndex].value;
				let price = 185 * quantity * zone * payment * discount;
				price = Math.round(price);
				document.getElementById('price').value = price;
		});
}
