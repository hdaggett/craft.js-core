import { EditorState } from '../../interfaces';
import React from 'react';
export declare function connectEditor<C>(collect?: (state: EditorState) => C): (WrappedComponent: React.ElementType<any>) => (props: any) => JSX.Element;
