(() => {
		let selector = document.getElementById('fat-select');
		let option = document.createElement('option');
		option.innerHTML = 'Fat';
		option.value = 0;
		selector.appendChild(option);
		for (let i = 3; i <= 22; i++) {
				selector.options[selector.options.length] = new Option(i, i);
		}
})();
