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

    function navActive() {
        $('.nav.nav-tabs > li').on('click', function () {
            $('.nav.nav-tabs > li').removeClass('active');
            $(this).addClass('active');
        })
    }

    function dateOptionValues() {
        $(document).ready(function () {
            let selector = document.getElementById('today');
            for (let i = 1; i <= 31; i++) {
                selector.options[selector.options.length] = new Option(i, i);
            }
            let today = new Date();
            let day = today.getDate();
            let month = today.getMonth();
            month = month + 1;
            $(`#today option[value="${day}"]`).prop('selected', true);
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

    return {
        heightOptionValues,
        displayCard,
        wristOptionValues,
        ankleOptionValues,
        fatOptionValues,
        navActive,
        dateOptionValues,
        displayBirthDate,
        displayCardDate
    }
})();
