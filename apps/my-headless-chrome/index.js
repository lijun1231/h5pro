const CDP = require("chrome-remote-interface");

CDP(client => {
  // extract domains
  const { Network, Page } = client;
  // setup handlers
  Network.requestWillBeSent(params => {
    console.log(params.request.url);
  });
  Page.loadEventFired(() => {
    client.close();
  });
  // enable events then start!
  Promise.all([Network.enable(), Page.enable()])
    .then(() => {
      return Page.navigate({ url: "http://test.sankuai.com/h5pro/apps/demo/src/index_.html#main" });
    })
    .catch(err => {
      console.error(err);
      client.close();
    });
}).on("error", err => {
  // cannot connect to the remote endpoint
  console.error(err);
});
