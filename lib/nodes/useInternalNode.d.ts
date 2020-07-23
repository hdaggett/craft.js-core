import { NodeProvider } from './NodeContext';
import { Node } from '../interfaces';
import { NodeConnectors } from './NodeHandlers';
declare type internalActions = NodeProvider & {
    inNodeContext: boolean;
    connectors: NodeConnectors;
    actions: {
        setProp: (cb: (props: any) => void) => void;
        setCustom: (cb: (custom: any) => void) => void;
        setHidden: (bool: boolean) => void;
    };
};
export declare type useInternalNode<S = null> = S extends null ? internalActions : S & internalActions;
export declare function useInternalNode(): useInternalNode;
export declare function useInternalNode<S = null>(collect?: (node: Node) => S): useInternalNode<S>;
export {};
