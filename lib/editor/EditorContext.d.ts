/// <reference types="react" />
import { EditorStore } from './store';
export declare type EditorContext = EditorStore;
export declare const EditorContext: import("react").Context<import("@craftjs/utils").SubscriberAndCallbacksFor<(state: import("..").EditorState, query: {
    getDropPlaceholder: (source: string | import("..").Node, target: string, pos: {
        x: number;
        y: number;
    }, nodesToDOM?: (node: import("..").Node) => HTMLElement) => import("..").Indicator;
    getOptions: () => import("..").Options;
    node: (id: string) => {
        isCanvas(): boolean;
        isRoot(): boolean;
        isLinkedNode(): boolean;
        isTopLevelNode(): any;
        isDeletable(): boolean;
        isParentOfTopLevelNodes: () => boolean;
        isParentOfTopLevelCanvas(): any;
        get(): any;
        ancestors(deep?: boolean): any[];
        descendants(deep?: boolean, includeOnly?: "linkedNodes" | "childNodes"): any[];
        linkedNodes(): unknown[];
        isDraggable(onError?: (err: string) => void): boolean;
        isDroppable(target: any, onError?: (err: string) => void): boolean;
        toSerializedNode(): import("..").SerializedNode;
        toNodeTree(includeOnly?: "linkedNodes" | "childNodes"): {
            rootNodeId: any;
            nodes: any;
        };
        decendants(deep?: boolean): any;
        isTopLevelCanvas(): boolean;
    };
    getSerializedNodes: () => Record<string, import("..").SerializedNode>;
    serialize: () => string;
    parseReactElement: (reactElement: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>) => {
        toNodeTree(normalize?: (node: import("..").Node, jsx: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>) => void): import("..").NodeTree;
    };
    parseSerializedNode: (serializedNode: import("..").SerializedNode) => {
        toNode(normalize?: (node: import("..").Node) => void): import("..").Node;
    };
    parseFreshNode: (node: import("..").FreshNode) => {
        toNode(normalize?: (node: import("..").Node) => void): import("..").Node;
    };
    createNode: (reactElement: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>, extras?: any) => any;
}) => {
    addLinkedNodeFromTree(tree: import("..").NodeTree, parentId: string, id?: string): void;
    add(nodeToAdd: import("..").Node | import("..").Node[], parentId: string, index?: number): void;
    addNodeTree(tree: import("..").NodeTree, parentId?: string, index?: number): void;
    delete(id: string): void;
    deserialize(input: string | Record<string, import("..").SerializedNode>): void;
    move(targetId: string, newParentId: string, index: number): void;
    replaceNodes(nodes: Record<string, import("..").Node>): void;
    clearEvents(): void;
    reset(): void;
    setOptions(cb: (options: Partial<import("..").Options>) => void): void;
    setNodeEvent(eventType: import("..").NodeEvents, id: string): void;
    setCustom<T extends string>(id: T, cb: (data: any) => void): void;
    setDOM(id: string, dom: HTMLElement): void;
    setIndicator(indicator: import("..").Indicator): void;
    setHidden(id: string, bool: boolean): void;
    setProp(id: string, cb: (props: any) => void): void;
}, any>>;
