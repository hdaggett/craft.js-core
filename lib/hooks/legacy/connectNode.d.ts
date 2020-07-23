import { Node } from '../../interfaces';
import React from 'react';
export declare function connectNode<C>(collect?: (state: Node) => C): (WrappedComponent: React.ElementType<any>) => (props: any) => JSX.Element;
