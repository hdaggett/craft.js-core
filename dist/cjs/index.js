"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var React=require("react"),React__default=_interopDefault(React),utils=require("@craftjs/utils"),invariant=_interopDefault(require("tiny-invariant")),immer=require("immer"),shortid=_interopDefault(require("shortid")),_extendStatics=function(e,t){return(_extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function __extends(e,t){function n(){this.constructor=e}_extendStatics(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var _assign=function(){return(_assign=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function __rest(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}function __spreadArrays(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var a=arguments[t],i=0,s=a.length;i<s;i++,o++)r[o]=a[i];return r}var EventHandlerContext=React.createContext(null),useEventHandler=function(){return React.useContext(EventHandlerContext)},createShadow=function(e){var t=e.target.cloneNode(!0),n=e.target.getBoundingClientRect(),r=n.height;return t.style.width=n.width+"px",t.style.height=r+"px",t.style.position="fixed",t.style.left="-100%",t.style.top="-100%",document.body.appendChild(t),e.dataTransfer.setDragImage(t,0,0),t},EventHandlers=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.handlers=function(){var e=this;return{select:{init:function(){return function(){return e.store.actions.setNodeEvent("selected",null)}},events:[utils.defineEventListener("mousedown",(function(t,n){t.craft.stopPropagation(),e.store.actions.setNodeEvent("selected",n)}))]},hover:{init:function(){return function(){return e.store.actions.setNodeEvent("hovered",null)}},events:[utils.defineEventListener("mouseover",(function(t,n){t.craft.stopPropagation(),e.store.actions.setNodeEvent("hovered",n)}))]},drop:{events:[utils.defineEventListener("dragover",(function(e){e.craft.stopPropagation(),e.preventDefault()})),utils.defineEventListener("dragenter",(function(n,r){n.craft.stopPropagation(),n.preventDefault();var o=t.draggedElement;if(o){var a=e.store.query.getDropPlaceholder(o.rootNodeId?o.nodes[o.rootNodeId]:o,r,{x:n.clientX,y:n.clientY});a&&(e.store.actions.setIndicator(a),t.events={indicator:a})}}))]},drag:{init:function(t,n){return e.store.query.node(n).isDraggable()?(t.setAttribute("draggable","true"),function(){return t.setAttribute("draggable","false")}):function(){}},events:[utils.defineEventListener("dragstart",(function(n,r){n.craft.stopPropagation(),e.store.actions.setNodeEvent("dragged",r),t.draggedElementShadow=createShadow(n),t.draggedElement=r})),utils.defineEventListener("dragend",(function(t){t.craft.stopPropagation(),e.dropElement((function(t,n){return e.store.actions.move(t,n.parent.id,n.index+("after"===n.where?1:0))}))}))]},create:{init:function(e){return e.setAttribute("draggable","true"),function(){return e.removeAttribute("draggable")}},events:[utils.defineEventListener("dragstart",(function(n,r){n.craft.stopPropagation();var o=e.store.query.parseReactElement(r).toNodeTree();t.draggedElementShadow=createShadow(n),t.draggedElement=o})),utils.defineEventListener("dragend",(function(t){t.craft.stopPropagation(),e.dropElement((function(t,n){e.store.actions.addNodeTree(t,n.parent.id,n.index+("after"===n.where?1:0))}))}))]}}},t.prototype.dropElement=function(e){var n=t.draggedElement,r=t.draggedElementShadow,o=t.events;n&&o.indicator&&!o.indicator.error&&e(n,o.indicator.placement),r&&(r.parentNode.removeChild(r),t.draggedElementShadow=null),t.draggedElement=null,t.events.indicator=null,this.store.actions.setIndicator(null),this.store.actions.setNodeEvent("dragged",null)},t.prototype.derive=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new(e.bind.apply(e,__spreadArrays([void 0,this.store,this],t)))},t.events={indicator:null},t}(utils.Handlers),DerivedEventHandlers=function(e){function t(t,n){var r=e.call(this,t)||this;return r.derived=n,r}return __extends(t,e),t}(utils.Handlers),EditorContext=React.createContext({});function useInternalEditor(e){var t=useEventHandler(),n=React.useContext(EditorContext),r=utils.useCollector(n,e),o=React.useMemo((function(){return t&&t.connectors()}),[t]);return _assign(_assign({},r),{connectors:o||{},inContext:!!n,store:n})}function movePlaceholder(e,t,n){var r=0,o=0,a=0,i=0,s=e.where;return n?n.inFlow?(a=n.outerWidth,i=2,r="before"===s?n.top:n.bottom,o=n.left):(a=2,i=n.outerHeight,r=n.top,o="before"===s?n.left:n.left+n.outerWidth):t&&(r=t.top+t.padding.top,o=t.left,a=t.outerWidth,i=2),{top:r+"px",left:o+"px",width:a+"px",height:i+"px"}}var Events=function(e){var t=e.children,n=useInternalEditor((function(e){return{events:e.events,indicator:e.options.indicator}})),r=n.events,o=n.indicator,a=n.store,i=React.useMemo((function(){return new EventHandlers(a)}),[a]);return React__default.createElement(EventHandlerContext.Provider,{value:i},r.indicator&&React__default.createElement(utils.RenderIndicator,{style:_assign(_assign({},movePlaceholder(r.indicator.placement,utils.getDOMInfo(r.indicator.placement.parent.dom),r.indicator.placement.currentNode&&utils.getDOMInfo(r.indicator.placement.currentNode.dom))),{backgroundColor:r.indicator.error?o.error:o.success,transition:"0.2s ease-in"})}),t)},NodeHandlers=function(e){function t(t,n,r){var o=e.call(this,t,n)||this;return o.id=r,o}return __extends(t,e),t.prototype.handlers=function(){var e=this,t=this.derived.connectors();return{connect:{init:function(n){t.select(n,e.id),t.hover(n,e.id),t.drop(n,e.id),e.store.actions.setDOM(e.id,n)}},drag:{init:function(n){t.drag(n,e.id)}}}},t}(DerivedEventHandlers),NodeContext=React__default.createContext(null),NodeProvider=function(e){var t=e.id,n=e.related,r=void 0!==n&&n,o=e.children,a=useEventHandler(),i=useInternalEditor((function(e){return{hydrationTimestamp:e.nodes[t]&&e.nodes[t]._hydrationTimestamp}})).hydrationTimestamp,s=React.useMemo((function(){return a.derive(NodeHandlers,t).connectors()}),[a,i,t]);return React__default.createElement(NodeContext.Provider,{value:{id:t,related:r,connectors:s}},o)};function useInternalNode(e){var t=React.useContext(NodeContext),n=t.id,r=t.related,o=t.connectors,a=useInternalEditor((function(t){return n&&t.nodes[n]&&e&&e(t.nodes[n])})),i=a.actions,s=__rest(a,["actions","query"]),d=React.useMemo((function(){return{setProp:function(e){return i.setProp(n,e)},setCustom:function(e){return i.setCustom(n,e)},setHidden:function(e){return i.setHidden(n,e)}}}),[i,n]);return _assign(_assign({},s),{id:n,related:r,inNodeContext:!!t,actions:d,connectors:o})}function useNode(e){var t=useInternalNode(e),n=t.id,r=t.related,o=t.actions,a=t.inNodeContext,i=t.connectors,s=__rest(t,["id","related","actions","inNodeContext","connectors"]);return _assign(_assign({},s),{actions:o,id:n,related:r,setProp:function(e){return utils.deprecationWarning("useNode().setProp()",{suggest:"useNode().actions.setProp()"}),o.setProp(e)},inNodeContext:a,connectors:i})}var SimpleElement=function(e){var t=e.render,n=useNode().connectors;return"string"==typeof t.type?(0,n.connect)((0,n.drag)(React__default.cloneElement(t))):t},Render=function(){var e=useInternalNode((function(e){return{type:e.data.type,props:e.data.props,nodes:e.data.nodes,hydrationTimestamp:e._hydrationTimestamp}})),t=e.type,n=e.props,r=e.nodes;return React.useMemo((function(){var e=React__default.createElement(t,n,React__default.createElement(React__default.Fragment,null,r?r.map((function(e){return React__default.createElement(NodeElement,{id:e,key:e})})):n&&n.children));return"string"==typeof t?React__default.createElement(SimpleElement,{render:e}):e}),[t,n,e.hydrationTimestamp,r])},RenderNodeToElement=function(){var e=useInternalNode((function(e){return{hidden:e.data.hidden}})).hidden,t=useInternalEditor((function(e){return{onRender:e.options.onRender}})).onRender;return e?null:React__default.createElement(t,{render:React__default.createElement(Render,null)})},NodeElement=React__default.memo((function(e){return React__default.createElement(NodeProvider,{id:e.id},React__default.createElement(RenderNodeToElement,null))})),defaultElementProps={is:"div",canvas:!1,custom:{},hidden:!1},elementPropToNodeData={is:"type",canvas:"isCanvas"};function Element(e){var t=e.id,n=e.children,r=__rest(e,["id","children"]),o=_assign(_assign({},defaultElementProps),r),a=o.is,i=__rest(o,["is","custom","canvas"]),s=useInternalEditor(),d=s.query,u=s.actions,c=useInternalNode((function(e){return{node:{id:e.id,data:e.data}}})),l=c.node,f=c.inNodeContext,p=React.useState(null),v=p[0],_=p[1];return utils.useEffectOnce((function(){invariant(!!t,utils.ERROR_TOP_LEVEL_ELEMENT_NO_ID);var e=l.id,o=l.data;if(f){var s,c=o.linkedNodes&&o.linkedNodes[t]&&d.node(o.linkedNodes[t]).get();if(c&&c.data.type===a){s=c.id;var p=_assign(_assign({},c.data.props),i);u.setProp(s,(function(e){return Object.keys(p).forEach((function(t){return e[t]=p[t]}))}))}else{var v=React__default.createElement(Element,r,n),N=d.parseReactElement(v).toNodeTree();s=N.rootNodeId,u.addLinkedNodeFromTree(N,e,t)}_(s)}})),v?React__default.createElement(NodeElement,{id:v}):null}var deprecateCanvasComponent=function(){return utils.deprecationWarning("<Canvas />",{suggest:"<Element canvas={true} />"})};function Canvas(e){var t=__rest(e,[]);return React.useEffect((function(){return deprecateCanvasComponent()}),[]),React__default.createElement(Element,_assign({},t,{canvas:!0}))}var Frame=function(e){var t=e.children,n=e.json,r=e.data,o=useInternalEditor(),a=o.actions,i=o.query,s=React.useState(null),d=s[0],u=s[1];n&&utils.deprecationWarning("<Frame json={...} />",{suggest:"<Frame data={...} />"});var c=React.useRef({initialChildren:t,initialData:r||n});return React.useEffect((function(){var e=c.current,t=e.initialChildren,n=e.initialData;if(n)(0,a.deserialize)(n);else if(t){var r=React__default.Children.only(t),o=i.parseReactElement(r).toNodeTree((function(e,t){return t===r&&(e.id=utils.ROOT_NODE),e}));a.addNodeTree(o)}u(React__default.createElement(NodeElement,{id:utils.ROOT_NODE}))}),[a,i]),d};function useEditor(e){var t=useInternalEditor(e),n=t.connectors,r=t.actions,o=r.setNodeEvent,a=__rest(r,["addLinkedNodeFromTree","setDOM","setNodeEvent","replaceNodes","reset"]),i=__rest(t.query,["deserialize"]),s=__rest(t,["connectors","actions","query","store"]),d=React.useMemo((function(){return _assign(_assign({},a),{selectNode:function(e){o("selected",e),o("hovered",null)}})}),[a,o]);return _assign({connectors:n,actions:d,query:i},s)}function connectEditor(e){return function(t){return function(n){var r=e?useEditor(e):useEditor();return React__default.createElement(t,_assign({},r,n))}}}function connectNode(e){return function(t){return function(n){var r=useNode(e);return React__default.createElement(t,_assign({},r,n))}}}var fromEntries=function(e){return Object.fromEntries?Object.fromEntries(e):e.reduce((function(e,t){var n,r=t[0],o=t[1];return _assign(_assign({},e),((n={})[r]=o,n))}),{})},updateEventsNode=function(e,t,n){Object.keys(e.events).forEach((function(r){e.events[r]&&e.events[r]===t&&(e.events[r]=n?null:t)}))},Actions=function(e,t){var n=function(t,n,r){console.log(t);var a=o(n);a.data.nodes||(a.data.nodes=[]),a.data.props.children&&delete a.data.props.children,null!=r?a.data.nodes.splice(r,0,t.id):a.data.nodes.push(t.id),t.data.parent=a.id,e.nodes[t.id]=t},r=function(t,o,a){console.log(t);var i=t.nodes[t.rootNodeId];if(null!=o&&n(i,o,a),i.data.nodes){var s=__spreadArrays(i.data.nodes);i.data.nodes=[],s.forEach((function(e,n){return r({rootNodeId:e,nodes:t.nodes},i.id,n)}))}i.data.linkedNodes&&Object.keys(i.data.linkedNodes).forEach((function(n){var o=i.data.linkedNodes[n];e.nodes[o]=t.nodes[o],r({rootNodeId:o,nodes:t.nodes})}))},o=function(t){invariant(t,utils.ERROR_NOPARENT);var n=e.nodes[t];return invariant(n,utils.ERROR_INVALID_NODEID),n},a=function(t,n){void 0===n&&(n=!1);var r=e.nodes[t],o=e.nodes[r.data.parent];if(r.data.nodes&&__spreadArrays(r.data.nodes).forEach((function(e){return a(e)})),n&&o.data.linkedNodes){var i=Object.keys(o.data.linkedNodes).filter((function(e){return o.data.linkedNodes[e]===e}))[0];i&&delete o.data.linkedNodes[i]}else{var s=o.data.nodes;s.splice(s.indexOf(t),1)}updateEventsNode(e,t,!0),delete e.nodes[t]};return{addLinkedNodeFromTree:function(t,n,i){var s=o(n);s.data.linkedNodes||(s.data.linkedNodes={});var d=s.data.linkedNodes[i];d&&a(d,!0),s.data.linkedNodes[i]=t.rootNodeId,t.nodes[t.rootNodeId].data.parent=n,e.nodes[t.rootNodeId]=t.nodes[t.rootNodeId],r(t)},add:function(e,t,r){var o=[e];Array.isArray(e)&&(utils.deprecationWarning("actions.add(node: Node[])",{suggest:"actions.add(node: Node)"}),o=e),o.forEach((function(e){n(e,t,r)}))},addNodeTree:function(t,n,o){console.log(t.nodes,t.rootNodeId);var a=t.nodes[t.rootNodeId];n||(invariant(t.rootNodeId===utils.ROOT_NODE,"Cannot add non-root Node without a parent"),e.nodes[t.rootNodeId]=a),r(t,n,o)},delete:function(e){invariant(!t.node(e).isTopLevelNode(),utils.ERROR_DELETE_TOP_LEVEL_NODE),a(e)},deserialize:function(e){var n="string"==typeof e?JSON.parse(e):e,r=Object.keys(n).map((function(e){var r=e;return e===utils.DEPRECATED_ROOT_NODE&&(r=utils.ROOT_NODE),[r,t.parseSerializedNode(n[e]).toNode((function(e){return e.id=r}))]}));this.replaceNodes(fromEntries(r))},move:function(n,r,o){var a=e.nodes[n],i=a.data.parent,s=e.nodes[r],d=s.data.nodes;t.node(r).isDroppable(a,(function(e){throw new Error(e)}));var u=e.nodes[i].data.nodes;u[u.indexOf(n)]="marked",d?d.splice(o,0,n):s.data.nodes=[n],e.nodes[n].data.parent=r,e.nodes[n].data.index=o,u.splice(u.indexOf("marked"),1)},replaceNodes:function(t){e.nodes=t,this.clearEvents()},clearEvents:function(){e.events=editorInitialState.events},reset:function(){this.replaceNodes({}),this.clearEvents()},setOptions:function(t){t(e.options)},setNodeEvent:function(t,n){var r=e.events[t];r&&n!==r&&(e.nodes[r].events[t]=!1),n?(e.nodes[n].events[t]=!0,e.events[t]=n):e.events[t]=null},setCustom:function(t,n){n(e.nodes[t].data.custom)},setDOM:function(t,n){invariant(e.nodes[t],utils.ERROR_INVALID_NODEID),e.nodes[t].dom=n},setIndicator:function(t){t&&(!t.placement.parent.dom||t.placement.currentNode&&!t.placement.currentNode.dom)||(e.events.indicator=t)},setHidden:function(t,n){e.nodes[t].data.hidden=n},setProp:function(t,n){invariant(e.nodes[t],utils.ERROR_INVALID_NODEID),n(e.nodes[t].data.props)}}};function findPosition(e,t,n,r){for(var o={parent:e,index:0,where:"before"},a=0,i=0,s=0,d=0,u=0,c=0,l=0,f=t.length;l<f;l++){var p=t[l];if(c=p.top+p.outerHeight,d=p.left+p.outerWidth/2,u=p.top+p.outerHeight/2,!(i&&p.left>i||s&&u>=s||a&&p.left+p.outerWidth<a))if(o.index=l,p.inFlow){if(r<u){o.where="before";break}o.where="after"}else r<c&&(s=c),n<d?(i=d,o.where="before"):(a=d,o.where="after")}return o}var getRandomNodeId=shortid;function createNode(e,t){var n=e.data.type,r=e.id||getRandomNodeId();return immer.produce({},(function(o){if(o.id=r,o._hydrationTimestamp=Date.now(),o.data=_assign({type:n,props:_assign({},e.data.props),name:"string"==typeof n?n:n.name,displayName:"string"==typeof n?n:n.name,custom:{},isCanvas:!1,hidden:!1},e.data),o.related={},o.events={selected:!1,dragged:!1,hovered:!1},o.rules=_assign({canDrag:function(){return!0},canDrop:function(){return!0},canMoveIn:function(){return!0},canMoveOut:function(){return!0}},n.craft&&n.craft.rules||{}),o.data.type===Element||o.data.type===Canvas){var a=o.data.type===Canvas,i=_assign(_assign({},defaultElementProps),o.data.props);Object.keys(defaultElementProps).forEach((function(e){o.data[elementPropToNodeData[e]||e]=i[e],delete o.data.props[e]})),n=o.data.type,a&&(o.data.isCanvas=!0,deprecateCanvasComponent())}if(t&&t(o),n.craft){o.data.props=_assign(_assign({},n.craft.props||n.craft.defaultProps||{}),o.data.props);var s=n.craft.displayName||n.craft.name;if(s&&(o.data.displayName=s),n.craft.isCanvas&&(o.data.isCanvas=o.data.isCanvas||n.craft.isCanvas),n.craft.rules&&Object.keys(n.craft.rules).forEach((function(e){["canDrag","canDrop","canMoveIn","canMoveOut"].includes(e)&&(o.rules[e]=n.craft.rules[e])})),n.craft.custom&&(o.data.custom=_assign(_assign({},n.craft.custom),o.data.custom)),n.craft.related){o.related={};var d={id:o.id,related:!0};Object.keys(n.craft.related).forEach((function(e){o.related[e]=function(){return React__default.createElement(NodeProvider,d,React__default.createElement(n.craft.related[e]))}}))}}}))}function parseNodeFromJSX(e,t){var n=e;return"string"==typeof n&&(n=React__default.createElement(React.Fragment,{},n)),createNode({data:{type:n.type,props:_assign({},n.props)}},(function(e){t&&t(e,n)}))}var mergeNodes=function(e,t){var n,r;if(t.length<1)return(n={})[e.id]=e,n;var o=t.map((function(e){return e.rootNodeId})),a=_assign(_assign({},e),{data:_assign(_assign({},e.data),{nodes:o})}),i=((r={})[e.id]=a,r);return t.reduce((function(t,n){var r,o=n.nodes[n.rootNodeId];return _assign(_assign(_assign({},t),n.nodes),((r={})[o.id]=_assign(_assign({},o),{data:_assign(_assign({},o.data),{parent:e.id})}),r))}),i)},mergeTrees=function(e,t){return{rootNodeId:e.id,nodes:mergeNodes(e,t)}},resolveComponent=function(e,t){var n=t.name||t.displayName;if(t===Canvas)return"Canvas";if(e[n])return n;for(var r=0;r<Object.keys(e).length;r++){var o=Object.keys(e)[r];if(e[o]===t)return o}return"string"==typeof t?t:void 0},restoreType=function(e,t){return"object"==typeof e&&e.resolvedName?"Canvas"===e.resolvedName?Canvas:t[e.resolvedName]:"string"==typeof e?e:null},deserializeComp=function(e,t,n){var r=e.props,o=restoreType(e.type,t);if(o){r=Object.keys(r).reduce((function(e,n){var o=r[n];return e[n]="object"==typeof o&&o.resolvedName?deserializeComp(o,t):"children"===n&&Array.isArray(o)?o.map((function(e){return"string"==typeof e?e:deserializeComp(e,t)})):o,e}),{}),n&&(r.key=n);var a=_assign({},React__default.createElement(o,_assign({},r)));return _assign(_assign({},a),{name:resolveComponent(t,a.type)})}},deserializeNode=function(e,t){var n=__rest(e,["type","props"]),r=deserializeComp(e,t),o=r.name,a=n.parent,i=n.nodes,s=n.linkedNodes||n._childCanvas;return _assign(_assign(_assign({type:r.type,name:o,displayName:n.displayName||o,props:r.props,custom:n.custom||{},isCanvas:!!n.isCanvas,hidden:!!n.hidden},a?{parent:a}:{}),s?{linkedNodes:s}:{}),i?{nodes:i}:{})},reduceType=function(e,t){return"string"==typeof e?e:{resolvedName:resolveComponent(t,e)}},serializeComp=function(e,t){var n=e.type,r=e.isCanvas,o=e.props;return o=o?Object.keys(o).reduce((function(e,n){var r=o[n];return r?(e[n]="children"===n&&"string"!=typeof r?React.Children.map(r,(function(e){return"string"==typeof e?e:serializeComp(e,t)})):r.type?serializeComp(r,t):r,e):e}),{}):{},_assign(_assign({type:reduceType(n,t)},r&&{isCanvas:r}),{props:o})},serializeNode=function(e,t){var n=e.type,r=e.props,o=e.isCanvas,a=__rest(e,["type","props","isCanvas","name"]),i=serializeComp({type:n,isCanvas:o,props:r},t);return _assign(_assign({},i),a)};function NodeHelpers(e,t){invariant("string"==typeof t,utils.ERROR_INVALID_NODE_ID);var n=e.nodes[t],r=function(t){return NodeHelpers(e,t)};return{isCanvas:function(){return!!n.data.isCanvas},isRoot:function(){return n.id===utils.ROOT_NODE},isLinkedNode:function(){return n.data.parent&&r(n.data.parent).linkedNodes().includes(n.id)},isTopLevelNode:function(){return this.isRoot()||this.isLinkedNode()},isDeletable:function(){return!this.isTopLevelNode()},isParentOfTopLevelNodes:function(){return!!n.data.linkedNodes},isParentOfTopLevelCanvas:function(){return utils.deprecationWarning("query.node(id).isParentOfTopLevelCanvas",{suggest:"query.node(id).isParentOfTopLevelNodes"}),this.isParentOfTopLevelNodes()},get:function(){return n},ancestors:function(t){return void 0===t&&(t=!1),function n(r,o,a){void 0===o&&(o=[]),void 0===a&&(a=0);var i=e.nodes[r];return i?(o.push(r),i.data.parent?((t||!t&&0===a)&&(o=n(i.data.parent,o,a+1)),o):o):o}(n.data.parent)},descendants:function(n,o){return void 0===n&&(n=!1),function t(a,i,s){if(void 0===i&&(i=[]),void 0===s&&(s=0),n||!n&&0===s){var d=e.nodes[a];if(!d)return i;if("childNodes"!==o&&r(a).linkedNodes().forEach((function(e){i.push(e),i=t(e,i,s+1)})),"linkedNodes"!==o){var u=d.data.nodes;u&&u.forEach((function(e){i.push(e),i=t(e,i,s+1)}))}return i}return i}(t)},linkedNodes:function(){return Object.values(n.data.linkedNodes||{})},isDraggable:function(t){try{var o=n;return invariant(!this.isTopLevelNode(),utils.ERROR_MOVE_TOP_LEVEL_NODE),invariant(NodeHelpers(e,o.data.parent).isCanvas(),utils.ERROR_MOVE_NONCANVAS_CHILD),invariant(o.rules.canDrag(o,r),utils.ERROR_CANNOT_DRAG),!0}catch(e){return t&&t(e),!1}},isDroppable:function(t,o){var a="object"==typeof t&&!e.nodes[t.id],i=function(t){return"string"==typeof t?e.nodes[t]:t}(t),s=n;try{if("string"==typeof t&&invariant(!r(t).isTopLevelNode(),utils.ERROR_MOVE_TOP_LEVEL_NODE),invariant(this.isCanvas(),utils.ERROR_MOVE_TO_NONCANVAS_PARENT),invariant(s.rules.canMoveIn(i,s,r),utils.ERROR_MOVE_INCOMING_PARENT),invariant(i.rules.canDrop(s,i,r),utils.ERROR_MOVE_CANNOT_DROP),a)return!0;var d=r(i.id).descendants(!0);invariant(!d.includes(s.id)&&s.id!==i.id,utils.ERROR_MOVE_TO_DESCENDANT);var u=i.data.parent&&e.nodes[i.data.parent];return invariant(u.data.isCanvas,utils.ERROR_MOVE_NONCANVAS_CHILD),invariant(u||!u&&!e.nodes[i.id],utils.ERROR_DUPLICATE_NODEID),n!==u&&invariant(u.rules.canMoveOut(i,u,r),utils.ERROR_MOVE_OUTGOING_PARENT),!0}catch(e){return o&&o(e),!1}},toSerializedNode:function(){return serializeNode(n.data,e.options.resolver)},toNodeTree:function(e){var n=__spreadArrays([t],this.descendants(!0,e)).reduce((function(e,t){return e[t]=r(t).get(),e}),{});return{rootNodeId:t,nodes:n}},decendants:function(e){return void 0===e&&(e=!1),utils.deprecationWarning("query.node(id).decendants",{suggest:"query.node(id).descendants"}),this.descendants(e)},isTopLevelCanvas:function(){return!this.isRoot()&&!n.data.parent}}}function QueryMethods(e){var t=e&&e.options,n=function(){return QueryMethods(e)};return{getDropPlaceholder:function(t,r,o,a){if(void 0===a&&(a=function(t){return e.nodes[t.id].dom}),t!==r){var i="string"==typeof t&&e.nodes[t],s=e.nodes[r],d=n().node(s.id).isCanvas()?s:e.nodes[s.data.parent];if(d){var u=d.data.nodes||[],c=findPosition(d,u?u.reduce((function(t,n){var r=a(e.nodes[n]);if(r){var o=_assign({id:n},utils.getDOMInfo(r));t.push(o)}return t}),[]):[],o.x,o.y),l=u.length&&e.nodes[u[c.index]],f={placement:_assign(_assign({},c),{currentNode:l}),error:!1};return i&&n().node(i.id).isDraggable((function(e){return f.error=e})),n().node(d.id).isDroppable(t,(function(e){return f.error=e})),f}}},getOptions:function(){return t},node:function(t){return NodeHelpers(e,t)},getSerializedNodes:function(){var t=this,n=Object.keys(e.nodes).map((function(e){return[e,t.node(e).toSerializedNode()]}));return fromEntries(n)},serialize:function(){return JSON.stringify(this.getSerializedNodes())},parseReactElement:function(t){return{toNodeTree:function(r){var o=parseNodeFromJSX(t,(function(t,n){var o=resolveComponent(e.options.resolver,t.data.type);invariant(null!==o,utils.ERROR_NOT_IN_RESOLVER),t.data.displayName=t.data.displayName||o,t.data.name=o,r&&r(t,n)})),a=[];return t.props&&t.props.children&&(a=React__default.Children.toArray(t.props.children).reduce((function(e,t){return React__default.isValidElement(t)&&e.push(n().parseReactElement(t).toNodeTree(r)),e}),[])),mergeTrees(o,a)}}},parseSerializedNode:function(t){return{toNode:function(r){var o=deserializeNode(t,e.options.resolver);invariant(o.type,utils.ERROR_NOT_IN_RESOLVER);var a="string"==typeof r&&r;return a&&utils.deprecationWarning("query.parseSerializedNode(...).toNode(id)",{suggest:"query.parseSerializedNode(...).toNode(node => node.id = id)"}),n().parseFreshNode(_assign(_assign({},a?{id:a}:{}),{data:o})).toNode(!a&&r)}}},parseFreshNode:function(t){return{toNode:function(n){return createNode(t,(function(t){t.data.parent===utils.DEPRECATED_ROOT_NODE&&(t.data.parent=utils.ROOT_NODE);var r=resolveComponent(e.options.resolver,t.data.type);invariant(null!==r,utils.ERROR_NOT_IN_RESOLVER),t.data.displayName=t.data.displayName||r,t.data.name=r,n&&n(t)}))}}},createNode:function(e,t){utils.deprecationWarning("query.createNode("+e+")",{suggest:"query.parseReactElement("+e+").toNodeTree()"});var n=this.parseReactElement(e).toNodeTree(),r=n.nodes[n.rootNodeId];return t?(t.id&&(r.id=t.id),t.data&&(r.data=_assign(_assign({},r.data),t.data)),r):r}}}var editorInitialState={nodes:{},events:{dragged:null,selected:null,hovered:null,indicator:null}},useEditorStore=function(e){return utils.useMethods(Actions,_assign(_assign({},editorInitialState),{options:e}),QueryMethods)},withDefaults=function(e){return void 0===e&&(e={}),_assign({onNodesChange:function(){return null},onRender:function(e){return e.render},resolver:{},nodes:null,enabled:!0,indicator:{error:"red",success:"rgb(98, 196, 98)"}},e)},Editor=function(e){var t=e.children,n=__rest(e,["children"]),r=useEditorStore(withDefaults(n));return React.useEffect((function(){r&&n&&r.actions.setOptions((function(e){}))}),[r,n]),React.useEffect((function(){r.subscribe((function(e){return{json:r.query.serialize()}}),(function(){r.query.getOptions().onNodesChange(r.query)}))}),[r]),r?React__default.createElement(EditorContext.Provider,{value:r},React__default.createElement(Events,null,t)):null};Object.defineProperty(exports,"ROOT_NODE",{enumerable:!0,get:function(){return utils.ROOT_NODE}}),exports.Canvas=Canvas,exports.DerivedEventHandlers=DerivedEventHandlers,exports.Editor=Editor,exports.Element=Element,exports.Events=Events,exports.Frame=Frame,exports.NodeContext=NodeContext,exports.NodeProvider=NodeProvider,exports.connectEditor=connectEditor,exports.connectNode=connectNode,exports.defaultElementProps=defaultElementProps,exports.deprecateCanvasComponent=deprecateCanvasComponent,exports.elementPropToNodeData=elementPropToNodeData,exports.useEditor=useEditor,exports.useEventHandler=useEventHandler,exports.useNode=useNode,exports.withDefaults=withDefaults;