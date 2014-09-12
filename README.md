# About

A tool to automate generation of epub and mobi (Amazon Kindle) files from
Markdown source. Based on: http://puppetlabs.com/blog/automated-ebook-generation-convert-markdown-epub-mobi-pandoc-kindlegen

# Installation

Note: assumes installation on OS X using homebrew (http://brew.sh).

1. Install pandoc: `brew install pandoc`
1. (optional) For Kindle (.mobi) support, install kindlegen: `brew install homebrew/binary/kindlegen`
1. (optional) For PDF support, install npm dependencies: `npm install`
1. (optional) To validate epub files, install epubcheck `brew install epubcheck`
1. Clone this repository 

# Writing

All your writing goes in the `src` (pronounced "source") directory. Chapters
will be included in alphabetical order, which is why by default they are named
beginning with prefixes of `01-`, `02-`, etc.

Title, author, and other metadata are specified in `src/metadata.yml`. The
cover image is located at `src/cover.jpg`.

Styles for epub and mobi files are specified in `src/styles.css`. NOTE: if you
want to customize the styles, it is best to add new rules to the bottom of the
file instead of directly changing rules at the top.

# Generating

To generate epub, mobi, and pdf files, simply execute `rake` from the base of
the repository.

If you have epubcheck installed, your epub file will be verified before
generating mobi files. Any validation errors will be printed to the screen and
the mobi file will not be updated.

# Previewing

- Adobe's free [Digital Editions EPUB reader](http://www.adobe.com/products/digital-editions.html)
- Amazon's [Kindle Previewer](http://www.amazon.com/gp/feature.html/?docId=1000765261)

