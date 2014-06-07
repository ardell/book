# Autopub

## About

A tool to automate generation of epub and mobi (Amazon Kindle) files from
Markdown source. Based on: http://puppetlabs.com/blog/automated-ebook-generation-convert-markdown-epub-mobi-pandoc-kindlegen

## Installation

Note: assumes installation on OS X using homebrew (http://brew.sh).

1. Install pandoc: `brew install pandoc`
1. Install kindlegen: `brew install homebrew/binary/kindlegen`
1. (optional) Install epubcheck `brew install epubcheck`
1. Clone this repository 

## Writing

All your writing goes in the `src` (pronounced "source") directory. Chapters
will be included in alphabetical order, which is why by default they are named
beginning with prefixes of "01-", "02-", etc.

## Generating

To generate both epub and mobi files, simply execute `rake` from the base of
the repository.

If you have epubcheck installed, autopub will verify your epub file before
generating mobi files. Any validation errors will be printed to the screen and
the mobi file will not be updated.

## Previewing

- Adobe's free [Digital Editions EPUB reader](http://www.adobe.com/products/digital-editions.html)
- Amazon's [Kindle Previewer](http://www.amazon.com/gp/feature.html/?docId=1000765261)

