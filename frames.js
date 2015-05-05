;(function() {
  function toArray(value) {
    return Array.prototype.slice.call(value);
  }
  function autoResize(node){
    var elem = typeof node === 'string' ? document.getElementById(node) : node;
    var newheight = Math.ceil(elem.contentWindow.document.documentElement.scrollHeight);
    elem.height= (newheight + 1) + "px";
  }
  function init() {
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

    luigi.get(node.dataset.source, function(data) {
      var src = frame.contentWindow.document;
      src.open();
      src.write(data);
      src.close();
      styles.forEach(function(styleElement) {
        var firstChild = src.head.firstChild;
        src.head.insertBefore(styleElement.cloneNode(true), firstChild);
      });
      autoResize(frame);
    });
  }

  function resizeAll() {
    var nodes = toArray(document.querySelectorAll('[data-role="frame"] iframe'));
    nodes.forEach(function(node) {
      autoResize(node);
    });
  }

  function Frames() {
    /* empty for the time being! */
  }

  Frames.init = init;
  Frames.autoResize = autoResize;
  Frames.resizeAll = resizeAll;

  window.Frames = Frames;

  window.onload = init;
}());
