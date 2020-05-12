// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last");
var x = localStorage.getItem("x"); //获取本地的x

var xObject = JSON.parse(x); //null

var hashMap = xObject || [{
  logo: "W",
  url: "https://www.w3school.com.cn"
}, {
  logo: "G",
  url: "https://github.com"
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, ""); //正则表达式，删除以/开头的内容
};

var render = function render() {
  //渲染哈希
  $siteList.find("li:not(.last)").remove(); //删除之前的li

  hashMap.forEach(function (node, index) {
    //当前元素和下标
    //遍历哈希
    var $li = $("<li>\n    <div class=\"site\">\n      <div class=\"logo\">".concat(node.logo, "</div>\n      <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n      <div class=\"close\">\n      <svg class=\"icon\">\n         <use xlink:href=\"#icon-close\"></use>\n      </svg>\n      </div>\n    </div>\n    </li>")).insertBefore($lastLi); //在最后一个前插入

    $li.on("click", function () {
      window.open(node.url); //用js代替a标签
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation(); //阻止冒泡,跳转到a

      console.log(hashMap);
      hashMap.splice(index, 1); //index中删除一个

      render();
    });
  });
};

render();
$(".addButton").on("click", function () {
  var url = window.prompt("请问你要添加的网址是？"); //prompt提醒

  if (url.indexOf("http") !== 0) {
    // alert("请输入http开头的网址");
    url = "https://" + url;
  }

  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    //toUpperCase()首字母大写
    url: url
  });
  render(); //调用
});

window.onbeforeunload = function () {
  //用户退出之前触发
  var string = JSON.stringify(hashMap);
  localStorage.setItem("x", string); //存储到本地的x
};

$(document).on("keypress", function (e) {
  var key = e.key; //const {key}=e

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.f36c556e.js.map