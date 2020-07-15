import { Schema, Document, Model, model, Connection } from 'mongoose';
import { Extract, Definition, DefinitionField } from './types';

// export declare function typedModel<T extends Schema & Definition, S extends {
//     [name: string]: Function;
// }>(name: string, schema?: T, collection?: string, skipInit?: boolean, statics?: S & ThisType<Model<Document & Extract<T>>>): Model<Document & Extract<T>> & S & Record<DefinitionField, T[DefinitionField]>;

export function typedModel<
  T extends Schema & Definition,
  S extends { [name: string]: Function }
>(
  name: string,
  schema?: T,
  collection?: string,
  skipInit?: boolean,
  statics?: S & ThisType<Model<Document & Extract<T>>>,
  connection?: Connection
): Model<Document & Extract<T>> &
  S &
  Record<DefinitionField, T[DefinitionField]> {
  if (schema && statics) schema.statics = statics;
  if (connection) return connection.model(name, schema, collection) as any;
  return model(name, schema, collection, skipInit) as any;
}
