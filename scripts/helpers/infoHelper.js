let InfoHelper = function () {};

InfoHelper.prototype.getID = function () {
  return $('#client').find('option:selected').val();
};

InfoHelper.prototype.getSelectedName = function () {
    return $('#client').find('option:selected').text();
};

InfoHelper.prototype.getInputName = function () {
  return $('#search').val();
};

InfoHelper.prototype.getSexText = function () {
    return $('#sex-select').find(':selected').text();
};

InfoHelper.prototype.getSexValue = function () {
    return $('#sex-select').find(':selected').val();
};

InfoHelper.prototype.getHeight = function () {
    return $('#height-select').find(':selected').val();
};

InfoHelper.prototype.getWrist = function () {
    return $('#wrist-select').find(':selected').val();
};

InfoHelper.prototype.getAnkle = function () {
    return $('#ankle-select').find(':selected').val();
};

InfoHelper.prototype.getFat = function () {
    return $('#fat-select').val();
};

//Accounting system info helpers
InfoHelper.prototype.getRegisterName = function () {
    return $('#name-reg').val();
};

InfoHelper.prototype.getRegisterSex = function () {
    return $('#sex-reg').find(':selected').val();
};

InfoHelper.prototype.getRegisterHeight = function () {
    return $('#height-reg').find(':selected').val();
};

InfoHelper.prototype.getRegisterWrist = function () {
    return $('#wrist-reg').find(':selected').val();
};

InfoHelper.prototype.getRegisterAnkle = function () {
    return $('#ankle-reg').find(':selected').val();
};

InfoHelper.prototype.getRegisterEmail = function () {
    return $('#email-reg').val();
};

InfoHelper.prototype.getRegisterPhone = function () {
    return $('#phone-reg').val();
};

InfoHelper.prototype.getRegisterBirthDate = function () {
    return $('#date-reg').val();
};

InfoHelper.prototype.getRegisterDescription = function () {
    return $('#text-reg').val();
};

InfoHelper.prototype.getStartDate = function () {
    let start = new Date(InfoHelper.prototype.getStartDate())
    let dd = start.getDate();
    let mm = start.getMonth() + 1; //January is 0!
    let yyyy = start.getFullYear();

    if(dd < 10) {
        dd = '0' + dd
    }

    if(mm < 10) {
        mm = '0' + mm
    }

    start = mm + '/' + dd + '/' + yyyy;

    return start;
};

InfoHelper.prototype.getEndDate = function () {
    let end = new Date(InfoHelper.prototype.getStartDate())
    end.setDate(end.getDate() + 35);
    let dd = end.getDate();
    let mm = end.getMonth() + 1;
    let yyyy = end.getFullYear();

    if(dd < 10) {
        dd = '0' + dd
    }

    if(mm < 10) {
        mm = '0' + mm
    }

    end = mm + '/' + dd + '/' + yyyy;

    return end;
};

InfoHelper.prototype.generateDays = function () {

};

InfoHelper.prototype.getToday = function () {
    let today = new Date()
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd < 10) {
        dd = '0' + dd
    }

    if(mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;

    return today;
}

InfoHelper.prototype.getSelectedClientId = function () {
    return $('#client-card').find('option:selected').val();
};

InfoHelper.prototype.getSelectedClientName = function () {
    return $('#client-card').find('option:selected').text();
};

InfoHelper.prototype.getTimesPerWeek = function () {
    return $('#qty').find('option:selected').val();
};

InfoHelper.prototype.getZoneText = function () {
    return $('#zone').find('option:selected').text();
};

InfoHelper.prototype.getPaymentText = function () {
    return $('#payment').find('option:selected').text();
};

InfoHelper.prototype.getStartDate = function () {
    return $('#start-date').val();
};

InfoHelper.prototype.getDuration = function () {
    return $('#duration').find('option:selected').text();
};

InfoHelper.prototype.getZoneValue = function () {
    return $('#zone').find('option:selected').val();
};

InfoHelper.prototype.getPaymentValue = function () {
    return $('#payment').find('option:selected').val();
};