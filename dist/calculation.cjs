"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const{abs:R,cos:M,sin:L,acos:K,atan2:F,sqrt:j,pow:A}=Math;function $(r){return r<0?-A(-r,1/3):A(r,1/3)}const V=Math.PI,X=2*V,I=V/2,B=1e-6,H=Number.MAX_SAFE_INTEGER||9007199254740991,W=Number.MIN_SAFE_INTEGER||-9007199254740991,tt={x:0,y:0,z:0},h={Tvalues:[-.06405689286260563,.06405689286260563,-.1911188674736163,.1911188674736163,-.3150426796961634,.3150426796961634,-.4337935076260451,.4337935076260451,-.5454214713888396,.5454214713888396,-.6480936519369755,.6480936519369755,-.7401241915785544,.7401241915785544,-.820001985973903,.820001985973903,-.8864155270044011,.8864155270044011,-.9382745520027328,.9382745520027328,-.9747285559713095,.9747285559713095,-.9951872199970213,.9951872199970213],Cvalues:[.12793819534675216,.12793819534675216,.1258374563468283,.1258374563468283,.12167047292780339,.12167047292780339,.1155056680537256,.1155056680537256,.10744427011596563,.10744427011596563,.09761865210411388,.09761865210411388,.08619016153195327,.08619016153195327,.0733464814110803,.0733464814110803,.05929858491543678,.05929858491543678,.04427743881741981,.04427743881741981,.028531388628933663,.028531388628933663,.0123412297999872,.0123412297999872],arcfn:function(r,n){const e=n(r);let i=e.x*e.x+e.y*e.y;return typeof e.z<"u"&&(i+=e.z*e.z),j(i)},compute:function(r,n,e){if(r===0)return n[0].t=0,n[0];const i=n.length-1;if(r===1)return n[i].t=1,n[i];const s=1-r;let u=n;if(i===0)return n[0].t=r,n[0];if(i===1){const l={x:s*u[0].x+r*u[1].x,y:s*u[0].y+r*u[1].y,t:r};return e&&(l.z=s*u[0].z+r*u[1].z),l}if(i<4){let l=s*s,c=r*r,a,x,f,y=0;i===2?(u=[u[0],u[1],u[2],tt],a=l,x=s*r*2,f=c):i===3&&(a=l*s,x=l*r*3,f=s*c*3,y=r*c);const p={x:a*u[0].x+x*u[1].x+f*u[2].x+y*u[3].x,y:a*u[0].y+x*u[1].y+f*u[2].y+y*u[3].y,t:r};return e&&(p.z=a*u[0].z+x*u[1].z+f*u[2].z+y*u[3].z),p}const o=JSON.parse(JSON.stringify(n));for(;o.length>1;){for(let l=0;l<o.length-1;l++)o[l]={x:o[l].x+(o[l+1].x-o[l].x)*r,y:o[l].y+(o[l+1].y-o[l].y)*r},typeof o[l].z<"u"&&(o[l]=o[l].z+(o[l+1].z-o[l].z)*r);o.splice(o.length-1,1)}return o[0].t=r,o[0]},computeWithRatios:function(r,n,e,i){const s=1-r,u=e,o=n;let l=u[0],c=u[1],a=u[2],x=u[3],f;if(l*=s,c*=r,o.length===2)return f=l+c,{x:(l*o[0].x+c*o[1].x)/f,y:(l*o[0].y+c*o[1].y)/f,z:i?(l*o[0].z+c*o[1].z)/f:!1,t:r};if(l*=s,c*=2*s,a*=r*r,o.length===3)return f=l+c+a,{x:(l*o[0].x+c*o[1].x+a*o[2].x)/f,y:(l*o[0].y+c*o[1].y+a*o[2].y)/f,z:i?(l*o[0].z+c*o[1].z+a*o[2].z)/f:!1,t:r};if(l*=s,c*=1.5*s,a*=3*s,x*=r*r*r,o.length===4)return f=l+c+a+x,{x:(l*o[0].x+c*o[1].x+a*o[2].x+x*o[3].x)/f,y:(l*o[0].y+c*o[1].y+a*o[2].y+x*o[3].y)/f,z:i?(l*o[0].z+c*o[1].z+a*o[2].z+x*o[3].z)/f:!1,t:r}},derive:function(r,n){const e=[];for(let i=r,s=i.length,u=s-1;s>1;s--,u--){const o=[];for(let l=0,c;l<u;l++)c={x:u*(i[l+1].x-i[l].x),y:u*(i[l+1].y-i[l].y)},n&&(c.z=u*(i[l+1].z-i[l].z)),o.push(c);e.push(o),i=o}return e},between:function(r,n,e){return n<=r&&r<=e||h.approximately(r,n)||h.approximately(r,e)},approximately:function(r,n,e){return R(r-n)<=(e||B)},length:function(r){const e=h.Tvalues.length;let i=0;for(let s=0,u;s<e;s++)u=.5*h.Tvalues[s]+.5,i+=h.Cvalues[s]*h.arcfn(u,r);return .5*i},map:function(r,n,e,i,s){const u=e-n,o=s-i,l=r-n,c=l/u;return i+o*c},lerp:function(r,n,e){const i={x:n.x+r*(e.x-n.x),y:n.y+r*(e.y-n.y)};return n.z!==void 0&&e.z!==void 0&&(i.z=n.z+r*(e.z-n.z)),i},pointToString:function(r){let n=r.x+"/"+r.y;return typeof r.z<"u"&&(n+="/"+r.z),n},pointsToString:function(r){return"["+r.map(h.pointToString).join(", ")+"]"},copy:function(r){return JSON.parse(JSON.stringify(r))},angle:function(r,n,e){const i=n.x-r.x,s=n.y-r.y,u=e.x-r.x,o=e.y-r.y,l=i*o-s*u,c=i*u+s*o;return F(l,c)},round:function(r,n){const e=""+r,i=e.indexOf(".");return parseFloat(e.substring(0,i+1+n))},dist:function(r,n){const e=r.x-n.x,i=r.y-n.y;return j(e*e+i*i)},closest:function(r,n){let e=A(2,63),i,s;return r.forEach(function(u,o){s=h.dist(n,u),s<e&&(e=s,i=o)}),{mdist:e,mpos:i}},abcratio:function(r,n){if(n!==2&&n!==3)return!1;if(typeof r>"u")r=.5;else if(r===0||r===1)return r;const e=A(r,n)+A(1-r,n),i=e-1;return R(i/e)},projectionratio:function(r,n){if(n!==2&&n!==3)return!1;if(typeof r>"u")r=.5;else if(r===0||r===1)return r;const e=A(1-r,n),i=A(r,n)+e;return e/i},lli8:function(r,n,e,i,s,u,o,l){const c=(r*i-n*e)*(s-o)-(r-e)*(s*l-u*o),a=(r*i-n*e)*(u-l)-(n-i)*(s*l-u*o),x=(r-e)*(u-l)-(n-i)*(s-o);return x==0?!1:{x:c/x,y:a/x}},lli4:function(r,n,e,i){const s=r.x,u=r.y,o=n.x,l=n.y,c=e.x,a=e.y,x=i.x,f=i.y;return h.lli8(s,u,o,l,c,a,x,f)},lli:function(r,n){return h.lli4(r,r.c,n,n.c)},makeline:function(r,n){return new _(r.x,r.y,(r.x+n.x)/2,(r.y+n.y)/2,n.x,n.y)},findbbox:function(r){let n=H,e=H,i=W,s=W;return r.forEach(function(u){const o=u.bbox();n>o.x.min&&(n=o.x.min),e>o.y.min&&(e=o.y.min),i<o.x.max&&(i=o.x.max),s<o.y.max&&(s=o.y.max)}),{x:{min:n,mid:(n+i)/2,max:i,size:i-n},y:{min:e,mid:(e+s)/2,max:s,size:s-e}}},shapeintersections:function(r,n,e,i,s){if(!h.bboxoverlap(n,i))return[];const u=[],o=[r.startcap,r.forward,r.back,r.endcap],l=[e.startcap,e.forward,e.back,e.endcap];return o.forEach(function(c){c.virtual||l.forEach(function(a){if(a.virtual)return;const x=c.intersects(a,s);x.length>0&&(x.c1=c,x.c2=a,x.s1=r,x.s2=e,u.push(x))})}),u},makeshape:function(r,n,e){const i=n.points.length,s=r.points.length,u=h.makeline(n.points[i-1],r.points[0]),o=h.makeline(r.points[s-1],n.points[0]),l={startcap:u,forward:r,back:n,endcap:o,bbox:h.findbbox([u,r,n,o])};return l.intersections=function(c){return h.shapeintersections(l,l.bbox,c,c.bbox,e)},l},getminmax:function(r,n,e){if(!e)return{min:0,max:0};let i=H,s=W,u,o;e.indexOf(0)===-1&&(e=[0].concat(e)),e.indexOf(1)===-1&&e.push(1);for(let l=0,c=e.length;l<c;l++)u=e[l],o=r.get(u),o[n]<i&&(i=o[n]),o[n]>s&&(s=o[n]);return{min:i,mid:(i+s)/2,max:s,size:s-i}},align:function(r,n){const e=n.p1.x,i=n.p1.y,s=-F(n.p2.y-i,n.p2.x-e),u=function(o){return{x:(o.x-e)*M(s)-(o.y-i)*L(s),y:(o.x-e)*L(s)+(o.y-i)*M(s)}};return r.map(u)},roots:function(r,n){n=n||{p1:{x:0,y:0},p2:{x:1,y:0}};const e=r.length-1,i=h.align(r,n),s=function(d){return 0<=d&&d<=1};if(e===2){const d=i[0].y,z=i[1].y,T=i[2].y,C=d-2*z+T;if(C!==0){const S=-j(z*z-d*T),b=-d+z,N=-(S+b)/C,U=-(-S+b)/C;return[N,U].filter(s)}else if(z!==T&&C===0)return[(2*z-T)/(2*z-2*T)].filter(s);return[]}const u=i[0].y,o=i[1].y,l=i[2].y,c=i[3].y;let a=-u+3*o-3*l+c,x=3*u-6*o+3*l,f=-3*u+3*o,y=u;if(h.approximately(a,0)){if(h.approximately(x,0))return h.approximately(f,0)?[]:[-y/f].filter(s);const d=j(f*f-4*x*y),z=2*x;return[(d-f)/z,(-f-d)/z].filter(s)}x/=a,f/=a,y/=a;const p=(3*f-x*x)/3,g=p/3,v=(2*x*x*x-9*x*f+27*y)/27,E=v/2,k=E*E+g*g*g;let q,w,P,m,O;if(k<0){const d=-p/3,z=d*d*d,T=j(z),C=-v/(2*T),S=C<-1?-1:C>1?1:C,b=K(S),N=$(T),U=2*N;return P=U*M(b/3)-x/3,m=U*M((b+X)/3)-x/3,O=U*M((b+2*X)/3)-x/3,[P,m,O].filter(s)}else{if(k===0)return q=E<0?$(-E):-$(E),P=2*q-x/3,m=-q-x/3,[P,m].filter(s);{const d=j(k);return q=$(-E+d),w=$(E+d),[q-w-x/3].filter(s)}}},droots:function(r){if(r.length===3){const n=r[0],e=r[1],i=r[2],s=n-2*e+i;if(s!==0){const u=-j(e*e-n*i),o=-n+e,l=-(u+o)/s,c=-(-u+o)/s;return[l,c]}else if(e!==i&&s===0)return[(2*e-i)/(2*(e-i))];return[]}if(r.length===2){const n=r[0],e=r[1];return n!==e?[n/(n-e)]:[]}return[]},curvature:function(r,n,e,i,s){let u,o,l,c,a=0,x=0;const f=h.compute(r,n),y=h.compute(r,e),p=f.x*f.x+f.y*f.y;if(i?(u=j(A(f.y*y.z-y.y*f.z,2)+A(f.z*y.x-y.z*f.x,2)+A(f.x*y.y-y.x*f.y,2)),o=A(p+f.z*f.z,3/2)):(u=f.x*y.y-f.y*y.x,o=A(p,3/2)),u===0||o===0)return{k:0,r:0};if(a=u/o,x=o/u,!s){const g=h.curvature(r-.001,n,e,i,!0).k,v=h.curvature(r+.001,n,e,i,!0).k;c=(v-a+(a-g))/2,l=(R(v-a)+R(a-g))/2}return{k:a,r:x,dk:c,adk:l}},inflections:function(r){if(r.length<4)return[];const n=h.align(r,{p1:r[0],p2:r.slice(-1)[0]}),e=n[2].x*n[1].y,i=n[3].x*n[1].y,s=n[1].x*n[2].y,u=n[3].x*n[2].y,o=18*(-3*e+2*i+3*s-u),l=18*(3*e-i-3*s),c=18*(s-e);if(h.approximately(o,0)){if(!h.approximately(l,0)){let y=-c/l;if(0<=y&&y<=1)return[y]}return[]}const a=l*l-4*o*c,x=Math.sqrt(a),f=2*o;return h.approximately(f,0)?[]:[(x-l)/f,-(l+x)/f].filter(function(y){return 0<=y&&y<=1})},bboxoverlap:function(r,n){const e=["x","y"],i=e.length;for(let s=0,u,o,l,c;s<i;s++)if(u=e[s],o=r[u].mid,l=n[u].mid,c=(r[u].size+n[u].size)/2,R(o-l)>=c)return!1;return!0},expandbox:function(r,n){n.x.min<r.x.min&&(r.x.min=n.x.min),n.y.min<r.y.min&&(r.y.min=n.y.min),n.z&&n.z.min<r.z.min&&(r.z.min=n.z.min),n.x.max>r.x.max&&(r.x.max=n.x.max),n.y.max>r.y.max&&(r.y.max=n.y.max),n.z&&n.z.max>r.z.max&&(r.z.max=n.z.max),r.x.mid=(r.x.min+r.x.max)/2,r.y.mid=(r.y.min+r.y.max)/2,r.z&&(r.z.mid=(r.z.min+r.z.max)/2),r.x.size=r.x.max-r.x.min,r.y.size=r.y.max-r.y.min,r.z&&(r.z.size=r.z.max-r.z.min)},pairiteration:function(r,n,e){const i=r.bbox(),s=n.bbox(),u=1e5,o=e||.5;if(i.x.size+i.y.size<o&&s.x.size+s.y.size<o)return[(u*(r._t1+r._t2)/2|0)/u+"/"+(u*(n._t1+n._t2)/2|0)/u];let l=r.split(.5),c=n.split(.5),a=[{left:l.left,right:c.left},{left:l.left,right:c.right},{left:l.right,right:c.right},{left:l.right,right:c.left}];a=a.filter(function(f){return h.bboxoverlap(f.left.bbox(),f.right.bbox())});let x=[];return a.length===0||(a.forEach(function(f){x=x.concat(h.pairiteration(f.left,f.right,o))}),x=x.filter(function(f,y){return x.indexOf(f)===y})),x},getccenter:function(r,n,e){const i=n.x-r.x,s=n.y-r.y,u=e.x-n.x,o=e.y-n.y,l=i*M(I)-s*L(I),c=i*L(I)+s*M(I),a=u*M(I)-o*L(I),x=u*L(I)+o*M(I),f=(r.x+n.x)/2,y=(r.y+n.y)/2,p=(n.x+e.x)/2,g=(n.y+e.y)/2,v=f+l,E=y+c,k=p+a,q=g+x,w=h.lli8(f,y,v,E,p,g,k,q),P=h.dist(w,r);let m=F(r.y-w.y,r.x-w.x),O=F(n.y-w.y,n.x-w.x),d=F(e.y-w.y,e.x-w.x),z;return m<d?((m>O||O>d)&&(m+=X),m>d&&(z=d,d=m,m=z)):d<O&&O<m?(z=d,d=m,m=z):d+=X,w.s=m,w.e=d,w.r=P,w},numberSort:function(r,n){return r-n}};class G{constructor(n){this.curves=[],this._3d=!1,n&&(this.curves=n,this._3d=this.curves[0]._3d)}setJoinC_0(){}valueOf(){return this.toString()}toString(){return"["+this.curves.map(function(n){return h.pointsToString(n.points)}).join(", ")+"]"}addCurve(n){this.curves.push(n),this._3d=this._3d||n._3d}length(){return this.curves.map(function(n){return n.length()}).reduce(function(n,e){return n+e})}curve(n){return this.curves[n]}bbox(){const n=this.curves;for(var e=n[0].bbox(),i=1;i<n.length;i++)h.expandbox(e,n[i].bbox());return e}offset(n){const e=[];return this.curves.forEach(function(i){e.push(...i.offset(n))}),new G(e)}}const{abs:J,min:Y,max:Q,cos:nt,sin:et,acos:it,sqrt:D}=Math,rt=Math.PI;class _{constructor(n){let e=n&&n.forEach?n:Array.from(arguments).slice(),i=!1;if(typeof e[0]=="object"){i=e.length;const p=[];e.forEach(function(g){["x","y","z"].forEach(function(v){typeof g[v]<"u"&&p.push(g[v])})}),e=p}let s=!1;const u=e.length;if(i){if(i>4){if(arguments.length!==1)throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");s=!0}}else if(u!==6&&u!==8&&u!==9&&u!==12&&arguments.length!==1)throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");const o=this._3d=!s&&(u===9||u===12)||n&&n[0]&&typeof n[0].z<"u",l=this.points=[];for(let p=0,g=o?3:2;p<u;p+=g){var c={x:e[p],y:e[p+1]};o&&(c.z=e[p+2]),l.push(c)}const a=this.order=l.length-1,x=this.dims=["x","y"];o&&x.push("z"),this.dimlen=x.length;const f=h.align(l,{p1:l[0],p2:l[a]}),y=h.dist(l[0],l[a]);this._linear=f.reduce((p,g)=>p+J(g.y),0)<y/50,this._lut=[],this._t1=0,this._t2=1,this.update()}static quadraticFromPoints(n,e,i,s){if(typeof s>"u"&&(s=.5),s===0)return new _(e,e,i);if(s===1)return new _(n,e,e);const u=_.getABC(2,n,e,i,s);return new _(n,u.A,i)}static cubicFromPoints(n,e,i,s,u){typeof s>"u"&&(s=.5);const o=_.getABC(3,n,e,i,s);typeof u>"u"&&(u=h.dist(e,o.C));const l=u*(1-s)/s,c=h.dist(n,i),a=(i.x-n.x)/c,x=(i.y-n.y)/c,f=u*a,y=u*x,p=l*a,g=l*x,v={x:e.x-f,y:e.y-y},E={x:e.x+p,y:e.y+g},k=o.A,q={x:k.x+(v.x-k.x)/(1-s),y:k.y+(v.y-k.y)/(1-s)},w={x:k.x+(E.x-k.x)/s,y:k.y+(E.y-k.y)/s},P={x:n.x+(q.x-n.x)/s,y:n.y+(q.y-n.y)/s},m={x:i.x+(w.x-i.x)/(1-s),y:i.y+(w.y-i.y)/(1-s)};return new _(n,P,m,i)}static getUtils(){return h}getUtils(){return _.getUtils()}static get PolyBezier(){return G}valueOf(){return this.toString()}toString(){return h.pointsToString(this.points)}toSVG(){if(this._3d)return!1;const n=this.points,e=n[0].x,i=n[0].y,s=["M",e,i,this.order===2?"Q":"C"];for(let u=1,o=n.length;u<o;u++)s.push(n[u].x),s.push(n[u].y);return s.join(" ")}setRatios(n){if(n.length!==this.points.length)throw new Error("incorrect number of ratio values");this.ratios=n,this._lut=[]}verify(){const n=this.coordDigest();n!==this._print&&(this._print=n,this.update())}coordDigest(){return this.points.map(function(n,e){return""+e+n.x+n.y+(n.z?n.z:0)}).join("")}update(){this._lut=[],this.dpoints=h.derive(this.points,this._3d),this.computedirection()}computedirection(){const n=this.points,e=h.angle(n[0],n[this.order],n[1]);this.clockwise=e>0}length(){return h.length(this.derivative.bind(this))}static getABC(n=2,e,i,s,u=.5){const o=h.projectionratio(u,n),l=1-o,c={x:o*e.x+l*s.x,y:o*e.y+l*s.y},a=h.abcratio(u,n);return{A:{x:i.x+(i.x-c.x)/a,y:i.y+(i.y-c.y)/a},B:i,C:c,S:e,E:s}}getABC(n,e){e=e||this.get(n);let i=this.points[0],s=this.points[this.order];return _.getABC(this.order,i,e,s,n)}getLUT(n){if(this.verify(),n=n||100,this._lut.length===n)return this._lut;this._lut=[],n++,this._lut=[];for(let e=0,i,s;e<n;e++)s=e/(n-1),i=this.compute(s),i.t=s,this._lut.push(i);return this._lut}on(n,e){e=e||5;const i=this.getLUT(),s=[];for(let u=0,o,l=0;u<i.length;u++)o=i[u],h.dist(o,n)<e&&(s.push(o),l+=u/i.length);return s.length?t/=s.length:!1}project(n){const e=this.getLUT(),i=e.length-1,s=h.closest(e,n),u=s.mpos,o=(u-1)/i,l=(u+1)/i,c=.1/i;let a=s.mdist,x=o,f=x,y;a+=1;for(let p;x<l+c;x+=c)y=this.compute(x),p=h.dist(n,y),p<a&&(a=p,f=x);return f=f<0?0:f>1?1:f,y=this.compute(f),y.t=f,y.d=a,y}get(n){return this.compute(n)}point(n){return this.points[n]}compute(n){return this.ratios?h.computeWithRatios(n,this.points,this.ratios,this._3d):h.compute(n,this.points,this._3d,this.ratios)}raise(){const n=this.points,e=[n[0]],i=n.length;for(let s=1,u,o;s<i;s++)u=n[s],o=n[s-1],e[s]={x:(i-s)/i*u.x+s/i*o.x,y:(i-s)/i*u.y+s/i*o.y};return e[i]=n[i-1],new _(e)}derivative(n){return h.compute(n,this.dpoints[0],this._3d)}dderivative(n){return h.compute(n,this.dpoints[1],this._3d)}align(){let n=this.points;return new _(h.align(n,{p1:n[0],p2:n[n.length-1]}))}curvature(n){return h.curvature(n,this.dpoints[0],this.dpoints[1],this._3d)}inflections(){return h.inflections(this.points)}normal(n){return this._3d?this.__normal3(n):this.__normal2(n)}__normal2(n){const e=this.derivative(n),i=D(e.x*e.x+e.y*e.y);return{x:-e.y/i,y:e.x/i}}__normal3(n){const e=this.derivative(n),i=this.derivative(n+.01),s=D(e.x*e.x+e.y*e.y+e.z*e.z),u=D(i.x*i.x+i.y*i.y+i.z*i.z);e.x/=s,e.y/=s,e.z/=s,i.x/=u,i.y/=u,i.z/=u;const o={x:i.y*e.z-i.z*e.y,y:i.z*e.x-i.x*e.z,z:i.x*e.y-i.y*e.x},l=D(o.x*o.x+o.y*o.y+o.z*o.z);o.x/=l,o.y/=l,o.z/=l;const c=[o.x*o.x,o.x*o.y-o.z,o.x*o.z+o.y,o.x*o.y+o.z,o.y*o.y,o.y*o.z-o.x,o.x*o.z-o.y,o.y*o.z+o.x,o.z*o.z];return{x:c[0]*e.x+c[1]*e.y+c[2]*e.z,y:c[3]*e.x+c[4]*e.y+c[5]*e.z,z:c[6]*e.x+c[7]*e.y+c[8]*e.z}}hull(n){let e=this.points,i=[],s=[],u=0;for(s[u++]=e[0],s[u++]=e[1],s[u++]=e[2],this.order===3&&(s[u++]=e[3]);e.length>1;){i=[];for(let o=0,l,c=e.length-1;o<c;o++)l=h.lerp(n,e[o],e[o+1]),s[u++]=l,i.push(l);e=i}return s}split(n,e){if(n===0&&e)return this.split(e).left;if(e===1)return this.split(n).right;const i=this.hull(n),s={left:this.order===2?new _([i[0],i[3],i[5]]):new _([i[0],i[4],i[7],i[9]]),right:this.order===2?new _([i[5],i[4],i[2]]):new _([i[9],i[8],i[6],i[3]]),span:i};return s.left._t1=h.map(0,0,1,this._t1,this._t2),s.left._t2=h.map(n,0,1,this._t1,this._t2),s.right._t1=h.map(n,0,1,this._t1,this._t2),s.right._t2=h.map(1,0,1,this._t1,this._t2),e?(e=h.map(e,n,1,0,1),s.right.split(e).left):s}extrema(){const n={};let e=[];return this.dims.forEach(function(i){let s=function(o){return o[i]},u=this.dpoints[0].map(s);n[i]=h.droots(u),this.order===3&&(u=this.dpoints[1].map(s),n[i]=n[i].concat(h.droots(u))),n[i]=n[i].filter(function(o){return o>=0&&o<=1}),e=e.concat(n[i].sort(h.numberSort))}.bind(this)),n.values=e.sort(h.numberSort).filter(function(i,s){return e.indexOf(i)===s}),n}bbox(){const n=this.extrema(),e={};return this.dims.forEach(function(i){e[i]=h.getminmax(this,i,n[i])}.bind(this)),e}overlaps(n){const e=this.bbox(),i=n.bbox();return h.bboxoverlap(e,i)}offset(n,e){if(typeof e<"u"){const i=this.get(n),s=this.normal(n),u={c:i,n:s,x:i.x+s.x*e,y:i.y+s.y*e};return this._3d&&(u.z=i.z+s.z*e),u}if(this._linear){const i=this.normal(0),s=this.points.map(function(u){const o={x:u.x+n*i.x,y:u.y+n*i.y};return u.z&&i.z&&(o.z=u.z+n*i.z),o});return[new _(s)]}return this.reduce().map(function(i){return i._linear?i.offset(n)[0]:i.scale(n)})}simple(){if(this.order===3){const s=h.angle(this.points[0],this.points[3],this.points[1]),u=h.angle(this.points[0],this.points[3],this.points[2]);if(s>0&&u<0||s<0&&u>0)return!1}const n=this.normal(0),e=this.normal(1);let i=n.x*e.x+n.y*e.y;return this._3d&&(i+=n.z*e.z),J(it(i))<rt/3}reduce(){let n,e=0,i=0,s=.01,u,o=[],l=[],c=this.extrema().values;for(c.indexOf(0)===-1&&(c=[0].concat(c)),c.indexOf(1)===-1&&c.push(1),e=c[0],n=1;n<c.length;n++)i=c[n],u=this.split(e,i),u._t1=e,u._t2=i,o.push(u),e=i;return o.forEach(function(a){for(e=0,i=0;i<=1;)for(i=e+s;i<=1+s;i+=s)if(u=a.split(e,i),!u.simple()){if(i-=s,J(e-i)<s)return[];u=a.split(e,i),u._t1=h.map(e,0,1,a._t1,a._t2),u._t2=h.map(i,0,1,a._t1,a._t2),l.push(u),e=i;break}e<1&&(u=a.split(e,1),u._t1=h.map(e,0,1,a._t1,a._t2),u._t2=a._t2,l.push(u))}),l}translate(n,e,i){i=typeof i=="number"?i:e;const s=this.order;let u=this.points.map((o,l)=>(1-l/s)*e+l/s*i);return new _(this.points.map((o,l)=>({x:o.x+n.x*u[l],y:o.y+n.y*u[l]})))}scale(n){const e=this.order;let i=!1;if(typeof n=="function"&&(i=n),i&&e===2)return this.raise().scale(i);const s=this.clockwise,u=this.points;if(this._linear)return this.translate(this.normal(0),i?i(0):n,i?i(1):n);const o=i?i(0):n,l=i?i(1):n,c=[this.offset(0,10),this.offset(1,10)],a=[],x=h.lli4(c[0],c[0].c,c[1],c[1].c);if(!x)throw new Error("cannot scale this curve. Try reducing it first.");return[0,1].forEach(function(f){const y=a[f*e]=h.copy(u[f*e]);y.x+=(f?l:o)*c[f].n.x,y.y+=(f?l:o)*c[f].n.y}),i?([0,1].forEach(function(f){if(!(e===2&&f)){var y=u[f+1],p={x:y.x-x.x,y:y.y-x.y},g=i?i((f+1)/e):n;i&&!s&&(g=-g);var v=D(p.x*p.x+p.y*p.y);p.x/=v,p.y/=v,a[f+1]={x:y.x+g*p.x,y:y.y+g*p.y}}}),new _(a)):([0,1].forEach(f=>{if(e===2&&f)return;const y=a[f*e],p=this.derivative(f),g={x:y.x+p.x,y:y.y+p.y};a[f+1]=h.lli4(y,g,x,u[f+1])}),new _(a))}outline(n,e,i,s){if(e=e===void 0?n:e,this._linear){const m=this.normal(0),O=this.points[0],d=this.points[this.points.length-1];let z,T,C;i===void 0&&(i=n,s=e),z={x:O.x+m.x*n,y:O.y+m.y*n},C={x:d.x+m.x*i,y:d.y+m.y*i},T={x:(z.x+C.x)/2,y:(z.y+C.y)/2};const S=[z,T,C];z={x:O.x-m.x*e,y:O.y-m.y*e},C={x:d.x-m.x*s,y:d.y-m.y*s},T={x:(z.x+C.x)/2,y:(z.y+C.y)/2};const b=[C,T,z],N=h.makeline(b[2],S[0]),U=h.makeline(S[2],b[0]),Z=[N,new _(S),U,new _(b)];return new G(Z)}const u=this.reduce(),o=u.length,l=[];let c=[],a,x=0,f=this.length();const y=typeof i<"u"&&typeof s<"u";function p(m,O,d,z,T){return function(C){const S=z/d,b=(z+T)/d,N=O-m;return h.map(C,0,1,m+S*N,m+b*N)}}u.forEach(function(m){const O=m.length();y?(l.push(m.scale(p(n,i,f,x,O))),c.push(m.scale(p(-e,-s,f,x,O)))):(l.push(m.scale(n)),c.push(m.scale(-e))),x+=O}),c=c.map(function(m){return a=m.points,a[3]?m.points=[a[3],a[2],a[1],a[0]]:m.points=[a[2],a[1],a[0]],m}).reverse();const g=l[0].points[0],v=l[o-1].points[l[o-1].points.length-1],E=c[o-1].points[c[o-1].points.length-1],k=c[0].points[0],q=h.makeline(E,g),w=h.makeline(v,k),P=[q].concat(l).concat([w]).concat(c);return new G(P)}outlineshapes(n,e,i){e=e||n;const s=this.outline(n,e).curves,u=[];for(let o=1,l=s.length;o<l/2;o++){const c=h.makeshape(s[o],s[l-o],i);c.startcap.virtual=o>1,c.endcap.virtual=o<l/2-1,u.push(c)}return u}intersects(n,e){return n?n.p1&&n.p2?this.lineIntersects(n):(n instanceof _&&(n=n.reduce()),this.curveintersects(this.reduce(),n,e)):this.selfintersects(e)}lineIntersects(n){const e=Y(n.p1.x,n.p2.x),i=Y(n.p1.y,n.p2.y),s=Q(n.p1.x,n.p2.x),u=Q(n.p1.y,n.p2.y);return h.roots(this.points,n).filter(o=>{var l=this.get(o);return h.between(l.x,e,s)&&h.between(l.y,i,u)})}selfintersects(n){const e=this.reduce(),i=e.length-2,s=[];for(let u=0,o,l,c;u<i;u++)l=e.slice(u,u+1),c=e.slice(u+2),o=this.curveintersects(l,c,n),s.push(...o);return s}curveintersects(n,e,i){const s=[];n.forEach(function(o){e.forEach(function(l){o.overlaps(l)&&s.push({left:o,right:l})})});let u=[];return s.forEach(function(o){const l=h.pairiteration(o.left,o.right,i);l.length>0&&(u=u.concat(l))}),u}arcs(n){return n=n||.5,this._iterate(n,[])}_error(n,e,i,s){const u=(s-i)/4,o=this.get(i+u),l=this.get(s-u),c=h.dist(n,e),a=h.dist(n,o),x=h.dist(n,l);return J(a-c)+J(x-c)}_iterate(n,e){let i=0,s=1,u;do{u=0,s=1;let o=this.get(i),l,c,a,x,f=!1,y=!1,p,g=s,v=1;do if(y=f,x=a,g=(i+s)/2,l=this.get(g),c=this.get(s),a=h.getccenter(o,l,c),a.interval={start:i,end:s},f=this._error(a,o,i,s)<=n,p=y&&!f,p||(v=s),f){if(s>=1){if(a.interval.end=v=1,x=a,s>1){let k={x:a.x+a.r*nt(a.e),y:a.y+a.r*et(a.e)};a.e+=h.angle({x:a.x,y:a.y},k,this.get(1))}break}s=s+(s-i)/2}else s=g;while(!p&&u++<100);if(u>=100)break;x=x||a,e.push(x),i=v}while(s<1);return e}}function st(r,n,e){var i,s;if(r.length==3&&n.length==3)i=new _(r[0],n[0],r[1],n[1],r[2],n[2]),s="quadratic";else if(r.length==4&&n.length==4)i=new _(r[0],n[0],r[1],n[1],r[2],n[2],r[3],n[3]),s="cubic";else throw new Error("Invalid curve input control points.");return e&&console.log(`Bézier ${s} curve:
`,i),i}function ot(r){var n=1e3;for(let e=0,i,s;e<n;e++)s=e/(n-1),i=r.compute(s),i.t=s,r._lut.push(i);return r._lut}function ut(r,n=100){return r.getLUT(n),r._lut}function lt(r){return r._curvelength=r.length()}function ct(r,n,e){return e?r._curvepoint=r.get(n):r.get(n)}function at(r,n){var e=r.derivative(n);return e.x*=1/(r._t2-r._t1),e.y*=1/(r._t2-r._t1),r._derivative=e}function ft(r,n){for(var e=[],i=0,s=0;i<=1;i+=n,s++)e[s]=r.derivative(i),e[s].x*=1/(r._t2-r._t1),e[s].y*=1/(r._t2-r._t1);return r._derivatives=e}function ht(r,n,e){return e?{x:r.normal(n).x,y:r.normal(n).y,t:n}:r._normal={x:r.normal(n).x,y:r.normal(n).y,t:n}}function xt(r,n){for(var e=[],i=0,s=0;i<=1;i+=n,s++)e[s]={x:r.normal(i).x,y:r.normal(i).y,t:i};return r._normals=e}function yt(r,n,e){return e?r._subcurve=r.split(n,e):r._subcurves=[r.split(n).left,r.split(n).right]}function pt(r){return r._extremas=r.extrema()}function mt(r){return r._inflectionpoints=r.inflections()}function dt(r,n){return r._curvature={k:r.curvature(n).k,r:r.curvature(n).r,t:n}}function gt(r,n=2){for(var e=[],i=0,s=0;i<256;i+=n,s++){let u=i/255;e[s]={k:r.curvature(u).k,r:r.curvature(u).r,t:u}}return r._curvatures=e}function zt(r){return r._boundingbox=r.bbox()}function _t(r,n){return r._hullpoints=r.hull(n)}function vt(r,n){return r._projectpoint=r.project(n)}function wt(r,n,e){return e?r._offsetpoint=r.offset(e,n):r._offsetcurves=r.offset(n)}function Ct(r){return r._reducedcurves=r.reduce()}function kt(r,n=.5){return r._arcs=r.arcs(n)}function Ot(r,n){for(var e=[],i=-30,s=0;i<=30;i+=10,s++)e[s]=n.scale(i);return r._scaledcurves=e}function Et(r,n,e,i,s){return s?r._outline=r.outline(n,e,i,s):i?r._outline=r.outline(n,e,i):e?r._outline=r.outline(n,e):r._outline=r.outline(n)}function Tt(r,n,e,i){return i?r._shapedoutline=r.outlineshapes(n,e,i):e?r._shapedoutline=r.outlineshapes(n,e):r._shapedoutline=r.outlineshapes(n)}function qt(r,n,e=.5){if(n)return n instanceof _?r._intersection=r.intersects(n,e):r._intersection=r.intersects(n);if(r.order==2)return r._intersection="no self intersection";if(r.order==3)return r._intersection=r.intersects()}function bt(r,n,e){return e?r.offset(n,e):r.offset(n)}exports.calculateArcs=kt;exports.calculateBoundingBox=zt;exports.calculateClosestPoint=vt;exports.calculateCurvature=dt;exports.calculateCurvatures=gt;exports.calculateCurveExtremas=pt;exports.calculateCurvePoints=ot;exports.calculateHullPoints=_t;exports.calculateInflectionPoints=mt;exports.calculateIntersection=qt;exports.calculateLength=lt;exports.calculateNormal=ht;exports.calculateNormals=xt;exports.calculateOffset=wt;exports.calculateOutline=Et;exports.calculateReducedCurve=Ct;exports.calculateScaledCurve=Ot;exports.calculateShapedOutline=Tt;exports.calculateTangent=at;exports.calculateTangents=ft;exports.getCurve=st;exports.getCurvePoint=ct;exports.getLookUpTable=ut;exports.getOffsetCurve=bt;exports.splitCurve=yt;
//# sourceMappingURL=calculation.cjs.map
