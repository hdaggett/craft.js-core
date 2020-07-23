import React from 'react';
import { Options } from '../interfaces';
export declare const withDefaults: (options?: Partial<Options>) => {
    onRender: React.ComponentClass<{
        render: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
    }, any> | React.FunctionComponent<{
        render: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
    }> | (({ render }: {
        render: any;
    }) => any);
    onNodesChange: ((query: {
        getDropPlaceholder: (source: string | import("../interfaces").Node, target: string, pos: {
            x: number;
            y: number;
        }, nodesToDOM?: (node: import("../interfaces").Node) => HTMLElement) => import("../interfaces").Indicator;
        getOptions: () => Options;
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
            toSerializedNode(): import("../interfaces").SerializedNode;
            toNodeTree(includeOnly?: "linkedNodes" | "childNodes"): {
                rootNodeId: any;
                nodes: any;
            };
            decendants(deep?: boolean): any;
            isTopLevelCanvas(): boolean;
        };
        getSerializedNodes: () => Record<string, import("../interfaces").SerializedNode>;
        serialize: () => string;
        parseReactElement: (reactElement: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>) => {
            toNodeTree(normalize?: (node: import("../interfaces").Node, jsx: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>) => void): import("../interfaces").NodeTree;
        };
        parseSerializedNode: (serializedNode: import("../interfaces").SerializedNode) => {
            toNode(normalize?: (node: import("../interfaces").Node) => void): import("../interfaces").Node;
        };
        parseFreshNode: (node: import("../interfaces").FreshNode) => {
            toNode(normalize?: (node: import("../interfaces").Node) => void): import("../interfaces").Node;
        };
        createNode: (reactElement: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>, extras?: any) => any;
    }) => void) | (() => any);
    resolver: Record<string, string | React.ComponentClass<any, any> | React.FunctionComponent<any>>;
    enabled: boolean;
    indicator: Record<"success" | "error", string> | {
        error: string;
        success: string;
    };
    nodes: any;
};
/**
 * A React Component that provides the Editor context
 */
export declare const Editor: React.FC<Partial<Options>>;
