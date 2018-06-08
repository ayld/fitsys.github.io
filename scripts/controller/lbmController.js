let lbmController = (() => {
    async function doLbm() {
      let id = globalInfo.getSelectedVal(document.getElementById('client'));
      let name = globalInfo.getSelectedText(document.getElementById('client'));
      let sex = globalInfo.getSelectedText(document.getElementById('sex-select'));
      let height = globalInfo.getSelectedVal(document.getElementById('height-select'));
      let wrist = globalInfo.getSelectedVal(document.getElementById('wrist-select'));
      let ankle = globalInfo.getSelectedVal(document.getElementById('ankle-select'));
      let fat = document.getElementById('fat-select');

      let heightRelativeLbm = sex === 'Male'
          ? lbmModel.heightRelativeLBM(height, 0.973, 99.515)
          : lbmModel.heightRelativeLBM(height, 0.861, 91.556);

      let heightRelativeWrist = sex === 'Male'
          ? lbmModel.heightRelativeWrist(height, 0.048, 7.954)
          : lbmModel.heightRelativeWrist(height, 0.043, 7.22);

      let heightRelativeAnkle = sex === 'Male'
          ? lbmModel.heightRelativeAnkle(height, 0.059, 12.181)
          : lbmModel.heightRelativeAnkle(height, 0.083, 5.667);

      let heightLbm = Math.round(heightRelativeLbm);
      let wristLbm = lbmModel.wristLbm(wrist, heightRelativeWrist, heightRelativeLbm);
      wristLbm = wristLbm === Infinity || wristLbm === -Infinity ? '' : Math.round(wristLbm);
      let ankleLbm = lbmModel.ankleLbm(ankle, heightRelativeAnkle, heightRelativeLbm);
      ankleLbm = ankleLbm === Infinity || ankleLbm === -Infinity ? '' : Math.round(ankleLbm);

      let bodyHeight = lbmModel.fatPercentBodyWeight(fat, heightLbm);
      bodyHeight = Math.round(bodyHeight);
      let bodyWrist = lbmModel.fatPercentBodyWeight(fat, wristLbm);
      bodyWrist = Math.round(bodyWrist);
      let bodyAnkle = lbmModel.fatPercentBodyWeight(fat, ankleLbm);
      bodyAnkle = Math.round(bodyAnkle);

      let user = {
        id: id,
        name: name,
        sex: sex,
        height: height,
        wrist: wrist,
        ankle: ankle,
        heightLbm: heightLbm,
        wristLbm: wristLbm,
        ankleLbm: ankleLbm,
        fatPercent: fat,
        bodyWrist: bodyWrist,
        bodyAnkle: bodyAnkle,
        bodyHeight: bodyHeight,
      };

      await lbmHelper.displayLBM(user);
    }

    return {
        doLbm,
      };
  })();
