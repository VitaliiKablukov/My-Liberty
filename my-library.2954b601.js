var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var r={id:e,exports:{}};return o[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){t[e]=o},e.parcelRequired7c6=n);var r=n("krGWQ"),i=n("iQIUW");r.refs.signOutButton.addEventListener("click",(function(){JSON.parse(localStorage.getItem("user"))&&(i.Notify.info("You had signed out",{width:"400px",cssAnimationStyle:"from-right"}),setTimeout((()=>{localStorage.removeItem("user"),window.location.pathname="My-Liberty/"}),3e3))}));
//# sourceMappingURL=my-library.2954b601.js.map
