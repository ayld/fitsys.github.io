let viewController = (() => {
    function heightOptionValues() {
        let min = 140;
        let max = 220;
        let selector = $('#height-select')
            .append($('<option value="0" class="default-height" selected>Height:</option>'));
        for (let i = min; i <= max; i++) {
            let option = $('<option>');
            $(option).val(i);
            $(option).html(i);
            $(selector).append(option);
        }
    }

    function displayCard() {
        if ($('.default-height').is(':selected')) {
            $('#left').css('display', 'none');
        } else {
            setTimeout(function () {
                $('#left')
                    .addClass('col-sm-8 col-md-8')
                    .fadeIn('slow');
            }, 400)
        }
        $('#right')
            .removeClass('col-sm-4 col-md-4 col-md-offset-4')
            .addClass('col-sm-4 col-md-4');

    }

    function wristOptionValues() {
        let min = 12;
        let max = 26;
        let selector = $('#wrist-select')
            .append($('<option value="0" class="default-wrist" selected>Wrist:</option>'));
        for (let i = min; i <= max; i += 0.5) {
            let option = $('<option>');
            $(option).val(i);
            $(option).html(i);
            $(selector).append(option);
        }
    }

    function ankleOptionValues() {
        let min = 12;
        let max = 44;
        let selector = $('#ankle-select')
            .append($('<option value="0" class="default-ankle" selected>Ankle:</option>'));
        for (let i = min; i <= max; i += 0.5) {
            let option = $('<option>');
            $(option).val(i);
            $(option).html(i);
            $(selector).append(option);
        }
    }

    function fatOptionValues() {
        let min = 3;
        let max = 22;
        let selector = $('#fat-select')
            .append($('<option value="0" class="default-fat" selected>0</option>'));
        for (let i = min; i <= max; i++) {
            let option = $('<option>');
            $(option).val(i);
            $(option).html(i);
            $(selector).append(option);
        }
    }

    async function navActive() {
        await $('.nav li').on('click', function () {
            $('.nav li').removeClass('active');
            $(this).addClass('active');
        })
    }

    function dateOptionValues() {
        $(document).ready(function () {
            let selector = document.createElement('select');
            selector.id = 'today-select';
            selector.name = 'today-select';
            for (let i = 1; i <= 31; i++) {
                selector.options[selector.options.length] = new Option(i, i);
            }
            let today = new Date();
            let day = today.getDate();
            let month = today.getMonth();
            month = month + 1;
            $(`#today-select option[value="${day}"]`).prop('selected', true);
        })
    }

    function displayBirthDate() {

            let date_input = $('input[name="date-reg"]');
            let container = $('#add-client').length > 0 ? $('#add-client').parent() : "body";
            let options = {
                format: 'mm/dd/yyyy',
                container: container,
                todayHighlight: true,
                autoclose: true,
            };
            date_input.datepicker(options);

    }

    function displayCardDate() {

            let dateInput = $('input[name="start-date"]');
            let container = $('#card').length > 0 ? $('#card').parent() : "body";
            let options = {
                format: 'mm/dd/yyyy',
                container: container,
                todayHighlight: true,
                autoclose: true,
            };
            dateInput.datepicker(options);

    }

    function calcPrice() {
        let clientId = InfoHelper.prototype.getSelectedClientId();

        clientService.getClientInfoById(clientId).then((client) => {
            let discount = client.discount;
            let quantity = InfoHelper.prototype.getTimesPerWeek();
            let zone = InfoHelper.prototype.getZoneValue();
            let payment = InfoHelper.prototype.getPaymentValue();
            let price = 185 * quantity * zone * payment * discount;
            price = Math.round(price);
            $('#price').val(price)
        })
    }
    
    function calcEndDate() {
        let duration = document.getElementById('duration').value;
        let end = new Date(InfoHelper.prototype.getStartDate());
        end.setDate(end.getDate() + Number(duration));
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

        $('#end').val(end)
    }

    function calcPriceForEdit() {
        let clientId = sessionStorage.getItem('clientId');

        clientService.getClientInfoById(clientId).then((client) => {
            let discount = client.discount;
            let quantity = document.getElementById('qty-edit').value;
            let zone = document.getElementById('zone-edit').value;
            let payment = document.getElementById('payment-edit').value;
            let price = 185 * quantity * zone * payment * discount;
            price = Math.round(price);
            $('#price-edit').val(price)
        })
    }

    function calcEndDateForEdit() {
        let duration = document.getElementById('duration-edit').value;
        let end = new Date(document.getElementById('start-date-edit').value);
        end.setDate(end.getDate() + Number(duration));
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

        $('#end-date-edit').val(end)
    }

    return {
        heightOptionValues,
        displayCard,
        wristOptionValues,
        ankleOptionValues,
        fatOptionValues,
        navActive,
        dateOptionValues,
        displayBirthDate,
        displayCardDate,
        calcPrice,
        calcEndDate,
        calcPriceForEdit,
        calcEndDateForEdit
    }
})();
