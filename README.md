# SpriteBG
Pure javascript image sprite animation engine.

```javascript
new SpriteBG( settingsObject, imageSettingsObject )
```

# Settings Object
frames : **required** *integer*
*`The total ammount of frames for the entire spritesheet.`*

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
- image: **required** *string/array*
- height: **required** *integer/array*

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
     image:            ['spritesheet.0.png', 'spritesheet.1.png', 'spritesheet.2.png'],
     height:           [2400, 2400, 2400]
});
```

# Usefull links
1. https://instantsprite.com/ ~ Creates a sprite out of images sequences!
2. https://www.iloveimg.com/crop-image ~ Crops HUGE images PhotoShop wont!
3. https://www.iloveimg.com/resize-image ~ Resizes HUGE images PhotoShop wont!
4. http://compresspng.com/ ~ Compresses PNGs down to nothing!
5. https://image.online-convert.com/convert-to-jpg ~ Convert video to jpgs


# Future
[v1.1](../../tree/1.1)) Infinite constructor arguments with type checking for setting of options and images options. Retaining array option for image options attributes.

v1.2) Add data attribute auto initiators (`<div data-spritebg="frames=55&image=img1.png|2400,img2.png|2400"></div>`) and jQuery plugin.

v1.3) Set selector element size if selector is not body or html element.

v2.0) Get image option height dynamically. Remove image option as object, only accept string or array of strings.

v3.0) Add low-res low-quality quick image loading system

v4.0) Add horizontal and rows/colums sprite sheet layouts.


Optimization after line 111:
```
if(cssOffset <= 0 && cssOffset > -(sprite.height[heightIndex]+sprite.frameHeight)) {} else { offset = -sprite.height[heightIndex]; }
```
