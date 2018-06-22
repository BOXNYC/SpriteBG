# SpriteBG
Pure javascript image sprite animation engine.

# Basic Usage
Renders an plays a single-file sprite animation, and loops it.
```javascript
var SPRITE = new SpriteBG({
     selector:         '#sprite-anim',
     frames:           55,
     playOnRender:     true,
     loop:             true,
     fps:              15, // Eq: Math.round(1000/15),
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

# Basic API Usage
Renders an plays a single-file sprite animation, and loops it.
```javascript
var okToPlay = false;
var SPRITE = new SpriteBG({
     selector:         '#sprite-anim',
     frames:           55,
     onLoad:           function(){
          this.render();
          okToPlay = true;
     }
}, {
     image:            'spritesheet.png',
     height:           2400
});

document.getElementById('play-btn').addEventListener('click', function(){
     if(okToPlay) SPRITE.play();
}, false);
```

# Multiple cascading-stacked sprite sheets
Using multiple sprite sheets is good for insanely long animations, AKA HUGE sprite sheets. The Spritesheets are laid out using CSS3's multiple background image ability.
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
