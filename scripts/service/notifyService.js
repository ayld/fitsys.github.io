let notifyService = (() => {
    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut(),
    });

    function showInfo(message) {
        let $infoBox = $('#infoBox');
        $infoBox.find('span').text(message);
        $infoBox.show();
        setTimeout(() => $infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let $errorBox = $('#errorBox');
        $errorBox.find('span').text(message);
        $errorBox.show();
        setTimeout(() => $errorBox.fadeOut(), 3000);
    }

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function formatDate(dateISO8601) {
        let date = new Date(dateISO8601);
        if (Number.isNaN(date.getDate()))
            return '';
        return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
            '.' + date.getFullYear();

        function padZeros(num) {
            return ('0' + num).slice(-2);
        }
    }

    return {
        showInfo,
        showError,
        handleError,
        formatDate,
    };
})();
