let ProtoHelper = function () {};

ProtoHelper.prototype.heightLBM = function () {
    let sex = InfoHelper.prototype.getSexText();
    let height = InfoHelper.prototype.getHeight();

    let heightRelativeLbm = sex === 'Male'
        ? lbmModel.heightRelativeLBM(height, 0.973, 99.515)
        : lbmModel.heightRelativeLBM(height, 0.861, 91.556);

    return Math.round(heightRelativeLbm);
};

ProtoHelper.prototype.wristLBM = function () {
    let sex = InfoHelper.prototype.getSexText();
    let height = InfoHelper.prototype.getHeight();
    let wrist = InfoHelper.prototype.getWrist();

    let heightRelativeWrist = sex === 'Male'
        ? lbmModel.heightRelativeWrist(height, 0.048, 7.954)
        : lbmModel.heightRelativeWrist(height, 0.043, 7.22);

    let wristLbm = lbmModel.wristLbm(wrist, heightRelativeWrist, ProtoHelper.prototype.heightLBM());

    wristLbm = wristLbm === Infinity || wristLbm === -Infinity ? '' : Math.round(wristLbm);

    return wristLbm;
};

ProtoHelper.prototype.ankleLBM = function () {
    let sex = InfoHelper.prototype.getSexText();
    let height = InfoHelper.prototype.getHeight();
    let ankle = InfoHelper.prototype.getAnkle();

    let heightRelativeAnkle = sex === 'Male'
        ? lbmModel.heightRelativeAnkle(height, 0.059, 12.181)
        : lbmModel.heightRelativeAnkle(height, 0.083, 5.667);

    let ankleLbm = lbmModel.ankleLbm(ankle, heightRelativeAnkle, ProtoHelper.prototype.heightLBM());

    ankleLbm = ankleLbm === Infinity || ankleLbm === -Infinity ? '' : Math.round(ankleLbm);

    return ankleLbm;
};

ProtoHelper.prototype.bodyHeight = function () {
    let fat = InfoHelper.prototype.getFat();

    let bodyHeight = lbmModel.fatPercentBodyWeight(fat, ProtoHelper.prototype.heightLBM());

    return Math.round(bodyHeight);
};

ProtoHelper.prototype.bodyWrist = function () {
    let fat = InfoHelper.prototype.getFat();

    let bodyWrist = lbmModel.fatPercentBodyWeight(fat, ProtoHelper.prototype.wristLBM());

    return Math.round(bodyWrist);
};

ProtoHelper.prototype.bodyAnkle = function () {
    let fat = InfoHelper.prototype.getFat();

    let bodyAnkle = lbmModel.fatPercentBodyWeight(fat, ProtoHelper.prototype.ankleLBM());

    return Math.round(bodyAnkle);
};

ProtoHelper.prototype.doLbm = async function (user) {
    this.user = user || {};


}