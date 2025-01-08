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

import { FPArea, FPAreas, FPAttributeTypes } from "./types.d";

export type FPCreationAttributes = {
  [FPAreas.DOCUMENT]: FPArea<Document>;
  [FPAreas.MATH]: FPArea<Math>;
  [FPAreas.NAVIGATOR]: FPArea<Navigator>;
  [FPAreas.WINDOW]: FPArea<typeof window>;
  [FPAreas.SCREEN]: FPArea<Screen>;
  [FPAreas.AUDIO_CONTEXT]: FPArea<AudioContext>;
  [FPAreas.AUDIO_ANALYSER]: FPArea<AnalyserNode>;
  [FPAreas.AUDIO_DESTINATION]: FPArea<AudioDestinationNode>;
  [FPAreas.CANVAS_2D]: FPArea<CanvasRenderingContext2D>;
  [FPAreas.CANVAS_WEBGL]: FPArea<WebGLRenderingContext>;
  [FPAreas.CANVAS_WEBGL2]: FPArea<WebGL2RenderingContext>;
  [FPAreas.DATE]: FPArea<{ Date: Date }>;
};

const fpCreationAttributes: FPCreationAttributes = {
  document: {
    attributes: [
      {
        type: FPAttributeTypes.FN,
        label: "createEvent",
        key: "createEvent",
        callParameters: ["TouchEvent"],
      },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "security",
        name: "security",
        attributes: [
          { type: FPAttributeTypes.ATTRIBUTE, label: "Policy", name: "Policy" },
        ],
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "msCapsLockWarningOff",
        name: "msCapsLockWarningOff",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "msCSSOMElementFloatMetrics",
        name: "msCSSOMElementFloatMetrics",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "defaultCharset",
        name: "defaultCharset",
      },
    ],
  },
  Math: {
    attributes: [
      {
        type: FPAttributeTypes.FN,
        label: "tan",
        key: "tan",
        callParameters: [-1e300],
      },
      {
        type: FPAttributeTypes.FN,
        label: "tan",
        key: "tan",
        callParameters: [3.14159265359 * 0.333 * 1e300],
      },
      {
        type: FPAttributeTypes.FN,
        label: "acos",
        key: "acos",
        callParameters: [0.000000000000001],
      },
      {
        type: FPAttributeTypes.FN,
        label: "acosh",
        key: "acosh",
        callParameters: [1.000000000001],
      },
      {
        type: FPAttributeTypes.FN,
        label: "asinh",
        key: "asinh",
        callParameters: [0.00001],
      },
      {
        type: FPAttributeTypes.FN,
        label: "asinh",
        key: "asinh",
        callParameters: [1e300],
      },
      {
        type: FPAttributeTypes.FN,
        label: "atan",
        key: "atan",
        callParameters: [2],
      },
      {
        type: FPAttributeTypes.FN,
        label: "atan2",
        key: "atan2",
        callParameters: [0.01, 1000],
      },
      {
        type: FPAttributeTypes.FN,
        label: "atanh",
        key: "atanh",
        callParameters: [0.0001],
      },
      {
        type: FPAttributeTypes.FN,
        label: "cosh",
        key: "cosh",
        callParameters: [15],
      },
      {
        type: FPAttributeTypes.FN,
        label: "exp",
        key: "exp",
        callParameters: [-1e2],
      },
      {
        type: FPAttributeTypes.FN,
        label: "exp",
        key: "exp",
        callParameters: [1e2],
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "LOG2E", key: "LOG2E" },
      { type: FPAttributeTypes.ATTRIBUTE, label: "LOG10E", key: "LOG10E" },
      { type: FPAttributeTypes.ATTRIBUTE, label: "E", key: "E" },
      { type: FPAttributeTypes.ATTRIBUTE, label: "LN10", key: "LN10" },
    ],
  },
  navigator: {
    attributes: [
      { type: FPAttributeTypes.LISTS, label: "listing for navigator" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "userAgent",
        key: "userAgent",
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "language", key: "language" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "languages",
        key: "languages",
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "platform", key: "platform" },
      { type: FPAttributeTypes.ATTRIBUTE, label: "appName", key: "appName" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "appVersion",
        key: "appVersion",
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "product", key: "product" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "productSub",
        key: "productSub",
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "vendor", key: "vendor" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "vendorSub",
        key: "vendorSub",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "cookieEnabled",
        key: "cookieEnabled",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "hardwareConcurrency",
        key: "hardwareConcurrency",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "permissions",
        key: "permissions",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "maxTouchPoints",
        key: "maxTouchPoints",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "doNotTrack",
        key: "doNotTrack",
      },
      { type: FPAttributeTypes.FN, label: "javaEnabled", key: "javaEnabled" },
      { type: FPAttributeTypes.FN, label: "getGamepads", key: "getGamepads" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "webdriver",
        key: "webdriver",
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "plugins", key: "plugins" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "mimeTypes",
        key: "mimeTypes",
      },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "connection",
        name: "connection",
        attributes: [
          { type: FPAttributeTypes.ATTRIBUTE, label: "type", name: "type" },
          {
            type: FPAttributeTypes.ATTRIBUTE,
            label: "downlink",
            name: "downlink",
          },
          {
            type: FPAttributeTypes.ATTRIBUTE,
            label: "bandwidth",
            name: "bandwidth",
          },
        ],
      },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "nozConnection",
        name: "nozConnection",
        attributes: [
          {
            type: FPAttributeTypes.ATTRIBUTE,
            label: "bandwidth",
            name: "bandwidth",
          },
        ],
      },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "mediaDevices",
        key: "mediaDevices",
        attributes: [
          {
            type: FPAttributeTypes.FN,
            label: "getSupportedConstraints",
            key: "getSupportedConstraints",
          },
        ],
      },
      {
        type: FPAttributeTypes.FN,
        label: "taintEnabled",
        name: "taintEnabled",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "userLanguage",
        name: "userLanguage",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "systemLanguage",
        name: "systemLanguage",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "browserLanguage",
        name: "browserLanguage",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "appMinorVersion",
        name: "appMinorVersion",
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "cpuClass", name: "cpuClass" },
      { type: FPAttributeTypes.ATTRIBUTE, label: "oscpu", name: "oscpu" },
      { type: FPAttributeTypes.ATTRIBUTE, label: "buildID", name: "buildID" },
      { type: FPAttributeTypes.ATTRIBUTE, label: "security", name: "security" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "msMaxTouchPoints",
        name: "msMaxTouchPoints",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "msDoNotTrack",
        name: "msDoNotTrack",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "msManipulationViewsEnabled",
        name: "msManipulationViewsEnabled",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "msPointerEnabled",
        name: "msPointerEnabled",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "pointerEnabled",
        name: "pointerEnabled",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "msWebdriver",
        name: "msWebdriver",
      },
    ],
  },
  screen: {
    attributes: [
      { type: FPAttributeTypes.LISTS, label: "listing for screen" },
      { type: FPAttributeTypes.ATTRIBUTE, label: "width", key: "width" },
      { type: FPAttributeTypes.ATTRIBUTE, label: "height", key: "height" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "availWidth",
        key: "availWidth",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "availHeight",
        key: "availHeight",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "pixelDepth",
        key: "pixelDepth",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "colorDepth",
        key: "colorDepth",
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "availTop", name: "availTop" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "availLeft",
        name: "availLeft",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "deviceXDPI",
        name: "deviceXDPI",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "deviceYDPI",
        name: "deviceYDPI",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "systemXDPI",
        name: "systemXDPI",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "systemYDPI",
        name: "systemYDPI",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "logicalXDPI",
        name: "logicalXDPI",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "logicalYDPI",
        name: "logicalYDPI",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "fontSmoothingEnabled",
        name: "fontSmoothingEnabled",
      },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "orientation",
        key: "orientation",
        attributes: [
          { type: FPAttributeTypes.ATTRIBUTE, label: "type", key: "type" },
          { type: FPAttributeTypes.ATTRIBUTE, label: "angle", key: "angle" },
        ],
      },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "mozOrientation",
        name: "mozOrientation",
        attributes: [
          { type: FPAttributeTypes.ATTRIBUTE, label: "type", name: "type" },
          { type: FPAttributeTypes.ATTRIBUTE, label: "angle", name: "angle" },
        ],
      },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "msOrientation",
        name: "msOrientation",
        attributes: [
          { type: FPAttributeTypes.ATTRIBUTE, label: "type", name: "type" },
          { type: FPAttributeTypes.ATTRIBUTE, label: "angle", name: "angle" },
        ],
      },
    ],
  },
  window: {
    attributes: [
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "ontouchstart",
        key: "ontouchstart",
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "screenX", key: "screenX" },
      { type: FPAttributeTypes.ATTRIBUTE, label: "screenY", key: "screenY" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "innerWidth",
        key: "innerWidth",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "innerHeight",
        key: "innerHeight",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "outerWidth",
        key: "outerWidth",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "outerHeight",
        key: "outerHeight",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "devicePixelRatio",
        key: "devicePixelRatio",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "isSecureContext",
        key: "isSecureContext",
      },
      {
        type: FPAttributeTypes.SUPPORTS,
        label: "localStorage",
        key: "localStorage",
      },
      {
        type: FPAttributeTypes.SUPPORTS,
        label: "sessionStorage",
        key: "sessionStorage",
      },
      { type: FPAttributeTypes.SUPPORTS, label: "indexedDB", key: "indexedDB" },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "Intl",
        key: "Intl",
        attributes: [
          // @ts-ignore
          {
            type: FPAttributeTypes.NESTED_FN,
            label: "Collator",
            key: "Collator",
            attributes: [
              {
                type: FPAttributeTypes.FN,
                label: "resolvedOptions",
                key: "resolvedOptions",
              },
            ],
          },
          // @ts-ignore
          {
            type: FPAttributeTypes.NESTED_FN,
            label: "DateTimeFormat",
            key: "DateTimeFormat",
            attributes: [
              {
                type: FPAttributeTypes.FN,
                label: "resolvedOptions",
                key: "resolvedOptions",
              },
            ],
          },
          // @ts-ignore
          {
            type: FPAttributeTypes.NESTED_FN,
            label: "NumberFormat",
            key: "NumberFormat",
            attributes: [
              {
                type: FPAttributeTypes.FN,
                label: "resolvedOptions",
                key: "resolvedOptions",
              },
            ],
          },
          // @ts-ignore
          {
            type: FPAttributeTypes.NESTED_FN,
            label: "v8BreakIterator",
            key: "v8BreakIterator",
            attributes: [
              {
                type: FPAttributeTypes.FN,
                label: "resolvedOptions",
                key: "resolvedOptions",
              },
            ],
          },
        ],
      },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "Notification",
        key: "Notification",
        attributes: [
          // @ts-ignore
          {
            type: FPAttributeTypes.ATTRIBUTE,
            label: "permission",
            key: "permission",
          },
          // @ts-ignore
          {
            type: FPAttributeTypes.ATTRIBUTE,
            label: "maxActions",
            key: "maxActions",
          },
        ],
      },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "InstallTrigger",
        name: "InstallTrigger",
        attributes: [
          { type: FPAttributeTypes.FN, label: "enabled", name: "enabled" },
          {
            type: FPAttributeTypes.FN,
            label: "updateEnabled",
            name: "updateEnabled",
          },
        ],
      },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "Debug",
        name: "Debug",
        attributes: [
          {
            type: FPAttributeTypes.FN,
            label: "debuggerEnabled",
            name: "debuggerEnabled",
          },
          {
            type: FPAttributeTypes.FN,
            label: "setNonUserCodeExceptions",
            name: "setNonUserCodeExceptions",
          },
        ],
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "doNotTrack",
        name: "doNotTrack",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "mozInnerScreenX",
        name: "mozInnerScreenX",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "mozInnerScreenY",
        name: "mozInnerScreenY",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "offscreenBuffering",
        name: "offscreenBuffering",
      },
      {
        type: FPAttributeTypes.SUPPORTS,
        label: "openDatabase",
        name: "openDatabase",
      },
      { type: FPAttributeTypes.SUPPORTS, label: "cashes", name: "cashes" },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "performance",
        key: "performance",
        attributes: [
          {
            type: FPAttributeTypes.ATTRIBUTE,
            label: "jsHeapSizeLimit",
            name: "jsHeapSizeLimit",
          },
        ],
      },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "console",
        key: "console",
        attributes: [
          {
            type: FPAttributeTypes.ATTRIBUTE,
            label: "jsHeapSizeLimit",
            name: "jsHeapSizeLimit",
          },
        ],
      },
      {
        type: FPAttributeTypes.NESTED_ATTRIBUTE,
        label: "menubar",
        key: "menubar",
        attributes: [
          {
            type: FPAttributeTypes.ATTRIBUTE,
            label: "visible",
            name: "visible",
          },
        ],
      },
    ],
  },
  "audio-context": {
    attributes: [
      { type: FPAttributeTypes.ATTRIBUTE, label: "state", key: "state" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "sampleRate",
        key: "sampleRate",
      },
    ],
  },
  "audio-analyser": {
    attributes: [
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "channelCount",
        key: "channelCount",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "channelCountMode",
        key: "channelCountMode",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "channelInterpretation",
        key: "channelInterpretation",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "numberOfInputs",
        key: "numberOfInputs",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "numberOfOutputs",
        key: "numberOfOutputs",
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "fftSize", key: "fftSize" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "frequencyBinCount",
        key: "frequencyBinCount",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "maxDecibels",
        key: "maxDecibels",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "minDecibels",
        key: "minDecibels",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "smoothingTimeConstant",
        key: "smoothingTimeConstant",
      },
    ],
  },
  "audio-destination": {
    attributes: [
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "channelCount",
        key: "channelCount",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "channelCountMode",
        key: "channelCountMode",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "channelInterpretation",
        key: "channelInterpretation",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "maxChannelCount",
        key: "maxChannelCount",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "numberOfInputs",
        key: "numberOfInputs",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "numberOfOutputs",
        key: "numberOfOutputs",
      },
    ],
  },
  "canvas-2D": { attributes: [] },
  "canvas-webGL": {
    attributes: [
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "SHADING_LANGUAGE_VERSION",
        key: "SHADING_LANGUAGE_VERSION",
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "VERSION", key: "VERSION" },
      { type: FPAttributeTypes.ATTRIBUTE, label: "VENDOR", key: "VENDOR" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "RENDERER",
        key: "RENDERER",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "ALIASED_POINT_SIZE_RANGE",
        key: "ALIASED_POINT_SIZE_RANGE",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "ALIASED_LINE_WIDTH_RANGE",
        key: "ALIASED_LINE_WIDTH_RANGE",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "SUBPIXEL_BITS",
        key: "SUBPIXEL_BITS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "SAMPLE_BUFFERS",
        key: "SAMPLE_BUFFERS",
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "SAMPLES", key: "SAMPLES" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "COMPRESSED_TEXTURE_FORMATS",
        key: "COMPRESSED_TEXTURE_FORMATS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "STENCIL_VALUE_MASK",
        key: "STENCIL_VALUE_MASK",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "STENCIL_WRITEMASK",
        key: "STENCIL_WRITEMASK",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "STENCIL_BACK_VALUE_MASK",
        key: "STENCIL_BACK_VALUE_MASK",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "STENCIL_BACK_WRITEMASK",
        key: "STENCIL_BACK_WRITEMASK",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "DEPTH_BITS",
        key: "DEPTH_BITS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "STENCIL_BITS",
        key: "STENCIL_BITS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_VIEWPORT_DIMS",
        key: "MAX_VIEWPORT_DIMS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_VERTEX_UNIFORM_VECTORS",
        key: "MAX_VERTEX_UNIFORM_VECTORS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
        key: "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_FRAGMENT_UNIFORM_VECTORS",
        key: "MAX_FRAGMENT_UNIFORM_VECTORS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_CUBE_MAP_TEXTURE_SIZE",
        key: "MAX_CUBE_MAP_TEXTURE_SIZE",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_TEXTURE_SIZE",
        key: "MAX_TEXTURE_SIZE",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_VARYING_VECTORS",
        key: "MAX_VARYING_VECTORS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_RENDERBUFFER_SIZE",
        key: "MAX_RENDERBUFFER_SIZE",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_TEXTURE_IMAGE_UNITS",
        key: "MAX_TEXTURE_IMAGE_UNITS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_VERTEX_ATTRIBS",
        key: "MAX_VERTEX_ATTRIBS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
        key: "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "IMPLEMENTATION_COLOR_READ_TYPE",
        key: "IMPLEMENTATION_COLOR_READ_TYPE",
      },
      {
        type: FPAttributeTypes.FN,
        label: "getContextAttributes",
        key: "getContextAttributes",
      },
      {
        type: FPAttributeTypes.FN,
        label: "getSupportedExtensions",
        key: "getSupportedExtensions",
      },
    ],
  },
  "canvas-webGL2": {
    attributes: [
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "SHADING_LANGUAGE_VERSION",
        key: "SHADING_LANGUAGE_VERSION",
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "VERSION", key: "VERSION" },
      { type: FPAttributeTypes.ATTRIBUTE, label: "VENDOR", key: "VENDOR" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "RENDERER",
        key: "RENDERER",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "ALIASED_POINT_SIZE_RANGE",
        key: "ALIASED_POINT_SIZE_RANGE",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "ALIASED_LINE_WIDTH_RANGE",
        key: "ALIASED_LINE_WIDTH_RANGE",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "SUBPIXEL_BITS",
        key: "SUBPIXEL_BITS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "SAMPLE_BUFFERS",
        key: "SAMPLE_BUFFERS",
      },
      { type: FPAttributeTypes.ATTRIBUTE, label: "SAMPLES", key: "SAMPLES" },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "COMPRESSED_TEXTURE_FORMATS",
        key: "COMPRESSED_TEXTURE_FORMATS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "STENCIL_VALUE_MASK",
        key: "STENCIL_VALUE_MASK",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "STENCIL_WRITEMASK",
        key: "STENCIL_WRITEMASK",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "STENCIL_BACK_VALUE_MASK",
        key: "STENCIL_BACK_VALUE_MASK",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "STENCIL_BACK_WRITEMASK",
        key: "STENCIL_BACK_WRITEMASK",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "DEPTH_BITS",
        key: "DEPTH_BITS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "STENCIL_BITS",
        key: "STENCIL_BITS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_VIEWPORT_DIMS",
        key: "MAX_VIEWPORT_DIMS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_VERTEX_UNIFORM_VECTORS",
        key: "MAX_VERTEX_UNIFORM_VECTORS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
        key: "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_FRAGMENT_UNIFORM_VECTORS",
        key: "MAX_FRAGMENT_UNIFORM_VECTORS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_CUBE_MAP_TEXTURE_SIZE",
        key: "MAX_CUBE_MAP_TEXTURE_SIZE",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_TEXTURE_SIZE",
        key: "MAX_TEXTURE_SIZE",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_VARYING_VECTORS",
        key: "MAX_VARYING_VECTORS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_RENDERBUFFER_SIZE",
        key: "MAX_RENDERBUFFER_SIZE",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_TEXTURE_IMAGE_UNITS",
        key: "MAX_TEXTURE_IMAGE_UNITS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_VERTEX_ATTRIBS",
        key: "MAX_VERTEX_ATTRIBS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
        key: "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
      },
      {
        type: FPAttributeTypes.ATTRIBUTE,
        label: "IMPLEMENTATION_COLOR_READ_TYPE",
        key: "IMPLEMENTATION_COLOR_READ_TYPE",
      },
      {
        type: FPAttributeTypes.FN,
        label: "getContextAttributes",
        key: "getContextAttributes",
      },
      {
        type: FPAttributeTypes.FN,
        label: "getSupportedExtensions",
        key: "getSupportedExtensions",
      },
    ],
  },
  date: {
    attributes: [
      {
        type: FPAttributeTypes.NESTED_CLASS,
        label: "Date",
        key: "Date",
        callParameters: [2016, 1, 1],
        attributes: [
          {
            type: FPAttributeTypes.FN,
            label: "getTimezoneOffset",
            key: "getTimezoneOffset",
          },
        ],
      },
      {
        type: FPAttributeTypes.NESTED_CLASS,
        label: "Date",
        key: "Date",
        callParameters: [2016, 1, 6],
        attributes: [
          {
            type: FPAttributeTypes.FN,
            label: "getTimezoneOffset",
            key: "getTimezoneOffset",
          },
        ],
      },
      {
        type: FPAttributeTypes.CLASS,
        label: "Date",
        key: "Date",
        callParameters: [0],
      },
      {
        type: FPAttributeTypes.CLASS,
        label: "Date",
        key: "Date",
        callParameters: ["0001-1-1"],
      },
      {
        type: FPAttributeTypes.NESTED_CLASS,
        label: "Date",
        key: "Date",
        callParameters: [0],
        attributes: [
          {
            type: FPAttributeTypes.FN,
            label: "setFullYear",
            key: "setFullYear",
            callParameters: [0],
          },
        ],
      },
    ],
  },
};

export default fpCreationAttributes;
