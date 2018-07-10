let lbmService = (() => {
    function heightLbm(sex, height) {
        //let sex = globalInfo.getSelectedText(document.getElementById('sex-select'));
        //let height = globalInfo.getSelectedVal(document.getElementById('height-select'));

        let heightRelativeLbm = sex === 'male'
            ? lbmModel.heightRelativeLBM(height, 0.973, 99.515)
            : lbmModel.heightRelativeLBM(height, 0.861, 91.556);

        return Math.round(heightRelativeLbm);
    };

    function wristLBM(sex, height, wrist) {
        //let sex = globalInfo.getSelectedText(document.getElementById('sex-select'));
        //let height = globalInfo.getSelectedVal(document.getElementById('height-select'));
        //let wrist = globalInfo.getSelectedVal(document.getElementById('wrist-select'));

        let heightRelativeWrist = sex === 'male'
            ? lbmModel.heightRelativeWrist(height, 0.048, 7.954)
            : lbmModel.heightRelativeWrist(height, 0.043, 7.22);

        let wristLbm = lbmModel.wristLbm(wrist, heightRelativeWrist, heightLbm());

        wristLbm = wristLbm === Infinity || wristLbm === -Infinity ? '' : Math.round(wristLbm);

        return wristLbm;
    };

    function ankleLBM(sex, height, ankle) {
        //let sex = globalInfo.getSelectedText(document.getElementById('sex-select'));
        //let height = globalInfo.getSelectedVal(document.getElementById('height-select'));
        //let ankle = globalInfo.getSelectedVal(document.getElementById('ankle-select'));

        let heightRelativeAnkle = sex === 'male'
            ? lbmModel.heightRelativeAnkle(height, 0.059, 12.181)
            : lbmModel.heightRelativeAnkle(height, 0.083, 5.667);

        let ankleLbm = lbmModel.ankleLbm(ankle, heightRelativeAnkle, heightLbm());

        ankleLbm = ankleLbm === Infinity || ankleLbm === -Infinity ? '' : Math.round(ankleLbm);

        return ankleLbm;
    };

    function bodyHeight(fat) {
        //let fat = globalInfo.getSelectedVal(document.getElementById('fat-select'));

        let bodyHeight = lbmModel.fatPercentBodyWeight(fat, heightLbm());

        return Math.round(bodyHeight);
    };

    function bodyWrist(fat) {
        //let fat = globalInfo.getSelectedVal(document.getElementById('fat-select'));

        let bodyWrist = lbmModel.fatPercentBodyWeight(fat, wristLBM());

        return Math.round(bodyWrist);
    };

    function bodyAnkle(fat) {
        //let fat = globalInfo.getSelectedVal(document.getElementById('fat-select'));

        let bodyAnkle = lbmModel.fatPercentBodyWeight(fat, ankleLBM());

        return Math.round(bodyAnkle);
    };

    return {
        heightLbm,
        wristLBM,
        ankleLBM,
        bodyHeight,
        bodyWrist,
        bodyAnkle,
    };
})();

