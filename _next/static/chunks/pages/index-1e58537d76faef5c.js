(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(n,r,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return e(4592)}])},4592:function(n,r,e){"use strict";e.r(r),e.d(r,{default:function(){return Z}});var t=e(5893),a=e(7294),o=e(7018),u=e(3321),i=e(7948),s=e(5861),c=e(4051),l=e.n(c),f=e(1903),d=e(3457),h=e(9402);function y(n,r){(null==r||r>n.length)&&(r=n.length);for(var e=0,t=new Array(r);e<r;e++)t[e]=n[e];return t}function p(n,r,e,t,a,o,u){try{var i=n[o](u),s=i.value}catch(c){return void e(c)}i.done?r(s):Promise.resolve(s).then(t,a)}function v(n){return function(){var r=this,e=arguments;return new Promise((function(t,a){var o=n.apply(r,e);function u(n){p(o,t,a,u,i,"next",n)}function i(n){p(o,t,a,u,i,"throw",n)}u(void 0)}))}}function b(n,r){return function(n){if(Array.isArray(n))return n}(n)||function(n,r){var e=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var t,a,o=[],u=!0,i=!1;try{for(e=e.call(n);!(u=(t=e.next()).done)&&(o.push(t.value),!r||o.length!==r);u=!0);}catch(s){i=!0,a=s}finally{try{u||null==e.return||e.return()}finally{if(i)throw a}}return o}}(n,r)||function(n,r){if(!n)return;if("string"===typeof n)return y(n,r);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return y(n,r)}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(n){var r=function(n){"Enter"===n.key&&C()},e=n.onSignup,o=((0,h.Bl)(),(0,a.useState)("")),i=o[0],c=o[1],y=(0,a.useState)(""),p=y[0],m=y[1],x=b((0,h.Bl)(),2),g=x[0],j=x[1],w=(j.data,j.loading),k=j.error,A=k&&"Username already exists"===k.message;function C(){return S.apply(this,arguments)}function S(){return(S=v(l().mark((function n(){return l().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("Attempting to create an account..."),n.prev=1,n.next=4,g({variables:{name:i,password:p}});case 4:e&&e(),n.next=9;break;case 7:n.prev=7,n.t0=n.catch(1);case 9:case"end":return n.stop()}}),n,null,[[1,7]])})))).apply(this,arguments)}return(0,t.jsx)(a.Fragment,{children:(0,t.jsxs)(d.Z,{children:[(0,t.jsx)(s.Z,{children:"Create a new account. You must choose a character name that has not already been used. You may create as many accounts as you would like, however there is no account recovery."}),(0,t.jsx)("br",{}),(0,t.jsx)(f.Z,{helperText:A&&k.message,error:A,label:"Character Name",variant:"outlined",value:i,onChange:function(n){return c(n.target.value)},onKeyPress:r,disabled:w}),(0,t.jsx)("br",{}),(0,t.jsx)(f.Z,{label:"Password",variant:"outlined",type:"password",value:p,onChange:function(n){return m(n.target.value)},onKeyPress:r,disabled:w}),(0,t.jsx)("br",{}),(0,t.jsx)(u.Z,{type:"submit",variant:"contained",onClick:C,disabled:w,children:"Create Account"}),(0,t.jsx)("br",{})]})})}var x=e(1163),g=e(9692);function j(n,r){(null==r||r>n.length)&&(r=n.length);for(var e=0,t=new Array(r);e<r;e++)t[e]=n[e];return t}function w(n,r,e,t,a,o,u){try{var i=n[o](u),s=i.value}catch(c){return void e(c)}i.done?r(s):Promise.resolve(s).then(t,a)}function k(n){return function(){var r=this,e=arguments;return new Promise((function(t,a){var o=n.apply(r,e);function u(n){w(o,t,a,u,i,"next",n)}function i(n){w(o,t,a,u,i,"throw",n)}u(void 0)}))}}function A(n,r){return function(n){if(Array.isArray(n))return n}(n)||function(n,r){var e=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var t,a,o=[],u=!0,i=!1;try{for(e=e.call(n);!(u=(t=e.next()).done)&&(o.push(t.value),!r||o.length!==r);u=!0);}catch(s){i=!0,a=s}finally{try{u||null==e.return||e.return()}finally{if(i)throw a}}return o}}(n,r)||function(n,r){if(!n)return;if("string"===typeof n)return j(n,r);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return j(n,r)}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(){var n=function(n){"Enter"===n.key&&Z()},r=(0,x.useRouter)(),e=A((0,g.d)(),2),o=(e[0],e[1]),i=A((0,h.YA)(),2),c=i[0],y=i[1],p=y.loading,v=y.error,b=(0,a.useState)(""),m=b[0],j=b[1],w=(0,a.useState)(""),C=w[0],S=w[1];function Z(){return P.apply(this,arguments)}function P(){return(P=k(l().mark((function n(){var e,t,a;return l().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,c({variables:{name:m,password:C}});case 3:if(e=n.sent.data){n.next=6;break}return n.abrupt("return");case 6:t=e.login,a=t.token,o(a),r.push("/play"),n.next=13;break;case 11:n.prev=11,n.t0=n.catch(0);case 13:case"end":return n.stop()}}),n,null,[[0,11]])})))).apply(this,arguments)}return(0,t.jsx)(a.Fragment,{children:(0,t.jsxs)(d.Z,{children:[(0,t.jsx)(s.Z,{children:"This is a game about clicking things and watching numbers go up, login if you have an account already."}),(0,t.jsx)("br",{}),(0,t.jsx)(f.Z,{helperText:!!v&&v.message,error:!!v,label:"Character Name",variant:"outlined",onChange:function(n){return j(n.target.value)},disabled:p,onKeyPress:n}),(0,t.jsx)("br",{}),(0,t.jsx)(f.Z,{error:!!v,label:"Password",variant:"outlined",type:"password",onChange:function(n){return S(n.target.value)},disabled:p,onKeyPress:n}),(0,t.jsx)("br",{}),(0,t.jsx)(u.Z,{type:"submit",variant:"contained",onClick:Z,disabled:p,children:"Play"})]})})}function S(){var n=(0,a.useState)(!1),r=n[0],e=n[1];return(0,t.jsxs)(i.Z,{maxWidth:"sm",children:[r&&(0,t.jsxs)(a.Fragment,{children:[(0,t.jsx)(m,{onSignup:function(){return e(!1)}}),(0,t.jsxs)(s.Z,{children:["Already have an account?",(0,t.jsx)(u.Z,{onClick:function(){return e(!1)},children:"Login here"})]})]}),!r&&(0,t.jsxs)(a.Fragment,{children:[(0,t.jsx)(C,{}),(0,t.jsxs)(s.Z,{children:["Need an account?",(0,t.jsx)(u.Z,{onClick:function(){return e(!0)},children:"Create one"})]})]})]})}var Z=function(){return(0,t.jsxs)(o.A,{children:[(0,t.jsx)("br",{}),(0,t.jsx)(S,{}),(0,t.jsx)("br",{}),(0,t.jsx)("br",{})]})}}},function(n){n.O(0,[893,6,18,774,888,179],(function(){return r=5301,n(n.s=r);var r}));var r=n.O();_N_E=r}]);