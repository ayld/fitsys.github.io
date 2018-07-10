let globalInfo = (() => {
    function getInputVal(selector) {
        return selector.value;
    };

    function getInputText(selector) {
        return selector.innerText;
    };

    function getSelectedVal(selector) {
        return selector.options[selector.options.selectedIndex].value;
    };

    function getSelectedText(selector) {
        return selector.options[selector.options.selectedIndex].innerText;
    };

    function getToday() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;   //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = yyyy + '-' + mm + '-' + dd;

        return today;
    }

    function getStartDate() {
        let start = document.getElementById('start-date');
        let date = new Date(start.value);
        let dd = date.getDate();
        let mm = date.getMonth() + 1;   //January is 0!
        let yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        date = yyyy + '-' + mm + '-' + dd;

        return date;
    }

    function getEndDate() {
        let start = document.getElementById('start-date');
        let end = new Date(start.value);
        end.setDate(end.getDate() + 35);
        let dd = end.getDate();
        let mm = end.getMonth() + 1;
        let yyyy = end.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        end = yyyy + '-' + mm + '-' + dd;

        return end;
    }

    function getWorkoutDay(day) {
        let today = new Date();
        let dd = day;
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = yyyy + '-' + mm + '-' + dd;

        return today;
    }

    return {
        getInputVal,
        getInputText,
        getSelectedVal,
        getSelectedText,
        getToday,
        getStartDate,
        getEndDate,
        getWorkoutDay
    };
})();
