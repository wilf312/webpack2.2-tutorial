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