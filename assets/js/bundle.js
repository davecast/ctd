function init () {

	let open = false;

	const $headerMenu = document.querySelector('.header__menu');
	const $burger = document.getElementById('burger');
	const $burgerMenu = document.getElementById('burger__menu');
	const $header  = document.getElementById('header');
	const parallaxImages = document.querySelectorAll(".parallax__image");
	const $butTicket = document.querySelectorAll('.price__box--action-do');
	const $message__box = document.getElementById('message__box');
	const $sendBtn = document.getElementById('send');

	function addMessage (content, type='normal') {

		let $elem = document.createElement('div');
		let $elemChild = document.createElement('div');

		if (type === 'sussess') {
			$elem.classList.add('message', 'message--sussess');
		} else if(type === 'warning') {
			$elem.classList.add('message', 'message--warning');
		} else if(type === 'danger') {
			$elem.classList.add('message', 'message--danger');
		}

		$elemChild.classList.add('message__text')
		$elemChild.innerText = content
		$elem.appendChild($elemChild);

		$elem.addEventListener('click', function (e) {
			this.classList.add('message--hidden')
			setTimeout(()=>{
				this.remove();
			},350)
		})

		$message__box.appendChild($elem)

		setTimeout(()=>{
			$elem.classList.add('message--active');
		},50)

		setTimeout(()=>{
			$elem.classList.add('message--hidden');
		},5000)

		setTimeout(()=>{
			$elem.remove();
		},5450)
	}

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
	if ($sendBtn) {
		$sendBtn.addEventListener('click', (e) => {
			e.preventDefault()

			addMessage('Pronto nos contactaremos', 'sussess');
		})
	}
}
