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

            return firstName;
        }
    }
});

Handlebars.registerHelper('multiply', function (arg) {
    return arg * 4;
});

Handlebars.registerHelper('used', function (arg1, arg2) {
    let res = Math.round((Number(arg1) / (Number(arg2) * 4)) * 100);
    if (isNaN(res)) {
        return null;
    } else {
        return res;
    }
});

Handlebars.registerHelper('formatDate', function (dateISO8601) {
    let date = new Date(dateISO8601);
    if (Number.isNaN(date.getDate()))
        return '';
    return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
        '.' + date.getFullYear();

    function padZeros(num) {
        return ('0' + num).slice(-2);
    }
});

Handlebars.registerHelper('discount', function(discount) {
    return 100 - (Number(discount) * 100) + '%'
});

Handlebars.registerHelper('splitPhone', function (phone) {
    let number = phone.substring(0, phone.length - 6);
    for (let i = 4; i < phone.length; i+=2) {
        number += ' ' + phone[i] + phone[i + 1]
    }
    return number;
});

Handlebars.registerHelper('isTrue', function (active) {
    if (active === true) {
        return active = true
    } else {
        return active = false
    }
});

Handlebars.registerHelper('counter', function (index){
    return index + 1;
});

