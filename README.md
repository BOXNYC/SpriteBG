# SpriteBG
Pure javascript image sprite animation engine.

# Usage
`
var SPRITE = new SpriteBG({
     image: ,
     frames: 55,
     width: ,
     height: ,
     playOnRender: true,
     fps: Math.round(1000/29),
     selector: '#sprite-anim',
     backgroundColor: '#FFFFFF'
     onPlayheadChange: function(){},
     onLoad: function(){}
});
SPRITE.render();
`
