
	let idx = 0;

	const articles = document.querySelectorAll('article'),
		bar = document.getElementById('bar');

	// affichage du premier article
	articles[0].classList.add('visible');

	// attribution d’un id à chaque article
	articles.forEach(function(el, index, array){
		el.id = "article-" + index;
	})
	

	// navigation au clavier (flèches directionelles)
	document.body.onkeydown = function(e){
		if(e.keyCode == 37 || e.keyCode == 39) e.preventDefault();
		if (e.keyCode == 37) changeSlide('left');
	    if (e.keyCode == 39) changeSlide('right');
	};


	// rafraichissement de page
	if(window.location.hash) {
		var myidx = window.location.hash.replace("#article-", '')
		var el = document.querySelector(window.location.hash)
		idx = Array.prototype.indexOf.call(articles, el) - 1;
		changeSlide('right');
	}
	

	// changement de slide
	function changeSlide(direction){

		// animation
		bar.classList.remove('animated');
		void bar.offsetWidth;
		bar.classList.add('animated');
	  	
	  	// quelle direction ?
	  	if (direction == 'right') {
	  		idx = idx == articles.length - 1 ? 0 : idx + 1;
	  	} else {
	  		idx = idx == 0 ? articles.length - 1 : idx - 1;
	  	}	


	  	articles.forEach(function(el, index, array){

	  		// Si c’est la slide qu’on veut afficher
	  		if (index == idx) {
	  			el.classList.add('visible');

	  			// change le “hash” dans l’URL
	  			history.pushState(null, el.id, '#' + el.id);

	  			// auto build iframes
	  			let embed = el.querySelectorAll('.embed')[0] || null
	  			if (embed !== null) {
	  				let iframe = document.createElement('iframe');
	  				iframe.src = embed.getAttribute('rel') + '?rel=0';
	  				iframe.setAttribute('width', 854);
	  				iframe.setAttribute('autoplay', 'true');
	  				iframe.setAttribute('height', 480);
	  				iframe.setAttribute('frameborder', 0);
	  				embed.appendChild(iframe);
	  				embed.className = 'embedded';
	  			}

	  			// autoplay videos
	  			let video = el.querySelectorAll('video')[0] || null;
	  			if (video) video.play();
	  		}
	  		// Sinon
	  		else {
	  			el.classList.remove('visible');
	  			// paude videos
	  			let video = el.querySelectorAll('video')[0] || null;
	  			if (video) video.pause();
	  		}	 		
	  	})
	}

	