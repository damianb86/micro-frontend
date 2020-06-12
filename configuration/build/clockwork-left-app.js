System.register(["react","@clockwork/configuration","react-dom","@clockwork/styleguide"],(function(e){var t,r,n,o;return{setters:[function(e){t=e},function(e){r=e},function(e){n=e},function(e){o=e}],execute:function(){e(function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=9)}([function(e,r){e.exports=t},function(e,t){e.exports=r},function(e,t){e.exports=n},function(e,t,r){!function(e){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}e.SingleSpaContext=null;var o={React:null,ReactDOM:null,rootComponent:null,loadRootComponent:null,suppressComponentDidCatchWarning:!1,domElements:{},errorBoundary:null,domElementGetter:null,parcelCanUpdate:!0};function i(e,t){return e.rootComponent?Promise.resolve():e.loadRootComponent(t).then((function(t){e.rootComponent=t}))}function a(e,t){return new Promise((function(r,n){e.suppressComponentDidCatchWarning||!function(e){if(!(e&&"string"==typeof e.version&&e.version.indexOf(".")>=0))return!1;var t=e.version.slice(0,e.version.indexOf("."));try{return Number(t)>=16}catch(e){return!1}}(e.React)||e.errorBoundary||(e.rootComponent.prototype?e.rootComponent.prototype.componentDidCatch||console.warn("single-spa-react: ".concat(t.name||t.appName||t.childAppName,"'s rootComponent should implement componentDidCatch to avoid accidentally unmounting the entire single-spa application.")):console.warn("single-spa-react: ".concat(t.name||t.appName||t.childAppName,"'s rootComponent does not implement an error boundary.  If using a functional component, consider providing an opts.errorBoundary to singleSpaReact(opts).")));var o=function(e,t){return(t=t&&t.customProps?t.customProps:t).domElement?function(){return t.domElement}:t.domElementGetter?t.domElementGetter:e.domElementGetter?e.domElementGetter:function(e){var t=e.appName||e.name;if(!t)throw Error("single-spa-react was not given an application name as a prop, so it can't make a unique dom element container for the react application");var r="single-spa-application:".concat(t);return function(){var e=document.getElementById(r);return e||((e=document.createElement("div")).id=r,document.body.appendChild(e)),e}}(t)}(e,t);if("function"!=typeof o)throw new Error("single-spa-react: the domElementGetter for react application '".concat(t.appName||t.name,"' is not a function"));var i=l(e,t),a=function(e,t){var r=e(t);if(!r)throw new Error("single-spa-react: domElementGetter function for application '".concat(t.appName||t.name,"' did not return a valid dom element. Please pass a valid domElement or domElementGetter via opts or props"));return r}(o,t);u({elementToRender:i,domElement:a,whenFinished:function(){r(this)},opts:e}),e.domElements[t.name]=a}))}function c(e,t){return Promise.resolve().then((function(){e.ReactDOM.unmountComponentAtNode(e.domElements[t.name]),delete e.domElements[t.name]}))}function s(e,t){return new Promise((function(r,n){u({elementToRender:l(e,t),domElement:e.domElements[t.name],whenFinished:function(){r(this)},opts:e})}))}function u(e){var t=e.opts,r=e.elementToRender,n=e.domElement,o=e.whenFinished;return"createRoot"===t.renderType?t.ReactDOM.createRoot(n).render(r,o):"createBlockingRoot"===t.renderType?t.ReactDOM.createBlockingRoot(n).render(r,o):"hydrate"===t.renderType?t.ReactDOM.hydrate(r,n,o):t.ReactDOM.render(r,n,o)}function l(t,r){var n=t.React.createElement(t.rootComponent,r),o=e.SingleSpaContext?t.React.createElement(e.SingleSpaContext.Provider,{value:r},n):n;return t.errorBoundary&&(t.errorBoundaryClass=t.errorBoundaryClass||function(e){function t(r){e.React.Component.apply(this,arguments),this.state={caughtError:null,caughtErrorInfo:null},t.displayName="SingleSpaReactErrorBoundary(".concat(r.name,")")}return t.prototype=Object.create(e.React.Component.prototype),t.prototype.render=function(){return this.state.caughtError?e.errorBoundary(this.state.caughtError,this.state.caughtErrorInfo,this.props):this.props.children},t.prototype.componentDidCatch=function(e,t){this.setState({caughtError:e,caughtErrorInfo:t})},t}(t),o=t.React.createElement(t.errorBoundaryClass,r,o)),o}e.default=function(u){if("object"!==t(u))throw new Error("single-spa-react requires a configuration object");var l=function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?n(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({},o,{},u);if(!l.React)throw new Error("single-spa-react must be passed opts.React");if(!l.ReactDOM)throw new Error("single-spa-react must be passed opts.ReactDOM");if(!l.rootComponent&&!l.loadRootComponent)throw new Error("single-spa-react must be passed opts.rootComponent or opts.loadRootComponent");if(l.errorBoundary&&"function"!=typeof l.errorBoundary)throw Error("The errorBoundary opt for single-spa-react must either be omitted or be a function that returns React elements");!e.SingleSpaContext&&l.React.createContext&&(e.SingleSpaContext=l.React.createContext());var p={bootstrap:i.bind(null,l),mount:a.bind(null,l),unmount:c.bind(null,l)};return l.parcelCanUpdate&&(p.update=s.bind(null,l)),p},Object.defineProperty(e,"__esModule",{value:!0})}(t)},function(e,t){e.exports=o},function(e,t,r){var n=r(6),o=r(7);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};n(o,i);e.exports=o.locals||{}},function(e,t,r){"use strict";var n,o=function(){return void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n},i=function(){var e={};return function(t){if(void 0===e[t]){var r=document.querySelector(t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}e[t]=r}return e[t]}}(),a=[];function c(e){for(var t=-1,r=0;r<a.length;r++)if(a[r].identifier===e){t=r;break}return t}function s(e,t){for(var r={},n=[],o=0;o<e.length;o++){var i=e[o],s=t.base?i[0]+t.base:i[0],u=r[s]||0,l="".concat(s," ").concat(u);r[s]=u+1;var p=c(l),f={css:i[1],media:i[2],sourceMap:i[3]};-1!==p?(a[p].references++,a[p].updater(f)):a.push({identifier:l,updater:b(f,t),references:1}),n.push(l)}return n}function u(e){var t=document.createElement("style"),n=e.attributes||{};if(void 0===n.nonce){var o=r.nc;o&&(n.nonce=o)}if(Object.keys(n).forEach((function(e){t.setAttribute(e,n[e])})),"function"==typeof e.insert)e.insert(t);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var l,p=(l=[],function(e,t){return l[e]=t,l.filter(Boolean).join("\n")});function f(e,t,r,n){var o=r?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(e.styleSheet)e.styleSheet.cssText=p(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function h(e,t,r){var n=r.css,o=r.media,i=r.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var d=null,m=0;function b(e,t){var r,n,o;if(t.singleton){var i=m++;r=d||(d=u(t)),n=f.bind(null,r,i,!1),o=f.bind(null,r,i,!0)}else r=u(t),n=h.bind(null,r,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(r)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var r=s(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var n=0;n<r.length;n++){var o=c(r[n]);a[o].references--}for(var i=s(e,t),u=0;u<r.length;u++){var l=c(r[u]);0===a[l].references&&(a[l].updater(),a.splice(l,1))}r=i}}}},function(e,t,r){(t=r(8)(!1)).push([e.i,".left-app .navigation-sidebar__right__slider .icon-action-wrapper {\n  cursor: pointer;\n}\n",""]),e.exports=t},function(e,t,r){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var r=function(e,t){var r=e[1]||"",n=e[3];if(!n)return r;if(t&&"function"==typeof btoa){var o=(a=n,c=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(s," */")),i=n.sources.map((function(e){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(e," */")}));return[r].concat(i).concat([o]).join("\n")}var a,c,s;return[r].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(r,"}"):r})).join("")},t.i=function(e,r,n){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(n)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var c=0;c<e.length;c++){var s=[].concat(e[c]);n&&o[s[0]]||(r&&(s[2]?s[2]="".concat(r," and ").concat(s[2]):s[2]=r),t.push(s))}},t}},function(e,t,r){"use strict";r.r(t),r.d(t,"bootstrap",(function(){return J})),r.d(t,"mount",(function(){return $})),r.d(t,"unmount",(function(){return Q})),function(e,t){if(t||(t=1),"string"!=typeof e||0===e.trim().length)throw Error("systemjs-webpack-interop: setPublicPath(systemjsModuleName) must be called with a non-empty string 'systemjsModuleName'");if("number"!=typeof t||t<=0||!Number.isInteger(t))throw Error("systemjs-webpack-interop: setPublicPath(systemjsModuleName, rootDirectoryLevel) must be called with a positive integer 'rootDirectoryLevel'");let n;try{if(n=window.System.resolve(e),!n)throw Error()}catch(t){throw Error("systemjs-webpack-interop: There is no such module '"+e+"' in the SystemJS registry. Did you misspell the name of your module?")}r.p=function(e,t){const r=new URL(e),n=new URL(e).pathname;let o=0,i=n.length;for(;o!==t&&i>=0;){"/"===n[--i]&&o++}if(o!==t)throw Error("systemjs-webpack-interop: rootDirectoryLevel ("+t+") is greater than the number of directories ("+o+") in the URL path "+fullUrl);return r.pathname=r.pathname.slice(0,i+1),r.href}(n,t)}("@clockwork/left-app");var n=r(0),o=r.n(n),i=r(2),a=r.n(i),c=r(3),s=r.n(c);function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}}(e,t)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?l(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var f=function(e,t){return(f=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};function h(e,t){function r(){this.constructor=e}f(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}function d(e){return"function"==typeof e}var m=!1,b={Promise:void 0,set useDeprecatedSynchronousErrorHandling(e){e&&(new Error).stack;m=e},get useDeprecatedSynchronousErrorHandling(){return m}};function y(e){setTimeout((function(){throw e}),0)}var v={closed:!0,next:function(e){},error:function(e){if(b.useDeprecatedSynchronousErrorHandling)throw e;y(e)},complete:function(){}},g=function(){return Array.isArray||function(e){return e&&"number"==typeof e.length}}();var E=function(){function e(e){return Error.call(this),this.message=e?e.length+" errors occurred during unsubscription:\n"+e.map((function(e,t){return t+1+") "+e.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=e,this}return e.prototype=Object.create(Error.prototype),e}(),O=function(){function e(e){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,e&&(this._unsubscribe=e)}return e.prototype.unsubscribe=function(){var t;if(!this.closed){var r,n=this._parentOrParents,o=this._unsubscribe,i=this._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,n instanceof e)n.remove(this);else if(null!==n)for(var a=0;a<n.length;++a){n[a].remove(this)}if(d(o))try{o.call(this)}catch(e){t=e instanceof E?w(e.errors):[e]}if(g(i)){a=-1;for(var c=i.length;++a<c;){var s=i[a];if(null!==(r=s)&&"object"==typeof r)try{s.unsubscribe()}catch(e){t=t||[],e instanceof E?t=t.concat(w(e.errors)):t.push(e)}}}if(t)throw new E(t)}},e.prototype.add=function(t){var r=t;if(!t)return e.EMPTY;switch(typeof t){case"function":r=new e(t);case"object":if(r===this||r.closed||"function"!=typeof r.unsubscribe)return r;if(this.closed)return r.unsubscribe(),r;if(!(r instanceof e)){var n=r;(r=new e)._subscriptions=[n]}break;default:throw new Error("unrecognized teardown "+t+" added to Subscription.")}var o=r._parentOrParents;if(null===o)r._parentOrParents=this;else if(o instanceof e){if(o===this)return r;r._parentOrParents=[o,this]}else{if(-1!==o.indexOf(this))return r;o.push(this)}var i=this._subscriptions;return null===i?this._subscriptions=[r]:i.push(r),r},e.prototype.remove=function(e){var t=this._subscriptions;if(t){var r=t.indexOf(e);-1!==r&&t.splice(r,1)}},e.EMPTY=function(e){return e.closed=!0,e}(new e),e}();function w(e){return e.reduce((function(e,t){return e.concat(t instanceof E?t.errors:t)}),[])}var _=function(){return"function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random()}(),S=function(e){function t(r,n,o){var i=e.call(this)||this;switch(i.syncErrorValue=null,i.syncErrorThrown=!1,i.syncErrorThrowable=!1,i.isStopped=!1,arguments.length){case 0:i.destination=v;break;case 1:if(!r){i.destination=v;break}if("object"==typeof r){r instanceof t?(i.syncErrorThrowable=r.syncErrorThrowable,i.destination=r,r.add(i)):(i.syncErrorThrowable=!0,i.destination=new j(i,r));break}default:i.syncErrorThrowable=!0,i.destination=new j(i,r,n,o)}return i}return h(t,e),t.prototype[_]=function(){return this},t.create=function(e,r,n){var o=new t(e,r,n);return o.syncErrorThrowable=!1,o},t.prototype.next=function(e){this.isStopped||this._next(e)},t.prototype.error=function(e){this.isStopped||(this.isStopped=!0,this._error(e))},t.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this))},t.prototype._next=function(e){this.destination.next(e)},t.prototype._error=function(e){this.destination.error(e),this.unsubscribe()},t.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},t.prototype._unsubscribeAndRecycle=function(){var e=this._parentOrParents;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=e,this},t}(O),j=function(e){function t(t,r,n,o){var i,a=e.call(this)||this;a._parentSubscriber=t;var c=a;return d(r)?i=r:r&&(i=r.next,n=r.error,o=r.complete,r!==v&&(d((c=Object.create(r)).unsubscribe)&&a.add(c.unsubscribe.bind(c)),c.unsubscribe=a.unsubscribe.bind(a))),a._context=c,a._next=i,a._error=n,a._complete=o,a}return h(t,e),t.prototype.next=function(e){if(!this.isStopped&&this._next){var t=this._parentSubscriber;b.useDeprecatedSynchronousErrorHandling&&t.syncErrorThrowable?this.__tryOrSetError(t,this._next,e)&&this.unsubscribe():this.__tryOrUnsub(this._next,e)}},t.prototype.error=function(e){if(!this.isStopped){var t=this._parentSubscriber,r=b.useDeprecatedSynchronousErrorHandling;if(this._error)r&&t.syncErrorThrowable?(this.__tryOrSetError(t,this._error,e),this.unsubscribe()):(this.__tryOrUnsub(this._error,e),this.unsubscribe());else if(t.syncErrorThrowable)r?(t.syncErrorValue=e,t.syncErrorThrown=!0):y(e),this.unsubscribe();else{if(this.unsubscribe(),r)throw e;y(e)}}},t.prototype.complete=function(){var e=this;if(!this.isStopped){var t=this._parentSubscriber;if(this._complete){var r=function(){return e._complete.call(e._context)};b.useDeprecatedSynchronousErrorHandling&&t.syncErrorThrowable?(this.__tryOrSetError(t,r),this.unsubscribe()):(this.__tryOrUnsub(r),this.unsubscribe())}else this.unsubscribe()}},t.prototype.__tryOrUnsub=function(e,t){try{e.call(this._context,t)}catch(e){if(this.unsubscribe(),b.useDeprecatedSynchronousErrorHandling)throw e;y(e)}},t.prototype.__tryOrSetError=function(e,t,r){if(!b.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{t.call(this._context,r)}catch(t){return b.useDeprecatedSynchronousErrorHandling?(e.syncErrorValue=t,e.syncErrorThrown=!0,!0):(y(t),!0)}return!1},t.prototype._unsubscribe=function(){var e=this._parentSubscriber;this._context=null,this._parentSubscriber=null,e.unsubscribe()},t}(S);var C=function(){function e(e,t){this.project=e,this.thisArg=t}return e.prototype.call=function(e,t){return t.subscribe(new P(e,this.project,this.thisArg))},e}(),P=function(e){function t(t,r,n){var o=e.call(this,t)||this;return o.project=r,o.count=0,o.thisArg=n||o,o}return h(t,e),t.prototype._next=function(e){var t;try{t=this.project.call(this.thisArg,e,this.count++)}catch(e){return void this.destination.error(e)}this.destination.next(t)},t}(S),R=r(1),T=r(4);function x(){return(x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var M=n.createElement("g",{fill:"none",fillRule:"evenodd"},n.createElement("path",{d:"M8.645 7a3.502 3.502 0 016.71 0h-1.063a2.5 2.5 0 00-4.584 0H8.645z",fill:"#9AB",fillRule:"nonzero"}),n.createElement("path",{d:"M4 14h16v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3zM6 8h12a2 2 0 012 2v3H4v-3a2 2 0 012-2zm6 4a1 1 0 100-2 1 1 0 000 2z",fill:"#778DA4"}));var A=function(e){return n.createElement("svg",x({width:24,height:24},e),M)};function D(){return(D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var k=n.createElement("path",{d:"M4.903 9.62c-.251.151-.602.101-.803-.1a.681.681 0 01.1-.802c2.508-1.856 4.966-3.712 7.474-5.568.2-.15.451-.15.652 0 2.458 1.856 4.966 3.712 7.423 5.568.251.2.301.552.1.802-.15.201-.501.251-.752.1l-1.204-.902v7.824H13.63v-4.915h-3.26v4.915H6.056V8.718l-1.153.903z",fill:"#778DA4",fillRule:"evenodd"});var N=function(e){return n.createElement("svg",D({width:24,height:24},e),k)};function I(){return(I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var B=n.createElement("path",{fill:"#FFF",fillRule:"evenodd",d:"M4.582 17a8 8 0 1114.837 0H4.581zM12 10a1 1 0 100-2 1 1 0 000 2zm-4 4a1 1 0 10-2 0 1 1 0 002 0zm1.172-2.828a1 1 0 10-1.415-1.415 1 1 0 001.415 1.415zM16 14a1 1 0 102 0 1 1 0 00-2 0zm-3.293.707l3.536-3.535a1 1 0 10-1.415-1.415l-3.535 3.536a1 1 0 001.414 1.414z"});var L=function(e){return n.createElement("svg",I({width:24,height:24},e),B)};function H(){return(H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var F=n.createElement("g",{fill:"#FFF",fillRule:"nonzero"},n.createElement("path",{d:"M11.048 7.69h7.7a.856.856 0 100-1.71h-7.7a.855.855 0 100 1.71zM18.748 11.113h-7.7a.855.855 0 100 1.71h7.7a.856.856 0 100-1.71zM18.748 16.246h-7.7a.855.855 0 100 1.71h7.7a.855.855 0 100-1.71zM7.545 6.184H6.507l-.32-.987a.285.285 0 00-.543 0l-.321.987H4.286a.286.286 0 00-.168.516l.84.61-.321.987a.285.285 0 00.439.318l.84-.61.84.61a.283.283 0 00.335 0 .285.285 0 00.103-.318l-.32-.987.84-.61a.286.286 0 00.103-.319.287.287 0 00-.272-.197zM6.871 10.727H4.96a.285.285 0 00-.285.285v1.912c0 .158.128.285.285.285h1.912a.285.285 0 00.286-.285v-1.912a.285.285 0 00-.286-.285zM6.871 15.86H4.96a.285.285 0 00-.285.285v1.912c0 .158.128.286.285.286h1.912a.285.285 0 00.286-.286v-1.912a.285.285 0 00-.286-.285z"}));var U=function(e){return n.createElement("svg",H({width:24,height:24},e),F)};function z(){return(z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var V=n.createElement("g",{fill:"none",fillRule:"evenodd"},n.createElement("path",{d:"M19.536 4.837a.985.985 0 00-1.394 0l-7.308 7.308.084-2.99a.985.985 0 00-1.97-.055l-.152 5.465a.985.985 0 00.985 1.012h.024l5.465-.153a.985.985 0 10-.054-1.97l-2.991.084 7.31-7.308a.985.985 0 000-1.393z",fill:"#FFF",fillRule:"nonzero"}),n.createElement("path",{d:"M11.912 5.235C7.419 5.625 4.915 7.88 4.4 12c-.8 6.4 6.8 10 11.6 6.8 2.4-1.867 3.467-4 3.2-6.4",stroke:"#FFF",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"}));var G=function(e){return n.createElement("svg",z({width:24,height:24},e),V)};r(5);function K(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function W(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?K(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):K(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Y=function(){Object(R.useFeatures)();var e=p(Object(n.useState)(!1),2),t=e[0],r=e[1],i=p(Object(n.useState)(!1),2),a=i[0],c=i[1],s=function(e){r(!t),c(!1)};Object(n.useEffect)((function(){var e,t;return Object(R.rxjsExportEvent)(R.EVENTS.LEFT_APP.toggleCollapsed,Object(R.rxjsCreateEvent)().pipe((e=function(e){return W(W({},e),{},{mapped:!0})},function(r){if("function"!=typeof e)throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");return r.lift(new C(e,t))}))).subscribe(s),Object(R.addEventListener)(R.EVENTS.LEFT_APP.toggleCollapsed,s),function(){Object(R.rxjsRemoveEvent)(R.EVENTS.LEFT_APP.toggleCollapsed),Object(R.removeEventListener)(R.EVENTS.LEFT_APP.toggleCollapsed,s)}}),[t]);var u={DASHBOARD_SIDEBAR_LINKS:[{title:"Home",url:Object(R.linkTo)("app"),icon:N}],ANALYTICS_SIDEBAR_LINKS:[{title:"Content",url:Object(R.linkTo)("app.content"),icon:U},{title:"Cards",url:Object(R.linkTo)("app.cards"),icon:G}],NAVIGATION_MENU_ITEMS_GROUPED:[[{key:"dashboard",title:"Collapsible",icon:L,url:Object(R.linkTo)("storybook.collapsibleCard","v2")},{key:"dashboard.v3",title:"Collapsible V3",icon:L,url:Object(R.linkTo)("storybook.collapsibleCard.v3")},{key:"statusReport",title:"Project List",icon:A,url:Object(R.linkTo)("storybook.projectList")}]]},l=u.DASHBOARD_SIDEBAR_LINKS.concat(u.ANALYTICS_SIDEBAR_LINKS).filter(Boolean);return o.a.createElement("div",{className:"left-app"},o.a.createElement(T.NavigationBarWithTabs,{collapsed:t,onOverMode:a,onToggleSidebar:s,onMouseOver:function(){r(!1),c(!0)},onMouseLeave:function(){a&&(r(!0),c(!1))},mainItems:l,tabsItems:u.NAVIGATION_MENU_ITEMS_GROUPED,activeTabItem:"candidates",currentUser:{},clientViewLink:"/firm/client_mode",currentFirmId:"1",firms:{},users:[],fetchRecentVisitedEntities:function(){return null},fetchAllCurrentAccountUsers:function(){return null},recentEntities:[],showViewAsClient:!0,showRecentlyVisited:!0}))},q=s()({React:o.a,ReactDOM:a.a,rootComponent:Y,domElementGetter:function(){return document.getElementById("sidebar-container")},errorBoundary:function(e,t,r){return null}}),J=q.bootstrap,$=q.mount,Q=q.unmount}]))}}}));
//# sourceMappingURL=clockwork-left-app.js.map