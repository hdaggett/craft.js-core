import { useInternalEditor, EditorCollector } from '../editor/useInternalEditor';
import { NodeId } from '../interfaces';
declare type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
declare type Delete<T, U> = Pick<T, Exclude<keyof T, U>>;
export declare type useEditor<S = null> = Overwrite<useInternalEditor<S>, {
    actions: Delete<useInternalEditor<S>['actions'], 'addLinkedNodeFromTree' | 'setNodeEvent' | 'setDOM' | 'replaceNodes' | 'reset'> & {
        selectNode: (nodeId: NodeId | null) => void;
    };
    query: Delete<useInternalEditor<S>['query'], 'deserialize'>;
}>;
/**
 * A Hook that that provides methods and information related to the entire editor state.
 * @param collector Collector function to consume values from the editor's state
 */
export declare function useEditor(): useEditor;
export declare function useEditor<S>(collect: EditorCollector<S>): useEditor<S>;
export {};
