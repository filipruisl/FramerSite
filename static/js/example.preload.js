// Generated by CoffeeScript 1.6.2
(function() {
  var loadingElement, preload;

  Framer._rootElement = document.createElement("div");

  Framer._rootElement.id = "FramerRoot";

  loadingElement = document.createElement("div");

  loadingElement.innerHTML = "Loading";

  loadingElement.style.position = "fixed";

  loadingElement.style.top = "20px";

  loadingElement.style.left = "20px";

  loadingElement.style.font = "12px/1em Menlo";

  loadingElement.style.display = "none";

  utils.domComplete(function() {
    return document.body.appendChild(loadingElement);
  });

  utils.delay(400, function() {
    return loadingElement.style.display = "block";
  });

  preload = function(callback) {
    var Views, ViewsToLoad, addView, documentName;

    addView = function(info) {
      info.children.map(addView);
      return Views.push(info);
    };
    Views = [];
    ViewsToLoad = [];
    for (documentName in FramerPS) {
      FramerPS[documentName].map(addView);
    }
    return Views.map(function(info) {
      var loader;

      if (info.image) {
        ViewsToLoad.push(info.image.path);
        loader = new Image();
        loader.src = info.image.path;
        return loader.onload = function() {
          ViewsToLoad = _.without(ViewsToLoad, info.image.path);
          console.log(info.image.path, "loaded", ViewsToLoad.length);
          loadingElement.innerHTML = "Loading " + (ViewsToLoad.length + 1);
          if (ViewsToLoad.length === 0 ? callback : void 0) {
            return callback();
          }
        };
      }
    });
  };

  utils.delay(0, function() {
    return preload(function() {
      return utils.domLoadScript("framer/framerps.js", function() {
        return utils.domLoadScript("app.js", function() {
          return utils.delay(0, function() {
            return document.body.appendChild(Framer._rootElement);
          });
        });
      });
    });
  });

}).call(this);