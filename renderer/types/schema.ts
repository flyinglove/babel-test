export interface SchemaNode {
  type?: string;
  component?: string;
  props?: Record<string, unknown>;
  components?: SchemaNode[];
  slots?: Record<string, SchemaNode[]>;
  [key: string]: unknown;
}
