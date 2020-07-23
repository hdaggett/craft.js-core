import { Indicator, NodeId, NodeTree } from '../interfaces';
import { ConnectorsForHandlers, Handlers, CraftDOMEvent } from '@craftjs/utils';
import { EditorStore } from '../editor/store';
declare type DraggedElement = NodeId | NodeTree;
/**
 * Specifies Editor-wide event handlers and connectors
 */
export declare class EventHandlers extends Handlers<'select' | 'hover' | 'drag' | 'drop' | 'create'> {
    static draggedElementShadow: HTMLElement;
    static draggedElement: DraggedElement;
    static events: {
        indicator: Indicator;
    };
    handlers(): {
        select: {
            init: () => () => any;
            events: [string, (e: CraftDOMEvent<Event>, opts: any) => void, boolean][];
        };
        hover: {
            init: () => () => any;
            events: [string, (e: CraftDOMEvent<Event>, opts: any) => void, boolean][];
        };
        drop: {
            events: [string, (e: CraftDOMEvent<Event>, opts: any) => void, boolean][];
        };
        drag: {
            init: (el: any, id: any) => () => void;
            events: [string, (e: CraftDOMEvent<Event>, opts: any) => void, boolean][];
        };
        create: {
            init: (el: any) => () => any;
            events: [string, (e: CraftDOMEvent<Event>, opts: any) => void, boolean][];
        };
    };
    private dropElement;
    /**
     * Create a new instance of Handlers with reference to the current EventHandlers
     * @param type A class that extends DerivedEventHandlers
     * @param args Additional arguments to pass to the constructor
     */
    derive<T extends DerivedEventHandlers<any>, U extends any[]>(type: {
        new (store: EditorStore, derived: EventHandlers, ...args: U): T;
    }, ...args: U): T;
}
/**
 *  Allows for external packages to easily extend EventHandlers
 */
export declare abstract class DerivedEventHandlers<T extends string> extends Handlers<T> {
    derived: EventHandlers;
    protected constructor(store: EditorStore, derived: EventHandlers);
}
export declare type EventConnectors = ConnectorsForHandlers<EventHandlers>;
export {};
