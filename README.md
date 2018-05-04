# SpriteBG
Pure javascript image sprite animation engine.

# Usage
```javascript
var SPRITE = new SpriteBG({
     selector:         '#sprite-anim',
     frames:           55,
     playOnRender:     true,
     loop:             true,
     fps:              Math.round(1000/29),
     backgroundColor:  '#FFFFFF',
     onPlayheadChange: function(){},
     onLoad:           function(){ this.render(); },
     onPlayComplete:   function(){}
}, {
     image:            'spritesheet.png',
     height:           2400
});
```
