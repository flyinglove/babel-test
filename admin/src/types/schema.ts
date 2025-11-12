export interface SchemaNode {
  type?: string;
  component?: string;
  props?: Record<string, unknown>;
  components?: SchemaNode[];
  [key: string]: unknown;
}
