#!/bin/bash

: '
@file Works in pair with the pechakucha.js script.
      Allows to export a PDF of all the slides using headless Chromium driver.
@dependencies In order to use this, you need to have Chromium installed 
      (it does better pdf exports than Firefox) and a bash interpreter.
      Pdfunite is also needed as it’s used to merge PDFs files, but other libs can do the same,
      namely QPDF or Ghostscript
@author Yann Trividic + Julien Bidoret
@license GPLv3
@see https://github.com/esadpyrenees/pechakucha
@usage ./genpdf.sh http://localhost/pechakucha --keep
'

# URL to print (should be something like http://localhost/pechakucha)
url=$1
# Whether to keep or not temp PDF files (omiting -k or --keep from the command will remove temp files) 
keep=$2
# Number of pages (guessed by counting occurences of "<article")
articles_count=$(grep -o "<article" index.html | wc -l)
let "length = $articles_count - 1"
# Temporary folder
tmpfolder='pdf'
mkdir $tmpfolder
# String that contains each pdf path
pdfs=''

# Generate a pdf for each article
for c in $( eval echo {0..$length} )
do
  pdf="article-$c.pdf"
  printf "Processing page $c ($pdf)\n"
  urlarticle="$url/index.html#article-$c"
  pdfs="$pdfs $tmpfolder/$pdf"
  chromium-browser --headless --disable-software-rasterizer --run-all-compositor-stages-before-draw --disable-force-compositing-mode --disable-gpu --no-margins --no-pdf-header-footer --print-to-pdf=$tmpfolder/$pdf $urlarticle
done

# merge the temp files with pdfunite:
pdfunite $pdfs output.pdf

# Or alternatively with QPDF: 
# qpdf --empty --pages $pdfs -- output.pdf

# Or even with Ghostscript:
# gs -q -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress -o output.pdf $pdfs

# Remove temp files
if [ "$keep" != "--keep" -a "$keep" != "-k" ];
then
  rm -rf $tmpfolder
fi