(this["webpackJsonpcolour-timer"]=this["webpackJsonpcolour-timer"]||[]).push([[0],[,,,,,,,,,,function(e,t,r){},function(e,t,r){},function(e,t,r){},,function(e,t,r){},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),c=r(4),u=r.n(c),a=(r(10),r(2)),s=(r(11),r(5)),l=function(e){return"rgb(".concat(e.r,", ").concat(e.g,", ").concat(e.b,")")},i=(r(12),r(1));var b=function(e){var t,r,o=e.id,c=e.label,u=e.colour,b=e.setColour,d=Object(n.useRef)(null),j=Object(n.useState)(!1),v=Object(a.a)(j,2),O=v[0],m=v[1],h=Object(n.useCallback)((function(){m((function(e){return!e}))}),[]);return t=d,r=h,Object(n.useEffect)((function(){var e=!1,n=!1,o=function(o){!e&&n&&t.current&&!t.current.contains(o.target)&&r(o)},c=function(r){n=!!t.current,e=!!t.current&&t.current.contains(r.target)};return document.addEventListener("mousedown",c),document.addEventListener("touchstart",c),document.addEventListener("click",o),function(){document.removeEventListener("mousedown",c),document.removeEventListener("touchstart",c),document.removeEventListener("click",o)}}),[t,r]),Object(i.jsxs)("div",{className:"picker-container",children:[Object(i.jsxs)("label",{htmlFor:o,children:[c,Object(i.jsx)("button",{type:"button",style:{backgroundColor:l(u)},onClick:h})]}),O&&Object(i.jsx)("div",{className:"picker",ref:d,children:Object(i.jsx)(s.a,{color:u,onChange:b})})]})};r(14);var d=function(e){var t=e.start,r=e.setDuration,o=e.firstColour,c=e.setFirstColour,u=e.lastColour,a=e.setLastColour,s=Object(n.useRef)(null),l=Object(n.useRef)(null),d=Object(n.useRef)(null),j=Object(n.useCallback)((function(){var e,t,n,o=(null===(e=s.current)||void 0===e?void 0:e.valueAsNumber)||0,c=(null===(t=l.current)||void 0===t?void 0:t.valueAsNumber)||0,u=(null===(n=d.current)||void 0===n?void 0:n.valueAsNumber)||0;r(1e3*(3600*o+60*c+u))}),[r]);return Object(i.jsxs)("form",{action:"",onSubmit:t,children:[Object(i.jsx)("h1",{children:"Colour Timer"}),Object(i.jsxs)("div",{id:"duration",children:[Object(i.jsx)("label",{htmlFor:"hours",children:"H"}),Object(i.jsx)("input",{id:"hours",type:"number",placeholder:"00",ref:s,onChange:j}),Object(i.jsx)("label",{htmlFor:"minutes",children:"M"}),Object(i.jsx)("input",{id:"minutes",type:"number",placeholder:"00",ref:l,onChange:j}),Object(i.jsx)("label",{htmlFor:"seconds",children:"S"}),Object(i.jsx)("input",{id:"seconds",type:"number",placeholder:"00",ref:d,onChange:j})]}),Object(i.jsx)(b,{id:"firstColour",label:"First Colour",colour:o,setColour:c}),Object(i.jsx)(b,{id:"lastColour",label:"Last Colour",colour:u,setColour:a}),Object(i.jsx)("button",{children:"Start !"})]})};var j=function(){var e=Object(n.useState)(!1),t=Object(a.a)(e,2),r=t[0],o=t[1],c=Object(n.useState)({r:155,g:45,b:102}),u=Object(a.a)(c,2),s=u[0],b=u[1],j=Object(n.useState)({r:24,g:101,b:47}),v=Object(a.a)(j,2),O=v[0],m=v[1],h=Object(n.useState)(0),f=Object(a.a)(h,2),C=f[0],g=f[1],x=Object(n.useState)(),p=Object(a.a)(x,2),k=p[0],w=p[1],S=Object(n.useState)(),y=Object(a.a)(S,2),L=y[0],E=y[1],F=Object(n.useCallback)((function(e){e.preventDefault(),o(!0);var t=new Date;w(t);var r=setInterval((function(){var e=new Date;e.getTime()>=t.getTime()+C&&(clearInterval(r),o(!1),w(void 0),E(void 0)),E(e)}),C/256)}),[C]),N=s;if(L&&k){var D=(L.getTime()-k.getTime())/C,M={r:Math.round((O.r-s.r)*D),g:Math.round((O.g-s.g)*D),b:Math.round((O.b-s.b)*D)};N={r:s.r+M.r,g:s.g+M.g,b:s.b+M.b}}return Object(i.jsxs)("div",{className:"App",style:{backgroundColor:l(N)},children:[!r&&Object(i.jsx)(d,{start:F,setDuration:g,firstColour:s,setFirstColour:b,lastColour:O,setLastColour:m}),r&&Object(i.jsx)("div",{className:"endColourCircle",style:{backgroundColor:l(O)}})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(Object(i.jsx)(o.a.StrictMode,{children:Object(i.jsx)(j,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[15,1,2]]]);
//# sourceMappingURL=main.15508adc.chunk.js.map