!function(e,t){function r(){var e=v.elements;return"string"==typeof e?e.split(" "):e}function n(e){var t=f[e[u]];return t||(t={},d++,e[u]=d,f[d]=t),t}function a(e,r,a){return r||(r=t),l?r.createElement(e):(a||(a=n(r)),r=a.cache[e]?a.cache[e].cloneNode():h.test(e)?(a.cache[e]=a.createElem(e)).cloneNode():a.createElem(e),r.canHaveChildren&&!m.test(e)?a.frag.appendChild(r):r)}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(r){return v.shivMethods?a(r,e,t):t.createElem(r)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/\w+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(v,t.frag)}function o(e){e||(e=t);var r=n(e);if(v.shivCSS&&!i&&!r.hasCSS){var a,o=e;a=o.createElement("p"),o=o.getElementsByTagName("head")[0]||o.documentElement,a.innerHTML="x<style>article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}</style>",a=o.insertBefore(a.lastChild,o.firstChild),r.hasCSS=!!a}return l||c(e,r),e}var i,l,s=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,u="_html5shiv",d=0,f={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",i="hidden"in e;var r;if(!(r=1==e.childNodes.length)){t.createElement("a");var n=t.createDocumentFragment();r=void 0===n.cloneNode||void 0===n.createDocumentFragment||void 0===n.createElement}l=r}catch(e){l=i=!0}}();var v={elements:s.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",version:"3.6.2pre",shivCSS:!1!==s.shivCSS,supportsUnknownElements:l,shivMethods:!1!==s.shivMethods,type:"default",shivDocument:o,createElement:a,createDocumentFragment:function(e,a){if(e||(e=t),l)return e.createDocumentFragment();for(var a=a||n(e),c=a.frag.cloneNode(),o=0,i=r(),s=i.length;o<s;o++)c.createElement(i[o]);return c}};e.html5=v,o(t)}(this,document);