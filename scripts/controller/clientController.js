//import {randomAvatar} from "../model/avatarsDb";

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
								heightOption: './views/lbmcalc/anthropometry/heightOption.hbs',
								options: './views/lbmcalc/anthropometry/options.hbs',
								sexRegister: './views/lbmcalc/client/sexRegister.hbs',
								heightRegister: './views/lbmcalc/client/heightRegister.hbs',
								wristRegister: './views/lbmcalc/client/wristregister.hbs',
								ankleRegister: './views/lbmcalc/client/ankleRegister.hbs',
								birthDate: './views/lbmcalc/client/birthDate.hbs',
								phone: './views/lbmcalc/client/phone.hbs',
								email: './views/lbmcalc/client/email.hbs',
								trainer: './views/lbmcalc/client/trainer.hbs',
								discount: './views/lbmcalc/client/discount.hbs',
								avatar: './views/lbmcalc/client/avatar.hbs',
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

				let randomAvatar = [
						'http://i67.tinypic.com/10dwmmb.jpg', 'http://i66.tinypic.com/262sm7q.jpg',
						'http://i63.tinypic.com/2db198i.jpg', 'http://i65.tinypic.com/oqj4o6.jpg',
						'http://i67.tinypic.com/24wws9s.jpg', 'http://i66.tinypic.com/jsd9ab.jpg',
						'http://i68.tinypic.com/4lpx06.jpg', 'http://i65.tinypic.com/9kvy38.jpg',
						'http://i63.tinypic.com/2gxqmmu.jpg', 'http://i63.tinypic.com/160edmb.jpg',
						'http://i65.tinypic.com/14bks3k.jpg', 'http://i67.tinypic.com/302o30o.jpg',
						'http://i64.tinypic.com/iw3hi8.jpg', 'http://i66.tinypic.com/bdpd1e.jpg',
						'http://i64.tinypic.com/1zdykoz.jpg', 'http://i63.tinypic.com/2vb05dy.jpg',
						'http://i66.tinypic.com/aot2y0.jpg', 'http://i64.tinypic.com/1z2draq.jpg',
						'http://i64.tinypic.com/28a11s7.jpg', 'http://i67.tinypic.com/30kr8cm.jpg',
						'http://i66.tinypic.com/11w8rkg.jpg', 'http://i63.tinypic.com/15dxjc8.jpg',
						'http://i67.tinypic.com/2iawlf8.jpg', 'http://i67.tinypic.com/20zagk7.jpg',
						'http://i68.tinypic.com/2zekoir.jpg', 'http://i64.tinypic.com/35jjdvn.jpg',
						'http://i68.tinypic.com/34sjdar.jpg', 'http://i64.tinypic.com/t50rcw.jpg',
				]
				let isActive = document.getElementById('active').checked;
				let client = {
						avatar: () => {
								return randomAvatar[Math.floor(Math.random() * randomAvatar.length)]
										|| globalInfo.getInputVal(document.getElementById('avatar-reg'))
						},
						name: globalInfo.getInputVal(document.getElementById('name-reg')).toLowerCase(),
						info: {
								sex: globalInfo.getSelectedVal(document.getElementById('sex-reg')),
								height: globalInfo.getSelectedVal(document.getElementById('height-reg')),
								wrist: globalInfo.getSelectedVal(document.getElementById('wrist-reg')),
								ankle: globalInfo.getSelectedVal(document.getElementById('ankle-reg')),
						},
						birth: globalInfo.getInputVal(document.getElementById('date-reg')),
						phone: globalInfo.getInputVal(document.getElementById('phone-reg')),
						email: globalInfo.getInputVal(document.getElementById('email-reg')),
						description: globalInfo.getInputVal(document.getElementById('text-reg')),
						discount: globalInfo.getSelectedVal(document.getElementById('discount')),
						pt: globalInfo.getSelectedVal(document.getElementById('trainers')),
						active: isActive,
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
												heightOption: './views/lbmcalc/anthropometry/heightOption.hbs',
												options: './views/lbmcalc/anthropometry/options.hbs',
												height: './views/lbmcalc/anthropometry/height.hbs',
												wrist: './views/lbmcalc/anthropometry/wrist.hbs',
												ankle: './views/lbmcalc/anthropometry/ankle.hbs',
												client: './views/lbmcalc/client/client.hbs',
												fat: './views/lbmcalc/client/fat.hbs',
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
						let searchedName = globalInfo.getInputVal(document.getElementById('search')).toLowerCase();

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
						let searchedName = globalInfo.getInputVal(document.getElementById('search'));
						let sex = $('#sex-select').find('option');
						let selectedName = globalInfo.getSelectedText(document.getElementById('client'));

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
																		if ($(entry).val() === 'male') {
																				$('#fat-select').val(9);
																		} else if ($(entry).val() === 'female') {
																				$('#fat-select').val(15);
																		}

																		let ect = sessionStorage.setItem('_kmd.ect', clients[index]._kmd.ect);
																		let lmt = sessionStorage.setItem('_kmd.lmt', clients[index]._kmd.lmt);
																		user = {
																				id: clients[index]._id,
																				name: clients[index].name,
																				sex: clients[index].info.sex,
																				height: clients[index].info.height,
																				wrist: clients[index].info.wrist,
																				ankle: clients[index].info.ankle,
																				heightLbm: lbmService.heightLbm(),
																				wristLbm: lbmService.wristLBM(),
																				ankleLbm: lbmService.ankleLBM(),
																				fatPercent: globalInfo.getSelectedVal(document.getElementById('fat-select')),
																				bodyWrist: lbmService.bodyWrist(),
																				bodyAnkle: lbmService.bodyAnkle(),
																				bodyHeight: lbmService.bodyHeight(),
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
						let newCard = {
								clientId: card.clientId,
								client_name: document.getElementById('name-edit').value.toLowerCase(),
								workout: card.workout,
								dates: card.dates,
								qty: globalInfo.getSelectedText(document.getElementById('qty-edit')),
								zone: globalInfo.getSelectedText(document.getElementById('zone-edit')),
								price: globalInfo.getInputVal(document.getElementById('price-edit')),
								payment: () => {
										if (globalInfo.getSelectedText(document.getElementById('payment-edit')) === 'no') {
												return 'Pending';
										} else {
												return Math.round(globalInfo.getInputVal(document.getElementById('price-edit')) *
														globalInfo.getSelectedVal(document.getElementById('payment-edit')));
										}
								},

								start: globalInfo.getInputVal(document.getElementById('start-date-edit')),
								end: globalInfo.getInputVal(document.getElementById('end-date-edit')),
								duration: globalInfo.getSelectedText(document.getElementById('duration-edit')),
								active: true,
						};

						if (window.confirm('CONFIRM ACTION!')) {
								clientService.updateCard(cardId, newCard).then(() => {
										notifyService.showInfo('Card edited successfully.');
										ctx.redirect('#/accounting');
								});
						}
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
						let used = 0;
						if (cards.length === 0) {
								ctx.redirect('#/card');
						} else {
								ctx.isEmpty = false;
								for (let index in cards) {
										if (cards.hasOwnProperty(index)) {
												let end = Date.parse(cards[index].end);
												let today = Date.parse(globalInfo.getToday());

												let isPending = cards[index].payment !== 'Pending';
												let isHalfPaid = cards[index].payment === Math.round(cards[index].price * 0.5)
												if ((end < today || Number(cards[index].workout) >= Number(cards[index].qty) * 4) && isPending) {
														let cardId = cards[index]._id;
														let card = {
																clientId: cards[index].clientId,
																client_name: cards[index].client_name,
																dates: cards[index].dates,
																workout: cards[index].workout,
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
																location.reload()
														});
												}


												ctx.cards = cards;
												ctx.qty = cards[index].qty;
												ctx.count = cards.length;
												total += Number(cards[index].price) - 60;
												ctx.total = total;
												if (Number(cards[index].payment)) {
														paid += (Number(cards[index].payment) - 60);
												}

												ctx.workout = cards[index].workout;
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

				console.log(ctx.params)
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

				let clientId = globalInfo.getSelectedVal(document.getElementById('client-card'));

				clientService.getClientInfoById(clientId).then((client) => {
						let discount = client.discount;
						let price = 185 *
								globalInfo.getSelectedVal(document.getElementById('qty')) *
								globalInfo.getSelectedVal(document.getElementById('zone')) *
								discount;
						let end = globalInfo.getEndDate();
						let today = globalInfo.getToday();
						let duration = globalInfo.getSelectedText(document.getElementById('duration'));
						let expired = Date.parse(end);
						let less = Date.parse(today);
						let card = {
								clientId: clientId,
								client_name: globalInfo.getSelectedText(document.getElementById('client-card')),
								workout: 0,
								dates: null,
								qty: globalInfo.getSelectedText(document.getElementById('qty')),
								zone: globalInfo.getSelectedText(document.getElementById('zone')),
								price: Math.round(price),
								payment: () => {
										if (globalInfo.getSelectedText(document.getElementById('payment')) === 'no') {
												return 'Pending';
										} else {
												return Math.round(price * globalInfo.getSelectedVal(document.getElementById('payment')));
										}
								},

								start: globalInfo.getStartDate(),
								duration: globalInfo.getSelectedText(document.getElementById('duration')),
								end: () => {
										if (duration === 'unlimited') {
												return null;
										} else {
												return end;
										}
								},

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
												history.go(0)
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
						pt: globalInfo.getSelectedVal(document.getElementById('trainers')),
						discount: document.getElementById('discount-edit').value,
						description: document.getElementById('text-edit').value,
						active: isActive,
				};

				if (window.confirm('CONFIRM ACTION!')) {
						clientService.updateClient(clientId, client).then(() => {
								notifyService.showInfo('Client edited successfully.');
								ctx.redirect('#/accounting');
						});
				}
		}

		function getInfo(ctx) {
				if (!authService.isAuth()) {
						ctx.redirect('#/home');
						return;
				}

				ctx.isAuth = sessionStorage.getItem('authtoken');
				ctx.trainer = sessionStorage.getItem('trainer');

				let cardId = ctx.params.cardId
				clientService.getCardById(cardId).then((card) => {
						console.log(card);
						clientService.getClientInfoById(card.clientId).then((client) => {
								console.log(client);
								for (let index in client) {
										if (client.hasOwnProperty(index)) {
												ctx.id = client._id;
												ctx.name = client.name;
												ctx.sex = client.info.sex;
												ctx.height = client.info.height;
												ctx.wrist = client.info.wrist;
												ctx.ankle = client.info.ankle;
												ctx.phone = client.phone;
												ctx.email = client.email;
												ctx.birth = client.birth;
												ctx.description = client.description;
												ctx.discount = 100 - (client.discount * 100) + '%';
												ctx.ect = notifyService.formatDate(client._kmd.ect);
												ctx.lmt = notifyService.formatDate(client._kmd.lmt);
												ctx.trainer = client.pt;
												ctx.avatar = client.avatar;
												console.log(client.avatar)
												ctx.dates = card.dates.replace(', ', '').replace(/[0-9]{4}\-{1}[0-9]{2}\-{1}/gm, '')
										}
								}

								ctx.loadPartials({
										header: './views/basic/header.hbs',
										footer: './views/basic/footer.hbs',
								}).then(function () {
										this.partial('./views/lbmcalc/client/clientInfo/clientData.hbs');
								});
						})
				});
		}

		function logSessions(ctx) {
				if (!authService.isAuth()) {
						ctx.redirect('#/home');
						return;
				}

				ctx.isAuth = sessionStorage.getItem('authtoken');
				ctx.trainer = sessionStorage.getItem('trainer');
				let userId = sessionStorage.getItem('userId');

				let dates;
				clientService.getClientCard(userId).then((cards) => {
						for (let index in cards) {
								if (cards.hasOwnProperty(index)) {
										let checkboxes = document.querySelectorAll('input[type=checkbox][name=workout]');
										let workoutDays = document.querySelectorAll('select[name=today-select]');
										for (let i = 0; i < checkboxes.length; i++) {
												dates = cards[i].dates;
												if (checkboxes[i].checked) {
														let card = {
																clientId: cards[i].clientId,
																client_name: cards[i].client_name,
																workout: (() => {
																		return Number(cards[i].workout) + 1;
																}),
																dates: dates + ', ' + globalInfo.getWorkoutDay(workoutDays[i].value),
																qty: cards[i].qty,
																zone: cards[i].zone,
																price: Math.round(cards[i].price),
																payment: cards[i].payment,
																start: cards[i].start,
																duration: cards[i].duration,
																end: cards[i].end,
																active: () => {
																		if (cards[i].workout === cards[i].qty * 4) {
																				return false
																		} else {
																				return true
																		}
																},
														};
														clientService.updateCard(cards[i]._id, card).then(() => {
																notifyService.showInfo('Sessions logged.');
																ctx.redirect('#/accounting');
																//location.reload();
														})
												}
										}
								}
						}
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
				getInfo,
				logSessions
		};
})();
