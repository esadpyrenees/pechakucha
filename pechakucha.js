
	var idx = 0,
		articles = document.querySelectorAll('article'),
		prev = document.getElementById('prev'),
		next = document.getElementById('next'),
		bar = document.getElementById('bar');

	articles[0].classList.add('visible');
	
	
	prev.addEventListener('click', changeSlide, false);
	prev.direction = 'left';
	next.addEventListener('click', changeSlide, false);
	next.direction = 'right';

	document.body.onkeydown = function(e){
		if(e.keyCode == 37 || e.keyCode == 39) e.preventDefault();
		if (e.keyCode == 37) prev.click();
	    if (e.keyCode == 39) next.click();
	};

	
	function changeSlide(evt){
		bar.classList.remove('animated');
		void bar.offsetWidth;
		bar.classList.add('animated');
	  	
	  	if (evt.target.direction == 'right') {
	  		if (idx == articles.length - 1) idx = 0;
	  		else idx ++;
	  	} else {
	  		if (idx == 0) idx = articles.length - 1;
	  		else idx --;
	  	}	

	  	articles.forEach(function(el, index, array){
	  		if (index == idx) el.classList.add('visible');
	  		else el.classList.remove('visible');	 		
	  	})
	}

	