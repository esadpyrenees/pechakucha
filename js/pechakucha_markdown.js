// ぺちゃくちゃ

// 'content_source' and 'style_source' — local files or remote ones
// can be set on the body as data-attributes
const content_source = document.body.dataset.source; 
const style_source = document.body.dataset.style;

const md = window.markdownit('default', {
  html: true,
  linkify: true,
  typographer: true,
  quotes: ['«\xA0', '\xA0»', '‹\xA0', '\xA0›']
});


// fetch content
fetch(content_source)
  .then(response => response.text())
  .then(text => {    
    // split text in slides with "---" seperator
    return text.split("\n---\n"); 
  }).then( parts => {
    parts.forEach(part => {
      
      // create article
      const article = document.createElement('article');

      // split text in lines and filter "special" cases.
      var lines = part.trim().split("\n").filter(function(line) {
				// check classes (if line starts with "class:")
				if (line.trim().startsWith("class:")){					
        	article.className  = line.split(":")[1];
					return false;
				}
				// ignore lines starting with //
        return !line.startsWith('//');
      });

      // glue lines and parse markdown
      let t = lines.join("\n");    
      let html = md.render(t);

      // inject content, wrapped within span
      article.innerHTML = html;   
      // wrap content in a span
			article.querySelectorAll('h1, h2, h3, h4, p, blockquote').forEach(el => {
				el.innerHTML = `<span>${el.innerHTML}</span>`;
			})
      // populate articles list
      articles.push(article);
      document.querySelector('main').appendChild(article);
    });

    // 
    if(style_source){
      fetch(style_source)
      .then(response => response.text())
      .then(css_text => {    
        // create stylesheet
        const link = document.createElement("style");
        link.textContent = css_text;
        document.querySelector("head").appendChild(link);
        // init PK
        initPechaKucha();
      })
    } else{
      initPechaKucha();
    }
  });
