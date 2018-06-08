let lbmController = (() => {
		async
		function doLbm() {
				let id = globalInfo.getSelectedVal(document.getElementById('client'));
				let name = globalInfo.getSelectedText(document.getElementById('client'));
				let sex = globalInfo.getSelectedText(document.getElementById('sex-select'));
				let height = globalInfo.getSelectedVal(document.getElementById('height-select'));
				let wrist = globalInfo.getSelectedVal(document.getElementById('wrist-select'));
				let ankle = globalInfo.getSelectedVal(document.getElementById('ankle-select'));
				let fat = globalInfo.getSelectedVal(document.getElementById('fat-select'));

				let user = {
						id: id,
						name: name,
						sex: sex,
						height: height,
						wrist: wrist,
						ankle: ankle,
						heightLbm: lbmService.heightLbm(),
						wristLbm: lbmService.wristLBM(),
						ankleLbm: lbmService.ankleLBM(),
						fatPercent: fat,
						bodyWrist: lbmService.bodyWrist,
						bodyAnkle: lbmService.bodyAnkle,
						bodyHeight: lbmService.bodyHeight,
				};

				await lbmHelper.displayLBM(user);
		}

		return {
				doLbm,
		};
})();