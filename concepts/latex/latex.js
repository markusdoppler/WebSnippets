// or ES Modules
// import latexjs from "https://cdn.jsdelivr.net/npm/latex.js@0.11.1/dist/latex.esm.js"



// var text = "Hi, this is a line of text."
// var text = "\\tfrac{\\partial L}{\\partial q} - \\tfrac{\\text{d}}{\\text{d}t} \\tfrac{\\partial L}{\\partial \\dot{q}} = 0"
var text = "delta S = 0"

var generator = new latexjs.HtmlGenerator({ hyphenate: false })

generator = latexjs.parse(text, { generator: generator })

document.body.appendChild(generator.stylesAndScripts("https://cdn.jsdelivr.net/npm/latex.js@0.11.1/dist/"))

document.getElementById("equation").appendChild(generator.domFragment())






// let latex = "Hi, this is a line of text."
// let generator = new HtmlGenerator({ hyphenate: false })
// let doc = parse(latex, { generator: generator }).htmlDocument()
// console.log(doc.outerHTML)
