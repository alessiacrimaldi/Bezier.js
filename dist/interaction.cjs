"use strict";function l(n,a,u){let o=!1,i=0,f=0,d=0,r=0,t;const m=a.points,x=e=>Math.abs(i-e.x)<10&&Math.abs(f-e.y)<10;n.addEventListener("mousedown",e=>{i=e.offsetX,f=e.offsetY,m.forEach(s=>{if(x(s)){o=!0,t=s,d=s.x,r=s.y;return}})}),n.addEventListener("mousemove",e=>{o&&(t.x=d+(e.offsetX-i),t.y=r+(e.offsetY-f),a.update(),u())}),n.addEventListener("mouseup",e=>{o=!1,t=void 0})}module.exports=l;
//# sourceMappingURL=interaction.cjs.map
