import e,{createContext as t,useContext as n,useMemo as r,useState as o,useEffect as a,useRef as i,Fragment as d,Children as s}from"react";import{defineEventListener as u,Handlers as c,useCollector as f,RenderIndicator as l,getDOMInfo as v,deprecationWarning as p,useEffectOnce as m,ERROR_TOP_LEVEL_ELEMENT_NO_ID as h,ROOT_NODE as y,ERROR_DELETE_TOP_LEVEL_NODE as g,ERROR_INVALID_NODEID as N,ERROR_NOPARENT as E,DEPRECATED_ROOT_NODE as b,ERROR_MOVE_TOP_LEVEL_NODE as O,ERROR_MOVE_NONCANVAS_CHILD as C,ERROR_CANNOT_DRAG as k,ERROR_MOVE_TO_NONCANVAS_PARENT as T,ERROR_MOVE_INCOMING_PARENT as P,ERROR_MOVE_CANNOT_DROP as j,ERROR_MOVE_TO_DESCENDANT as x,ERROR_DUPLICATE_NODEID as w,ERROR_MOVE_OUTGOING_PARENT as I,ERROR_INVALID_NODE_ID as D,ERROR_NOT_IN_RESOLVER as q,useMethods as L}from"@craftjs/utils";export{ROOT_NODE}from"@craftjs/utils";import R from"tiny-invariant";import{produce as S}from"immer";import z from"shortid";
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
***************************************************************************** */var A=function e(t,n){A=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t){if(t.hasOwnProperty(n))e[n]=t[n]}};return A(t,n)};function _(e,t){A(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}var F=function e(){F=Object.assign||function e(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var a in n){if(Object.prototype.hasOwnProperty.call(n,a))t[a]=n[a]}}return t};return F.apply(this,arguments)};function M(e,t){var n={};for(var r in e){if(Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0)n[r]=e[r]}if(e!=null&&typeof Object.getOwnPropertySymbols==="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++){if(t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o]))n[r[o]]=e[r[o]]}return n}function H(){for(var e=0,t=0,n=arguments.length;t<n;t++){e+=arguments[t].length}for(var r=Array(e),o=0,t=0;t<n;t++){for(var a=arguments[t],i=0,d=a.length;i<d;i++,o++){r[o]=a[i]}}return r}var W=t(null);var J=function(){return n(W)};var B=function(e){var t=e.target.cloneNode(true);var n=e.target.getBoundingClientRect(),r=n.width,o=n.height;t.style.width=r+"px";t.style.height=o+"px";t.style.position="fixed";t.style.left="-100%";t.style.top="-100%";document.body.appendChild(t);e.dataTransfer.setDragImage(t,0,0);return t};var V=function(e){_(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}t.prototype.handlers=function(){var e=this;return{select:{init:function(){return function(){return e.store.actions.setNodeEvent("selected",null)}},events:[u("mousedown",(function(t,n){t.craft.stopPropagation();e.store.actions.setNodeEvent("selected",n)}))]},hover:{init:function(){return function(){return e.store.actions.setNodeEvent("hovered",null)}},events:[u("mouseover",(function(t,n){t.craft.stopPropagation();e.store.actions.setNodeEvent("hovered",n)}))]},drop:{events:[u("dragover",(function(e){e.craft.stopPropagation();e.preventDefault()})),u("dragenter",(function(n,r){n.craft.stopPropagation();n.preventDefault();var o=t.draggedElement;if(!o){return}var a=o.rootNodeId?o.nodes[o.rootNodeId]:o;var i=n.clientX,d=n.clientY;var s=e.store.query.getDropPlaceholder(a,r,{x:i,y:d});if(!s){return}e.store.actions.setIndicator(s);t.events={indicator:s}}))]},drag:{init:function(t,n){if(!e.store.query.node(n).isDraggable()){return function(){}}t.setAttribute("draggable","true");return function(){return t.setAttribute("draggable","false")}},events:[u("dragstart",(function(n,r){n.craft.stopPropagation();e.store.actions.setNodeEvent("dragged",r);t.draggedElementShadow=B(n);t.draggedElement=r})),u("dragend",(function(t){t.craft.stopPropagation();var n=function(t,n){return e.store.actions.move(t,n.parent.id,n.index+(n.where==="after"?1:0))};e.dropElement(n)}))]},create:{init:function(e){e.setAttribute("draggable","true");return function(){return e.removeAttribute("draggable")}},events:[u("dragstart",(function(n,r){n.craft.stopPropagation();var o=e.store.query.parseReactElement(r).toNodeTree();t.draggedElementShadow=B(n);t.draggedElement=o})),u("dragend",(function(t){t.craft.stopPropagation();var n=function(t,n){var r=n.index+(n.where==="after"?1:0);e.store.actions.addNodeTree(t,n.parent.id,r)};e.dropElement(n)}))]}}};t.prototype.dropElement=function(e){var n=t.draggedElement,r=t.draggedElementShadow,o=t.events;if(n&&o.indicator&&!o.indicator.error){var a=o.indicator.placement;e(n,a)}if(r){r.parentNode.removeChild(r);t.draggedElementShadow=null}t.draggedElement=null;t.events.indicator=null;this.store.actions.setIndicator(null);this.store.actions.setNodeEvent("dragged",null)};t.prototype.derive=function(e){var t=[];for(var n=1;n<arguments.length;n++){t[n-1]=arguments[n]}return new(e.bind.apply(e,H([void 0,this.store,this],t)))};t.events={indicator:null};return t}(c);var X=function(e){_(t,e);function t(t,n){var r=e.call(this,t)||this;r.derived=n;return r}return t}(c);var Y=t({});function G(e){var t=J();var o=n(Y);var a=f(o,e);var i=r((function(){return t&&t.connectors()}),[t]);return F(F({},a),{connectors:i||{},inContext:!!o,store:o})}function K(e,t,n){var r=0,o=0,a=0,i=0,d=e.where;var s=n;if(s){if(!s.inFlow){a=2;i=s.outerHeight;r=s.top;o=d==="before"?s.left:s.left+s.outerWidth}else{a=s.outerWidth;i=2;r=d==="before"?s.top:s.bottom;o=s.left}}else{if(t){r=t.top+t.padding.top;o=t.left;a=t.outerWidth;i=2}}return{top:r+"px",left:o+"px",width:a+"px",height:i+"px"}}var Q=function(t){var n=t.children;var o=G((function(e){return{events:e.events,indicator:e.options.indicator}})),a=o.events,i=o.indicator,d=o.store;var s=r((function(){return new V(d)}),[d]);return e.createElement(W.Provider,{value:s},a.indicator&&e.createElement(l,{style:F(F({},K(a.indicator.placement,v(a.indicator.placement.parent.dom),a.indicator.placement.currentNode&&v(a.indicator.placement.currentNode.dom))),{backgroundColor:a.indicator.error?i.error:i.success,transition:"0.2s ease-in"})}),n)};var U=function(e){_(t,e);function t(t,n,r){var o=e.call(this,t,n)||this;o.id=r;return o}t.prototype.handlers=function(){var e=this;var t=this.derived.connectors();return{connect:{init:function(n){t.select(n,e.id);t.hover(n,e.id);t.drop(n,e.id);e.store.actions.setDOM(e.id,n)}},drag:{init:function(n){t.drag(n,e.id)}}}};return t}(X);var Z=e.createContext(null);var $=function(t){var n=t.id,o=t.related,a=o===void 0?false:o,i=t.children;var d=J();var s=G((function(e){return{hydrationTimestamp:e.nodes[n]&&e.nodes[n]._hydrationTimestamp}})).hydrationTimestamp;var u=r((function(){return d.derive(U,n).connectors()}),[d,s,n]);return e.createElement(Z.Provider,{value:{id:n,related:a,connectors:u}},i)};function ee(e){var t=n(Z);var o=t.id,a=t.related,i=t.connectors;var d=G((function(t){return o&&t.nodes[o]&&e&&e(t.nodes[o])})),s=d.actions,u=d.query,c=M(d,["actions","query"]);var f=r((function(){return{setProp:function(e){return s.setProp(o,e)},setCustom:function(e){return s.setCustom(o,e)},setHidden:function(e){return s.setHidden(o,e)}}}),[s,o]);return F(F({},c),{id:o,related:a,inNodeContext:!!t,actions:f,connectors:i})}function te(e){var t=ee(e),n=t.id,r=t.related,o=t.actions,a=t.inNodeContext,i=t.connectors,d=M(t,["id","related","actions","inNodeContext","connectors"]);return F(F({},d),{actions:o,id:n,related:r,setProp:function(e){p("useNode().setProp()",{suggest:"useNode().actions.setProp()"});return o.setProp(e)},inNodeContext:a,connectors:i})}var ne=function(t){var n=t.render;var r=te().connectors,o=r.connect,a=r.drag;return typeof n.type==="string"?o(a(e.cloneElement(n))):n};var re=function(){var t=ee((function(e){return{type:e.data.type,props:e.data.props,nodes:e.data.nodes,hydrationTimestamp:e._hydrationTimestamp}})),n=t.type,o=t.props,a=t.nodes,i=t.hydrationTimestamp;return r((function(){var t=e.createElement(n,o,e.createElement(e.Fragment,null,a?a.map((function(t){return e.createElement(ae,{id:t,key:t})})):o&&o.children));if(typeof n=="string"){return e.createElement(ne,{render:t})}return t}),[n,o,i,a])};var oe=function(){var t=ee((function(e){return{hidden:e.data.hidden}})).hidden;var n=G((function(e){return{onRender:e.options.onRender}})).onRender;if(t){return null}return e.createElement(n,{render:e.createElement(re,null)})};var ae=e.memo((function(t){var n=t.id;return e.createElement($,{id:n},e.createElement(oe,null))}));var ie={is:"div",canvas:false,custom:{},hidden:false};var de={is:"type",canvas:"isCanvas"};function se(t){var n=t.id,r=t.children,a=M(t,["id","children"]);var i=F(F({},ie),a),d=i.is,s=i.custom,u=i.canvas,c=M(i,["is","custom","canvas"]);var f=G(),l=f.query,v=f.actions;var p=ee((function(e){return{node:{id:e.id,data:e.data}}})),y=p.node,g=p.inNodeContext;var N=o(null),E=N[0],b=N[1];m((function(){R(!!n,h);var t=y.id,o=y.data;if(g){var i;var s=o.linkedNodes&&o.linkedNodes[n]&&l.node(o.linkedNodes[n]).get();if(s&&s.data.type===d){i=s.id;var u=F(F({},s.data.props),c);v.setProp(i,(function(e){return Object.keys(u).forEach((function(t){return e[t]=u[t]}))}))}else{var f=e.createElement(se,a,r);var p=l.parseReactElement(f).toNodeTree();i=p.rootNodeId;v.addLinkedNodeFromTree(p,t,n)}b(i)}}));return E?e.createElement(ae,{id:E}):null}var ue=function(){return p("<Canvas />",{suggest:"<Element canvas={true} />"})};function Canvas(t){var n=M(t,[]);a((function(){return ue()}),[]);return e.createElement(se,F({},n,{canvas:true}))}var ce=function(t){var n=t.children,r=t.json,d=t.data;var s=G(),u=s.actions,c=s.query;var f=o(null),l=f[0],v=f[1];if(!!r){p("<Frame json={...} />",{suggest:"<Frame data={...} />"})}var m=i({initialChildren:n,initialData:d||r});a((function(){var t=u.deserialize;var n=m.current,r=n.initialChildren,o=n.initialData;if(o){t(o)}else if(r){var a=e.Children.only(r);var i=c.parseReactElement(a).toNodeTree((function(e,t){if(t===a){e.id=y}return e}));u.addNodeTree(i)}v(e.createElement(ae,{id:y}))}),[u,c]);return l};function fe(e){var t=G(e),n=t.connectors,o=t.actions,a=o.addLinkedNodeFromTree,i=o.setDOM,d=o.setNodeEvent,s=o.replaceNodes,u=o.reset,c=M(o,["addLinkedNodeFromTree","setDOM","setNodeEvent","replaceNodes","reset"]),f=t.query,l=f.deserialize,v=M(f,["deserialize"]),p=t.store,m=M(t,["connectors","actions","query","store"]);var h=r((function(){return F(F({},c),{selectNode:function(e){d("selected",e);d("hovered",null)}})}),[c,d]);return F({connectors:n,actions:h,query:v},m)}function le(t){return function(n){return function(r){var o=t?fe(t):fe();return e.createElement(n,F({},o,r))}}}function ve(t){return function(n){return function(r){var o=te(t);return e.createElement(n,F({},o,r))}}}var pe=function(e){if(Object.fromEntries){return Object.fromEntries(e)}return e.reduce((function(e,t){var n;var r=t[0],o=t[1];return F(F({},e),(n={},n[r]=o,n))}),{})};var me=function(e,t,n){Object.keys(e.events).forEach((function(r){if(e.events[r]&&e.events[r]===t){e.events[r]=n?null:t}}))};var he=function(e,t){var n=function(t,n,r){console.log("addNodeToParentAtIndex",t,n);var a=o(n);if(!a.data.nodes){a.data.nodes=[]}if(a.data.props.children){delete a.data.props["children"]}if(r!=null){a.data.nodes.splice(r,0,t.id)}else{a.data.nodes.push(t.id)}t.data.parent=a.id;e.nodes[t.id]=t};var r=function(t,o,a){console.log("addTreeToParentAtIndex",t);var i=t.nodes[t.rootNodeId];if(o!=null){n(i,o,a)}if(i.data.nodes){var d=H(i.data.nodes);i.data.nodes=[];d.forEach((function(e,n){return r({rootNodeId:e,nodes:t.nodes},i.id,n)}))}if(i.data.linkedNodes){Object.keys(i.data.linkedNodes).forEach((function(n){var o=i.data.linkedNodes[n];e.nodes[o]=t.nodes[o];r({rootNodeId:o,nodes:t.nodes})}))}};var o=function(t){console.log("getParent",t);R(t,E);var n=e.nodes[t];console.log(n);R(n,N);return n};var a=function(t,n){if(n===void 0){n=false}var r=e.nodes[t],o=e.nodes[r.data.parent];if(r.data.nodes){H(r.data.nodes).forEach((function(e){return a(e)}))}if(n&&o.data.linkedNodes){var i=Object.keys(o.data.linkedNodes).filter((function(e){return o.data.linkedNodes[e]===e}))[0];if(i){delete o.data.linkedNodes[i]}}else{var d=o.data.nodes;d.splice(d.indexOf(t),1)}me(e,t,true);delete e.nodes[t]};return{addLinkedNodeFromTree:function(t,n,i){var d=o(n);if(!d.data.linkedNodes){d.data.linkedNodes={}}var s=d.data.linkedNodes[i];if(s){a(s,true)}d.data.linkedNodes[i]=t.rootNodeId;t.nodes[t.rootNodeId].data.parent=n;e.nodes[t.rootNodeId]=t.nodes[t.rootNodeId];r(t)},add:function(e,t,r){var o=[e];if(Array.isArray(e)){p("actions.add(node: Node[])",{suggest:"actions.add(node: Node)"});o=e}o.forEach((function(e){n(e,t,r)}))},addNodeTree:function(t,n,o){console.log("Add node tree",t.nodes,t.rootNodeId);var a=t.nodes[t.rootNodeId];if(!n){R(t.rootNodeId===y,"Cannot add non-root Node without a parent");e.nodes[t.rootNodeId]=a}r(t,n,o)},delete:function(e){R(!t.node(e).isTopLevelNode(),g);a(e)},deserialize:function(e){var n=typeof e=="string"?JSON.parse(e):e;var r=Object.keys(n).map((function(e){var r=e;if(e===b){r=y}return[r,t.parseSerializedNode(n[e]).toNode((function(e){return e.id=r}))]}));this.replaceNodes(pe(r))},move:function(n,r,o){var a=e.nodes[n],i=a.data.parent,d=e.nodes[r],s=d.data.nodes;t.node(r).isDroppable(a,(function(e){throw new Error(e)}));var u=e.nodes[i],c=u.data.nodes;c[c.indexOf(n)]="marked";if(s){s.splice(o,0,n)}else{d.data.nodes=[n]}e.nodes[n].data.parent=r;e.nodes[n].data.index=o;c.splice(c.indexOf("marked"),1)},replaceNodes:function(t){e.nodes=t;this.clearEvents()},clearEvents:function(){e.events=qe.events},reset:function(){this.replaceNodes({});this.clearEvents()},setOptions:function(t){t(e.options)},setNodeEvent:function(t,n){var r=e.events[t];if(r&&n!==r){e.nodes[r].events[t]=false}if(n){e.nodes[n].events[t]=true;e.events[t]=n}else{e.events[t]=null}},setCustom:function(t,n){n(e.nodes[t].data.custom)},setDOM:function(t,n){R(e.nodes[t],N);e.nodes[t].dom=n},setIndicator:function(t){if(t&&(!t.placement.parent.dom||t.placement.currentNode&&!t.placement.currentNode.dom))return;e.events.indicator=t},setHidden:function(t,n){e.nodes[t].data.hidden=n},setProp:function(t,n){R(e.nodes[t],N);n(e.nodes[t].data.props)}}};function ye(e,t,n,r){var o={parent:e,index:0,where:"before"};var a=0,i=0,d=0,s=0,u=0,c=0,f=0;for(var l=0,v=t.length;l<v;l++){var p=t[l];d=p.left+p.outerWidth;f=p.top+p.outerHeight;u=p.left+p.outerWidth/2;c=p.top+p.outerHeight/2;if(i&&p.left>i||s&&c>=s||a&&d<a)continue;o.index=l;if(!p.inFlow){if(r<f)s=f;if(n<u){i=u;o.where="before"}else{a=u;o.where="after"}}else{if(r<c){o.where="before";break}else o.where="after"}}return o}var ge=z;function Ne(t,n){var r=t.data.type;var o=t.id||ge();return S({},(function(a){a.id=o;a._hydrationTimestamp=Date.now();a.data=F({type:r,props:F({},t.data.props),name:typeof r=="string"?r:r.name,displayName:typeof r=="string"?r:r.name,custom:{},isCanvas:false,hidden:false},t.data);a.related={};a.events={selected:false,dragged:false,hovered:false};a.rules=F({canDrag:function(){return true},canDrop:function(){return true},canMoveIn:function(){return true},canMoveOut:function(){return true}},r.craft&&r.craft.rules||{});if(a.data.type===se||a.data.type===Canvas){var i=a.data.type===Canvas;var d=F(F({},ie),a.data.props);Object.keys(ie).forEach((function(e){a.data[de[e]||e]=d[e];delete a.data.props[e]}));r=a.data.type;if(i){a.data.isCanvas=true;ue()}}if(n){n(a)}if(r.craft){a.data.props=F(F({},r.craft.props||r.craft.defaultProps||{}),a.data.props);var s=r.craft.displayName||r.craft.name;if(s){a.data.displayName=s}if(r.craft.isCanvas){a.data.isCanvas=a.data.isCanvas||r.craft.isCanvas}if(r.craft.rules){Object.keys(r.craft.rules).forEach((function(e){if(["canDrag","canDrop","canMoveIn","canMoveOut"].includes(e)){a.rules[e]=r.craft.rules[e]}}))}if(r.craft.custom){a.data.custom=F(F({},r.craft.custom),a.data.custom)}if(r.craft.related){a.related={};var u={id:a.id,related:true};Object.keys(r.craft.related).forEach((function(t){a.related[t]=function(){return e.createElement($,u,e.createElement(r.craft.related[t]))}}))}}}))}function Ee(t,n){var r=t;if(typeof r==="string"){r=e.createElement(d,{},r)}var o=r.type;return Ne({data:{type:o,props:F({},r.props)}},(function(e){if(n){n(e,r)}}))}var be=function(e,t){var n,r;if(t.length<1){return n={},n[e.id]=e,n}var o=t.map((function(e){var t=e.rootNodeId;return t}));var a=F(F({},e),{data:F(F({},e.data),{nodes:o})});var i=(r={},r[e.id]=a,r);return t.reduce((function(t,n){var r;var o=n.nodes[n.rootNodeId];return F(F(F({},t),n.nodes),(r={},r[o.id]=F(F({},o),{data:F(F({},o.data),{parent:e.id})}),r))}),i)};var Oe=function(e,t){return{rootNodeId:e.id,nodes:be(e,t)}};var Ce=function(e,t){var n;if(!t)return;var r=t.name||t.displayName;if(t===Canvas)return"Canvas";if(e[r])return r;for(var o=0;o<Object.keys(e).length;o++){var a=Object.keys(e)[o],i=e[a];if(i===t){n=a;return n}}if(typeof t==="string")return t};var ke=function(e,t){return typeof e==="object"&&e.resolvedName?e.resolvedName==="Canvas"?Canvas:t[e.resolvedName]:typeof e==="string"?e:null};var Te=function(t,n,r){var o=t.type,a=t.props;var i=ke(o,n);if(!i){return}a=Object.keys(a).reduce((function(e,t){var r=a[t];if(typeof r==="object"&&r.resolvedName){e[t]=Te(r,n)}else if(t==="children"&&Array.isArray(r)){e[t]=r.map((function(e){if(typeof e==="string"){return e}return Te(e,n)}))}else{e[t]=r}return e}),{});if(r){a.key=r}var d=F({},e.createElement(i,F({},a)));return F(F({},d),{name:Ce(n,d.type)})};var Pe=function(e,t){var n=e.type,r=e.props,o=M(e,["type","props"]);var a=Te(e,t),i=a.type,d=a.name,s=a.props;var u=o.parent,c=o.custom,f=o.displayName,l=o.isCanvas,v=o.nodes,p=o.hidden;var m=o.linkedNodes||o._childCanvas;return F(F(F({type:i,name:d,displayName:f||d,props:s,custom:c||{},isCanvas:!!l,hidden:!!p},u?{parent:u}:{}),m?{linkedNodes:m}:{}),v?{nodes:v}:{})};var je=function(e,t){if(typeof e==="string"){return e}return{resolvedName:Ce(t,e)}};var xe=function(e,t){var n=e.type,r=e.isCanvas,o=e.props;o=!o?{}:Object.keys(o).reduce((function(e,n){var r=o[n];if(!r){return e}if(n==="children"&&typeof r!=="string"){e[n]=s.map(r,(function(e){if(typeof e==="string"){return e}return xe(e,t)}))}else if(r.type){e[n]=xe(r,t)}else{e[n]=r}return e}),{});return F(F({type:je(n,t)},r&&{isCanvas:r}),{props:o})};var we=function(e,t){var n=e.type,r=e.props,o=e.isCanvas,a=e.name,i=M(e,["type","props","isCanvas","name"]);var d=xe({type:n,isCanvas:o,props:r},t);return F(F({},d),i)};function Ie(e,t){R(typeof t=="string",D);var n=e.nodes[t];var r=function(t){return Ie(e,t)};var o=function(t){return typeof t==="string"?e.nodes[t]:t};return{isCanvas:function(){return!!n.data.isCanvas},isRoot:function(){return n.id===y},isLinkedNode:function(){return n.data.parent&&r(n.data.parent).linkedNodes().includes(n.id)},isTopLevelNode:function(){return this.isRoot()||this.isLinkedNode()},isDeletable:function(){return!this.isTopLevelNode()},isParentOfTopLevelNodes:function(){return!!n.data.linkedNodes},isParentOfTopLevelCanvas:function(){p("query.node(id).isParentOfTopLevelCanvas",{suggest:"query.node(id).isParentOfTopLevelNodes"});return this.isParentOfTopLevelNodes()},get:function(){return n},ancestors:function(t){if(t===void 0){t=false}function r(n,o,a){if(o===void 0){o=[]}if(a===void 0){a=0}var i=e.nodes[n];if(!i){return o}o.push(n);if(!i.data.parent){return o}if(t||!t&&a===0){o=r(i.data.parent,o,a+1)}return o}return r(n.data.parent)},descendants:function(n,o){if(n===void 0){n=false}function a(t,i,d){if(i===void 0){i=[]}if(d===void 0){d=0}if(n||!n&&d===0){var s=e.nodes[t];if(!s){return i}if(o!=="childNodes"){var u=r(t).linkedNodes();u.forEach((function(e){i.push(e);i=a(e,i,d+1)}))}if(o!=="linkedNodes"){var c=s.data.nodes;if(c){c.forEach((function(e){i.push(e);i=a(e,i,d+1)}))}}return i}return i}return a(t)},linkedNodes:function(){return Object.values(n.data.linkedNodes||{})},isDraggable:function(t){try{var o=n;R(!this.isTopLevelNode(),O);R(Ie(e,o.data.parent).isCanvas(),C);R(o.rules.canDrag(o,r),k);return true}catch(e){if(t){t(e)}return false}},isDroppable:function(t,a){var i=typeof t=="object"&&!e.nodes[t.id];var d=o(t),s=n;try{if(typeof t==="string"){R(!r(t).isTopLevelNode(),O)}R(this.isCanvas(),T);R(s.rules.canMoveIn(d,s,r),P);R(d.rules.canDrop(s,d,r),j);if(i){return true}var u=r(d.id).descendants(true);R(!u.includes(s.id)&&s.id!==d.id,x);var c=d.data.parent&&e.nodes[d.data.parent];R(c.data.isCanvas,C);R(c||!c&&!e.nodes[d.id],w);if(n!==c){R(c.rules.canMoveOut(d,c,r),I)}return true}catch(e){if(a){a(e)}return false}},toSerializedNode:function(){return we(n.data,e.options.resolver)},toNodeTree:function(e){var n=H([t],this.descendants(true,e)).reduce((function(e,t){e[t]=r(t).get();return e}),{});return{rootNodeId:t,nodes:n}},decendants:function(e){if(e===void 0){e=false}p("query.node(id).decendants",{suggest:"query.node(id).descendants"});return this.descendants(e)},isTopLevelCanvas:function(){return!this.isRoot()&&!n.data.parent}}}function De(t){var n=t&&t.options;var r=function(){return De(t)};return{getDropPlaceholder:function(e,n,o,a){if(a===void 0){a=function(e){return t.nodes[e.id].dom}}if(e===n)return;var i=typeof e=="string"&&t.nodes[e],d=t.nodes[n],s=r().node(d.id).isCanvas();var u=s?d:t.nodes[d.data.parent];if(!u)return;var c=u.data.nodes||[];var f=c?c.reduce((function(e,n){var r=a(t.nodes[n]);if(r){var o=F({id:n},v(r));e.push(o)}return e}),[]):[];var l=ye(u,f,o.x,o.y);var p=c.length&&t.nodes[c[l.index]];var m={placement:F(F({},l),{currentNode:p}),error:false};if(i){r().node(i.id).isDraggable((function(e){return m.error=e}))}r().node(u.id).isDroppable(e,(function(e){return m.error=e}));return m},getOptions:function(){return n},node:function(e){return Ie(t,e)},getSerializedNodes:function(){var e=this;var n=Object.keys(t.nodes).map((function(t){return[t,e.node(t).toSerializedNode()]}));return pe(n)},serialize:function(){return JSON.stringify(this.getSerializedNodes())},parseReactElement:function(n){return{toNodeTree:function(o){var a=Ee(n,(function(e,n){var r=Ce(t.options.resolver,e.data.type);R(r!==null,q);e.data.displayName=e.data.displayName||r;e.data.name=r;if(o){o(e,n)}}));var i=[];if(n.props&&n.props.children){i=e.Children.toArray(n.props.children).reduce((function(t,n){if(e.isValidElement(n)){t.push(r().parseReactElement(n).toNodeTree(o))}return t}),[])}return Oe(a,i)}}},parseSerializedNode:function(e){return{toNode:function(n){var o=Pe(e,t.options.resolver);R(o.type,q);var a=typeof n==="string"&&n;if(a){p("query.parseSerializedNode(...).toNode(id)",{suggest:"query.parseSerializedNode(...).toNode(node => node.id = id)"})}return r().parseFreshNode(F(F({},a?{id:a}:{}),{data:o})).toNode(!a&&n)}}},parseFreshNode:function(e){return{toNode:function(n){return Ne(e,(function(e){if(e.data.parent===b){e.data.parent=y}var r=Ce(t.options.resolver,e.data.type);R(r!==null,q);e.data.displayName=e.data.displayName||r;e.data.name=r;if(n){n(e)}}))}}},createNode:function(e,t){p("query.createNode("+e+")",{suggest:"query.parseReactElement("+e+").toNodeTree()"});var n=this.parseReactElement(e).toNodeTree();var r=n.nodes[n.rootNodeId];if(!t){return r}if(t.id){r.id=t.id}if(t.data){r.data=F(F({},r.data),t.data)}return r}}}var qe={nodes:{},events:{dragged:null,selected:null,hovered:null,indicator:null}};var Le=function(e){return L(he,F(F({},qe),{options:e}),De)};var Re=function(e){if(e===void 0){e={}}return F({onNodesChange:function(){return null},onRender:function(e){var t=e.render;return t},resolver:{},nodes:null,enabled:true,indicator:{error:"red",success:"rgb(98, 196, 98)"}},e)};var Se=function(t){var n=t.children,r=M(t,["children"]);var o=Le(Re(r));a((function(){if(o&&r)o.actions.setOptions((function(e){}))}),[o,r]);a((function(){o.subscribe((function(e){return{json:o.query.serialize()}}),(function(){o.query.getOptions().onNodesChange(o.query)}))}),[o]);return o?e.createElement(Y.Provider,{value:o},e.createElement(Q,null,n)):null};export{Canvas,X as DerivedEventHandlers,Se as Editor,se as Element,Q as Events,ce as Frame,Z as NodeContext,$ as NodeProvider,le as connectEditor,ve as connectNode,ie as defaultElementProps,ue as deprecateCanvasComponent,de as elementPropToNodeData,fe as useEditor,J as useEventHandler,te as useNode,Re as withDefaults};
