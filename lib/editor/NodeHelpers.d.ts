import { EditorState, Node, NodeId } from '@craftjs/core';
export declare function NodeHelpers(state: EditorState, id: NodeId): {
    isCanvas(): boolean;
    isRoot(): boolean;
    isLinkedNode(): boolean;
    isTopLevelNode(): any;
    isDeletable(): boolean;
    isParentOfTopLevelNodes: () => boolean;
    isParentOfTopLevelCanvas(): any;
    get(): Node;
    ancestors(deep?: boolean): string[];
    descendants(deep?: boolean, includeOnly?: "linkedNodes" | "childNodes"): string[];
    linkedNodes(): string[];
    isDraggable(onError?: (err: string) => void): boolean;
    isDroppable(target: string | Node, onError?: (err: string) => void): boolean;
    toSerializedNode(): import("..").SerializedNode;
    toNodeTree(includeOnly?: "linkedNodes" | "childNodes"): {
        rootNodeId: string;
        nodes: any;
    };
    /**
     Deprecated NodeHelpers
     **/
    decendants(deep?: boolean): any;
    isTopLevelCanvas(): boolean;
};
