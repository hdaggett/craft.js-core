import { DerivedEventHandlers } from '../events';
import { ConnectorsForHandlers } from '@craftjs/utils';
/**
 * Creates Node-specific event handlers and connectors
 */
export declare class NodeHandlers extends DerivedEventHandlers<'connect' | 'drag'> {
    id: any;
    constructor(store: any, derived: any, nodeId: any);
    handlers(): {
        connect: {
            init: (el: any) => void;
        };
        drag: {
            init: (el: any) => void;
        };
    };
}
export declare type NodeConnectors = ConnectorsForHandlers<NodeHandlers>;
