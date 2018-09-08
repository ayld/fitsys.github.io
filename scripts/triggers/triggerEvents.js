function calcPrice() {
    let clientId = document.getElementById('client-card');
    clientId = clientId.options[clientId.options.selectedIndex].value;

    clientService.getClientInfoById(clientId).then((client) => {
        let discount = client.discount;
        let quantity = globalInfo.getSelectedVal(document.getElementById('qty'));
        let zone = globalInfo.getSelectedVal(document.getElementById('zone'));
        let payment = globalInfo.getSelectedVal(document.getElementById('payment'));
        let price = 205 * quantity * zone * payment * discount;
        price = Math.round(price);
        document.getElementById('price').value = price;
    });
}
