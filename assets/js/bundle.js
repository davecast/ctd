function init () {

	let open = false;

	const $headerMenu = document.querySelector('.header__menu');
	const $burger = document.getElementById('burger');
	const $burgerMenu = document.getElementById('burger__menu');
	const $header  = document.getElementById('header');
	const parallaxImages = document.querySelectorAll(".parallax__image");
	const $butTicket = document.querySelectorAll('.price__box--action-do');

	function headerStiky () {
		if (window.pageYOffset >= 100) {
			$header.classList.add("is--stiky")
			$header.classList.remove("no--stiky")
		} else {
			$header.classList.remove("is--stiky")
			$header.classList.add("no--stiky")
		}
	}

	function scrollTo() {
		const links = document.querySelectorAll('.link__to__go');
		links.forEach( (each) => {
			each.onclick = scrollAnchors;
		});
	}

	function scrollAnchors(e, type) {
		if (open) {
			menuBurger();
		}
		const distanceToTop = (el) => {
			return Math.floor(el.getBoundingClientRect().top);
		};
		let targetID;
		if (type) {
			targetID = `#${type}`
		} else {
			e.preventDefault();
			targetID = (this.getAttribute('href')) ? this.getAttribute('href') : `#${this.dataset.target}`;
		}

		const targetAnchor = document.querySelector(targetID);
		
		if (!targetAnchor) return;
		const originalTop = distanceToTop(targetAnchor);
		window.scrollBy({
			top: originalTop - $header.clientHeight,
			left: 0,
			behavior: 'smooth'
		});
		
		
	}

	function menuBurger () {
		if (!open) {
			$headerMenu.classList.toggle('header__menu--active');
			$burger.classList.toggle('header__burger--active');
			setTimeout(() => {
				$burgerMenu.classList.toggle('burger__menu--active');
			}, 500)
		} else {
			$burgerMenu.classList.toggle('burger__menu--active');
			setTimeout(() => {
				$headerMenu.classList.toggle('header__menu--active');
				$burger.classList.toggle('header__burger--active');
			}, 200)
		}
		
		open = !open;
	}

	function callButTicket () {
		$butTicket.forEach((button) => {
			button.addEventListener('click', (e) => {
				scrollAnchors(null, e.target.dataset.target);
				let $subject = document.getElementById('subject');
				let $name = document.getElementById('name');
				$name.focus();
				$subject.value = `Información sobre las entradas ${e.target.dataset.ticket}`;
			});
		});
	}

	callButTicket();
	headerStiky();
	scrollTo();

	window.onscroll = function() {
		headerStiky();
	}

	window.addEventListener("scroll", () => {
		parallaxImages.forEach( ( image, index ) => {
			image.style.transform = 'translateY(-' + window.scrollY * (index + 1) / 10 + 'px)';
		})
	})

	if ($burger) {
		$burger.addEventListener('click', (e) => {
			menuBurger();
		});
	}
}
