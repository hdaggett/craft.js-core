import { Node } from '../interfaces';
import { useInternalNode } from '../nodes/useInternalNode';
export declare type useNode<S = null> = useInternalNode<S> & Pick<useInternalNode<S>['actions'], 'setProp'>;
export declare function useNode(): useNode;
export declare function useNode<S = null>(collect?: (node: Node) => S): useNode<S>;
