let clientController = (() => {
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
              footer: './views/basic/footer.hbs',
            }).then(function () {
              this.partial('./views/lbmcalc/client/addClientForm.hbs');
            });
        });
    }

    function registerClientPost(ctx) {
      if (!authService.isAuth()) {
        ctx.redirect('#/home');
        return;
      }

      ctx.isAuth = sessionStorage.getItem('authtoken');
      ctx.trainer = sessionStorage.getItem('trainer');

      let p = document.getElementById('trainers');
      let isActive = document.getElementById('active').checked;
      let client = {
          name: InfoHelper.prototype.getRegisterName().toLowerCase(),
          info: {
              sex: InfoHelper.prototype.getRegisterSex(),
              height: InfoHelper.prototype.getRegisterHeight(),
              wrist: InfoHelper.prototype.getRegisterWrist(),
              ankle: InfoHelper.prototype.getRegisterAnkle(),
            },
          birth: InfoHelper.prototype.getRegisterBirthDate(),
          phone: InfoHelper.prototype.getRegisterPhone(),
          email: InfoHelper.prototype.getRegisterEmail(),
          description: InfoHelper.prototype.getRegisterDescription(),
          discount: InfoHelper.prototype.getDiscount(),
          pt: p.options[p.options.selectedIndex].value,
          active: () => {
              if (isActive) {
                return true;
              } else {
                return false;
              }
            },
        };

      if (window.confirm('CONFIRM ACTION!')) {
        clientService.addClient(client).then(() => {
            notifyService.showInfo('Client added successfully.');
            ctx.redirect('#/card');
          });
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
                  footer: './views/basic/footer.hbs',
                }).then(function () {
                  this.partial('./views/lbmcalc/input/main.hbs');
                });
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
          let $select = $('select#client.form-control');
          let searchedName = InfoHelper.prototype.getInputName().toLowerCase();

          for (let index in clients) {
            if (clients.hasOwnProperty(index)) {
              if (searchedName) {
                if (clients[index].name.toLowerCase().indexOf(searchedName) > -1) {
                  $($select).children().filter(function () {
                      return $.trim(this.text) === clients[index].name;
                    }).prop('selected', true);
                }
              } else {
                $($select).children().eq(0).prop('selected', true);
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

      let user;

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

                        user = {
                            id: clients[index]._id,
                            name: clients[index].name,
                            sex: clients[index].info.sex,
                            height: clients[index].info.height,
                            wrist: clients[index].info.wrist,
                            ankle: clients[index].info.ankle,
                            heightLbm: heightLbm(),
                            wristLbm: wristLBM(),
                            ankleLbm: ankleLBM(),
                            fatPercent: InfoHelper.prototype.getFat(),
                            bodyWrist: bodyWrist(),
                            bodyAnkle: bodyAnkle(),
                            bodyHeight: bodyHeight(),
                            ect: notifyService.formatDate(clients[index]._kmd.ect),
                            lmt: notifyService.formatDate(clients[index]._kmd.lmt),
                          };

                        lbmHelper.displayLBM(user);
                      }
                    });
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
                  footer: './views/basic/footer.hbs',
                }).then(function () {
                  this.partial('./views/lbmcalc/edit/editCard.hbs');
                });
            });
        });
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
              let qty = document.getElementById('qty-edit');
              let zone = document.getElementById('zone-edit');
              let duration = document.getElementById('duration-edit');

              let card = {
                  clientId: clientId,
                  client_name: document.getElementById('name-edit').value.toLowerCase(),
                  qty: qty.options[qty.options.selectedIndex].innerText,
                  zone: zone.options[zone.options.selectedIndex].innerText,
                  payment: document.getElementById('payment-edit').value,
                  price: document.getElementById('price-edit').value,
                  start: document.getElementById('start-date-edit').value,
                  end: document.getElementById('end-date-edit').value,
                  duration: duration.options[duration.options.selectedIndex].innerText,
                  active: true,
                };

              if (window.confirm('CONFIRM ACTION!')) {
                clientService.updateCard(cardId, card).then(() => {
                    notifyService.showInfo('Card edited successfully.');
                    ctx.redirect('#/accounting');
                  });
              }
            });
        });
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
            ctx.redirect('#/card');
          } else {
            ctx.isEmpty = false;
            for (let index in cards) {
              if (cards.hasOwnProperty(index)) {
                let end = Date.parse(cards[index].end);
                let today = Date.parse(InfoHelper.prototype.getToday());

                if (end < today) {
                  let cardId = cards[index]._id;
                  let card = {
                      clientId: cards[index].clientId,
                      client_name: cards[index].client_name,
                      qty: cards[index].qty,
                      zone: cards[index].zone,
                      price: cards[index].price,
                      payment: cards[index].payment,
                      start: cards[index].start,
                      end: cards[index].end,
                      duration: cards[index].duration,
                      active: cards[index].active = false,
                    };

                  clientService.updateCard(cardId, card).then(() => {
                      ctx.cards = cards;
                    });
                }

                ctx.cards = cards;
                ctx.qty = cards[index].qty;
                ctx.count = cards.length;
                total += Number(cards[index].price) - 60;
                ctx.total = total;
                if (cards[index].payment === 'Pending') {
                  temp = 0;
                } else if (cards[index].payment === '1/2') {
                  temp = 0.5;
                } else {
                  temp = cards[index].payment;
                }

                paid += (Number(cards[index].price) - 60) * temp;
                ctx.paid = paid;
                ctx.loadPartials({
                    header: './views/basic/header.hbs',
                    today: './views/lbmcalc/client/today.hbs',
                    clientReg: './views/accounting/clientReg.hbs',
                    footer: './views/basic/footer.hbs',
                  }).then(function () {
                    this.partial('./views/accounting/main.hbs');
                  });
              }
            }
          }
        });
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
              footer: './views/basic/footer.hbs',
            }).then(function () {
              this.partial('./views/accounting/card.hbs');
            });
        });
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
          let discount = client.discount;
          let client_name = document.getElementById('client-card');
          let qty = document.getElementById('qty');
          let zone = document.getElementById('zone');
          let payment = document.getElementById('payment');
          let price = 185 * qty.options[qty.options.selectedIndex].value * zone.options[zone.options.selectedIndex].value * discount;
          let end = InfoHelper.prototype.getEndDate();
          let today = InfoHelper.prototype.getToday();
          let duration = InfoHelper.prototype.getDuration();
          let expired = Date.parse(end);
          let less = Date.parse(today);
          let card = {
              clientId: clientId,
              client_name: client_name.options[client_name.options.selectedIndex].innerText,
              qty: qty.options[qty.options.selectedIndex].innerText,
              zone: zone.options[zone.options.selectedIndex].innerText,
              price: Math.round(price),
              payment: () => {
                if (payment.options[payment.options.selectedIndex].innerText === 'no') {
                  return 'Pending';
                } else {
                  return Math.round(price * payment.value);
                }
              },

              start: InfoHelper.prototype.getStartDate(),
              end: () => {
                  if (duration === 'unlimited') {
                    return null;
                  } else {
                    return end;
                  }
                },

              duration: duration,
              active: true,
            };

          if (expired < less) {
            alert('Add valid period.');
            return;
          } else {
            if (window.confirm('CONFIRM ACTION!')) {
              clientService.addClientCard(clientId, card).then(() => {
                  notifyService.showInfo('Card added successfully.');
                  ctx.redirect('#/accounting');
                });
            }
          }
        });
    }

    function deleteCard(ctx) {
      let cardId = ctx.params.cardId;
      if (window.confirm('CONFIRM ACTION!')) {
        clientService.deleteCardById(cardId).then(() => {
            notifyService.showInfo('Card deleted.');
            ctx.redirect('#/accounting');
          }).catch(notifyService.showError);
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
                  footer: './views/basic/footer.hbs',
                }).then(function () {
                  this.partial('./views/lbmcalc/edit/editClient.hbs');
                });
            });
        });
    }

    function updateClientPost(ctx) {
      let clientId = sessionStorage.getItem('clientId');
      let isActive = document.getElementById('active-edit').checked;

      let client = {
          name: document.getElementById('client-name-edit').value.toLowerCase(),
          info: {
              sex: document.getElementById('sex-edit').value.toLowerCase(),
              height: document.getElementById('height-edit').value,
              wrist: document.getElementById('wrist-edit').value,
              ankle: document.getElementById('ankle-edit').value,
            },
          birth: document.getElementById('date-edit').value,
          phone: document.getElementById('phone-edit').value,
          email: document.getElementById('email-edit').value,
          discount: document.getElementById('discount-edit').value,
          description: document.getElementById('text-edit').value,
          active: () => {
              if (isActive) {
                return true;
              } else {
                return false;
              }
            },
        };

      if (window.confirm('CONFIRM ACTION!')) {
        clientService.updateClient(clientId, client).then(() => {
            notifyService.showInfo('Client edited successfully.');
            ctx.redirect('#/accounting');
          });
      }
    }

    function getClientInfo(ctx) {
      let clientId = ctx.params.clientId;
      console.log(clientId);
      clientService.getClientInfoById(clientId).then((client) => {
          console.log(client);
        });
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
        getClientInfo,
      };
  })();
