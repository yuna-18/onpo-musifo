import{r as n,U as e}from"./app-C0Rxql0K.js";import{c as E,f as N,g as v}from"./DisabledDetail-BuqfJXBm.js";import{A as C}from"./Input-BYgT0ITO.js";const W=E({slots:{wrapper:"smarthr-ui-CheckBox shr-inline-flex shr-items-baseline",box:["shr-border-shorthand shr-pointer-events-none shr-absolute shr-box-border shr-h-full shr-w-full shr-rounded-s shr-bg-white","contrast-more:shr-border-high-contrast","forced-colors:shr-hidden","peer-checked:shr-border-main peer-checked:shr-bg-main contrast-more:peer-checked:shr-border-high-contrast","peer-indeterminate:shr-border-main peer-indeterminate:shr-bg-main contrast-more:peer-indeterminate:shr-border-high-contrast","peer-disabled:shr-border-disabled peer-disabled:shr-bg-white-darken","peer-disabled:peer-checked:shr-border-default peer-disabled:peer-checked:shr-bg-border","peer-disabled:peer-indeterminate:shr-border-default peer-disabled:peer-indeterminate:shr-bg-border","peer-focus-visible:shr-focus-indicator","peer-hover:shr-shadow-input-hover","shr-border-default","peer-[[aria-invalid]]:shr-border-danger"],input:["smarthr-ui-CheckBox-checkBox shr-peer shr-absolute shr-left-0 shr-top-0 shr-m-0 shr-h-full shr-w-full shr-cursor-pointer shr-opacity-0 disabled:shr-pointer-events-none","forced-colors:shr-static forced-colors:shr-opacity-100"],icon:"shr-fill-current",iconWrap:["shr-pointer-events-none shr-absolute shr-left-1/2 shr-top-1/2 shr-inline-block shr-h-[theme(fontSize.2xs)] shr-w-[theme(fontSize.2xs)] -shr-translate-x-1/2 -shr-translate-y-1/2 shr-text-2xs","shr-text-transparent peer-checked:shr-text-white peer-indeterminate:shr-text-white","peer-disabled:peer-indeterminate:shr-text-white-darken peer-disabled:peer-checked:shr-text-white-darken","forced-colors:shr-hidden"],innerWrapper:"shr-relative shr-box-border shr-inline-block shr-h-[theme(fontSize.base)] shr-w-[theme(fontSize.base)] shr-shrink-0 shr-translate-y-[0.125em] shr-leading-none",label:["smarthr-ui-CheckBox-label shr-ms-0.5 shr-cursor-pointer shr-text-base shr-leading-tight","[[data-disabled=true]>&]:shr-pointer-events-none [[data-disabled=true]>&]:shr-cursor-not-allowed [[data-disabled=true]>&]:shr-text-disabled"]}}),S=n.forwardRef(({checked:r,mixed:s,error:a,className:h,children:l,disabled:i,...d},p)=>{const t=n.useMemo(()=>{const{wrapper:b,innerWrapper:u,box:f,input:x,iconWrap:k,icon:w,label:g}=W();return{wrapper:b({className:h}),innerWrapper:u(),box:f(),input:x(),iconWrap:k(),icon:w(),label:g()}},[h]),o=n.useRef(null);n.useImperativeHandle(p,()=>o.current),n.useEffect(()=>{o.current&&(o.current.indeterminate=!!(r&&s))},[r,s]);const m=n.useId(),c=d.id||m;return e.createElement("span",{"data-disabled":i,className:t.wrapper},e.createElement("span",{className:t.innerWrapper},e.createElement("input",{...d,ref:o,type:"checkbox",id:c,checked:r,disabled:i,"aria-invalid":a||void 0,className:t.input,"data-smarthr-ui-input":"true"}),e.createElement(B,{className:t.box}),e.createElement(F,{mixed:s,className:t.iconWrap,iconClassName:t.icon})),e.createElement(I,{htmlFor:c,className:t.label},l))}),B=e.memo(({className:r})=>e.createElement("span",{className:r,"aria-hidden":"true"})),F=e.memo(({mixed:r,className:s,iconClassName:a})=>e.createElement("span",{className:s},r?e.createElement(N,{className:a}):e.createElement(v,{className:a}))),I=e.memo(({children:r,htmlFor:s,className:a})=>r&&e.createElement("label",{htmlFor:s,className:a},r)),R=r=>e.createElement(C,{...r,as:"fieldset"});export{S as C,R as F};
