;(function() {
  var renderedFrames = [];

  function get(url, callback) {
    var req = new XMLHttpRequest();
    req.onload = function() {
      callback(this.responseText);
    };
    req.open('get', url, true);
    req.send();
    return req;
  }
  function toArray(value) {
    return Array.prototype.slice.call(value);
  }
  function autoResize(node){
    var elem = typeof node === 'string' ? document.getElementById(node) : node;
    var newheight = Math.ceil(elem.contentWindow.document.documentElement.scrollHeight);
    elem.height= (newheight + 1) + "px";
  }
  function init(node) {
    var nodes = toArray(document.querySelectorAll('[data-role="frame"]'));
    nodes.forEach(function(node) {
      createFrame(node);
    });
  }

  function createFrame(node) {
    var frame = document.createElement('iframe');
    var styles = toArray(document.head.querySelectorAll('style, link[type="text/css"]')).reverse();

    // Can add global variables and function in here ---
    node.appendChild(frame);
    frame.contentWindow.Frames = Frames;

    get(node.dataset.source, function(data) {
      var src = frame.contentWindow.document;
      src.open();
      src.write(data);
      src.close();
      styles.forEach(function(styleElement) {
        var firstChild = src.head.firstChild;
        src.head.insertBefore(styleElement.cloneNode(true), firstChild);
      });
      autoResize(frame);
      renderedFrames.push(frame);
    });
  }

  function resizeAll() {
    renderedFrames.forEach(function(node) {
      autoResize(node);
    });
  }

  function Frames() {
    /* empty for the time being! */
  }

  function extend(key, obj) {
    if ( Frames.hasOwnProperty(key) ) {
      return;
    } else {
      Frames[key] = obj;
    }
  }

  Frames.init = init;
  Frames.autoResize = autoResize;
  Frames.resizeAll = resizeAll;
  Frames.extend = extend;
  Frames.createFrame = createFrame;

  window.addEventListener('resize', resizeAll);
  window.Frames = Frames;
}());
