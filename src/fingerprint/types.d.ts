export enum FPAreas {
  DOCUMENT = "document",
  MATH = "Math",
  WINDOW = "window",
  NAVIGATOR = "navigator",
  SCREEN = "screen",
  AUDIO_CONTEXT = "audio-context",
  AUDIO_ANALYSER = "audio-analyser",
  AUDIO_DESTINATION = "audio-destination",
  CANVAS_2D = "canvas-2D",
  CANVAS_WEBGL = "canvas-webGL",
  CANVAS_WEBGL2 = "canvas-webGL2",
  DATE = "date",
}

export enum FPAttributeTypes {
  ATTRIBUTE = "attribute",
  NESTED_ATTRIBUTE = "nestedAttribute",
  FN = "fn",
  NESTED_FN = "nestedFn",
  CLASS = "class",
  NESTED_CLASS = "nestedClass",
  SUPPORTS = "supports",
  LISTS = "lists",
}

export type FPBaseAttributeExisting<K> = {
  key: keyof K;
};

export type FPBaseAttributeNonExisting<K> = {
  name: string;
};

export type FPBaseAttribute<K> = (
  | FPBaseAttributeExisting<K>
  | FPBaseAttributeNonExisting<K>
) & {
  label: string;
  type: FPAttributeTypes;
  use?: boolean;
};

export type FPSimpleAttribute<K> = FPBaseAttribute<K> & {
  type: FPAttributeTypes.ATTRIBUTE;
};

export type FPNestedAttribute<K> = FPBaseAttribute<K> & {
  type: FPAttributeTypes.NESTED_ATTRIBUTE;
  attributes: FPAttribute<K[FPSimpleAttribute<K>["key"]]>[];
};

export type FPFnAttribute<K> = FPBaseAttribute<K> & {
  type: FPAttributeTypes.FN;
  callParameters?: (string | number)[];
};

export type FPNestedFnAttribute<K> = FPBaseAttribute<K> & {
  type: FPAttributeTypes.NESTED_FN;
  attributes: FPAttribute<ReturnType<K[FPSimpleAttribute<K>["key"]]>>[];
  callParameters?: (string | number)[];
};

export type FPClassAttribute<K> = FPBaseAttribute<K> & {
  type: FPAttributeTypes.CLASS;
  callParameters?: (string | number)[];
};

export type FPNestedClassAttribute<K> = FPBaseAttribute<K> & {
  type: FPAttributeTypes.NESTED_CLASS;
  attributes: FPAttribute<InstanceType<K[FPSimpleAttribute<K>["key"]]>>[];
  callParameters?: (string | number)[];
};

export type FPSupportsAttribute<K> = FPBaseAttribute<K> & {
  type: FPAttributeTypes.SUPPORTS;
};

export type FPListsAttribute<K> = Omit<FPBaseAttribute<K>, "key"> & {
  type: FPAttributeTypes.LISTS;
};

export type FPAttribute<K> =
  | FPSimpleAttribute<K>
  | FPNestedAttribute<K>
  | FPFnAttribute<K>
  | FPNestedFnAttribute<K>
  | FPClassAttribute<K>
  | FPNestedClassAttribute<K>
  | FPSupportsAttribute<K>
  | FPListsAttribute<K>;

export type FPArea<K> = {
  attributes: FPAttribute<K>[];
};

export type FPValue = {
  label: string;
  value: string | boolean | number | undefined | null;
};

// type FPResult = {
//   [key: string]: string | number | boolean | undefined | null;
// };
