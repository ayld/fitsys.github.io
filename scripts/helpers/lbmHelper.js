let lbmHelper = (() => {
    async function displayLBM(
        user,
        _id,
        name,
        sex,
        height,
        wrist,
        ankle,
        heightLbm,
        wristLbm,
        ankleLbm,
        fatPercent,
        bodyWrist,
        bodyAnkle,
        bodyHeight,
        ect,
        lmt
    ) {
        user = {
            id: _id,
            name: name,
            sex: sex,
            height: height,
            wrist: wrist,
            ankle: ankle,
            lbm: 0,
            weight: 0,
            ect: ect,
            lmt: lmt
        };

        if (heightLbm && !wristLbm && !ankleLbm) {
            user.lbm = heightLbm;
            if (fatPercent) {
                user.weight = bodyHeight;
            }
        } else if (wristLbm && !ankleLbm) {
            user.lbm = wristLbm;
            if (fatPercent) {
                user.weight = bodyWrist;
            }
        } else if (!wristLbm && ankleLbm) {
            user.lbm = ankleLbm;
            if (fatPercent) {
                user.weight = bodyAnkle;
            }
        } else {
            if (wristLbm < ankleLbm) {
                user.lbm = wristLbm + ' - ' + ankleLbm;
                if (fatPercent) {
                    user.weight = bodyWrist + ' - ' + bodyAnkle;
                }
            } else if (wristLbm > ankleLbm) {
                user.lbm = ankleLbm + ' - ' + wristLbm;
                if (fatPercent) {
                    user.weight = bodyAnkle + ' - ' + bodyWrist;
                }
            } else {
                if (wristLbm === ankleLbm) {
                    user.lbm = wristLbm;
                }
                if (fatPercent) {
                    user.weight = bodyWrist;
                }
            }
        }

        let source = await $.get('./views/lbmcalc/output/result.hbs');
        let template = Handlebars.compile(source);
        let result = template(user);
        $('#left').empty().append(result);

    }

    return {
        displayLBM
    }

})();