# frames
A web components library that uses iframes instead of shadow DOM.

See a demo here https://lucianbuzzo.github.io/frames/.

## Usage

```html
<div data-role="frame" data-source="bits/title.html"></div>
<script src="frames.js"></script>
<script>
  // Render all frame nodes
  Frames.init();

  // Or target a subset by selector / element / node list
  Frames.init('[data-role="frame"]');
</script>
```
