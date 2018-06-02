let clientController = (() => {
    let source = [];

    function registerClientGet(ctx) {
        if (!authService.isAuth()) {
            ctx.redirect('#/home');
            return;
        }

        ctx.isAuth = sessionStorage.getItem('authtoken');

        userService.getAllTrainers().then((trainers) => {
            for (let index in trainers) {
                if (trainers.hasOwnProperty(index)) {
                    ctx._id = trainers[index]._id;
                    ctx.name = trainers[index].name;

                    let currentlyLogged = sessionStorage.getItem('userId');

                    if (currentlyLogged === trainers[index]._id) {
                        let pos = trainers.indexOf(trainers[index]);
                        let current = trainers.splice(pos, 1)[0];
                        trainers.unshift(current);
                    }

                    ctx.trainer = sessionStorage.getItem('trainer');
                    ctx.trainers = trainers;
                }
            }

            ctx.loadPartials({
                header: './views/basic/header.hbs',
                name: './views/lbmcalc/client/name.hbs',
                sexRegister: './views/lbmcalc/client/sexRegister.hbs',
                heightRegister: './views/lbmcalc/client/heightRegister.hbs',
                wristRegister: './views/lbmcalc/client/wristregister.hbs',
                ankleRegister: './views/lbmcalc/client/ankleRegister.hbs',
                birthDate: './views/lbmcalc/client/birthDate.hbs',
                phone: './views/lbmcalc/client/phone.hbs',
                email: './views/lbmcalc/client/email.hbs',
                trainer: './views/lbmcalc/client/trainer.hbs',
                discount: './views/lbmcalc/client/discount.hbs',
                footer: './views/basic/footer.hbs'
            }).then(function () {
                this.partial('./views/lbmcalc/client/addClientForm.hbs')
            })
        })
    }

    function registerClientPost(ctx) {
        if (!authService.isAuth()) {
            ctx.redirect('#/home');
            return;
        }

        ctx.isAuth = sessionStorage.getItem('authtoken');
        ctx.trainer = sessionStorage.getItem('trainer');

        let name = InfoHelper.prototype.getRegisterName().toLowerCase();
        let sex = InfoHelper.prototype.getRegisterSex();
        let height = InfoHelper.prototype.getRegisterHeight();
        let wrist = InfoHelper.prototype.getRegisterWrist();
        let ankle = InfoHelper.prototype.getRegisterAnkle();
        let birth = InfoHelper.prototype.getRegisterBirthDate();
        let phone = InfoHelper.prototype.getRegisterPhone();
        let email = InfoHelper.prototype.getRegisterEmail();
        let description = InfoHelper.prototype.getRegisterDescription();
        let discount = InfoHelper.prototype.getDiscount();
        let pt = document.getElementById('trainers');
        pt = pt.options[pt.options.selectedIndex].value
        let active;

        let isActive = document.getElementById('active').checked;
        if (isActive) {
            active = true
        } else {
            active = false;
        }

        if (window.confirm('CONFIRM ACTION!')) {
            clientService.addClient(name, sex, height, wrist, ankle, birth, phone, email, description, discount, pt, active).then(() => {
                notifyService.showInfo('Client added successfully.');
                ctx.redirect('#/card');
            })
        }
    }

    function listAllClients(ctx) {
        if (!authService.isAuth()) {
            ctx.redirect('#/home');
            return;
        }

        ctx.isAuth = sessionStorage.getItem('authtoken');

        clientService.getClients().then((clients) => {
            ctx.trainer = sessionStorage.getItem('trainer');
            ctx.clients = clients;

            for (let index in clients) {
                if (clients.hasOwnProperty(index)) {
                    ctx._id = clients[index]._id;
                    ctx.name = clients[index].name;

                    ctx.loadPartials({
                        header: './views/basic/header.hbs',
                        sex: './views/lbmcalc/anthropometry/sex.hbs',
                        height: './views/lbmcalc/anthropometry/height.hbs',
                        wrist: './views/lbmcalc/anthropometry/wrist.hbs',
                        ankle: './views/lbmcalc/anthropometry/ankle.hbs',
                        client: './views/lbmcalc/client/client.hbs',
                        footer: './views/basic/footer.hbs'
                    }).then(function () {
                        this.partial('./views/lbmcalc/input/main.hbs')
                    })
                    //source.push({
                    //    id: clients[index]._id,
                    //    name: clients[index].name
                    //});
                    //let option = $('<option>');
                    //$(option).val(clients[index]._id);
                    //$(option).html(clients[index].name);
                    //$(selector).append(option);
                }
            }
        }).catch(notifyService.handleError);
    }

    function filterClient(ctx) {
        if (!authService.isAuth()) {
            ctx.redirect('#/home');
            return;
        }

        ctx.isAuth = sessionStorage.getItem('authtoken');

        clientService.getClients().then((clients) => {
            let select = $('select#client.form-control');
            let searchedName = InfoHelper.prototype.getInputName().toLowerCase();

            for (let index in clients) {
                if (clients.hasOwnProperty(index)) {
                    if (searchedName) {
                        if (clients[index].name.toLowerCase().indexOf(searchedName) > -1) {
                            $(select).children().filter(function () {
                                return $.trim(this.text) === clients[index].name
                            }).prop('selected', true)
                        }
                    } else {
                        $(select).children().eq(0).prop('selected', true);
                        //$('#sex-select').children().eq(0).prop('selected', true);
                        //$('#height-select').children().eq(0).prop('selected', true);
                        //$('#wrist-select').children().eq(0).prop('selected', true);
                        //$('#ankle-select').children().eq(0).prop('selected', true);
                        //$('#result > table > tbody > tr > td:nth-child(1)').empty()
                    }
                }
            }
        }).catch(notifyService.handleError);
    }

    function populateFields(ctx) {
        if (!authService.isAuth()) {
            ctx.redirect('#/home');
            return;
        }

        ctx.isAuth = sessionStorage.getItem('authtoken');

        let user = {};

        clientService.getClients().then((clients) => {
            let searchedName = InfoHelper.prototype.getInputName();
            let sex = $('#sex-select').find('option');
            let selectedName = InfoHelper.prototype.getSelectedName();

            for (let index in clients) {
                if (clients.hasOwnProperty(index)) {
                    if (searchedName || selectedName) {
                        if (clients[index].name.indexOf(selectedName) > -1) {

                            $(sex).each((i, entry) => {
                                if ($(entry).val() === clients[index].info.sex) {
                                    $('#sex-select').children().eq(i).prop('selected', true);
                                    $('#height-select').val(clients[index].info.height)
                                        .on('change', viewController.displayCard());
                                    $('#wrist-select').val(clients[index].info.wrist);
                                    $('#ankle-select').val(clients[index].info.ankle);

                                    lbmHelper.displayLBM(
                                        user,
                                        clients[index]._id,
                                        clients[index].name,
                                        clients[index].info.sex,
                                        clients[index].info.height,
                                        clients[index].info.wrist,
                                        clients[index].info.ankle,
                                        ProtoHelper.prototype.heightLBM(),
                                        ProtoHelper.prototype.wristLBM(),
                                        ProtoHelper.prototype.ankleLBM(),
                                        InfoHelper.prototype.getFat(),
                                        ProtoHelper.prototype.bodyWrist(),
                                        ProtoHelper.prototype.bodyAnkle(),
                                        ProtoHelper.prototype.bodyHeight(),
                                        notifyService.formatDate(clients[index]._kmd.ect),
                                        notifyService.formatDate(clients[index]._kmd.lmt))
                                }
                            })
                        }
                    }
                }
            }
        }).catch(notifyService.handleError);
    }

    function updateCardGet(ctx) {
        if (!authService.isAuth()) {
            ctx.redirect('#/home');
            return;
        }

        ctx.isAuth = sessionStorage.getItem('authtoken');
        ctx.trainer = sessionStorage.getItem('trainer');

        let cardId = ctx.params.cardId;
        clientService.getCardById(cardId).then((card) => {
            let clientId = card.clientId;
            clientService.getClientInfoById(clientId).then((client) => {
                ctx.client_name = card.client_name;
                ctx.price = card.price;
                ctx.start = card.start;
                ctx.end = card.end;

                let cardId = sessionStorage.setItem('cardId', ctx.params.cardId);
                let clientId = sessionStorage.setItem('clientId', card.clientId);

                ctx.loadPartials({
                    header: './views/basic/header.hbs',
                    footer: './views/basic/footer.hbs'
                }).then(function () {
                    this.partial('./views/lbmcalc/edit/editCard.hbs');
                })
            })
        })
    }

    function updateCardPost(ctx) {
        if (!authService.isAuth()) {
            ctx.redirect('#/home');
            return;
        }

        ctx.isAuth = sessionStorage.getItem('authtoken');
        ctx.trainer = sessionStorage.getItem('trainer');

        let cardId = sessionStorage.getItem('cardId');

        clientService.getCardById(cardId).then((card) => {
            let clientId = card.clientId;
            clientService.getClientInfoById(clientId).then((client) => {
                let client_name = document.getElementById('name-edit').value.toLowerCase();
                let qty = document.getElementById('qty-edit');
                qty = qty.options[qty.options.selectedIndex].innerText;
                let zone = document.getElementById('zone-edit');
                zone = zone.options[zone.options.selectedIndex].innerText
                let payment = document.getElementById('payment-edit').value;
                let price = document.getElementById('price-edit').value;
                let start = document.getElementById('start-date-edit').value;
                let end = document.getElementById('end-date-edit').value;
                let duration = document.getElementById('duration-edit');
                duration = duration.options[duration.options.selectedIndex].innerText;
                let active = true;

                if (window.confirm('CONFIRM ACTION!')) {
                    clientService.updateCard(cardId, clientId, client_name, qty, zone, price, payment, start, end, duration, active).then(() => {
                        notifyService.showInfo('Card edited successfully.');
                        ctx.redirect('#/accounting');
                    })
                }
            })
        })
    }

    function getClientsCards(ctx) {
        if (!authService.isAuth()) {
            ctx.redirect('#/home');
            return;
        }

        ctx.isAuth = sessionStorage.getItem('authtoken');
        let userId = sessionStorage.getItem('userId');

        clientService.getClientCard(userId).then((cards) => {
            ctx.trainer = sessionStorage.getItem('trainer');
            let total = 0;
            let paid = 0;
            let temp = 0;
            if (cards.length === 0) {
                ctx.redirect('#/card')
            } else {
                ctx.isEmpty = false;
                for (let index in cards) {
                    if (cards.hasOwnProperty(index)) {
                        let end = Date.parse(cards[index].end);
                        let today = Date.parse(InfoHelper.prototype.getToday());

                        if (end < today) {
                            let cardId = cards[index]._id;
                            let clientId = cards[index].clientId;
                            let client_name = cards[index].client_name;
                            let qty = cards[index].qty;
                            let zone = cards[index].zone;
                            let price = cards[index].price;
                            let payment = cards[index].payment;
                            let start = cards[index].start;
                            let end = cards[index].end;
                            let duration = cards[index].duration;
                            let active = cards[index].active;
                            active = false;
                            clientService.updateCard(cardId, clientId, client_name, qty, zone, price, payment, start, end, duration, active).then(() => {
                                ctx.cards = cards
                            })
                        }
                        ctx.cards = cards;
                        ctx.qty = cards[index].qty;
                        ctx.count = cards.length;
                        total += Number(cards[index].price) - 60;
                        ctx.total = total;
                        if (cards[index].payment === 'no') {
                            temp = 0;
                        } else if (cards[index].payment === '1/2') {
                            temp = 0.5
                        } else {
                            temp = cards[index].payment
                        }
                        paid += (Number(cards[index].price) - 60) * temp;
                        ctx.paid = paid;
                        ctx.loadPartials({
                            header: './views/basic/header.hbs',
                            today: './views/lbmcalc/client/today.hbs',
                            clientReg: './views/accounting/clientReg.hbs',
                            footer: './views/basic/footer.hbs'
                        }).then(function () {
                            this.partial('./views/accounting/main.hbs')
                        })
                    }
                }
            }
        })
    }

    function addClientCardGet(ctx) {
        if (!authService.isAuth()) {
            ctx.redirect('#/home');
            return;
        }

        ctx.isAuth = sessionStorage.getItem('authtoken');
        let userId = sessionStorage.getItem('userId');

        clientService.getTrainerClients(userId).then((clients) => {
            ctx.trainer = sessionStorage.getItem('trainer');
            ctx.clients = clients;

            ctx.loadPartials({
                header: './views/basic/header.hbs',
                client: './views/lbmcalc/client/client.hbs',
                qty: './views/lbmcalc/client/qty.hbs',
                zone: './views/lbmcalc/client/zone.hbs',
                price: './views/lbmcalc/client/price.hbs',
                payment: './views/lbmcalc/client/payment.hbs',
                start: './views/lbmcalc/client/start.hbs',
                end: './views/lbmcalc/client/end.hbs',
                duration: './views/lbmcalc/client/duration.hbs',
                footer: './views/basic/footer.hbs'
            }).then(function () {
                this.partial('./views/accounting/card.hbs')
            })
        })
    }

    function addClientCardPost(ctx) {
        if (!authService.isAuth()) {
            ctx.redirect('#/home');
            return;
        }

        ctx.isAuth = sessionStorage.getItem('authtoken');
        ctx.trainer = sessionStorage.getItem('trainer');

        let clientId = InfoHelper.prototype.getSelectedClientId();

        clientService.getClientInfoById(clientId).then((client) => {
            let client_name = InfoHelper.prototype.getSelectedClientName();
            let qty = document.getElementById('qty');
            qty = qty.options[qty.options.selectedIndex].innerText;
            let zone = InfoHelper.prototype.getZoneText();
            let price = InfoHelper.prototype.getPrice();
            let payment = InfoHelper.prototype.getPaymentText();
            let start = InfoHelper.prototype.getStartDate();
            let end;
            let duration = InfoHelper.prototype.getDuration();
            let today = Date.parse(InfoHelper.prototype.getToday());
            let active = true;

            if (duration === 'unlimited') {
                end = null
            } else {
                end = InfoHelper.prototype.getEndDate();
            }
            let expired = Date.parse(end);
            if (expired < today) {
                alert('Add valid period.');
                return;
            } else {
                active = true;
            }

            if (window.confirm('CONFIRM ACTION!')) {
                clientService.addClientCard(clientId, client_name, qty, zone, price, payment, start, end, duration, active).then(() => {
                    notifyService.showInfo('Card added successfully.');
                    ctx.redirect('#/accounting');
                })
            }
        })
    }

    function deleteCard(ctx) {
        let cardId = ctx.params.cardId;
        if (window.confirm('CONFIRM ACTION!')) {
            clientService.deleteCardById(cardId).then(() => {
                notifyService.showInfo('Card deleted.');
                ctx.redirect('#/accounting');
            }).catch(notifyService.showError)
        }
    }

    function updateClientGet(ctx) {
        if (!authService.isAuth()) {
            ctx.redirect('#/home');
            return;
        }

        ctx.isAuth = sessionStorage.getItem('authtoken');
        ctx.trainer = sessionStorage.getItem('trainer');

        let clientId = ctx.params.clientId;
        clientService.getClientInfoById(clientId).then((client) => {
            let clientId = sessionStorage.setItem('clientId', ctx.params.clientId);
            ctx.client_name = client.name;
            ctx.sex = client.info.sex;
            ctx.height = client.info.height;
            ctx.wrist = client.info.wrist;
            ctx.ankle = client.info.ankle;
            ctx.date = client.birth;
            ctx.phone = client.phone;
            ctx.email = client.email;
            ctx.discount = client.discount;
            ctx.description = client.description;
            ctx.active = client.active;

            userService.getAllTrainers().then((trainers) => {
                for (let index in trainers) {
                    if (trainers.hasOwnProperty(index)) {
                        ctx._id = trainers[index]._id;
                        ctx.name = trainers[index].name;

                        let currentlyLogged = sessionStorage.getItem('userId');

                        if (currentlyLogged === trainers[index]._id) {
                            let pos = trainers.indexOf(trainers[index]);
                            let current = trainers.splice(pos, 1)[0];
                            trainers.unshift(current);
                        }

                        ctx.trainer = sessionStorage.getItem('trainer');
                        ctx.trainers = trainers;
                    }
                }

                ctx.loadPartials({
                    header: './views/basic/header.hbs',
                    trainer: './views/lbmcalc/client/trainer.hbs',
                    footer: './views/basic/footer.hbs'
                }).then(function () {
                    this.partial('./views/lbmcalc/edit/editClient.hbs')
                })
            })
        })
    }

    function updateClientPost(ctx) {
        let clientId = sessionStorage.getItem('clientId');
        let name = document.getElementById('client-name-edit').value.toLowerCase();
        let sex = document.getElementById('sex-edit').value.toLowerCase();
        let height = document.getElementById('height-edit').value;
        let wrist = document.getElementById('wrist-edit').value;
        let ankle = document.getElementById('ankle-edit').value;
        let birth = document.getElementById('date-edit').value;
        let phone = document.getElementById('phone-edit').value;
        let email = document.getElementById('email-edit').value;
        let discount = document.getElementById('discount-edit').value;
        let description = document.getElementById('text-edit').value;
        let active;

        let isActive = document.getElementById('active-edit').checked;
        if (isActive) {
            active = true
        } else {
            active = false;
        }

        if (window.confirm('CONFIRM ACTION!')) {
            clientService.updateClient(clientId, name, sex, height, wrist, ankle, birth, phone, email, discount, description, active).then(() => {
                notifyService.showInfo('Client edited successfully.');
                ctx.redirect('#/accounting');
            })
        }
    }

    function getClientInfo(ctx) {
        let clientId = ctx.params.clientId
        console.log(clientId)
        clientService.getClientInfoById(clientId).then((client) => {
            console.log(client)

        })
    }

    return {
        listAllClients,
        filterClient,
        populateFields,
        registerClientGet,
        registerClientPost,
        getClientsCards,
        addClientCardGet,
        addClientCardPost,
        updateCardGet,
        updateCardPost,
        deleteCard,
        updateClientGet,
        updateClientPost,
        getClientInfo
    }
})();