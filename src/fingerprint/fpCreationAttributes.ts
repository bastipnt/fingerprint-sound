/***************************************************************************************************
TODO: needs to be added:

- width and height of fallback font text
- detection of adblocker
- Firebug resource detection
- Kaspersky resource detection
- VideoDownloadHelper resource detection
- GTranslate rescource detection
- Privowny resource detection
- Privowny page content change
- Grammarly page content change
- Adguard page conent change
- Evernote page content change
- TOTL page content change
- IE Tab page content change
- WebRTC fingerprinting
- WebGL vendor (unmasked)
- WebGL renderer (unmasked)
- WebGL precision format
- WebGL canvas
- width and position of a created div
- colors of layout components
- size of bounding boxes of a created div
- presence of fonts
- support of video codecs
- support of audio codecs
- support of streaming codecs
- support of recording codecs
- list of speech synthesis voices
- Audio fingerprinting
- Canvas fingerprinting
- HTTP headers???
- Any remaining HTTP headers
- Number of bounding boxes
- Number of plugins
- Number of WebGL extensions
- Width and height of first bounding box
- Width and height of second bounding box
- Width and height of third bounding box
- List of widths of bounding boxes
- List of heights of bounding boxes
- Width of first bounding box
- Height of first bounding box
- Width of second bounding box
- Height of second bounding box
- Width of third bounding box
- Height of third bounding box
- Width of a created div
- Position of a created div
- Width of fallback font text
- Height of fallback font text
- Color of ActiveBorder element
- Color of ActiveCaption element
- Color of AppWorkspace element
- Color of Background element
- Color of ButtonFace element
- Color of ButtonHighlight element
- Color of ButtonShadow element
- Color of ButtonText element
- Color of CaptionText element
- Color of GrayText element
- Color of Highlight element
- Color of HighlightText element
- Color of InactiveBorder element
- Color of InactiveCaption element
- Color of InactiveCaptionText element
- Color of InfoBackground element
- Color of InfoText element
- Color of Menu element
- Color of MenuText element
- Color of Scrollbar element
- Color of ThreeDDarkShadow element
- Color of ThreeDFace element
- Color of ThreeDHighlight element
- Color of ThreeDLightShadow element
- Color of ThreeDShadow element
- Color of Window element
- Color of WindowFrame element
- Color of WindowText elemen

***************************************************************************************************/

export enum FPAreas {
  DOCUMENT = "document",
  MATH = "Math",
  WINDOW = "window",
  NAVIGATOR = "navigator",
  SCREEN = "screen",
  AUDIO = "audio",
  CANVAS = "canvas",
  OTHER = "other",
}

export type FPFunctionType = {
  args?: (string | number)[];
  chain?: FPAttribute[];
};

export type FPClass = FPFunctionType & {
  class: string;
};

export type FPFn = FPFunctionType & {
  fn: string;
};

export type FPSupports = {
  supports: string;
};

export type FPNestedAttribute = {
  [key: string]: FPAttribute[];
};

export type FPAttribute =
  | string
  | FPNestedAttribute
  | FPFn
  | FPClass
  | FPSupports;

export type FPArea = {
  attributes?: FPAttribute[];
};

export type FPCreationAttributes = {
  [area in FPAreas]: FPArea & {
    audioContext?: FPArea;
    audioAnalyser?: FPArea;
    audioDestination?: FPArea;
    "2D"?: FPArea;
    webGL?: FPArea & {
      implementationPrefix: FPArea;
    };
  };
};

