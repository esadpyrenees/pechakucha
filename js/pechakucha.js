// ぺちゃくちゃ


const articles = []; // a list to contain all slides
const bar = document.getElementById('bar'); // timer bar

// initial state vraiables
let timer = null, // timer
	displaygrid = false, // initial view : grid or slide 
	basesize = 4, // font size
	idx = 0, // slide index
	pechakucha_timer_mode = true, // timer bar runs at every slide
	timer_duration = 30 * 60, // total duration used when setting pechakucha_timer_mode to false, in seconds
	has_started = false; // :)


// HTML markup slides (see markdown.html to activate markdown mode)
if(document.body.dataset.source === undefined) {
	// populate slides list
	articles.push(...document.querySelectorAll('article'));
	// go !
	initPechaKucha();
}

// ------------------------------------------------------- Init function
function initPechaKucha(){
  // affichage du premier article
  articles[0].classList.add('visible');

  // attribution d’un id et d’un attribut “data-id” à chaque article
  articles.forEach(function(article, index){
    article.id = "article-" + index;
    article.dataset.id = index;
    initGridActions(article);
  })

  // rafraichissement de page
  if(window.location.hash) {
    let myidx = window.location.hash.replace("#article-", '')
    let article = document.querySelector(window.location.hash)
    idx = Array.prototype.indexOf.call(articles, article) - 1;
    changeSlide('right');
  }

	// trigger hide mouse
	hideMouse()
}

// ------------------------------------------------------- Hide mouse
function hideMouse(){
	setTimeout(() => {
		document.body.style.cursor = "none";
	}, 1000);
}

document.body.onmousemove = () => {
	document.body.style.cursor = "unset";
	hideMouse();
}

// ------------------------------------------------------- Keyboard nav
document.body.onkeydown = function(e){
	if (e.key == "ArrowLeft") changeSlide('left');
	if (e.key == "ArrowRight") changeSlide('right');
	if (e.key == "Enter") start();
	if (e.key == "Escape" || e.key == " ") toggleGrid();      
	// typeface zoom
	if (e.key == "+") {
		basesize += .1;
		document.body.style.setProperty('--basesize', basesize + "vw")
	}
	if (e.key == "-") {
		basesize -= .1;
		document.body.style.setProperty('--basesize', basesize + "vw")
	}
};


// ------------------------------------------------------- Start timer and slideshow
function start(){
	if(!has_started){
		toggleFullScreen("on");		
		changeSlide('right');
		if(bar && !pechakucha_timer_mode) {
			let duration = timer_duration || 20 * 20;
			bar.style.setProperty('--duration', duration + "s");
			bar.classList.add('animated');
		}
		has_started = true;
	}
}


// ------------------------------------------------------- Toggle grid
function toggleGrid() {
	let body = document.body;
	if (!displaygrid) {
		body.classList.add('grid')
		displaygrid = true;
	} else {
		body.classList.remove('grid')
		displaygrid = false;
	}
}

// ------------------------------------------------------- Grid actions
function initGridActions(article){
	// en mode grille, au clic sur un article, quitte le mode grille et affiche cet article  
	article.addEventListener('click', () => {
		if(displaygrid == true) {
			let v = document.querySelector('.visible');
			if(v) v.classList.remove("visible");
			toggleGrid();
			article.classList.add('visible');
			idx = parseInt(article.dataset.id) - 1;
			changeSlide("right");
		}
	})
}

// ------------------------------------------------------- Full screen
document.body.ondblclick = function (e) {
	toggleFullScreen();
};
function toggleFullScreen(onoff) {
	// should we go FS ?
	const to_fullscreen = onoff == "on" ? true : !document.fullscreenElement;
	if (to_fullscreen) {
		document.documentElement.requestFullscreen();
	} else {
		if (document.exitFullscreen) {
				document.exitFullscreen();
		}
	}
}

// ------------------------------------------------------- Switch slides
function changeSlide(direction){
	
		// wich direction ?
		if (direction == 'right') {
			idx = idx == articles.length - 1 ? 0 : idx + 1;
		} else {
			idx = idx == 0 ? articles.length - 1 : idx - 1;
		}

		// restart timer animation
		// (if bar exists)
		if(bar && pechakucha_timer_mode){
			bar.classList.remove('animated');
			void bar.offsetWidth;
			if(idx != 0){
				bar.classList.add('animated');
			}
		}

		// check each article
		articles.forEach(function(el, index, array){

			// New slide
			if (index == idx) {
				el.classList.add('visible');
				// change “hash” in URL
				history.pushState(null, el.id, '#' + el.id);
			}

			// Other slides
			else {
				el.classList.remove('visible');
			}
		})
}


// reset embeds and pause video on leaving slide
function resetEmbeds(el) {
	let embedded = el.querySelectorAll('.embedded')[0] || null;
	if (embedded !== null) {
		let iframe = embedded.querySelectorAll('iframe')[0];
		embedded.setAttribute('rel', iframe.src);
		embedded.removeChild(iframe);
		embedded.className = 'embed';
	}

	// pause videos
	let video = el.querySelectorAll('video')[0] || null;
	if (video) video.pause();
	
}

// init embeds and play video on entering slide
function initEmbeds(el) {
	let embed = el.querySelectorAll('.embed')[0] || null
	if (embed !== null) {
		let iframe = document.createElement('iframe');
		iframe.src = embed.getAttribute('rel');
		iframe.setAttribute('width', 854);
		iframe.setAttribute('height', 480);
		iframe.setAttribute('autoplay', 'true');
		iframe.setAttribute('frameborder', 0);
		embed.appendChild(iframe);
		embed.className = 'embedded';
	}

	// autoplay videos
	let video = el.querySelectorAll('video')[0] || null;
	if (video) video.play();
}


// observe slide/viewport intersection to handle embeds
function handleIntersection(articles) {
  articles.map((entry) => {
    const el = entry.target;
    if (entry.isIntersecting) {     
      initEmbeds(el);
		} else {
			resetEmbeds(el);
    }
  });
}

const observer = new IntersectionObserver(handleIntersection);

articles.forEach(article => {
  observer.observe(article);
});

