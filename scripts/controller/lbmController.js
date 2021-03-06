let lbmController = (() => {
    async function doLbm() {
        let id = globalInfo.getSelectedVal(document.getElementById('client'));
        let name = globalInfo.getSelectedText(document.getElementById('client'));
        let sex = globalInfo.getSelectedVal(document.getElementById('sex-select'));
        let height = globalInfo.getSelectedVal(document.getElementById('height-select'));
        let wrist = globalInfo.getSelectedVal(document.getElementById('wrist-select'));
        let ankle = globalInfo.getSelectedVal(document.getElementById('ankle-select'));
        let fat = globalInfo.getSelectedVal(document.getElementById('fat-select'));
        let ect = sessionStorage.getItem('_kmd.ect');
        let lmt = sessionStorage.getItem('_kmd.lmt');

        let user = {
            id: id,
            name: name,
            sex: sex,
            height: height,
            wrist: wrist,
            ankle: ankle,
            heightLbm: lbmService.heightLbm(sex, height),
            wristLbm: lbmService.wristLBM(sex, height, wrist),
            ankleLbm: lbmService.ankleLBM(sex, height, ankle),
            fatPercent: fat,
            bodyWrist: lbmService.bodyWrist(fat),
            bodyAnkle: lbmService.bodyAnkle(fat),
            bodyHeight: lbmService.bodyHeight(fat),
            ect: notifyService.formatDate(ect),
            lmt: notifyService.formatDate(lmt),
        };

        await lbmHelper.displayLBM(user);
    }

    return {
        doLbm,
    };
})();
