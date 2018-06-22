# SpriteBG
Pure javascript image sprite animation engine.

# Usage
```javascript
var SPRITE = new SpriteBG({
     selector:         '#sprite-anim',
     frames:           55,
     playOnRender:     true,
     loop:             true,
     fps:              29, // Eq: Math.round(1000/29),
     backgroundColor:  '#FFFFFF',
     onPlayheadChange: function(event){ console.log(event); },
     onLoad:           function(){
          this.render();
          // this.play();
     },
     onPlayComplete:   function(event){ console.log(event); }
}, {
     image:            'spritesheet.png',
     height:           2400
});
```

# Multiple cascading-stacked sprite sheets
```javascript
var SPRITE = new SpriteBG({
     selector:         '#sprite-anim',
     frames:           55,
     onLoad:           function(){
          this.render();
     }
}, {
     image:            'spritesheet.0.png',
     height:           2400
}, {
     image:            'spritesheet.1.png',
     height:           2400
}, {
     image:            'spritesheet.2.png',
     height:           2400
});
```

# Usefull links
1. https://instantsprite.com/ ~ Creates a sprite out of images sequences!
2. https://www.iloveimg.com/crop-image ~ Crops HUGE images PhotoShop wont!
3. https://www.iloveimg.com/resize-image ~ Resizes HUGE images PhotoShop wont!
4. http://compresspng.com/ ~ Compresses PNGs down to nothing!
