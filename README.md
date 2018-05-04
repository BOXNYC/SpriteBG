# SpriteBG
Pure javascript image sprite animation engine.

# Usage
```javascript
var SPRITE = new SpriteBG({
     selector:         '#sprite-anim',
     image:            'spritesheet.png',
     frames:           55,
     width:            302,
     height:           222,
     playOnRender:     true,
     fps:              Math.round(1000/29),
     backgroundColor:  '#FFFFFF',
     onPlayheadChange: function(){},
     onLoad:           function(){}
});
SPRITE.render();
```
