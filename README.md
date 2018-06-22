# SpriteBG
Pure javascript image sprite animation engine.



# Basic Usage Example
Renders an plays a single-file sprite animation, and loops it.
```javascript
var SPRITE = new SpriteBG({
     selector:         '#sprite',
     frames:           55,
     playOnRender:     true,
     loop:             true,
     fps:              15,
     backgroundColor:  '#FFFFFF',
     onLoad:           function(){
          this.render();
     }
}, {
     image:            'spritesheet.png',
     height:           2400
});
```

# Basic API Usage Example
Renders an plays a single-file sprite animation, and loops it.
```javascript
var okToPlay = false;

var SPRITE = new SpriteBG({
     selector:         '#sprite',
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

# Multiple Cascading-stacked Sprite Sheets Example
Using multiple sprite sheets is good for insanely long animations, AKA HUGE sprite sheets. The Spritesheets are laid out using CSS3's multiple background image ability.
```javascript
var SPRITE = new SpriteBG({
     selector:         '#sprite',
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
