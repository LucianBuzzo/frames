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

  function contextWrapper(context, fn) {
    return function() {
      return fn.apply(context, arguments);
    };
  }

  function createFrame(node) {
    var frame = document.createElement('iframe');
    var styles = toArray(document.head.querySelectorAll('style, link[type="text/css"]')).reverse();

    // Can add global variables and function in here ---
    node.appendChild(frame);
    frame.contentWindow.Frames = Frames;
    for (var key in injections ) {
      if ( injections.hasOwnProperty(key) ) {
        frame.contentWindow[key] = contextWrapper(frame.contentWindow, injections[key]);
      }
    }

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

  function Frames(context, fn) {
    if ( typeof context !== undefined) {
    }
    if ( typeof fn !== undefined) {
      for (var key in extensions ) {
        extend.call(context, key, extensions[key]);
      }
      fn.call(context);
    }
  }

  var extensions = {};


  function extend(key, obj) {
    if ( Frames.hasOwnProperty(key) ) {
      return;
    } else if (typeof obj === 'function') {
      this[key] = function() {
        obj.apply(this, arguments);
      };
    } else {
      this[key] = obj;
    }
    extensions[key] = obj;
  }

  var injections = {};

  function inject(key, obj) {
    if ( injections.hasOwnProperty(key) ) {
      return;
    } else {
      injections[key] = obj;
    }
  }

  Frames.init = init;
  Frames.autoResize = autoResize;
  Frames.resizeAll = resizeAll;
  Frames.extend = extend;
  Frames.inject = inject;
  Frames.createFrame = createFrame;

  window.addEventListener('resize', resizeAll);
  window.Frames = Frames;
}());
