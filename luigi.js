;(function() {
  function get(url, callback) {
    var req = new XMLHttpRequest();
    req.onload = function() {
      callback(this.responseText);
    };
    req.open('get', url, true);
    req.send();
    return req;
  }
  function getJSON(url, callback) {
    return get(url, function getJSONCallback(data) {
      callback(JSON.parse(data));
    });
  }
  function pickHTML(html, elementId) {
    var regexp = new RegExp("<(?!\!)\\s*([^\\s>]+)[^>]*\\s+id\\=[\"\']" + elementId + "[\"\'][^>]*>" ,"i");
    var res = regexp.exec(html);
    console.log(res);
    return res ? (new RegExp('(?:(?:.(?!<\\s*' + res[1] + '[^>]*[>]))*.?<\\s*' + res[1] + '[^>]*[>](?:.(?!<\\s*\/\\s*' + res[1] + '\\s*>))*.?<\\s*\/\\s*' + res[1] + '\\s*>)*(?:.(?!<\\s*\/\\s*' + res[1] + '\\s*>))*.?', 'i')).exec(html.slice(html.indexOf(res[0]) + res[0].length))[0] || '' : '';
  }
  function getHTML(url, elementId, callback) {
    return get(url, function getHTMLCallback(data) {
      callback(pickHTML(data, elementId));
    });
  }
  function post(url, data, callback) {
    var req = new XMLHttpRequest();
    req.onload = function() {
      callback(req.responseText);
    };
    var segments = [];
    req.open('post', url, true);
    req.setRequestHeader('Content-Type', 'application\/json');
    req.send(JSON.stringify(data));
    return req;
  }

  var luigi = get;
  luigi.get = get;
  luigi.getJSON = getJSON;
  luigi.getHTML = getHTML;
  luigi.post = post;

  window.luigi = luigi;
}());
