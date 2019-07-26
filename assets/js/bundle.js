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

	var countDownDate = new Date("Nov 16, 2019 08:00:00").getTime();

	// Update the count down every 1 second
	var x = setInterval(function() {

	  // Get today's date and time
	  var now = new Date().getTime();

	  // Find the distance between now and the count down date
	  var distance = countDownDate - now;

	  // Time calculations for days, hours, minutes and seconds
	  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	  let daysPrint =  (days.toString().length == "1") ? `0${days}` : days;
	  let hourPrint =  (hours.toString().length == "1") ? `0${hours}` : hours;
	  let minPrint =  (minutes.toString().length == "1") ? `0${minutes}` : minutes;
	  let secPrint =  (seconds.toString().length == "1") ? `0${seconds}` : seconds;
	  // Display the result in the element with id="demo"
	  document.getElementById("dayCount").innerHTML = daysPrint;
	  document.getElementById("hourCount").innerHTML = hourPrint;
	  document.getElementById("minCount").innerHTML = minPrint;
	  document.getElementById("secCount").innerHTML = secPrint;
	  // If the count down is finished, write some text 
	  if (distance < 0) {
	    clearInterval(x);
	    document.getElementById("demo").innerHTML = "EXPIRED";
	  }
	}, 1000);


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
	function MapFigure (element) {
		this.element = document.querySelector('.map__box');
		this.image = this.element.querySelector('.map__box--picture');
		this.map = this.element.querySelector('.map__box--map');
		this.point = this.element.querySelector('.map__box--point');
		this.intervalo = null;
		this.change = false;
		this.pointMake = function () {
			if (!this.change) {
				this.point.classList.add('change--point');
				setTimeout(() => {
					this.point.classList.add('change--point--move');
				}, 1000);
			} else {
				this.point.classList.remove('change--point');
				this.point.classList.remove('change--point--move');
			}

			this.change = !this.change;
		}
		this.makeInterval = function () {
			this.intervalo = setInterval(() => {
				if (!this.change) {
					this.element.classList.add('change__image');
					this.pointMake();
				} else {
					this.element.classList.remove('change__image');
					this.pointMake();		
				}
			}, 7000);
		}
		this.stopInterval = function () {
			clearInterval(this.intervalo);
		}
		this.element.addEventListener('mouseover', (e) => {
			this.stopInterval();
			this.change = false;
			this.element.classList.add('change__image');
			setTimeout(() => {
				this.point.classList.add('change--point--hover');
			}, 1000);
			this.pointMake();
		})
		this.element.addEventListener('mouseleave', (e) => {
			this.element.classList.remove('change__image');
			this.point.classList.remove('change--point--hover');
			this.pointMake();
			this.makeInterval();
		})
		this.init = function () {
			this.makeInterval();
		} 
	}
	function callMapFigure () {
		const $mapFigure = document.querySelector('.map__box');
		$mapFigure.app = new MapFigure($mapFigure);
		$mapFigure.app.init();
	}

	callMapFigure();
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
