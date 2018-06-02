Handlebars.registerHelper('toUpperCase', function (arg) {
    return arg.charAt(0).toUpperCase() + arg.slice(1).toLowerCase();
});

Handlebars.registerHelper('formatName', function (name) {
    if (name !== undefined) {
        let firstName = name.split(' ')[0];
        let lastName = name.split(' ')[1];

        if (firstName && lastName) {
            firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
            lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

            return firstName + ' ' + lastName;
        } else {
            firstName = name;
            firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

            return firstName
        }
    }
});

Handlebars.registerHelper('multiply', function (arg) {
    return arg * 4;
});