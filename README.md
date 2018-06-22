# SpriteBG
Pure javascript image sprite animation engine.

```javascript
new SpriteBG( settingsObject, imageSettingsObject0, [imageSettingsObject1], [...] )
```

# Settings Object
frames : **required** *integer*
`*The total ammount of frames for the entire spritesheet.*`

selector : *string* Default: `'body'`
*The HTML element that will retrieve the background CSS styling.*

backgroundColor: *string* Default: `false`
*If set, set the element's CSS background-color style.*

attachment: *string* Default: `'scroll'`
*If set, sets the element's CSS background-attachment style. (scroll, fixed)*

playOnRender: *bool* Default: `false`
*If set to true, when the render occurs, so will play.*

fps: *number* Default: `29`
*The framerate the animation will play. It basically sets the delay between rendering to `Math.round(1000/setting.fps)`*

onPlayheadChange: *function* Default: `false`
*If set will be called when the frame is changed. Passes an informative event.*

onLoad: *function* Default: `false`
*If set will be called when all sprite sheets are loaded. Passes an informative event.*

onPlayComplete: *function* Default: `false`
*If set will be called everytime the animation plays to the last frame. Passes an informative event.*

# Image Settings Object
- image: **required** *string*
- height: **required** *integer*

# API
- SpriteBG.seek(frame)
- SpriteBG.render()
- SpriteBG.onLoad(onLoad)
- SpriteBG.play()
- SpriteBG.playTo(frame)
- SpriteBG.stop()
- SpriteBG.kill()

# Examples

## Basic Usage Example
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

## Basic API Usage Example
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

## Multiple Cascading-stacked Sprite Sheets Example
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
