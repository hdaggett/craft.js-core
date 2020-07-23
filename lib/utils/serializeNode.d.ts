import React from 'react';
import { NodeData, ReducedComp, SerializedNode } from '../interfaces';
export declare const serializeComp: (data: Pick<NodeData, "type" | "isCanvas" | "props">, resolver: Record<string, string | React.ComponentClass<any, any> | React.FunctionComponent<any>>) => ReducedComp;
export declare const serializeNode: (data: Pick<NodeData, "type" | "isCanvas" | "props" | "name" | "displayName" | "parent" | "index" | "linkedNodes" | "nodes" | "hidden" | "custom" | "_childCanvas">, resolver: Record<string, string | React.ComponentClass<any, any> | React.FunctionComponent<any>>) => SerializedNode;
