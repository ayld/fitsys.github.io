let lbmHelper = (() => {
    async function displayLBM(user) {
        let newUser = JSON.parse(JSON.stringify(user));
        if (newUser.heightLbm && !newUser.wristLbm && !newUser.ankleLbm) {
            newUser.lbm = newUser.heightLbm;
            if (newUser.fatPercent) {
                newUser.weight = newUser.bodyHeight;
            }
        } else if (newUser.wristLbm && !newUser.ankleLbm) {
            newUser.lbm = newUser.wristLbm;
            if (newUser.fatPercent) {
                newUser.weight = newUser.bodyWrist;
            }
        } else if (!newUser.wristLbm && newUser.ankleLbm) {
            newUser.lbm = newUser.ankleLbm;
            if (newUser.fatPercent) {
                newUser.weight = newUser.bodyAnkle;
            }
        } else {
            if (newUser.wristLbm < newUser.ankleLbm) {
                newUser.lbm = newUser.wristLbm + ' - ' + newUser.ankleLbm;
                if (newUser.fatPercent) {
                    newUser.weight = newUser.bodyWrist + ' - ' + newUser.bodyAnkle;
                }
            } else if (newUser.wristLbm > newUser.ankleLbm) {
                newUser.lbm = newUser.ankleLbm + ' - ' + newUser.wristLbm;
                if (newUser.fatPercent) {
                    newUser.weight = newUser.bodyAnkle + ' - ' + newUser.bodyWrist;
                }
            } else {
                if (newUser.wristLbm === newUser.ankleLbm) {
                    newUser.lbm = newUser.wristLbm;
                }

                if (newUser.fatPercent) {
                    newUser.weight = newUser.bodyWrist;
                }
            }
        }

        let source = await $.get('./views/lbmcalc/output/result.hbs');
        let template = Handlebars.compile(source);
        let result = template(newUser);
        $('#left').empty().append(result);
    }

    return {
        displayLBM,
    };
})();
