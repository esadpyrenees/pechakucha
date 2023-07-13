# Pecha Kucha

Pechakucha or Pecha Kucha (from Japanese ペ チ ャ ク チ ャ: “chat”, “conversation sound”) is a format synchronizing an oral presentation to the projection of 20 slides successively every 20 seconds, preferably without animation effects. The presentation thus lasts exactly 6 minutes and 40 seconds. This format imposes eloquence, a sense of storytelling, rhythm, conciseness, as well as graphic expression.

## Download

You can download the latest version of the source code by clicking the “Clone or Download” button, or by going [here](https://github.com/esapyrenees/pechakucha/releases) to grab the latest stable release.

A demo can be found on https://ateliers.esad-pyrenees.fr/pechakucha.

## Usage

This repository contains an HTML file with related javascript and CSS files. You’re invited modify the `index.html` source code. This file contains 21 `<article>` (the first one is the “cover”), which can embed images, videos, webpages iframes or short texts. 

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

### Navigating

Typing on `ENTER` on the keyboard starts the presentation. At the bottom of the page, an animated bar starts to cross the screen, telling the time left on each slide.

Typing on keyboard arrows (`←` and `→`) allows to go from one slide to another.

A grid view is accessible by typing `ESC`. It allows to quickly jump to a specific slide.

Body font-size can be adjusted by typing `-` or `+`.


## Print / export to pdf

Thanks to [Yann Trividic](https://yanntrividic.fr/), this script can export a PDF version of the presentation. The file `genpdf.sh` is responsible for the export.

You’ll need to make it executable (`chmod +x genpdf.sh`), have [Chromium](https://www.chromium.org/Home/) browser installed and accessible from command line, as well as a PDF utility that can merge pdf files (ie. [pdfunite](https://poppler.freedesktop.org/), [qpdf](https://qpdf.sourceforge.io/), or [Ghostscript](https://www.ghostscript.com/)).

Then, you can run it:

```sh
./genpdf.sh http://localhost/pechakucha --keep
```