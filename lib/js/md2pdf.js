// From: https://www.npmjs.org/package/markdown-pdf

var glob        = require("glob")
var markdownpdf = require("markdown-pdf")
var fs          = require("fs")
var through     = require("through")
var util        = require("util")
var mime        = require("mime")

var srcDir     = __dirname + "/../../src"
var distDir    = __dirname + "/../../dist"
var srcGlob    = srcDir + "/*.md"
var cssPath    = srcDir + "/styles.css"
var targetPath = distDir + "/book.pdf"

function base64Image(src) {
  var data = fs.readFileSync(src).toString("base64")
  return util.format("data:%s;base64,%s", mime.lookup(src), data)
}

var options = {
  cssPath:        cssPath,
  preProcessHtml: function () { return through(
    function write(data) {
      var dataUri = base64Image(srcDir + "/cover.jpg");
      var cover = "<div id='cover'><img src='" + dataUri + "'></div>"
      var text = "<div id='text'>" + data + "</div>"
      var html = cover + text
      this.queue(html)
    },
    function end(data) {
      this.queue(null)
    }
  )}
}
glob(srcGlob, {}, function(er, files) {
  markdownpdf(options)
    .from(files)
    .to(targetPath, function () {
      // Done
    })
})

