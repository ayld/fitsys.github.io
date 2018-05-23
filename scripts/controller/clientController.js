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
        let active;

        let isActive = document.getElementById('active').checked;
        if (isActive) {
            active = true
        } else {
            active = false;
        }

        if (window.confirm('Confirm action!')) {
            clientService.addClient(name, sex, height, wrist, ankle, birth, phone, email, description, active).then(() => {
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


    function updateClientInfo(ctx) {

    }

    function retrieveClientInfo(ctx) {

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

            if (cards.length === 0) {
                ctx.redirect('#/card')
            } else {
                ctx.isEmpty = false;
                ctx.cards = cards;
                for (let index in cards) {
                    if (cards.hasOwnProperty(index)) {
                        ctx.name = cards[index].name;
                        ctx.payment = cards[index].price * InfoHelper.prototype.getPaymentValue()

                        ctx.loadPartials({
                            header: './views/basic/header.hbs',
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
        let client_name = InfoHelper.prototype.getSelectedClientName();
        let qty = InfoHelper.prototype.getTimesPerWeek();
        let zone = InfoHelper.prototype.getZoneText();
        let price = InfoHelper.prototype.getPaymentValue() * InfoHelper.prototype.getZoneValue() * 157.00;
        let payment = InfoHelper.prototype.getPaymentText();
        let start = InfoHelper.prototype.getStartDate();
        let end;
        let duration = InfoHelper.prototype.getDuration();
        let expired = Date.parse(end);
        let today = Date.parse(InfoHelper.prototype.getToday());
        let active;

        if (duration === 'unlimited') {
            end = null
        } else {
            end = InfoHelper.prototype.getEndDate();
        }

        if (expired < today) {
            active = false
        } else {
            active = true;
        }

        if (window.confirm('Confirm action!')) {
            clientService.addClientCard(clientId, client_name, qty, zone, price, payment, start, end, duration, active).then(() => {
                notifyService.showInfo('Card added successfully.');
                ctx.redirect('#/accounting');
            })
        }
    }

    return {
        listAllClients,
        filterClient,
        populateFields,
        registerClientGet,
        registerClientPost,
        updateClientInfo,
        retrieveClientInfo,
        getClientsCards,
        addClientCardGet,
        addClientCardPost
    }
})();