let lbmController = (() => {
    async function doLbm() {
        let user = {};

        let _id = InfoHelper.prototype.getID();
        let name = InfoHelper.prototype.getSelectedName();
        let sex = InfoHelper.prototype.getSexText();
        let height = InfoHelper.prototype.getHeight();
        let wrist = InfoHelper.prototype.getWrist();
        let ankle = InfoHelper.prototype.getAnkle();
        let fat = InfoHelper.prototype.getFat();

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

        await lbmHelper.displayLBM(user, _id, name, sex, height, wrist, ankle, heightLbm, wristLbm, ankleLbm, fat, bodyWrist, bodyAnkle, bodyHeight)
    }

    return {
        doLbm
    }
})();

function lbm() {
    class User {
        constructor(user) {
            this._user = user || {};
        }
    }

    class Info extends User {
        constructor(user, _id, name, sex, height, wrist, ankle) {
            super(user);
            this._id = _id;
            this._name = name;
            this._sex = sex;
            this._height = height;
            this._wrist = wrist;
            this._ankle = ankle;
            this.heightLbm = 0;
            this.wristLbm = 0;
            this.ankleLbm = 0;
            this.fat = 0;
            this.ect = '';
            this.lmt = '';
            this._user = {
                id: this._id,
                name: this._name,
                sex: this._sex,
                height: this._height,
                wrist: this._wrist,
                ankle: this._ankle,
                heightLbm: this.heightLbm,
                wristLbm: this.wristLbm,
                ankleLbm: this.ankleLbm,
                fat: this.fat,
                ect: this.ect,
                lmt: this.lmt
            }
        }

        get user() {
            return this._user;
        }
    }

    return {
        User: User,
        Info: Info
    }
}