# Pecha Kucha

Pechakucha or Pecha Kucha (from Japanese ペ チ ャ ク チ ャ: “chat”, “conversation sound”) is a format synchronizing an oral presentation to the projection of 20 slides successively every 20 seconds, preferably without animation effects. The presentation thus lasts exactly 6 minutes and 40 seconds. This format imposes eloquence, a sense of storytelling, rythm, conciseness, as well as graphic expression.

This project allow to build slideshows in HTML or in Markdown, accessibles in the browser or printable through your browser builtin PDF export function.

## Download

You can download the latest version of the source code by clicking the “Clone or Download” button, or by going [here](https://github.com/esapyrenees/pechakucha/releases) to grab the latest stable release.

A demo can be found on https://ateliers.esad-pyrenees.fr/pechakucha.

## Two modes ✌

Slides can be set in raw HTML, like in `index.html`, or be generated through markdown, like in `markdown.html`.

Markdown mode can load content from a local file or any remote one. That’s especially interesting when using a pad to collaboratively produce a slideshow. 

### Navigating

Typing on `ENTER` on the keyboard starts the presentation. At the bottom of the page, an animated bar starts to cross the screen, telling the time left on each slide.

Typing on keyboard arrows (`←` and `→`) allows to go from one slide to another.

A grid view is accessible by typing `ESC` or `Space`. It allows to quickly jump to a specific slide.

Body font-size can be adjusted by typing `-` or `+`.

### Timer

In standard PechaKucha mode, a timer bar is shown at the bottom of every slide, running for 20 seconds.

To disable this behaviour, set `pechakucha_timer_mode` to `false` in `js/pechakucha.js`. You can then set a global duration. 

You can even get rid of the `<div id="bar">` element in the HTML code.

## Markdown usage

By setting `data-source` and `data-style` on the `<body>` element, you can load contents from any text file, local or remote. Of course, loading local CSS via the `data-style` attribute makes no sense, but is powerful when editing styles collectively on a pad.

/!\ This mode requires the slideshow to be accessed through a web server.

```html
<body
  data-source="source.md">
```
Or use some pads as content and style provider:

```html
<body
  data-source="https://pads.whatever.net/p/pad_id/export/txt"
  data-style="https://pads.whatever.net/p/css_pad_id/export/txt">
```
Different slides are separated by three dashes (`---`).

Lines starting with `//` are ignored.

Slides can be styled via CSS by starting à line with the term `class:` followed by any class names. Look at `media/source.md` example.

Images can be embedded via the common markdown syntax :
```markdown
![Local file alt text](media/filename.jpg)
![Remote file alt text](https://example.com/filename.jpg)
```
Videos and Iframes can be embedded via their HTML markup.

## HTML usage

This repository contains an HTML file (`index.html`) with related javascript and CSS files.  
This file contains 21 `<article>` (the first one is the “cover”) that can embed images, videos, webpages iframes or short texts. 
```html
<article>
  <p>A simple text</p>
</article>
```

### Images & videos
```html
<!-- a simple image -->
<article>
  <img src="media/sky.png">
</article>

<!-- an image with cover class -->
<article class="cover">
  <img src="media/sky.png">
</article>

<!-- a simple video -->
<article>
  <video src="media/sun.webm" loop></video>
</article>
```
### Webpages or remote videos

You can embed iframes (a web page, a youtube/vimeo). Enter as attribute `rel` of a `<div class="embed">` the URL of the video embed code or the webpage URL (it won't always work :)

```html
<!-- a youtube video -->
<article>
  <div class="embed" rel="https://www.youtube.com/embed/deuhXlqHB9I"></div>
</article>

<!-- a webpage -->
<article>
  <div class="embed" rel="https://ateliers.esad-pyrenees.fr/"></div>
</article>
```

### Texts
Text can be embedded with various body-sizes : `smalltext`, `bigtext` or `hugetext`.
```html
<article>
  <div>
    <p class="hugetext">huge</p>
  </div>
</article>
```


## Print / export to pdf

You can export the slideshow to PDF by printing it through your browsers builtin function (and choosing “Export to PDF”).

The slides are laid out on a 4×4 grid on each page.

Thanks to [Yann Trividic](https://yanntrividic.fr/), this script was also able to export a PDF version of the presentation via CLI. The file `genpdf.sh` is responsible for the export. Since basic CSS print is now enough, this file isn’t useful anymmore. It’s kept for souvenir ;)

You’ll need to make it executable (`chmod +x genpdf.sh`), have [Chromium](https://www.chromium.org/Home/) browser installed and accessible from command line, as well as a PDF utility that can merge pdf files (ie. [pdfunite](https://poppler.freedesktop.org/), [qpdf](https://qpdf.sourceforge.io/), or [Ghostscript](https://www.ghostscript.com/)).

Then, you can run it:

```sh
./genpdf.sh http://localhost/pechakucha --keep
```


## Credits

[Markdown-it](https://github.com/markdown-it/markdown-it) is © Vitaly Puzrin + Alex Kocharin and is released under MIT Licence.

`genpdf.sh` by Yann Trividic, and everything else by [Julien Bidoret](https://accentgrave.net) is released under Public domain via [Unlicence](https://unlicense.org).

