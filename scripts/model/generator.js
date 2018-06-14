let generator = (() => {
		function workoutDay() {
				let workoutDay = new Date();
				let day = workoutDay.getDate();
				let month = workoutDay.getMonth() + 1;
				$(`#today-select option[value="${day}"]`).prop('selected', true);
		}

		return {
				workoutDay,
		};
})();
