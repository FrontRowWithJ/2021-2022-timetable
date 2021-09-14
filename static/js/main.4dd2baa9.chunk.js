(this["webpackJsonp2021-2022-timetable"]=this["webpackJsonp2021-2022-timetable"]||[]).push([[0],[,,,,,,,,,,,,,function(e,t,o){},function(e,t,o){},,function(e,t,o){},function(e,t,o){},,,function(e,t,o){},function(e,t,o){"use strict";o.r(t);var n=o(1),i=o.n(n),r=o(7),a=o.n(r),c=(o(13),o(2)),l=(o(14),o(0)),s=function(e){return Object(l.jsx)("div",{id:"header",children:["M","T","W","T","F"].map((function(t,o){return Object(l.jsx)("div",{onClick:function(){e.setNext(o),e.setTransition(!0)},children:Object(l.jsx)("div",{style:{cursor:e.isTransitioning?"not-allowed":"pointer"},children:t})},o)}))})},d=(o(16),o(17),o(5)),u=(o(20),{LECTURE:0,TUTORIAL:1,LABORATORY:2,ONLINE_LIVE_EVENT:3,ACTIVITIES:["Lecture","Tutorial","Laboratory","Online Live Event"],CSU33081:0,CSU33012:1,CSU34016:2,CSU33031:3,CSU34011:4,MODULE_CODES:["CSU33081","CSU33012","CSU34016","CSU33031","CSU34011"],DAYS:["mon","tue","wed","thu","fri"]});Object.freeze(u);var m=u,C={mon:[{moduleCode:"CSU33081",module:"Computational Mathematics",lecturer:"\xc9amonn \xd3 Nuall\xe1in",activity:m.LECTURE,isOnline:!0,classroom:"Blackboard"},{moduleCode:"CSU33012",module:"Software Engineering",lecturer:"Edmond Stephen Barrett",activity:m.LECTURE,isOnline:!0,classroom:"Blackboard"},{moduleCode:"CSU34016",module:"Introduction To Functional Programming",lecturer:"Andrew Butterfield",activity:m.TUTORIAL,isOnline:!1,classroom:"L2.01/L2.02"},{moduleCode:"CSU33012",module:"Software Engineering",lecturer:"Edmond Stephen Barrett",activity:m.TUTORIAL,isOnline:!0,classroom:"Blackboard"},{moduleCode:"CSU33031",module:"Computer Networks",lecturer:"Stefan Weber",activity:m.LECTURE,isOnline:!0,classroom:"Blackboard"},void 0,{moduleCode:"CSU33031",module:"Computer Networks",lecturer:"Stefan Weber",activity:m.LABORATORY,isOnline:!0,classroom:"Blackboard"},{moduleCode:"CSU33031",module:"Computer Networks",lecturer:"Stefan Weber",activity:m.TUTORIAL,isOnline:!0,classroom:"Blackboard"},void 0],tue:[void 0,void 0,void 0,void 0,void 0,{moduleCode:"CSU34011",module:"Symbolic Programming",lecturer:"Rafael Timothy Fernando",activity:m.LECTURE,isOnline:!0,classroom:"Blackboard"},{moduleCode:"CSU33031",module:"Computer Networks",lecturer:"Stefan Weber",activity:m.LECTURE,isOnline:!0,classroom:"Blackboard"},{moduleCode:"CSU34011",module:"Symbolic Programming",lecturer:"Rafael Timothy Fernando",activity:m.TUTORIAL,isOnline:!1,classroom:"LG35/LG36"},void 0],wed:[void 0,void 0,void 0,{moduleCode:"CSU34016",module:"Introduction To Functional Programming",lecturer:"Andrew Butterfield",activity:m.LECTURE,isOnline:!0,classroom:"Blackboard"},void 0,void 0,void 0,{moduleCode:"CSU33081",module:"Computational Mathematics",lecturer:"\xc9amonn \xd3 Nuall\xe1in",activity:m.LECTURE,isOnline:!0,classroom:"Blackboard"},{moduleCode:"CSU33012",module:"Software Engineering",lecturer:"Edmond Stephen Barrett",activity:m.LECTURE,isOnline:!0,classroom:"Blackboard"}],thu:[void 0,void 0,void 0,void 0,{moduleCode:"CSU33081",module:"Computational Mathematics",lecturer:"\xc9amonn \xd3 Nuall\xe1in",activity:m.ONLINE_LIVE_EVENT,isOnline:!0,classroom:"Blackboard"},void 0,void 0,void 0,void 0],fri:[void 0,void 0,void 0,void 0,void 0,{moduleCode:"CSU34016",module:"Introduction To Functional Programming",lecturer:"Andrew Butterfield",activity:m.LECTURE,isOnline:!0,classroom:"Blackboard"},{moduleCode:"CSU34011",module:"Symbolic Programming",lecturer:"Rafael Timothy Fernando",activity:m.LECTURE,isOnline:!0,classroom:"Blackboard"},void 0,void 0]},b=o(8),v=function(e){return e.classList.toggle("slide-horizontally")},O=864e5,f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][e.getDay()],o=["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()];return t+" "+e.getDate()+" "+o+" "+e.getFullYear()},j=function(e){var t=[{bgColor:"#2929A3",textColor:"white"},{bgColor:"#E8AA14",textColor:"black"},{bgColor:"#F5054F",textColor:"white"},{bgColor:"#693696",textColor:"white"}],o=e.schedule.map((function(e,t){return e&&(e.time="".concat((""+(9+t)).padStart(2,"0"),":00 - ").concat(10+t,":00")),e})).filter((function(e){return void 0!==e}));return Object(l.jsxs)("div",{className:"timetable-page-container",ref:e.tableRef,style:{left:"".concat(0===e.index?"":"10","0%")},onTransitionEnd:function(t){var o,n,i,r,a,c,l;o=t.target,n=e.index,i=e.curr,r=e.isAnimating,a=e.setCurr,c=e.setTransition,l=e.setAnimation,v(o),n!==i&&r&&(a(n),c(!1),l(!1),Object(b.a)(document.getElementsByClassName("timetable-page-container")).forEach((function(e,t){e.style.left="".concat(t===n?"":"10","0%")})))},children:[Object(l.jsx)("div",{className:"date",children:e.date}),o.map((function(e,o){var n=t[e.activity],i=n.bgColor,r=n.textColor,a=e.module,c=e.isOnline,s=e.activity,d=e.time,u=e.classroom;return Object(l.jsxs)("div",{className:"cell",style:{boxShadow:"0px 7px 13px -7px "+i,color:r},children:[Object(l.jsx)("div",{className:"online-indicator",style:{background:c?"#00FF00":"#FF0000"}}),Object(l.jsx)("div",{className:"test-0",style:{backgroundColor:i}}),Object(l.jsx)("div",{className:"test-1",style:{backgroundColor:i}}),Object(l.jsxs)("div",{className:"bg",style:{backgroundColor:i},children:[Object(l.jsx)("div",{children:a}),Object(l.jsx)("div",{children:m.ACTIVITIES[s]}),Object(l.jsx)("div",{children:d}),Object(l.jsxs)("div",{children:["Classroom: ",u]})]})]},o)}))]})},S=function(e){var t=e.isTransitioning,o=e.setTransition,r=e.next,a=e.curr,s=e.setCurr,u=Object(n.useState)(!1),m=Object(c.a)(u,2),b=m[0],S=m[1],g=Object(n.useRef)([]),y=function(){var e=(1-(new Date).getDay())*O,t=Date.now()+e;return Object(d.times)(5,(function(e){return new Date(t+O*e)})).map(f)}();return g.current=Object(d.times)(5,(function(){return i.a.createRef()})),function(e,t,o,i,r,a,c){Object(n.useEffect)((function(){if(e&&!t&&o!==i){r(!0),a.forEach((function(e,t){e.current.style.left="".concat(t===i?"":"10","0%")}));var n=a[i].current,l=a[o].current;v(n),v(l),n.style.left="-100%",l.style.left="0%"}else e&&o===i&&c(!1)}),[i,o,a,r,e,t,c])}(t,b,r,a,S,g.current,o),Object(l.jsx)("div",{className:"timetable-container",children:Object.keys(C).map((function(e,t){return Object(l.jsx)(j,{tableRef:g.current[t],schedule:C[e],setCurr:s,setTransition:o,setAnimation:S,isAnimating:b,index:t,curr:a,date:y[t]},e)}))})},g=function(){var e=Object(n.useState)(1),t=Object(c.a)(e,2),o=t[0],i=t[1],r=Object(n.useState)(0),a=Object(c.a)(r,2),d=a[0],u=a[1],m=Object(n.useState)(!1),C=Object(c.a)(m,2),b=C[0],v=C[1];return Object(l.jsxs)("main",{children:[Object(l.jsx)(s,{setNext:i,isTransitioning:b,setTransition:v}),Object(l.jsx)(S,{next:o,curr:d,setCurr:u,isTransitioning:b,setTransition:v})]})},y=function(e){e&&e instanceof Function&&o.e(3).then(o.bind(null,22)).then((function(t){var o=t.getCLS,n=t.getFID,i=t.getFCP,r=t.getLCP,a=t.getTTFB;o(e),n(e),i(e),r(e),a(e)}))};a.a.render(Object(l.jsx)(i.a.StrictMode,{children:Object(l.jsx)(g,{})}),document.getElementById("root")),y()}],[[21,1,2]]]);
//# sourceMappingURL=main.4dd2baa9.chunk.js.map