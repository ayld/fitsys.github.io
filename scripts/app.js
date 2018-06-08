$(() => {
    const app = Sammy('.container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', homeController.displayHome);
        this.get('#/home', homeController.displayHome);

        this.get('#/register', userController.handleRegisterGet);
        this.post('#/register', userController.handleRegisterPost);

        this.get('#/login', userController.handleLoginGet);
        this.post('#/login', userController.handleLoginPost);

        this.get('#/logout', userController.handleLogout);

        this.get('#/lbm', clientController.listAllClients);

        this.get('#/populate', clientController.populateFields);

        this.get('#/client', clientController.registerClientGet);
        this.post('#/client', clientController.registerClientPost);

        this.get('#/card', clientController.addClientCardGet);
        this.post('#/card', clientController.addClientCardPost);

        this.get('#/accounting', clientController.getClientsCards);

        this.get('#/editCard/:cardId', clientController.updateCardGet);
        this.post('#/editCard/:cardId', clientController.updateCardPost);

        this.get('#/deleteCard/:cardId', clientController.deleteCard);

        this.get('#/editClient/:clientId', clientController.updateClientGet);
        this.post('#/editClient/:clientId', clientController.updateClientPost);

        this.get('#/clientInfo/:clientId', clientController.getClientInfo);

        this.get('#/filter', function () {
            $('#search').on('input', clientController.filterClient);
          });

        this.get('#/sexLBM', function () {
            $('#sex-select').on('change keyup', lbmController.doLbm);
          });

        this.get('#/heightLBM', function () {
            $('#height-select').on('change keyup', lbmController.doLbm);
          });

        this.get('#/wristLBM', function () {
            $('#wrist-select').on('change keyup', lbmController.doLbm);
          });

        this.get('#/ankleLBM', function () {
            $('#ankle-select').on('change keyup', lbmController.doLbm);
          });

        this.get('#/weight', function () {
            $('#fat-select').on('change keyup', lbmController.doLbm)
          });
      });

    app.run();
  });

//zones - 1:Active; 2:Available/Happy Hour; 3:Combined;
