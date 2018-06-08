let lbmHelper = (() => {
		async

		function displayLBM(user) {
				if (user.heightLbm && !user.wristLbm && !user.ankleLbm) {
						user.lbm = user.heightLbm;
						if (user.fatPercent) {
								user.weight = user.bodyHeight;
						}
				} else if (user.wristLbm && !user.ankleLbm) {
						user.lbm = user.wristLbm;
						if (user.fatPercent) {
								user.weight = user.bodyWrist;
						}
				} else if (!user.wristLbm && user.ankleLbm) {
						user.lbm = user.ankleLbm;
						if (user.fatPercent) {
								user.weight = user.bodyAnkle;
						}
				} else {
						if (user.wristLbm < user.ankleLbm) {
								user.lbm = user.wristLbm + ' - ' + user.ankleLbm;
								if (user.fatPercent) {
										user.weight = user.bodyWrist + ' - ' + user.bodyAnkle;
								}
						} else if (user.wristLbm > user.ankleLbm) {
								user.lbm = user.ankleLbm + ' - ' + user.wristLbm;
								if (user.fatPercent) {
										user.weight = user.bodyAnkle + ' - ' + user.bodyWrist;
								}
						} else {
								if (user.wristLbm === user.ankleLbm) {
										user.lbm = user.wristLbm;
								}

								if (user.fatPercent) {
										user.weight = user.bodyWrist;
								}
						}
				}

				let source = await $.get('./views/lbmcalc/output/result.hbs');
				let template = Handlebars.compile(source);
				let result = template(user);
				$('#left').empty().append(result);
		}

		return {
				displayLBM,
		};
})();