"use strict";Object.defineProperty(exports,"__esModule",{value:true});function _interopDefault(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var React=require("react");var React__default=_interopDefault(React);var utils=require("@craftjs/utils");var invariant=_interopDefault(require("tiny-invariant"));var immer=require("immer");var shortid=_interopDefault(require("shortid"));
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
***************************************************************************** */var _extendStatics=function e(t,n){_extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t){if(t.hasOwnProperty(n))e[n]=t[n]}};return _extendStatics(t,n)};function __extends(e,t){_extendStatics(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}var _assign=function e(){_assign=Object.assign||function e(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var o in n){if(Object.prototype.hasOwnProperty.call(n,o))t[o]=n[o]}}return t};return _assign.apply(this,arguments)};function __rest(e,t){var n={};for(var r in e){if(Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0)n[r]=e[r]}if(e!=null&&typeof Object.getOwnPropertySymbols==="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++){if(t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a]))n[r[a]]=e[r[a]]}return n}function __spreadArrays(){for(var e=0,t=0,n=arguments.length;t<n;t++){e+=arguments[t].length}for(var r=Array(e),a=0,t=0;t<n;t++){for(var o=arguments[t],i=0,s=o.length;i<s;i++,a++){r[a]=o[i]}}return r}var EventHandlerContext=React.createContext(null);var useEventHandler=function(){return React.useContext(EventHandlerContext)};var createShadow=function(e){var t=e.target.cloneNode(true);var n=e.target.getBoundingClientRect(),r=n.width,a=n.height;t.style.width=r+"px";t.style.height=a+"px";t.style.position="fixed";t.style.left="-100%";t.style.top="-100%";document.body.appendChild(t);e.dataTransfer.setDragImage(t,0,0);return t};var EventHandlers=function(e){__extends(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}t.prototype.handlers=function(){var e=this;return{select:{init:function(){return function(){return e.store.actions.setNodeEvent("selected",null)}},events:[utils.defineEventListener("mousedown",(function(t,n){t.craft.stopPropagation();e.store.actions.setNodeEvent("selected",n)}))]},hover:{init:function(){return function(){return e.store.actions.setNodeEvent("hovered",null)}},events:[utils.defineEventListener("mouseover",(function(t,n){t.craft.stopPropagation();e.store.actions.setNodeEvent("hovered",n)}))]},drop:{events:[utils.defineEventListener("dragover",(function(e){e.craft.stopPropagation();e.preventDefault()})),utils.defineEventListener("dragenter",(function(n,r){n.craft.stopPropagation();n.preventDefault();var a=t.draggedElement;if(!a){return}var o=a.rootNodeId?a.nodes[a.rootNodeId]:a;var i=n.clientX,s=n.clientY;var d=e.store.query.getDropPlaceholder(o,r,{x:i,y:s});if(!d){return}e.store.actions.setIndicator(d);t.events={indicator:d}}))]},drag:{init:function(t,n){if(!e.store.query.node(n).isDraggable()){return function(){}}t.setAttribute("draggable","true");return function(){return t.setAttribute("draggable","false")}},events:[utils.defineEventListener("dragstart",(function(n,r){n.craft.stopPropagation();e.store.actions.setNodeEvent("dragged",r);t.draggedElementShadow=createShadow(n);t.draggedElement=r})),utils.defineEventListener("dragend",(function(t){t.craft.stopPropagation();var n=function(t,n){return e.store.actions.move(t,n.parent.id,n.index+(n.where==="after"?1:0))};e.dropElement(n)}))]},create:{init:function(e){e.setAttribute("draggable","true");return function(){return e.removeAttribute("draggable")}},events:[utils.defineEventListener("dragstart",(function(n,r){n.craft.stopPropagation();var a=e.store.query.parseReactElement(r).toNodeTree();t.draggedElementShadow=createShadow(n);t.draggedElement=a})),utils.defineEventListener("dragend",(function(t){t.craft.stopPropagation();var n=function(t,n){var r=n.index+(n.where==="after"?1:0);e.store.actions.addNodeTree(t,n.parent.id,r)};e.dropElement(n)}))]}}};t.prototype.dropElement=function(e){var n=t.draggedElement,r=t.draggedElementShadow,a=t.events;if(n&&a.indicator&&!a.indicator.error){var o=a.indicator.placement;e(n,o)}if(r){r.parentNode.removeChild(r);t.draggedElementShadow=null}t.draggedElement=null;t.events.indicator=null;this.store.actions.setIndicator(null);this.store.actions.setNodeEvent("dragged",null)};t.prototype.derive=function(e){var t=[];for(var n=1;n<arguments.length;n++){t[n-1]=arguments[n]}return new(e.bind.apply(e,__spreadArrays([void 0,this.store,this],t)))};t.events={indicator:null};return t}(utils.Handlers);var DerivedEventHandlers=function(e){__extends(t,e);function t(t,n){var r=e.call(this,t)||this;r.derived=n;return r}return t}(utils.Handlers);var EditorContext=React.createContext({});function useInternalEditor(e){var t=useEventHandler();var n=React.useContext(EditorContext);var r=utils.useCollector(n,e);var a=React.useMemo((function(){return t&&t.connectors()}),[t]);return _assign(_assign({},r),{connectors:a||{},inContext:!!n,store:n})}function movePlaceholder(e,t,n){var r=0,a=0,o=0,i=0,s=e.where;var d=n;if(d){if(!d.inFlow){o=2;i=d.outerHeight;r=d.top;a=s==="before"?d.left:d.left+d.outerWidth}else{o=d.outerWidth;i=2;r=s==="before"?d.top:d.bottom;a=d.left}}else{if(t){r=t.top+t.padding.top;a=t.left;o=t.outerWidth;i=2}}return{top:r+"px",left:a+"px",width:o+"px",height:i+"px"}}var Events=function(e){var t=e.children;var n=useInternalEditor((function(e){return{events:e.events,indicator:e.options.indicator}})),r=n.events,a=n.indicator,o=n.store;var i=React.useMemo((function(){return new EventHandlers(o)}),[o]);return React__default.createElement(EventHandlerContext.Provider,{value:i},r.indicator&&React__default.createElement(utils.RenderIndicator,{style:_assign(_assign({},movePlaceholder(r.indicator.placement,utils.getDOMInfo(r.indicator.placement.parent.dom),r.indicator.placement.currentNode&&utils.getDOMInfo(r.indicator.placement.currentNode.dom))),{backgroundColor:r.indicator.error?a.error:a.success,transition:"0.2s ease-in"})}),t)};var NodeHandlers=function(e){__extends(t,e);function t(t,n,r){var a=e.call(this,t,n)||this;a.id=r;return a}t.prototype.handlers=function(){var e=this;var t=this.derived.connectors();return{connect:{init:function(n){t.select(n,e.id);t.hover(n,e.id);t.drop(n,e.id);e.store.actions.setDOM(e.id,n)}},drag:{init:function(n){t.drag(n,e.id)}}}};return t}(DerivedEventHandlers);var NodeContext=React__default.createContext(null);var NodeProvider=function(e){var t=e.id,n=e.related,r=n===void 0?false:n,a=e.children;var o=useEventHandler();var i=useInternalEditor((function(e){return{hydrationTimestamp:e.nodes[t]&&e.nodes[t]._hydrationTimestamp}})).hydrationTimestamp;var s=React.useMemo((function(){return o.derive(NodeHandlers,t).connectors()}),[o,i,t]);return React__default.createElement(NodeContext.Provider,{value:{id:t,related:r,connectors:s}},a)};function useInternalNode(e){var t=React.useContext(NodeContext);var n=t.id,r=t.related,a=t.connectors;var o=useInternalEditor((function(t){return n&&t.nodes[n]&&e&&e(t.nodes[n])})),i=o.actions,s=o.query,d=__rest(o,["actions","query"]);var u=React.useMemo((function(){return{setProp:function(e){return i.setProp(n,e)},setCustom:function(e){return i.setCustom(n,e)},setHidden:function(e){return i.setHidden(n,e)}}}),[i,n]);return _assign(_assign({},d),{id:n,related:r,inNodeContext:!!t,actions:u,connectors:a})}function useNode(e){var t=useInternalNode(e),n=t.id,r=t.related,a=t.actions,o=t.inNodeContext,i=t.connectors,s=__rest(t,["id","related","actions","inNodeContext","connectors"]);return _assign(_assign({},s),{actions:a,id:n,related:r,setProp:function(e){utils.deprecationWarning("useNode().setProp()",{suggest:"useNode().actions.setProp()"});return a.setProp(e)},inNodeContext:o,connectors:i})}var SimpleElement=function(e){var t=e.render;var n=useNode().connectors,r=n.connect,a=n.drag;return typeof t.type==="string"?r(a(React__default.cloneElement(t))):t};var Render=function(){var e=useInternalNode((function(e){return{type:e.data.type,props:e.data.props,nodes:e.data.nodes,hydrationTimestamp:e._hydrationTimestamp}})),t=e.type,n=e.props,r=e.nodes,a=e.hydrationTimestamp;return React.useMemo((function(){var e=React__default.createElement(t,n,React__default.createElement(React__default.Fragment,null,r?r.map((function(e){return React__default.createElement(NodeElement,{id:e,key:e})})):n&&n.children));if(typeof t=="string"){return React__default.createElement(SimpleElement,{render:e})}return e}),[t,n,a,r])};var RenderNodeToElement=function(){var e=useInternalNode((function(e){return{hidden:e.data.hidden}})).hidden;var t=useInternalEditor((function(e){return{onRender:e.options.onRender}})).onRender;if(e){return null}return React__default.createElement(t,{render:React__default.createElement(Render,null)})};var NodeElement=React__default.memo((function(e){var t=e.id;return React__default.createElement(NodeProvider,{id:t},React__default.createElement(RenderNodeToElement,null))}));var defaultElementProps={is:"div",canvas:false,custom:{},hidden:false};var elementPropToNodeData={is:"type",canvas:"isCanvas"};function Element(e){var t=e.id,n=e.children,r=__rest(e,["id","children"]);var a=_assign(_assign({},defaultElementProps),r),o=a.is,i=a.custom,s=a.canvas,d=__rest(a,["is","custom","canvas"]);var u=useInternalEditor(),c=u.query,l=u.actions;var f=useInternalNode((function(e){return{node:{id:e.id,data:e.data}}})),v=f.node,p=f.inNodeContext;var _=React.useState(null),N=_[0],E=_[1];utils.useEffectOnce((function(){invariant(!!t,utils.ERROR_TOP_LEVEL_ELEMENT_NO_ID);var e=v.id,a=v.data;if(p){var i;var s=a.linkedNodes&&a.linkedNodes[t]&&c.node(a.linkedNodes[t]).get();if(s&&s.data.type===o){i=s.id;var u=_assign(_assign({},s.data.props),d);l.setProp(i,(function(e){return Object.keys(u).forEach((function(t){return e[t]=u[t]}))}))}else{var f=React__default.createElement(Element,r,n);var _=c.parseReactElement(f).toNodeTree();i=_.rootNodeId;l.addLinkedNodeFromTree(_,e,t)}E(i)}}));return N?React__default.createElement(NodeElement,{id:N}):null}var deprecateCanvasComponent=function(){return utils.deprecationWarning("<Canvas />",{suggest:"<Element canvas={true} />"})};function Canvas(e){var t=__rest(e,[]);React.useEffect((function(){return deprecateCanvasComponent()}),[]);return React__default.createElement(Element,_assign({},t,{canvas:true}))}var Frame=function(e){var t=e.children,n=e.json,r=e.data;var a=useInternalEditor(),o=a.actions,i=a.query;var s=React.useState(null),d=s[0],u=s[1];if(!!n){utils.deprecationWarning("<Frame json={...} />",{suggest:"<Frame data={...} />"})}var c=React.useRef({initialChildren:t,initialData:r||n});React.useEffect((function(){var e=o.deserialize;var t=c.current,n=t.initialChildren,r=t.initialData;if(r){e(r)}else if(n){var a=React__default.Children.only(n);var s=i.parseReactElement(a).toNodeTree((function(e,t){if(t===a){e.id=utils.ROOT_NODE}return e}));o.addNodeTree(s)}u(React__default.createElement(NodeElement,{id:utils.ROOT_NODE}))}),[o,i]);return d};function useEditor(e){var t=useInternalEditor(e),n=t.connectors,r=t.actions,a=r.addLinkedNodeFromTree,o=r.setDOM,i=r.setNodeEvent,s=r.replaceNodes,d=r.reset,u=__rest(r,["addLinkedNodeFromTree","setDOM","setNodeEvent","replaceNodes","reset"]),c=t.query,l=c.deserialize,f=__rest(c,["deserialize"]),v=t.store,p=__rest(t,["connectors","actions","query","store"]);var _=React.useMemo((function(){return _assign(_assign({},u),{selectNode:function(e){i("selected",e);i("hovered",null)}})}),[u,i]);return _assign({connectors:n,actions:_,query:f},p)}function connectEditor(e){return function(t){return function(n){var r=e?useEditor(e):useEditor();return React__default.createElement(t,_assign({},r,n))}}}function connectNode(e){return function(t){return function(n){var r=useNode(e);return React__default.createElement(t,_assign({},r,n))}}}var fromEntries=function(e){if(Object.fromEntries){return Object.fromEntries(e)}return e.reduce((function(e,t){var n;var r=t[0],a=t[1];return _assign(_assign({},e),(n={},n[r]=a,n))}),{})};var updateEventsNode=function(e,t,n){Object.keys(e.events).forEach((function(r){if(e.events[r]&&e.events[r]===t){e.events[r]=n?null:t}}))};var Actions=function(e,t){var n=function(t,n,r){console.log("addNodeToParentAtIndex",t);var o=a(n);if(!o.data.nodes){o.data.nodes=[]}if(o.data.props.children){delete o.data.props["children"]}if(r!=null){o.data.nodes.splice(r,0,t.id)}else{o.data.nodes.push(t.id)}t.data.parent=o.id;e.nodes[t.id]=t};var r=function(t,a,o){console.log("addTreeToParentAtIndex",t);var i=t.nodes[t.rootNodeId];if(a!=null){n(i,a,o)}if(i.data.nodes){var s=__spreadArrays(i.data.nodes);i.data.nodes=[];s.forEach((function(e,n){return r({rootNodeId:e,nodes:t.nodes},i.id,n)}))}if(i.data.linkedNodes){Object.keys(i.data.linkedNodes).forEach((function(n){var a=i.data.linkedNodes[n];e.nodes[a]=t.nodes[a];r({rootNodeId:a,nodes:t.nodes})}))}};var a=function(t){invariant(t,utils.ERROR_NOPARENT);var n=e.nodes[t];invariant(n,utils.ERROR_INVALID_NODEID);return n};var o=function(t,n){if(n===void 0){n=false}var r=e.nodes[t],a=e.nodes[r.data.parent];if(r.data.nodes){__spreadArrays(r.data.nodes).forEach((function(e){return o(e)}))}if(n&&a.data.linkedNodes){var i=Object.keys(a.data.linkedNodes).filter((function(e){return a.data.linkedNodes[e]===e}))[0];if(i){delete a.data.linkedNodes[i]}}else{var s=a.data.nodes;s.splice(s.indexOf(t),1)}updateEventsNode(e,t,true);delete e.nodes[t]};return{addLinkedNodeFromTree:function(t,n,i){var s=a(n);if(!s.data.linkedNodes){s.data.linkedNodes={}}var d=s.data.linkedNodes[i];if(d){o(d,true)}s.data.linkedNodes[i]=t.rootNodeId;t.nodes[t.rootNodeId].data.parent=n;e.nodes[t.rootNodeId]=t.nodes[t.rootNodeId];r(t)},add:function(e,t,r){var a=[e];if(Array.isArray(e)){utils.deprecationWarning("actions.add(node: Node[])",{suggest:"actions.add(node: Node)"});a=e}a.forEach((function(e){n(e,t,r)}))},addNodeTree:function(t,n,a){console.log("Add node tree",t.nodes,t.rootNodeId);var o=t.nodes[t.rootNodeId];if(!n){invariant(t.rootNodeId===utils.ROOT_NODE,"Cannot add non-root Node without a parent");e.nodes[t.rootNodeId]=o}r(t,n,a)},delete:function(e){invariant(!t.node(e).isTopLevelNode(),utils.ERROR_DELETE_TOP_LEVEL_NODE);o(e)},deserialize:function(e){var n=typeof e=="string"?JSON.parse(e):e;var r=Object.keys(n).map((function(e){var r=e;if(e===utils.DEPRECATED_ROOT_NODE){r=utils.ROOT_NODE}return[r,t.parseSerializedNode(n[e]).toNode((function(e){return e.id=r}))]}));this.replaceNodes(fromEntries(r))},move:function(n,r,a){var o=e.nodes[n],i=o.data.parent,s=e.nodes[r],d=s.data.nodes;t.node(r).isDroppable(o,(function(e){throw new Error(e)}));var u=e.nodes[i],c=u.data.nodes;c[c.indexOf(n)]="marked";if(d){d.splice(a,0,n)}else{s.data.nodes=[n]}e.nodes[n].data.parent=r;e.nodes[n].data.index=a;c.splice(c.indexOf("marked"),1)},replaceNodes:function(t){e.nodes=t;this.clearEvents()},clearEvents:function(){e.events=editorInitialState.events},reset:function(){this.replaceNodes({});this.clearEvents()},setOptions:function(t){t(e.options)},setNodeEvent:function(t,n){var r=e.events[t];if(r&&n!==r){e.nodes[r].events[t]=false}if(n){e.nodes[n].events[t]=true;e.events[t]=n}else{e.events[t]=null}},setCustom:function(t,n){n(e.nodes[t].data.custom)},setDOM:function(t,n){invariant(e.nodes[t],utils.ERROR_INVALID_NODEID);e.nodes[t].dom=n},setIndicator:function(t){if(t&&(!t.placement.parent.dom||t.placement.currentNode&&!t.placement.currentNode.dom))return;e.events.indicator=t},setHidden:function(t,n){e.nodes[t].data.hidden=n},setProp:function(t,n){invariant(e.nodes[t],utils.ERROR_INVALID_NODEID);n(e.nodes[t].data.props)}}};function findPosition(e,t,n,r){var a={parent:e,index:0,where:"before"};var o=0,i=0,s=0,d=0,u=0,c=0,l=0;for(var f=0,v=t.length;f<v;f++){var p=t[f];s=p.left+p.outerWidth;l=p.top+p.outerHeight;u=p.left+p.outerWidth/2;c=p.top+p.outerHeight/2;if(i&&p.left>i||d&&c>=d||o&&s<o)continue;a.index=f;if(!p.inFlow){if(r<l)d=l;if(n<u){i=u;a.where="before"}else{o=u;a.where="after"}}else{if(r<c){a.where="before";break}else a.where="after"}}return a}var getRandomNodeId=shortid;function createNode(e,t){var n=e.data.type;var r=e.id||getRandomNodeId();return immer.produce({},(function(a){a.id=r;a._hydrationTimestamp=Date.now();a.data=_assign({type:n,props:_assign({},e.data.props),name:typeof n=="string"?n:n.name,displayName:typeof n=="string"?n:n.name,custom:{},isCanvas:false,hidden:false},e.data);a.related={};a.events={selected:false,dragged:false,hovered:false};a.rules=_assign({canDrag:function(){return true},canDrop:function(){return true},canMoveIn:function(){return true},canMoveOut:function(){return true}},n.craft&&n.craft.rules||{});if(a.data.type===Element||a.data.type===Canvas){var o=a.data.type===Canvas;var i=_assign(_assign({},defaultElementProps),a.data.props);Object.keys(defaultElementProps).forEach((function(e){a.data[elementPropToNodeData[e]||e]=i[e];delete a.data.props[e]}));n=a.data.type;if(o){a.data.isCanvas=true;deprecateCanvasComponent()}}if(t){t(a)}if(n.craft){a.data.props=_assign(_assign({},n.craft.props||n.craft.defaultProps||{}),a.data.props);var s=n.craft.displayName||n.craft.name;if(s){a.data.displayName=s}if(n.craft.isCanvas){a.data.isCanvas=a.data.isCanvas||n.craft.isCanvas}if(n.craft.rules){Object.keys(n.craft.rules).forEach((function(e){if(["canDrag","canDrop","canMoveIn","canMoveOut"].includes(e)){a.rules[e]=n.craft.rules[e]}}))}if(n.craft.custom){a.data.custom=_assign(_assign({},n.craft.custom),a.data.custom)}if(n.craft.related){a.related={};var d={id:a.id,related:true};Object.keys(n.craft.related).forEach((function(e){a.related[e]=function(){return React__default.createElement(NodeProvider,d,React__default.createElement(n.craft.related[e]))}}))}}}))}function parseNodeFromJSX(e,t){var n=e;if(typeof n==="string"){n=React__default.createElement(React.Fragment,{},n)}var r=n.type;return createNode({data:{type:r,props:_assign({},n.props)}},(function(e){if(t){t(e,n)}}))}var mergeNodes=function(e,t){var n,r;if(t.length<1){return n={},n[e.id]=e,n}var a=t.map((function(e){var t=e.rootNodeId;return t}));var o=_assign(_assign({},e),{data:_assign(_assign({},e.data),{nodes:a})});var i=(r={},r[e.id]=o,r);return t.reduce((function(t,n){var r;var a=n.nodes[n.rootNodeId];return _assign(_assign(_assign({},t),n.nodes),(r={},r[a.id]=_assign(_assign({},a),{data:_assign(_assign({},a.data),{parent:e.id})}),r))}),i)};var mergeTrees=function(e,t){return{rootNodeId:e.id,nodes:mergeNodes(e,t)}};var resolveComponent=function(e,t){var n;if(!t)return;var r=t.name||t.displayName;if(t===Canvas)return"Canvas";if(e[r])return r;for(var a=0;a<Object.keys(e).length;a++){var o=Object.keys(e)[a],i=e[o];if(i===t){n=o;return n}}if(typeof t==="string")return t};var restoreType=function(e,t){return typeof e==="object"&&e.resolvedName?e.resolvedName==="Canvas"?Canvas:t[e.resolvedName]:typeof e==="string"?e:null};var deserializeComp=function(e,t,n){var r=e.type,a=e.props;var o=restoreType(r,t);if(!o){return}a=Object.keys(a).reduce((function(e,n){var r=a[n];if(typeof r==="object"&&r.resolvedName){e[n]=deserializeComp(r,t)}else if(n==="children"&&Array.isArray(r)){e[n]=r.map((function(e){if(typeof e==="string"){return e}return deserializeComp(e,t)}))}else{e[n]=r}return e}),{});if(n){a.key=n}var i=_assign({},React__default.createElement(o,_assign({},a)));return _assign(_assign({},i),{name:resolveComponent(t,i.type)})};var deserializeNode=function(e,t){var n=e.type,r=e.props,a=__rest(e,["type","props"]);var o=deserializeComp(e,t),i=o.type,s=o.name,d=o.props;var u=a.parent,c=a.custom,l=a.displayName,f=a.isCanvas,v=a.nodes,p=a.hidden;var _=a.linkedNodes||a._childCanvas;return _assign(_assign(_assign({type:i,name:s,displayName:l||s,props:d,custom:c||{},isCanvas:!!f,hidden:!!p},u?{parent:u}:{}),_?{linkedNodes:_}:{}),v?{nodes:v}:{})};var reduceType=function(e,t){if(typeof e==="string"){return e}return{resolvedName:resolveComponent(t,e)}};var serializeComp=function(e,t){var n=e.type,r=e.isCanvas,a=e.props;a=!a?{}:Object.keys(a).reduce((function(e,n){var r=a[n];if(!r){return e}if(n==="children"&&typeof r!=="string"){e[n]=React.Children.map(r,(function(e){if(typeof e==="string"){return e}return serializeComp(e,t)}))}else if(r.type){e[n]=serializeComp(r,t)}else{e[n]=r}return e}),{});return _assign(_assign({type:reduceType(n,t)},r&&{isCanvas:r}),{props:a})};var serializeNode=function(e,t){var n=e.type,r=e.props,a=e.isCanvas,o=e.name,i=__rest(e,["type","props","isCanvas","name"]);var s=serializeComp({type:n,isCanvas:a,props:r},t);return _assign(_assign({},s),i)};function NodeHelpers(e,t){invariant(typeof t=="string",utils.ERROR_INVALID_NODE_ID);var n=e.nodes[t];var r=function(t){return NodeHelpers(e,t)};var a=function(t){return typeof t==="string"?e.nodes[t]:t};return{isCanvas:function(){return!!n.data.isCanvas},isRoot:function(){return n.id===utils.ROOT_NODE},isLinkedNode:function(){return n.data.parent&&r(n.data.parent).linkedNodes().includes(n.id)},isTopLevelNode:function(){return this.isRoot()||this.isLinkedNode()},isDeletable:function(){return!this.isTopLevelNode()},isParentOfTopLevelNodes:function(){return!!n.data.linkedNodes},isParentOfTopLevelCanvas:function(){utils.deprecationWarning("query.node(id).isParentOfTopLevelCanvas",{suggest:"query.node(id).isParentOfTopLevelNodes"});return this.isParentOfTopLevelNodes()},get:function(){return n},ancestors:function(t){if(t===void 0){t=false}function r(n,a,o){if(a===void 0){a=[]}if(o===void 0){o=0}var i=e.nodes[n];if(!i){return a}a.push(n);if(!i.data.parent){return a}if(t||!t&&o===0){a=r(i.data.parent,a,o+1)}return a}return r(n.data.parent)},descendants:function(n,a){if(n===void 0){n=false}function o(t,i,s){if(i===void 0){i=[]}if(s===void 0){s=0}if(n||!n&&s===0){var d=e.nodes[t];if(!d){return i}if(a!=="childNodes"){var u=r(t).linkedNodes();u.forEach((function(e){i.push(e);i=o(e,i,s+1)}))}if(a!=="linkedNodes"){var c=d.data.nodes;if(c){c.forEach((function(e){i.push(e);i=o(e,i,s+1)}))}}return i}return i}return o(t)},linkedNodes:function(){return Object.values(n.data.linkedNodes||{})},isDraggable:function(t){try{var a=n;invariant(!this.isTopLevelNode(),utils.ERROR_MOVE_TOP_LEVEL_NODE);invariant(NodeHelpers(e,a.data.parent).isCanvas(),utils.ERROR_MOVE_NONCANVAS_CHILD);invariant(a.rules.canDrag(a,r),utils.ERROR_CANNOT_DRAG);return true}catch(e){if(t){t(e)}return false}},isDroppable:function(t,o){var i=typeof t=="object"&&!e.nodes[t.id];var s=a(t),d=n;try{if(typeof t==="string"){invariant(!r(t).isTopLevelNode(),utils.ERROR_MOVE_TOP_LEVEL_NODE)}invariant(this.isCanvas(),utils.ERROR_MOVE_TO_NONCANVAS_PARENT);invariant(d.rules.canMoveIn(s,d,r),utils.ERROR_MOVE_INCOMING_PARENT);invariant(s.rules.canDrop(d,s,r),utils.ERROR_MOVE_CANNOT_DROP);if(i){return true}var u=r(s.id).descendants(true);invariant(!u.includes(d.id)&&d.id!==s.id,utils.ERROR_MOVE_TO_DESCENDANT);var c=s.data.parent&&e.nodes[s.data.parent];invariant(c.data.isCanvas,utils.ERROR_MOVE_NONCANVAS_CHILD);invariant(c||!c&&!e.nodes[s.id],utils.ERROR_DUPLICATE_NODEID);if(n!==c){invariant(c.rules.canMoveOut(s,c,r),utils.ERROR_MOVE_OUTGOING_PARENT)}return true}catch(e){if(o){o(e)}return false}},toSerializedNode:function(){return serializeNode(n.data,e.options.resolver)},toNodeTree:function(e){var n=__spreadArrays([t],this.descendants(true,e)).reduce((function(e,t){e[t]=r(t).get();return e}),{});return{rootNodeId:t,nodes:n}},decendants:function(e){if(e===void 0){e=false}utils.deprecationWarning("query.node(id).decendants",{suggest:"query.node(id).descendants"});return this.descendants(e)},isTopLevelCanvas:function(){return!this.isRoot()&&!n.data.parent}}}function QueryMethods(e){var t=e&&e.options;var n=function(){return QueryMethods(e)};return{getDropPlaceholder:function(t,r,a,o){if(o===void 0){o=function(t){return e.nodes[t.id].dom}}if(t===r)return;var i=typeof t=="string"&&e.nodes[t],s=e.nodes[r],d=n().node(s.id).isCanvas();var u=d?s:e.nodes[s.data.parent];if(!u)return;var c=u.data.nodes||[];var l=c?c.reduce((function(t,n){var r=o(e.nodes[n]);if(r){var a=_assign({id:n},utils.getDOMInfo(r));t.push(a)}return t}),[]):[];var f=findPosition(u,l,a.x,a.y);var v=c.length&&e.nodes[c[f.index]];var p={placement:_assign(_assign({},f),{currentNode:v}),error:false};if(i){n().node(i.id).isDraggable((function(e){return p.error=e}))}n().node(u.id).isDroppable(t,(function(e){return p.error=e}));return p},getOptions:function(){return t},node:function(t){return NodeHelpers(e,t)},getSerializedNodes:function(){var t=this;var n=Object.keys(e.nodes).map((function(e){return[e,t.node(e).toSerializedNode()]}));return fromEntries(n)},serialize:function(){return JSON.stringify(this.getSerializedNodes())},parseReactElement:function(t){return{toNodeTree:function(r){var a=parseNodeFromJSX(t,(function(t,n){var a=resolveComponent(e.options.resolver,t.data.type);invariant(a!==null,utils.ERROR_NOT_IN_RESOLVER);t.data.displayName=t.data.displayName||a;t.data.name=a;if(r){r(t,n)}}));var o=[];if(t.props&&t.props.children){o=React__default.Children.toArray(t.props.children).reduce((function(e,t){if(React__default.isValidElement(t)){e.push(n().parseReactElement(t).toNodeTree(r))}return e}),[])}return mergeTrees(a,o)}}},parseSerializedNode:function(t){return{toNode:function(r){var a=deserializeNode(t,e.options.resolver);invariant(a.type,utils.ERROR_NOT_IN_RESOLVER);var o=typeof r==="string"&&r;if(o){utils.deprecationWarning("query.parseSerializedNode(...).toNode(id)",{suggest:"query.parseSerializedNode(...).toNode(node => node.id = id)"})}return n().parseFreshNode(_assign(_assign({},o?{id:o}:{}),{data:a})).toNode(!o&&r)}}},parseFreshNode:function(t){return{toNode:function(n){return createNode(t,(function(t){if(t.data.parent===utils.DEPRECATED_ROOT_NODE){t.data.parent=utils.ROOT_NODE}var r=resolveComponent(e.options.resolver,t.data.type);invariant(r!==null,utils.ERROR_NOT_IN_RESOLVER);t.data.displayName=t.data.displayName||r;t.data.name=r;if(n){n(t)}}))}}},createNode:function(e,t){utils.deprecationWarning("query.createNode("+e+")",{suggest:"query.parseReactElement("+e+").toNodeTree()"});var n=this.parseReactElement(e).toNodeTree();var r=n.nodes[n.rootNodeId];if(!t){return r}if(t.id){r.id=t.id}if(t.data){r.data=_assign(_assign({},r.data),t.data)}return r}}}var editorInitialState={nodes:{},events:{dragged:null,selected:null,hovered:null,indicator:null}};var useEditorStore=function(e){return utils.useMethods(Actions,_assign(_assign({},editorInitialState),{options:e}),QueryMethods)};var withDefaults=function(e){if(e===void 0){e={}}return _assign({onNodesChange:function(){return null},onRender:function(e){var t=e.render;return t},resolver:{},nodes:null,enabled:true,indicator:{error:"red",success:"rgb(98, 196, 98)"}},e)};var Editor=function(e){var t=e.children,n=__rest(e,["children"]);var r=useEditorStore(withDefaults(n));React.useEffect((function(){if(r&&n)r.actions.setOptions((function(e){}))}),[r,n]);React.useEffect((function(){r.subscribe((function(e){return{json:r.query.serialize()}}),(function(){r.query.getOptions().onNodesChange(r.query)}))}),[r]);return r?React__default.createElement(EditorContext.Provider,{value:r},React__default.createElement(Events,null,t)):null};Object.defineProperty(exports,"ROOT_NODE",{enumerable:true,get:function(){return utils.ROOT_NODE}});exports.Canvas=Canvas;exports.DerivedEventHandlers=DerivedEventHandlers;exports.Editor=Editor;exports.Element=Element;exports.Events=Events;exports.Frame=Frame;exports.NodeContext=NodeContext;exports.NodeProvider=NodeProvider;exports.connectEditor=connectEditor;exports.connectNode=connectNode;exports.defaultElementProps=defaultElementProps;exports.deprecateCanvasComponent=deprecateCanvasComponent;exports.elementPropToNodeData=elementPropToNodeData;exports.useEditor=useEditor;exports.useEventHandler=useEventHandler;exports.useNode=useNode;exports.withDefaults=withDefaults;