const fpCreationAttributes: FPCreationAttributes = {
  document: {
    attributes: [
      { security: ["Policy"] },
      { fn: "createEvent", args: ["TouchEvent"] },
      "msCapsLockWarningOff",
      "msCSSOMElementFloatMetrics",
      "defaultCharset",
    ],
  },
  Math: {
    attributes: [
      { fn: "tan", args: [-1e300] },
      { fn: "tan", args: [3.14159265359 * 0.333 * 1e300] },
      { fn: "acos", args: [0.000000000000001] },
      { fn: "acosh", args: [1.000000000001] },
      { fn: "asinh", args: [0.00001] },
      { fn: "asinh", args: [1e300] },
      { fn: "atan", args: [2] },
      { fn: "atan2", args: [0.01, 1000] },
      { fn: "atanh", args: [0.0001] },
      { fn: "cosh", args: [15] },
      { fn: "exp", args: [-1e2] },
      { fn: "exp", args: [1e2] },
      "LOG2E",
      "LOG10E",
      "E",
      "LN10",
    ],
  },
  navigator: {
    attributes: [
      "_listing",
      "userAgent",
      "language",
      "languages",
      "userLanguage",
      "systemLanguage",
      "browserLanguage",
      "platform",
      "appName",
      "appVersion",
      "appMinorVersion",
      "product",
      "productSub",
      "vendor",
      "vendorSub",
      "cookieEnabled",
      "cpuClass",
      "oscpu",
      "hardwareConcurrency",
      "buildID",
      "security",
      "permissions",
      "msMaxTouchPoints",
      "maxTouchPoints",
      "doNotTrack",
      "msDoNotTrack",
      { connection: ["type", "downlink", "bandwidth"] },
      { mozConnection: ["bandwidth"] },
      { mediaDevices: [{ fn: "getSupportedConstraints" }] },
      { fn: "javaEnabled" },
      { fn: "taintEnabled" },
      { fn: "getGamepads" },
      "msManipulationViewsEnabled",
      "msPointerEnabled",
      "pointerEnabled",
      "msWebdriver",
      "webdriver",
      "plugins",
      "mimeTypes",
    ],
  },
  screen: {
    attributes: [
      "_listing",
      "width",
      "height",
      "availWidth",
      "availHeight",
      "availTop",
      "availLeft",
      "pixelDepth",
      "colorDepth",
      "deviceXDPI",
      "deviceYDPI",
      "systemXDPI",
      "systemYDPI",
      "logicalXDPI",
      "logicalYDPI",
      { orientation: ["type", "angle"] },
      { mozOrientation: ["type", "angle"] },
      { msOrientation: ["type", "angle"] },
      "fontSmoothingEnabled",
    ],
  },
  window: {
    attributes: [
      { Notification: ["permission", "maxActions"] },
      "ontouchstart",
      "doNotTrack",
      {
        Intl: [
          { fn: "Collator", chain: [{ fn: "resolvedOptions" }] },
          { fn: "DateTimeFormat", chain: [{ fn: "resolvedOptions" }] },
          { fn: "NumberFormat", chain: [{ fn: "resolvedOptions" }] },
          { fn: "v8BreakIterator", chain: [{ fn: "resolvedOptions" }] },
        ],
      },
      { InstallTrigger: [{ fn: "enabled" }, { fn: "updateEnabled" }] },
      { Debug: ["debuggerEnabled", "setNonUserCodeExceptions"] },
      "screenX",
      "screenY",
      "innerWidth",
      "innerHeight",
      "outerWidth",
      "outerHeight",
      "devicePixelRatio",
      "mozInnerScreenX",
      "mozInnerScreenY",
      "offscreenBuffering",
      { supports: "localStorage" },
      { supports: "sessionStorage" },
      { supports: "indexedDB" },
      { supports: "openDatabase" },
      { supports: "cashes" },
      { performance: ["jsHeapSizeLimit"] },
      { console: ["jsHeapSizeLimit"] },
      { menubar: ["visible"] },
      "isSecureContext",
    ],
  },
  audio: {
    audioContext: {
      attributes: ["state", "sampleRate"],
    },
    audioAnalyser: {
      attributes: [
        "channelCount",
        "channelCountMode",
        "channelInterpretation",
        "numberOfInputs",
        "numberOfOutputs",
        "fftSize",
        "frequencyBinCount",
        "maxCecibels",
        "minDecibels",
        "smoothingTimeConstant",
      ],
    },
    audioDestination: {
      attributes: [
        "channelCount",
        "channelCountMode",
        "channelInterpretation",
        "maxChannelCount",
        "numberOfInputs",
        "numnberOfOutputs",
      ],
    },
  },
  canvas: {
    "2D": {},
    webGL: {
      implementationPrefix: {},
      attributes: [
        "SHADING_LANGUAGE_VERSION",
        "VERSION",
        "VENDOR",
        "RENDERER",
        "ALIASED_PAINT_SIZE_RANGE",
        "ALIASED_LINE_WIDTH_RANGE",
        "SUBPIXEL_BITS",
        "SAMPLE_BUFFERS",
        "SAMPLES",
        "COMPRESSED_TEXTURE_FORMATS",
        "STENCIL_VALUE_MASK",
        "STENCIL_WRITEMASK",
        "STENCIL_BACK_VALUE_MASK",
        "STENCIL_BACK_WRITEMASK",
        "DEPTH_BITS",
        "STENCIL_BITS",
        "MAX_VIEWPORT_DIMS",
        "MAX_VERTEX_UNIFORM_VECTORS",
        "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
        "MAX_FRAGMENT_UNIFORM_VECTORS",
        "MAX_CUBE_MAP_TEXTURE_SIZE",
        "MAX_TEXTURE_SIZE",
        "MAX_VARYING_VECTORS",
        "MAX_RENDERBUFFER_SIZE",
        "MAX_TEXTURE_IMAGE_UNITS",
        "MAX_VERTEX_ATTRIBS",
        "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
        "MAX_TEXTURE_MAX_ANISOTROPY_EXT",
        { fn: "getContextAttributes" },
        { fn: "getSupportedExtensions" },
      ],
    },
  },
  other: {
    attributes: [
      {
        class: "Date",
        args: [2016, 1, 1],
        chain: [{ fn: "getTimezoneOffset" }],
      },
      {
        class: "Date",
        args: [2016, 1, 6],
        chain: [{ fn: "getTimezoneOffset" }],
      },
      {
        class: "Date",
        args: [0],
      },
      {
        class: "Date",
        args: ["0001-1-1"],
      },
      {
        class: "Date",
        args: [0],
        chain: [{ fn: "setFullYear", args: [0] }],
      },
    ],
  },
};

export default fpCreationAttributes;
