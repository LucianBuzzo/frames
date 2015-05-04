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
      node.innerHTML = '<iframe onload="autoResize(this)" src="' + node.dataset.source + '"></iframe>';
    });
  }

  function resizeAll() {
    var nodes = toArray(document.querySelectorAll('[data-role="frame"] iframe'));
    nodes.forEach(function(node) {
      autoResize(node);
    });
  }

  window.frames = {
    init: init,
    autoResize: autoResize,
    resizeAll: resizeAll
  };
  window.onload = init;
}());
