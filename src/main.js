require('./main.css')


function print(text) {
  document.write(`${text} <br>`)
}

print('test')
print('test')
print('test')
print('test')


var moment = require('moment');


print(`moment().format() ${moment().format()}`)



// ----------------- require.ensure
// https://webpack.js.org/guides/code-splitting-require/
// コード分​​割 - require.ensureを使用する

require('./a')
require.ensure([], (require)=> {
  require('./b')
})




// ----------------- require with expression
// https://webpack.js.org/guides/dependency-management/
// モジュールをダイナミックに読み込む
// const header = 'header'
// const test = require("./template/" + header + ".ejs")


// print(test({ title: 'へっだーです'}))



