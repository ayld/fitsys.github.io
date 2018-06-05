let lbmController = (() => {
    async function doLbm() {
      let id = document.getElementById('client');
      let name = document.getElementById('client');
      let sex = document.getElementById('sex-select');
      sex = sex.options[sex.options.selectedIndex].innerText;
      let height = document.getElementById('height-select');
      height = height.options[height.options.selectedIndex].value;
      let wrist = document.getElementById('wrist-select');
      wrist = wrist.options[wrist.options.selectedIndex].value;
      let ankle = document.getElementById('ankle-select');
      ankle = ankle.options[ankle.options.selectedIndex].value;
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
        id: id.options[id.options.selectedIndex].value,
        name: name.options[name.options.selectedIndex].innerText,
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
