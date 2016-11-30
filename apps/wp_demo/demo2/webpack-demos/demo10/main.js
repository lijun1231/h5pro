require.ensure(['./a'], function(require) {
  var content = require('./a').sayHello();
  document.open();
  document.write('<h1>' + content + '</h1>');
  document.close();
});
