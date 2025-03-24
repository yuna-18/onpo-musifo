import{r as H}from"./app-CAQ54Vq8.js";import{m as T,n as a,r as E,o as V,p as K,q as Q,w as Y,x as m,y as q,z as Z}from"./DisabledDetail-45Dk5s4-.js";import{c as j}from"./styled-components.browser.esm-DUl_X8WP.js";const p="1px",S="solid",J=T.BORDER,h=T.GREY_100,ee={lineWidth:p,lineStyle:S,shorthand:`${p} ${S} ${J}`,highContrast:`${p} ${S} ${h}`},re=(e={},r={})=>{const t=r.BORDER||T.BORDER;return a({...ee,shorthand:`${p} ${S} ${t}`},e)},te={SP:599,TABLET:959},oe=(e={})=>a({...te},e),R={TEXT_BLACK:"#23221e",TEXT_GREY:"#706d65",TEXT_DISABLED:"#c1bdb7",TEXT_LINK:"#0071c1",BORDER:"#d6d3d0",ACTION_BACKGROUND:"#d6d3d0",BACKGROUND:"#f8f7f6",COLUMN:"#f8f7f6",OVER_BACKGROUND:"#f2f1f0",HEAD:"#edebe8",BASE_GREY:"#f5f4f3",MAIN:"#0077c7",DANGER:"#e01e5a",WARNING:"#ff8800",SCRIM:E("#030302",.5),OVERLAY:E("#030302",.15),BRAND:"#00c4cc"},ne=(e={})=>a({hoverColor:t=>V(.05,t),disableColor:t=>E(t,.5),OUTLINE:R.MAIN,...R},e,!e.OUTLINE&&e.MAIN?{OUTLINE:e.MAIN}:null),L="1px",z="solid",ae=R.BORDER,_={border:{lineWidth:L,lineStyle:z,default:`${L} ${z} ${ae}`,radius:{s:"4px",m:"6px"}}},ce=(e={},r={})=>{const t=r.BORDER||R.BORDER;return a({border:{..._.border,default:`${L} ${z} ${t}`,radius:{..._.border.radius}}},e)},v=".3s",w="ease-out",ie={hover:{feedbackOpacity:".7",animationDuration:v,animationTiming:w,animation:`${v} ${w}`}},se=(e={})=>a({...ie},e),de={NONE:1,TIGHT:1.25,NORMAL:1.5,RELAXED:1.75},le=(e={})=>{const{...r}=e;return a(de,r)},ue={s:"4px",m:"6px",l:"8px",full:"10000px"},fe=(e={})=>a({...ue},e),pe=e=>`0 0 0 2px white, 0 0 0 4px ${e}`,Se=e=>j`
  outline: none;
  isolation: isolate;
  box-shadow: ${e};
`,Re=(e={},r={})=>{const t=pe(r.OUTLINE||T.OUTLINE);return a({...K,OUTLINE:t,focusIndicatorStyles:Se(t)},e)},Te=16,Ee=8,Le=e=>r=>`${e/r}rem`,ze=e=>({XXS:e,XS:e*2,S:e*3,M:e*4,L:e*5,XL:e*6,XXL:e*7}),be={SHORT:11,TALL:14,GRANDE:18,VENTI:24},ye={SP:599,TABLET:959},Ne=(e={})=>{const t=(e.space||{}).defaultRem||Ee;return a({pxToRem:n=>Le(n)(e.htmlFontSize||Te),space:ze(t),font:{...be},mediaQuery:{...ye}},e)},Ae=(e={})=>{const r=ge(e),t=Oe(e),o=De(e).baseSize,n=Y(o);return{palette:ne(r),color:Z(t),size:Ne(Ie(e)),fontSize:q(Be(e)),spacing:m(o),spacingByChar:n,space:n,leading:le(Xe(e)),breakpoint:oe(xe(e)),frame:ce(Ce(e),r),border:re($e(e),t),radius:fe(Pe(e)),interaction:se(e.interaction),shadow:Re(e.shadow,t),zIndex:Q(e.zIndex)}};function ge(e){return{...e.palette,...e.color}}function Oe(e){return{...e.palette,...e.color}}function Ie(e){var r,t,o,n,c,i,s,d,l,u,f,b,y,N,A,g,O,I,B,X,D,x,C,$,P,F,G,M,U,W,k;return{htmlFontSize:((r=e.fontSize)==null?void 0:r.htmlFontSize)||((t=e.size)==null?void 0:t.htmlFontSize),space:{defaultRem:(n=(o=e.size)==null?void 0:o.space)==null?void 0:n.defaultRem,XXS:(i=(c=e.size)==null?void 0:c.space)==null?void 0:i.XXS,XS:(d=(s=e.size)==null?void 0:s.space)==null?void 0:d.XS,S:(u=(l=e.size)==null?void 0:l.space)==null?void 0:u.S,M:(b=(f=e.size)==null?void 0:f.space)==null?void 0:b.M,L:(N=(y=e.size)==null?void 0:y.space)==null?void 0:N.L,XL:(g=(A=e.size)==null?void 0:A.space)==null?void 0:g.XL,XXL:(I=(O=e.size)==null?void 0:O.space)==null?void 0:I.XXL},font:{SHORT:((B=e.fontSize)==null?void 0:B.SHORT)||((D=(X=e.size)==null?void 0:X.font)==null?void 0:D.SHORT),TALL:((x=e.fontSize)==null?void 0:x.TALL)||(($=(C=e.size)==null?void 0:C.font)==null?void 0:$.TALL),GRANDE:((P=e.fontSize)==null?void 0:P.GRANDE)||((G=(F=e.size)==null?void 0:F.font)==null?void 0:G.GRANDE),VENTI:((M=e.fontSize)==null?void 0:M.VENTI)||((W=(U=e.size)==null?void 0:U.font)==null?void 0:W.VENTI)},mediaQuery:{...(k=e.size)==null?void 0:k.mediaQuery,...e.breakpoint}}}function Be(e){var r,t;return{htmlFontSize:(r=e.size)==null?void 0:r.htmlFontSize,...(t=e.size)==null?void 0:t.font,...e.fontSize}}const Xe=e=>({...e.leading});function De(e){var r;return{baseSize:(r=e.spacing)==null?void 0:r.baseSize}}function xe(e){var r;return{...(r=e.size)==null?void 0:r.mediaQuery,...e.breakpoint}}function Ce(e){var r,t,o,n,c,i,s,d,l,u,f;return{border:{lineWidth:((r=e.border)==null?void 0:r.lineWidth)||((o=(t=e.frame)==null?void 0:t.border)==null?void 0:o.lineWidth),lineStyle:((n=e.border)==null?void 0:n.lineStyle)||((i=(c=e.frame)==null?void 0:c.border)==null?void 0:i.lineStyle),default:((s=e.border)==null?void 0:s.shorthand)||((l=(d=e.frame)==null?void 0:d.border)==null?void 0:l.default),radius:{...(f=(u=e.frame)==null?void 0:u.border)==null?void 0:f.radius,...e.radius}}}}function $e(e){var r,t,o,n,c,i,s,d,l;return{lineWidth:((r=e.border)==null?void 0:r.lineWidth)||((o=(t=e.frame)==null?void 0:t.border)==null?void 0:o.lineWidth),lineStyle:((n=e.border)==null?void 0:n.lineStyle)||((i=(c=e.frame)==null?void 0:c.border)==null?void 0:i.lineStyle),shorthand:((s=e.border)==null?void 0:s.shorthand)||((l=(d=e.frame)==null?void 0:d.border)==null?void 0:l.default)}}function Pe(e){var r,t;return{...(t=(r=e.frame)==null?void 0:r.border)==null?void 0:t.radius,...e.radius}}const Fe=H.createContext(Ae()),{Provider:Ge}=Fe,ke=({theme:e,children:r})=>H.createElement(Ge,{value:e},r);export{ke as T,Ae as c};
