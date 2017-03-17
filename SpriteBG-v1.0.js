function SpriteBG() {
  //'use strict'; // Changing arguments breaks with strict mode. Cloe arguments array to put it back
  var currentFrame = 0,
      settings = false,
      sprites = [],
      baseStyleAdded = false,
      baseStyle = false,
      positionStyleAdded = false,
      positionStyle = false,
      head = false,
      playInterval,
      und = function(v){
        return typeof v === 'undefined' || v == null;
      },
      val = function(v) {
        switch(typeof v) {
          case 'string' : return eval('function(){return '+v+'}();');
          case 'number' : return v;
          case 'function' : return v();
        }
        return parseFloat(v);
      };
  for(var a in arguments) {
    if(a == 0) {
      settings = arguments[a];
      if(typeof settings !== 'object')
        return console.error('SpriteBG: First argument must be an object.');
      if(und(settings.frames))
        return console.error('SpriteBG: First argument must be your settings object despicting at least the ammount of frames.');
      if(und(settings.selector)) settings.selector = 'body';
      if(und(settings.curtainAbove)) settings.curtainAbove = false;
      if(und(settings.curtainAboveHeight)) {
        if(settings.curtainAbove) return console.error('SpriteBG: If curtainAbove is set, you must also set curtainAboveHeight');
        settings.curtainAboveHeight = false;
      };
      if(und(settings.curtainAboveOffset)) settings.curtainAboveOffset = 0;
      if(und(settings.curtainBelowOffset)) settings.curtainBelowOffset = 0;
      if(und(settings.curtainBelow)) settings.curtainBelow = false;
      if(und(settings.backgroundColor)) settings.backgroundColor = false;
      if(und(settings.attachment)) settings.attachment = 'fixed';
      if(und(settings.playOnRender)) settings.playOnRender = false;
      if(und(settings.fps)) settings.fps = Math.round(1000/29);
        else settings.fps = Math.round(1000/settings.fps);
      if(und(settings.onPlayheadChange)) settings.onPlayheadChange = false;
      if(und(settings.onLoad)) settings.onLoad = false;
      continue;
    };
    var options = arguments[a];
    if(typeof options.image === 'string') options.image = [options.image];
    if(typeof options.height === 'number') options.height = [options.height];
    if(und(options.x)) options.x = 0;
    if(und(options.y)) options.y = 0;
    options.totalHeight = 0;
    for(var heightIndex in options.height) options.totalHeight += options.height[heightIndex];
    options.frameHeight = options.totalHeight / settings.frames;
    sprites.push(options);
  };
  
  function addBaseStyle() {
    if(baseStyleAdded) return;
    head = document.getElementsByTagName('head')[0];
    var images = [],
        repeat = [];
    if(settings.curtainAbove) {
      images.push(settings.curtainAbove);
      repeat.push('repeat-x');
    };
    if(settings.curtainBelow) {
      images.push(settings.curtainBelow);
      repeat.push('repeat-x');
    };
    for(var spriteIndex in sprites) {
      var sprite = sprites[spriteIndex];
      for(var imageIndex in sprite.image) {
        images.push(sprite.image[imageIndex]);
        repeat.push(und(sprite.repeat) ? 'no-repeat' : sprite.repeat);
      };
    };
    var baseCSS = settings.selector + ' {' +
                    (!settings.backgroundColor ? '' : 'background-color: '+settings.backgroundColor+' !important;')+
                    'background-attachment: '+settings.attachment+' !important;'+
                    'background-image: url("' + images.join('"), url("') + '") !important;'+
                    'background-repeat: ' + repeat.join(', ') + ' !important;'+
                  '}';
    baseStyle = document.createElement('style');      
    baseStyle.type = 'text/css';
    baseStyle.innerHTML = baseCSS;
    head.appendChild(baseStyle);
    baseStyleAdded = true;
  };
  
  this.seek = function(frame) {
    addBaseStyle();
    var positions = [];
    if(settings.curtainAbove && settings.curtainAboveHeight) {
      var cay = val(sprites[0].y) - settings.curtainAboveHeight;
      cay += settings.curtainAboveOffset;
      positions.push(0 + ' ' + Math.round(cay) + 'px');
    };
    if(settings.curtainBelow) {
      var cby = val(sprites[0].y) + sprites[0].frameHeight;
      cby += settings.curtainBelowOffset;
      positions.push(0 + ' ' + Math.round(cby) + 'px');
    };
    for(var spriteIndex in sprites) {
      var sprite = sprites[spriteIndex],
          x = val(sprite.x),
          y = val(sprite.y);
      for(var heightIndex in sprite.height) {
        var goToFrame = (frame > settings.frames-1) ? settings.frames-1 : frame,
            offset = (sprite.frameHeight * goToFrame);
        positions.push(Math.round(x) + 'px ' + Math.round(y-offset) + 'px');
        y += sprite.height[heightIndex];
      };
    };
    var CSS = settings.selector + ' { background-position: ' + positions.join(', ') + ' !important; }';
    if(!positionStyleAdded) {
      positionStyle = document.createElement('style');
      positionStyle.type = 'text/css';
      positionStyle.innerHTML = CSS;
      head.appendChild(positionStyle);
      positionStyleAdded = true;
    } else {
      if(CSS != positionStyle.innerHTML) positionStyle.innerHTML = CSS;
    };
    if(frame != currentFrame && settings.onPlayheadChange) {
      settings.onPlayheadChange({
        frame: frame,
        percent: frame / settings.frames
      });
    };
    currentFrame = frame;
  };
  
  this.render = function(){
    this.seek(currentFrame);
    if(settings.playOnRender) this.play();
  };
  
  this.onLoad = function(onLoad){
    if(typeof sprites[0] === 'undefined') return;
    if(typeof sprites[0].image === 'undefined') return;
    var self = this,
        image = sprites[0].image[0],
        img = new Image();
    img.onload = function() {
      var renderOnLoad = onLoad(image);
      if(renderOnLoad) self.render();
    };
    img.src = image;  
  };
  
  this.play = function(){
    var self = this;
    clearInterval(playInterval);
    playInterval = setInterval(function(){
      var nextFrame = currentFrame + 1;
      if(nextFrame > settings.frames) {
        if(typeof settings.loop !== 'undefined' && settings.loop == true) {
          nextFrame = 0;
          self.seek(nextFrame);
        } else {
          self.stop();
        };
      } else {
        self.seek(nextFrame);
      };
    }, settings.fps);
  };
  
  this.playTo = function(frame){
    var self = this;
    clearInterval(playInterval);
    playInterval = setInterval(function(){
      if(frame == currentFrame) return self.stop();
      if(frame < currentFrame) {
        self.seek(currentFrame - 1);
      } else if(frame > currentFrame) {
        self.seek(currentFrame + 1);
      };
    }, settings.fps);
  };
  
  this.stop = function() {
    clearInterval(playInterval);
  };
  
  this.kill = function() {
    if(baseStyle) baseStyle.parentElement.removeChild(baseStyle);
    if(positionStyle) positionStyle.parentElement.removeChild(positionStyle);
    baseStyleAdded = positionStyleAdded = false;
    sprites = [];
    settings = false;
  };
  
  if(settings.onLoad) this.onLoad(settings.onLoad);
  
};
