window.onload = function() {
	setTimeout(()=>{
		let $loading = document.querySelector('#loading');
		$loading.classList.add('loading--hidden');

		wow = new WOW({
			boxClass:     'wow',      // default
			animateClass: 'animated', // default
			offset:       0,          // default
			mobile:       false,       // default
			live:         true        // default
		})
		wow.init();

		setTimeout(()=>{
			$loading.remove();
			init();
		},1000);
	}, 100);
};
