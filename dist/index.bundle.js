/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*__wc__loader*/

(function() {
  'use strict';

  const userPolymer = window.Polymer;

  /**
   * @namespace Polymer
   * @summary Polymer is a lightweight library built on top of the web
   *   standards-based Web Components API's, and makes it easy to build your
   *   own custom HTML elements.
   * @param {!PolymerInit} info Prototype for the custom element. It must contain
   *   an `is` property to specify the element name. Other properties populate
   *   the element prototype. The `properties`, `observers`, `hostAttributes`,
   *   and `listeners` properties are processed to create element features.
   * @return {!Object} Returns a custom element class for the given provided
   *   prototype `info` object. The name of the element if given by `info.is`.
   */
  window.Polymer = function(info) {
    return window.Polymer._polymerFn(info);
  }

  // support user settings on the Polymer object
  if (userPolymer) {
    Object.assign(Polymer, userPolymer);
  }

  // To be plugged by legacy implementation if loaded
  /* eslint-disable valid-jsdoc */
  /**
   * @param {!PolymerInit} info Prototype for the custom element. It must contain
   *   an `is` property to specify the element name. Other properties populate
   *   the element prototype. The `properties`, `observers`, `hostAttributes`,
   *   and `listeners` properties are processed to create element features.
   * @return {!Object} Returns a custom element class for the given provided
   *   prototype `info` object. The name of the element if given by `info.is`.
   */
  window.Polymer._polymerFn = function(info) { // eslint-disable-line no-unused-vars
    throw new Error('Load polymer.html to use the Polymer() function.');
  }
  /* eslint-enable */

  window.Polymer.version = '2.0.1';

  /* eslint-disable no-unused-vars */
  /*
  When using Closure Compiler, JSCompiler_renameProperty(property, object) is replaced by the munged name for object[property]
  We cannot alias this function, so we have to use a small shim that has the same behavior when not compiling.
  */
  window.JSCompiler_renameProperty = function(prop, obj) {
    return prop;
  }
  /* eslint-enable */

})();



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);



(function() {

  'use strict';

  // unique global id for deduping mixins.
  let dedupeId = 0;

  /**
   * @constructor
   * @extends {Function}
   */
  function MixinFunction(){}
  /** @type {(WeakMap | undefined)} */
  MixinFunction.prototype.__mixinApplications;
  /** @type {(Object | undefined)} */
  MixinFunction.prototype.__mixinSet;

  /* eslint-disable valid-jsdoc */
  /**
   * Wraps an ES6 class expression mixin such that the mixin is only applied
   * if it has not already been applied its base argument.  Also memoizes mixin
   * applications.
   *
   * @memberof Polymer
   * @template T
   * @param {T} mixin ES6 class expression mixin to wrap
   * @suppress {invalidCasts}
   */
  Polymer.dedupingMixin = function(mixin) {
    let mixinApplications = /** @type {!MixinFunction} */(mixin).__mixinApplications;
    if (!mixinApplications) {
      mixinApplications = new WeakMap();
      /** @type {!MixinFunction} */(mixin).__mixinApplications = mixinApplications;
    }
    // maintain a unique id for each mixin
    let mixinDedupeId = dedupeId++;
    function dedupingMixin(base) {
      let baseSet = /** @type {!MixinFunction} */(base).__mixinSet;
      if (baseSet && baseSet[mixinDedupeId]) {
        return base;
      }
      let map = mixinApplications;
      let extended = map.get(base);
      if (!extended) {
        extended = /** @type {!Function} */(mixin)(base);
        map.set(base, extended);
      }
      // copy inherited mixin set from the extended class, or the base class
      // NOTE: we avoid use of Set here because some browser (IE11)
      // cannot extend a base Set via the constructor.
      let mixinSet = Object.create(/** @type {!MixinFunction} */(extended).__mixinSet || baseSet || null);
      mixinSet[mixinDedupeId] = true;
      /** @type {!MixinFunction} */(extended).__mixinSet = mixinSet;
      return extended;
    }

    return dedupingMixin;
  };
  /* eslint-enable valid-jsdoc */

})();




/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	try {
		if (typeof eval !== "undefined") {
			eval.call(null, src);
		} else if (typeof execScript !== "undefined") {
			execScript(src);
		} else {
			console.error("[Script Loader] EvalError: No eval function available");
		}
	} catch (error) {
		console.error("[Script Loader] ", error.message);
	}
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);



  (function() {
    'use strict';

    let CSS_URL_RX = /(url\()([^)]*)(\))/g;
    let ABS_URL = /(^\/)|(^#)|(^[\w-\d]*:)/;
    let workingURL;
    let resolveDoc;
    /**
     * Resolves the given URL against the provided `baseUri'.
     *
     * @memberof Polymer.ResolveUrl
     * @param {string} url Input URL to resolve
     * @param {?string=} baseURI Base URI to resolve the URL against
     * @return {string} resolved URL
     */
    function resolveUrl(url, baseURI) {
      if (url && ABS_URL.test(url)) {
        return url;
      }
      // Lazy feature detection.
      if (workingURL === undefined) {
        workingURL = false;
        try {
          const u = new URL('b', 'http://a');
          u.pathname = 'c%20d';
          workingURL = (u.href === 'http://a/c%20d');
        } catch (e) {
          // silently fail
        }
      }
      if (!baseURI) {
        baseURI = document.baseURI || window.location.href;
      }
      if (workingURL) {
        return (new URL(url, baseURI)).href;
      }
      // Fallback to creating an anchor into a disconnected document.
      if (!resolveDoc) {
        resolveDoc = document.implementation.createHTMLDocument('temp');
        resolveDoc.base = resolveDoc.createElement('base');
        resolveDoc.head.appendChild(resolveDoc.base);
        resolveDoc.anchor = resolveDoc.createElement('a');
        resolveDoc.body.appendChild(resolveDoc.anchor);
      }
      resolveDoc.base.href = baseURI;
      resolveDoc.anchor.href = url;
      return resolveDoc.anchor.href || url;

    }

    /**
     * Resolves any relative URL's in the given CSS text against the provided
     * `ownerDocument`'s `baseURI`.
     *
     * @memberof Polymer.ResolveUrl
     * @param {string} cssText CSS text to process
     * @param {string} baseURI Base URI to resolve the URL against
     * @return {string} Processed CSS text with resolved URL's
     */
    function resolveCss(cssText, baseURI) {
      return cssText.replace(CSS_URL_RX, function(m, pre, url, post) {
        return pre + '\'' +
          resolveUrl(url.replace(/["']/g, ''), baseURI) +
          '\'' + post;
      });
    }

    /**
     * Returns a path from a given `url`. The path includes the trailing
     * `/` from the url.
     *
     * @memberof Polymer.ResolveUrl
     * @param {string} url Input URL to transform
     * @return {string} resolved path
     */
    function pathFromUrl(url) {
      return url.substring(0, url.lastIndexOf('/') + 1);
    }

    /**
     * Module with utilities for resolving relative URL's.
     *
     * @namespace
     * @memberof Polymer
     * @summary Module with utilities for resolving relative URL's.
     */
    Polymer.ResolveUrl = {
      resolveCss: resolveCss,
      resolveUrl: resolveUrl,
      pathFromUrl: pathFromUrl
    };

  })();




/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);


(function() {
  'use strict';

  const caseMap = {};
  const DASH_TO_CAMEL = /-[a-z]/g;
  const CAMEL_TO_DASH = /([A-Z])/g;

  /**
   * Module with utilities for converting between "dash-case" and "camelCase"
   * identifiers.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module that provides utilities for converting between "dash-case"
   *   and "camelCase".
   */
  const CaseMap = {

    /**
     * Converts "dash-case" identifier (e.g. `foo-bar-baz`) to "camelCase"
     * (e.g. `fooBarBaz`).
     *
     * @memberof Polymer.CaseMap
     * @param {string} dash Dash-case identifier
     * @return {string} Camel-case representation of the identifier
     */
    dashToCamelCase(dash) {
      return caseMap[dash] || (
        caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL,
          (m) => m[1].toUpperCase()
        )
      );
    },

    /**
     * Converts "camelCase" identifier (e.g. `fooBarBaz`) to "dash-case"
     * (e.g. `foo-bar-baz`).
     *
     * @memberof Polymer.CaseMap
     * @param {string} camel Camel-case identifier
     * @return {string} Dash-case representation of the identifier
     */
    camelToDashCase(camel) {
      return caseMap[camel] || (
        caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase()
      );
    }

  };

  Polymer.CaseMap = CaseMap;
})();



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(20);


(function() {
  'use strict';

  /**
   * Base class that provides the core API for Polymer's meta-programming
   * features including template stamping, data-binding, attribute deserialization,
   * and property change observation.
   *
   * @customElement
   * @polymer
   * @memberof Polymer
   * @constructor
   * @implements {Polymer_ElementMixin}
   * @extends HTMLElement
   * @appliesMixin Polymer.ElementMixin
   * @summary Custom element base class that provides the core API for Polymer's
   *   key meta-programming features including template stamping, data-binding,
   *   attribute deserialization, and property change observation
   */
  const Element = Polymer.ElementMixin(HTMLElement);
  /**
   * @constructor
   * @implements {Polymer_ElementMixin}
   * @extends {HTMLElement}
   */
  Polymer.Element = Element;
})();



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(1);

__webpack_require__(24);

__webpack_require__(4);

__webpack_require__(25);

__webpack_require__(26);


(function() {

  'use strict';

  /** @const {Object} */
  const CaseMap = Polymer.CaseMap;

  // Monotonically increasing unique ID used for de-duping effects triggered
  // from multiple properties in the same turn
  let dedupeId = 0;

  /**
   * Property effect types; effects are stored on the prototype using these keys
   * @enum {string}
   */
  const TYPES = {
    COMPUTE: '__computeEffects',
    REFLECT: '__reflectEffects',
    NOTIFY: '__notifyEffects',
    PROPAGATE: '__propagateEffects',
    OBSERVE: '__observeEffects',
    READ_ONLY: '__readOnly'
  }

  /**
   * @typedef {{
   * name: (string | undefined),
   * structured: (boolean | undefined),
   * wildcard: (boolean | undefined)
   * }}
   */
  let DataTrigger; //eslint-disable-line no-unused-vars

  /**
   * @typedef {{
   * info: ?,
   * trigger: (!DataTrigger | undefined),
   * fn: (!Function | undefined)
   * }}
   */
  let DataEffect; //eslint-disable-line no-unused-vars

  let PropertyEffectsType; //eslint-disable-line no-unused-vars

  /**
   * Ensures that the model has an own-property map of effects for the given type.
   * The model may be a prototype or an instance.
   *
   * Property effects are stored as arrays of effects by property in a map,
   * by named type on the model. e.g.
   *
   *   __computeEffects: {
   *     foo: [ ... ],
   *     bar: [ ... ]
   *   }
   *
   * If the model does not yet have an effect map for the type, one is created
   * and returned.  If it does, but it is not an own property (i.e. the
   * prototype had effects), the the map is deeply cloned and the copy is
   * set on the model and returned, ready for new effects to be added.
   *
   * @param {Object} model Prototype or instance
   * @param {string} type Property effect type
   * @return {Object} The own-property map of effects for the given type
   * @private
   */
  function ensureOwnEffectMap(model, type) {
    let effects = model[type];
    if (!effects) {
      effects = model[type] = {};
    } else if (!model.hasOwnProperty(type)) {
      effects = model[type] = Object.create(model[type]);
      for (let p in effects) {
        let protoFx = effects[p];
        let instFx = effects[p] = Array(protoFx.length);
        for (let i=0; i<protoFx.length; i++) {
          instFx[i] = protoFx[i];
        }
      }
    }
    return effects;
  }

  // -- effects ----------------------------------------------

  /**
   * Runs all effects of a given type for the given set of property changes
   * on an instance.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} effects Object map of property-to-Array of effects
   * @param {Object} props Bag of current property changes
   * @param {Object=} oldProps Bag of previous values for changed properties
   * @param {boolean=} hasPaths True with `props` contains one or more paths
   * @param {*=} extraArgs Additional metadata to pass to effect function
   * @return {boolean} True if an effect ran for this property
   * @private
   */
  function runEffects(inst, effects, props, oldProps, hasPaths, extraArgs) {
    if (effects) {
      let ran = false;
      let id = dedupeId++;
      for (let prop in props) {
        if (runEffectsForProperty(inst, effects, id, prop, props, oldProps, hasPaths, extraArgs)) {
          ran = true;
        }
      }
      return ran;
    }
    return false;
  }

  /**
   * Runs a list of effects for a given property.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} effects Object map of property-to-Array of effects
   * @param {number} dedupeId Counter used for de-duping effects
   * @param {string} prop Name of changed property
   * @param {*} props Changed properties
   * @param {*} oldProps Old properties
   * @param {boolean=} hasPaths True with `props` contains one or more paths
   * @param {*=} extraArgs Additional metadata to pass to effect function
   * @return {boolean} True if an effect ran for this property
   * @private
   */
  function runEffectsForProperty(inst, effects, dedupeId, prop, props, oldProps, hasPaths, extraArgs) {
    let ran = false;
    let rootProperty = hasPaths ? Polymer.Path.root(prop) : prop;
    let fxs = effects[rootProperty];
    if (fxs) {
      for (let i=0, l=fxs.length, fx; (i<l) && (fx=fxs[i]); i++) {
        if ((!fx.info || fx.info.lastRun !== dedupeId) &&
            (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
          if (fx.info) {
            fx.info.lastRun = dedupeId;
          }
          fx.fn(inst, prop, props, oldProps, fx.info, hasPaths, extraArgs);
          ran = true;
        }
      }
    }
    return ran;
  }

  /**
   * Determines whether a property/path that has changed matches the trigger
   * criteria for an effect.  A trigger is a descriptor with the following
   * structure, which matches the descriptors returned from `parseArg`.
   * e.g. for `foo.bar.*`:
   * ```
   * trigger: {
   *   name: 'a.b',
   *   structured: true,
   *   wildcard: true
   * }
   * ```
   * If no trigger is given, the path is deemed to match.
   *
   * @param {string} path Path or property that changed
   * @param {DataTrigger} trigger Descriptor
   * @return {boolean} Whether the path matched the trigger
   */
  function pathMatchesTrigger(path, trigger) {
    if (trigger) {
      let triggerPath = trigger.name;
      return (triggerPath == path) ||
        (trigger.structured && Polymer.Path.isAncestor(triggerPath, path)) ||
        (trigger.wildcard && Polymer.Path.isDescendant(triggerPath, path));
    } else {
      return true;
    }
  }

  /**
   * Implements the "observer" effect.
   *
   * Calls the method with `info.methodName` on the instance, passing the
   * new and old values.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runObserverEffect(inst, property, props, oldProps, info) {
    let fn = inst[info.methodName];
    let changedProp = info.property;
    if (fn) {
      fn.call(inst, inst.__data[changedProp], oldProps[changedProp]);
    } else if (!info.dynamicFn) {
      console.warn('observer method `' + info.methodName + '` not defined');
    }
  }

  /**
   * Runs "notify" effects for a set of changed properties.
   *
   * This method differs from the generic `runEffects` method in that it
   * will dispatch path notification events in the case that the property
   * changed was a path and the root property for that path didn't have a
   * "notify" effect.  This is to maintain 1.0 behavior that did not require
   * `notify: true` to ensure object sub-property notifications were
   * sent.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} notifyProps Bag of properties to notify
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runNotifyEffects(inst, notifyProps, props, oldProps, hasPaths) {
    // Notify
    let fxs = inst[TYPES.NOTIFY];
    let notified;
    let id = dedupeId++;
    // Try normal notify effects; if none, fall back to try path notification
    for (let prop in notifyProps) {
      if (notifyProps[prop]) {
        if (fxs && runEffectsForProperty(inst, fxs, id, prop, props, oldProps, hasPaths)) {
          notified = true;
        } else if (hasPaths && notifyPath(inst, prop, props)) {
          notified = true;
        }
      }
    }
    // Flush host if we actually notified and host was batching
    // And the host has already initialized clients; this prevents
    // an issue with a host observing data changes before clients are ready.
    let host;
    if (notified && (host = inst.__dataHost) && host._invalidateProperties) {
      host._invalidateProperties();
    }
  }

  /**
   * Dispatches {property}-changed events with path information in the detail
   * object to indicate a sub-path of the property was changed.
   *
   * @param {!PropertyEffectsType} inst The element from which to fire the event
   * @param {string} path The path that was changed
   * @param {Object} props Bag of current property changes
   * @return {boolean} Returns true if the path was notified
   * @private
   */
  function notifyPath(inst, path, props) {
    let rootProperty = Polymer.Path.root(path);
    if (rootProperty !== path) {
      let eventName = Polymer.CaseMap.camelToDashCase(rootProperty) + '-changed';
      dispatchNotifyEvent(inst, eventName, props[path], path);
      return true;
    }
    return false;
  }

  /**
   * Dispatches {property}-changed events to indicate a property (or path)
   * changed.
   *
   * @param {!PropertyEffectsType} inst The element from which to fire the event
   * @param {string} eventName The name of the event to send ('{property}-changed')
   * @param {*} value The value of the changed property
   * @param {string | null | undefined} path If a sub-path of this property changed, the path
   *   that changed (optional).
   * @private
   * @suppress {invalidCasts}
   */
  function dispatchNotifyEvent(inst, eventName, value, path) {
    let detail = {
      value: value,
      queueProperty: true
    };
    if (path) {
      detail.path = path;
    }
    /** @type {!HTMLElement} */(inst).dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  /**
   * Implements the "notify" effect.
   *
   * Dispatches a non-bubbling event named `info.eventName` on the instance
   * with a detail object containing the new `value`.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runNotifyEffect(inst, property, props, oldProps, info, hasPaths) {
    let rootProperty = hasPaths ? Polymer.Path.root(property) : property;
    let path = rootProperty != property ? property : null;
    let value = path ? Polymer.Path.get(inst, path) : inst.__data[property];
    if (path && value === undefined) {
      value = props[property];  // specifically for .splices
    }
    dispatchNotifyEvent(inst, info.eventName, value, path);
  }

  /**
   * Handler function for 2-way notification events. Receives context
   * information captured in the `addNotifyListener` closure from the
   * `__notifyListeners` metadata.
   *
   * Sets the value of the notified property to the host property or path.  If
   * the event contained path information, translate that path to the host
   * scope's name for that path first.
   *
   * @param {CustomEvent} event Notification event (e.g. '<property>-changed')
   * @param {!PropertyEffectsType} inst Host element instance handling the notification event
   * @param {string} fromProp Child element property that was bound
   * @param {string} toPath Host property/path that was bound
   * @param {boolean} negate Whether the binding was negated
   * @private
   */
  function handleNotification(event, inst, fromProp, toPath, negate) {
    let value;
    let detail = /** @type {Object} */(event.detail);
    let fromPath = detail && detail.path;
    if (fromPath) {
      toPath = Polymer.Path.translate(fromProp, toPath, fromPath);
      value = detail && detail.value;
    } else {
      value = event.target[fromProp];
    }
    value = negate ? !value : value;
    if (!inst[TYPES.READ_ONLY] || !inst[TYPES.READ_ONLY][toPath]) {
      if (inst._setPendingPropertyOrPath(toPath, value, true, Boolean(fromPath))
        && (!detail || !detail.queueProperty)) {
        inst._invalidateProperties();
      }
    }
  }

  /**
   * Implements the "reflect" effect.
   *
   * Sets the attribute named `info.attrName` to the given property value.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runReflectEffect(inst, property, props, oldProps, info) {
    let value = inst.__data[property];
    if (Polymer.sanitizeDOMValue) {
      value = Polymer.sanitizeDOMValue(value, info.attrName, 'attribute', /** @type {Node} */(inst));
    }
    inst._propertyToAttribute(property, info.attrName, value);
  }

  /**
   * Runs "computed" effects for a set of changed properties.
   *
   * This method differs from the generic `runEffects` method in that it
   * continues to run computed effects based on the output of each pass until
   * there are no more newly computed properties.  This ensures that all
   * properties that will be computed by the initial set of changes are
   * computed before other effects (binding propagation, observers, and notify)
   * run.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {!Object} changedProps Bag of changed properties
   * @param {!Object} oldProps Bag of previous values for changed properties
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runComputedEffects(inst, changedProps, oldProps, hasPaths) {
    let computeEffects = inst[TYPES.COMPUTE];
    if (computeEffects) {
      let inputProps = changedProps;
      while (runEffects(inst, computeEffects, inputProps, oldProps, hasPaths)) {
        Object.assign(oldProps, inst.__dataOld);
        Object.assign(changedProps, inst.__dataPending);
        inputProps = inst.__dataPending;
        inst.__dataPending = null;
      }
    }
  }

  /**
   * Implements the "computed property" effect by running the method with the
   * values of the arguments specified in the `info` object and setting the
   * return value to the computed property specified.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runComputedEffect(inst, property, props, oldProps, info) {
    let result = runMethodEffect(inst, property, props, oldProps, info);
    let computedProp = info.methodInfo;
    if (inst.__dataHasAccessor && inst.__dataHasAccessor[computedProp]) {
      inst._setPendingProperty(computedProp, result, true);
    } else {
      inst[computedProp] = result;
    }
  }

  /**
   * Computes path changes based on path links set up using the `linkPaths`
   * API.
   *
   * @param {!PropertyEffectsType} inst The instance whose props are changing
   * @param {string | !Array<(string|number)>} path Path that has changed
   * @param {*} value Value of changed path
   * @private
   */
  function computeLinkedPaths(inst, path, value) {
    let links = inst.__dataLinkedPaths;
    if (links) {
      let link;
      for (let a in links) {
        let b = links[a];
        if (Polymer.Path.isDescendant(a, path)) {
          link = Polymer.Path.translate(a, b, path);
          inst._setPendingPropertyOrPath(link, value, true, true);
        } else if (Polymer.Path.isDescendant(b, path)) {
          link = Polymer.Path.translate(b, a, path);
          inst._setPendingPropertyOrPath(link, value, true, true);
        }
      }
    }
  }

  // -- bindings ----------------------------------------------

  /**
   * Adds binding metadata to the current `nodeInfo`, and binding effects
   * for all part dependencies to `templateInfo`.
   *
   * @param {Function} constructor Class that `_parseTemplate` is currently
   *   running on
   * @param {TemplateInfo} templateInfo Template metadata for current template
   * @param {NodeInfo} nodeInfo Node metadata for current template node
   * @param {string} kind Binding kind, either 'property', 'attribute', or 'text'
   * @param {string} target Target property name
   * @param {!Array<!BindingPart>} parts Array of binding part metadata
   * @param {string=} literal Literal text surrounding binding parts (specified
   *   only for 'property' bindings, since these must be initialized as part
   *   of boot-up)
   * @private
   */
  function addBinding(constructor, templateInfo, nodeInfo, kind, target, parts, literal) {
    // Create binding metadata and add to nodeInfo
    nodeInfo.bindings = nodeInfo.bindings || [];
    let /** Binding */ binding = { kind, target, parts, literal, isCompound: (parts.length !== 1) };
    nodeInfo.bindings.push(binding);
    // Add listener info to binding metadata
    if (shouldAddListener(binding)) {
      let {event, negate} = binding.parts[0];
      binding.listenerEvent = event || (CaseMap.camelToDashCase(target) + '-changed');
      binding.listenerNegate = negate;
    }
    // Add "propagate" property effects to templateInfo
    let index = templateInfo.nodeInfoList.length;
    for (let i=0; i<binding.parts.length; i++) {
      let part = binding.parts[i];
      part.compoundIndex = i;
      addEffectForBindingPart(constructor, templateInfo, binding, part, index);
    }
  }

  /**
   * Adds property effects to the given `templateInfo` for the given binding
   * part.
   *
   * @param {Function} constructor Class that `_parseTemplate` is currently
   *   running on
   * @param {TemplateInfo} templateInfo Template metadata for current template
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @param {number} index Index into `nodeInfoList` for this node
   */
  function addEffectForBindingPart(constructor, templateInfo, binding, part, index) {
    if (!part.literal) {
      if (binding.kind === 'attribute' && binding.target[0] === '-') {
        console.warn('Cannot set attribute ' + binding.target +
          ' because "-" is not a valid attribute starting character');
      } else {
        let dependencies = part.dependencies;
        let info = { index, binding, part, evaluator: constructor };
        for (let j=0; j<dependencies.length; j++) {
          let trigger = dependencies[j];
          if (typeof trigger == 'string') {
            trigger = parseArg(trigger);
            trigger.wildcard = true;
          }
          constructor._addTemplatePropertyEffect(templateInfo, trigger.rootProperty, {
            fn: runBindingEffect,
            info, trigger
          });
        }
      }
    }
  }

  /**
   * Implements the "binding" (property/path binding) effect.
   *
   * Note that binding syntax is overridable via `_parseBindings` and
   * `_evaluateBinding`.  This method will call `_evaluateBinding` for any
   * non-literal parts returned from `_parseBindings`.  However,
   * there is no support for _path_ bindings via custom binding parts,
   * as this is specific to Polymer's path binding syntax.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} path Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @param {Array} nodeList List of nodes associated with `nodeInfoList` template
   *   metadata
   * @private
   */
  function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
    let node = nodeList[info.index];
    let binding = info.binding;
    let part = info.part;
    // Subpath notification: transform path and set to client
    // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
    if (hasPaths && part.source && (path.length > part.source.length) &&
        (binding.kind == 'property') && !binding.isCompound &&
        node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
      let value = props[path];
      path = Polymer.Path.translate(part.source, binding.target, path);
      if (node._setPendingPropertyOrPath(path, value, false, true)) {
        inst._enqueueClient(node);
      }
    } else {
      let value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths);
      // Propagate value to child
      applyBindingValue(inst, node, binding, part, value);
    }
  }

  /**
   * Sets the value for an "binding" (binding) effect to a node,
   * either as a property or attribute.
   *
   * @param {!PropertyEffectsType} inst The instance owning the binding effect
   * @param {Node} node Target node for binding
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @param {*} value Value to set
   * @private
   */
  function applyBindingValue(inst, node, binding, part, value) {
    value = computeBindingValue(node, value, binding, part);
    if (Polymer.sanitizeDOMValue) {
      value = Polymer.sanitizeDOMValue(value, binding.target, binding.kind, node);
    }
    if (binding.kind == 'attribute') {
      // Attribute binding
      inst._valueToNodeAttribute(/** @type {Element} */(node), value, binding.target);
    } else {
      // Property binding
      let prop = binding.target;
      if (node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
        if (!node[TYPES.READ_ONLY] || !node[TYPES.READ_ONLY][prop]) {
          if (node._setPendingProperty(prop, value)) {
            inst._enqueueClient(node);
          }
        }
      } else  {
        inst._setUnmanagedPropertyToNode(node, prop, value);
      }
    }
  }

  /**
   * Transforms an "binding" effect value based on compound & negation
   * effect metadata, as well as handling for special-case properties
   *
   * @param {Node} node Node the value will be set to
   * @param {*} value Value to set
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @return {*} Transformed value to set
   * @private
   */
  function computeBindingValue(node, value, binding, part) {
    if (binding.isCompound) {
      let storage = node.__dataCompoundStorage[binding.target];
      storage[part.compoundIndex] = value;
      value = storage.join('');
    }
    if (binding.kind !== 'attribute') {
      // Some browsers serialize `undefined` to `"undefined"`
      if (binding.target === 'textContent' ||
          (node.localName == 'input' && binding.target == 'value')) {
        value = value == undefined ? '' : value;
      }
    }
    return value;
  }

  /**
   * Returns true if a binding's metadata meets all the requirements to allow
   * 2-way binding, and therefore a `<property>-changed` event listener should be
   * added:
   * - used curly braces
   * - is a property (not attribute) binding
   * - is not a textContent binding
   * - is not compound
   *
   * @param {!Binding} binding Binding metadata
   * @return {boolean} True if 2-way listener should be added
   * @private
   */
  function shouldAddListener(binding) {
    return Boolean(binding.target) &&
           binding.kind != 'attribute' &&
           binding.kind != 'text' &&
           !binding.isCompound &&
           binding.parts[0].mode === '{';
  }

  /**
   * Setup compound binding storage structures, notify listeners, and dataHost
   * references onto the bound nodeList.
   *
   * @param {!PropertyEffectsType} inst Instance that bas been previously bound
   * @param {TemplateInfo} templateInfo Template metadata
   * @private
   */
  function setupBindings(inst, templateInfo) {
    // Setup compound storage, dataHost, and notify listeners
    let {nodeList, nodeInfoList} = templateInfo;
    if (nodeInfoList.length) {
      for (let i=0; i < nodeInfoList.length; i++) {
        let info = nodeInfoList[i];
        let node = nodeList[i];
        let bindings = info.bindings;
        if (bindings) {
          for (let i=0; i<bindings.length; i++) {
            let binding = bindings[i];
            setupCompoundStorage(node, binding);
            addNotifyListener(node, inst, binding);
          }
        }
        node.__dataHost = inst;
      }
    }
  }

  /**
   * Initializes `__dataCompoundStorage` local storage on a bound node with
   * initial literal data for compound bindings, and sets the joined
   * literal parts to the bound property.
   *
   * When changes to compound parts occur, they are first set into the compound
   * storage array for that property, and then the array is joined to result in
   * the final value set to the property/attribute.
   *
   * @param {Node} node Bound node to initialize
   * @param {Binding} binding Binding metadata
   * @private
   */
  function setupCompoundStorage(node, binding) {
    if (binding.isCompound) {
      // Create compound storage map
      let storage = node.__dataCompoundStorage ||
        (node.__dataCompoundStorage = {});
      let parts = binding.parts;
      // Copy literals from parts into storage for this binding
      let literals = new Array(parts.length);
      for (let j=0; j<parts.length; j++) {
        literals[j] = parts[j].literal;
      }
      let target = binding.target;
      storage[target] = literals;
      // Configure properties with their literal parts
      if (binding.literal && binding.kind == 'property') {
        node[target] = binding.literal;
      }
    }
  }

  /**
   * Adds a 2-way binding notification event listener to the node specified
   *
   * @param {Object} node Child element to add listener to
   * @param {!PropertyEffectsType} inst Host element instance to handle notification event
   * @param {Binding} binding Binding metadata
   * @private
   */
  function addNotifyListener(node, inst, binding) {
    if (binding.listenerEvent) {
      let part = binding.parts[0];
      node.addEventListener(binding.listenerEvent, function(e) {
        handleNotification(e, inst, binding.target, part.source, part.negate);
      });
    }
  }

  // -- for method-based effects (complexObserver & computed) --------------

  /**
   * Adds property effects for each argument in the method signature (and
   * optionally, for the method name if `dynamic` is true) that calls the
   * provided effect function.
   *
   * @param {Element | Object} model Prototype or instance
   * @param {!MethodSignature} sig Method signature metadata
   * @param {string} type Type of property effect to add
   * @param {Function} effectFn Function to run when arguments change
   * @param {*=} methodInfo Effect-specific information to be included in
   *   method effect metadata
   * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
   *   method names should be included as a dependency to the effect. Note,
   *   defaults to true if the signature is static (sig.static is true).
   * @private
   */
  function createMethodEffect(model, sig, type, effectFn, methodInfo, dynamicFn) {
    dynamicFn = sig.static || (dynamicFn &&
      (typeof dynamicFn !== 'object' || dynamicFn[sig.methodName]));
    let info = {
      methodName: sig.methodName,
      args: sig.args,
      methodInfo,
      dynamicFn
    };
    for (let i=0, arg; (i<sig.args.length) && (arg=sig.args[i]); i++) {
      if (!arg.literal) {
        model._addPropertyEffect(arg.rootProperty, type, {
          fn: effectFn, info: info, trigger: arg
        });
      }
    }
    if (dynamicFn) {
      model._addPropertyEffect(sig.methodName, type, {
        fn: effectFn, info: info
      });
    }
  }

  /**
   * Calls a method with arguments marshaled from properties on the instance
   * based on the method signature contained in the effect metadata.
   *
   * Multi-property observers, computed properties, and inline computing
   * functions call this function to invoke the method, then use the return
   * value accordingly.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @return {*} Returns the return value from the method invocation
   * @private
   */
  function runMethodEffect(inst, property, props, oldProps, info) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    let context = inst._methodHost || inst;
    let fn = context[info.methodName];
    if (fn) {
      let args = marshalArgs(inst.__data, info.args, property, props);
      return fn.apply(context, args);
    } else if (!info.dynamicFn) {
      console.warn('method `' + info.methodName + '` not defined');
    }
  }

  const emptyArray = [];

  // Regular expressions used for binding
  const IDENT  = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
  const NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
  const SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
  const DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
  const STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
  const ARGUMENT = '(?:(' + IDENT + '|' + NUMBER + '|' +  STRING + ')\\s*' + ')';
  const ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
  const ARGUMENT_LIST = '(?:' + '\\(\\s*' +
                                '(?:' + ARGUMENTS + '?' + ')' +
                              '\\)\\s*' + ')';
  const BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3
  const OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
  const CLOSE_BRACKET = '(?:]]|}})';
  const NEGATE = '(?:(!)\\s*)?'; // Group 2
  const EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
  const bindingRegex = new RegExp(EXPRESSION, "g");

  /**
   * Create a string from binding parts of all the literal parts
   *
   * @param {!Array<BindingPart>} parts All parts to stringify
   * @return {string} String made from the literal parts
   */
  function literalFromParts(parts) {
    let s = '';
    for (let i=0; i<parts.length; i++) {
      let literal = parts[i].literal;
      s += literal || '';
    }
    return s;
  }

  /**
   * Parses an expression string for a method signature, and returns a metadata
   * describing the method in terms of `methodName`, `static` (whether all the
   * arguments are literals), and an array of `args`
   *
   * @param {string} expression The expression to parse
   * @return {?MethodSignature} The method metadata object if a method expression was
   *   found, otherwise `undefined`
   * @private
   */
  function parseMethod(expression) {
    // tries to match valid javascript property names
    let m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);
    if (m) {
      let methodName = m[1];
      let sig = { methodName, static: true, args: emptyArray };
      if (m[2].trim()) {
        // replace escaped commas with comma entity, split on un-escaped commas
        let args = m[2].replace(/\\,/g, '&comma;').split(',');
        return parseArgs(args, sig);
      } else {
        return sig;
      }
    }
    return null;
  }

  /**
   * Parses an array of arguments and sets the `args` property of the supplied
   * signature metadata object. Sets the `static` property to false if any
   * argument is a non-literal.
   *
   * @param {!Array<string>} argList Array of argument names
   * @param {!MethodSignature} sig Method signature metadata object
   * @return {!MethodSignature} The updated signature metadata object
   * @private
   */
  function parseArgs(argList, sig) {
    sig.args = argList.map(function(rawArg) {
      let arg = parseArg(rawArg);
      if (!arg.literal) {
        sig.static = false;
      }
      return arg;
    }, this);
    return sig;
  }

  /**
   * Parses an individual argument, and returns an argument metadata object
   * with the following fields:
   *
   *   {
   *     value: 'prop',        // property/path or literal value
   *     literal: false,       // whether argument is a literal
   *     structured: false,    // whether the property is a path
   *     rootProperty: 'prop', // the root property of the path
   *     wildcard: false       // whether the argument was a wildcard '.*' path
   *   }
   *
   * @param {string} rawArg The string value of the argument
   * @return {!MethodArg} Argument metadata object
   * @private
   */
  function parseArg(rawArg) {
    // clean up whitespace
    let arg = rawArg.trim()
      // replace comma entity with comma
      .replace(/&comma;/g, ',')
      // repair extra escape sequences; note only commas strictly need
      // escaping, but we allow any other char to be escaped since its
      // likely users will do this
      .replace(/\\(.)/g, '\$1')
      ;
    // basic argument descriptor
    let a = {
      name: arg,
      value: '',
      literal: false
    };
    // detect literal value (must be String or Number)
    let fc = arg[0];
    if (fc === '-') {
      fc = arg[1];
    }
    if (fc >= '0' && fc <= '9') {
      fc = '#';
    }
    switch(fc) {
      case "'":
      case '"':
        a.value = arg.slice(1, -1);
        a.literal = true;
        break;
      case '#':
        a.value = Number(arg);
        a.literal = true;
        break;
    }
    // if not literal, look for structured path
    if (!a.literal) {
      a.rootProperty = Polymer.Path.root(arg);
      // detect structured path (has dots)
      a.structured = Polymer.Path.isPath(arg);
      if (a.structured) {
        a.wildcard = (arg.slice(-2) == '.*');
        if (a.wildcard) {
          a.name = arg.slice(0, -2);
        }
      }
    }
    return a;
  }

  /**
   * Gather the argument values for a method specified in the provided array
   * of argument metadata.
   *
   * The `path` and `value` arguments are used to fill in wildcard descriptor
   * when the method is being called as a result of a path notification.
   *
   * @param {Object} data Instance data storage object to read properties from
   * @param {!Array<!MethodArg>} args Array of argument metadata
   * @param {string} path Property/path name that triggered the method effect
   * @param {Object} props Bag of current property changes
   * @return {Array<*>} Array of argument values
   * @private
   */
  function marshalArgs(data, args, path, props) {
    let values = [];
    for (let i=0, l=args.length; i<l; i++) {
      let arg = args[i];
      let name = arg.name;
      let v;
      if (arg.literal) {
        v = arg.value;
      } else {
        if (arg.structured) {
          v = Polymer.Path.get(data, name);
          // when data is not stored e.g. `splices`
          if (v === undefined) {
            v = props[name];
          }
        } else {
          v = data[name];
        }
      }
      if (arg.wildcard) {
        // Only send the actual path changed info if the change that
        // caused the observer to run matched the wildcard
        let baseChanged = (name.indexOf(path + '.') === 0);
        let matches = (path.indexOf(name) === 0 && !baseChanged);
        values[i] = {
          path: matches ? path : name,
          value: matches ? props[path] : v,
          base: v
        };
      } else {
        values[i] = v;
      }
    }
    return values;
  }

  // data api

  /**
   * Sends array splice notifications (`.splices` and `.length`)
   *
   * Note: this implementation only accepts normalized paths
   *
   * @param {!PropertyEffectsType} inst Instance to send notifications to
   * @param {Array} array The array the mutations occurred on
   * @param {string} path The path to the array that was mutated
   * @param {Array} splices Array of splice records
   * @private
   */
  function notifySplices(inst, array, path, splices) {
    let splicesPath = path + '.splices';
    inst.notifyPath(splicesPath, { indexSplices: splices });
    inst.notifyPath(path + '.length', array.length);
    // Null here to allow potentially large splice records to be GC'ed.
    inst.__data[splicesPath] = {indexSplices: null};
  }

  /**
   * Creates a splice record and sends an array splice notification for
   * the described mutation
   *
   * Note: this implementation only accepts normalized paths
   *
   * @param {!PropertyEffectsType} inst Instance to send notifications to
   * @param {Array} array The array the mutations occurred on
   * @param {string} path The path to the array that was mutated
   * @param {number} index Index at which the array mutation occurred
   * @param {number} addedCount Number of added items
   * @param {Array} removed Array of removed items
   * @private
   */
  function notifySplice(inst, array, path, index, addedCount, removed) {
    notifySplices(inst, array, path, [{
      index: index,
      addedCount: addedCount,
      removed: removed,
      object: array,
      type: 'splice'
    }]);
  }

  /**
   * Returns an upper-cased version of the string.
   *
   * @param {string} name String to uppercase
   * @return {string} Uppercased string
   * @private
   */
  function upper(name) {
    return name[0].toUpperCase() + name.substring(1);
  }

  /**
   * Element class mixin that provides meta-programming for Polymer's template
   * binding and data observation (collectively, "property effects") system.
   *
   * This mixin uses provides the following key static methods for adding
   * property effects to an element class:
   * - `addPropertyEffect`
   * - `createPropertyObserver`
   * - `createMethodObserver`
   * - `createNotifyingProperty`
   * - `createReadOnlyProperty`
   * - `createReflectedProperty`
   * - `createComputedProperty`
   * - `bindTemplate`
   *
   * Each method creates one or more property accessors, along with metadata
   * used by this mixin's implementation of `_propertiesChanged` to perform
   * the property effects.
   *
   * Underscored versions of the above methods also exist on the element
   * prototype for adding property effects on instances at runtime.
   *
   * Note that this mixin overrides several `PropertyAccessors` methods, in
   * many cases to maintain guarantees provided by the Polymer 1.x features;
   * notably it changes property accessors to be synchronous by default
   * whereas the default when using `PropertyAccessors` standalone is to be
   * async by default.
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin Polymer.TemplateStamp
   * @appliesMixin Polymer.PropertyAccessors
   * @memberof Polymer
   * @summary Element class mixin that provides meta-programming for Polymer's
   * template binding and data observation system.
   */
  Polymer.PropertyEffects = Polymer.dedupingMixin(superClass => {

    /**
     * @constructor
     * @extends {superClass}
     * @implements {Polymer_PropertyAccessors}
     * @implements {Polymer_TemplateStamp}
     * @unrestricted
     */
    const propertyEffectsBase = Polymer.TemplateStamp(Polymer.PropertyAccessors(superClass));

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_PropertyEffects}
     * @extends {propertyEffectsBase}
     * @unrestricted
     */
    class PropertyEffects extends propertyEffectsBase {

      constructor() {
        super();
        /** @type {boolean} */
        this.__dataClientsReady;
        /** @type {Array} */
        this.__dataPendingClients;
        /** @type {Object} */
        this.__dataToNotify;
        /** @type {Object} */
        this.__dataLinkedPaths;
        /** @type {boolean} */
        this.__dataHasPaths;
        /** @type {Object} */
        this.__dataCompoundStorage;
        /** @type {Polymer_PropertyEffects} */
        this.__dataHost;
        /** @type {!Object} */
        this.__dataTemp;
        /** @type {boolean} */
        this.__dataClientsInitialized;
        /** @type {!Object} */
        this.__data;
        /** @type {!Object} */
        this.__dataPending;
        /** @type {!Object} */
        this.__dataOld;
        /** @type {Object} */
        this.__computeEffects;
        /** @type {Object} */
        this.__reflectEffects;
        /** @type {Object} */
        this.__notifyEffects;
        /** @type {Object} */
        this.__propagateEffects;
        /** @type {Object} */
        this.__observeEffects;
        /** @type {Object} */
        this.__readOnly;
        /** @type {number} */
        this.__dataCounter;
        /** @type {!TemplateInfo} */
        this.__templateInfo;
      }

      get PROPERTY_EFFECT_TYPES() {
        return TYPES;
      }

      _initializeProperties() {
        super._initializeProperties();
        hostStack.registerHost(this);
        this.__dataClientsReady = false;
        this.__dataPendingClients = null;
        this.__dataToNotify = null;
        this.__dataLinkedPaths = null;
        this.__dataHasPaths = false;
        // May be set on instance prior to upgrade
        this.__dataCompoundStorage = this.__dataCompoundStorage || null;
        this.__dataHost = this.__dataHost || null;
        this.__dataTemp = {};
        this.__dataClientsInitialized = false;
      }

      /**
       * Overrides `Polymer.PropertyAccessors` implementation to provide a
       * more efficient implementation of initializing properties from
       * the prototype on the instance.
       *
       * @override
       * @param {Object} props Properties to initialize on the prototype
       */
      _initializeProtoProperties(props) {
        this.__data = Object.create(props);
        this.__dataPending = Object.create(props);
        this.__dataOld = {};
      }

      /**
       * Overrides `Polymer.PropertyAccessors` implementation to avoid setting
       * `_setProperty`'s `shouldNotify: true`.
       *
       * @override
       * @param {Object} props Properties to initialize on the instance
       */
      _initializeInstanceProperties(props) {
        let readOnly = this[TYPES.READ_ONLY];
        for (let prop in props) {
          if (!readOnly || !readOnly[prop]) {
            this.__dataPending = this.__dataPending || {};
            this.__dataOld = this.__dataOld || {};
            this.__data[prop] = this.__dataPending[prop] = props[prop];
          }
        }
      }

      // Prototype setup ----------------------------------------

      /**
       * Equivalent to static `addPropertyEffect` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property that should trigger the effect
       * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param {Object=} effect Effect metadata object
       * @protected
       */
      _addPropertyEffect(property, type, effect) {
        this._createPropertyAccessor(property, type == TYPES.READ_ONLY);
        // effects are accumulated into arrays per property based on type
        let effects = ensureOwnEffectMap(this, type)[property];
        if (!effects) {
          effects = this[type][property] = [];
        }
        effects.push(effect);
      }

      /**
       * Removes the given property effect.
       *
       * @param {string} property Property the effect was associated with
       * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param {Object=} effect Effect metadata object to remove
       */
      _removePropertyEffect(property, type, effect) {
        let effects = ensureOwnEffectMap(this, type)[property];
        let idx = effects.indexOf(effect);
        if (idx >= 0) {
          effects.splice(idx, 1);
        }
      }

      /**
       * Returns whether the current prototype/instance has a property effect
       * of a certain type.
       *
       * @param {string} property Property name
       * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasPropertyEffect(property, type) {
        let effects = this[type];
        return Boolean(effects && effects[property]);
      }

      /**
       * Returns whether the current prototype/instance has a "read only"
       * accessor for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasReadOnlyEffect(property) {
        return this._hasPropertyEffect(property, TYPES.READ_ONLY);
      }

      /**
       * Returns whether the current prototype/instance has a "notify"
       * property effect for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasNotifyEffect(property) {
        return this._hasPropertyEffect(property, TYPES.NOTIFY);
      }

      /**
       * Returns whether the current prototype/instance has a "reflect to attribute"
       * property effect for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasReflectEffect(property) {
        return this._hasPropertyEffect(property, TYPES.REFLECT);
      }

      /**
       * Returns whether the current prototype/instance has a "computed"
       * property effect for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasComputedEffect(property) {
        return this._hasPropertyEffect(property, TYPES.COMPUTE);
      }

      // Runtime ----------------------------------------

      /**
       * Sets a pending property or path.  If the root property of the path in
       * question had no accessor, the path is set, otherwise it is enqueued
       * via `_setPendingProperty`.
       *
       * This function isolates relatively expensive functionality necessary
       * for the public API (`set`, `setProperties`, `notifyPath`, and property
       * change listeners via {{...}} bindings), such that it is only done
       * when paths enter the system, and not at every propagation step.  It
       * also sets a `__dataHasPaths` flag on the instance which is used to
       * fast-path slower path-matching code in the property effects host paths.
       *
       * `path` can be a path string or array of path parts as accepted by the
       * public API.
       *
       * @param {string | !Array<number|string>} path Path to set
       * @param {*} value Value to set
       * @param {boolean=} shouldNotify Set to true if this change should
       *  cause a property notification event dispatch
       * @param {boolean=} isPathNotification If the path being set is a path
       *   notification of an already changed value, as opposed to a request
       *   to set and notify the change.  In the latter `false` case, a dirty
       *   check is performed and then the value is set to the path before
       *   enqueuing the pending property change.
       * @return {boolean} Returns true if the property/path was enqueued in
       *   the pending changes bag.
       * @protected
       */
      _setPendingPropertyOrPath(path, value, shouldNotify, isPathNotification) {
        if (isPathNotification ||
            Polymer.Path.root(Array.isArray(path) ? path[0] : path) !== path) {
          // Dirty check changes being set to a path against the actual object,
          // since this is the entry point for paths into the system; from here
          // the only dirty checks are against the `__dataTemp` cache to prevent
          // duplicate work in the same turn only. Note, if this was a notification
          // of a change already set to a path (isPathNotification: true),
          // we always let the change through and skip the `set` since it was
          // already dirty checked at the point of entry and the underlying
          // object has already been updated
          if (!isPathNotification) {
            let old = Polymer.Path.get(this, path);
            path = /** @type {string} */ (Polymer.Path.set(this, path, value));
            // Use property-accessor's simpler dirty check
            if (!path || !super._shouldPropertyChange(path, value, old)) {
              return false;
            }
          }
          this.__dataHasPaths = true;
          if (this._setPendingProperty(/**@type{string}*/(path), value, shouldNotify)) {
            computeLinkedPaths(this, path, value);
            return true;
          }
        } else {
          if (this.__dataHasAccessor && this.__dataHasAccessor[path]) {
            return this._setPendingProperty(/**@type{string}*/(path), value, shouldNotify);
          } else {
            this[path] = value;
          }
        }
        return false;
      }

      /**
       * Applies a value to a non-Polymer element/node's property.
       *
       * The implementation makes a best-effort at binding interop:
       * Some native element properties have side-effects when
       * re-setting the same value (e.g. setting `<input>.value` resets the
       * cursor position), so we do a dirty-check before setting the value.
       * However, for better interop with non-Polymer custom elements that
       * accept objects, we explicitly re-set object changes coming from the
       * Polymer world (which may include deep object changes without the
       * top reference changing), erring on the side of providing more
       * information.
       *
       * Users may override this method to provide alternate approaches.
       *
       * @param {Node} node The node to set a property on
       * @param {string} prop The property to set
       * @param {*} value The value to set
       * @protected
       */
      _setUnmanagedPropertyToNode(node, prop, value) {
        // It is a judgment call that resetting primitives is
        // "bad" and resettings objects is also "good"; alternatively we could
        // implement a whitelist of tag & property values that should never
        // be reset (e.g. <input>.value && <select>.value)
        if (value !== node[prop] || typeof value == 'object') {
          node[prop] = value;
        }
      }

      /**
       * Overrides the `PropertyAccessors` implementation to introduce special
       * dirty check logic depending on the property & value being set:
       *
       * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
       *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
       * 2. Object set to simple property (e.g. 'prop': {...})
       *    Stored in `__dataTemp` and `__data`, dirty checked against
       *    `__dataTemp` by default implementation of `_shouldPropertyChange`
       * 3. Primitive value set to simple property (e.g. 'prop': 42)
       *    Stored in `__data`, dirty checked against `__data`
       *
       * The dirty-check is important to prevent cycles due to two-way
       * notification, but paths and objects are only dirty checked against any
       * previous value set during this turn via a "temporary cache" that is
       * cleared when the last `_propertiesChaged` exits. This is so:
       * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
       *    due to array mutations like shift/unshift/splice; this is fine
       *    since path changes are dirty-checked at user entry points like `set`
       * b. dirty-checking for objects only lasts one turn to allow the user
       *    to mutate the object in-place and re-set it with the same identity
       *    and have all sub-properties re-propagated in a subsequent turn.
       *
       * The temp cache is not necessarily sufficient to prevent invalid array
       * paths, since a splice can happen during the same turn (with pathological
       * user code); we could introduce a "fixup" for temporarily cached array
       * paths if needed: https://github.com/Polymer/polymer/issues/4227
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @param {boolean=} shouldNotify True if property should fire notification
       *   event (applies only for `notify: true` properties)
       * @return {boolean} Returns true if the property changed
       * @override
       */
      _setPendingProperty(property, value, shouldNotify) {
        let isPath = this.__dataHasPaths && Polymer.Path.isPath(property);
        let prevProps = isPath ? this.__dataTemp : this.__data;
        if (this._shouldPropertyChange(property, value, prevProps[property])) {
          if (!this.__dataPending) {
            this.__dataPending = {};
            this.__dataOld = {};
          }
          // Ensure old is captured from the last turn
          if (!(property in this.__dataOld)) {
            this.__dataOld[property] = this.__data[property];
          }
          // Paths are stored in temporary cache (cleared at end of turn),
          // which is used for dirty-checking, all others stored in __data
          if (isPath) {
            this.__dataTemp[property] = value;
          } else {
            this.__data[property] = value;
          }
          // All changes go into pending property bag, passed to _propertiesChanged
          this.__dataPending[property] = value;
          // Track properties that should notify separately
          if (isPath || (this[TYPES.NOTIFY] && this[TYPES.NOTIFY][property])) {
            this.__dataToNotify = this.__dataToNotify || {};
            this.__dataToNotify[property] = shouldNotify;
          }
          return true;
        }
        return false;
      }

      /**
       * Overrides base implementation to ensure all accessors set `shouldNotify`
       * to true, for per-property notification tracking.
       *
       * @override
       */
      _setProperty(property, value) {
        if (this._setPendingProperty(property, value, true)) {
          this._invalidateProperties();
        }
      }

      /**
       * Overrides `PropertyAccessor`'s default async queuing of
       * `_propertiesChanged`: if `__dataReady` is false (has not yet been
       * manually flushed), the function no-ops; otherwise flushes
       * `_propertiesChanged` synchronously.
       *
       * @override
       */
      _invalidateProperties() {
        if (this.__dataReady) {
          this._flushProperties();
        }
      }

      /**
       * Enqueues the given client on a list of pending clients, whose
       * pending property changes can later be flushed via a call to
       * `_flushClients`.
       *
       * @param {Object} client PropertyEffects client to enqueue
       * @protected
       */
      _enqueueClient(client) {
        this.__dataPendingClients = this.__dataPendingClients || [];
        if (client !== this) {
          this.__dataPendingClients.push(client);
        }
      }

      /**
       * Flushes any clients previously enqueued via `_enqueueClient`, causing
       * their `_flushProperties` method to run.
       *
       * @protected
       */
      _flushClients() {
        if (!this.__dataClientsReady) {
          this.__dataClientsReady = true;
          this._readyClients();
          // Override point where accessors are turned on; importantly,
          // this is after clients have fully readied, providing a guarantee
          // that any property effects occur only after all clients are ready.
          this.__dataReady = true;
        } else {
          this.__enableOrFlushClients();
        }
      }

      // NOTE: We ensure clients either enable or flush as appropriate. This
      // handles two corner cases:
      // (1) clients flush properly when connected/enabled before the host
      // enables; e.g.
      //   (a) Templatize stamps with no properties and does not flush and
      //   (b) the instance is inserted into dom and
      //   (c) then the instance flushes.
      // (2) clients enable properly when not connected/enabled when the host
      // flushes; e.g.
      //   (a) a template is runtime stamped and not yet connected/enabled
      //   (b) a host sets a property, causing stamped dom to flush
      //   (c) the stamped dom enables.
      __enableOrFlushClients() {
        let clients = this.__dataPendingClients;
        if (clients) {
          this.__dataPendingClients = null;
          for (let i=0; i < clients.length; i++) {
            let client = clients[i];
            if (!client.__dataEnabled) {
              client._enableProperties();
            } else if (client.__dataPending) {
              client._flushProperties();
            }
          }
        }
      }

      /**
       * Perform any initial setup on client dom. Called before the first
       * `_flushProperties` call on client dom and before any element
       * observers are called.
       *
       * @protected
       */
      _readyClients() {
        this.__enableOrFlushClients();
      }

      /**
       * Sets a bag of property changes to this instance, and
       * synchronously processes all effects of the properties as a batch.
       *
       * Property names must be simple properties, not paths.  Batched
       * path propagation is not supported.
       *
       * @param {Object} props Bag of one or more key-value pairs whose key is
       *   a property and value is the new value to set for that property.
       * @param {boolean=} setReadOnly When true, any private values set in
       *   `props` will be set. By default, `setProperties` will not set
       *   `readOnly: true` root properties.
       * @public
       */
      setProperties(props, setReadOnly) {
        for (let path in props) {
          if (setReadOnly || !this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][path]) {
            //TODO(kschaaf): explicitly disallow paths in setProperty?
            // wildcard observers currently only pass the first changed path
            // in the `info` object, and you could do some odd things batching
            // paths, e.g. {'foo.bar': {...}, 'foo': null}
            this._setPendingPropertyOrPath(path, props[path], true);
          }
        }
        this._invalidateProperties();
      }

      /**
       * Overrides `PropertyAccessors` so that property accessor
       * side effects are not enabled until after client dom is fully ready.
       * Also calls `_flushClients` callback to ensure client dom is enabled
       * that was not enabled as a result of flushing properties.
       *
       * @override
       */
      ready() {
        // It is important that `super.ready()` is not called here as it
        // immediately turns on accessors. Instead, we wait until `readyClients`
        // to enable accessors to provide a guarantee that clients are ready
        // before processing any accessors side effects.
        this._flushProperties();
        // If no data was pending, `_flushProperties` will not `flushClients`
        // so ensure this is done.
        if (!this.__dataClientsReady) {
          this._flushClients();
        }
        // Before ready, client notifications do not trigger _flushProperties.
        // Therefore a flush is necessary here if data has been set.
        if (this.__dataPending) {
          this._flushProperties();
        }
      }

      /**
       * Implements `PropertyAccessors`'s properties changed callback.
       *
       * Runs each class of effects for the batch of changed properties in
       * a specific order (compute, propagate, reflect, observe, notify).
       *
       * @override
       */
      _propertiesChanged(currentProps, changedProps, oldProps) {
        // ----------------------------
        // let c = Object.getOwnPropertyNames(changedProps || {});
        // window.debug && console.group(this.localName + '#' + this.id + ': ' + c);
        // if (window.debug) { debugger; }
        // ----------------------------
        let hasPaths = this.__dataHasPaths;
        this.__dataHasPaths = false;
        // Compute properties
        runComputedEffects(this, changedProps, oldProps, hasPaths);
        // Clear notify properties prior to possible reentry (propagate, observe),
        // but after computing effects have a chance to add to them
        let notifyProps = this.__dataToNotify;
        this.__dataToNotify = null;
        // Propagate properties to clients
        this._propagatePropertyChanges(changedProps, oldProps, hasPaths);
        // Flush clients
        this._flushClients();
        // Reflect properties
        runEffects(this, this[TYPES.REFLECT], changedProps, oldProps, hasPaths);
        // Observe properties
        runEffects(this, this[TYPES.OBSERVE], changedProps, oldProps, hasPaths);
        // Notify properties to host
        if (notifyProps) {
          runNotifyEffects(this, notifyProps, changedProps, oldProps, hasPaths);
        }
        // Clear temporary cache at end of turn
        if (this.__dataCounter == 1) {
          this.__dataTemp = {};
        }
        // ----------------------------
        // window.debug && console.groupEnd(this.localName + '#' + this.id + ': ' + c);
        // ----------------------------
      }

      /**
       * Called to propagate any property changes to stamped template nodes
       * managed by this element.
       *
       * @param {Object} changedProps Bag of changed properties
       * @param {Object} oldProps Bag of previous values for changed properties
       * @param {boolean} hasPaths True with `props` contains one or more paths
       * @protected
       */
      _propagatePropertyChanges(changedProps, oldProps, hasPaths) {
        if (this[TYPES.PROPAGATE]) {
          runEffects(this, this[TYPES.PROPAGATE], changedProps, oldProps, hasPaths);
        }
        let templateInfo = this.__templateInfo;
        while (templateInfo) {
          runEffects(this, templateInfo.propertyEffects, changedProps, oldProps,
            hasPaths, templateInfo.nodeList);
          templateInfo = templateInfo.nextTemplateInfo;
        }
      }

      /**
       * Aliases one data path as another, such that path notifications from one
       * are routed to the other.
       *
       * @param {string | !Array<string|number>} to Target path to link.
       * @param {string | !Array<string|number>} from Source path to link.
       * @public
       */
      linkPaths(to, from) {
        to = Polymer.Path.normalize(to);
        from = Polymer.Path.normalize(from);
        this.__dataLinkedPaths = this.__dataLinkedPaths || {};
        this.__dataLinkedPaths[to] = from;
      }

      /**
       * Removes a data path alias previously established with `_linkPaths`.
       *
       * Note, the path to unlink should be the target (`to`) used when
       * linking the paths.
       *
       * @param {string | !Array<string|number>} path Target path to unlink.
       * @public
       */
      unlinkPaths(path) {
        path = Polymer.Path.normalize(path);
        if (this.__dataLinkedPaths) {
          delete this.__dataLinkedPaths[path];
        }
      }

      /**
       * Notify that an array has changed.
       *
       * Example:
       *
       *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
       *     ...
       *     this.items.splice(1, 1, {name: 'Sam'});
       *     this.items.push({name: 'Bob'});
       *     this.notifySplices('items', [
       *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1, obect: this.items, type: 'splice' },
       *       { index: 3, removed: [], addedCount: 1, object: this.items, type: 'splice'}
       *     ]);
       *
       * @param {string} path Path that should be notified.
       * @param {Array} splices Array of splice records indicating ordered
       *   changes that occurred to the array. Each record should have the
       *   following fields:
       *    * index: index at which the change occurred
       *    * removed: array of items that were removed from this index
       *    * addedCount: number of new items added at this index
       *    * object: a reference to the array in question
       *    * type: the string literal 'splice'
       *
       *   Note that splice records _must_ be normalized such that they are
       *   reported in index order (raw results from `Object.observe` are not
       *   ordered and must be normalized/merged before notifying).
       * @public
      */
      notifySplices(path, splices) {
        let info = {path: ''};
        let array = /** @type {Array} */(Polymer.Path.get(this, path, info));
        notifySplices(this, array, info.path, splices);
      }

      /**
       * Convenience method for reading a value from a path.
       *
       * Note, if any part in the path is undefined, this method returns
       * `undefined` (this method does not throw when dereferencing undefined
       * paths).
       *
       * @param {(string|!Array<(string|number)>)} path Path to the value
       *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
       *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
       *   bracketed expressions are not supported; string-based path parts
       *   *must* be separated by dots.  Note that when dereferencing array
       *   indices, the index may be used as a dotted part directly
       *   (e.g. `users.12.name` or `['users', 12, 'name']`).
       * @param {Object=} root Root object from which the path is evaluated.
       * @return {*} Value at the path, or `undefined` if any part of the path
       *   is undefined.
       * @public
       */
      get(path, root) {
        return Polymer.Path.get(root || this, path);
      }

      /**
       * Convenience method for setting a value to a path and notifying any
       * elements bound to the same path.
       *
       * Note, if any part in the path except for the last is undefined,
       * this method does nothing (this method does not throw when
       * dereferencing undefined paths).
       *
       * @param {(string|!Array<(string|number)>)} path Path to the value
       *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
       *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
       *   bracketed expressions are not supported; string-based path parts
       *   *must* be separated by dots.  Note that when dereferencing array
       *   indices, the index may be used as a dotted part directly
       *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
       * @param {*} value Value to set at the specified path.
       * @param {Object=} root Root object from which the path is evaluated.
       *   When specified, no notification will occur.
       * @public
      */
      set(path, value, root) {
        if (root) {
          Polymer.Path.set(root, path, value);
        } else {
          if (!this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][/** @type {string} */(path)]) {
            if (this._setPendingPropertyOrPath(path, value, true)) {
              this._invalidateProperties();
            }
          }
        }
      }

      /**
       * Adds items onto the end of the array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.push`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @param {...*} items Items to push onto array
       * @return {number} New length of the array.
       * @public
       */
      push(path, ...items) {
        let info = {path: ''};
        let array = /** @type {Array}*/(Polymer.Path.get(this, path, info));
        let len = array.length;
        let ret = array.push(...items);
        if (items.length) {
          notifySplice(this, array, info.path, len, items.length, []);
        }
        return ret;
      }

      /**
       * Removes an item from the end of array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.pop`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @return {*} Item that was removed.
       * @public
       */
      pop(path) {
        let info = {path: ''};
        let array = /** @type {Array} */(Polymer.Path.get(this, path, info));
        let hadLength = Boolean(array.length);
        let ret = array.pop();
        if (hadLength) {
          notifySplice(this, array, info.path, array.length, 0, [ret]);
        }
        return ret;
      }

      /**
       * Starting from the start index specified, removes 0 or more items
       * from the array and inserts 0 or more new items in their place.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.splice`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @param {number} start Index from which to start removing/inserting.
       * @param {number} deleteCount Number of items to remove.
       * @param {...*} items Items to insert into array.
       * @return {Array} Array of removed items.
       * @public
       */
      splice(path, start, deleteCount, ...items) {
        let info = {path : ''};
        let array = /** @type {Array} */(Polymer.Path.get(this, path, info));
        // Normalize fancy native splice handling of crazy start values
        if (start < 0) {
          start = array.length - Math.floor(-start);
        } else {
          start = Math.floor(start);
        }
        if (!start) {
          start = 0;
        }
        let ret = array.splice(start, deleteCount, ...items);
        if (items.length || ret.length) {
          notifySplice(this, array, info.path, start, items.length, ret);
        }
        return ret;
      }

      /**
       * Removes an item from the beginning of array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.pop`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @return {*} Item that was removed.
       * @public
       */
      shift(path) {
        let info = {path: ''};
        let array = /** @type {Array} */(Polymer.Path.get(this, path, info));
        let hadLength = Boolean(array.length);
        let ret = array.shift();
        if (hadLength) {
          notifySplice(this, array, info.path, 0, 0, [ret]);
        }
        return ret;
      }

      /**
       * Adds items onto the beginning of the array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.push`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @param {...*} items Items to insert info array
       * @return {number} New length of the array.
       * @public
       */
      unshift(path, ...items) {
        let info = {path: ''};
        let array = /** @type {Array} */(Polymer.Path.get(this, path, info));
        let ret = array.unshift(...items);
        if (items.length) {
          notifySplice(this, array, info.path, 0, items.length, []);
        }
        return ret;
      }

      /**
       * Notify that a path has changed.
       *
       * Example:
       *
       *     this.item.user.name = 'Bob';
       *     this.notifyPath('item.user.name');
       *
       * @param {string} path Path that should be notified.
       * @param {*=} value Value at the path (optional).
       * @public
      */
      notifyPath(path, value) {
        /** @type {string} */
        let propPath;
        if (arguments.length == 1) {
          // Get value if not supplied
          let info = {path: ''};
          value = Polymer.Path.get(this, path, info);
          propPath = info.path;
        } else if (Array.isArray(path)) {
          // Normalize path if needed
          propPath = Polymer.Path.normalize(path);
        } else {
          propPath = /** @type{string} */(path);
        }
        if (this._setPendingPropertyOrPath(propPath, value, true, true)) {
          this._invalidateProperties();
        }
      }

      /**
       * Equivalent to static `createReadOnlyProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @param {boolean=} protectedSetter Creates a custom protected setter
       *   when `true`.
       * @protected
       */
      _createReadOnlyProperty(property, protectedSetter) {
        this._addPropertyEffect(property, TYPES.READ_ONLY);
        if (protectedSetter) {
          this['_set' + upper(property)] = /** @this {PropertyEffects} */function(value) {
            this._setProperty(property, value);
          }
        }
      }

      /**
       * Equivalent to static `createPropertyObserver` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @param {string} methodName Name of observer method to call
       * @param {boolean=} dynamicFn Whether the method name should be included as
       *   a dependency to the effect.
       * @protected
       */
      _createPropertyObserver(property, methodName, dynamicFn) {
        let info = { property, methodName, dynamicFn: Boolean(dynamicFn) };
        this._addPropertyEffect(property, TYPES.OBSERVE, {
          fn: runObserverEffect, info, trigger: {name: property}
        });
        if (dynamicFn) {
          this._addPropertyEffect(methodName, TYPES.OBSERVE, {
            fn: runObserverEffect, info, trigger: {name: methodName}
          });
        }
      }

      /**
       * Equivalent to static `createMethodObserver` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       * @protected
       */
      _createMethodObserver(expression, dynamicFn) {
        let sig = parseMethod(expression);
        if (!sig) {
          throw new Error("Malformed observer expression '" + expression + "'");
        }
        createMethodEffect(this, sig, TYPES.OBSERVE, runMethodEffect, null, dynamicFn);
      }

      /**
       * Equivalent to static `createNotifyingProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @protected
       */
      _createNotifyingProperty(property) {
        this._addPropertyEffect(property, TYPES.NOTIFY, {
          fn: runNotifyEffect,
          info: {
            eventName: CaseMap.camelToDashCase(property) + '-changed',
            property: property
          }
        });
      }

      /**
       * Equivalent to static `createReflectedProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @protected
       */
      _createReflectedProperty(property) {
        let attr = CaseMap.camelToDashCase(property);
        if (attr[0] === '-') {
          console.warn('Property ' + property + ' cannot be reflected to attribute ' +
            attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property thisead.');
        } else {
          this._addPropertyEffect(property, TYPES.REFLECT, {
            fn: runReflectEffect,
            info: {
              attrName: attr
            }
          });
        }
      }

      /**
       * Equivalent to static `createComputedProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Name of computed property to set
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       * @protected
       */
      _createComputedProperty(property, expression, dynamicFn) {
        let sig = parseMethod(expression);
        if (!sig) {
          throw new Error("Malformed computed expression '" + expression + "'");
        }
        createMethodEffect(this, sig, TYPES.COMPUTE, runComputedEffect, property, dynamicFn);
      }

      // -- static class methods ------------

      /**
       * Ensures an accessor exists for the specified property, and adds
       * to a list of "property effects" that will run when the accessor for
       * the specified property is set.  Effects are grouped by "type", which
       * roughly corresponds to a phase in effect processing.  The effect
       * metadata should be in the following form:
       *
       *   {
       *     fn: effectFunction, // Reference to function to call to perform effect
       *     info: { ... }       // Effect metadata passed to function
       *     trigger: {          // Optional triggering metadata; if not provided
       *       name: string      // the property is treated as a wildcard
       *       structured: boolean
       *       wildcard: boolean
       *     }
       *   }
       *
       * Effects are called from `_propertiesChanged` in the following order by
       * type:
       *
       * 1. COMPUTE
       * 2. PROPAGATE
       * 3. REFLECT
       * 4. OBSERVE
       * 5. NOTIFY
       *
       * Effect functions are called with the following signature:
       *
       *   effectFunction(inst, path, props, oldProps, info, hasPaths)
       *
       * @param {string} property Property that should trigger the effect
       * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param {Object=} effect Effect metadata object
       * @protected
       */
      static addPropertyEffect(property, type, effect) {
        this.prototype._addPropertyEffect(property, type, effect);
      }

      /**
       * Creates a single-property observer for the given property.
       *
       * @param {string} property Property name
       * @param {string} methodName Name of observer method to call
       * @param {boolean=} dynamicFn Whether the method name should be included as
       *   a dependency to the effect.
       * @protected
       */
      static createPropertyObserver(property, methodName, dynamicFn) {
        this.prototype._createPropertyObserver(property, methodName, dynamicFn);
      }

      /**
       * Creates a multi-property "method observer" based on the provided
       * expression, which should be a string in the form of a normal Javascript
       * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
       * should correspond to a property or path in the context of this
       * prototype (or instance), or may be a literal string or number.
       *
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       * @protected
       */
      static createMethodObserver(expression, dynamicFn) {
        this.prototype._createMethodObserver(expression, dynamicFn);
      }

      /**
       * Causes the setter for the given property to dispatch `<property>-changed`
       * events to notify of changes to the property.
       *
       * @param {string} property Property name
       * @protected
       */
      static createNotifyingProperty(property) {
        this.prototype._createNotifyingProperty(property);
      }

      /**
       * Creates a read-only accessor for the given property.
       *
       * To set the property, use the protected `_setProperty` API.
       * To create a custom protected setter (e.g. `_setMyProp()` for
       * property `myProp`), pass `true` for `protectedSetter`.
       *
       * Note, if the property will have other property effects, this method
       * should be called first, before adding other effects.
       *
       * @param {string} property Property name
       * @param {boolean=} protectedSetter Creates a custom protected setter
       *   when `true`.
       * @protected
       */
      static createReadOnlyProperty(property, protectedSetter) {
        this.prototype._createReadOnlyProperty(property, protectedSetter);
      }

      /**
       * Causes the setter for the given property to reflect the property value
       * to a (dash-cased) attribute of the same name.
       *
       * @param {string} property Property name
       * @protected
       */
      static createReflectedProperty(property) {
        this.prototype._createReflectedProperty(property);
      }

      /**
       * Creates a computed property whose value is set to the result of the
       * method described by the given `expression` each time one or more
       * arguments to the method changes.  The expression should be a string
       * in the form of a normal Javascript function signature:
       * `'methodName(arg1, [..., argn])'`
       *
       * @param {string} property Name of computed property to set
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
       *   method names should be included as a dependency to the effect.
       * @protected
       */
      static createComputedProperty(property, expression, dynamicFn) {
        this.prototype._createComputedProperty(property, expression, dynamicFn);
      }

      /**
       * Parses the provided template to ensure binding effects are created
       * for them, and then ensures property accessors are created for any
       * dependent properties in the template.  Binding effects for bound
       * templates are stored in a linked list on the instance so that
       * templates can be efficiently stamped and unstamped.
       *
       * @param {HTMLTemplateElement} template Template containing binding
       *   bindings
       * @return {Object} Template metadata object
       * @protected
       */
      static bindTemplate(template) {
        return this.prototype._bindTemplate(template);
      }

      // -- binding ----------------------------------------------

      /**
       * Equivalent to static `bindTemplate` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * This method may be called on the prototype (for prototypical template
       * binding, to avoid creating accessors every instance) once per prototype,
       * and will be called with `runtimeBinding: true` by `_stampTemplate` to
       * create and link an instance of the template metadata associated with a
       * particular stamping.
       *
       * @param {HTMLTemplateElement} template Template containing binding
       *   bindings
       * @param {boolean=} instanceBinding When false (default), performs
       *   "prototypical" binding of the template and overwrites any previously
       *   bound template for the class. When true (as passed from
       *   `_stampTemplate`), the template info is instanced and linked into
       *   the list of bound templates.
       * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
       *   this is an instance of the prototypical template info
       * @protected
       */
      _bindTemplate(template, instanceBinding) {
        let templateInfo = this.constructor._parseTemplate(template);
        let wasPreBound = this.__templateInfo == templateInfo;
        // Optimization: since this is called twice for proto-bound templates,
        // don't attempt to recreate accessors if this template was pre-bound
        if (!wasPreBound) {
          for (let prop in templateInfo.propertyEffects) {
            this._createPropertyAccessor(prop);
          }
        }
        if (instanceBinding) {
          // For instance-time binding, create instance of template metadata
          // and link into list of templates if necessary
          templateInfo = /** @type {!TemplateInfo} */(Object.create(templateInfo));
          templateInfo.wasPreBound = wasPreBound;
          if (!wasPreBound && this.__templateInfo) {
            let last = this.__templateInfoLast || this.__templateInfo;
            this.__templateInfoLast = last.nextTemplateInfo = templateInfo;
            templateInfo.previousTemplateInfo = last;
            return templateInfo;
          }
        }
        return this.__templateInfo = templateInfo;
      }

      /**
       * Adds a property effect to the given template metadata, which is run
       * at the "propagate" stage of `_propertiesChanged` when the template
       * has been bound to the element via `_bindTemplate`.
       *
       * The `effect` object should match the format in `_addPropertyEffect`.
       *
       * @param {Object} templateInfo Template metadata to add effect to
       * @param {string} prop Property that should trigger the effect
       * @param {Object=} effect Effect metadata object
       * @protected
       */
      static _addTemplatePropertyEffect(templateInfo, prop, effect) {
        let hostProps = templateInfo.hostProps = templateInfo.hostProps || {};
        hostProps[prop] = true;
        let effects = templateInfo.propertyEffects = templateInfo.propertyEffects || {};
        let propEffects = effects[prop] = effects[prop] || [];
        propEffects.push(effect);
      }

      /**
       * Stamps the provided template and performs instance-time setup for
       * Polymer template features, including data bindings, declarative event
       * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
       * is returned containing the stamped DOM, ready for insertion into the
       * DOM.
       *
       * This method may be called more than once; however note that due to
       * `shadycss` polyfill limitations, only styles from templates prepared
       * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
       * to the shadow root and support CSS custom properties), and note that
       * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
       * any styles required by in runtime-stamped templates must be included
       * in the main element template.
       *
       * @param {!HTMLTemplateElement} template Template to stamp
       * @return {!StampedTemplate} Cloned template content
       * @override
       * @protected
       */
      _stampTemplate(template) {
        // Ensures that created dom is `_enqueueClient`'d to this element so
        // that it can be flushed on next call to `_flushProperties`
        hostStack.beginHosting(this);
        let dom = super._stampTemplate(template);
        hostStack.endHosting(this);
        let templateInfo = /** @type {!TemplateInfo} */(this._bindTemplate(template, true));
        // Add template-instance-specific data to instanced templateInfo
        templateInfo.nodeList = dom.nodeList;
        // Capture child nodes to allow unstamping of non-prototypical templates
        if (!templateInfo.wasPreBound) {
          let nodes = templateInfo.childNodes = [];
          for (let n=dom.firstChild; n; n=n.nextSibling) {
            nodes.push(n);
          }
        }
        dom.templateInfo = templateInfo;
        // Setup compound storage, 2-way listeners, and dataHost for bindings
        setupBindings(this, templateInfo);
        // Flush properties into template nodes if already booted
        if (this.__dataReady) {
          runEffects(this, templateInfo.propertyEffects, this.__data, null,
            false, templateInfo.nodeList);
        }
        return dom;
      }

      /**
       * Removes and unbinds the nodes previously contained in the provided
       * DocumentFragment returned from `_stampTemplate`.
       *
       * @param {!StampedTemplate} dom DocumentFragment previously returned
       *   from `_stampTemplate` associated with the nodes to be removed
       * @protected
       */
      _removeBoundDom(dom) {
        // Unlink template info
        let templateInfo = dom.templateInfo;
        if (templateInfo.previousTemplateInfo) {
          templateInfo.previousTemplateInfo.nextTemplateInfo =
            templateInfo.nextTemplateInfo;
        }
        if (templateInfo.nextTemplateInfo) {
          templateInfo.nextTemplateInfo.previousTemplateInfo =
            templateInfo.previousTemplateInfo;
        }
        if (this.__templateInfoLast == templateInfo) {
          this.__templateInfoLast = templateInfo.previousTemplateInfo;
        }
        templateInfo.previousTemplateInfo = templateInfo.nextTemplateInfo = null;
        // Remove stamped nodes
        let nodes = templateInfo.childNodes;
        for (let i=0; i<nodes.length; i++) {
          let node = nodes[i];
          node.parentNode.removeChild(node);
        }
      }

      /**
       * Overrides default `TemplateStamp` implementation to add support for
       * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
       * array is added to `nodeInfo` and populated with binding metadata
       * with information capturing the binding target, and a `parts` array
       * with one or more metadata objects capturing the source(s) of the
       * binding.
       *
       * @override
       * @param {Node} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      static _parseTemplateNode(node, templateInfo, nodeInfo) {
        let noted = super._parseTemplateNode(node, templateInfo, nodeInfo);
        if (node.nodeType === Node.TEXT_NODE) {
          let parts = this._parseBindings(node.textContent, templateInfo);
          if (parts) {
            // Initialize the textContent with any literal parts
            // NOTE: default to a space here so the textNode remains; some browsers
            // (IE) evacipate an empty textNode following cloneNode/importNode.
            node.textContent = literalFromParts(parts) || ' ';
            addBinding(this, templateInfo, nodeInfo, 'text', 'textContent', parts);
            noted = true;
          }
        }
        return noted;
      }

      /**
       * Overrides default `TemplateStamp` implementation to add support for
       * parsing bindings from attributes.  A `bindings`
       * array is added to `nodeInfo` and populated with binding metadata
       * with information capturing the binding target, and a `parts` array
       * with one or more metadata objects capturing the source(s) of the
       * binding.
       *
       * @override
       * @param {Element} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
        let parts = this._parseBindings(value, templateInfo);
        if (parts) {
          // Attribute or property
          let origName = name;
          let kind = 'property';
          if (name[name.length-1] == '$') {
            name = name.slice(0, -1);
            kind = 'attribute';
          }
          // Initialize attribute bindings with any literal parts
          let literal = literalFromParts(parts);
          if (literal && kind == 'attribute') {
            node.setAttribute(name, literal);
          }
          // Clear attribute before removing, since IE won't allow removing
          // `value` attribute if it previously had a value (can't
          // unconditionally set '' before removing since attributes with `$`
          // can't be set using setAttribute)
          if (node.localName === 'input' && origName === 'value') {
            node.setAttribute(origName, '');
          }
          // Remove annotation
          node.removeAttribute(origName);
          // Case hackery: attributes are lower-case, but bind targets
          // (properties) are case sensitive. Gambit is to map dash-case to
          // camel-case: `foo-bar` becomes `fooBar`.
          // Attribute bindings are excepted.
          if (kind === 'property') {
            name = Polymer.CaseMap.dashToCamelCase(name);
          }
          addBinding(this, templateInfo, nodeInfo, kind, name, parts, literal);
          return true;
        } else {
          return super._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value);
        }
      }

      /**
       * Overrides default `TemplateStamp` implementation to add support for
       * binding the properties that a nested template depends on to the template
       * as `_host_<property>`.
       *
       * @override
       * @param {Node} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      static _parseTemplateNestedTemplate(node, templateInfo, nodeInfo) {
        let noted = super._parseTemplateNestedTemplate(node, templateInfo, nodeInfo);
        // Merge host props into outer template and add bindings
        let hostProps = nodeInfo.templateInfo.hostProps;
        let mode = '{';
        for (let source in hostProps) {
          let parts = [{ mode, source, dependencies: [source] }];
          addBinding(this, templateInfo, nodeInfo, 'property', '_host_' + source, parts);
        }
        return noted;
      }

      /**
       * Called to parse text in a template (either attribute values or
       * textContent) into binding metadata.
       *
       * Any overrides of this method should return an array of binding part
       * metadata  representing one or more bindings found in the provided text
       * and any "literal" text in between.  Any non-literal parts will be passed
       * to `_evaluateBinding` when any dependencies change.  The only required
       * fields of each "part" in the returned array are as follows:
       *
       * - `dependencies` - Array containing trigger metadata for each property
       *   that should trigger the binding to update
       * - `literal` - String containing text if the part represents a literal;
       *   in this case no `dependencies` are needed
       *
       * Additional metadata for use by `_evaluateBinding` may be provided in
       * each part object as needed.
       *
       * The default implementation handles the following types of bindings
       * (one or more may be intermixed with literal strings):
       * - Property binding: `[[prop]]`
       * - Path binding: `[[object.prop]]`
       * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
       * - Two-way property or path bindings (supports negation):
       *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
       * - Inline computed method (supports negation):
       *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
       *
       * @param {string} text Text to parse from attribute or textContent
       * @param {Object} templateInfo Current template metadata
       * @return {Array<!BindingPart>} Array of binding part metadata
       * @protected
       */
      static _parseBindings(text, templateInfo) {
        let parts = [];
        let lastIndex = 0;
        let m;
        // Example: "literal1{{prop}}literal2[[!compute(foo,bar)]]final"
        // Regex matches:
        //        Iteration 1:  Iteration 2:
        // m[1]: '{{'          '[['
        // m[2]: ''            '!'
        // m[3]: 'prop'        'compute(foo,bar)'
        while ((m = bindingRegex.exec(text)) !== null) {
          // Add literal part
          if (m.index > lastIndex) {
            parts.push({literal: text.slice(lastIndex, m.index)});
          }
          // Add binding part
          let mode = m[1][0];
          let negate = Boolean(m[2]);
          let source = m[3].trim();
          let customEvent = false, notifyEvent = '', colon = -1;
          if (mode == '{' && (colon = source.indexOf('::')) > 0) {
            notifyEvent = source.substring(colon + 2);
            source = source.substring(0, colon);
            customEvent = true;
          }
          let signature = parseMethod(source);
          let dependencies = [];
          if (signature) {
            // Inline computed function
            let {args, methodName} = signature;
            for (let i=0; i<args.length; i++) {
              let arg = args[i];
              if (!arg.literal) {
                dependencies.push(arg);
              }
            }
            let dynamicFns = templateInfo.dynamicFns;
            if (dynamicFns && dynamicFns[methodName] || signature.static) {
              dependencies.push(methodName);
              signature.dynamicFn = true;
            }
          } else {
            // Property or path
            dependencies.push(source);
          }
          parts.push({
            source, mode, negate, customEvent, signature, dependencies,
            event: notifyEvent
          });
          lastIndex = bindingRegex.lastIndex;
        }
        // Add a final literal part
        if (lastIndex && lastIndex < text.length) {
          let literal = text.substring(lastIndex);
          if (literal) {
            parts.push({
              literal: literal
            });
          }
        }
        if (parts.length) {
          return parts;
        } else {
          return null;
        }
      }

      /**
       * Called to evaluate a previously parsed binding part based on a set of
       * one or more changed dependencies.
       *
       * @param {this} inst Element that should be used as scope for
       *   binding dependencies
       * @param {BindingPart} part Binding part metadata
       * @param {string} path Property/path that triggered this effect
       * @param {Object} props Bag of current property changes
       * @param {Object} oldProps Bag of previous values for changed properties
       * @param {boolean} hasPaths True with `props` contains one or more paths
       * @return {*} Value the binding part evaluated to
       * @protected
       */
      static _evaluateBinding(inst, part, path, props, oldProps, hasPaths) {
        let value;
        if (part.signature) {
          value = runMethodEffect(inst, path, props, oldProps, part.signature);
        } else if (path != part.source) {
          value = Polymer.Path.get(inst, part.source);
        } else {
          if (hasPaths && Polymer.Path.isPath(path)) {
            value = Polymer.Path.get(inst, path);
          } else {
            value = inst.__data[path];
          }
        }
        if (part.negate) {
          value = !value;
        }
        return value;
      }

    }

    // make a typing for closure :P
    PropertyEffectsType = PropertyEffects;

    return PropertyEffects;
  });

  /**
   * Helper api for enqueing client dom created by a host element.
   *
   * By default elements are flushed via `_flushProperties` when
   * `connectedCallback` is called. Elements attach their client dom to
   * themselves at `ready` time which results from this first flush.
   * This provides an ordering guarantee that the client dom an element
   * creates is flushed before the element itself (i.e. client `ready`
   * fires before host `ready`).
   *
   * However, if `_flushProperties` is called *before* an element is connected,
   * as for example `Templatize` does, this ordering guarantee cannot be
   * satisfied because no elements are connected. (Note: Bound elements that
   * receive data do become enqueued clients and are properly ordered but
   * unbound elements are not.)
   *
   * To maintain the desired "client before host" ordering guarantee for this
   * case we rely on the "host stack. Client nodes registers themselves with
   * the creating host element when created. This ensures that all client dom
   * is readied in the proper order, maintaining the desired guarantee.
   *
   * @private
   */
  let hostStack = {

    stack: [],

    /**
     * @param {*} inst Instance to add to hostStack
     * @this {hostStack}
     */
    registerHost(inst) {
      if (this.stack.length) {
        let host = this.stack[this.stack.length-1];
        host._enqueueClient(inst);
      }
    },

    /**
     * @param {*} inst Instance to begin hosting
     * @this {hostStack}
     */
    beginHosting(inst) {
      this.stack.push(inst);
    },

    /**
     * @param {*} inst Instance to end hosting
     * @this {hostStack}
     */
    endHosting(inst) {
      let stackLen = this.stack.length;
      if (stackLen && this.stack[stackLen-1] == inst) {
        this.stack.pop();
      }
    }

  }

})();



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);


(function() {

  'use strict';

  /** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */
  let AsyncInterface; // eslint-disable-line no-unused-vars

  // Microtask implemented using Mutation Observer
  let microtaskCurrHandle = 0;
  let microtaskLastHandle = 0;
  let microtaskCallbacks = [];
  let microtaskNodeContent = 0;
  let microtaskNode = document.createTextNode('');
  new window.MutationObserver(microtaskFlush).observe(microtaskNode, {characterData: true});

  function microtaskFlush() {
    const len = microtaskCallbacks.length;
    for (let i = 0; i < len; i++) {
      let cb = microtaskCallbacks[i];
      if (cb) {
        try {
          cb();
        } catch (e) {
          setTimeout(() => { throw e });
        }
      }
    }
    microtaskCallbacks.splice(0, len);
    microtaskLastHandle += len;
  }

  /**
   * Module that provides a number of strategies for enqueuing asynchronous
   * tasks.  Each sub-module provides a standard `run(fn)` interface that returns a
   * handle, and a `cancel(handle)` interface for canceling async tasks before
   * they run.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module that provides a number of strategies for enqueuing asynchronous
   * tasks.
   */
  Polymer.Async = {

    /**
     * Async interface wrapper around `setTimeout`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `setTimeout`.
     */
    timeOut: {
      /**
       * Returns a sub-module with the async interface providing the provided
       * delay.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} delay Time to wait before calling callbacks in ms
       * @return {AsyncInterface} An async timeout interface
       */
      after(delay) {
        return  {
          run(fn) { return setTimeout(fn, delay) },
          cancel: window.clearTimeout.bind(window)
        }
      },
      /**
       * Enqueues a function called in the next task.
       *
       * @memberof Polymer.Async.timeOut
       * @param {Function} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run: window.setTimeout.bind(window),
      /**
       * Cancels a previously enqueued `timeOut` callback.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: window.clearTimeout.bind(window)
    },

    /**
     * Async interface wrapper around `requestAnimationFrame`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `requestAnimationFrame`.
     */
    animationFrame: {
      /**
       * Enqueues a function called at `requestAnimationFrame` timing.
       *
       * @memberof Polymer.Async.animationFrame
       * @param {Function} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run: window.requestAnimationFrame.bind(window),
      /**
       * Cancels a previously enqueued `animationFrame` callback.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: window.cancelAnimationFrame.bind(window)
    },

    /**
     * Async interface wrapper around `requestIdleCallback`.  Falls back to
     * `setTimeout` on browsers that do not support `requestIdleCallback`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `requestIdleCallback`.
     */
    idlePeriod: {
      /**
       * Enqueues a function called at `requestIdleCallback` timing.
       *
       * @memberof Polymer.Async.idlePeriod
       * @param {function(IdleDeadline)} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run(fn) {
        return window.requestIdleCallback ?
          window.requestIdleCallback(fn) :
          window.setTimeout(fn, 16);
      },
      /**
       * Cancels a previously enqueued `idlePeriod` callback.
       *
       * @memberof Polymer.Async.idlePeriod
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel(handle) {
        window.cancelIdleCallback ?
          window.cancelIdleCallback(handle) :
          window.clearTimeout(handle);
      }
    },

    /**
     * Async interface for enqueueing callbacks that run at microtask timing.
     *
     * Note that microtask timing is achieved via a single `MutationObserver`,
     * and thus callbacks enqueued with this API will all run in a single
     * batch, and not interleaved with other microtasks such as promises.
     * Promises are avoided as an implementation choice for the time being
     * due to Safari bugs that cause Promises to lack microtask guarantees.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface for enqueueing callbacks that run at microtask
     *   timing.
     */
    microTask: {

      /**
       * Enqueues a function called at microtask timing.
       *
       * @memberof Polymer.Async.microTask
       * @param {Function} callback Callback to run
       * @return {number} Handle used for canceling task
       */
      run(callback) {
        microtaskNode.textContent = microtaskNodeContent++;
        microtaskCallbacks.push(callback);
        return microtaskCurrHandle++;
      },

      /**
       * Cancels a previously enqueued `microTask` callback.
       *
       * @memberof Polymer.Async.microTask
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel(handle) {
        const idx = handle - microtaskLastHandle;
        if (idx >= 0) {
          if (!microtaskCallbacks[idx]) {
            throw new Error('invalid async handle: ' + handle);
          }
          microtaskCallbacks[idx] = null;
        }
      }

    }
  };

})();



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(1);


(function() {
  'use strict';

  // Common implementation for mixin & behavior
  function mutablePropertyChange(inst, property, value, old, mutableData) {
    let isObject;
    if (mutableData) {
      isObject = (typeof value === 'object' && value !== null);
      // Pull `old` for Objects from temp cache, but treat `null` as a primitive
      if (isObject) {
        old = inst.__dataTemp[property];
      }
    }
    // Strict equality check, but return false for NaN===NaN
    let shouldChange = (old !== value && (old === old || value === value));
    // Objects are stored in temporary cache (cleared at end of
    // turn), which is used for dirty-checking
    if (isObject && shouldChange) {
      inst.__dataTemp[property] = value;
    }
    return shouldChange;
  }

  /**
   * Element class mixin to skip strict dirty-checking for objects and arrays
   * (always consider them to be "dirty"), for use on elements utilizing
   * `Polymer.PropertyEffects`
   *
   * By default, `Polymer.PropertyEffects` performs strict dirty checking on
   * objects, which means that any deep modifications to an object or array will
   * not be propagated unless "immutable" data patterns are used (i.e. all object
   * references from the root to the mutation were changed).
   *
   * Polymer also provides a proprietary data mutation and path notification API
   * (e.g. `notifyPath`, `set`, and array mutation API's) that allow efficient
   * mutation and notification of deep changes in an object graph to all elements
   * bound to the same object graph.
   *
   * In cases where neither immutable patterns nor the data mutation API can be
   * used, applying this mixin will cause Polymer to skip dirty checking for
   * objects and arrays (always consider them to be "dirty").  This allows a
   * user to make a deep modification to a bound object graph, and then either
   * simply re-set the object (e.g. `this.items = this.items`) or call `notifyPath`
   * (e.g. `this.notifyPath('items')`) to update the tree.  Note that all
   * elements that wish to be updated based on deep mutations must apply this
   * mixin or otherwise skip strict dirty checking for objects/arrays.
   *
   * In order to make the dirty check strategy configurable, see
   * `Polymer.OptionalMutableData`.
   *
   * Note, the performance characteristics of propagating large object graphs
   * will be worse as opposed to using strict dirty checking with immutable
   * patterns or Polymer's path notification API.
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin to skip strict dirty-checking for objects
   *   and arrays
   */
  Polymer.MutableData = Polymer.dedupingMixin(superClass => {

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_MutableData}
     */
    class MutableData extends superClass {
      /**
       * Overrides `Polymer.PropertyEffects` to provide option for skipping
       * strict equality checking for Objects and Arrays.
       *
       * This method pulls the value to dirty check against from the `__dataTemp`
       * cache (rather than the normal `__data` cache) for Objects.  Since the temp
       * cache is cleared at the end of a turn, this implementation allows
       * side-effects of deep object changes to be processed by re-setting the
       * same object (using the temp cache as an in-turn backstop to prevent
       * cycles due to 2-way notification).
       *
       * @param {string} property Property name
       * @param {*} value New property value
       * @param {*} old Previous property value
       * @return {boolean} Whether the property should be considered a change
       * @protected
       */
      _shouldPropertyChange(property, value, old) {
        return mutablePropertyChange(this, property, value, old, true);
      }

    }
    /** @type {boolean} */
    MutableData.prototype.mutableData = false;

    return MutableData;

  });


  /**
   * Element class mixin to add the optional ability to skip strict
   * dirty-checking for objects and arrays (always consider them to be
   * "dirty") by setting a `mutable-data` attribute on an element instance.
   *
   * By default, `Polymer.PropertyEffects` performs strict dirty checking on
   * objects, which means that any deep modifications to an object or array will
   * not be propagated unless "immutable" data patterns are used (i.e. all object
   * references from the root to the mutation were changed).
   *
   * Polymer also provides a proprietary data mutation and path notification API
   * (e.g. `notifyPath`, `set`, and array mutation API's) that allow efficient
   * mutation and notification of deep changes in an object graph to all elements
   * bound to the same object graph.
   *
   * In cases where neither immutable patterns nor the data mutation API can be
   * used, applying this mixin will allow Polymer to skip dirty checking for
   * objects and arrays (always consider them to be "dirty").  This allows a
   * user to make a deep modification to a bound object graph, and then either
   * simply re-set the object (e.g. `this.items = this.items`) or call `notifyPath`
   * (e.g. `this.notifyPath('items')`) to update the tree.  Note that all
   * elements that wish to be updated based on deep mutations must apply this
   * mixin or otherwise skip strict dirty checking for objects/arrays.
   *
   * While this mixin adds the ability to forgo Object/Array dirty checking,
   * the `mutableData` flag defaults to false and must be set on the instance.
   *
   * Note, the performance characteristics of propagating large object graphs
   * will be worse by relying on `mutableData: true` as opposed to using
   * strict dirty checking with immutable patterns or Polymer's path notification
   * API.
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin to optionally skip strict dirty-checking
   *   for objects and arrays
   */
  Polymer.OptionalMutableData = Polymer.dedupingMixin(superClass => {

    /**
     * @mixinClass
     * @polymer
     * @implements {Polymer_OptionalMutableData}
     */
    class OptionalMutableData extends superClass {

      static get properties() {
        return {
          /**
           * Instance-level flag for configuring the dirty-checking strategy
           * for this element.  When true, Objects and Arrays will skip dirty
           * checking, otherwise strict equality checking will be used.
           */
          mutableData: Boolean
        };
      }

      /**
       * Overrides `Polymer.PropertyEffects` to provide option for skipping
       * strict equality checking for Objects and Arrays.
       *
       * When `this.mutableData` is true on this instance, this method
       * pulls the value to dirty check against from the `__dataTemp` cache
       * (rather than the normal `__data` cache) for Objects.  Since the temp
       * cache is cleared at the end of a turn, this implementation allows
       * side-effects of deep object changes to be processed by re-setting the
       * same object (using the temp cache as an in-turn backstop to prevent
       * cycles due to 2-way notification).
       *
       * @param {string} property Property name
       * @param {*} value New property value
       * @param {*} old Previous property value
       * @return {boolean} Whether the property should be considered a change
       * @protected
       */
      _shouldPropertyChange(property, value, old) {
        return mutablePropertyChange(this, property, value, old, this.mutableData);
      }
    }

    return OptionalMutableData;

  });

  // Export for use by legacy behavior
  Polymer.MutableData._mutablePropertyChange = mutablePropertyChange;

})();



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/!function(a){var b="\n    <title></title>\n\n    \n    <link href=\"https://fonts.googleapis.com/css?family=Roboto:100\" rel=\"stylesheet\">\n\n    \n    \n    \n    \n    \n    \n\n    \n    \n    \n\n    \n    \n    \n    \n    \n\n    <style type=\"text/css\">html,body{margin:0;padding:0;height:100%;font-weight:100;font-family:Roboto,sans-serif;}</style>\n";if(a.head){var c=a.head,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);!function(a){var b="\n    <shader-editor></shader-editor>\n\n";if(a.body){var c=a.body,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);
__webpack_require__(10);

__webpack_require__(12);

__webpack_require__(14);

__webpack_require__(16);

__webpack_require__(18);

__webpack_require__(5);

__webpack_require__(27);

__webpack_require__(31);

__webpack_require__(32);

__webpack_require__(33);

__webpack_require__(34);

__webpack_require__(35);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2)(__webpack_require__(11))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "(function(){/*\n\n Copyright (c) 2016 The Polymer Project Authors. All rights reserved.\n This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n Code distributed by Google as part of the polymer project is also\n subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n\n Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n Code distributed by Google as part of the polymer project is also\n subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n\nCopyright (c) 2016 The Polymer Project Authors. All rights reserved.\nThis code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\nThe complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\nThe complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\nCode distributed by Google as part of the polymer project is also\nsubject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n\nCopyright (c) 2017 The Polymer Project Authors. All rights reserved.\nThis code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\nThe complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\nThe complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\nCode distributed by Google as part of the polymer project is also\nsubject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n*/\n'use strict';var Jb=\"undefined\"!=typeof window&&window===this?this:\"undefined\"!=typeof global&&null!=global?global:this;\n(function(){function k(){var a=this;this.s={};this.g=document.documentElement;var b=new Ka;b.rules=[];this.h=t.set(this.g,new t(b));this.i=!1;this.b=this.a=null;Kb(function(){a.c()})}function F(){this.customStyles=[];this.enqueued=!1}function Lb(){}function pa(a){this.cache={};this.c=void 0===a?100:a}function p(){}function t(a,b,c,d,e){this.G=a||null;this.b=b||null;this.ra=c||[];this.P=null;this.Z=e||\"\";this.a=this.B=this.K=null}function r(){}function Ka(){this.end=this.start=0;this.rules=this.parent=\nthis.previous=null;this.cssText=this.parsedCssText=\"\";this.atRule=!1;this.type=0;this.parsedSelector=this.selector=this.keyframesName=\"\"}function Id(a){function b(b,c){Object.defineProperty(b,\"innerHTML\",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(b){var d=this,e=void 0;n(this)&&(e=[],P(this,function(a){a!==d&&e.push(a)}));c.set.call(this,b);if(e)for(var f=0;f<e.length;f++){var g=e[f];1===g.__CE_state&&a.disconnectedCallback(g)}this.ownerDocument.__CE_hasRegistry?a.f(this):a.l(this);\nreturn b}})}function c(b,c){u(b,\"insertAdjacentElement\",function(b,d){var e=n(d);b=c.call(this,b,d);e&&a.a(d);n(b)&&a.b(d);return b})}Mb?u(Element.prototype,\"attachShadow\",function(a){return this.__CE_shadowRoot=a=Mb.call(this,a)}):console.warn(\"Custom Elements: `Element#attachShadow` was not patched.\");if(La&&La.get)b(Element.prototype,La);else if(Ma&&Ma.get)b(HTMLElement.prototype,Ma);else{var d=Na.call(document,\"div\");a.v(function(a){b(a,{enumerable:!0,configurable:!0,get:function(){return Nb.call(this,\n!0).innerHTML},set:function(a){var b=\"template\"===this.localName?this.content:this;for(d.innerHTML=a;0<b.childNodes.length;)Oa.call(b,b.childNodes[0]);for(;0<d.childNodes.length;)qa.call(b,d.childNodes[0])}})})}u(Element.prototype,\"setAttribute\",function(b,c){if(1!==this.__CE_state)return Ob.call(this,b,c);var d=Pa.call(this,b);Ob.call(this,b,c);c=Pa.call(this,b);a.attributeChangedCallback(this,b,d,c,null)});u(Element.prototype,\"setAttributeNS\",function(b,c,d){if(1!==this.__CE_state)return Pb.call(this,\nb,c,d);var e=ra.call(this,b,c);Pb.call(this,b,c,d);d=ra.call(this,b,c);a.attributeChangedCallback(this,c,e,d,b)});u(Element.prototype,\"removeAttribute\",function(b){if(1!==this.__CE_state)return Qb.call(this,b);var c=Pa.call(this,b);Qb.call(this,b);null!==c&&a.attributeChangedCallback(this,b,c,null,null)});u(Element.prototype,\"removeAttributeNS\",function(b,c){if(1!==this.__CE_state)return Rb.call(this,b,c);var d=ra.call(this,b,c);Rb.call(this,b,c);var e=ra.call(this,b,c);d!==e&&a.attributeChangedCallback(this,\nc,d,e,b)});Sb?c(HTMLElement.prototype,Sb):Tb?c(Element.prototype,Tb):console.warn(\"Custom Elements: `Element#insertAdjacentElement` was not patched.\");Ub(a,Element.prototype,{Ka:Jd,append:Kd});Ld(a,{kb:Md,jb:Nd,replaceWith:Od,remove:Pd})}function Ld(a,b){var c=Element.prototype;c.before=function(c){for(var d=[],f=0;f<arguments.length;++f)d[f-0]=arguments[f];f=d.filter(function(a){return a instanceof Node&&n(a)});b.kb.apply(this,d);for(var g=0;g<f.length;g++)a.a(f[g]);if(n(this))for(f=0;f<d.length;f++)g=\nd[f],g instanceof Element&&a.b(g)};c.after=function(c){for(var d=[],f=0;f<arguments.length;++f)d[f-0]=arguments[f];f=d.filter(function(a){return a instanceof Node&&n(a)});b.jb.apply(this,d);for(var g=0;g<f.length;g++)a.a(f[g]);if(n(this))for(f=0;f<d.length;f++)g=d[f],g instanceof Element&&a.b(g)};c.replaceWith=function(c){for(var d=[],f=0;f<arguments.length;++f)d[f-0]=arguments[f];f=d.filter(function(a){return a instanceof Node&&n(a)});var g=n(this);b.replaceWith.apply(this,d);for(var h=0;h<f.length;h++)a.a(f[h]);\nif(g)for(a.a(this),f=0;f<d.length;f++)g=d[f],g instanceof Element&&a.b(g)};c.remove=function(){var c=n(this);b.remove.call(this);c&&a.a(this)}}function Qd(a){function b(b,d){Object.defineProperty(b,\"textContent\",{enumerable:d.enumerable,configurable:!0,get:d.get,set:function(b){if(this.nodeType===Node.TEXT_NODE)d.set.call(this,b);else{var c=void 0;if(this.firstChild){var e=this.childNodes,h=e.length;if(0<h&&n(this)){c=Array(h);for(var m=0;m<h;m++)c[m]=e[m]}}d.set.call(this,b);if(c)for(b=0;b<c.length;b++)a.a(c[b])}}})}\nu(Node.prototype,\"insertBefore\",function(b,d){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=Vb.call(this,b,d);if(n(this))for(d=0;d<c.length;d++)a.b(c[d]);return b}c=n(b);d=Vb.call(this,b,d);c&&a.a(b);n(this)&&a.b(b);return d});u(Node.prototype,\"appendChild\",function(b){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=qa.call(this,b);if(n(this))for(var e=0;e<c.length;e++)a.b(c[e]);return b}c=n(b);e=qa.call(this,b);c&&a.a(b);n(this)&&\na.b(b);return e});u(Node.prototype,\"cloneNode\",function(b){b=Nb.call(this,b);this.ownerDocument.__CE_hasRegistry?a.f(b):a.l(b);return b});u(Node.prototype,\"removeChild\",function(b){var c=n(b),e=Oa.call(this,b);c&&a.a(b);return e});u(Node.prototype,\"replaceChild\",function(b,d){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=Wb.call(this,b,d);if(n(this))for(a.a(d),d=0;d<c.length;d++)a.b(c[d]);return b}c=n(b);var f=Wb.call(this,b,d),g=n(this);g&&a.a(d);c&&a.a(b);g&&\na.b(b);return f});Qa&&Qa.get?b(Node.prototype,Qa):a.v(function(a){b(a,{enumerable:!0,configurable:!0,get:function(){for(var a=[],b=0;b<this.childNodes.length;b++)a.push(this.childNodes[b].textContent);return a.join(\"\")},set:function(a){for(;this.firstChild;)Oa.call(this,this.firstChild);qa.call(this,document.createTextNode(a))}})})}function Rd(a){u(Document.prototype,\"createElement\",function(b){if(this.__CE_hasRegistry){var c=a.c(b);if(c)return new c.constructor}b=Na.call(this,b);a.g(b);return b});\nu(Document.prototype,\"importNode\",function(b,c){b=Sd.call(this,b,c);this.__CE_hasRegistry?a.f(b):a.l(b);return b});u(Document.prototype,\"createElementNS\",function(b,c){if(this.__CE_hasRegistry&&(null===b||\"http://www.w3.org/1999/xhtml\"===b)){var d=a.c(c);if(d)return new d.constructor}b=Td.call(this,b,c);a.g(b);return b});Ub(a,Document.prototype,{Ka:Ud,append:Vd})}function Ub(a,b,c){b.prepend=function(b){for(var d=[],f=0;f<arguments.length;++f)d[f-0]=arguments[f];f=d.filter(function(a){return a instanceof\nNode&&n(a)});c.Ka.apply(this,d);for(var g=0;g<f.length;g++)a.a(f[g]);if(n(this))for(f=0;f<d.length;f++)g=d[f],g instanceof Element&&a.b(g)};b.append=function(b){for(var d=[],f=0;f<arguments.length;++f)d[f-0]=arguments[f];f=d.filter(function(a){return a instanceof Node&&n(a)});c.append.apply(this,d);for(var g=0;g<f.length;g++)a.a(f[g]);if(n(this))for(f=0;f<d.length;f++)g=d[f],g instanceof Element&&a.b(g)}}function Wd(a){window.HTMLElement=function(){function b(){var b=this.constructor,d=a.C(b);if(!d)throw Error(\"The custom element being constructed was not registered with `customElements`.\");\nvar e=d.constructionStack;if(0===e.length)return e=Na.call(document,d.localName),Object.setPrototypeOf(e,b.prototype),e.__CE_state=1,e.__CE_definition=d,a.g(e),e;d=e.length-1;var f=e[d];if(f===Xb)throw Error(\"The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.\");e[d]=Xb;Object.setPrototypeOf(f,b.prototype);a.g(f);return f}b.prototype=Xd.prototype;return b}()}function x(a){this.c=!1;this.a=a;this.h=new Map;this.f=function(a){return a()};this.b=!1;\nthis.g=[];this.i=new Ra(a,document)}function Yb(){var a=this;this.b=this.a=void 0;this.c=new Promise(function(b){a.b=b;a.a&&b(a.a)})}function Ra(a,b){this.b=a;this.a=b;this.N=void 0;this.b.f(this.a);\"loading\"===this.a.readyState&&(this.N=new MutationObserver(this.f.bind(this)),this.N.observe(this.a,{childList:!0,subtree:!0}))}function z(){this.u=new Map;this.s=new Map;this.j=[];this.h=!1}function l(a,b,c){if(a!==Zb)throw new TypeError(\"Illegal constructor\");a=document.createDocumentFragment();a.__proto__=\nl.prototype;a.D(b,c);return a}function sa(a){if(!a.__shady||void 0===a.__shady.firstChild){a.__shady=a.__shady||{};a.__shady.firstChild=Sa(a);a.__shady.lastChild=Ta(a);$b(a);for(var b=a.__shady.childNodes=U(a),c=0,d;c<b.length&&(d=b[c]);c++)d.__shady=d.__shady||{},d.__shady.parentNode=a,d.__shady.nextSibling=b[c+1]||null,d.__shady.previousSibling=b[c-1]||null,ac(d)}}function Yd(a){var b=a&&a.N;b&&(b.ba.delete(a.ab),b.ba.size||(a.fb.__shady.X=null))}function Zd(a,b){a.__shady=a.__shady||{};a.__shady.X||\n(a.__shady.X=new ta);a.__shady.X.ba.add(b);var c=a.__shady.X;return{ab:b,N:c,fb:a,takeRecords:function(){return c.takeRecords()}}}function ta(){this.a=!1;this.addedNodes=[];this.removedNodes=[];this.ba=new Set}function Q(a,b){V[W]=a;V[W+1]=b;W+=2;2===W&&(Ua?Ua(X):$d())}function ae(){return function(){return process.Gb(X)}}function be(){return\"undefined\"!==typeof Va?function(){Va(X)}:Wa()}function ce(){var a=0,b=new bc(X),c=document.createTextNode(\"\");b.observe(c,{characterData:!0});return function(){c.data=\na=++a%2}}function de(){var a=new MessageChannel;a.port1.onmessage=X;return function(){return a.port2.postMessage(0)}}function Wa(){var a=setTimeout;return function(){return a(X,1)}}function X(){for(var a=0;a<W;a+=2)(0,V[a])(V[a+1]),V[a]=void 0,V[a+1]=void 0;W=0}function ee(){try{var a=require(\"vertx\");Va=a.Ib||a.Hb;return be()}catch(b){return Wa()}}function Xa(a,b){var c=this,d=new this.constructor(Y);void 0===d[ua]&&cc(d);var e=c.o;if(e){var f=arguments[e-1];Q(function(){return dc(e,d,f,c.m)})}else Ya(c,\nd,a,b);return d}function Za(a){if(a&&\"object\"===typeof a&&a.constructor===this)return a;var b=new this(Y);ea(b,a);return b}function Y(){}function ec(a){try{return a.then}catch(b){return fa.error=b,fa}}function fe(a,b,c,d){try{a.call(b,c,d)}catch(e){return e}}function ge(a,b,c){Q(function(a){var d=!1,f=fe(c,b,function(c){d||(d=!0,b!==c?ea(a,c):K(a,c))},function(b){d||(d=!0,A(a,b))});!d&&f&&(d=!0,A(a,f))},a)}function he(a,b){1===b.o?K(a,b.m):2===b.o?A(a,b.m):Ya(b,void 0,function(b){return ea(a,b)},\nfunction(b){return A(a,b)})}function fc(a,b,c){b.constructor===a.constructor&&c===Xa&&b.constructor.resolve===Za?he(a,b):c===fa?(A(a,fa.error),fa.error=null):void 0===c?K(a,b):\"function\"===typeof c?ge(a,b,c):K(a,b)}function ea(a,b){if(a===b)A(a,new TypeError(\"You cannot resolve a promise with itself\"));else{var c=typeof b;null===b||\"object\"!==c&&\"function\"!==c?K(a,b):fc(a,b,ec(b))}}function ie(a){a.Ba&&a.Ba(a.m);$a(a)}function K(a,b){void 0===a.o&&(a.m=b,a.o=1,0!==a.U.length&&Q($a,a))}function A(a,\nb){void 0===a.o&&(a.o=2,a.m=b,Q(ie,a))}function Ya(a,b,c,d){var e=a.U,f=e.length;a.Ba=null;e[f]=b;e[f+1]=c;e[f+2]=d;0===f&&a.o&&Q($a,a)}function $a(a){var b=a.U,c=a.o;if(0!==b.length){for(var d,e,f=a.m,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?dc(c,d,e,f):e(f);a.U.length=0}}function gc(){this.error=null}function dc(a,b,c,d){var e=\"function\"===typeof c;if(e){try{var f=c(d)}catch(H){ab.error=H,f=ab}if(f===ab){var g=!0;var h=f.error;f.error=null}else var m=!0;if(b===f){A(b,new TypeError(\"A promises callback cannot return that same promise.\"));\nreturn}}else f=d,m=!0;void 0===b.o&&(e&&m?ea(b,f):g?A(b,h):1===a?K(b,f):2===a&&A(b,f))}function je(a,b){try{b(function(b){ea(a,b)},function(b){A(a,b)})}catch(c){A(a,c)}}function cc(a){a[ua]=hc++;a.o=void 0;a.m=void 0;a.U=[]}function ha(a,b){this.eb=a;this.J=new a(Y);this.J[ua]||cc(this.J);ic(b)?(this.$=this.length=b.length,this.m=Array(this.length),0===this.length?K(this.J,this.m):(this.length=this.length||0,this.cb(b),0===this.$&&K(this.J,this.m))):A(this.J,Error(\"Array Methods must be provided an Array\"))}\nfunction y(a){this[ua]=hc++;this.m=this.o=void 0;this.U=[];if(Y!==a){if(\"function\"!==typeof a)throw new TypeError(\"You must pass a resolver function as the first argument to the promise constructor\");if(this instanceof y)je(this,a);else throw new TypeError(\"Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.\");}}function Z(a){return a.__shady&&void 0!==a.__shady.firstChild}function I(a){return\"ShadyRoot\"===a.Wa}function ia(a){a=a.getRootNode();\nif(I(a))return a}function bb(a,b){if(a&&b)for(var c=Object.getOwnPropertyNames(b),d=0,e;d<c.length&&(e=c[d]);d++){var f=Object.getOwnPropertyDescriptor(b,e);f&&Object.defineProperty(a,e,f)}}function cb(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];for(d=0;d<c.length;d++)bb(a,c[d]);return a}function ke(a,b){for(var c in b)a[c]=b[c]}function jc(a){db.push(a);eb.textContent=kc++}function lc(a){fb||(fb=!0,jc(va));ja.push(a)}function va(){fb=!1;for(var a=!!ja.length;ja.length;)ja.shift()();\nreturn a}function le(a,b){var c=b.getRootNode();return a.map(function(a){var b=c===a.target.getRootNode();if(b&&a.addedNodes){if(b=Array.from(a.addedNodes).filter(function(a){return c===a.getRootNode()}),b.length)return a=Object.create(a),Object.defineProperty(a,\"addedNodes\",{value:b,configurable:!0}),a}else if(b)return a}).filter(function(a){return a})}function mc(a){switch(a){case \"&\":return\"&amp;\";case \"<\":return\"&lt;\";case \">\":return\"&gt;\";case '\"':return\"&quot;\";case \"\\u00a0\":return\"&nbsp;\"}}\nfunction nc(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=!0;return b}function gb(a,b){\"template\"===a.localName&&(a=a.content);for(var c=\"\",d=b?b(a):a.childNodes,e=0,f=d.length,g;e<f&&(g=d[e]);e++){a:{var h=g;var m=a;var H=b;switch(h.nodeType){case Node.ELEMENT_NODE:for(var k=h.localName,l=\"<\"+k,n=h.attributes,p=0;m=n[p];p++)l+=\" \"+m.name+'=\"'+m.value.replace(me,mc)+'\"';l+=\">\";h=ne[k]?l:l+gb(h,H)+\"</\"+k+\">\";break a;case Node.TEXT_NODE:h=h.data;h=m&&oe[m.localName]?h:h.replace(pe,mc);break a;case Node.COMMENT_NODE:h=\n\"\\x3c!--\"+h.data+\"--\\x3e\";break a;default:throw window.console.error(h),Error(\"not implemented\");}}c+=h}return c}function aa(a){B.currentNode=a;return B.parentNode()}function Sa(a){B.currentNode=a;return B.firstChild()}function Ta(a){B.currentNode=a;return B.lastChild()}function oc(a){B.currentNode=a;return B.previousSibling()}function pc(a){B.currentNode=a;return B.nextSibling()}function U(a){var b=[];B.currentNode=a;for(a=B.firstChild();a;)b.push(a),a=B.nextSibling();return b}function qc(a){C.currentNode=\na;return C.parentNode()}function rc(a){C.currentNode=a;return C.firstChild()}function sc(a){C.currentNode=a;return C.lastChild()}function tc(a){C.currentNode=a;return C.previousSibling()}function uc(a){C.currentNode=a;return C.nextSibling()}function vc(a){var b=[];C.currentNode=a;for(a=C.firstChild();a;)b.push(a),a=C.nextSibling();return b}function wc(a){return gb(a,function(a){return U(a)})}function xc(a){switch(a.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:a=document.createTreeWalker(a,\nNodeFilter.SHOW_TEXT,null,!1);for(var b=\"\",c;c=a.nextNode();)b+=c.nodeValue;return b;default:return a.nodeValue}}function M(a,b,c){for(var d in b){var e=Object.getOwnPropertyDescriptor(a,d);e&&e.configurable||!e&&c?Object.defineProperty(a,d,b[d]):c&&console.warn(\"Could not define\",d,\"on\",a)}}function R(a){M(a,yc);M(a,hb);M(a,ib)}function zc(a,b,c){ac(a);c=c||null;a.__shady=a.__shady||{};b.__shady=b.__shady||{};c&&(c.__shady=c.__shady||{});a.__shady.previousSibling=c?c.__shady.previousSibling:b.lastChild;\nvar d=a.__shady.previousSibling;d&&d.__shady&&(d.__shady.nextSibling=a);(d=a.__shady.nextSibling=c)&&d.__shady&&(d.__shady.previousSibling=a);a.__shady.parentNode=b;c?c===b.__shady.firstChild&&(b.__shady.firstChild=a):(b.__shady.lastChild=a,b.__shady.firstChild||(b.__shady.firstChild=a));b.__shady.childNodes=null}function jb(a,b,c){if(b===a)throw Error(\"Failed to execute 'appendChild' on 'Node': The new child element contains the parent.\");if(c){var d=c.__shady&&c.__shady.parentNode;if(void 0!==d&&\nd!==a||void 0===d&&aa(c)!==a)throw Error(\"Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.\");}if(c===b)return b;b.parentNode&&kb(b.parentNode,b);d=ia(a);var e;if(e=d)a:{if(!b.__noInsertionPoint){var f;\"slot\"===b.localName?f=[b]:b.querySelectorAll&&(f=b.querySelectorAll(\"slot\"));if(f&&f.length){e=f;break a}}e=void 0}f=e;d&&(\"slot\"===a.localName||f)&&d.M();if(Z(a)){e=c;$b(a);a.__shady=a.__shady||{};void 0!==a.__shady.firstChild&&\n(a.__shady.childNodes=null);if(b.nodeType===Node.DOCUMENT_FRAGMENT_NODE){for(var g=b.childNodes,h=0;h<g.length;h++)zc(g[h],a,e);b.__shady=b.__shady||{};e=void 0!==b.__shady.firstChild?null:void 0;b.__shady.firstChild=b.__shady.lastChild=e;b.__shady.childNodes=e}else zc(b,a,e);if(lb(a)){a.__shady.root.M();var m=!0}else a.__shady.root&&(m=!0)}m||(m=I(a)?a.host:a,c?(c=Ac(c),mb.call(m,b,c)):Bc.call(m,b));Cc(a,b);f&&d.$a(f);return b}function kb(a,b){if(b.parentNode!==a)throw Error(\"The node to be removed is not a child of this node: \"+\nb);var c=ia(b);if(Z(a)){b.__shady=b.__shady||{};a.__shady=a.__shady||{};b===a.__shady.firstChild&&(a.__shady.firstChild=b.__shady.nextSibling);b===a.__shady.lastChild&&(a.__shady.lastChild=b.__shady.previousSibling);var d=b.__shady.previousSibling;var e=b.__shady.nextSibling;d&&(d.__shady=d.__shady||{},d.__shady.nextSibling=e);e&&(e.__shady=e.__shady||{},e.__shady.previousSibling=d);b.__shady.parentNode=b.__shady.previousSibling=b.__shady.nextSibling=void 0;void 0!==a.__shady.childNodes&&(a.__shady.childNodes=\nnull);if(lb(a)){a.__shady.root.M();var f=!0}}Dc(b);c&&((e=a&&\"slot\"===a.localName)&&(f=!0),((d=c.gb(b))||e)&&c.M());f||(f=I(a)?a.host:a,(!a.__shady.root&&\"slot\"!==b.localName||f===aa(b))&&ka.call(f,b));Cc(a,null,b);return b}function Dc(a){if(a.__shady&&void 0!==a.__shady.sa)for(var b=a.childNodes,c=0,d=b.length,e;c<d&&(e=b[c]);c++)Dc(e);a.__shady&&(a.__shady.sa=void 0)}function Ac(a){var b=a;a&&\"slot\"===a.localName&&(b=(b=a.__shady&&a.__shady.V)&&b.length?b[0]:Ac(a.nextSibling));return b}function lb(a){return(a=\na&&a.__shady&&a.__shady.root)&&a.Aa()}function Ec(a,b){\"slot\"===b?(a=a.parentNode,lb(a)&&a.__shady.root.M()):\"slot\"===a.localName&&\"name\"===b&&(b=ia(a))&&(b.ib(a),b.M())}function Cc(a,b,c){if(a=a.__shady&&a.__shady.X)b&&a.addedNodes.push(b),c&&a.removedNodes.push(c),a.vb()}function Fc(a){if(a&&a.nodeType){a.__shady=a.__shady||{};var b=a.__shady.sa;void 0===b&&(I(a)?b=a:b=(b=a.parentNode)?Fc(b):a,document.documentElement.contains(a)&&(a.__shady.sa=b));return b}}function wa(a,b,c){var d=[];Gc(a.childNodes,\nb,c,d);return d}function Gc(a,b,c,d){for(var e=0,f=a.length,g;e<f&&(g=a[e]);e++){var h;if(h=g.nodeType===Node.ELEMENT_NODE){h=g;var m=b,H=c,k=d,l=m(h);l&&k.push(h);H&&H(l)?h=l:(Gc(h.childNodes,m,H,k),h=void 0)}if(h)break}}function Hc(a){a=a.getRootNode();I(a)&&a.Da()}function Ic(a,b,c){xa||(xa=window.ShadyCSS&&window.ShadyCSS.ScopingShim);xa&&\"class\"===b?xa.setElementClass(a,c):(Jc.call(a,b,c),Ec(a,b))}function Kc(a,b){if(a.ownerDocument!==document)return nb.call(document,a,b);var c=nb.call(document,\na,!1);if(b){a=a.childNodes;b=0;for(var d;b<a.length;b++)d=Kc(a[b],!0),c.appendChild(d)}return c}function ob(a,b){var c=[],d=a;for(a=a===window?window:a.getRootNode();d;)c.push(d),d=d.assignedSlot?d.assignedSlot:d.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&d.host&&(b||d!==a)?d.host:d.parentNode;c[c.length-1]===document&&c.push(window);return c}function Lc(a,b){if(!I)return a;a=ob(a,!0);for(var c=0,d,e,f,g;c<b.length;c++)if(d=b[c],f=d===window?window:d.getRootNode(),f!==e&&(g=a.indexOf(f),e=f),!I(f)||\n-1<g)return d}function pb(a){function b(b,d){b=new a(b,d);b.ia=d&&!!d.composed;return b}ke(b,a);b.prototype=a.prototype;return b}function Mc(a,b,c){if(c=b.__handlers&&b.__handlers[a.type]&&b.__handlers[a.type][c])for(var d=0,e;(e=c[d])&&a.target!==a.relatedTarget&&(e.call(b,a),!a.Ua);d++);}function qe(a){var b=a.composedPath();Object.defineProperty(a,\"currentTarget\",{get:function(){return d},configurable:!0});for(var c=b.length-1;0<=c;c--){var d=b[c];Mc(a,d,\"capture\");if(a.ja)return}Object.defineProperty(a,\n\"eventPhase\",{get:function(){return Event.AT_TARGET}});var e;for(c=0;c<b.length;c++){d=b[c];var f=d.__shady&&d.__shady.root;if(0===c||f&&f===e)if(Mc(a,d,\"bubble\"),d!==window&&(e=d.getRootNode()),a.ja)break}}function Nc(a,b,c,d,e,f){for(var g=0;g<a.length;g++){var h=a[g],m=h.type,H=h.capture,k=h.once,l=h.passive;if(b===h.node&&c===m&&d===H&&e===k&&f===l)return g}return-1}function Oc(a,b,c){if(b){if(\"object\"===typeof c){var d=!!c.capture;var e=!!c.once;var f=!!c.passive}else d=!!c,f=e=!1;var g=c&&c.ka||\nthis,h=b[la];if(h){if(-1<Nc(h,g,a,d,e,f))return}else b[la]=[];h=function(d){e&&this.removeEventListener(a,b,c);d.__target||Pc(d);if(g!==this){var f=Object.getOwnPropertyDescriptor(d,\"currentTarget\");Object.defineProperty(d,\"currentTarget\",{get:function(){return g},configurable:!0})}if(d.composed||-1<d.composedPath().indexOf(g))if(d.target===d.relatedTarget)d.eventPhase===Event.BUBBLING_PHASE&&d.stopImmediatePropagation();else if(d.eventPhase===Event.CAPTURING_PHASE||d.bubbles||d.target===g){var h=\n\"object\"===typeof b&&b.handleEvent?b.handleEvent(d):b.call(g,d);g!==this&&(f?(Object.defineProperty(d,\"currentTarget\",f),f=null):delete d.currentTarget);return h}};b[la].push({node:this,type:a,capture:d,once:e,passive:f,zb:h});qb[a]?(this.__handlers=this.__handlers||{},this.__handlers[a]=this.__handlers[a]||{capture:[],bubble:[]},this.__handlers[a][d?\"capture\":\"bubble\"].push(h)):(this instanceof Window?Qc:Rc).call(this,a,h,c)}}function Sc(a,b,c){if(b){if(\"object\"===typeof c){var d=!!c.capture;var e=\n!!c.once;var f=!!c.passive}else d=!!c,f=e=!1;var g=c&&c.ka||this,h=void 0;var m=null;try{m=b[la]}catch(H){}m&&(e=Nc(m,g,a,d,e,f),-1<e&&(h=m.splice(e,1)[0].zb,m.length||(b[la]=void 0)));(this instanceof Window?Tc:Uc).call(this,a,h||b,c);h&&qb[a]&&this.__handlers&&this.__handlers[a]&&(a=this.__handlers[a][d?\"capture\":\"bubble\"],h=a.indexOf(h),-1<h&&a.splice(h,1))}}function re(){for(var a in qb)window.addEventListener(a,function(a){a.__target||(Pc(a),qe(a))},!0)}function Pc(a){a.__target=a.target;a.ya=\na.relatedTarget;if(D.W){var b=Vc,c=Object.getPrototypeOf(a);if(!c.hasOwnProperty(\"__patchProto\")){var d=Object.create(c);d.Bb=c;bb(d,b);c.__patchProto=d}a.__proto__=c.__patchProto}else bb(a,Vc)}function ma(a,b){return{index:a,Y:[],aa:b}}function se(a,b,c,d){var e=0,f=0,g=0,h=0,m=Math.min(b-e,d-f);if(0==e&&0==f)a:{for(g=0;g<m;g++)if(a[g]!==c[g])break a;g=m}if(b==a.length&&d==c.length){h=a.length;for(var k=c.length,l=0;l<m-g&&te(a[--h],c[--k]);)l++;h=l}e+=g;f+=g;b-=h;d-=h;if(0==b-e&&0==d-f)return[];\nif(e==b){for(b=ma(e,0);f<d;)b.Y.push(c[f++]);return[b]}if(f==d)return[ma(e,b-e)];m=e;g=f;d=d-g+1;h=b-m+1;b=Array(d);for(k=0;k<d;k++)b[k]=Array(h),b[k][0]=k;for(k=0;k<h;k++)b[0][k]=k;for(k=1;k<d;k++)for(l=1;l<h;l++)if(a[m+l-1]===c[g+k-1])b[k][l]=b[k-1][l-1];else{var n=b[k-1][l]+1,p=b[k][l-1]+1;b[k][l]=n<p?n:p}m=b.length-1;g=b[0].length-1;d=b[m][g];for(a=[];0<m||0<g;)0==m?(a.push(2),g--):0==g?(a.push(3),m--):(h=b[m-1][g-1],k=b[m-1][g],l=b[m][g-1],n=k<l?k<h?k:h:l<h?l:h,n==h?(h==d?a.push(0):(a.push(1),\nd=h),m--,g--):n==k?(a.push(3),m--,d=k):(a.push(2),g--,d=l));a.reverse();b=void 0;m=[];for(g=0;g<a.length;g++)switch(a[g]){case 0:b&&(m.push(b),b=void 0);e++;f++;break;case 1:b||(b=ma(e,0));b.aa++;e++;b.Y.push(c[f]);f++;break;case 2:b||(b=ma(e,0));b.aa++;e++;break;case 3:b||(b=ma(e,0)),b.Y.push(c[f]),f++}b&&m.push(b);return m}function te(a,b){return a===b}function Wc(a){var b=[];do b.unshift(a);while(a=a.parentNode);return b}function Xc(a){Hc(a);return a.__shady&&a.__shady.assignedSlot||null}function N(a,\nb){for(var c=Object.getOwnPropertyNames(b),d=0;d<c.length;d++){var e=c[d],f=Object.getOwnPropertyDescriptor(b,e);f.value?a[e]=f.value:Object.defineProperty(a,e,f)}}function ue(){var a=window.customElements&&window.customElements.nativeHTMLElement||HTMLElement;N(window.Node.prototype,ve);N(window.Window.prototype,we);N(window.Text.prototype,xe);N(window.DocumentFragment.prototype,rb);N(window.Element.prototype,Yc);N(window.Document.prototype,Zc);window.HTMLSlotElement&&N(window.HTMLSlotElement.prototype,\n$c);N(a.prototype,ye);D.W&&(R(window.Node.prototype),R(window.Text.prototype),R(window.DocumentFragment.prototype),R(window.Element.prototype),R(a.prototype),R(window.Document.prototype),window.HTMLSlotElement&&R(window.HTMLSlotElement.prototype))}function ad(a){var b=ze.has(a);a=/^[a-z][.0-9_a-z]*-[\\-.0-9_a-z]*$/.test(a);return!b&&a}function n(a){var b=a.isConnected;if(void 0!==b)return b;for(;a&&!(a.__CE_isImportDocument||a instanceof Document);)a=a.parentNode||(window.ShadowRoot&&a instanceof ShadowRoot?\na.host:void 0);return!(!a||!(a.__CE_isImportDocument||a instanceof Document))}function sb(a,b){for(;b&&b!==a&&!b.nextSibling;)b=b.parentNode;return b&&b!==a?b.nextSibling:null}function P(a,b,c){c=c?c:new Set;for(var d=a;d;){if(d.nodeType===Node.ELEMENT_NODE){var e=d;b(e);var f=e.localName;if(\"link\"===f&&\"import\"===e.getAttribute(\"rel\")){d=e.import;if(d instanceof Node&&!c.has(d))for(c.add(d),d=d.firstChild;d;d=d.nextSibling)P(d,b,c);d=sb(a,e);continue}else if(\"template\"===f){d=sb(a,e);continue}if(e=\ne.__CE_shadowRoot)for(e=e.firstChild;e;e=e.nextSibling)P(e,b,c)}d=d.firstChild?d.firstChild:sb(a,d)}}function u(a,b,c){a[b]=c}function tb(a){a=a.replace(G.mb,\"\").replace(G.port,\"\");var b=bd,c=a,d=new Ka;d.start=0;d.end=c.length;for(var e=d,f=0,g=c.length;f<g;f++)if(\"{\"===c[f]){e.rules||(e.rules=[]);var h=e,m=h.rules[h.rules.length-1]||null;e=new Ka;e.start=f+1;e.parent=h;e.previous=m;h.rules.push(e)}else\"}\"===c[f]&&(e.end=f+1,e=e.parent||d);return b(d,a)}function bd(a,b){var c=b.substring(a.start,\na.end-1);a.parsedCssText=a.cssText=c.trim();a.parent&&(c=b.substring(a.previous?a.previous.end:a.parent.start,a.start-1),c=Ae(c),c=c.replace(G.Ja,\" \"),c=c.substring(c.lastIndexOf(\";\")+1),c=a.parsedSelector=a.selector=c.trim(),a.atRule=0===c.indexOf(\"@\"),a.atRule?0===c.indexOf(\"@media\")?a.type=L.MEDIA_RULE:c.match(G.rb)&&(a.type=L.ha,a.keyframesName=a.selector.split(G.Ja).pop()):a.type=0===c.indexOf(\"--\")?L.ua:L.STYLE_RULE);if(c=a.rules)for(var d=0,e=c.length,f;d<e&&(f=c[d]);d++)bd(f,b);return a}function Ae(a){return a.replace(/\\\\([0-9a-f]{1,6})\\s/gi,\nfunction(a,c){a=c;for(c=6-a.length;c--;)a=\"0\"+a;return\"\\\\\"+a})}function cd(a,b,c){c=void 0===c?\"\":c;var d=\"\";if(a.cssText||a.rules){var e=a.rules,f;if(f=e)f=e[0],f=!(f&&f.selector&&0===f.selector.indexOf(\"--\"));if(f){f=0;for(var g=e.length,h;f<g&&(h=e[f]);f++)d=cd(h,b,d)}else b?b=a.cssText:(b=a.cssText,b=b.replace(G.Ea,\"\").replace(G.Ia,\"\"),b=b.replace(G.sb,\"\").replace(G.xb,\"\")),(d=b.trim())&&(d=\"  \"+d+\"\\n\")}d&&(a.selector&&(c+=a.selector+\" {\\n\"),c+=d,a.selector&&(c+=\"}\\n\\n\"));return c}function dd(a){v=\na&&a.shimcssproperties?!1:q||!(navigator.userAgent.match(/AppleWebKit\\/601|Edge\\/15/)||!window.CSS||!CSS.supports||!CSS.supports(\"box-shadow\",\"0 0 0 var(--foo)\"))}function ba(a,b){if(!a)return\"\";\"string\"===typeof a&&(a=tb(a));b&&ca(a,b);return cd(a,v)}function ya(a){!a.__cssRules&&a.textContent&&(a.__cssRules=tb(a.textContent));return a.__cssRules||null}function ed(a){return!!a.parent&&a.parent.type===L.ha}function ca(a,b,c,d){if(a){var e=!1,f=a.type;if(d&&f===L.MEDIA_RULE){var g=a.selector.match(Be);\ng&&(window.matchMedia(g[1]).matches||(e=!0))}f===L.STYLE_RULE?b(a):c&&f===L.ha?c(a):f===L.ua&&(e=!0);if((a=a.rules)&&!e){e=0;f=a.length;for(var h;e<f&&(h=a[e]);e++)ca(h,b,c,d)}}}function ub(a,b,c,d){var e=document.createElement(\"style\");b&&e.setAttribute(\"scope\",b);e.textContent=a;fd(e,c,d);return e}function fd(a,b,c){b=b||document.head;b.insertBefore(a,c&&c.nextSibling||b.firstChild);S?a.compareDocumentPosition(S)===Node.DOCUMENT_POSITION_PRECEDING&&(S=a):S=a}function gd(a,b){var c=a.indexOf(\"var(\");\nif(-1===c)return b(a,\"\",\"\",\"\");a:{var d=0;var e=c+3;for(var f=a.length;e<f;e++)if(\"(\"===a[e])d++;else if(\")\"===a[e]&&0===--d)break a;e=-1}d=a.substring(c+4,e);c=a.substring(0,c);a=gd(a.substring(e+1),b);e=d.indexOf(\",\");return-1===e?b(c,d.trim(),\"\",a):b(c,d.substring(0,e).trim(),d.substring(e+1).trim(),a)}function za(a,b){q?a.setAttribute(\"class\",b):window.ShadyDOM.nativeMethods.setAttribute.call(a,\"class\",b)}function T(a){var b=a.localName,c=\"\";b?-1<b.indexOf(\"-\")||(c=b,b=a.getAttribute&&a.getAttribute(\"is\")||\n\"\"):(b=a.is,c=a.extends);return{is:b,Z:c}}function hd(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.target!==document.documentElement&&c.target!==document.head)for(var d=0;d<c.addedNodes.length;d++){var e=c.addedNodes[d];if(e.nodeType===Node.ELEMENT_NODE){var f=e.getRootNode();var g=e;var h=[];g.classList?h=Array.from(g.classList):g instanceof window.SVGElement&&g.hasAttribute(\"class\")&&(h=g.getAttribute(\"class\").split(/\\s+/));g=h;h=g.indexOf(w.c);(g=-1<h?g[h+1]:\"\")&&f===e.ownerDocument?w.a(e,g,\n!0):f.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(f=f.host)&&(f=T(f).is,g!==f&&(g&&w.a(e,g,!0),w.a(e,f)))}}}}function Ce(a){if(a=Aa[a])a._applyShimCurrentVersion=a._applyShimCurrentVersion||0,a._applyShimValidatingVersion=a._applyShimValidatingVersion||0,a._applyShimNextVersion=(a._applyShimNextVersion||0)+1}function id(a){return a._applyShimCurrentVersion===a._applyShimNextVersion}function De(a){a._applyShimValidatingVersion=a._applyShimNextVersion;a.b||(a.b=!0,Ee.then(function(){a._applyShimCurrentVersion=\na._applyShimNextVersion;a.b=!1}))}function Kb(a){requestAnimationFrame(function(){jd?jd(a):(vb||(vb=new Promise(function(a){wb=a}),\"complete\"===document.readyState?wb():document.addEventListener(\"readystatechange\",function(){\"complete\"===document.readyState&&wb()})),vb.then(function(){a&&a()}))})}(function(){if(!function(){var a=document.createEvent(\"Event\");a.initEvent(\"foo\",!0,!0);a.preventDefault();return a.defaultPrevented}()){var a=Event.prototype.preventDefault;Event.prototype.preventDefault=\nfunction(){this.cancelable&&(a.call(this),Object.defineProperty(this,\"defaultPrevented\",{get:function(){return!0},configurable:!0}))}}var b=/Trident/.test(navigator.userAgent);if(!window.CustomEvent||b&&\"function\"!==typeof window.CustomEvent)window.CustomEvent=function(a,b){b=b||{};var c=document.createEvent(\"CustomEvent\");c.initCustomEvent(a,!!b.bubbles,!!b.cancelable,b.detail);return c},window.CustomEvent.prototype=window.Event.prototype;if(!window.Event||b&&\"function\"!==typeof window.Event){var c=\nwindow.Event;window.Event=function(a,b){b=b||{};var c=document.createEvent(\"Event\");c.initEvent(a,!!b.bubbles,!!b.cancelable);return c};if(c)for(var d in c)window.Event[d]=c[d];window.Event.prototype=c.prototype}if(!window.MouseEvent||b&&\"function\"!==typeof window.MouseEvent){b=window.MouseEvent;window.MouseEvent=function(a,b){b=b||{};var c=document.createEvent(\"MouseEvent\");c.initMouseEvent(a,!!b.bubbles,!!b.cancelable,b.view||window,b.detail,b.screenX,b.screenY,b.clientX,b.clientY,b.ctrlKey,b.altKey,\nb.shiftKey,b.metaKey,b.button,b.relatedTarget);return c};if(b)for(d in b)window.MouseEvent[d]=b[d];window.MouseEvent.prototype=b.prototype}Array.from||(Array.from=function(a){return[].slice.call(a)});Object.assign||(Object.assign=function(a,b){for(var c=[].slice.call(arguments,1),d=0,e;d<c.length;d++)if(e=c[d])for(var f=a,k=e,l=Object.getOwnPropertyNames(k),n=0;n<l.length;n++)e=l[n],f[e]=k[e];return a})})(window.WebComponents);(function(){function a(){}var b=\"undefined\"===typeof HTMLTemplateElement;\n/Trident/.test(navigator.userAgent)&&function(){var a=Document.prototype.importNode;Document.prototype.importNode=function(){var b=a.apply(this,arguments);if(b.nodeType===Node.DOCUMENT_FRAGMENT_NODE){var c=this.createDocumentFragment();c.appendChild(b);return c}return b}}();var c=Node.prototype.cloneNode,d=Document.prototype.createElement,e=Document.prototype.importNode,f=function(){if(!b){var a=document.createElement(\"template\"),c=document.createElement(\"template\");c.content.appendChild(document.createElement(\"div\"));\na.content.appendChild(c);a=a.cloneNode(!0);return 0===a.content.childNodes.length||0===a.content.firstChild.content.childNodes.length||!(document.createDocumentFragment().cloneNode()instanceof DocumentFragment)}}();if(b){var g=function(a){switch(a){case \"&\":return\"&amp;\";case \"<\":return\"&lt;\";case \">\":return\"&gt;\";case \"\\u00a0\":return\"&nbsp;\"}},h=function(b){Object.defineProperty(b,\"innerHTML\",{get:function(){for(var a=\"\",b=this.content.firstChild;b;b=b.nextSibling)a+=b.outerHTML||b.data.replace(r,\ng);return a},set:function(b){m.body.innerHTML=b;for(a.b(m);this.content.firstChild;)this.content.removeChild(this.content.firstChild);for(;m.body.firstChild;)this.content.appendChild(m.body.firstChild)},configurable:!0})},m=document.implementation.createHTMLDocument(\"template\"),k=!0,l=document.createElement(\"style\");l.textContent=\"template{display:none;}\";var n=document.head;n.insertBefore(l,n.firstElementChild);a.prototype=Object.create(HTMLElement.prototype);var p=!document.createElement(\"div\").hasOwnProperty(\"innerHTML\");\na.O=function(b){if(!b.content){b.content=m.createDocumentFragment();for(var c;c=b.firstChild;)b.content.appendChild(c);if(p)b.__proto__=a.prototype;else if(b.cloneNode=function(b){return a.a(this,b)},k)try{h(b)}catch(df){k=!1}a.b(b.content)}};h(a.prototype);a.b=function(b){b=b.querySelectorAll(\"template\");for(var c=0,d=b.length,e;c<d&&(e=b[c]);c++)a.O(e)};document.addEventListener(\"DOMContentLoaded\",function(){a.b(document)});Document.prototype.createElement=function(){var b=d.apply(this,arguments);\n\"template\"===b.localName&&a.O(b);return b};var r=/[&\\u00A0<>]/g}if(b||f)a.a=function(a,b){var d=c.call(a,!1);this.O&&this.O(d);b&&(d.content.appendChild(c.call(a.content,!0)),this.qa(d.content,a.content));return d},a.prototype.cloneNode=function(b){return a.a(this,b)},a.qa=function(a,b){if(b.querySelectorAll){b=b.querySelectorAll(\"template\");a=a.querySelectorAll(\"template\");for(var c=0,d=a.length,e,f;c<d;c++)f=b[c],e=a[c],this.O&&this.O(f),e.parentNode.replaceChild(f.cloneNode(!0),e)}},Node.prototype.cloneNode=\nfunction(b){if(this instanceof DocumentFragment)if(b)var d=this.ownerDocument.importNode(this,!0);else return this.ownerDocument.createDocumentFragment();else d=c.call(this,b);b&&a.qa(d,this);return d},Document.prototype.importNode=function(b,c){if(\"template\"===b.localName)return a.a(b,c);var d=e.call(this,b,c);c&&a.qa(d,b);return d},f&&(window.HTMLTemplateElement.prototype.cloneNode=function(b){return a.a(this,b)});b&&(window.HTMLTemplateElement=a)})();var xb;Array.isArray?xb=Array.isArray:xb=function(a){return\"[object Array]\"===\nObject.prototype.toString.call(a)};var ic=xb,W=0,Va,Ua,kd=\"undefined\"!==typeof window?window:void 0,ld=kd||{},bc=ld.MutationObserver||ld.WebKitMutationObserver,Fe=\"undefined\"!==typeof Uint8ClampedArray&&\"undefined\"!==typeof importScripts&&\"undefined\"!==typeof MessageChannel,V=Array(1E3);var $d=\"undefined\"===typeof self&&\"undefined\"!==typeof process&&\"[object process]\"==={}.toString.call(process)?ae():bc?ce():Fe?de():kd||\"function\"!==typeof require?Wa():ee();var ua=Math.random().toString(36).substring(16),\nfa=new gc,ab=new gc,hc=0;ha.prototype.cb=function(a){for(var b=0;void 0===this.o&&b<a.length;b++)this.bb(a[b],b)};ha.prototype.bb=function(a,b){var c=this.eb,d=c.resolve;d===Za?(d=ec(a),d===Xa&&void 0!==a.o?this.na(a.o,b,a.m):\"function\"!==typeof d?(this.$--,this.m[b]=a):c===y?(c=new c(Y),fc(c,a,d),this.oa(c,b)):this.oa(new c(function(b){return b(a)}),b)):this.oa(d(a),b)};ha.prototype.na=function(a,b,c){var d=this.J;void 0===d.o&&(this.$--,2===a?A(d,c):this.m[b]=c);0===this.$&&K(d,this.m)};ha.prototype.oa=\nfunction(a,b){var c=this;Ya(a,void 0,function(a){return c.na(1,b,a)},function(a){return c.na(2,b,a)})};y.g=function(a){return(new ha(this,a)).J};y.h=function(a){var b=this;return ic(a)?new b(function(c,d){for(var e=a.length,f=0;f<e;f++)b.resolve(a[f]).then(c,d)}):new b(function(a,b){return b(new TypeError(\"You must pass an array to race.\"))})};y.resolve=Za;y.i=function(a){var b=new this(Y);A(b,a);return b};y.f=function(a){Ua=a};y.c=function(a){Q=a};y.b=Q;y.prototype={constructor:y,then:Xa};y.a=function(){if(\"undefined\"!==\ntypeof global)var a=global;else if(\"undefined\"!==typeof self)a=self;else try{a=Function(\"return this\")()}catch(d){throw Error(\"polyfill failed because global object is unavailable in this environment\");}var b=a.Promise;if(b){var c=null;try{c=Object.prototype.toString.call(b.resolve())}catch(d){}if(\"[object Promise]\"===c&&!b.Eb)return}a.Promise=y};y.Promise=y;y.a();(function(a){function b(a,b){if(\"function\"===typeof window.CustomEvent)return new CustomEvent(a,b);var c=document.createEvent(\"CustomEvent\");\nc.initCustomEvent(a,!!b.bubbles,!!b.cancelable,b.detail);return c}function c(a){if(l)return a.ownerDocument!==document?a.ownerDocument:null;var b=a.__importDoc;if(!b&&a.parentNode){b=a.parentNode;if(\"function\"===typeof b.closest)b=b.closest(\"link[rel=import]\");else for(;!h(b)&&(b=b.parentNode););a.__importDoc=b}return b}function d(a){var b=document.querySelectorAll(\"link[rel=import]:not(import-dependency)\"),c=b.length;c?k(b,function(b){return g(b,function(){0===--c&&a()})}):a()}function e(a){function b(){\"loading\"!==\ndocument.readyState&&document.body&&(document.removeEventListener(\"readystatechange\",b),a())}document.addEventListener(\"readystatechange\",b);b()}function f(a){e(function(){return d(function(){return a&&a()})})}function g(a,b){if(a.__loaded)b&&b();else if(\"script\"===a.localName&&!a.src||\"style\"===a.localName&&!a.firstChild)a.__loaded=!0,b&&b();else{var c=function(d){a.removeEventListener(d.type,c);a.__loaded=!0;b&&b()};a.addEventListener(\"load\",c);x&&\"style\"===a.localName||a.addEventListener(\"error\",\nc)}}function h(a){return a.nodeType===Node.ELEMENT_NODE&&\"link\"===a.localName&&\"import\"===a.rel}function m(){var a=this;this.a={};this.b=0;this.f=new MutationObserver(function(b){return a.l(b)});this.f.observe(document.head,{childList:!0,subtree:!0});this.c(document)}function k(a,b,c){var d=a?a.length:0,e=c?-1:1;for(c=c?d-1:0;c<d&&0<=c;c+=e)b(a[c],c)}var l=\"import\"in document.createElement(\"link\"),n=null;!1===\"currentScript\"in document&&Object.defineProperty(document,\"currentScript\",{get:function(){return n||\n(\"complete\"!==document.readyState?document.scripts[document.scripts.length-1]:null)},configurable:!0});var p=/(^\\/)|(^#)|(^[\\w-\\d]*:)/,r=/(url\\()([^)]*)(\\))/g,t=/(@import[\\s]+(?!url\\())([^;]*)(;)/g,w=/(<link[^>]*)(rel=['|\"]?stylesheet['|\"]?[^>]*>)/g,q={nb:function(a,b){a.href&&a.setAttribute(\"href\",q.ta(a.getAttribute(\"href\"),b));a.src&&a.setAttribute(\"src\",q.ta(a.getAttribute(\"src\"),b));if(\"style\"===a.localName){var c=q.La(a.textContent,b,r);a.textContent=q.La(c,b,t)}},La:function(a,b,c){return a.replace(c,\nfunction(a,c,d,e){a=d.replace(/[\"']/g,\"\");b&&(a=q.Ma(a,b));return c+\"'\"+a+\"'\"+e})},ta:function(a,b){return a&&p.test(a)?a:q.Ma(a,b)},Ma:function(a,b){if(void 0===q.la){q.la=!1;try{var c=new URL(\"b\",\"http://a\");c.pathname=\"c%20d\";q.la=\"http://a/c%20d\"===c.href}catch(ef){}}if(q.la)return(new URL(a,b)).href;c=q.Za;c||(c=document.implementation.createHTMLDocument(\"temp\"),q.Za=c,c.wa=c.createElement(\"base\"),c.head.appendChild(c.wa),c.va=c.createElement(\"a\"));c.wa.href=b;c.va.href=a;return c.va.href||a}},\ny={async:!0,load:function(a,b,c){if(a)if(a.match(/^data:/)){a=a.split(\",\");var d=a[1];d=-1<a[0].indexOf(\";base64\")?atob(d):decodeURIComponent(d);b(d)}else{var e=new XMLHttpRequest;e.open(\"GET\",a,y.async);e.onload=function(){var a=e.responseURL||e.getResponseHeader(\"Location\");a&&0===a.indexOf(\"/\")&&(a=(location.origin||location.protocol+\"//\"+location.host)+a);var d=e.response||e.responseText;304===e.status||0===e.status||200<=e.status&&300>e.status?b(d,a):c(d)};e.send()}else c(\"error: href must be specified\")}},\nx=/Trident/.test(navigator.userAgent)||/Edge\\/\\d./i.test(navigator.userAgent);m.prototype.c=function(a){var b=this;a=a.querySelectorAll(\"link[rel=import]\");k(a,function(a){return b.h(a)})};m.prototype.h=function(a){var b=this,c=a.href;if(void 0!==this.a[c]){var d=this.a[c];d&&d.__loaded&&(a.import=d,this.g(a))}else this.b++,this.a[c]=\"pending\",y.load(c,function(a,d){a=b.s(a,d||c);b.a[c]=a;b.b--;b.c(a);b.i()},function(){b.a[c]=null;b.b--;b.i()})};m.prototype.s=function(a,b){if(!a)return document.createDocumentFragment();\nx&&(a=a.replace(w,function(a,b,c){return-1===a.indexOf(\"type=\")?b+\" type=import-disable \"+c:a}));var c=document.createElement(\"template\");c.innerHTML=a;if(c.content)a=c.content;else for(a=document.createDocumentFragment();c.firstChild;)a.appendChild(c.firstChild);if(c=a.querySelector(\"base\"))b=q.ta(c.getAttribute(\"href\"),b),c.removeAttribute(\"href\");c=a.querySelectorAll('link[rel=import], link[rel=stylesheet][href][type=import-disable],\\n    style:not([type]), link[rel=stylesheet][href]:not([type]),\\n    script:not([type]), script[type=\"application/javascript\"],\\n    script[type=\"text/javascript\"]');\nvar d=0;k(c,function(a){g(a);q.nb(a,b);a.setAttribute(\"import-dependency\",\"\");\"script\"===a.localName&&!a.src&&a.textContent&&(a.setAttribute(\"src\",\"data:text/javascript;charset=utf-8,\"+encodeURIComponent(a.textContent+(\"\\n//# sourceURL=\"+b+(d?\"-\"+d:\"\")+\".js\\n\"))),a.textContent=\"\",d++)});return a};m.prototype.i=function(){var a=this;if(!this.b){this.f.disconnect();this.flatten(document);var b=!1,c=!1,d=function(){c&&b&&(a.c(document),a.b||(a.f.observe(document.head,{childList:!0,subtree:!0}),a.j()))};\nthis.v(function(){c=!0;d()});this.u(function(){b=!0;d()})}};m.prototype.flatten=function(a){var b=this;a=a.querySelectorAll(\"link[rel=import]\");k(a,function(a){var c=b.a[a.href];(a.import=c)&&c.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(b.a[a.href]=a,a.readyState=\"loading\",a.import=a,b.flatten(c),a.appendChild(c))})};m.prototype.u=function(a){function b(e){if(e<d){var f=c[e],h=document.createElement(\"script\");f.removeAttribute(\"import-dependency\");k(f.attributes,function(a){return h.setAttribute(a.name,\na.value)});n=h;f.parentNode.replaceChild(h,f);g(h,function(){n=null;b(e+1)})}else a()}var c=document.querySelectorAll(\"script[import-dependency]\"),d=c.length;b(0)};m.prototype.v=function(a){var b=document.querySelectorAll(\"style[import-dependency],\\n    link[rel=stylesheet][import-dependency]\"),d=b.length;if(d){var e=x&&!!document.querySelector(\"link[rel=stylesheet][href][type=import-disable]\");k(b,function(b){g(b,function(){b.removeAttribute(\"import-dependency\");0===--d&&a()});if(e&&b.parentNode!==\ndocument.head){var f=document.createElement(b.localName);f.__appliedElement=b;f.setAttribute(\"type\",\"import-placeholder\");b.parentNode.insertBefore(f,b.nextSibling);for(f=c(b);f&&c(f);)f=c(f);f.parentNode!==document.head&&(f=null);document.head.insertBefore(b,f);b.removeAttribute(\"type\")}})}else a()};m.prototype.j=function(){var a=this,b=document.querySelectorAll(\"link[rel=import]\");k(b,function(b){return a.g(b)},!0)};m.prototype.g=function(a){a.__loaded||(a.__loaded=!0,a.import&&(a.import.readyState=\n\"complete\"),a.dispatchEvent(b(a.import?\"load\":\"error\",{bubbles:!1,cancelable:!1,detail:void 0})))};m.prototype.l=function(a){var b=this;k(a,function(a){return k(a.addedNodes,function(a){a&&a.nodeType===Node.ELEMENT_NODE&&(h(a)?b.h(a):b.c(a))})})};if(l){var v=document.querySelectorAll(\"link[rel=import]\");k(v,function(a){a.import&&\"loading\"===a.import.readyState||(a.__loaded=!0)});v=function(a){a=a.target;h(a)&&(a.__loaded=!0)};document.addEventListener(\"load\",v,!0);document.addEventListener(\"error\",\nv,!0)}else{var u=Object.getOwnPropertyDescriptor(Node.prototype,\"baseURI\");Object.defineProperty((!u||u.configurable?Node:Element).prototype,\"baseURI\",{get:function(){var a=h(this)?this:c(this);return a?a.href:u&&u.get?u.get.call(this):(document.querySelector(\"base\")||window.location).href},configurable:!0,enumerable:!0});e(function(){return new m})}f(function(){return document.dispatchEvent(b(\"HTMLImportsLoaded\",{cancelable:!0,bubbles:!0,detail:void 0}))});a.useNative=l;a.whenReady=f;a.importForElement=\nc})(window.HTMLImports=window.HTMLImports||{});window.WebComponents=window.WebComponents||{flags:{}};var md=document.querySelector('script[src*=\"webcomponents-lite.js\"]'),Ge=/wc-(.+)/,E={};if(!E.noOpts){location.search.slice(1).split(\"&\").forEach(function(a){a=a.split(\"=\");var b;a[0]&&(b=a[0].match(Ge))&&(E[b[1]]=a[1]||!0)});if(md)for(var nd=0,Ba;Ba=md.attributes[nd];nd++)\"src\"!==Ba.name&&(E[Ba.name]=Ba.value||!0);if(E.log&&E.log.split){var He=E.log.split(\",\");E.log={};He.forEach(function(a){E.log[a]=\n!0})}else E.log={}}window.WebComponents.flags=E;var od=E.shadydom;od&&(window.ShadyDOM=window.ShadyDOM||{},window.ShadyDOM.force=od);var pd=E.register||E.ce;pd&&window.customElements&&(window.customElements.forcePolyfill=pd);var D=window.ShadyDOM||{};D.ob=!(!Element.prototype.attachShadow||!Node.prototype.getRootNode);var yb=Object.getOwnPropertyDescriptor(Node.prototype,\"firstChild\");D.W=!!(yb&&yb.configurable&&yb.get);D.Ha=D.force||!D.ob;var da=Element.prototype,qd=da.matches||da.matchesSelector||\nda.mozMatchesSelector||da.msMatchesSelector||da.oMatchesSelector||da.webkitMatchesSelector,eb=document.createTextNode(\"\"),kc=0,db=[];(new MutationObserver(function(){for(;db.length;)try{db.shift()()}catch(a){throw eb.textContent=kc++,a;}})).observe(eb,{characterData:!0});var ja=[],fb;va.list=ja;ta.prototype.vb=function(){var a=this;this.a||(this.a=!0,jc(function(){a.b()}))};ta.prototype.b=function(){if(this.a){this.a=!1;var a=this.takeRecords();a.length&&this.ba.forEach(function(b){b(a)})}};ta.prototype.takeRecords=\nfunction(){if(this.addedNodes.length||this.removedNodes.length){var a=[{addedNodes:this.addedNodes,removedNodes:this.removedNodes}];this.addedNodes=[];this.removedNodes=[];return a}return[]};var Bc=Element.prototype.appendChild,mb=Element.prototype.insertBefore,ka=Element.prototype.removeChild,Jc=Element.prototype.setAttribute,rd=Element.prototype.removeAttribute,zb=Element.prototype.cloneNode,nb=Document.prototype.importNode,Rc=Element.prototype.addEventListener,Uc=Element.prototype.removeEventListener,\nQc=Window.prototype.addEventListener,Tc=Window.prototype.removeEventListener,Ab=Element.prototype.dispatchEvent,Ie=Object.freeze({appendChild:Bc,insertBefore:mb,removeChild:ka,setAttribute:Jc,removeAttribute:rd,cloneNode:zb,importNode:nb,addEventListener:Rc,removeEventListener:Uc,Jb:Qc,Kb:Tc,dispatchEvent:Ab,querySelector:Element.prototype.querySelector,querySelectorAll:Element.prototype.querySelectorAll}),me=/[&\\u00A0\"]/g,pe=/[&\\u00A0<>]/g,ne=nc(\"area base br col command embed hr img input keygen link meta param source track wbr\".split(\" \")),\noe=nc(\"style script xmp iframe noembed noframes plaintext noscript\".split(\" \")),B=document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,!1),C=document.createTreeWalker(document,NodeFilter.SHOW_ELEMENT,null,!1),Je=Object.freeze({parentNode:aa,firstChild:Sa,lastChild:Ta,previousSibling:oc,nextSibling:pc,childNodes:U,parentElement:qc,firstElementChild:rc,lastElementChild:sc,previousElementSibling:tc,nextElementSibling:uc,children:vc,innerHTML:wc,textContent:xc}),Bb=Object.getOwnPropertyDescriptor(Element.prototype,\n\"innerHTML\")||Object.getOwnPropertyDescriptor(HTMLElement.prototype,\"innerHTML\"),Ca=document.implementation.createHTMLDocument(\"inert\").createElement(\"div\"),Cb=Object.getOwnPropertyDescriptor(Document.prototype,\"activeElement\"),yc={parentElement:{get:function(){var a=this.__shady&&this.__shady.parentNode;a&&a.nodeType!==Node.ELEMENT_NODE&&(a=null);return void 0!==a?a:qc(this)},configurable:!0},parentNode:{get:function(){var a=this.__shady&&this.__shady.parentNode;return void 0!==a?a:aa(this)},configurable:!0},\nnextSibling:{get:function(){var a=this.__shady&&this.__shady.nextSibling;return void 0!==a?a:pc(this)},configurable:!0},previousSibling:{get:function(){var a=this.__shady&&this.__shady.previousSibling;return void 0!==a?a:oc(this)},configurable:!0},className:{get:function(){return this.getAttribute(\"class\")||\"\"},set:function(a){this.setAttribute(\"class\",a)},configurable:!0},nextElementSibling:{get:function(){if(this.__shady&&void 0!==this.__shady.nextSibling){for(var a=this.nextSibling;a&&a.nodeType!==\nNode.ELEMENT_NODE;)a=a.nextSibling;return a}return uc(this)},configurable:!0},previousElementSibling:{get:function(){if(this.__shady&&void 0!==this.__shady.previousSibling){for(var a=this.previousSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return tc(this)},configurable:!0}},hb={childNodes:{get:function(){if(Z(this)){if(!this.__shady.childNodes){this.__shady.childNodes=[];for(var a=this.firstChild;a;a=a.nextSibling)this.__shady.childNodes.push(a)}var b=this.__shady.childNodes}else b=\nU(this);b.item=function(a){return b[a]};return b},configurable:!0},childElementCount:{get:function(){return this.children.length},configurable:!0},firstChild:{get:function(){var a=this.__shady&&this.__shady.firstChild;return void 0!==a?a:Sa(this)},configurable:!0},lastChild:{get:function(){var a=this.__shady&&this.__shady.lastChild;return void 0!==a?a:Ta(this)},configurable:!0},textContent:{get:function(){if(Z(this)){for(var a=[],b=0,c=this.childNodes,d;d=c[b];b++)d.nodeType!==Node.COMMENT_NODE&&\na.push(d.textContent);return a.join(\"\")}return xc(this)},set:function(a){switch(this.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:for(;this.firstChild;)this.removeChild(this.firstChild);(0<a.length||this.nodeType===Node.ELEMENT_NODE)&&this.appendChild(document.createTextNode(a));break;default:this.nodeValue=a}},configurable:!0},firstElementChild:{get:function(){if(this.__shady&&void 0!==this.__shady.firstChild){for(var a=this.firstChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;\nreturn a}return rc(this)},configurable:!0},lastElementChild:{get:function(){if(this.__shady&&void 0!==this.__shady.lastChild){for(var a=this.lastChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return sc(this)},configurable:!0},children:{get:function(){var a;Z(this)?a=Array.prototype.filter.call(this.childNodes,function(a){return a.nodeType===Node.ELEMENT_NODE}):a=vc(this);a.item=function(b){return a[b]};return a},configurable:!0},innerHTML:{get:function(){var a=\"template\"===\nthis.localName?this.content:this;return Z(this)?gb(a):wc(a)},set:function(a){for(var b=\"template\"===this.localName?this.content:this;b.firstChild;)b.removeChild(b.firstChild);for(Bb&&Bb.set?Bb.set.call(Ca,a):Ca.innerHTML=a;Ca.firstChild;)b.appendChild(Ca.firstChild)},configurable:!0}},sd={shadowRoot:{get:function(){return this.__shady&&this.__shady.tb||null},configurable:!0}},ib={activeElement:{get:function(){var a=Cb&&Cb.get?Cb.get.call(document):D.W?void 0:document.activeElement;if(a&&a.nodeType){var b=\n!!I(this);if(this===document||b&&this.host!==a&&this.host.contains(a)){for(b=ia(a);b&&b!==this;)a=b.host,b=ia(a);a=this===document?b?null:a:b===this?a:null}else a=null}else a=null;return a},set:function(){},configurable:!0}},ac=D.W?function(){}:function(a){a.__shady&&a.__shady.Xa||(a.__shady=a.__shady||{},a.__shady.Xa=!0,M(a,yc,!0))},$b=D.W?function(){}:function(a){a.__shady&&a.__shady.Va||(a.__shady=a.__shady||{},a.__shady.Va=!0,M(a,hb,!0),M(a,sd,!0))},xa=null,la=\"__eventWrappers\"+Date.now(),Ke=\n{blur:!0,focus:!0,focusin:!0,focusout:!0,click:!0,dblclick:!0,mousedown:!0,mouseenter:!0,mouseleave:!0,mousemove:!0,mouseout:!0,mouseover:!0,mouseup:!0,wheel:!0,beforeinput:!0,input:!0,keydown:!0,keyup:!0,compositionstart:!0,compositionupdate:!0,compositionend:!0,touchstart:!0,touchend:!0,touchmove:!0,touchcancel:!0,pointerover:!0,pointerenter:!0,pointerdown:!0,pointermove:!0,pointerup:!0,pointercancel:!0,pointerout:!0,pointerleave:!0,gotpointercapture:!0,lostpointercapture:!0,dragstart:!0,drag:!0,\ndragenter:!0,dragleave:!0,dragover:!0,drop:!0,dragend:!0,DOMActivate:!0,DOMFocusIn:!0,DOMFocusOut:!0,keypress:!0},Vc={get composed(){!1!==this.isTrusted&&void 0===this.ia&&(this.ia=Ke[this.type]);return this.ia||!1},composedPath:function(){this.xa||(this.xa=ob(this.__target,this.composed));return this.xa},get target(){return Lc(this.currentTarget,this.composedPath())},get relatedTarget(){if(!this.ya)return null;this.za||(this.za=ob(this.ya,!0));return Lc(this.currentTarget,this.za)},stopPropagation:function(){Event.prototype.stopPropagation.call(this);\nthis.ja=!0},stopImmediatePropagation:function(){Event.prototype.stopImmediatePropagation.call(this);this.ja=this.Ua=!0}},qb={focus:!0,blur:!0},Le=pb(window.Event),Me=pb(window.CustomEvent),Ne=pb(window.MouseEvent),Zb={};l.prototype=Object.create(DocumentFragment.prototype);l.prototype.D=function(a,b){this.Wa=\"ShadyRoot\";sa(a);sa(this);this.host=a;this.L=b&&b.mode;a.__shady=a.__shady||{};a.__shady.root=this;a.__shady.tb=\"closed\"!==this.L?this:null;this.T=!1;this.b=[];this.a=null;b=U(a);for(var c=0,\nd=b.length;c<d;c++)ka.call(a,b[c])};l.prototype.M=function(){var a=this;this.T||(this.T=!0,lc(function(){return a.Da()}))};l.prototype.C=function(){for(var a=this,b=this;b;)b.T&&(a=b),b=b.hb();return a};l.prototype.hb=function(){var a=this.host.getRootNode();if(I(a))for(var b=this.host.childNodes,c=0,d;c<b.length;c++)if(d=b[c],this.h(d))return a};l.prototype.Da=function(){this.T&&this.C()._renderRoot()};l.prototype._renderRoot=function(){this.T=!1;this.v();this.s()};l.prototype.v=function(){for(var a=\n0,b;a<this.b.length;a++)b=this.b[a],this.l(b);for(b=this.host.firstChild;b;b=b.nextSibling)this.f(b);for(a=0;a<this.b.length;a++){b=this.b[a];if(!b.__shady.assignedNodes.length)for(var c=b.firstChild;c;c=c.nextSibling)this.f(c,b);c=b.parentNode;(c=c.__shady&&c.__shady.root)&&c.Aa()&&c._renderRoot();this.c(b.__shady.V,b.__shady.assignedNodes);if(c=b.__shady.Ca){for(var d=0;d<c.length;d++)c[d].__shady.ma=null;b.__shady.Ca=null;c.length>b.__shady.assignedNodes.length&&(b.__shady.pa=!0)}b.__shady.pa&&\n(b.__shady.pa=!1,this.g(b))}};l.prototype.f=function(a,b){a.__shady=a.__shady||{};var c=a.__shady.ma;a.__shady.ma=null;b||(b=(b=this.a[a.slot||\"__catchall\"])&&b[0]);b?(b.__shady.assignedNodes.push(a),a.__shady.assignedSlot=b):a.__shady.assignedSlot=void 0;c!==a.__shady.assignedSlot&&a.__shady.assignedSlot&&(a.__shady.assignedSlot.__shady.pa=!0)};l.prototype.l=function(a){var b=a.__shady.assignedNodes;a.__shady.assignedNodes=[];a.__shady.V=[];if(a.__shady.Ca=b)for(var c=0;c<b.length;c++){var d=b[c];\nd.__shady.ma=d.__shady.assignedSlot;d.__shady.assignedSlot===a&&(d.__shady.assignedSlot=null)}};l.prototype.c=function(a,b){for(var c=0,d;c<b.length&&(d=b[c]);c++)\"slot\"==d.localName?this.c(a,d.__shady.assignedNodes):a.push(b[c])};l.prototype.g=function(a){Ab.call(a,new Event(\"slotchange\"));a.__shady.assignedSlot&&this.g(a.__shady.assignedSlot)};l.prototype.s=function(){for(var a=this.b,b=[],c=0;c<a.length;c++){var d=a[c].parentNode;d.__shady&&d.__shady.root||!(0>b.indexOf(d))||b.push(d)}for(a=0;a<\nb.length;a++)c=b[a],this.I(c===this?this.host:c,this.u(c))};l.prototype.u=function(a){var b=[];a=a.childNodes;for(var c=0;c<a.length;c++){var d=a[c];if(this.h(d)){d=d.__shady.V;for(var e=0;e<d.length;e++)b.push(d[e])}else b.push(d)}return b};l.prototype.h=function(a){return\"slot\"==a.localName};l.prototype.I=function(a,b){for(var c=U(a),d=se(b,b.length,c,c.length),e=0,f=0,g;e<d.length&&(g=d[e]);e++){for(var h=0,k;h<g.Y.length&&(k=g.Y[h]);h++)aa(k)===a&&ka.call(a,k),c.splice(g.index+f,1);f-=g.aa}for(e=\n0;e<d.length&&(g=d[e]);e++)for(f=c[g.index],h=g.index;h<g.index+g.aa;h++)k=b[h],mb.call(a,k,f),c.splice(h,0,k)};l.prototype.$a=function(a){this.a=this.a||{};this.b=this.b||[];for(var b=0;b<a.length;b++){var c=a[b];c.__shady=c.__shady||{};sa(c);sa(c.parentNode);var d=this.i(c);if(this.a[d]){var e=e||{};e[d]=!0;this.a[d].push(c)}else this.a[d]=[c];this.b.push(c)}if(e)for(var f in e)this.a[f]=this.j(this.a[f])};l.prototype.i=function(a){var b=a.name||a.getAttribute(\"name\")||\"__catchall\";return a.Ya=\nb};l.prototype.j=function(a){return a.sort(function(a,c){a=Wc(a);for(var b=Wc(c),e=0;e<a.length;e++){c=a[e];var f=b[e];if(c!==f)return a=Array.from(c.parentNode.childNodes),a.indexOf(c)-a.indexOf(f)}})};l.prototype.gb=function(a){this.a=this.a||{};this.b=this.b||[];var b=this.a,c;for(c in b)for(var d=b[c],e=0;e<d.length;e++){var f=d[e],g;a:{for(g=f;g;){if(g==a){g=!0;break a}g=g.parentNode}g=void 0}if(g){d.splice(e,1);var h=this.b.indexOf(f);0<=h&&this.b.splice(h,1);e--;this.H(f);h=!0}}return h};l.prototype.ib=\nfunction(a){var b=a.Ya,c=this.i(a);if(c!==b){b=this.a[b];var d=b.indexOf(a);0<=d&&b.splice(d,1);b=this.a[c]||(this.a[c]=[]);b.push(a);1<b.length&&(this.a[c]=this.j(b))}};l.prototype.H=function(a){if(a=a.__shady.V)for(var b=0;b<a.length;b++){var c=a[b],d=aa(c);d&&ka.call(d,c)}};l.prototype.Aa=function(){return!!this.b.length};l.prototype.addEventListener=function(a,b,c){\"object\"!==typeof c&&(c={capture:!!c});c.ka=this;this.host.addEventListener(a,b,c)};l.prototype.removeEventListener=function(a,b,\nc){\"object\"!==typeof c&&(c={capture:!!c});c.ka=this;this.host.removeEventListener(a,b,c)};l.prototype.getElementById=function(a){return wa(this,function(b){return b.id==a},function(a){return!!a})[0]||null};(function(a){M(a,hb,!0);M(a,ib,!0)})(l.prototype);var we={addEventListener:Oc.bind(window),removeEventListener:Sc.bind(window)},ve={addEventListener:Oc,removeEventListener:Sc,appendChild:function(a){return jb(this,a)},insertBefore:function(a,b){return jb(this,a,b)},removeChild:function(a){return kb(this,\na)},replaceChild:function(a,b){jb(this,a,b);kb(this,b);return a},cloneNode:function(a){if(\"template\"==this.localName)var b=zb.call(this,a);else if(b=zb.call(this,!1),a){a=this.childNodes;for(var c=0,d;c<a.length;c++)d=a[c].cloneNode(!0),b.appendChild(d)}return b},getRootNode:function(){return Fc(this)},get isConnected(){var a=this.ownerDocument;if(a&&a.contains&&a.contains(this)||(a=a.documentElement)&&a.contains&&a.contains(this))return!0;for(a=this;a&&!(a instanceof Document);)a=a.parentNode||(a instanceof\nl?a.host:void 0);return!!(a&&a instanceof Document)},dispatchEvent:function(a){va();return Ab.call(this,a)}},xe={get assignedSlot(){return Xc(this)}},rb={querySelector:function(a){return wa(this,function(b){return qd.call(b,a)},function(a){return!!a})[0]||null},querySelectorAll:function(a){return wa(this,function(b){return qd.call(b,a)})}},$c={assignedNodes:function(a){if(\"slot\"===this.localName)return Hc(this),this.__shady?(a&&a.flatten?this.__shady.V:this.__shady.assignedNodes)||[]:[]}},Yc=cb({setAttribute:function(a,\nb){Ic(this,a,b)},removeAttribute:function(a){rd.call(this,a);Ec(this,a)},attachShadow:function(a){if(!this)throw\"Must provide a host.\";if(!a)throw\"Not enough arguments.\";return new l(Zb,this,a)},get slot(){return this.getAttribute(\"slot\")},set slot(a){Ic(this,\"slot\",a)},get assignedSlot(){return Xc(this)}},rb,$c);Object.defineProperties(Yc,sd);var Zc=cb({importNode:function(a,b){return Kc(a,b)},getElementById:function(a){return wa(this,function(b){return b.id==a},function(a){return!!a})[0]||null}},\nrb);Object.defineProperties(Zc,{_activeElement:ib.activeElement});var Oe=HTMLElement.prototype.blur,ye=cb({blur:function(){var a=this.__shady&&this.__shady.root;(a=a&&a.activeElement)?a.blur():Oe.call(this)}});D.Ha&&(window.ShadyDOM={inUse:D.Ha,patch:function(a){return a},isShadyRoot:I,enqueue:lc,flush:va,settings:D,filterMutations:le,observeChildren:Zd,unobserveChildren:Yd,nativeMethods:Ie,nativeTree:Je},window.Event=Le,window.CustomEvent=Me,window.MouseEvent=Ne,re(),ue(),window.ShadowRoot=l);var ze=\nnew Set(\"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph\".split(\" \"));z.prototype.D=function(a,b){this.u.set(a,b);this.s.set(b.constructor,b)};z.prototype.c=function(a){return this.u.get(a)};z.prototype.C=function(a){return this.s.get(a)};z.prototype.v=function(a){this.h=!0;this.j.push(a)};z.prototype.l=function(a){var b=this;this.h&&P(a,function(a){return b.g(a)})};z.prototype.g=function(a){if(this.h&&!a.__CE_patched){a.__CE_patched=\n!0;for(var b=0;b<this.j.length;b++)this.j[b](a)}};z.prototype.b=function(a){var b=[];P(a,function(a){return b.push(a)});for(a=0;a<b.length;a++){var c=b[a];1===c.__CE_state?this.connectedCallback(c):this.i(c)}};z.prototype.a=function(a){var b=[];P(a,function(a){return b.push(a)});for(a=0;a<b.length;a++){var c=b[a];1===c.__CE_state&&this.disconnectedCallback(c)}};z.prototype.f=function(a,b){var c=this;b=b?b:{};var d=b.yb||new Set,e=b.Na||function(a){return c.i(a)},f=[];P(a,function(a){if(\"link\"===a.localName&&\n\"import\"===a.getAttribute(\"rel\")){var b=a.import;b instanceof Node&&\"complete\"===b.readyState?(b.__CE_isImportDocument=!0,b.__CE_hasRegistry=!0):a.addEventListener(\"load\",function(){var b=a.import;b.__CE_documentLoadHandled||(b.__CE_documentLoadHandled=!0,b.__CE_isImportDocument=!0,b.__CE_hasRegistry=!0,d.delete(b),c.f(b,{yb:d,Na:e}))})}else f.push(a)},d);if(this.h)for(a=0;a<f.length;a++)this.g(f[a]);for(a=0;a<f.length;a++)e(f[a])};z.prototype.i=function(a){if(void 0===a.__CE_state){var b=this.c(a.localName);\nif(b){b.constructionStack.push(a);var c=b.constructor;try{try{if(new c!==a)throw Error(\"The custom element constructor did not produce the element being upgraded.\");}finally{b.constructionStack.pop()}}catch(f){throw a.__CE_state=2,f;}a.__CE_state=1;a.__CE_definition=b;if(b.attributeChangedCallback)for(b=b.observedAttributes,c=0;c<b.length;c++){var d=b[c],e=a.getAttribute(d);null!==e&&this.attributeChangedCallback(a,d,null,e,null)}n(a)&&this.connectedCallback(a)}}};z.prototype.connectedCallback=function(a){var b=\na.__CE_definition;b.connectedCallback&&b.connectedCallback.call(a)};z.prototype.disconnectedCallback=function(a){var b=a.__CE_definition;b.disconnectedCallback&&b.disconnectedCallback.call(a)};z.prototype.attributeChangedCallback=function(a,b,c,d,e){var f=a.__CE_definition;f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(b)&&f.attributeChangedCallback.call(a,b,c,d,e)};Ra.prototype.c=function(){this.N&&this.N.disconnect()};Ra.prototype.f=function(a){var b=this.a.readyState;\"interactive\"!==\nb&&\"complete\"!==b||this.c();for(b=0;b<a.length;b++)for(var c=a[b].addedNodes,d=0;d<c.length;d++)this.b.f(c[d])};Yb.prototype.resolve=function(a){if(this.a)throw Error(\"Already resolved.\");this.a=a;this.b&&this.b(a)};x.prototype.define=function(a,b){var c=this;if(!(b instanceof Function))throw new TypeError(\"Custom element constructors must be functions.\");if(!ad(a))throw new SyntaxError(\"The element name '\"+a+\"' is not valid.\");if(this.a.c(a))throw Error(\"A custom element with name '\"+a+\"' has already been defined.\");\nif(this.c)throw Error(\"A custom element is already being defined.\");this.c=!0;try{var d=function(a){var b=e[a];if(void 0!==b&&!(b instanceof Function))throw Error(\"The '\"+a+\"' callback must be a function.\");return b},e=b.prototype;if(!(e instanceof Object))throw new TypeError(\"The custom element constructor's prototype is not an object.\");var f=d(\"connectedCallback\");var g=d(\"disconnectedCallback\");var h=d(\"adoptedCallback\");var k=d(\"attributeChangedCallback\");var l=b.observedAttributes||[]}catch(cf){return}finally{this.c=\n!1}b={localName:a,constructor:b,connectedCallback:f,disconnectedCallback:g,adoptedCallback:h,attributeChangedCallback:k,observedAttributes:l,constructionStack:[]};this.a.D(a,b);this.g.push(b);this.b||(this.b=!0,this.f(function(){return c.j()}))};x.prototype.j=function(){var a=this;if(!1!==this.b){this.b=!1;for(var b=this.g,c=[],d=new Map,e=0;e<b.length;e++)d.set(b[e].localName,[]);this.a.f(document,{Na:function(b){if(void 0===b.__CE_state){var e=b.localName,f=d.get(e);f?f.push(b):a.a.c(e)&&c.push(b)}}});\nfor(e=0;e<c.length;e++)this.a.i(c[e]);for(;0<b.length;){var f=b.shift();e=f.localName;f=d.get(f.localName);for(var g=0;g<f.length;g++)this.a.i(f[g]);(e=this.h.get(e))&&e.resolve(void 0)}}};x.prototype.get=function(a){if(a=this.a.c(a))return a.constructor};x.prototype.whenDefined=function(a){if(!ad(a))return Promise.reject(new SyntaxError(\"'\"+a+\"' is not a valid custom element name.\"));var b=this.h.get(a);if(b)return b.c;b=new Yb;this.h.set(a,b);this.a.c(a)&&!this.g.some(function(b){return b.localName===\na})&&b.resolve(void 0);return b.c};x.prototype.l=function(a){this.i.c();var b=this.f;this.f=function(c){return a(function(){return b(c)})}};window.CustomElementRegistry=x;x.prototype.define=x.prototype.define;x.prototype.get=x.prototype.get;x.prototype.whenDefined=x.prototype.whenDefined;x.prototype.polyfillWrapFlushCallback=x.prototype.l;var Na=window.Document.prototype.createElement,Td=window.Document.prototype.createElementNS,Sd=window.Document.prototype.importNode,Ud=window.Document.prototype.prepend,\nVd=window.Document.prototype.append,Nb=window.Node.prototype.cloneNode,qa=window.Node.prototype.appendChild,Vb=window.Node.prototype.insertBefore,Oa=window.Node.prototype.removeChild,Wb=window.Node.prototype.replaceChild,Qa=Object.getOwnPropertyDescriptor(window.Node.prototype,\"textContent\"),Mb=window.Element.prototype.attachShadow,La=Object.getOwnPropertyDescriptor(window.Element.prototype,\"innerHTML\"),Pa=window.Element.prototype.getAttribute,Ob=window.Element.prototype.setAttribute,Qb=window.Element.prototype.removeAttribute,\nra=window.Element.prototype.getAttributeNS,Pb=window.Element.prototype.setAttributeNS,Rb=window.Element.prototype.removeAttributeNS,Tb=window.Element.prototype.insertAdjacentElement,Jd=window.Element.prototype.prepend,Kd=window.Element.prototype.append,Md=window.Element.prototype.before,Nd=window.Element.prototype.after,Od=window.Element.prototype.replaceWith,Pd=window.Element.prototype.remove,Xd=window.HTMLElement,Ma=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,\"innerHTML\"),Sb=window.HTMLElement.prototype.insertAdjacentElement,\nXb=new function(){},Da=window.customElements;if(!Da||Da.forcePolyfill||\"function\"!=typeof Da.define||\"function\"!=typeof Da.get){var na=new z;Wd(na);Rd(na);Qd(na);Id(na);document.__CE_hasRegistry=!0;var Pe=new x(na);Object.defineProperty(window,\"customElements\",{configurable:!0,enumerable:!0,value:Pe})}var L={STYLE_RULE:1,ha:7,MEDIA_RULE:4,ua:1E3},G={mb:/\\/\\*[^*]*\\*+([^/*][^*]*\\*+)*\\//gim,port:/@import[^;]*;/gim,Ea:/(?:^[^;\\-\\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\\n]|$)/gim,Ia:/(?:^[^;\\-\\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\\n]|$)?/gim,\nsb:/@apply\\s*\\(?[^);]*\\)?\\s*(?:[;\\n]|$)?/gim,xb:/[^;:]*?:[^;]*?var\\([^;]*\\)(?:[;\\n]|$)?/gim,rb:/^@[^\\s]*keyframes/,Ja:/\\s+/g},q=!(window.ShadyDOM&&window.ShadyDOM.inUse);if(window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss)var v=window.ShadyCSS.nativeCss;else window.ShadyCSS?(dd(window.ShadyCSS),window.ShadyCSS=void 0):dd(window.WebComponents&&window.WebComponents.flags);var Ea=/(?:^|[;\\s{]\\s*)(--[\\w-]*?)\\s*:\\s*(?:((?:'(?:\\\\'|.)*?'|\"(?:\\\\\"|.)*?\"|\\([^)]*?\\)|[^};{])+)|\\{([^}]*)\\}(?:(?=[;\\s}])|$))/gi,\nFa=/(?:^|\\W+)@apply\\s*\\(?([^);\\n]*)\\)?/gi,Qe=/(--[\\w-]+)\\s*([:,;)]|$)/gi,Re=/(animation\\s*:)|(animation-name\\s*:)/,Be=/@media\\s(.*)/,Se=/\\{[^}]*\\}/g,S=null;r.prototype.a=function(a,b,c){a.__styleScoped?a.__styleScoped=null:this.i(a,b||\"\",c)};r.prototype.i=function(a,b,c){a.nodeType===Node.ELEMENT_NODE&&this.C(a,b,c);if(a=\"template\"===a.localName?(a.content||a.Cb).childNodes:a.children||a.childNodes)for(var d=0;d<a.length;d++)this.i(a[d],b,c)};r.prototype.C=function(a,b,c){if(b)if(a.classList)c?(a.classList.remove(\"style-scope\"),\na.classList.remove(b)):(a.classList.add(\"style-scope\"),a.classList.add(b));else if(a.getAttribute){var d=a.getAttribute(Te);c?d&&(b=d.replace(\"style-scope\",\"\").replace(b,\"\"),za(a,b)):za(a,(d?d+\" \":\"\")+\"style-scope \"+b)}};r.prototype.b=function(a,b,c){var d=a.__cssBuild;q||\"shady\"===d?b=ba(b,c):(a=T(a),b=this.I(b,a.is,a.Z,c)+\"\\n\\n\");return b.trim()};r.prototype.I=function(a,b,c,d){var e=this.f(b,c);b=this.h(b);var f=this;return ba(a,function(a){a.c||(f.S(a,b,e),a.c=!0);d&&d(a,b,e)})};r.prototype.h=\nfunction(a){return a?Ue+a:\"\"};r.prototype.f=function(a,b){return b?\"[is=\"+a+\"]\":a};r.prototype.S=function(a,b,c){this.j(a,this.g,b,c)};r.prototype.j=function(a,b,c,d){a.selector=a.A=this.l(a,b,c,d)};r.prototype.l=function(a,b,c,d){var e=a.selector.split(td);if(!ed(a)){a=0;for(var f=e.length,g;a<f&&(g=e[a]);a++)e[a]=b.call(this,g,c,d)}return e.join(td)};r.prototype.u=function(a){return a.replace(Db,function(a,c,d){-1<d.indexOf(\"+\")?d=d.replace(/\\+/g,\"___\"):-1<d.indexOf(\"___\")&&(d=d.replace(/___/g,\n\"+\"));return\":\"+c+\"(\"+d+\")\"})};r.prototype.g=function(a,b,c){var d=this,e=!1;a=a.trim();var f=Db.test(a);f&&(a=a.replace(Db,function(a,b,c){return\":\"+b+\"(\"+c.replace(/\\s/g,\"\")+\")\"}),a=this.u(a));a=a.replace(Ve,Eb+\" $1\");a=a.replace(We,function(a,f,k){e||(a=d.D(k,f,b,c),e=e||a.stop,f=a.lb,k=a.value);return f+k});f&&(a=this.u(a));return a};r.prototype.D=function(a,b,c,d){var e=a.indexOf(Fb);0<=a.indexOf(Eb)?a=this.H(a,d):0!==e&&(a=c?this.s(a,c):a);c=!1;0<=e&&(b=\"\",c=!0);if(c){var f=!0;c&&(a=a.replace(Xe,\nfunction(a,b){return\" > \"+b}))}a=a.replace(Ye,function(a,b,c){return'[dir=\"'+c+'\"] '+b+\", \"+b+'[dir=\"'+c+'\"]'});return{value:a,lb:b,stop:f}};r.prototype.s=function(a,b){a=a.split(ud);a[0]+=b;return a.join(ud)};r.prototype.H=function(a,b){var c=a.match(vd);return(c=c&&c[2].trim()||\"\")?c[0].match(wd)?a.replace(vd,function(a,c,f){return b+f}):c.split(wd)[0]===b?c:Ze:a.replace(Eb,b)};r.prototype.R=function(a){a.selector=a.parsedSelector;this.v(a);this.j(a,this.L)};r.prototype.v=function(a){a.selector===\n$e&&(a.selector=\"html\")};r.prototype.L=function(a){return a.match(Fb)?this.g(a,xd):this.s(a.trim(),xd)};Jb.Object.defineProperties(r.prototype,{c:{configurable:!0,enumerable:!0,get:function(){return\"style-scope\"}}});var Db=/:(nth[-\\w]+)\\(([^)]+)\\)/,xd=\":not(.style-scope)\",td=\",\",We=/(^|[\\s>+~]+)((?:\\[.+?\\]|[^\\s>+~=[])+)/g,wd=/[[.:#*]/,Eb=\":host\",$e=\":root\",Fb=\"::slotted\",Ve=new RegExp(\"^(\"+Fb+\")\"),vd=/(:host)(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))/,Xe=/(?:::slotted)(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))/,Ye=\n/(.*):dir\\((?:(ltr|rtl))\\)/,Ue=\".\",ud=\":\",Te=\"class\",Ze=\"should_not_match\",w=new r;t.get=function(a){return a?a.__styleInfo:null};t.set=function(a,b){return a.__styleInfo=b};t.prototype.c=function(){return this.G};t.prototype._getStyleRules=t.prototype.c;var yd=function(a){return a.matches||a.matchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector||a.webkitMatchesSelector}(window.Element.prototype),af=navigator.userAgent.match(\"Trident\");p.prototype.R=function(a){var b=this,\nc={},d=[],e=0;ca(a,function(a){b.c(a);a.index=e++;b.I(a.w.cssText,c)},function(a){d.push(a)});a.b=d;a=[];for(var f in c)a.push(f);return a};p.prototype.c=function(a){if(!a.w){var b={},c={};this.b(a,c)&&(b.F=c,a.rules=null);b.cssText=this.H(a);a.w=b}};p.prototype.b=function(a,b){var c=a.w;if(c){if(c.F)return Object.assign(b,c.F),!0}else{c=a.parsedCssText;for(var d;a=Ea.exec(c);){d=(a[2]||a[3]).trim();if(\"inherit\"!==d||\"unset\"!==d)b[a[1].trim()]=d;d=!0}return d}};p.prototype.H=function(a){return this.L(a.parsedCssText)};\np.prototype.L=function(a){return a.replace(Se,\"\").replace(Ea,\"\")};p.prototype.I=function(a,b){for(var c;c=Qe.exec(a);){var d=c[1];\":\"!==c[2]&&(b[d]=!0)}};p.prototype.ea=function(a){for(var b=Object.getOwnPropertyNames(a),c=0,d;c<b.length;c++)d=b[c],a[d]=this.a(a[d],a)};p.prototype.a=function(a,b){if(a)if(0<=a.indexOf(\";\"))a=this.f(a,b);else{var c=this;a=gd(a,function(a,e,f,g){if(!e)return a+g;(e=c.a(b[e],b))&&\"initial\"!==e?\"apply-shim-inherit\"===e&&(e=\"inherit\"):e=c.a(b[f]||f,b)||f;return a+(e||\"\")+\ng})}return a&&a.trim()||\"\"};p.prototype.f=function(a,b){a=a.split(\";\");for(var c=0,d,e;c<a.length;c++)if(d=a[c]){Fa.lastIndex=0;if(e=Fa.exec(d))d=this.a(b[e[1]],b);else if(e=d.indexOf(\":\"),-1!==e){var f=d.substring(e);f=f.trim();f=this.a(f,b)||f;d=d.substring(0,e)+f}a[c]=d&&d.lastIndexOf(\";\")===d.length-1?d.slice(0,-1):d||\"\"}return a.join(\";\")};p.prototype.D=function(a,b){var c=\"\";a.w||this.c(a);a.w.cssText&&(c=this.f(a.w.cssText,b));a.cssText=c};p.prototype.C=function(a,b){var c=a.cssText,d=a.cssText;\nnull==a.Ga&&(a.Ga=Re.test(c));if(a.Ga)if(null==a.ca){a.ca=[];for(var e in b)d=b[e],d=d(c),c!==d&&(c=d,a.ca.push(e))}else{for(e=0;e<a.ca.length;++e)d=b[a.ca[e]],c=d(c);d=c}a.cssText=d};p.prototype.da=function(a,b){var c={},d=this,e=[];ca(a,function(a){a.w||d.c(a);var f=a.A||a.parsedSelector;b&&a.w.F&&f&&yd.call(b,f)&&(d.b(a,c),a=a.index,f=parseInt(a/32,10),e[f]=(e[f]||0)|1<<a%32)},null,!0);return{F:c,key:e}};p.prototype.ga=function(a,b,c,d){b.w||this.c(b);if(b.w.F){var e=T(a);a=e.is;e=e.Z;e=a?w.f(a,\ne):\"html\";var f=b.parsedSelector,g=\":host > *\"===f||\"html\"===f,h=0===f.indexOf(\":host\")&&!g;\"shady\"===c&&(g=f===e+\" > *.\"+e||-1!==f.indexOf(\"html\"),h=!g&&0===f.indexOf(e));\"shadow\"===c&&(g=\":host > *\"===f||\"html\"===f,h=h&&!g);if(g||h)c=e,h&&(q&&!b.A&&(b.A=w.l(b,w.g,w.h(a),e)),c=b.A||e),d({wb:c,qb:h,Fb:g})}};p.prototype.S=function(a,b){var c={},d={},e=this,f=b&&b.__cssBuild;ca(b,function(b){e.ga(a,b,f,function(f){yd.call(a.Db||a,f.wb)&&(f.qb?e.b(b,c):e.b(b,d))})},null,!0);return{ub:d,pb:c}};p.prototype.fa=\nfunction(a,b,c){var d=this,e=T(a),f=w.f(e.is,e.Z),g=new RegExp(\"(?:^|[^.#[:])\"+(a.extends?\"\\\\\"+f.slice(0,-1)+\"\\\\]\":f)+\"($|[.:[\\\\s>+~])\");e=t.get(a).G;var h=this.h(e,c);return w.b(a,e,function(a){d.D(a,b);q||ed(a)||!a.cssText||(d.C(a,h),d.l(a,g,f,c))})};p.prototype.h=function(a,b){a=a.b;var c={};if(!q&&a)for(var d=0,e=a[d];d<a.length;e=a[++d])this.j(e,b),c[e.keyframesName]=this.i(e);return c};p.prototype.i=function(a){return function(b){return b.replace(a.f,a.a)}};p.prototype.j=function(a,b){a.f=new RegExp(a.keyframesName,\n\"g\");a.a=a.keyframesName+\"-\"+b;a.A=a.A||a.selector;a.selector=a.A.replace(a.keyframesName,a.a)};p.prototype.l=function(a,b,c,d){a.A=a.A||a.selector;d=\".\"+d;for(var e=a.A.split(\",\"),f=0,g=e.length,h;f<g&&(h=e[f]);f++)e[f]=h.match(b)?h.replace(c,d):d+\" \"+h;a.selector=e.join(\",\")};p.prototype.u=function(a,b,c){var d=a.getAttribute(\"class\")||\"\",e=d;c&&(e=d.replace(new RegExp(\"\\\\s*x-scope\\\\s*\"+c+\"\\\\s*\",\"g\"),\" \"));e+=(e?\" \":\"\")+\"x-scope \"+b;d!==e&&za(a,e)};p.prototype.v=function(a,b,c,d){b=d?d.textContent||\n\"\":this.fa(a,b,c);var e=t.get(a),f=e.a;f&&!q&&f!==d&&(f._useCount--,0>=f._useCount&&f.parentNode&&f.parentNode.removeChild(f));q?e.a?(e.a.textContent=b,d=e.a):b&&(d=ub(b,c,a.shadowRoot,e.b)):d?d.parentNode||(af&&-1<b.indexOf(\"@media\")&&(d.textContent=b),fd(d,null,e.b)):b&&(d=ub(b,c,null,e.b));d&&(d._useCount=d._useCount||0,e.a!=d&&d._useCount++,e.a=d);return d};p.prototype.s=function(a,b){var c=ya(a),d=this;a.textContent=ba(c,function(a){var c=a.cssText=a.parsedCssText;a.w&&a.w.cssText&&(c=c.replace(G.Ea,\n\"\").replace(G.Ia,\"\"),a.cssText=d.f(c,b))})};Jb.Object.defineProperties(p.prototype,{g:{configurable:!0,enumerable:!0,get:function(){return\"x-scope\"}}});var O=new p,Gb={},Ga=window.customElements;if(Ga&&!q){var bf=Ga.define;Ga.define=function(a,b,c){var d=document.createComment(\" Shady DOM styles for \"+a+\" \"),e=document.head;e.insertBefore(d,(S?S.nextSibling:null)||e.firstChild);S=d;Gb[a]=d;return bf.call(Ga,a,b,c)}}pa.prototype.a=function(a,b,c){for(var d=0;d<c.length;d++){var e=c[d];if(a.F[e]!==\nb[e])return!1}return!0};pa.prototype.b=function(a,b,c,d){var e=this.cache[a]||[];e.push({F:b,styleElement:c,B:d});e.length>this.c&&e.shift();this.cache[a]=e};pa.prototype.fetch=function(a,b,c){if(a=this.cache[a])for(var d=a.length-1;0<=d;d--){var e=a[d];if(this.a(e,b,c))return e}};if(!q){var zd=new MutationObserver(hd),Ad=function(a){zd.observe(a,{childList:!0,subtree:!0})};if(window.customElements&&!window.customElements.polyfillWrapFlushCallback)Ad(document);else{var Hb=function(){Ad(document.body)};\nwindow.HTMLImports?window.HTMLImports.whenReady(Hb):requestAnimationFrame(function(){if(\"loading\"===document.readyState){var a=function(){Hb();document.removeEventListener(\"readystatechange\",a)};document.addEventListener(\"readystatechange\",a)}else Hb()})}Lb=function(){hd(zd.takeRecords())}}var Aa={},Ee=Promise.resolve(),vb=null,jd=window.HTMLImports&&window.HTMLImports.whenReady||null,wb,Ha=null,oa=null;F.prototype.Fa=function(){!this.enqueued&&oa&&(this.enqueued=!0,Kb(oa))};F.prototype.b=function(a){a.__seenByShadyCSS||\n(a.__seenByShadyCSS=!0,this.customStyles.push(a),this.Fa())};F.prototype.a=function(a){return a.__shadyCSSCachedStyle?a.__shadyCSSCachedStyle:a.getStyle?a.getStyle():a};F.prototype.c=function(){for(var a=this.customStyles,b=0;b<a.length;b++){var c=a[b];if(!c.__shadyCSSCachedStyle){var d=this.a(c);d&&(d=d.__appliedElement||d,Ha&&Ha(d),c.__shadyCSSCachedStyle=d)}}return a};F.prototype.addCustomStyle=F.prototype.b;F.prototype.getStyleForCustomStyle=F.prototype.a;F.prototype.processStyles=F.prototype.c;\nObject.defineProperties(F.prototype,{transformCallback:{get:function(){return Ha},set:function(a){Ha=a}},validateCallback:{get:function(){return oa},set:function(a){var b=!1;oa||(b=!0);oa=a;b&&this.Fa()}}});var Bd=new pa;k.prototype.C=function(){Lb()};k.prototype.S=function(a){var b=this.s[a]=(this.s[a]||0)+1;return a+\"-\"+b};k.prototype.Ra=function(a){return ya(a)};k.prototype.Ta=function(a){return ba(a)};k.prototype.R=function(a){a=a.content.querySelectorAll(\"style\");for(var b=[],c=0;c<a.length;c++){var d=\na[c];b.push(d.textContent);d.parentNode.removeChild(d)}return b.join(\"\").trim()};k.prototype.ea=function(a){return(a=a.content.querySelector(\"style\"))?a.getAttribute(\"css-build\")||\"\":\"\"};k.prototype.prepareTemplate=function(a,b,c){if(!a.f){a.f=!0;a.name=b;a.extends=c;Aa[b]=a;var d=this.ea(a),e=this.R(a);c={is:b,extends:c,Ab:d};q||w.a(a.content,b);this.c();var f=Fa.test(e)||Ea.test(e);Fa.lastIndex=0;Ea.lastIndex=0;e=tb(e);f&&v&&this.a&&this.a.transformRules(e,b);a._styleAst=e;a.g=d;d=[];v||(d=O.R(a._styleAst));\nif(!d.length||v)b=this.da(c,a._styleAst,q?a.content:null,Gb[b]),a.a=b;a.c=d}};k.prototype.da=function(a,b,c,d){b=w.b(a,b);if(b.length)return ub(b,a.is,c,d)};k.prototype.ga=function(a){var b=T(a),c=b.is;b=b.Z;var d=Gb[c];c=Aa[c];if(c){var e=c._styleAst;var f=c.c}return t.set(a,new t(e,d,f,0,b))};k.prototype.H=function(){!this.a&&window.ShadyCSS&&window.ShadyCSS.ApplyShim&&(this.a=window.ShadyCSS.ApplyShim,this.a.invalidCallback=Ce)};k.prototype.I=function(){var a=this;!this.b&&window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface&&\n(this.b=window.ShadyCSS.CustomStyleInterface,this.b.transformCallback=function(b){a.v(b)},this.b.validateCallback=function(){requestAnimationFrame(function(){(a.b.enqueued||a.i)&&a.f()})})};k.prototype.c=function(){this.H();this.I()};k.prototype.f=function(){this.c();if(this.b){var a=this.b.processStyles();this.b.enqueued&&(v?this.Pa(a):(this.u(this.g,this.h),this.D(a)),this.b.enqueued=!1,this.i&&!v&&this.styleDocument())}};k.prototype.styleElement=function(a,b){var c=T(a).is,d=t.get(a);d||(d=this.ga(a));\nthis.j(a)||(this.i=!0);b&&(d.P=d.P||{},Object.assign(d.P,b));if(v){if(d.P){b=d.P;for(var e in b)null===e?a.style.removeProperty(e):a.style.setProperty(e,b[e])}if(((e=Aa[c])||this.j(a))&&e&&e.a&&!id(e)){if(id(e)||e._applyShimValidatingVersion!==e._applyShimNextVersion)this.c(),this.a&&this.a.transformRules(e._styleAst,c),e.a.textContent=w.b(a,d.G),De(e);q&&(c=a.shadowRoot)&&(c.querySelector(\"style\").textContent=w.b(a,d.G));d.G=e._styleAst}}else this.u(a,d),d.ra&&d.ra.length&&this.L(a,d)};k.prototype.l=\nfunction(a){return(a=a.getRootNode().host)?t.get(a)?a:this.l(a):this.g};k.prototype.j=function(a){return a===this.g};k.prototype.L=function(a,b){var c=T(a).is,d=Bd.fetch(c,b.K,b.ra),e=d?d.styleElement:null,f=b.B;b.B=d&&d.B||this.S(c);e=O.v(a,b.K,b.B,e);q||O.u(a,b.B,f);d||Bd.b(c,b.K,e,b.B)};k.prototype.u=function(a,b){var c=this.l(a),d=t.get(c);c=Object.create(d.K||null);var e=O.S(a,b.G);a=O.da(d.G,a).F;Object.assign(c,e.pb,a,e.ub);this.fa(c,b.P);O.ea(c);b.K=c};k.prototype.fa=function(a,b){for(var c in b){var d=\nb[c];if(d||0===d)a[c]=d}};k.prototype.styleDocument=function(a){this.styleSubtree(this.g,a)};k.prototype.styleSubtree=function(a,b){var c=a.shadowRoot;(c||this.j(a))&&this.styleElement(a,b);if(b=c&&(c.children||c.childNodes))for(a=0;a<b.length;a++)this.styleSubtree(b[a]);else if(a=a.children||a.childNodes)for(b=0;b<a.length;b++)this.styleSubtree(a[b])};k.prototype.Pa=function(a){for(var b=0;b<a.length;b++){var c=this.b.getStyleForCustomStyle(a[b]);c&&this.Oa(c)}};k.prototype.D=function(a){for(var b=\n0;b<a.length;b++){var c=this.b.getStyleForCustomStyle(a[b]);c&&O.s(c,this.h.K)}};k.prototype.v=function(a){var b=this,c=ya(a);ca(c,function(a){q?w.v(a):w.R(a);v&&(b.c(),b.a&&b.a.transformRule(a))});v?a.textContent=ba(c):this.h.G.rules.push(c)};k.prototype.Oa=function(a){if(v&&this.a){var b=ya(a);this.c();this.a.transformRules(b);a.textContent=ba(b)}};k.prototype.getComputedStyleValue=function(a,b){var c;v||(c=(t.get(a)||t.get(this.l(a))).K[b]);return(c=c||window.getComputedStyle(a).getPropertyValue(b))?\nc.trim():\"\"};k.prototype.Sa=function(a,b){var c=a.getRootNode();b=b?b.split(/\\s/):[];c=c.host&&c.host.localName;if(!c){var d=a.getAttribute(\"class\");if(d){d=d.split(/\\s/);for(var e=0;e<d.length;e++)if(d[e]===w.c){c=d[e+1];break}}}c&&b.push(w.c,c);v||(c=t.get(a))&&c.B&&b.push(O.g,c.B);za(a,b.join(\" \"))};k.prototype.Qa=function(a){return t.get(a)};k.prototype.flush=k.prototype.C;k.prototype.prepareTemplate=k.prototype.prepareTemplate;k.prototype.styleElement=k.prototype.styleElement;k.prototype.styleDocument=\nk.prototype.styleDocument;k.prototype.styleSubtree=k.prototype.styleSubtree;k.prototype.getComputedStyleValue=k.prototype.getComputedStyleValue;k.prototype.setElementClass=k.prototype.Sa;k.prototype._styleInfoForNode=k.prototype.Qa;k.prototype.transformCustomStyleForDocument=k.prototype.v;k.prototype.getStyleAst=k.prototype.Ra;k.prototype.styleAstToString=k.prototype.Ta;k.prototype.flushCustomStyles=k.prototype.f;Object.defineProperties(k.prototype,{nativeShadow:{get:function(){return q}},nativeCss:{get:function(){return v}}});\nvar J=new k;if(window.ShadyCSS){var Cd=window.ShadyCSS.ApplyShim;var Dd=window.ShadyCSS.CustomStyleInterface}window.ShadyCSS={ScopingShim:J,prepareTemplate:function(a,b,c){J.f();J.prepareTemplate(a,b,c)},styleSubtree:function(a,b){J.f();J.styleSubtree(a,b)},styleElement:function(a){J.f();J.styleElement(a)},styleDocument:function(a){J.f();J.styleDocument(a)},getComputedStyleValue:function(a,b){return J.getComputedStyleValue(a,b)},nativeCss:v,nativeShadow:q};Cd&&(window.ShadyCSS.ApplyShim=Cd);Dd&&(window.ShadyCSS.CustomStyleInterface=\nDd);var Ib=window.customElements,Ia=window.HTMLImports;window.WebComponents=window.WebComponents||{};if(Ib&&Ib.polyfillWrapFlushCallback){var Ja,Ed=function(){if(Ja){var a=Ja;Ja=null;a();return!0}},Fd=Ia.whenReady;Ib.polyfillWrapFlushCallback(function(a){Ja=a;Fd(Ed)});Ia.whenReady=function(a){Fd(function(){Ed()?Ia.whenReady(a):a()})}}Ia.whenReady(function(){requestAnimationFrame(function(){window.WebComponents.ready=!0;document.dispatchEvent(new CustomEvent(\"WebComponentsReady\",{bubbles:!0}))})});\nvar Gd=document.createElement(\"style\");Gd.textContent=\"body {transition: opacity ease-in 0.2s; } \\nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \\n\";var Hd=document.querySelector(\"head\");Hd.insertBefore(Gd,Hd.firstChild)})();}).call(this);\n\n//# sourceMappingURL=webcomponents-lite.js.map\n"

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2)(__webpack_require__(13))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "(function(){function o(n){var i=e;n&&(e[n]||(e[n]={}),i=e[n]);if(!i.define||!i.define.packaged)t.original=i.define,i.define=t,i.define.packaged=!0;if(!i.require||!i.require.packaged)r.original=i.require,i.require=r,i.require.packaged=!0}var ACE_NAMESPACE=\"\",e=function(){return this}();!e&&typeof window!=\"undefined\"&&(e=window);if(!ACE_NAMESPACE&&typeof requirejs!=\"undefined\")return;var t=function(e,n,r){if(typeof e!=\"string\"){t.original?t.original.apply(this,arguments):(console.error(\"dropping module because define wasn't a string.\"),console.trace());return}arguments.length==2&&(r=n),t.modules[e]||(t.payloads[e]=r,t.modules[e]=null)};t.modules={},t.payloads={};var n=function(e,t,n){if(typeof t==\"string\"){var i=s(e,t);if(i!=undefined)return n&&n(),i}else if(Object.prototype.toString.call(t)===\"[object Array]\"){var o=[];for(var u=0,a=t.length;u<a;++u){var f=s(e,t[u]);if(f==undefined&&r.original)return;o.push(f)}return n&&n.apply(null,o)||!0}},r=function(e,t){var i=n(\"\",e,t);return i==undefined&&r.original?r.original.apply(this,arguments):i},i=function(e,t){if(t.indexOf(\"!\")!==-1){var n=t.split(\"!\");return i(e,n[0])+\"!\"+i(e,n[1])}if(t.charAt(0)==\".\"){var r=e.split(\"/\").slice(0,-1).join(\"/\");t=r+\"/\"+t;while(t.indexOf(\".\")!==-1&&s!=t){var s=t;t=t.replace(/\\/\\.\\//,\"/\").replace(/[^\\/]+\\/\\.\\.\\//,\"\")}}return t},s=function(e,r){r=i(e,r);var s=t.modules[r];if(!s){s=t.payloads[r];if(typeof s==\"function\"){var o={},u={id:r,uri:\"\",exports:o,packaged:!0},a=function(e,t){return n(r,e,t)},f=s(a,o,u);o=f||u.exports,t.modules[r]=o,delete t.payloads[r]}s=t.modules[r]=o||s}return s};o(ACE_NAMESPACE)})(),define(\"ace/lib/regexp\",[\"require\",\"exports\",\"module\"],function(e,t,n){\"use strict\";function o(e){return(e.global?\"g\":\"\")+(e.ignoreCase?\"i\":\"\")+(e.multiline?\"m\":\"\")+(e.extended?\"x\":\"\")+(e.sticky?\"y\":\"\")}function u(e,t,n){if(Array.prototype.indexOf)return e.indexOf(t,n);for(var r=n||0;r<e.length;r++)if(e[r]===t)return r;return-1}var r={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},i=r.exec.call(/()??/,\"\")[1]===undefined,s=function(){var e=/^/g;return r.test.call(e,\"\"),!e.lastIndex}();if(s&&i)return;RegExp.prototype.exec=function(e){var t=r.exec.apply(this,arguments),n,a;if(typeof e==\"string\"&&t){!i&&t.length>1&&u(t,\"\")>-1&&(a=RegExp(this.source,r.replace.call(o(this),\"g\",\"\")),r.replace.call(e.slice(t.index),a,function(){for(var e=1;e<arguments.length-2;e++)arguments[e]===undefined&&(t[e]=undefined)}));if(this._xregexp&&this._xregexp.captureNames)for(var f=1;f<t.length;f++)n=this._xregexp.captureNames[f-1],n&&(t[n]=t[f]);!s&&this.global&&!t[0].length&&this.lastIndex>t.index&&this.lastIndex--}return t},s||(RegExp.prototype.test=function(e){var t=r.exec.call(this,e);return t&&this.global&&!t[0].length&&this.lastIndex>t.index&&this.lastIndex--,!!t})}),define(\"ace/lib/es5-shim\",[\"require\",\"exports\",\"module\"],function(e,t,n){function r(){}function w(e){try{return Object.defineProperty(e,\"sentinel\",{}),\"sentinel\"in e}catch(t){}}function H(e){return e=+e,e!==e?e=0:e!==0&&e!==1/0&&e!==-1/0&&(e=(e>0||-1)*Math.floor(Math.abs(e))),e}function B(e){var t=typeof e;return e===null||t===\"undefined\"||t===\"boolean\"||t===\"number\"||t===\"string\"}function j(e){var t,n,r;if(B(e))return e;n=e.valueOf;if(typeof n==\"function\"){t=n.call(e);if(B(t))return t}r=e.toString;if(typeof r==\"function\"){t=r.call(e);if(B(t))return t}throw new TypeError}Function.prototype.bind||(Function.prototype.bind=function(t){var n=this;if(typeof n!=\"function\")throw new TypeError(\"Function.prototype.bind called on incompatible \"+n);var i=u.call(arguments,1),s=function(){if(this instanceof s){var e=n.apply(this,i.concat(u.call(arguments)));return Object(e)===e?e:this}return n.apply(t,i.concat(u.call(arguments)))};return n.prototype&&(r.prototype=n.prototype,s.prototype=new r,r.prototype=null),s});var i=Function.prototype.call,s=Array.prototype,o=Object.prototype,u=s.slice,a=i.bind(o.toString),f=i.bind(o.hasOwnProperty),l,c,h,p,d;if(d=f(o,\"__defineGetter__\"))l=i.bind(o.__defineGetter__),c=i.bind(o.__defineSetter__),h=i.bind(o.__lookupGetter__),p=i.bind(o.__lookupSetter__);if([1,2].splice(0).length!=2)if(!function(){function e(e){var t=new Array(e+2);return t[0]=t[1]=0,t}var t=[],n;t.splice.apply(t,e(20)),t.splice.apply(t,e(26)),n=t.length,t.splice(5,0,\"XXX\"),n+1==t.length;if(n+1==t.length)return!0}())Array.prototype.splice=function(e,t){var n=this.length;e>0?e>n&&(e=n):e==void 0?e=0:e<0&&(e=Math.max(n+e,0)),e+t<n||(t=n-e);var r=this.slice(e,e+t),i=u.call(arguments,2),s=i.length;if(e===n)s&&this.push.apply(this,i);else{var o=Math.min(t,n-e),a=e+o,f=a+s-o,l=n-a,c=n-o;if(f<a)for(var h=0;h<l;++h)this[f+h]=this[a+h];else if(f>a)for(h=l;h--;)this[f+h]=this[a+h];if(s&&e===c)this.length=c,this.push.apply(this,i);else{this.length=c+s;for(h=0;h<s;++h)this[e+h]=i[h]}}return r};else{var v=Array.prototype.splice;Array.prototype.splice=function(e,t){return arguments.length?v.apply(this,[e===void 0?0:e,t===void 0?this.length-e:t].concat(u.call(arguments,2))):[]}}Array.isArray||(Array.isArray=function(t){return a(t)==\"[object Array]\"});var m=Object(\"a\"),g=m[0]!=\"a\"||!(0 in m);Array.prototype.forEach||(Array.prototype.forEach=function(t){var n=F(this),r=g&&a(this)==\"[object String]\"?this.split(\"\"):n,i=arguments[1],s=-1,o=r.length>>>0;if(a(t)!=\"[object Function]\")throw new TypeError;while(++s<o)s in r&&t.call(i,r[s],s,n)}),Array.prototype.map||(Array.prototype.map=function(t){var n=F(this),r=g&&a(this)==\"[object String]\"?this.split(\"\"):n,i=r.length>>>0,s=Array(i),o=arguments[1];if(a(t)!=\"[object Function]\")throw new TypeError(t+\" is not a function\");for(var u=0;u<i;u++)u in r&&(s[u]=t.call(o,r[u],u,n));return s}),Array.prototype.filter||(Array.prototype.filter=function(t){var n=F(this),r=g&&a(this)==\"[object String]\"?this.split(\"\"):n,i=r.length>>>0,s=[],o,u=arguments[1];if(a(t)!=\"[object Function]\")throw new TypeError(t+\" is not a function\");for(var f=0;f<i;f++)f in r&&(o=r[f],t.call(u,o,f,n)&&s.push(o));return s}),Array.prototype.every||(Array.prototype.every=function(t){var n=F(this),r=g&&a(this)==\"[object String]\"?this.split(\"\"):n,i=r.length>>>0,s=arguments[1];if(a(t)!=\"[object Function]\")throw new TypeError(t+\" is not a function\");for(var o=0;o<i;o++)if(o in r&&!t.call(s,r[o],o,n))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(t){var n=F(this),r=g&&a(this)==\"[object String]\"?this.split(\"\"):n,i=r.length>>>0,s=arguments[1];if(a(t)!=\"[object Function]\")throw new TypeError(t+\" is not a function\");for(var o=0;o<i;o++)if(o in r&&t.call(s,r[o],o,n))return!0;return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(t){var n=F(this),r=g&&a(this)==\"[object String]\"?this.split(\"\"):n,i=r.length>>>0;if(a(t)!=\"[object Function]\")throw new TypeError(t+\" is not a function\");if(!i&&arguments.length==1)throw new TypeError(\"reduce of empty array with no initial value\");var s=0,o;if(arguments.length>=2)o=arguments[1];else do{if(s in r){o=r[s++];break}if(++s>=i)throw new TypeError(\"reduce of empty array with no initial value\")}while(!0);for(;s<i;s++)s in r&&(o=t.call(void 0,o,r[s],s,n));return o}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(t){var n=F(this),r=g&&a(this)==\"[object String]\"?this.split(\"\"):n,i=r.length>>>0;if(a(t)!=\"[object Function]\")throw new TypeError(t+\" is not a function\");if(!i&&arguments.length==1)throw new TypeError(\"reduceRight of empty array with no initial value\");var s,o=i-1;if(arguments.length>=2)s=arguments[1];else do{if(o in r){s=r[o--];break}if(--o<0)throw new TypeError(\"reduceRight of empty array with no initial value\")}while(!0);do o in this&&(s=t.call(void 0,s,r[o],o,n));while(o--);return s});if(!Array.prototype.indexOf||[0,1].indexOf(1,2)!=-1)Array.prototype.indexOf=function(t){var n=g&&a(this)==\"[object String]\"?this.split(\"\"):F(this),r=n.length>>>0;if(!r)return-1;var i=0;arguments.length>1&&(i=H(arguments[1])),i=i>=0?i:Math.max(0,r+i);for(;i<r;i++)if(i in n&&n[i]===t)return i;return-1};if(!Array.prototype.lastIndexOf||[0,1].lastIndexOf(0,-3)!=-1)Array.prototype.lastIndexOf=function(t){var n=g&&a(this)==\"[object String]\"?this.split(\"\"):F(this),r=n.length>>>0;if(!r)return-1;var i=r-1;arguments.length>1&&(i=Math.min(i,H(arguments[1]))),i=i>=0?i:r-Math.abs(i);for(;i>=0;i--)if(i in n&&t===n[i])return i;return-1};Object.getPrototypeOf||(Object.getPrototypeOf=function(t){return t.__proto__||(t.constructor?t.constructor.prototype:o)});if(!Object.getOwnPropertyDescriptor){var y=\"Object.getOwnPropertyDescriptor called on a non-object: \";Object.getOwnPropertyDescriptor=function(t,n){if(typeof t!=\"object\"&&typeof t!=\"function\"||t===null)throw new TypeError(y+t);if(!f(t,n))return;var r,i,s;r={enumerable:!0,configurable:!0};if(d){var u=t.__proto__;t.__proto__=o;var i=h(t,n),s=p(t,n);t.__proto__=u;if(i||s)return i&&(r.get=i),s&&(r.set=s),r}return r.value=t[n],r}}Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(t){return Object.keys(t)});if(!Object.create){var b;Object.prototype.__proto__===null?b=function(){return{__proto__:null}}:b=function(){var e={};for(var t in e)e[t]=null;return e.constructor=e.hasOwnProperty=e.propertyIsEnumerable=e.isPrototypeOf=e.toLocaleString=e.toString=e.valueOf=e.__proto__=null,e},Object.create=function(t,n){var r;if(t===null)r=b();else{if(typeof t!=\"object\")throw new TypeError(\"typeof prototype[\"+typeof t+\"] != 'object'\");var i=function(){};i.prototype=t,r=new i,r.__proto__=t}return n!==void 0&&Object.defineProperties(r,n),r}}if(Object.defineProperty){var E=w({}),S=typeof document==\"undefined\"||w(document.createElement(\"div\"));if(!E||!S)var x=Object.defineProperty}if(!Object.defineProperty||x){var T=\"Property description must be an object: \",N=\"Object.defineProperty called on non-object: \",C=\"getters & setters can not be defined on this javascript engine\";Object.defineProperty=function(t,n,r){if(typeof t!=\"object\"&&typeof t!=\"function\"||t===null)throw new TypeError(N+t);if(typeof r!=\"object\"&&typeof r!=\"function\"||r===null)throw new TypeError(T+r);if(x)try{return x.call(Object,t,n,r)}catch(i){}if(f(r,\"value\"))if(d&&(h(t,n)||p(t,n))){var s=t.__proto__;t.__proto__=o,delete t[n],t[n]=r.value,t.__proto__=s}else t[n]=r.value;else{if(!d)throw new TypeError(C);f(r,\"get\")&&l(t,n,r.get),f(r,\"set\")&&c(t,n,r.set)}return t}}Object.defineProperties||(Object.defineProperties=function(t,n){for(var r in n)f(n,r)&&Object.defineProperty(t,r,n[r]);return t}),Object.seal||(Object.seal=function(t){return t}),Object.freeze||(Object.freeze=function(t){return t});try{Object.freeze(function(){})}catch(k){Object.freeze=function(t){return function(n){return typeof n==\"function\"?n:t(n)}}(Object.freeze)}Object.preventExtensions||(Object.preventExtensions=function(t){return t}),Object.isSealed||(Object.isSealed=function(t){return!1}),Object.isFrozen||(Object.isFrozen=function(t){return!1}),Object.isExtensible||(Object.isExtensible=function(t){if(Object(t)===t)throw new TypeError;var n=\"\";while(f(t,n))n+=\"?\";t[n]=!0;var r=f(t,n);return delete t[n],r});if(!Object.keys){var L=!0,A=[\"toString\",\"toLocaleString\",\"valueOf\",\"hasOwnProperty\",\"isPrototypeOf\",\"propertyIsEnumerable\",\"constructor\"],O=A.length;for(var M in{toString:null})L=!1;Object.keys=function I(e){if(typeof e!=\"object\"&&typeof e!=\"function\"||e===null)throw new TypeError(\"Object.keys called on a non-object\");var I=[];for(var t in e)f(e,t)&&I.push(t);if(L)for(var n=0,r=O;n<r;n++){var i=A[n];f(e,i)&&I.push(i)}return I}}Date.now||(Date.now=function(){return(new Date).getTime()});var _=\"\t\\n\u000b\\f\\r \\u00a0\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\u2028\\u2029\\ufeff\";if(!String.prototype.trim||_.trim()){_=\"[\"+_+\"]\";var D=new RegExp(\"^\"+_+_+\"*\"),P=new RegExp(_+_+\"*$\");String.prototype.trim=function(){return String(this).replace(D,\"\").replace(P,\"\")}}var F=function(e){if(e==null)throw new TypeError(\"can't convert \"+e+\" to object\");return Object(e)}}),define(\"ace/lib/fixoldbrowsers\",[\"require\",\"exports\",\"module\",\"ace/lib/regexp\",\"ace/lib/es5-shim\"],function(e,t,n){\"use strict\";e(\"./regexp\"),e(\"./es5-shim\")}),define(\"ace/lib/dom\",[\"require\",\"exports\",\"module\"],function(e,t,n){\"use strict\";var r=\"http://www.w3.org/1999/xhtml\";t.getDocumentHead=function(e){return e||(e=document),e.head||e.getElementsByTagName(\"head\")[0]||e.documentElement},t.createElement=function(e,t){return document.createElementNS?document.createElementNS(t||r,e):document.createElement(e)},t.hasCssClass=function(e,t){var n=(e.className+\"\").split(/\\s+/g);return n.indexOf(t)!==-1},t.addCssClass=function(e,n){t.hasCssClass(e,n)||(e.className+=\" \"+n)},t.removeCssClass=function(e,t){var n=e.className.split(/\\s+/g);for(;;){var r=n.indexOf(t);if(r==-1)break;n.splice(r,1)}e.className=n.join(\" \")},t.toggleCssClass=function(e,t){var n=e.className.split(/\\s+/g),r=!0;for(;;){var i=n.indexOf(t);if(i==-1)break;r=!1,n.splice(i,1)}return r&&n.push(t),e.className=n.join(\" \"),r},t.setCssClass=function(e,n,r){r?t.addCssClass(e,n):t.removeCssClass(e,n)},t.hasCssString=function(e,t){var n=0,r;t=t||document;if(t.createStyleSheet&&(r=t.styleSheets)){while(n<r.length)if(r[n++].owningElement.id===e)return!0}else if(r=t.getElementsByTagName(\"style\"))while(n<r.length)if(r[n++].id===e)return!0;return!1},t.importCssString=function(n,r,i){i=i||document;if(r&&t.hasCssString(r,i))return null;var s;r&&(n+=\"\\n/*# sourceURL=ace/css/\"+r+\" */\"),i.createStyleSheet?(s=i.createStyleSheet(),s.cssText=n,r&&(s.owningElement.id=r)):(s=t.createElement(\"style\"),s.appendChild(i.createTextNode(n)),r&&(s.id=r),t.getDocumentHead(i).appendChild(s))},t.importCssStylsheet=function(e,n){if(n.createStyleSheet)n.createStyleSheet(e);else{var r=t.createElement(\"link\");r.rel=\"stylesheet\",r.href=e,t.getDocumentHead(n).appendChild(r)}},t.getInnerWidth=function(e){return parseInt(t.computedStyle(e,\"paddingLeft\"),10)+parseInt(t.computedStyle(e,\"paddingRight\"),10)+e.clientWidth},t.getInnerHeight=function(e){return parseInt(t.computedStyle(e,\"paddingTop\"),10)+parseInt(t.computedStyle(e,\"paddingBottom\"),10)+e.clientHeight},t.scrollbarWidth=function(e){var n=t.createElement(\"ace_inner\");n.style.width=\"100%\",n.style.minWidth=\"0px\",n.style.height=\"200px\",n.style.display=\"block\";var r=t.createElement(\"ace_outer\"),i=r.style;i.position=\"absolute\",i.left=\"-10000px\",i.overflow=\"hidden\",i.width=\"200px\",i.minWidth=\"0px\",i.height=\"150px\",i.display=\"block\",r.appendChild(n);var s=e.documentElement;s.appendChild(r);var o=n.offsetWidth;i.overflow=\"scroll\";var u=n.offsetWidth;return o==u&&(u=r.clientWidth),s.removeChild(r),o-u};if(typeof document==\"undefined\"){t.importCssString=function(){};return}window.pageYOffset!==undefined?(t.getPageScrollTop=function(){return window.pageYOffset},t.getPageScrollLeft=function(){return window.pageXOffset}):(t.getPageScrollTop=function(){return document.body.scrollTop},t.getPageScrollLeft=function(){return document.body.scrollLeft}),window.getComputedStyle?t.computedStyle=function(e,t){return t?(window.getComputedStyle(e,\"\")||{})[t]||\"\":window.getComputedStyle(e,\"\")||{}}:t.computedStyle=function(e,t){return t?e.currentStyle[t]:e.currentStyle},t.setInnerHtml=function(e,t){var n=e.cloneNode(!1);return n.innerHTML=t,e.parentNode.replaceChild(n,e),n},\"textContent\"in document.documentElement?(t.setInnerText=function(e,t){e.textContent=t},t.getInnerText=function(e){return e.textContent}):(t.setInnerText=function(e,t){e.innerText=t},t.getInnerText=function(e){return e.innerText}),t.getParentWindow=function(e){return e.defaultView||e.parentWindow}}),define(\"ace/lib/oop\",[\"require\",\"exports\",\"module\"],function(e,t,n){\"use strict\";t.inherits=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})},t.mixin=function(e,t){for(var n in t)e[n]=t[n];return e},t.implement=function(e,n){t.mixin(e,n)}}),define(\"ace/lib/keys\",[\"require\",\"exports\",\"module\",\"ace/lib/fixoldbrowsers\",\"ace/lib/oop\"],function(e,t,n){\"use strict\";e(\"./fixoldbrowsers\");var r=e(\"./oop\"),i=function(){var e={MODIFIER_KEYS:{16:\"Shift\",17:\"Ctrl\",18:\"Alt\",224:\"Meta\"},KEY_MODS:{ctrl:1,alt:2,option:2,shift:4,\"super\":8,meta:8,command:8,cmd:8},FUNCTION_KEYS:{8:\"Backspace\",9:\"Tab\",13:\"Return\",19:\"Pause\",27:\"Esc\",32:\"Space\",33:\"PageUp\",34:\"PageDown\",35:\"End\",36:\"Home\",37:\"Left\",38:\"Up\",39:\"Right\",40:\"Down\",44:\"Print\",45:\"Insert\",46:\"Delete\",96:\"Numpad0\",97:\"Numpad1\",98:\"Numpad2\",99:\"Numpad3\",100:\"Numpad4\",101:\"Numpad5\",102:\"Numpad6\",103:\"Numpad7\",104:\"Numpad8\",105:\"Numpad9\",\"-13\":\"NumpadEnter\",112:\"F1\",113:\"F2\",114:\"F3\",115:\"F4\",116:\"F5\",117:\"F6\",118:\"F7\",119:\"F8\",120:\"F9\",121:\"F10\",122:\"F11\",123:\"F12\",144:\"Numlock\",145:\"Scrolllock\"},PRINTABLE_KEYS:{32:\" \",48:\"0\",49:\"1\",50:\"2\",51:\"3\",52:\"4\",53:\"5\",54:\"6\",55:\"7\",56:\"8\",57:\"9\",59:\";\",61:\"=\",65:\"a\",66:\"b\",67:\"c\",68:\"d\",69:\"e\",70:\"f\",71:\"g\",72:\"h\",73:\"i\",74:\"j\",75:\"k\",76:\"l\",77:\"m\",78:\"n\",79:\"o\",80:\"p\",81:\"q\",82:\"r\",83:\"s\",84:\"t\",85:\"u\",86:\"v\",87:\"w\",88:\"x\",89:\"y\",90:\"z\",107:\"+\",109:\"-\",110:\".\",186:\";\",187:\"=\",188:\",\",189:\"-\",190:\".\",191:\"/\",192:\"`\",219:\"[\",220:\"\\\\\",221:\"]\",222:\"'\",111:\"/\",106:\"*\"}},t,n;for(n in e.FUNCTION_KEYS)t=e.FUNCTION_KEYS[n].toLowerCase(),e[t]=parseInt(n,10);for(n in e.PRINTABLE_KEYS)t=e.PRINTABLE_KEYS[n].toLowerCase(),e[t]=parseInt(n,10);return r.mixin(e,e.MODIFIER_KEYS),r.mixin(e,e.PRINTABLE_KEYS),r.mixin(e,e.FUNCTION_KEYS),e.enter=e[\"return\"],e.escape=e.esc,e.del=e[\"delete\"],e[173]=\"-\",function(){var t=[\"cmd\",\"ctrl\",\"alt\",\"shift\"];for(var n=Math.pow(2,t.length);n--;)e.KEY_MODS[n]=t.filter(function(t){return n&e.KEY_MODS[t]}).join(\"-\")+\"-\"}(),e.KEY_MODS[0]=\"\",e.KEY_MODS[-1]=\"input-\",e}();r.mixin(t,i),t.keyCodeToString=function(e){var t=i[e];return typeof t!=\"string\"&&(t=String.fromCharCode(e)),t.toLowerCase()}}),define(\"ace/lib/useragent\",[\"require\",\"exports\",\"module\"],function(e,t,n){\"use strict\";t.OS={LINUX:\"LINUX\",MAC:\"MAC\",WINDOWS:\"WINDOWS\"},t.getOS=function(){return t.isMac?t.OS.MAC:t.isLinux?t.OS.LINUX:t.OS.WINDOWS};if(typeof navigator!=\"object\")return;var r=(navigator.platform.match(/mac|win|linux/i)||[\"other\"])[0].toLowerCase(),i=navigator.userAgent;t.isWin=r==\"win\",t.isMac=r==\"mac\",t.isLinux=r==\"linux\",t.isIE=navigator.appName==\"Microsoft Internet Explorer\"||navigator.appName.indexOf(\"MSAppHost\")>=0?parseFloat((i.match(/(?:MSIE |Trident\\/[0-9]+[\\.0-9]+;.*rv:)([0-9]+[\\.0-9]+)/)||[])[1]):parseFloat((i.match(/(?:Trident\\/[0-9]+[\\.0-9]+;.*rv:)([0-9]+[\\.0-9]+)/)||[])[1]),t.isOldIE=t.isIE&&t.isIE<9,t.isGecko=t.isMozilla=(window.Controllers||window.controllers)&&window.navigator.product===\"Gecko\",t.isOldGecko=t.isGecko&&parseInt((i.match(/rv:(\\d+)/)||[])[1],10)<4,t.isOpera=window.opera&&Object.prototype.toString.call(window.opera)==\"[object Opera]\",t.isWebKit=parseFloat(i.split(\"WebKit/\")[1])||undefined,t.isChrome=parseFloat(i.split(\" Chrome/\")[1])||undefined,t.isAIR=i.indexOf(\"AdobeAIR\")>=0,t.isIPad=i.indexOf(\"iPad\")>=0,t.isChromeOS=i.indexOf(\" CrOS \")>=0,t.isIOS=/iPad|iPhone|iPod/.test(i)&&!window.MSStream,t.isIOS&&(t.isMac=!0)}),define(\"ace/lib/event\",[\"require\",\"exports\",\"module\",\"ace/lib/keys\",\"ace/lib/useragent\"],function(e,t,n){\"use strict\";function a(e,t,n){var a=u(t);if(!i.isMac&&s){t.getModifierState&&(t.getModifierState(\"OS\")||t.getModifierState(\"Win\"))&&(a|=8);if(s.altGr){if((3&a)==3)return;s.altGr=0}if(n===18||n===17){var f=\"location\"in t?t.location:t.keyLocation;if(n===17&&f===1)s[n]==1&&(o=t.timeStamp);else if(n===18&&a===3&&f===2){var l=t.timeStamp-o;l<50&&(s.altGr=!0)}}}n in r.MODIFIER_KEYS&&(n=-1),a&8&&n>=91&&n<=93&&(n=-1);if(!a&&n===13){var f=\"location\"in t?t.location:t.keyLocation;if(f===3){e(t,a,-n);if(t.defaultPrevented)return}}if(i.isChromeOS&&a&8){e(t,a,n);if(t.defaultPrevented)return;a&=-9}return!!a||n in r.FUNCTION_KEYS||n in r.PRINTABLE_KEYS?e(t,a,n):!1}function f(){s=Object.create(null)}var r=e(\"./keys\"),i=e(\"./useragent\"),s=null,o=0;t.addListener=function(e,t,n){if(e.addEventListener)return e.addEventListener(t,n,!1);if(e.attachEvent){var r=function(){n.call(e,window.event)};n._wrapper=r,e.attachEvent(\"on\"+t,r)}},t.removeListener=function(e,t,n){if(e.removeEventListener)return e.removeEventListener(t,n,!1);e.detachEvent&&e.detachEvent(\"on\"+t,n._wrapper||n)},t.stopEvent=function(e){return t.stopPropagation(e),t.preventDefault(e),!1},t.stopPropagation=function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},t.preventDefault=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1},t.getButton=function(e){return e.type==\"dblclick\"?0:e.type==\"contextmenu\"||i.isMac&&e.ctrlKey&&!e.altKey&&!e.shiftKey?2:e.preventDefault?e.button:{1:0,2:2,4:1}[e.button]},t.capture=function(e,n,r){function i(e){n&&n(e),r&&r(e),t.removeListener(document,\"mousemove\",n,!0),t.removeListener(document,\"mouseup\",i,!0),t.removeListener(document,\"dragstart\",i,!0)}return t.addListener(document,\"mousemove\",n,!0),t.addListener(document,\"mouseup\",i,!0),t.addListener(document,\"dragstart\",i,!0),i},t.addTouchMoveListener=function(e,n){if(\"ontouchmove\"in e){var r,i;t.addListener(e,\"touchstart\",function(e){var t=e.changedTouches[0];r=t.clientX,i=t.clientY}),t.addListener(e,\"touchmove\",function(e){var t=1,s=e.changedTouches[0];e.wheelX=-(s.clientX-r)/t,e.wheelY=-(s.clientY-i)/t,r=s.clientX,i=s.clientY,n(e)})}},t.addMouseWheelListener=function(e,n){\"onmousewheel\"in e?t.addListener(e,\"mousewheel\",function(e){var t=8;e.wheelDeltaX!==undefined?(e.wheelX=-e.wheelDeltaX/t,e.wheelY=-e.wheelDeltaY/t):(e.wheelX=0,e.wheelY=-e.wheelDelta/t),n(e)}):\"onwheel\"in e?t.addListener(e,\"wheel\",function(e){var t=.35;switch(e.deltaMode){case e.DOM_DELTA_PIXEL:e.wheelX=e.deltaX*t||0,e.wheelY=e.deltaY*t||0;break;case e.DOM_DELTA_LINE:case e.DOM_DELTA_PAGE:e.wheelX=(e.deltaX||0)*5,e.wheelY=(e.deltaY||0)*5}n(e)}):t.addListener(e,\"DOMMouseScroll\",function(e){e.axis&&e.axis==e.HORIZONTAL_AXIS?(e.wheelX=(e.detail||0)*5,e.wheelY=0):(e.wheelX=0,e.wheelY=(e.detail||0)*5),n(e)})},t.addMultiMouseDownListener=function(e,n,r,s){function c(e){t.getButton(e)!==0?o=0:e.detail>1?(o++,o>4&&(o=1)):o=1;if(i.isIE){var c=Math.abs(e.clientX-u)>5||Math.abs(e.clientY-a)>5;if(!f||c)o=1;f&&clearTimeout(f),f=setTimeout(function(){f=null},n[o-1]||600),o==1&&(u=e.clientX,a=e.clientY)}e._clicks=o,r[s](\"mousedown\",e);if(o>4)o=0;else if(o>1)return r[s](l[o],e)}function h(e){o=2,f&&clearTimeout(f),f=setTimeout(function(){f=null},n[o-1]||600),r[s](\"mousedown\",e),r[s](l[o],e)}var o=0,u,a,f,l={2:\"dblclick\",3:\"tripleclick\",4:\"quadclick\"};Array.isArray(e)||(e=[e]),e.forEach(function(e){t.addListener(e,\"mousedown\",c),i.isOldIE&&t.addListener(e,\"dblclick\",h)})};var u=!i.isMac||!i.isOpera||\"KeyboardEvent\"in window?function(e){return 0|(e.ctrlKey?1:0)|(e.altKey?2:0)|(e.shiftKey?4:0)|(e.metaKey?8:0)}:function(e){return 0|(e.metaKey?1:0)|(e.altKey?2:0)|(e.shiftKey?4:0)|(e.ctrlKey?8:0)};t.getModifierString=function(e){return r.KEY_MODS[u(e)]},t.addCommandKeyListener=function(e,n){var r=t.addListener;if(i.isOldGecko||i.isOpera&&!(\"KeyboardEvent\"in window)){var o=null;r(e,\"keydown\",function(e){o=e.keyCode}),r(e,\"keypress\",function(e){return a(n,e,o)})}else{var u=null;r(e,\"keydown\",function(e){s[e.keyCode]=(s[e.keyCode]||0)+1;var t=a(n,e,e.keyCode);return u=e.defaultPrevented,t}),r(e,\"keypress\",function(e){u&&(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey)&&(t.stopEvent(e),u=null)}),r(e,\"keyup\",function(e){s[e.keyCode]=null}),s||(f(),r(window,\"focus\",f))}};if(typeof window==\"object\"&&window.postMessage&&!i.isOldIE){var l=1;t.nextTick=function(e,n){n=n||window;var r=\"zero-timeout-message-\"+l;t.addListener(n,\"message\",function i(s){s.data==r&&(t.stopPropagation(s),t.removeListener(n,\"message\",i),e())}),n.postMessage(r,\"*\")}}t.nextFrame=typeof window==\"object\"&&(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame),t.nextFrame?t.nextFrame=t.nextFrame.bind(window):t.nextFrame=function(e){setTimeout(e,17)}}),define(\"ace/lib/lang\",[\"require\",\"exports\",\"module\"],function(e,t,n){\"use strict\";t.last=function(e){return e[e.length-1]},t.stringReverse=function(e){return e.split(\"\").reverse().join(\"\")},t.stringRepeat=function(e,t){var n=\"\";while(t>0){t&1&&(n+=e);if(t>>=1)e+=e}return n};var r=/^\\s\\s*/,i=/\\s\\s*$/;t.stringTrimLeft=function(e){return e.replace(r,\"\")},t.stringTrimRight=function(e){return e.replace(i,\"\")},t.copyObject=function(e){var t={};for(var n in e)t[n]=e[n];return t},t.copyArray=function(e){var t=[];for(var n=0,r=e.length;n<r;n++)e[n]&&typeof e[n]==\"object\"?t[n]=this.copyObject(e[n]):t[n]=e[n];return t},t.deepCopy=function s(e){if(typeof e!=\"object\"||!e)return e;var t;if(Array.isArray(e)){t=[];for(var n=0;n<e.length;n++)t[n]=s(e[n]);return t}if(Object.prototype.toString.call(e)!==\"[object Object]\")return e;t={};for(var n in e)t[n]=s(e[n]);return t},t.arrayToMap=function(e){var t={};for(var n=0;n<e.length;n++)t[e[n]]=1;return t},t.createMap=function(e){var t=Object.create(null);for(var n in e)t[n]=e[n];return t},t.arrayRemove=function(e,t){for(var n=0;n<=e.length;n++)t===e[n]&&e.splice(n,1)},t.escapeRegExp=function(e){return e.replace(/([.*+?^${}()|[\\]\\/\\\\])/g,\"\\\\$1\")},t.escapeHTML=function(e){return e.replace(/&/g,\"&#38;\").replace(/\"/g,\"&#34;\").replace(/'/g,\"&#39;\").replace(/</g,\"&#60;\")},t.getMatchOffsets=function(e,t){var n=[];return e.replace(t,function(e){n.push({offset:arguments[arguments.length-2],length:e.length})}),n},t.deferredCall=function(e){var t=null,n=function(){t=null,e()},r=function(e){return r.cancel(),t=setTimeout(n,e||0),r};return r.schedule=r,r.call=function(){return this.cancel(),e(),r},r.cancel=function(){return clearTimeout(t),t=null,r},r.isPending=function(){return t},r},t.delayedCall=function(e,t){var n=null,r=function(){n=null,e()},i=function(e){n==null&&(n=setTimeout(r,e||t))};return i.delay=function(e){n&&clearTimeout(n),n=setTimeout(r,e||t)},i.schedule=i,i.call=function(){this.cancel(),e()},i.cancel=function(){n&&clearTimeout(n),n=null},i.isPending=function(){return n},i}}),define(\"ace/keyboard/textinput_ios\",[\"require\",\"exports\",\"module\",\"ace/lib/event\",\"ace/lib/useragent\",\"ace/lib/dom\",\"ace/lib/lang\",\"ace/lib/keys\"],function(e,t,n){\"use strict\";var r=e(\"../lib/event\"),i=e(\"../lib/useragent\"),s=e(\"../lib/dom\"),o=e(\"../lib/lang\"),u=e(\"../lib/keys\"),a=u.KEY_MODS,f=i.isChrome<18,l=i.isIE,c=function(e,t){function x(e){if(m)return;m=!0;if(k)t=0,n=e?0:c.value.length-1;else var t=4,n=5;try{c.setSelectionRange(t,n)}catch(r){}m=!1}function T(){if(m)return;c.value=h,i.isWebKit&&S.schedule()}function R(){clearTimeout(q),q=setTimeout(function(){g&&(c.style.cssText=g,g=\"\"),t.renderer.$keepTextAreaAtCursor==null&&(t.renderer.$keepTextAreaAtCursor=!0,t.renderer.$moveTextAreaToCursor())},0)}var n=this,c=s.createElement(\"textarea\");c.className=i.isIOS?\"ace_text-input ace_text-input-ios\":\"ace_text-input\",i.isTouchPad&&c.setAttribute(\"x-palm-disable-auto-cap\",!0),c.setAttribute(\"wrap\",\"off\"),c.setAttribute(\"autocorrect\",\"off\"),c.setAttribute(\"autocapitalize\",\"off\"),c.setAttribute(\"spellcheck\",!1),c.style.opacity=\"0\",e.insertBefore(c,e.firstChild);var h=\"\\n aaaa a\\n\",p=!1,d=!1,v=!1,m=!1,g=\"\",y=!0;try{var b=document.activeElement===c}catch(w){}r.addListener(c,\"blur\",function(e){t.onBlur(e),b=!1}),r.addListener(c,\"focus\",function(e){b=!0,t.onFocus(e),x()}),this.focus=function(){if(g)return c.focus();c.style.position=\"fixed\",c.focus()},this.blur=function(){c.blur()},this.isFocused=function(){return b};var E=o.delayedCall(function(){b&&x(y)}),S=o.delayedCall(function(){m||(c.value=h,b&&x())});i.isWebKit||t.addEventListener(\"changeSelection\",function(){t.selection.isEmpty()!=y&&(y=!y,E.schedule())}),T(),b&&t.onFocus();var N=function(e){return e.selectionStart===0&&e.selectionEnd===e.value.length},C=function(e){N(c)?(t.selectAll(),x()):k&&x(t.selection.isEmpty())},k=null;this.setInputHandler=function(e){k=e},this.getInputHandler=function(){return k};var L=!1,A=function(e){if(c.selectionStart===4&&c.selectionEnd===5)return;k&&(e=k(e),k=null),v?(x(),e&&t.onPaste(e),v=!1):e==h.substr(0)&&c.selectionStart===4?L?t.execCommand(\"del\",{source:\"ace\"}):t.execCommand(\"backspace\",{source:\"ace\"}):p||(e.substring(0,9)==h&&e.length>h.length?e=e.substr(9):e.substr(0,4)==h.substr(0,4)?e=e.substr(4,e.length-h.length+1):e.charAt(e.length-1)==h.charAt(0)&&(e=e.slice(0,-1)),e!=h.charAt(0)&&e.charAt(e.length-1)==h.charAt(0)&&(e=e.slice(0,-1)),e&&t.onTextInput(e)),p&&(p=!1),L&&(L=!1)},O=function(e){if(m)return;var t=c.value;A(t),T()},M=function(e,t,n){var r=e.clipboardData||window.clipboardData;if(!r||f)return;var i=l||n?\"Text\":\"text/plain\";try{return t?r.setData(i,t)!==!1:r.getData(i)}catch(e){if(!n)return M(e,t,!0)}},_=function(e,n){var s=t.getCopyText();if(!s)return r.preventDefault(e);M(e,s)?(i.isIOS&&(d=n,c.value=\"\\n aa\"+s+\"a a\\n\",c.setSelectionRange(4,4+s.length),p={value:s}),n?t.onCut():t.onCopy(),i.isIOS||r.preventDefault(e)):(p=!0,c.value=s,c.select(),setTimeout(function(){p=!1,T(),x(),n?t.onCut():t.onCopy()}))},D=function(e){_(e,!0)},P=function(e){_(e,!1)},H=function(e){var n=M(e);typeof n==\"string\"?(n&&t.onPaste(n,e),i.isIE&&setTimeout(x),r.preventDefault(e)):(c.value=\"\",v=!0)};r.addCommandKeyListener(c,t.onCommandKey.bind(t)),r.addListener(c,\"select\",C),r.addListener(c,\"input\",O),r.addListener(c,\"cut\",D),r.addListener(c,\"copy\",P),r.addListener(c,\"paste\",H);var B=function(e){if(m||!t.onCompositionStart||t.$readOnly)return;m={},m.canUndo=t.session.$undoManager,t.onCompositionStart(),setTimeout(j,0),t.on(\"mousedown\",F),m.canUndo&&!t.selection.isEmpty()&&(t.insert(\"\"),t.session.markUndoGroup(),t.selection.clearSelection()),t.session.markUndoGroup()},j=function(){if(!m||!t.onCompositionUpdate||t.$readOnly)return;var e=c.value.replace(/\\x01/g,\"\");if(m.lastValue===e)return;t.onCompositionUpdate(e),m.lastValue&&t.undo(),m.canUndo&&(m.lastValue=e);if(m.lastValue){var n=t.selection.getRange();t.insert(m.lastValue),t.session.markUndoGroup(),m.range=t.selection.getRange(),t.selection.setRange(n),t.selection.clearSelection()}},F=function(e){if(!t.onCompositionEnd||t.$readOnly)return;var n=m;m=!1;var r=setTimeout(function(){r=null;var e=c.value.replace(/\\x01/g,\"\");if(m)return;e==n.lastValue?T():!n.lastValue&&e&&(T(),A(e))});k=function(i){return r&&clearTimeout(r),i=i.replace(/\\x01/g,\"\"),i==n.lastValue?\"\":(n.lastValue&&r&&t.undo(),i)},t.onCompositionEnd(),t.removeListener(\"mousedown\",F),e.type==\"compositionend\"&&n.range&&t.selection.setRange(n.range);var s=!!i.isChrome&&i.isChrome>=53||!!i.isWebKit&&i.isWebKit>=603;s&&O()},I=o.delayedCall(j,50);r.addListener(c,\"compositionstart\",B),i.isGecko?r.addListener(c,\"text\",function(){I.schedule()}):(r.addListener(c,\"keyup\",function(){I.schedule()}),r.addListener(c,\"keydown\",function(){I.schedule()})),r.addListener(c,\"compositionend\",F),this.getElement=function(){return c},this.setReadOnly=function(e){c.readOnly=e},this.onContextMenu=function(e){L=!0,x(t.selection.isEmpty()),t._emit(\"nativecontextmenu\",{target:t,domEvent:e}),this.moveToMouse(e,!0)},this.moveToMouse=function(e,n){g||(g=c.style.cssText),c.style.cssText=(n?\"z-index:100000;\":\"\")+\"height:\"+c.style.height+\";\"+(i.isIE?\"opacity:0.1;\":\"\");var o=t.container.getBoundingClientRect(),u=s.computedStyle(t.container),a=o.top+(parseInt(u.borderTopWidth)||0),f=o.left+(parseInt(o.borderLeftWidth)||0),l=o.bottom-a-c.clientHeight-2,h=function(e){c.style.left=e.clientX-f-2+\"px\",c.style.top=Math.min(e.clientY-a-2,l)+\"px\"};h(e);if(e.type!=\"mousedown\")return;t.renderer.$keepTextAreaAtCursor&&(t.renderer.$keepTextAreaAtCursor=null),clearTimeout(q),i.isWin&&r.capture(t.container,h,R)},this.onContextMenuClose=R;var q,U=function(e){t.textInput.onContextMenu(e),R()};r.addListener(c,\"mouseup\",U),r.addListener(c,\"mousedown\",function(e){e.preventDefault(),R()}),r.addListener(t.renderer.scroller,\"contextmenu\",U),r.addListener(c,\"contextmenu\",U);if(i.isIOS){var z=null,W=!1;e.addEventListener(\"keydown\",function(e){z&&clearTimeout(z),W=!0}),e.addEventListener(\"keyup\",function(e){z=setTimeout(function(){W=!1},100)});var X=function(e){if(document.activeElement!==c)return;if(W)return;if(d)return setTimeout(function(){d=!1},100);var n=c.selectionStart,r=c.selectionEnd;c.setSelectionRange(4,5);if(n==r)switch(n){case 0:t.onCommandKey(null,0,u.up);break;case 1:t.onCommandKey(null,0,u.home);break;case 2:t.onCommandKey(null,a.option,u.left);break;case 4:t.onCommandKey(null,0,u.left);break;case 5:t.onCommandKey(null,0,u.right);break;case 7:t.onCommandKey(null,a.option,u.right);break;case 8:t.onCommandKey(null,0,u.end);break;case 9:t.onCommandKey(null,0,u.down)}else{switch(r){case 6:t.onCommandKey(null,a.shift,u.right);break;case 7:t.onCommandKey(null,a.shift|a.option,u.right);break;case 8:t.onCommandKey(null,a.shift,u.end);break;case 9:t.onCommandKey(null,a.shift,u.down)}switch(n){case 0:t.onCommandKey(null,a.shift,u.up);break;case 1:t.onCommandKey(null,a.shift,u.home);break;case 2:t.onCommandKey(null,a.shift|a.option,u.left);break;case 3:t.onCommandKey(null,a.shift,u.left)}}};document.addEventListener(\"selectionchange\",X),t.on(\"destroy\",function(){document.removeEventListener(\"selectionchange\",X)})}};t.TextInput=c}),define(\"ace/keyboard/textinput\",[\"require\",\"exports\",\"module\",\"ace/lib/event\",\"ace/lib/useragent\",\"ace/lib/dom\",\"ace/lib/lang\",\"ace/keyboard/textinput_ios\"],function(e,t,n){\"use strict\";var r=e(\"../lib/event\"),i=e(\"../lib/useragent\"),s=e(\"../lib/dom\"),o=e(\"../lib/lang\"),u=i.isChrome<18,a=i.isIE,f=e(\"./textinput_ios\").TextInput,l=function(e,t){function w(e){if(p)return;p=!0;if(T)t=0,r=e?0:n.value.length-1;else var t=e?2:1,r=2;try{n.setSelectionRange(t,r)}catch(i){}p=!1}function E(){if(p)return;n.value=l,i.isWebKit&&b.schedule()}function F(){clearTimeout(j),j=setTimeout(function(){d&&(n.style.cssText=d,d=\"\"),t.renderer.$keepTextAreaAtCursor==null&&(t.renderer.$keepTextAreaAtCursor=!0,t.renderer.$moveTextAreaToCursor())},0)}if(i.isIOS)return f.call(this,e,t);var n=s.createElement(\"textarea\");n.className=\"ace_text-input\",n.setAttribute(\"wrap\",\"off\"),n.setAttribute(\"autocorrect\",\"off\"),n.setAttribute(\"autocapitalize\",\"off\"),n.setAttribute(\"spellcheck\",!1),n.style.opacity=\"0\",e.insertBefore(n,e.firstChild);var l=\"\\u2028\\u2028\",c=!1,h=!1,p=!1,d=\"\",v=!0;try{var m=document.activeElement===n}catch(g){}r.addListener(n,\"blur\",function(e){t.onBlur(e),m=!1}),r.addListener(n,\"focus\",function(e){m=!0,t.onFocus(e),w()}),this.focus=function(){if(d)return n.focus();var e=n.style.top;n.style.position=\"fixed\",n.style.top=\"0px\",n.focus(),setTimeout(function(){n.style.position=\"\",n.style.top==\"0px\"&&(n.style.top=e)},0)},this.blur=function(){n.blur()},this.isFocused=function(){return m};var y=o.delayedCall(function(){m&&w(v)}),b=o.delayedCall(function(){p||(n.value=l,m&&w())});i.isWebKit||t.addEventListener(\"changeSelection\",function(){t.selection.isEmpty()!=v&&(v=!v,y.schedule())}),E(),m&&t.onFocus();var S=function(e){return e.selectionStart===0&&e.selectionEnd===e.value.length},x=function(e){c?c=!1:S(n)?(t.selectAll(),w()):T&&w(t.selection.isEmpty())},T=null;this.setInputHandler=function(e){T=e},this.getInputHandler=function(){return T};var N=!1,C=function(e){T&&(e=T(e),T=null),h?(w(),e&&t.onPaste(e),h=!1):e==l.charAt(0)?N?t.execCommand(\"del\",{source:\"ace\"}):t.execCommand(\"backspace\",{source:\"ace\"}):(e.substring(0,2)==l?e=e.substr(2):e.charAt(0)==l.charAt(0)?e=e.substr(1):e.charAt(e.length-1)==l.charAt(0)&&(e=e.slice(0,-1)),e.charAt(e.length-1)==l.charAt(0)&&(e=e.slice(0,-1)),e&&t.onTextInput(e)),N&&(N=!1)},k=function(e){if(p)return;var t=n.value;C(t),E()},L=function(e,t,n){var r=e.clipboardData||window.clipboardData;if(!r||u)return;var i=a||n?\"Text\":\"text/plain\";try{return t?r.setData(i,t)!==!1:r.getData(i)}catch(e){if(!n)return L(e,t,!0)}},A=function(e,i){var s=t.getCopyText();if(!s)return r.preventDefault(e);L(e,s)?(i?t.onCut():t.onCopy(),r.preventDefault(e)):(c=!0,n.value=s,n.select(),setTimeout(function(){c=!1,E(),w(),i?t.onCut():t.onCopy()}))},O=function(e){A(e,!0)},M=function(e){A(e,!1)},_=function(e){var s=L(e);typeof s==\"string\"?(s&&t.onPaste(s,e),i.isIE&&setTimeout(w),r.preventDefault(e)):(n.value=\"\",h=!0)};r.addCommandKeyListener(n,t.onCommandKey.bind(t)),r.addListener(n,\"select\",x),r.addListener(n,\"input\",k),r.addListener(n,\"cut\",O),r.addListener(n,\"copy\",M),r.addListener(n,\"paste\",_),(!(\"oncut\"in n)||!(\"oncopy\"in n)||!(\"onpaste\"in n))&&r.addListener(e,\"keydown\",function(e){if(i.isMac&&!e.metaKey||!e.ctrlKey)return;switch(e.keyCode){case 67:M(e);break;case 86:_(e);break;case 88:O(e)}});var D=function(e){if(p||!t.onCompositionStart||t.$readOnly)return;p={},p.canUndo=t.session.$undoManager,t.onCompositionStart(),setTimeout(P,0),t.on(\"mousedown\",H),p.canUndo&&!t.selection.isEmpty()&&(t.insert(\"\"),t.session.markUndoGroup(),t.selection.clearSelection()),t.session.markUndoGroup()},P=function(){if(!p||!t.onCompositionUpdate||t.$readOnly)return;var e=n.value.replace(/\\u2028/g,\"\");if(p.lastValue===e)return;t.onCompositionUpdate(e),p.lastValue&&t.undo(),p.canUndo&&(p.lastValue=e);if(p.lastValue){var r=t.selection.getRange();t.insert(p.lastValue),t.session.markUndoGroup(),p.range=t.selection.getRange(),t.selection.setRange(r),t.selection.clearSelection()}},H=function(e){if(!t.onCompositionEnd||t.$readOnly)return;var r=p;p=!1;var s=setTimeout(function(){s=null;var e=n.value.replace(/\\u2028/g,\"\");if(p)return;e==r.lastValue?E():!r.lastValue&&e&&(E(),C(e))});T=function(n){return s&&clearTimeout(s),n=n.replace(/\\u2028/g,\"\"),n==r.lastValue?\"\":(r.lastValue&&s&&t.undo(),n)},t.onCompositionEnd(),t.removeListener(\"mousedown\",H),e.type==\"compositionend\"&&r.range&&t.selection.setRange(r.range);var o=!!i.isChrome&&i.isChrome>=53||!!i.isWebKit&&i.isWebKit>=603;o&&k()},B=o.delayedCall(P,50);r.addListener(n,\"compositionstart\",D),i.isGecko?r.addListener(n,\"text\",function(){B.schedule()}):(r.addListener(n,\"keyup\",function(){B.schedule()}),r.addListener(n,\"keydown\",function(){B.schedule()})),r.addListener(n,\"compositionend\",H),this.getElement=function(){return n},this.setReadOnly=function(e){n.readOnly=e},this.onContextMenu=function(e){N=!0,w(t.selection.isEmpty()),t._emit(\"nativecontextmenu\",{target:t,domEvent:e}),this.moveToMouse(e,!0)},this.moveToMouse=function(e,o){d||(d=n.style.cssText),n.style.cssText=(o?\"z-index:100000;\":\"\")+\"height:\"+n.style.height+\";\"+(i.isIE?\"opacity:0.1;\":\"\");var u=t.container.getBoundingClientRect(),a=s.computedStyle(t.container),f=u.top+(parseInt(a.borderTopWidth)||0),l=u.left+(parseInt(u.borderLeftWidth)||0),c=u.bottom-f-n.clientHeight-2,h=function(e){n.style.left=e.clientX-l-2+\"px\",n.style.top=Math.min(e.clientY-f-2,c)+\"px\"};h(e);if(e.type!=\"mousedown\")return;t.renderer.$keepTextAreaAtCursor&&(t.renderer.$keepTextAreaAtCursor=null),clearTimeout(j),i.isWin&&r.capture(t.container,h,F)},this.onContextMenuClose=F;var j,I=function(e){t.textInput.onContextMenu(e),F()};r.addListener(n,\"mouseup\",I),r.addListener(n,\"mousedown\",function(e){e.preventDefault(),F()}),r.addListener(t.renderer.scroller,\"contextmenu\",I),r.addListener(n,\"contextmenu\",I)};t.TextInput=l}),define(\"ace/mouse/default_handlers\",[\"require\",\"exports\",\"module\",\"ace/lib/dom\",\"ace/lib/event\",\"ace/lib/useragent\"],function(e,t,n){\"use strict\";function u(e){e.$clickSelection=null;var t=e.editor;t.setDefaultHandler(\"mousedown\",this.onMouseDown.bind(e)),t.setDefaultHandler(\"dblclick\",this.onDoubleClick.bind(e)),t.setDefaultHandler(\"tripleclick\",this.onTripleClick.bind(e)),t.setDefaultHandler(\"quadclick\",this.onQuadClick.bind(e)),t.setDefaultHandler(\"mousewheel\",this.onMouseWheel.bind(e)),t.setDefaultHandler(\"touchmove\",this.onTouchMove.bind(e));var n=[\"select\",\"startSelect\",\"selectEnd\",\"selectAllEnd\",\"selectByWordsEnd\",\"selectByLinesEnd\",\"dragWait\",\"dragWaitEnd\",\"focusWait\"];n.forEach(function(t){e[t]=this[t]},this),e.selectByLines=this.extendSelectionBy.bind(e,\"getLineRange\"),e.selectByWords=this.extendSelectionBy.bind(e,\"getWordRange\")}function a(e,t,n,r){return Math.sqrt(Math.pow(n-e,2)+Math.pow(r-t,2))}function f(e,t){if(e.start.row==e.end.row)var n=2*t.column-e.start.column-e.end.column;else if(e.start.row==e.end.row-1&&!e.start.column&&!e.end.column)var n=t.column-4;else var n=2*t.row-e.start.row-e.end.row;return n<0?{cursor:e.start,anchor:e.end}:{cursor:e.end,anchor:e.start}}var r=e(\"../lib/dom\"),i=e(\"../lib/event\"),s=e(\"../lib/useragent\"),o=0;(function(){this.onMouseDown=function(e){var t=e.inSelection(),n=e.getDocumentPosition();this.mousedownEvent=e;var r=this.editor,i=e.getButton();if(i!==0){var o=r.getSelectionRange(),u=o.isEmpty();r.$blockScrolling++,(u||i==1)&&r.selection.moveToPosition(n),r.$blockScrolling--,i==2&&(r.textInput.onContextMenu(e.domEvent),s.isMozilla||e.preventDefault());return}this.mousedownEvent.time=Date.now();if(t&&!r.isFocused()){r.focus();if(this.$focusTimout&&!this.$clickSelection&&!r.inMultiSelectMode){this.setState(\"focusWait\"),this.captureMouse(e);return}}return this.captureMouse(e),this.startSelect(n,e.domEvent._clicks>1),e.preventDefault()},this.startSelect=function(e,t){e=e||this.editor.renderer.screenToTextCoordinates(this.x,this.y);var n=this.editor;n.$blockScrolling++,this.mousedownEvent.getShiftKey()?n.selection.selectToPosition(e):t||n.selection.moveToPosition(e),t||this.select(),n.renderer.scroller.setCapture&&n.renderer.scroller.setCapture(),n.setStyle(\"ace_selecting\"),this.setState(\"select\"),n.$blockScrolling--},this.select=function(){var e,t=this.editor,n=t.renderer.screenToTextCoordinates(this.x,this.y);t.$blockScrolling++;if(this.$clickSelection){var r=this.$clickSelection.comparePoint(n);if(r==-1)e=this.$clickSelection.end;else if(r==1)e=this.$clickSelection.start;else{var i=f(this.$clickSelection,n);n=i.cursor,e=i.anchor}t.selection.setSelectionAnchor(e.row,e.column)}t.selection.selectToPosition(n),t.$blockScrolling--,t.renderer.scrollCursorIntoView()},this.extendSelectionBy=function(e){var t,n=this.editor,r=n.renderer.screenToTextCoordinates(this.x,this.y),i=n.selection[e](r.row,r.column);n.$blockScrolling++;if(this.$clickSelection){var s=this.$clickSelection.comparePoint(i.start),o=this.$clickSelection.comparePoint(i.end);if(s==-1&&o<=0){t=this.$clickSelection.end;if(i.end.row!=r.row||i.end.column!=r.column)r=i.start}else if(o==1&&s>=0){t=this.$clickSelection.start;if(i.start.row!=r.row||i.start.column!=r.column)r=i.end}else if(s==-1&&o==1)r=i.end,t=i.start;else{var u=f(this.$clickSelection,r);r=u.cursor,t=u.anchor}n.selection.setSelectionAnchor(t.row,t.column)}n.selection.selectToPosition(r),n.$blockScrolling--,n.renderer.scrollCursorIntoView()},this.selectEnd=this.selectAllEnd=this.selectByWordsEnd=this.selectByLinesEnd=function(){this.$clickSelection=null,this.editor.unsetStyle(\"ace_selecting\"),this.editor.renderer.scroller.releaseCapture&&this.editor.renderer.scroller.releaseCapture()},this.focusWait=function(){var e=a(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y),t=Date.now();(e>o||t-this.mousedownEvent.time>this.$focusTimout)&&this.startSelect(this.mousedownEvent.getDocumentPosition())},this.onDoubleClick=function(e){var t=e.getDocumentPosition(),n=this.editor,r=n.session,i=r.getBracketRange(t);i?(i.isEmpty()&&(i.start.column--,i.end.column++),this.setState(\"select\")):(i=n.selection.getWordRange(t.row,t.column),this.setState(\"selectByWords\")),this.$clickSelection=i,this.select()},this.onTripleClick=function(e){var t=e.getDocumentPosition(),n=this.editor;this.setState(\"selectByLines\");var r=n.getSelectionRange();r.isMultiLine()&&r.contains(t.row,t.column)?(this.$clickSelection=n.selection.getLineRange(r.start.row),this.$clickSelection.end=n.selection.getLineRange(r.end.row).end):this.$clickSelection=n.selection.getLineRange(t.row),this.select()},this.onQuadClick=function(e){var t=this.editor;t.selectAll(),this.$clickSelection=t.getSelectionRange(),this.setState(\"selectAll\")},this.onMouseWheel=function(e){if(e.getAccelKey())return;e.getShiftKey()&&e.wheelY&&!e.wheelX&&(e.wheelX=e.wheelY,e.wheelY=0);var t=e.domEvent.timeStamp,n=t-(this.$lastScrollTime||0),r=this.editor,i=r.renderer.isScrollableBy(e.wheelX*e.speed,e.wheelY*e.speed);if(i||n<200)return this.$lastScrollTime=t,r.renderer.scrollBy(e.wheelX*e.speed,e.wheelY*e.speed),e.stop()},this.onTouchMove=function(e){var t=e.domEvent.timeStamp,n=t-(this.$lastScrollTime||0),r=this.editor,i=r.renderer.isScrollableBy(e.wheelX*e.speed,e.wheelY*e.speed);if(i||n<200)return this.$lastScrollTime=t,r.renderer.scrollBy(e.wheelX*e.speed,e.wheelY*e.speed),e.stop()}}).call(u.prototype),t.DefaultHandlers=u}),define(\"ace/tooltip\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/dom\"],function(e,t,n){\"use strict\";function s(e){this.isOpen=!1,this.$element=null,this.$parentNode=e}var r=e(\"./lib/oop\"),i=e(\"./lib/dom\");(function(){this.$init=function(){return this.$element=i.createElement(\"div\"),this.$element.className=\"ace_tooltip\",this.$element.style.display=\"none\",this.$parentNode.appendChild(this.$element),this.$element},this.getElement=function(){return this.$element||this.$init()},this.setText=function(e){i.setInnerText(this.getElement(),e)},this.setHtml=function(e){this.getElement().innerHTML=e},this.setPosition=function(e,t){this.getElement().style.left=e+\"px\",this.getElement().style.top=t+\"px\"},this.setClassName=function(e){i.addCssClass(this.getElement(),e)},this.show=function(e,t,n){e!=null&&this.setText(e),t!=null&&n!=null&&this.setPosition(t,n),this.isOpen||(this.getElement().style.display=\"block\",this.isOpen=!0)},this.hide=function(){this.isOpen&&(this.getElement().style.display=\"none\",this.isOpen=!1)},this.getHeight=function(){return this.getElement().offsetHeight},this.getWidth=function(){return this.getElement().offsetWidth},this.destroy=function(){this.isOpen=!1,this.$element&&this.$element.parentNode&&this.$element.parentNode.removeChild(this.$element)}}).call(s.prototype),t.Tooltip=s}),define(\"ace/mouse/default_gutter_handler\",[\"require\",\"exports\",\"module\",\"ace/lib/dom\",\"ace/lib/oop\",\"ace/lib/event\",\"ace/tooltip\"],function(e,t,n){\"use strict\";function u(e){function l(){var r=u.getDocumentPosition().row,s=n.$annotations[r];if(!s)return c();var o=t.session.getLength();if(r==o){var a=t.renderer.pixelToScreenCoordinates(0,u.y).row,l=u.$pos;if(a>t.session.documentToScreenRow(l.row,l.column))return c()}if(f==s)return;f=s.text.join(\"<br/>\"),i.setHtml(f),i.show(),t._signal(\"showGutterTooltip\",i),t.on(\"mousewheel\",c);if(e.$tooltipFollowsMouse)h(u);else{var p=u.domEvent.target,d=p.getBoundingClientRect(),v=i.getElement().style;v.left=d.right+\"px\",v.top=d.bottom+\"px\"}}function c(){o&&(o=clearTimeout(o)),f&&(i.hide(),f=null,t._signal(\"hideGutterTooltip\",i),t.removeEventListener(\"mousewheel\",c))}function h(e){i.setPosition(e.x,e.y)}var t=e.editor,n=t.renderer.$gutterLayer,i=new a(t.container);e.editor.setDefaultHandler(\"guttermousedown\",function(r){if(!t.isFocused()||r.getButton()!=0)return;var i=n.getRegion(r);if(i==\"foldWidgets\")return;var s=r.getDocumentPosition().row,o=t.session.selection;if(r.getShiftKey())o.selectTo(s,0);else{if(r.domEvent.detail==2)return t.selectAll(),r.preventDefault();e.$clickSelection=t.selection.getLineRange(s)}return e.setState(\"selectByLines\"),e.captureMouse(r),r.preventDefault()});var o,u,f;e.editor.setDefaultHandler(\"guttermousemove\",function(t){var n=t.domEvent.target||t.domEvent.srcElement;if(r.hasCssClass(n,\"ace_fold-widget\"))return c();f&&e.$tooltipFollowsMouse&&h(t),u=t;if(o)return;o=setTimeout(function(){o=null,u&&!e.isMousePressed?l():c()},50)}),s.addListener(t.renderer.$gutter,\"mouseout\",function(e){u=null;if(!f||o)return;o=setTimeout(function(){o=null,c()},50)}),t.on(\"changeSession\",c)}function a(e){o.call(this,e)}var r=e(\"../lib/dom\"),i=e(\"../lib/oop\"),s=e(\"../lib/event\"),o=e(\"../tooltip\").Tooltip;i.inherits(a,o),function(){this.setPosition=function(e,t){var n=window.innerWidth||document.documentElement.clientWidth,r=window.innerHeight||document.documentElement.clientHeight,i=this.getWidth(),s=this.getHeight();e+=15,t+=15,e+i>n&&(e-=e+i-n),t+s>r&&(t-=20+s),o.prototype.setPosition.call(this,e,t)}}.call(a.prototype),t.GutterHandler=u}),define(\"ace/mouse/mouse_event\",[\"require\",\"exports\",\"module\",\"ace/lib/event\",\"ace/lib/useragent\"],function(e,t,n){\"use strict\";var r=e(\"../lib/event\"),i=e(\"../lib/useragent\"),s=t.MouseEvent=function(e,t){this.domEvent=e,this.editor=t,this.x=this.clientX=e.clientX,this.y=this.clientY=e.clientY,this.$pos=null,this.$inSelection=null,this.propagationStopped=!1,this.defaultPrevented=!1};(function(){this.stopPropagation=function(){r.stopPropagation(this.domEvent),this.propagationStopped=!0},this.preventDefault=function(){r.preventDefault(this.domEvent),this.defaultPrevented=!0},this.stop=function(){this.stopPropagation(),this.preventDefault()},this.getDocumentPosition=function(){return this.$pos?this.$pos:(this.$pos=this.editor.renderer.screenToTextCoordinates(this.clientX,this.clientY),this.$pos)},this.inSelection=function(){if(this.$inSelection!==null)return this.$inSelection;var e=this.editor,t=e.getSelectionRange();if(t.isEmpty())this.$inSelection=!1;else{var n=this.getDocumentPosition();this.$inSelection=t.contains(n.row,n.column)}return this.$inSelection},this.getButton=function(){return r.getButton(this.domEvent)},this.getShiftKey=function(){return this.domEvent.shiftKey},this.getAccelKey=i.isMac?function(){return this.domEvent.metaKey}:function(){return this.domEvent.ctrlKey}}).call(s.prototype)}),define(\"ace/mouse/dragdrop_handler\",[\"require\",\"exports\",\"module\",\"ace/lib/dom\",\"ace/lib/event\",\"ace/lib/useragent\"],function(e,t,n){\"use strict\";function f(e){function T(e,n){var r=Date.now(),i=!n||e.row!=n.row,s=!n||e.column!=n.column;if(!S||i||s)t.$blockScrolling+=1,t.moveCursorToPosition(e),t.$blockScrolling-=1,S=r,x={x:p,y:d};else{var o=l(x.x,x.y,p,d);o>a?S=null:r-S>=u&&(t.renderer.scrollCursorIntoView(),S=null)}}function N(e,n){var r=Date.now(),i=t.renderer.layerConfig.lineHeight,s=t.renderer.layerConfig.characterWidth,u=t.renderer.scroller.getBoundingClientRect(),a={x:{left:p-u.left,right:u.right-p},y:{top:d-u.top,bottom:u.bottom-d}},f=Math.min(a.x.left,a.x.right),l=Math.min(a.y.top,a.y.bottom),c={row:e.row,column:e.column};f/s<=2&&(c.column+=a.x.left<a.x.right?-3:2),l/i<=1&&(c.row+=a.y.top<a.y.bottom?-1:1);var h=e.row!=c.row,v=e.column!=c.column,m=!n||e.row!=n.row;h||v&&!m?E?r-E>=o&&t.renderer.scrollCursorIntoView(c):E=r:E=null}function C(){var e=g;g=t.renderer.screenToTextCoordinates(p,d),T(g,e),N(g,e)}function k(){m=t.selection.toOrientedRange(),h=t.session.addMarker(m,\"ace_selection\",t.getSelectionStyle()),t.clearSelection(),t.isFocused()&&t.renderer.$cursorLayer.setBlinking(!1),clearInterval(v),C(),v=setInterval(C,20),y=0,i.addListener(document,\"mousemove\",O)}function L(){clearInterval(v),t.session.removeMarker(h),h=null,t.$blockScrolling+=1,t.selection.fromOrientedRange(m),t.$blockScrolling-=1,t.isFocused()&&!w&&t.renderer.$cursorLayer.setBlinking(!t.getReadOnly()),m=null,g=null,y=0,E=null,S=null,i.removeListener(document,\"mousemove\",O)}function O(){A==null&&(A=setTimeout(function(){A!=null&&h&&L()},20))}function M(e){var t=e.types;return!t||Array.prototype.some.call(t,function(e){return e==\"text/plain\"||e==\"Text\"})}function _(e){var t=[\"copy\",\"copymove\",\"all\",\"uninitialized\"],n=[\"move\",\"copymove\",\"linkmove\",\"all\",\"uninitialized\"],r=s.isMac?e.altKey:e.ctrlKey,i=\"uninitialized\";try{i=e.dataTransfer.effectAllowed.toLowerCase()}catch(e){}var o=\"none\";return r&&t.indexOf(i)>=0?o=\"copy\":n.indexOf(i)>=0?o=\"move\":t.indexOf(i)>=0&&(o=\"copy\"),o}var t=e.editor,n=r.createElement(\"img\");n.src=\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\",s.isOpera&&(n.style.cssText=\"width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;\");var f=[\"dragWait\",\"dragWaitEnd\",\"startDrag\",\"dragReadyEnd\",\"onMouseDrag\"];f.forEach(function(t){e[t]=this[t]},this),t.addEventListener(\"mousedown\",this.onMouseDown.bind(e));var c=t.container,h,p,d,v,m,g,y=0,b,w,E,S,x;this.onDragStart=function(e){if(this.cancelDrag||!c.draggable){var r=this;return setTimeout(function(){r.startSelect(),r.captureMouse(e)},0),e.preventDefault()}m=t.getSelectionRange();var i=e.dataTransfer;i.effectAllowed=t.getReadOnly()?\"copy\":\"copyMove\",s.isOpera&&(t.container.appendChild(n),n.scrollTop=0),i.setDragImage&&i.setDragImage(n,0,0),s.isOpera&&t.container.removeChild(n),i.clearData(),i.setData(\"Text\",t.session.getTextRange()),w=!0,this.setState(\"drag\")},this.onDragEnd=function(e){c.draggable=!1,w=!1,this.setState(null);if(!t.getReadOnly()){var n=e.dataTransfer.dropEffect;!b&&n==\"move\"&&t.session.remove(t.getSelectionRange()),t.renderer.$cursorLayer.setBlinking(!0)}this.editor.unsetStyle(\"ace_dragging\"),this.editor.renderer.setCursorStyle(\"\")},this.onDragEnter=function(e){if(t.getReadOnly()||!M(e.dataTransfer))return;return p=e.clientX,d=e.clientY,h||k(),y++,e.dataTransfer.dropEffect=b=_(e),i.preventDefault(e)},this.onDragOver=function(e){if(t.getReadOnly()||!M(e.dataTransfer))return;return p=e.clientX,d=e.clientY,h||(k(),y++),A!==null&&(A=null),e.dataTransfer.dropEffect=b=_(e),i.preventDefault(e)},this.onDragLeave=function(e){y--;if(y<=0&&h)return L(),b=null,i.preventDefault(e)},this.onDrop=function(e){if(!g)return;var n=e.dataTransfer;if(w)switch(b){case\"move\":m.contains(g.row,g.column)?m={start:g,end:g}:m=t.moveText(m,g);break;case\"copy\":m=t.moveText(m,g,!0)}else{var r=n.getData(\"Text\");m={start:g,end:t.session.insert(g,r)},t.focus(),b=null}return L(),i.preventDefault(e)},i.addListener(c,\"dragstart\",this.onDragStart.bind(e)),i.addListener(c,\"dragend\",this.onDragEnd.bind(e)),i.addListener(c,\"dragenter\",this.onDragEnter.bind(e)),i.addListener(c,\"dragover\",this.onDragOver.bind(e)),i.addListener(c,\"dragleave\",this.onDragLeave.bind(e)),i.addListener(c,\"drop\",this.onDrop.bind(e));var A=null}function l(e,t,n,r){return Math.sqrt(Math.pow(n-e,2)+Math.pow(r-t,2))}var r=e(\"../lib/dom\"),i=e(\"../lib/event\"),s=e(\"../lib/useragent\"),o=200,u=200,a=5;(function(){this.dragWait=function(){var e=Date.now()-this.mousedownEvent.time;e>this.editor.getDragDelay()&&this.startDrag()},this.dragWaitEnd=function(){var e=this.editor.container;e.draggable=!1,this.startSelect(this.mousedownEvent.getDocumentPosition()),this.selectEnd()},this.dragReadyEnd=function(e){this.editor.renderer.$cursorLayer.setBlinking(!this.editor.getReadOnly()),this.editor.unsetStyle(\"ace_dragging\"),this.editor.renderer.setCursorStyle(\"\"),this.dragWaitEnd()},this.startDrag=function(){this.cancelDrag=!1;var e=this.editor,t=e.container;t.draggable=!0,e.renderer.$cursorLayer.setBlinking(!1),e.setStyle(\"ace_dragging\");var n=s.isWin?\"default\":\"move\";e.renderer.setCursorStyle(n),this.setState(\"dragReady\")},this.onMouseDrag=function(e){var t=this.editor.container;if(s.isIE&&this.state==\"dragReady\"){var n=l(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y);n>3&&t.dragDrop()}if(this.state===\"dragWait\"){var n=l(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y);n>0&&(t.draggable=!1,this.startSelect(this.mousedownEvent.getDocumentPosition()))}},this.onMouseDown=function(e){if(!this.$dragEnabled)return;this.mousedownEvent=e;var t=this.editor,n=e.inSelection(),r=e.getButton(),i=e.domEvent.detail||1;if(i===1&&r===0&&n){if(e.editor.inMultiSelectMode&&(e.getAccelKey()||e.getShiftKey()))return;this.mousedownEvent.time=Date.now();var o=e.domEvent.target||e.domEvent.srcElement;\"unselectable\"in o&&(o.unselectable=\"on\");if(t.getDragDelay()){if(s.isWebKit){this.cancelDrag=!0;var u=t.container;u.draggable=!0}this.setState(\"dragWait\")}else this.startDrag();this.captureMouse(e,this.onMouseDrag.bind(this)),e.defaultPrevented=!0}}}).call(f.prototype),t.DragdropHandler=f}),define(\"ace/lib/net\",[\"require\",\"exports\",\"module\",\"ace/lib/dom\"],function(e,t,n){\"use strict\";var r=e(\"./dom\");t.get=function(e,t){var n=new XMLHttpRequest;n.open(\"GET\",e,!0),n.onreadystatechange=function(){n.readyState===4&&t(n.responseText)},n.send(null)},t.loadScript=function(e,t){var n=r.getDocumentHead(),i=document.createElement(\"script\");i.src=e,n.appendChild(i),i.onload=i.onreadystatechange=function(e,n){if(n||!i.readyState||i.readyState==\"loaded\"||i.readyState==\"complete\")i=i.onload=i.onreadystatechange=null,n||t()}},t.qualifyURL=function(e){var t=document.createElement(\"a\");return t.href=e,t.href}}),define(\"ace/lib/event_emitter\",[\"require\",\"exports\",\"module\"],function(e,t,n){\"use strict\";var r={},i=function(){this.propagationStopped=!0},s=function(){this.defaultPrevented=!0};r._emit=r._dispatchEvent=function(e,t){this._eventRegistry||(this._eventRegistry={}),this._defaultHandlers||(this._defaultHandlers={});var n=this._eventRegistry[e]||[],r=this._defaultHandlers[e];if(!n.length&&!r)return;if(typeof t!=\"object\"||!t)t={};t.type||(t.type=e),t.stopPropagation||(t.stopPropagation=i),t.preventDefault||(t.preventDefault=s),n=n.slice();for(var o=0;o<n.length;o++){n[o](t,this);if(t.propagationStopped)break}if(r&&!t.defaultPrevented)return r(t,this)},r._signal=function(e,t){var n=(this._eventRegistry||{})[e];if(!n)return;n=n.slice();for(var r=0;r<n.length;r++)n[r](t,this)},r.once=function(e,t){var n=this;t&&this.addEventListener(e,function r(){n.removeEventListener(e,r),t.apply(null,arguments)})},r.setDefaultHandler=function(e,t){var n=this._defaultHandlers;n||(n=this._defaultHandlers={_disabled_:{}});if(n[e]){var r=n[e],i=n._disabled_[e];i||(n._disabled_[e]=i=[]),i.push(r);var s=i.indexOf(t);s!=-1&&i.splice(s,1)}n[e]=t},r.removeDefaultHandler=function(e,t){var n=this._defaultHandlers;if(!n)return;var r=n._disabled_[e];if(n[e]==t){var i=n[e];r&&this.setDefaultHandler(e,r.pop())}else if(r){var s=r.indexOf(t);s!=-1&&r.splice(s,1)}},r.on=r.addEventListener=function(e,t,n){this._eventRegistry=this._eventRegistry||{};var r=this._eventRegistry[e];return r||(r=this._eventRegistry[e]=[]),r.indexOf(t)==-1&&r[n?\"unshift\":\"push\"](t),t},r.off=r.removeListener=r.removeEventListener=function(e,t){this._eventRegistry=this._eventRegistry||{};var n=this._eventRegistry[e];if(!n)return;var r=n.indexOf(t);r!==-1&&n.splice(r,1)},r.removeAllListeners=function(e){this._eventRegistry&&(this._eventRegistry[e]=[])},t.EventEmitter=r}),define(\"ace/lib/app_config\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/event_emitter\"],function(e,t,n){\"no use strict\";function o(e){typeof console!=\"undefined\"&&console.warn&&console.warn.apply(console,arguments)}function u(e,t){var n=new Error(e);n.data=t,typeof console==\"object\"&&console.error&&console.error(n),setTimeout(function(){throw n})}var r=e(\"./oop\"),i=e(\"./event_emitter\").EventEmitter,s={setOptions:function(e){Object.keys(e).forEach(function(t){this.setOption(t,e[t])},this)},getOptions:function(e){var t={};return e?Array.isArray(e)||(t=e,e=Object.keys(t)):e=Object.keys(this.$options),e.forEach(function(e){t[e]=this.getOption(e)},this),t},setOption:function(e,t){if(this[\"$\"+e]===t)return;var n=this.$options[e];if(!n)return o('misspelled option \"'+e+'\"');if(n.forwardTo)return this[n.forwardTo]&&this[n.forwardTo].setOption(e,t);n.handlesSet||(this[\"$\"+e]=t),n&&n.set&&n.set.call(this,t)},getOption:function(e){var t=this.$options[e];return t?t.forwardTo?this[t.forwardTo]&&this[t.forwardTo].getOption(e):t&&t.get?t.get.call(this):this[\"$\"+e]:o('misspelled option \"'+e+'\"')}},a=function(){this.$defaultOptions={}};(function(){r.implement(this,i),this.defineOptions=function(e,t,n){return e.$options||(this.$defaultOptions[t]=e.$options={}),Object.keys(n).forEach(function(t){var r=n[t];typeof r==\"string\"&&(r={forwardTo:r}),r.name||(r.name=t),e.$options[r.name]=r,\"initialValue\"in r&&(e[\"$\"+r.name]=r.initialValue)}),r.implement(e,s),this},this.resetOptions=function(e){Object.keys(e.$options).forEach(function(t){var n=e.$options[t];\"value\"in n&&e.setOption(t,n.value)})},this.setDefaultValue=function(e,t,n){var r=this.$defaultOptions[e]||(this.$defaultOptions[e]={});r[t]&&(r.forwardTo?this.setDefaultValue(r.forwardTo,t,n):r[t].value=n)},this.setDefaultValues=function(e,t){Object.keys(t).forEach(function(n){this.setDefaultValue(e,n,t[n])},this)},this.warn=o,this.reportError=u}).call(a.prototype),t.AppConfig=a}),define(\"ace/config\",[\"require\",\"exports\",\"module\",\"ace/lib/lang\",\"ace/lib/oop\",\"ace/lib/net\",\"ace/lib/app_config\"],function(e,t,n){\"no use strict\";function f(r){if(!u||!u.document)return;a.packaged=r||e.packaged||n.packaged||u.define&&define.packaged;var i={},s=\"\",o=document.currentScript||document._currentScript,f=o&&o.ownerDocument||document,c=f.getElementsByTagName(\"script\");for(var h=0;h<c.length;h++){var p=c[h],d=p.src||p.getAttribute(\"src\");if(!d)continue;var v=p.attributes;for(var m=0,g=v.length;m<g;m++){var y=v[m];y.name.indexOf(\"data-ace-\")===0&&(i[l(y.name.replace(/^data-ace-/,\"\"))]=y.value)}var b=d.match(/^(.*)\\/ace(\\-\\w+)?\\.js(\\?|$)/);b&&(s=b[1])}s&&(i.base=i.base||s,i.packaged=!0),i.basePath=i.base,i.workerPath=i.workerPath||i.base,i.modePath=i.modePath||i.base,i.themePath=i.themePath||i.base,delete i.base;for(var w in i)typeof i[w]!=\"undefined\"&&t.set(w,i[w])}function l(e){return e.replace(/-(.)/g,function(e,t){return t.toUpperCase()})}var r=e(\"./lib/lang\"),i=e(\"./lib/oop\"),s=e(\"./lib/net\"),o=e(\"./lib/app_config\").AppConfig;n.exports=t=new o;var u=function(){return this||typeof window!=\"undefined\"&&window}(),a={packaged:!1,workerPath:null,modePath:null,themePath:null,basePath:\"\",suffix:\".js\",$moduleUrls:{}};t.get=function(e){if(!a.hasOwnProperty(e))throw new Error(\"Unknown config key: \"+e);return a[e]},t.set=function(e,t){if(!a.hasOwnProperty(e))throw new Error(\"Unknown config key: \"+e);a[e]=t},t.all=function(){return r.copyObject(a)},t.moduleUrl=function(e,t){if(a.$moduleUrls[e])return a.$moduleUrls[e];var n=e.split(\"/\");t=t||n[n.length-2]||\"\";var r=t==\"snippets\"?\"/\":\"-\",i=n[n.length-1];if(t==\"worker\"&&r==\"-\"){var s=new RegExp(\"^\"+t+\"[\\\\-_]|[\\\\-_]\"+t+\"$\",\"g\");i=i.replace(s,\"\")}(!i||i==t)&&n.length>1&&(i=n[n.length-2]);var o=a[t+\"Path\"];return o==null?o=a.basePath:r==\"/\"&&(t=r=\"\"),o&&o.slice(-1)!=\"/\"&&(o+=\"/\"),o+t+r+i+this.get(\"suffix\")},t.setModuleUrl=function(e,t){return a.$moduleUrls[e]=t},t.$loading={},t.loadModule=function(n,r){var i,o;Array.isArray(n)&&(o=n[0],n=n[1]);try{i=e(n)}catch(u){}if(i&&!t.$loading[n])return r&&r(i);t.$loading[n]||(t.$loading[n]=[]),t.$loading[n].push(r);if(t.$loading[n].length>1)return;var a=function(){e([n],function(e){t._emit(\"load.module\",{name:n,module:e});var r=t.$loading[n];t.$loading[n]=null,r.forEach(function(t){t&&t(e)})})};if(!t.get(\"packaged\"))return a();s.loadScript(t.moduleUrl(n,o),a)},t.init=f}),define(\"ace/mouse/mouse_handler\",[\"require\",\"exports\",\"module\",\"ace/lib/event\",\"ace/lib/useragent\",\"ace/mouse/default_handlers\",\"ace/mouse/default_gutter_handler\",\"ace/mouse/mouse_event\",\"ace/mouse/dragdrop_handler\",\"ace/config\"],function(e,t,n){\"use strict\";var r=e(\"../lib/event\"),i=e(\"../lib/useragent\"),s=e(\"./default_handlers\").DefaultHandlers,o=e(\"./default_gutter_handler\").GutterHandler,u=e(\"./mouse_event\").MouseEvent,a=e(\"./dragdrop_handler\").DragdropHandler,f=e(\"../config\"),l=function(e){var t=this;this.editor=e,new s(this),new o(this),new a(this);var n=function(t){var n=!document.hasFocus||!document.hasFocus()||!e.isFocused()&&document.activeElement==(e.textInput&&e.textInput.getElement());n&&window.focus(),e.focus()},u=e.renderer.getMouseEventTarget();r.addListener(u,\"click\",this.onMouseEvent.bind(this,\"click\")),r.addListener(u,\"mousemove\",this.onMouseMove.bind(this,\"mousemove\")),r.addMultiMouseDownListener([u,e.renderer.scrollBarV&&e.renderer.scrollBarV.inner,e.renderer.scrollBarH&&e.renderer.scrollBarH.inner,e.textInput&&e.textInput.getElement()].filter(Boolean),[400,300,250],this,\"onMouseEvent\"),r.addMouseWheelListener(e.container,this.onMouseWheel.bind(this,\"mousewheel\")),r.addTouchMoveListener(e.container,this.onTouchMove.bind(this,\"touchmove\"));var f=e.renderer.$gutter;r.addListener(f,\"mousedown\",this.onMouseEvent.bind(this,\"guttermousedown\")),r.addListener(f,\"click\",this.onMouseEvent.bind(this,\"gutterclick\")),r.addListener(f,\"dblclick\",this.onMouseEvent.bind(this,\"gutterdblclick\")),r.addListener(f,\"mousemove\",this.onMouseEvent.bind(this,\"guttermousemove\")),r.addListener(u,\"mousedown\",n),r.addListener(f,\"mousedown\",n),i.isIE&&e.renderer.scrollBarV&&(r.addListener(e.renderer.scrollBarV.element,\"mousedown\",n),r.addListener(e.renderer.scrollBarH.element,\"mousedown\",n)),e.on(\"mousemove\",function(n){if(t.state||t.$dragDelay||!t.$dragEnabled)return;var r=e.renderer.screenToTextCoordinates(n.x,n.y),i=e.session.selection.getRange(),s=e.renderer;!i.isEmpty()&&i.insideStart(r.row,r.column)?s.setCursorStyle(\"default\"):s.setCursorStyle(\"\")})};(function(){this.onMouseEvent=function(e,t){this.editor._emit(e,new u(t,this.editor))},this.onMouseMove=function(e,t){var n=this.editor._eventRegistry&&this.editor._eventRegistry.mousemove;if(!n||!n.length)return;this.editor._emit(e,new u(t,this.editor))},this.onMouseWheel=function(e,t){var n=new u(t,this.editor);n.speed=this.$scrollSpeed*2,n.wheelX=t.wheelX,n.wheelY=t.wheelY,this.editor._emit(e,n)},this.onTouchMove=function(e,t){var n=new u(t,this.editor);n.speed=1,n.wheelX=t.wheelX,n.wheelY=t.wheelY,this.editor._emit(e,n)},this.setState=function(e){this.state=e},this.captureMouse=function(e,t){this.x=e.x,this.y=e.y,this.isMousePressed=!0;var n=this.editor.renderer;n.$keepTextAreaAtCursor&&(n.$keepTextAreaAtCursor=null);var s=this,o=function(e){if(!e)return;if(i.isWebKit&&!e.which&&s.releaseMouse)return s.releaseMouse();s.x=e.clientX,s.y=e.clientY,t&&t(e),s.mouseEvent=new u(e,s.editor),s.$mouseMoved=!0},a=function(e){clearInterval(l),f(),s[s.state+\"End\"]&&s[s.state+\"End\"](e),s.state=\"\",n.$keepTextAreaAtCursor==null&&(n.$keepTextAreaAtCursor=!0,n.$moveTextAreaToCursor()),s.isMousePressed=!1,s.$onCaptureMouseMove=s.releaseMouse=null,e&&s.onMouseEvent(\"mouseup\",e)},f=function(){s[s.state]&&s[s.state](),s.$mouseMoved=!1};if(i.isOldIE&&e.domEvent.type==\"dblclick\")return setTimeout(function(){a(e)});s.$onCaptureMouseMove=o,s.releaseMouse=r.capture(this.editor.container,o,a);var l=setInterval(f,20)},this.releaseMouse=null,this.cancelContextMenu=function(){var e=function(t){if(t&&t.domEvent&&t.domEvent.type!=\"contextmenu\")return;this.editor.off(\"nativecontextmenu\",e),t&&t.domEvent&&r.stopEvent(t.domEvent)}.bind(this);setTimeout(e,10),this.editor.on(\"nativecontextmenu\",e)}}).call(l.prototype),f.defineOptions(l.prototype,\"mouseHandler\",{scrollSpeed:{initialValue:2},dragDelay:{initialValue:i.isMac?150:0},dragEnabled:{initialValue:!0},focusTimout:{initialValue:0},tooltipFollowsMouse:{initialValue:!0}}),t.MouseHandler=l}),define(\"ace/mouse/fold_handler\",[\"require\",\"exports\",\"module\"],function(e,t,n){\"use strict\";function r(e){e.on(\"click\",function(t){var n=t.getDocumentPosition(),r=e.session,i=r.getFoldAt(n.row,n.column,1);i&&(t.getAccelKey()?r.removeFold(i):r.expandFold(i),t.stop())}),e.on(\"gutterclick\",function(t){var n=e.renderer.$gutterLayer.getRegion(t);if(n==\"foldWidgets\"){var r=t.getDocumentPosition().row,i=e.session;i.foldWidgets&&i.foldWidgets[r]&&e.session.onFoldWidgetClick(r,t),e.isFocused()||e.focus(),t.stop()}}),e.on(\"gutterdblclick\",function(t){var n=e.renderer.$gutterLayer.getRegion(t);if(n==\"foldWidgets\"){var r=t.getDocumentPosition().row,i=e.session,s=i.getParentFoldRangeData(r,!0),o=s.range||s.firstRange;if(o){r=o.start.row;var u=i.getFoldAt(r,i.getLine(r).length,1);u?i.removeFold(u):(i.addFold(\"...\",o),e.renderer.scrollCursorIntoView({row:o.start.row,column:0}))}t.stop()}})}t.FoldHandler=r}),define(\"ace/keyboard/keybinding\",[\"require\",\"exports\",\"module\",\"ace/lib/keys\",\"ace/lib/event\"],function(e,t,n){\"use strict\";var r=e(\"../lib/keys\"),i=e(\"../lib/event\"),s=function(e){this.$editor=e,this.$data={editor:e},this.$handlers=[],this.setDefaultHandler(e.commands)};(function(){this.setDefaultHandler=function(e){this.removeKeyboardHandler(this.$defaultHandler),this.$defaultHandler=e,this.addKeyboardHandler(e,0)},this.setKeyboardHandler=function(e){var t=this.$handlers;if(t[t.length-1]==e)return;while(t[t.length-1]&&t[t.length-1]!=this.$defaultHandler)this.removeKeyboardHandler(t[t.length-1]);this.addKeyboardHandler(e,1)},this.addKeyboardHandler=function(e,t){if(!e)return;typeof e==\"function\"&&!e.handleKeyboard&&(e.handleKeyboard=e);var n=this.$handlers.indexOf(e);n!=-1&&this.$handlers.splice(n,1),t==undefined?this.$handlers.push(e):this.$handlers.splice(t,0,e),n==-1&&e.attach&&e.attach(this.$editor)},this.removeKeyboardHandler=function(e){var t=this.$handlers.indexOf(e);return t==-1?!1:(this.$handlers.splice(t,1),e.detach&&e.detach(this.$editor),!0)},this.getKeyboardHandler=function(){return this.$handlers[this.$handlers.length-1]},this.getStatusText=function(){var e=this.$data,t=e.editor;return this.$handlers.map(function(n){return n.getStatusText&&n.getStatusText(t,e)||\"\"}).filter(Boolean).join(\" \")},this.$callKeyboardHandlers=function(e,t,n,r){var s,o=!1,u=this.$editor.commands;for(var a=this.$handlers.length;a--;){s=this.$handlers[a].handleKeyboard(this.$data,e,t,n,r);if(!s||!s.command)continue;s.command==\"null\"?o=!0:o=u.exec(s.command,this.$editor,s.args,r),o&&r&&e!=-1&&s.passEvent!=1&&s.command.passEvent!=1&&i.stopEvent(r);if(o)break}return!o&&e==-1&&(s={command:\"insertstring\"},o=u.exec(\"insertstring\",this.$editor,t)),o&&this.$editor._signal&&this.$editor._signal(\"keyboardActivity\",s),o},this.onCommandKey=function(e,t,n){var i=r.keyCodeToString(n);this.$callKeyboardHandlers(t,i,n,e)},this.onTextInput=function(e){this.$callKeyboardHandlers(-1,e)}}).call(s.prototype),t.KeyBinding=s}),define(\"ace/range\",[\"require\",\"exports\",\"module\"],function(e,t,n){\"use strict\";var r=function(e,t){return e.row-t.row||e.column-t.column},i=function(e,t,n,r){this.start={row:e,column:t},this.end={row:n,column:r}};(function(){this.isEqual=function(e){return this.start.row===e.start.row&&this.end.row===e.end.row&&this.start.column===e.start.column&&this.end.column===e.end.column},this.toString=function(){return\"Range: [\"+this.start.row+\"/\"+this.start.column+\"] -> [\"+this.end.row+\"/\"+this.end.column+\"]\"},this.contains=function(e,t){return this.compare(e,t)==0},this.compareRange=function(e){var t,n=e.end,r=e.start;return t=this.compare(n.row,n.column),t==1?(t=this.compare(r.row,r.column),t==1?2:t==0?1:0):t==-1?-2:(t=this.compare(r.row,r.column),t==-1?-1:t==1?42:0)},this.comparePoint=function(e){return this.compare(e.row,e.column)},this.containsRange=function(e){return this.comparePoint(e.start)==0&&this.comparePoint(e.end)==0},this.intersects=function(e){var t=this.compareRange(e);return t==-1||t==0||t==1},this.isEnd=function(e,t){return this.end.row==e&&this.end.column==t},this.isStart=function(e,t){return this.start.row==e&&this.start.column==t},this.setStart=function(e,t){typeof e==\"object\"?(this.start.column=e.column,this.start.row=e.row):(this.start.row=e,this.start.column=t)},this.setEnd=function(e,t){typeof e==\"object\"?(this.end.column=e.column,this.end.row=e.row):(this.end.row=e,this.end.column=t)},this.inside=function(e,t){return this.compare(e,t)==0?this.isEnd(e,t)||this.isStart(e,t)?!1:!0:!1},this.insideStart=function(e,t){return this.compare(e,t)==0?this.isEnd(e,t)?!1:!0:!1},this.insideEnd=function(e,t){return this.compare(e,t)==0?this.isStart(e,t)?!1:!0:!1},this.compare=function(e,t){return!this.isMultiLine()&&e===this.start.row?t<this.start.column?-1:t>this.end.column?1:0:e<this.start.row?-1:e>this.end.row?1:this.start.row===e?t>=this.start.column?0:-1:this.end.row===e?t<=this.end.column?0:1:0},this.compareStart=function(e,t){return this.start.row==e&&this.start.column==t?-1:this.compare(e,t)},this.compareEnd=function(e,t){return this.end.row==e&&this.end.column==t?1:this.compare(e,t)},this.compareInside=function(e,t){return this.end.row==e&&this.end.column==t?1:this.start.row==e&&this.start.column==t?-1:this.compare(e,t)},this.clipRows=function(e,t){if(this.end.row>t)var n={row:t+1,column:0};else if(this.end.row<e)var n={row:e,column:0};if(this.start.row>t)var r={row:t+1,column:0};else if(this.start.row<e)var r={row:e,column:0};return i.fromPoints(r||this.start,n||this.end)},this.extend=function(e,t){var n=this.compare(e,t);if(n==0)return this;if(n==-1)var r={row:e,column:t};else var s={row:e,column:t};return i.fromPoints(r||this.start,s||this.end)},this.isEmpty=function(){return this.start.row===this.end.row&&this.start.column===this.end.column},this.isMultiLine=function(){return this.start.row!==this.end.row},this.clone=function(){return i.fromPoints(this.start,this.end)},this.collapseRows=function(){return this.end.column==0?new i(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new i(this.start.row,0,this.end.row,0)},this.toScreenRange=function(e){var t=e.documentToScreenPosition(this.start),n=e.documentToScreenPosition(this.end);return new i(t.row,t.column,n.row,n.column)},this.moveBy=function(e,t){this.start.row+=e,this.start.column+=t,this.end.row+=e,this.end.column+=t}}).call(i.prototype),i.fromPoints=function(e,t){return new i(e.row,e.column,t.row,t.column)},i.comparePoints=r,i.comparePoints=function(e,t){return e.row-t.row||e.column-t.column},t.Range=i}),define(\"ace/selection\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/lang\",\"ace/lib/event_emitter\",\"ace/range\"],function(e,t,n){\"use strict\";var r=e(\"./lib/oop\"),i=e(\"./lib/lang\"),s=e(\"./lib/event_emitter\").EventEmitter,o=e(\"./range\").Range,u=function(e){this.session=e,this.doc=e.getDocument(),this.clearSelection(),this.lead=this.selectionLead=this.doc.createAnchor(0,0),this.anchor=this.selectionAnchor=this.doc.createAnchor(0,0);var t=this;this.lead.on(\"change\",function(e){t._emit(\"changeCursor\"),t.$isEmpty||t._emit(\"changeSelection\"),!t.$keepDesiredColumnOnChange&&e.old.column!=e.value.column&&(t.$desiredColumn=null)}),this.selectionAnchor.on(\"change\",function(){t.$isEmpty||t._emit(\"changeSelection\")})};(function(){r.implement(this,s),this.isEmpty=function(){return this.$isEmpty||this.anchor.row==this.lead.row&&this.anchor.column==this.lead.column},this.isMultiLine=function(){return this.isEmpty()?!1:this.getRange().isMultiLine()},this.getCursor=function(){return this.lead.getPosition()},this.setSelectionAnchor=function(e,t){this.anchor.setPosition(e,t),this.$isEmpty&&(this.$isEmpty=!1,this._emit(\"changeSelection\"))},this.getSelectionAnchor=function(){return this.$isEmpty?this.getSelectionLead():this.anchor.getPosition()},this.getSelectionLead=function(){return this.lead.getPosition()},this.shiftSelection=function(e){if(this.$isEmpty){this.moveCursorTo(this.lead.row,this.lead.column+e);return}var t=this.getSelectionAnchor(),n=this.getSelectionLead(),r=this.isBackwards();(!r||t.column!==0)&&this.setSelectionAnchor(t.row,t.column+e),(r||n.column!==0)&&this.$moveSelection(function(){this.moveCursorTo(n.row,n.column+e)})},this.isBackwards=function(){var e=this.anchor,t=this.lead;return e.row>t.row||e.row==t.row&&e.column>t.column},this.getRange=function(){var e=this.anchor,t=this.lead;return this.isEmpty()?o.fromPoints(t,t):this.isBackwards()?o.fromPoints(t,e):o.fromPoints(e,t)},this.clearSelection=function(){this.$isEmpty||(this.$isEmpty=!0,this._emit(\"changeSelection\"))},this.selectAll=function(){var e=this.doc.getLength()-1;this.setSelectionAnchor(0,0),this.moveCursorTo(e,this.doc.getLine(e).length)},this.setRange=this.setSelectionRange=function(e,t){t?(this.setSelectionAnchor(e.end.row,e.end.column),this.selectTo(e.start.row,e.start.column)):(this.setSelectionAnchor(e.start.row,e.start.column),this.selectTo(e.end.row,e.end.column)),this.getRange().isEmpty()&&(this.$isEmpty=!0),this.$desiredColumn=null},this.$moveSelection=function(e){var t=this.lead;this.$isEmpty&&this.setSelectionAnchor(t.row,t.column),e.call(this)},this.selectTo=function(e,t){this.$moveSelection(function(){this.moveCursorTo(e,t)})},this.selectToPosition=function(e){this.$moveSelection(function(){this.moveCursorToPosition(e)})},this.moveTo=function(e,t){this.clearSelection(),this.moveCursorTo(e,t)},this.moveToPosition=function(e){this.clearSelection(),this.moveCursorToPosition(e)},this.selectUp=function(){this.$moveSelection(this.moveCursorUp)},this.selectDown=function(){this.$moveSelection(this.moveCursorDown)},this.selectRight=function(){this.$moveSelection(this.moveCursorRight)},this.selectLeft=function(){this.$moveSelection(this.moveCursorLeft)},this.selectLineStart=function(){this.$moveSelection(this.moveCursorLineStart)},this.selectLineEnd=function(){this.$moveSelection(this.moveCursorLineEnd)},this.selectFileEnd=function(){this.$moveSelection(this.moveCursorFileEnd)},this.selectFileStart=function(){this.$moveSelection(this.moveCursorFileStart)},this.selectWordRight=function(){this.$moveSelection(this.moveCursorWordRight)},this.selectWordLeft=function(){this.$moveSelection(this.moveCursorWordLeft)},this.getWordRange=function(e,t){if(typeof t==\"undefined\"){var n=e||this.lead;e=n.row,t=n.column}return this.session.getWordRange(e,t)},this.selectWord=function(){this.setSelectionRange(this.getWordRange())},this.selectAWord=function(){var e=this.getCursor(),t=this.session.getAWordRange(e.row,e.column);this.setSelectionRange(t)},this.getLineRange=function(e,t){var n=typeof e==\"number\"?e:this.lead.row,r,i=this.session.getFoldLine(n);return i?(n=i.start.row,r=i.end.row):r=n,t===!0?new o(n,0,r,this.session.getLine(r).length):new o(n,0,r+1,0)},this.selectLine=function(){this.setSelectionRange(this.getLineRange())},this.moveCursorUp=function(){this.moveCursorBy(-1,0)},this.moveCursorDown=function(){this.moveCursorBy(1,0)},this.wouldMoveIntoSoftTab=function(e,t,n){var r=e.column,i=e.column+t;return n<0&&(r=e.column-t,i=e.column),this.session.isTabStop(e)&&this.doc.getLine(e.row).slice(r,i).split(\" \").length-1==t},this.moveCursorLeft=function(){var e=this.lead.getPosition(),t;if(t=this.session.getFoldAt(e.row,e.column,-1))this.moveCursorTo(t.start.row,t.start.column);else if(e.column===0)e.row>0&&this.moveCursorTo(e.row-1,this.doc.getLine(e.row-1).length);else{var n=this.session.getTabSize();this.wouldMoveIntoSoftTab(e,n,-1)&&!this.session.getNavigateWithinSoftTabs()?this.moveCursorBy(0,-n):this.moveCursorBy(0,-1)}},this.moveCursorRight=function(){var e=this.lead.getPosition(),t;if(t=this.session.getFoldAt(e.row,e.column,1))this.moveCursorTo(t.end.row,t.end.column);else if(this.lead.column==this.doc.getLine(this.lead.row).length)this.lead.row<this.doc.getLength()-1&&this.moveCursorTo(this.lead.row+1,0);else{var n=this.session.getTabSize(),e=this.lead;this.wouldMoveIntoSoftTab(e,n,1)&&!this.session.getNavigateWithinSoftTabs()?this.moveCursorBy(0,n):this.moveCursorBy(0,1)}},this.moveCursorLineStart=function(){var e=this.lead.row,t=this.lead.column,n=this.session.documentToScreenRow(e,t),r=this.session.screenToDocumentPosition(n,0),i=this.session.getDisplayLine(e,null,r.row,r.column),s=i.match(/^\\s*/);s[0].length!=t&&!this.session.$useEmacsStyleLineStart&&(r.column+=s[0].length),this.moveCursorToPosition(r)},this.moveCursorLineEnd=function(){var e=this.lead,t=this.session.getDocumentLastRowColumnPosition(e.row,e.column);if(this.lead.column==t.column){var n=this.session.getLine(t.row);if(t.column==n.length){var r=n.search(/\\s+$/);r>0&&(t.column=r)}}this.moveCursorTo(t.row,t.column)},this.moveCursorFileEnd=function(){var e=this.doc.getLength()-1,t=this.doc.getLine(e).length;this.moveCursorTo(e,t)},this.moveCursorFileStart=function(){this.moveCursorTo(0,0)},this.moveCursorLongWordRight=function(){var e=this.lead.row,t=this.lead.column,n=this.doc.getLine(e),r=n.substring(t),i;this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0;var s=this.session.getFoldAt(e,t,1);if(s){this.moveCursorTo(s.end.row,s.end.column);return}if(i=this.session.nonTokenRe.exec(r))t+=this.session.nonTokenRe.lastIndex,this.session.nonTokenRe.lastIndex=0,r=n.substring(t);if(t>=n.length){this.moveCursorTo(e,n.length),this.moveCursorRight(),e<this.doc.getLength()-1&&this.moveCursorWordRight();return}if(i=this.session.tokenRe.exec(r))t+=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0;this.moveCursorTo(e,t)},this.moveCursorLongWordLeft=function(){var e=this.lead.row,t=this.lead.column,n;if(n=this.session.getFoldAt(e,t,-1)){this.moveCursorTo(n.start.row,n.start.column);return}var r=this.session.getFoldStringAt(e,t,-1);r==null&&(r=this.doc.getLine(e).substring(0,t));var s=i.stringReverse(r),o;this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0;if(o=this.session.nonTokenRe.exec(s))t-=this.session.nonTokenRe.lastIndex,s=s.slice(this.session.nonTokenRe.lastIndex),this.session.nonTokenRe.lastIndex=0;if(t<=0){this.moveCursorTo(e,0),this.moveCursorLeft(),e>0&&this.moveCursorWordLeft();return}if(o=this.session.tokenRe.exec(s))t-=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0;this.moveCursorTo(e,t)},this.$shortWordEndIndex=function(e){var t,n=0,r,i=/\\s/,s=this.session.tokenRe;s.lastIndex=0;if(t=this.session.tokenRe.exec(e))n=this.session.tokenRe.lastIndex;else{while((r=e[n])&&i.test(r))n++;if(n<1){s.lastIndex=0;while((r=e[n])&&!s.test(r)){s.lastIndex=0,n++;if(i.test(r)){if(n>2){n--;break}while((r=e[n])&&i.test(r))n++;if(n>2)break}}}}return s.lastIndex=0,n},this.moveCursorShortWordRight=function(){var e=this.lead.row,t=this.lead.column,n=this.doc.getLine(e),r=n.substring(t),i=this.session.getFoldAt(e,t,1);if(i)return this.moveCursorTo(i.end.row,i.end.column);if(t==n.length){var s=this.doc.getLength();do e++,r=this.doc.getLine(e);while(e<s&&/^\\s*$/.test(r));/^\\s+/.test(r)||(r=\"\"),t=0}var o=this.$shortWordEndIndex(r);this.moveCursorTo(e,t+o)},this.moveCursorShortWordLeft=function(){var e=this.lead.row,t=this.lead.column,n;if(n=this.session.getFoldAt(e,t,-1))return this.moveCursorTo(n.start.row,n.start.column);var r=this.session.getLine(e).substring(0,t);if(t===0){do e--,r=this.doc.getLine(e);while(e>0&&/^\\s*$/.test(r));t=r.length,/\\s+$/.test(r)||(r=\"\")}var s=i.stringReverse(r),o=this.$shortWordEndIndex(s);return this.moveCursorTo(e,t-o)},this.moveCursorWordRight=function(){this.session.$selectLongWords?this.moveCursorLongWordRight():this.moveCursorShortWordRight()},this.moveCursorWordLeft=function(){this.session.$selectLongWords?this.moveCursorLongWordLeft():this.moveCursorShortWordLeft()},this.moveCursorBy=function(e,t){var n=this.session.documentToScreenPosition(this.lead.row,this.lead.column);t===0&&(this.$desiredColumn?n.column=this.$desiredColumn:this.$desiredColumn=n.column);var r=this.session.screenToDocumentPosition(n.row+e,n.column);e!==0&&t===0&&r.row===this.lead.row&&r.column===this.lead.column&&this.session.lineWidgets&&this.session.lineWidgets[r.row]&&(r.row>0||e>0)&&r.row++,this.moveCursorTo(r.row,r.column+t,t===0)},this.moveCursorToPosition=function(e){this.moveCursorTo(e.row,e.column)},this.moveCursorTo=function(e,t,n){var r=this.session.getFoldAt(e,t,1);r&&(e=r.start.row,t=r.start.column),this.$keepDesiredColumnOnChange=!0,this.lead.setPosition(e,t),this.$keepDesiredColumnOnChange=!1,n||(this.$desiredColumn=null)},this.moveCursorToScreen=function(e,t,n){var r=this.session.screenToDocumentPosition(e,t);this.moveCursorTo(r.row,r.column,n)},this.detach=function(){this.lead.detach(),this.anchor.detach(),this.session=this.doc=null},this.fromOrientedRange=function(e){this.setSelectionRange(e,e.cursor==e.start),this.$desiredColumn=e.desiredColumn||this.$desiredColumn},this.toOrientedRange=function(e){var t=this.getRange();return e?(e.start.column=t.start.column,e.start.row=t.start.row,e.end.column=t.end.column,e.end.row=t.end.row):e=t,e.cursor=this.isBackwards()?e.start:e.end,e.desiredColumn=this.$desiredColumn,e},this.getRangeOfMovements=function(e){var t=this.getCursor();try{e(this);var n=this.getCursor();return o.fromPoints(t,n)}catch(r){return o.fromPoints(t,t)}finally{this.moveCursorToPosition(t)}},this.toJSON=function(){if(this.rangeCount)var e=this.ranges.map(function(e){var t=e.clone();return t.isBackwards=e.cursor==e.start,t});else{var e=this.getRange();e.isBackwards=this.isBackwards()}return e},this.fromJSON=function(e){if(e.start==undefined){if(this.rangeList){this.toSingleRange(e[0]);for(var t=e.length;t--;){var n=o.fromPoints(e[t].start,e[t].end);e[t].isBackwards&&(n.cursor=n.start),this.addRange(n,!0)}return}e=e[0]}this.rangeList&&this.toSingleRange(e),this.setSelectionRange(e,e.isBackwards)},this.isEqual=function(e){if((e.length||this.rangeCount)&&e.length!=this.rangeCount)return!1;if(!e.length||!this.ranges)return this.getRange().isEqual(e);for(var t=this.ranges.length;t--;)if(!this.ranges[t].isEqual(e[t]))return!1;return!0}}).call(u.prototype),t.Selection=u}),define(\"ace/tokenizer\",[\"require\",\"exports\",\"module\",\"ace/config\"],function(e,t,n){\"use strict\";var r=e(\"./config\"),i=2e3,s=function(e){this.states=e,this.regExps={},this.matchMappings={};for(var t in this.states){var n=this.states[t],r=[],i=0,s=this.matchMappings[t]={defaultToken:\"text\"},o=\"g\",u=[];for(var a=0;a<n.length;a++){var f=n[a];f.defaultToken&&(s.defaultToken=f.defaultToken),f.caseInsensitive&&(o=\"gi\");if(f.regex==null)continue;f.regex instanceof RegExp&&(f.regex=f.regex.toString().slice(1,-1));var l=f.regex,c=(new RegExp(\"(?:(\"+l+\")|(.))\")).exec(\"a\").length-2;Array.isArray(f.token)?f.token.length==1||c==1?f.token=f.token[0]:c-1!=f.token.length?(this.reportError(\"number of classes and regexp groups doesn't match\",{rule:f,groupCount:c-1}),f.token=f.token[0]):(f.tokenArray=f.token,f.token=null,f.onMatch=this.$arrayTokens):typeof f.token==\"function\"&&!f.onMatch&&(c>1?f.onMatch=this.$applyToken:f.onMatch=f.token),c>1&&(/\\\\\\d/.test(f.regex)?l=f.regex.replace(/\\\\([0-9]+)/g,function(e,t){return\"\\\\\"+(parseInt(t,10)+i+1)}):(c=1,l=this.removeCapturingGroups(f.regex)),!f.splitRegex&&typeof f.token!=\"string\"&&u.push(f)),s[i]=a,i+=c,r.push(l),f.onMatch||(f.onMatch=null)}r.length||(s[0]=0,r.push(\"$\")),u.forEach(function(e){e.splitRegex=this.createSplitterRegexp(e.regex,o)},this),this.regExps[t]=new RegExp(\"(\"+r.join(\")|(\")+\")|($)\",o)}};(function(){this.$setMaxTokenCount=function(e){i=e|0},this.$applyToken=function(e){var t=this.splitRegex.exec(e).slice(1),n=this.token.apply(this,t);if(typeof n==\"string\")return[{type:n,value:e}];var r=[];for(var i=0,s=n.length;i<s;i++)t[i]&&(r[r.length]={type:n[i],value:t[i]});return r},this.$arrayTokens=function(e){if(!e)return[];var t=this.splitRegex.exec(e);if(!t)return\"text\";var n=[],r=this.tokenArray;for(var i=0,s=r.length;i<s;i++)t[i+1]&&(n[n.length]={type:r[i],value:t[i+1]});return n},this.removeCapturingGroups=function(e){var t=e.replace(/\\[(?:\\\\.|[^\\]])*?\\]|\\\\.|\\(\\?[:=!]|(\\()/g,function(e,t){return t?\"(?:\":e});return t},this.createSplitterRegexp=function(e,t){if(e.indexOf(\"(?=\")!=-1){var n=0,r=!1,i={};e.replace(/(\\\\.)|(\\((?:\\?[=!])?)|(\\))|([\\[\\]])/g,function(e,t,s,o,u,a){return r?r=u!=\"]\":u?r=!0:o?(n==i.stack&&(i.end=a+1,i.stack=-1),n--):s&&(n++,s.length!=1&&(i.stack=n,i.start=a)),e}),i.end!=null&&/^\\)*$/.test(e.substr(i.end))&&(e=e.substring(0,i.start)+e.substr(i.end))}return e.charAt(0)!=\"^\"&&(e=\"^\"+e),e.charAt(e.length-1)!=\"$\"&&(e+=\"$\"),new RegExp(e,(t||\"\").replace(\"g\",\"\"))},this.getLineTokens=function(e,t){if(t&&typeof t!=\"string\"){var n=t.slice(0);t=n[0],t===\"#tmp\"&&(n.shift(),t=n.shift())}else var n=[];var r=t||\"start\",s=this.states[r];s||(r=\"start\",s=this.states[r]);var o=this.matchMappings[r],u=this.regExps[r];u.lastIndex=0;var a,f=[],l=0,c=0,h={type:null,value:\"\"};while(a=u.exec(e)){var p=o.defaultToken,d=null,v=a[0],m=u.lastIndex;if(m-v.length>l){var g=e.substring(l,m-v.length);h.type==p?h.value+=g:(h.type&&f.push(h),h={type:p,value:g})}for(var y=0;y<a.length-2;y++){if(a[y+1]===undefined)continue;d=s[o[y]],d.onMatch?p=d.onMatch(v,r,n,e):p=d.token,d.next&&(typeof d.next==\"string\"?r=d.next:r=d.next(r,n),s=this.states[r],s||(this.reportError(\"state doesn't exist\",r),r=\"start\",s=this.states[r]),o=this.matchMappings[r],l=m,u=this.regExps[r],u.lastIndex=m),d.consumeLineEnd&&(l=m);break}if(v)if(typeof p==\"string\")!!d&&d.merge===!1||h.type!==p?(h.type&&f.push(h),h={type:p,value:v}):h.value+=v;else if(p){h.type&&f.push(h),h={type:null,value:\"\"};for(var y=0;y<p.length;y++)f.push(p[y])}if(l==e.length)break;l=m;if(c++>i){c>2*e.length&&this.reportError(\"infinite loop with in ace tokenizer\",{startState:t,line:e});while(l<e.length)h.type&&f.push(h),h={value:e.substring(l,l+=2e3),type:\"overflow\"};r=\"start\",n=[];break}}return h.type&&f.push(h),n.length>1&&n[0]!==r&&n.unshift(\"#tmp\",r),{tokens:f,state:n.length?n:r}},this.reportError=r.reportError}).call(s.prototype),t.Tokenizer=s}),define(\"ace/mode/text_highlight_rules\",[\"require\",\"exports\",\"module\",\"ace/lib/lang\"],function(e,t,n){\"use strict\";var r=e(\"../lib/lang\"),i=function(){this.$rules={start:[{token:\"empty_line\",regex:\"^$\"},{defaultToken:\"text\"}]}};(function(){this.addRules=function(e,t){if(!t){for(var n in e)this.$rules[n]=e[n];return}for(var n in e){var r=e[n];for(var i=0;i<r.length;i++){var s=r[i];if(s.next||s.onMatch)typeof s.next==\"string\"&&s.next.indexOf(t)!==0&&(s.next=t+s.next),s.nextState&&s.nextState.indexOf(t)!==0&&(s.nextState=t+s.nextState)}this.$rules[t+n]=r}},this.getRules=function(){return this.$rules},this.embedRules=function(e,t,n,i,s){var o=typeof e==\"function\"?(new e).getRules():e;if(i)for(var u=0;u<i.length;u++)i[u]=t+i[u];else{i=[];for(var a in o)i.push(t+a)}this.addRules(o,t);if(n){var f=Array.prototype[s?\"push\":\"unshift\"];for(var u=0;u<i.length;u++)f.apply(this.$rules[i[u]],r.deepCopy(n))}this.$embeds||(this.$embeds=[]),this.$embeds.push(t)},this.getEmbeds=function(){return this.$embeds};var e=function(e,t){return(e!=\"start\"||t.length)&&t.unshift(this.nextState,e),this.nextState},t=function(e,t){return t.shift(),t.shift()||\"start\"};this.normalizeRules=function(){function i(s){var o=r[s];o.processed=!0;for(var u=0;u<o.length;u++){var a=o[u],f=null;Array.isArray(a)&&(f=a,a={}),!a.regex&&a.start&&(a.regex=a.start,a.next||(a.next=[]),a.next.push({defaultToken:a.token},{token:a.token+\".end\",regex:a.end||a.start,next:\"pop\"}),a.token=a.token+\".start\",a.push=!0);var l=a.next||a.push;if(l&&Array.isArray(l)){var c=a.stateName;c||(c=a.token,typeof c!=\"string\"&&(c=c[0]||\"\"),r[c]&&(c+=n++)),r[c]=l,a.next=c,i(c)}else l==\"pop\"&&(a.next=t);a.push&&(a.nextState=a.next||a.push,a.next=e,delete a.push);if(a.rules)for(var h in a.rules)r[h]?r[h].push&&r[h].push.apply(r[h],a.rules[h]):r[h]=a.rules[h];var p=typeof a==\"string\"?a:a.include;p&&(Array.isArray(p)?f=p.map(function(e){return r[e]}):f=r[p]);if(f){var d=[u,1].concat(f);a.noEscape&&(d=d.filter(function(e){return!e.next})),o.splice.apply(o,d),u--}a.keywordMap&&(a.token=this.createKeywordMapper(a.keywordMap,a.defaultToken||\"text\",a.caseInsensitive),delete a.defaultToken)}}var n=0,r=this.$rules;Object.keys(r).forEach(i,this)},this.createKeywordMapper=function(e,t,n,r){var i=Object.create(null);return Object.keys(e).forEach(function(t){var s=e[t];n&&(s=s.toLowerCase());var o=s.split(r||\"|\");for(var u=o.length;u--;)i[o[u]]=t}),Object.getPrototypeOf(i)&&(i.__proto__=null),this.$keywordList=Object.keys(i),e=null,n?function(e){return i[e.toLowerCase()]||t}:function(e){return i[e]||t}},this.getKeywords=function(){return this.$keywords}}).call(i.prototype),t.TextHighlightRules=i}),define(\"ace/mode/behaviour\",[\"require\",\"exports\",\"module\"],function(e,t,n){\"use strict\";var r=function(){this.$behaviours={}};(function(){this.add=function(e,t,n){switch(undefined){case this.$behaviours:this.$behaviours={};case this.$behaviours[e]:this.$behaviours[e]={}}this.$behaviours[e][t]=n},this.addBehaviours=function(e){for(var t in e)for(var n in e[t])this.add(t,n,e[t][n])},this.remove=function(e){this.$behaviours&&this.$behaviours[e]&&delete this.$behaviours[e]},this.inherit=function(e,t){if(typeof e==\"function\")var n=(new e).getBehaviours(t);else var n=e.getBehaviours(t);this.addBehaviours(n)},this.getBehaviours=function(e){if(!e)return this.$behaviours;var t={};for(var n=0;n<e.length;n++)this.$behaviours[e[n]]&&(t[e[n]]=this.$behaviours[e[n]]);return t}}).call(r.prototype),t.Behaviour=r}),define(\"ace/token_iterator\",[\"require\",\"exports\",\"module\"],function(e,t,n){\"use strict\";var r=function(e,t,n){this.$session=e,this.$row=t,this.$rowTokens=e.getTokens(t);var r=e.getTokenAt(t,n);this.$tokenIndex=r?r.index:-1};(function(){this.stepBackward=function(){this.$tokenIndex-=1;while(this.$tokenIndex<0){this.$row-=1;if(this.$row<0)return this.$row=0,null;this.$rowTokens=this.$session.getTokens(this.$row),this.$tokenIndex=this.$rowTokens.length-1}return this.$rowTokens[this.$tokenIndex]},this.stepForward=function(){this.$tokenIndex+=1;var e;while(this.$tokenIndex>=this.$rowTokens.length){this.$row+=1,e||(e=this.$session.getLength());if(this.$row>=e)return this.$row=e-1,null;this.$rowTokens=this.$session.getTokens(this.$row),this.$tokenIndex=0}return this.$rowTokens[this.$tokenIndex]},this.getCurrentToken=function(){return this.$rowTokens[this.$tokenIndex]},this.getCurrentTokenRow=function(){return this.$row},this.getCurrentTokenColumn=function(){var e=this.$rowTokens,t=this.$tokenIndex,n=e[t].start;if(n!==undefined)return n;n=0;while(t>0)t-=1,n+=e[t].value.length;return n},this.getCurrentTokenPosition=function(){return{row:this.$row,column:this.getCurrentTokenColumn()}}}).call(r.prototype),t.TokenIterator=r}),define(\"ace/mode/behaviour/cstyle\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/mode/behaviour\",\"ace/token_iterator\",\"ace/lib/lang\"],function(e,t,n){\"use strict\";var r=e(\"../../lib/oop\"),i=e(\"../behaviour\").Behaviour,s=e(\"../../token_iterator\").TokenIterator,o=e(\"../../lib/lang\"),u=[\"text\",\"paren.rparen\",\"punctuation.operator\"],a=[\"text\",\"paren.rparen\",\"punctuation.operator\",\"comment\"],f,l={},c={'\"':'\"',\"'\":\"'\"},h=function(e){var t=-1;e.multiSelect&&(t=e.selection.index,l.rangeCount!=e.multiSelect.rangeCount&&(l={rangeCount:e.multiSelect.rangeCount}));if(l[t])return f=l[t];f=l[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:\"\",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:\"\",maybeInsertedLineEnd:\"\"}},p=function(e,t,n,r){var i=e.end.row-e.start.row;return{text:n+t+r,selection:[0,e.start.column+1,i,e.end.column+(i?0:1)]}},d=function(e){this.add(\"braces\",\"insertion\",function(t,n,r,i,s){var u=r.getCursorPosition(),a=i.doc.getLine(u.row);if(s==\"{\"){h(r);var l=r.getSelectionRange(),c=i.doc.getTextRange(l);if(c!==\"\"&&c!==\"{\"&&r.getWrapBehavioursEnabled())return p(l,c,\"{\",\"}\");if(d.isSaneInsertion(r,i))return/[\\]\\}\\)]/.test(a[u.column])||r.inMultiSelectMode||e&&e.braces?(d.recordAutoInsert(r,i,\"}\"),{text:\"{}\",selection:[1,1]}):(d.recordMaybeInsert(r,i,\"{\"),{text:\"{\",selection:[1,1]})}else if(s==\"}\"){h(r);var v=a.substring(u.column,u.column+1);if(v==\"}\"){var m=i.$findOpeningBracket(\"}\",{column:u.column+1,row:u.row});if(m!==null&&d.isAutoInsertedClosing(u,a,s))return d.popAutoInsertedClosing(),{text:\"\",selection:[1,1]}}}else{if(s==\"\\n\"||s==\"\\r\\n\"){h(r);var g=\"\";d.isMaybeInsertedClosing(u,a)&&(g=o.stringRepeat(\"}\",f.maybeInsertedBrackets),d.clearMaybeInsertedClosing());var v=a.substring(u.column,u.column+1);if(v===\"}\"){var y=i.findMatchingBracket({row:u.row,column:u.column+1},\"}\");if(!y)return null;var b=this.$getIndent(i.getLine(y.row))}else{if(!g){d.clearMaybeInsertedClosing();return}var b=this.$getIndent(a)}var w=b+i.getTabString();return{text:\"\\n\"+w+\"\\n\"+b+g,selection:[1,w.length,1,w.length]}}d.clearMaybeInsertedClosing()}}),this.add(\"braces\",\"deletion\",function(e,t,n,r,i){var s=r.doc.getTextRange(i);if(!i.isMultiLine()&&s==\"{\"){h(n);var o=r.doc.getLine(i.start.row),u=o.substring(i.end.column,i.end.column+1);if(u==\"}\")return i.end.column++,i;f.maybeInsertedBrackets--}}),this.add(\"parens\",\"insertion\",function(e,t,n,r,i){if(i==\"(\"){h(n);var s=n.getSelectionRange(),o=r.doc.getTextRange(s);if(o!==\"\"&&n.getWrapBehavioursEnabled())return p(s,o,\"(\",\")\");if(d.isSaneInsertion(n,r))return d.recordAutoInsert(n,r,\")\"),{text:\"()\",selection:[1,1]}}else if(i==\")\"){h(n);var u=n.getCursorPosition(),a=r.doc.getLine(u.row),f=a.substring(u.column,u.column+1);if(f==\")\"){var l=r.$findOpeningBracket(\")\",{column:u.column+1,row:u.row});if(l!==null&&d.isAutoInsertedClosing(u,a,i))return d.popAutoInsertedClosing(),{text:\"\",selection:[1,1]}}}}),this.add(\"parens\",\"deletion\",function(e,t,n,r,i){var s=r.doc.getTextRange(i);if(!i.isMultiLine()&&s==\"(\"){h(n);var o=r.doc.getLine(i.start.row),u=o.substring(i.start.column+1,i.start.column+2);if(u==\")\")return i.end.column++,i}}),this.add(\"brackets\",\"insertion\",function(e,t,n,r,i){if(i==\"[\"){h(n);var s=n.getSelectionRange(),o=r.doc.getTextRange(s);if(o!==\"\"&&n.getWrapBehavioursEnabled())return p(s,o,\"[\",\"]\");if(d.isSaneInsertion(n,r))return d.recordAutoInsert(n,r,\"]\"),{text:\"[]\",selection:[1,1]}}else if(i==\"]\"){h(n);var u=n.getCursorPosition(),a=r.doc.getLine(u.row),f=a.substring(u.column,u.column+1);if(f==\"]\"){var l=r.$findOpeningBracket(\"]\",{column:u.column+1,row:u.row});if(l!==null&&d.isAutoInsertedClosing(u,a,i))return d.popAutoInsertedClosing(),{text:\"\",selection:[1,1]}}}}),this.add(\"brackets\",\"deletion\",function(e,t,n,r,i){var s=r.doc.getTextRange(i);if(!i.isMultiLine()&&s==\"[\"){h(n);var o=r.doc.getLine(i.start.row),u=o.substring(i.start.column+1,i.start.column+2);if(u==\"]\")return i.end.column++,i}}),this.add(\"string_dquotes\",\"insertion\",function(e,t,n,r,i){var s=r.$mode.$quotes||c;if(i.length==1&&s[i]){if(this.lineCommentStart&&this.lineCommentStart.indexOf(i)!=-1)return;h(n);var o=i,u=n.getSelectionRange(),a=r.doc.getTextRange(u);if(a!==\"\"&&(a.length!=1||!s[a])&&n.getWrapBehavioursEnabled())return p(u,a,o,o);if(!a){var f=n.getCursorPosition(),l=r.doc.getLine(f.row),d=l.substring(f.column-1,f.column),v=l.substring(f.column,f.column+1),m=r.getTokenAt(f.row,f.column),g=r.getTokenAt(f.row,f.column+1);if(d==\"\\\\\"&&m&&/escape/.test(m.type))return null;var y=m&&/string|escape/.test(m.type),b=!g||/string|escape/.test(g.type),w;if(v==o)w=y!==b,w&&/string\\.end/.test(g.type)&&(w=!1);else{if(y&&!b)return null;if(y&&b)return null;var E=r.$mode.tokenRe;E.lastIndex=0;var S=E.test(d);E.lastIndex=0;var x=E.test(d);if(S||x)return null;if(v&&!/[\\s;,.})\\]\\\\]/.test(v))return null;w=!0}return{text:w?o+o:\"\",selection:[1,1]}}}}),this.add(\"string_dquotes\",\"deletion\",function(e,t,n,r,i){var s=r.doc.getTextRange(i);if(!i.isMultiLine()&&(s=='\"'||s==\"'\")){h(n);var o=r.doc.getLine(i.start.row),u=o.substring(i.start.column+1,i.start.column+2);if(u==s)return i.end.column++,i}})};d.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new s(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||\"text\",u)){var i=new s(t,n.row,n.column+1);if(!this.$matchTokenType(i.getCurrentToken()||\"text\",u))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||\"text\",a)},d.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},d.recordAutoInsert=function(e,t,n){var r=e.getCursorPosition(),i=t.doc.getLine(r.row);this.isAutoInsertedClosing(r,i,f.autoInsertedLineEnd[0])||(f.autoInsertedBrackets=0),f.autoInsertedRow=r.row,f.autoInsertedLineEnd=n+i.substr(r.column),f.autoInsertedBrackets++},d.recordMaybeInsert=function(e,t,n){var r=e.getCursorPosition(),i=t.doc.getLine(r.row);this.isMaybeInsertedClosing(r,i)||(f.maybeInsertedBrackets=0),f.maybeInsertedRow=r.row,f.maybeInsertedLineStart=i.substr(0,r.column)+n,f.maybeInsertedLineEnd=i.substr(r.column),f.maybeInsertedBrackets++},d.isAutoInsertedClosing=function(e,t,n){return f.autoInsertedBrackets>0&&e.row===f.autoInsertedRow&&n===f.autoInsertedLineEnd[0]&&t.substr(e.column)===f.autoInsertedLineEnd},d.isMaybeInsertedClosing=function(e,t){return f.maybeInsertedBrackets>0&&e.row===f.maybeInsertedRow&&t.substr(e.column)===f.maybeInsertedLineEnd&&t.substr(0,e.column)==f.maybeInsertedLineStart},d.popAutoInsertedClosing=function(){f.autoInsertedLineEnd=f.autoInsertedLineEnd.substr(1),f.autoInsertedBrackets--},d.clearMaybeInsertedClosing=function(){f&&(f.maybeInsertedBrackets=0,f.maybeInsertedRow=-1)},r.inherits(d,i),t.CstyleBehaviour=d}),define(\"ace/unicode\",[\"require\",\"exports\",\"module\"],function(e,t,n){\"use strict\";function r(e){var n=/\\w{4}/g;for(var r in e)t.packages[r]=e[r].replace(n,\"\\\\u$&\")}t.packages={},r({L:\"0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC\",Ll:\"0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A\",Lu:\"0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A\",Lt:\"01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC\",Lm:\"02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F\",Lo:\"01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC\",M:\"0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26\",Mn:\"0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26\",Mc:\"0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC\",Me:\"0488048906DE20DD-20E020E2-20E4A670-A672\",N:\"0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19\",Nd:\"0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19\",Nl:\"16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF\",No:\"00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835\",P:\"0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65\",Pd:\"002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D\",Ps:\"0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62\",Pe:\"0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63\",Pi:\"00AB2018201B201C201F20392E022E042E092E0C2E1C2E20\",Pf:\"00BB2019201D203A2E032E052E0A2E0D2E1D2E21\",Pc:\"005F203F20402054FE33FE34FE4D-FE4FFF3F\",Po:\"0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65\",S:\"0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD\",Sm:\"002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC\",Sc:\"002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6\",Sk:\"005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3\",So:\"00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD\",Z:\"002000A01680180E2000-200A20282029202F205F3000\",Zs:\"002000A01680180E2000-200A202F205F3000\",Zl:\"2028\",Zp:\"2029\",C:\"0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF\",Cc:\"0000-001F007F-009F\",Cf:\"00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB\",Co:\"E000-F8FF\",Cs:\"D800-DFFF\",Cn:\"03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF\"})}),define(\"ace/mode/text\",[\"require\",\"exports\",\"module\",\"ace/tokenizer\",\"ace/mode/text_highlight_rules\",\"ace/mode/behaviour/cstyle\",\"ace/unicode\",\"ace/lib/lang\",\"ace/token_iterator\",\"ace/range\"],function(e,t,n){\"use strict\";var r=e(\"../tokenizer\").Tokenizer,i=e(\"./text_highlight_rules\").TextHighlightRules,s=e(\"./behaviour/cstyle\").CstyleBehaviour,o=e(\"../unicode\"),u=e(\"../lib/lang\"),a=e(\"../token_iterator\").TokenIterator,f=e(\"../range\").Range,l=function(){this.HighlightRules=i};(function(){this.$defaultBehaviour=new s,this.tokenRe=new RegExp(\"^[\"+o.packages.L+o.packages.Mn+o.packages.Mc+o.packages.Nd+o.packages.Pc+\"\\\\$_]+\",\"g\"),this.nonTokenRe=new RegExp(\"^(?:[^\"+o.packages.L+o.packages.Mn+o.packages.Mc+o.packages.Nd+o.packages.Pc+\"\\\\$_]|\\\\s])+\",\"g\"),this.getTokenizer=function(){return this.$tokenizer||(this.$highlightRules=this.$highlightRules||new this.HighlightRules(this.$highlightRuleConfig),this.$tokenizer=new r(this.$highlightRules.getRules())),this.$tokenizer},this.lineCommentStart=\"\",this.blockComment=\"\",this.toggleCommentLines=function(e,t,n,r){function w(e){for(var t=n;t<=r;t++)e(i.getLine(t),t)}var i=t.doc,s=!0,o=!0,a=Infinity,f=t.getTabSize(),l=!1;if(!this.lineCommentStart){if(!this.blockComment)return!1;var c=this.blockComment.start,h=this.blockComment.end,p=new RegExp(\"^(\\\\s*)(?:\"+u.escapeRegExp(c)+\")\"),d=new RegExp(\"(?:\"+u.escapeRegExp(h)+\")\\\\s*$\"),v=function(e,t){if(g(e,t))return;if(!s||/\\S/.test(e))i.insertInLine({row:t,column:e.length},h),i.insertInLine({row:t,column:a},c)},m=function(e,t){var n;(n=e.match(d))&&i.removeInLine(t,e.length-n[0].length,e.length),(n=e.match(p))&&i.removeInLine(t,n[1].length,n[0].length)},g=function(e,n){if(p.test(e))return!0;var r=t.getTokens(n);for(var i=0;i<r.length;i++)if(r[i].type===\"comment\")return!0}}else{if(Array.isArray(this.lineCommentStart))var p=this.lineCommentStart.map(u.escapeRegExp).join(\"|\"),c=this.lineCommentStart[0];else var p=u.escapeRegExp(this.lineCommentStart),c=this.lineCommentStart;p=new RegExp(\"^(\\\\s*)(?:\"+p+\") ?\"),l=t.getUseSoftTabs();var m=function(e,t){var n=e.match(p);if(!n)return;var r=n[1].length,s=n[0].length;!b(e,r,s)&&n[0][s-1]==\" \"&&s--,i.removeInLine(t,r,s)},y=c+\" \",v=function(e,t){if(!s||/\\S/.test(e))b(e,a,a)?i.insertInLine({row:t,column:a},y):i.insertInLine({row:t,column:a},c)},g=function(e,t){return p.test(e)},b=function(e,t,n){var r=0;while(t--&&e.charAt(t)==\" \")r++;if(r%f!=0)return!1;var r=0;while(e.charAt(n++)==\" \")r++;return f>2?r%f!=f-1:r%f==0}}var E=Infinity;w(function(e,t){var n=e.search(/\\S/);n!==-1?(n<a&&(a=n),o&&!g(e,t)&&(o=!1)):E>e.length&&(E=e.length)}),a==Infinity&&(a=E,s=!1,o=!1),l&&a%f!=0&&(a=Math.floor(a/f)*f),w(o?m:v)},this.toggleBlockComment=function(e,t,n,r){var i=this.blockComment;if(!i)return;!i.start&&i[0]&&(i=i[0]);var s=new a(t,r.row,r.column),o=s.getCurrentToken(),u=t.selection,l=t.selection.toOrientedRange(),c,h;if(o&&/comment/.test(o.type)){var p,d;while(o&&/comment/.test(o.type)){var v=o.value.indexOf(i.start);if(v!=-1){var m=s.getCurrentTokenRow(),g=s.getCurrentTokenColumn()+v;p=new f(m,g,m,g+i.start.length);break}o=s.stepBackward()}var s=new a(t,r.row,r.column),o=s.getCurrentToken();while(o&&/comment/.test(o.type)){var v=o.value.indexOf(i.end);if(v!=-1){var m=s.getCurrentTokenRow(),g=s.getCurrentTokenColumn()+v;d=new f(m,g,m,g+i.end.length);break}o=s.stepForward()}d&&t.remove(d),p&&(t.remove(p),c=p.start.row,h=-i.start.length)}else h=i.start.length,c=n.start.row,t.insert(n.end,i.end),t.insert(n.start,i.start);l.start.row==c&&(l.start.column+=h),l.end.row==c&&(l.end.column+=h),t.selection.fromOrientedRange(l)},this.getNextLineIndent=function(e,t,n){return this.$getIndent(t)},this.checkOutdent=function(e,t,n){return!1},this.autoOutdent=function(e,t,n){},this.$getIndent=function(e){return e.match(/^\\s*/)[0]},this.createWorker=function(e){return null},this.createModeDelegates=function(e){this.$embeds=[],this.$modes={};for(var t in e)e[t]&&(this.$embeds.push(t),this.$modes[t]=new e[t]);var n=[\"toggleBlockComment\",\"toggleCommentLines\",\"getNextLineIndent\",\"checkOutdent\",\"autoOutdent\",\"transformAction\",\"getCompletions\"];for(var t=0;t<n.length;t++)(function(e){var r=n[t],i=e[r];e[n[t]]=function(){return this.$delegator(r,arguments,i)}})(this)},this.$delegator=function(e,t,n){var r=t[0];typeof r!=\"string\"&&(r=r[0]);for(var i=0;i<this.$embeds.length;i++){if(!this.$modes[this.$embeds[i]])continue;var s=r.split(this.$embeds[i]);if(!s[0]&&s[1]){t[0]=s[1];var o=this.$modes[this.$embeds[i]];return o[e].apply(o,t)}}var u=n.apply(this,t);return n?u:undefined},this.transformAction=function(e,t,n,r,i){if(this.$behaviour){var s=this.$behaviour.getBehaviours();for(var o in s)if(s[o][t]){var u=s[o][t].apply(this,arguments);if(u)return u}}},this.getKeywords=function(e){if(!this.completionKeywords){var t=this.$tokenizer.rules,n=[];for(var r in t){var i=t[r];for(var s=0,o=i.length;s<o;s++)if(typeof i[s].token==\"string\")/keyword|support|storage/.test(i[s].token)&&n.push(i[s].regex);else if(typeof i[s].token==\"object\")for(var u=0,a=i[s].token.length;u<a;u++)if(/keyword|support|storage/.test(i[s].token[u])){var r=i[s].regex.match(/\\(.+?\\)/g)[u];n.push(r.substr(1,r.length-2))}}this.completionKeywords=n}return e?n.concat(this.$keywordList||[]):this.$keywordList},this.$createKeywordList=function(){return this.$highlightRules||this.getTokenizer(),this.$keywordList=this.$highlightRules.$keywordList||[]},this.getCompletions=function(e,t,n,r){var i=this.$keywordList||this.$createKeywordList();return i.map(function(e){return{name:e,value:e,score:0,meta:\"keyword\"}})},this.$id=\"ace/mode/text\"}).call(l.prototype),t.Mode=l}),define(\"ace/apply_delta\",[\"require\",\"exports\",\"module\"],function(e,t,n){\"use strict\";function r(e,t){throw console.log(\"Invalid Delta:\",e),\"Invalid Delta: \"+t}function i(e,t){return t.row>=0&&t.row<e.length&&t.column>=0&&t.column<=e[t.row].length}function s(e,t){t.action!=\"insert\"&&t.action!=\"remove\"&&r(t,\"delta.action must be 'insert' or 'remove'\"),t.lines instanceof Array||r(t,\"delta.lines must be an Array\"),(!t.start||!t.end)&&r(t,\"delta.start/end must be an present\");var n=t.start;i(e,t.start)||r(t,\"delta.start must be contained in document\");var s=t.end;t.action==\"remove\"&&!i(e,s)&&r(t,\"delta.end must contained in document for 'remove' actions\");var o=s.row-n.row,u=s.column-(o==0?n.column:0);(o!=t.lines.length-1||t.lines[o].length!=u)&&r(t,\"delta.range must match delta lines\")}t.applyDelta=function(e,t,n){var r=t.start.row,i=t.start.column,s=e[r]||\"\";switch(t.action){case\"insert\":var o=t.lines;if(o.length===1)e[r]=s.substring(0,i)+t.lines[0]+s.substring(i);else{var u=[r,1].concat(t.lines);e.splice.apply(e,u),e[r]=s.substring(0,i)+e[r],e[r+t.lines.length-1]+=s.substring(i)}break;case\"remove\":var a=t.end.column,f=t.end.row;r===f?e[r]=s.substring(0,i)+s.substring(a):e.splice(r,f-r+1,s.substring(0,i)+e[f].substring(a))}}}),define(\"ace/anchor\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/event_emitter\"],function(e,t,n){\"use strict\";var r=e(\"./lib/oop\"),i=e(\"./lib/event_emitter\").EventEmitter,s=t.Anchor=function(e,t,n){this.$onChange=this.onChange.bind(this),this.attach(e),typeof n==\"undefined\"?this.setPosition(t.row,t.column):this.setPosition(t,n)};(function(){function e(e,t,n){var r=n?e.column<=t.column:e.column<t.column;return e.row<t.row||e.row==t.row&&r}function t(t,n,r){var i=t.action==\"insert\",s=(i?1:-1)*(t.end.row-t.start.row),o=(i?1:-1)*(t.end.column-t.start.column),u=t.start,a=i?u:t.end;return e(n,u,r)?{row:n.row,column:n.column}:e(a,n,!r)?{row:n.row+s,column:n.column+(n.row==a.row?o:0)}:{row:u.row,column:u.column}}r.implement(this,i),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.$insertRight=!1,this.onChange=function(e){if(e.start.row==e.end.row&&e.start.row!=this.row)return;if(e.start.row>this.row)return;var n=t(e,{row:this.row,column:this.column},this.$insertRight);this.setPosition(n.row,n.column,!0)},this.setPosition=function(e,t,n){var r;n?r={row:e,column:t}:r=this.$clipPositionToDocument(e,t);if(this.row==r.row&&this.column==r.column)return;var i={row:this.row,column:this.column};this.row=r.row,this.column=r.column,this._signal(\"change\",{old:i,value:r})},this.detach=function(){this.document.removeEventListener(\"change\",this.$onChange)},this.attach=function(e){this.document=e||this.document,this.document.on(\"change\",this.$onChange)},this.$clipPositionToDocument=function(e,t){var n={};return e>=this.document.getLength()?(n.row=Math.max(0,this.document.getLength()-1),n.column=this.document.getLine(n.row).length):e<0?(n.row=0,n.column=0):(n.row=e,n.column=Math.min(this.document.getLine(n.row).length,Math.max(0,t))),t<0&&(n.column=0),n}}).call(s.prototype)}),define(\"ace/document\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/apply_delta\",\"ace/lib/event_emitter\",\"ace/range\",\"ace/anchor\"],function(e,t,n){\"use strict\";var r=e(\"./lib/oop\"),i=e(\"./apply_delta\").applyDelta,s=e(\"./lib/event_emitter\").EventEmitter,o=e(\"./range\").Range,u=e(\"./anchor\").Anchor,a=function(e){this.$lines=[\"\"],e.length===0?this.$lines=[\"\"]:Array.isArray(e)?this.insertMergedLines({row:0,column:0},e):this.insert({row:0,column:0},e)};(function(){r.implement(this,s),this.setValue=function(e){var t=this.getLength()-1;this.remove(new o(0,0,t,this.getLine(t).length)),this.insert({row:0,column:0},e)},this.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},this.createAnchor=function(e,t){return new u(this,e,t)},\"aaa\".split(/a/).length===0?this.$split=function(e){return e.replace(/\\r\\n|\\r/g,\"\\n\").split(\"\\n\")}:this.$split=function(e){return e.split(/\\r\\n|\\r|\\n/)},this.$detectNewLine=function(e){var t=e.match(/^.*?(\\r\\n|\\r|\\n)/m);this.$autoNewLine=t?t[1]:\"\\n\",this._signal(\"changeNewLineMode\")},this.getNewLineCharacter=function(){switch(this.$newLineMode){case\"windows\":return\"\\r\\n\";case\"unix\":return\"\\n\";default:return this.$autoNewLine||\"\\n\"}},this.$autoNewLine=\"\",this.$newLineMode=\"auto\",this.setNewLineMode=function(e){if(this.$newLineMode===e)return;this.$newLineMode=e,this._signal(\"changeNewLineMode\")},this.getNewLineMode=function(){return this.$newLineMode},this.isNewLine=function(e){return e==\"\\r\\n\"||e==\"\\r\"||e==\"\\n\"},this.getLine=function(e){return this.$lines[e]||\"\"},this.getLines=function(e,t){return this.$lines.slice(e,t+1)},this.getAllLines=function(){return this.getLines(0,this.getLength())},this.getLength=function(){return this.$lines.length},this.getTextRange=function(e){return this.getLinesForRange(e).join(this.getNewLineCharacter())},this.getLinesForRange=function(e){var t;if(e.start.row===e.end.row)t=[this.getLine(e.start.row).substring(e.start.column,e.end.column)];else{t=this.getLines(e.start.row,e.end.row),t[0]=(t[0]||\"\").substring(e.start.column);var n=t.length-1;e.end.row-e.start.row==n&&(t[n]=t[n].substring(0,e.end.column))}return t},this.insertLines=function(e,t){return console.warn(\"Use of document.insertLines is deprecated. Use the insertFullLines method instead.\"),this.insertFullLines(e,t)},this.removeLines=function(e,t){return console.warn(\"Use of document.removeLines is deprecated. Use the removeFullLines method instead.\"),this.removeFullLines(e,t)},this.insertNewLine=function(e){return console.warn(\"Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead.\"),this.insertMergedLines(e,[\"\",\"\"])},this.insert=function(e,t){return this.getLength()<=1&&this.$detectNewLine(t),this.insertMergedLines(e,this.$split(t))},this.insertInLine=function(e,t){var n=this.clippedPos(e.row,e.column),r=this.pos(e.row,e.column+t.length);return this.applyDelta({start:n,end:r,action:\"insert\",lines:[t]},!0),this.clonePos(r)},this.clippedPos=function(e,t){var n=this.getLength();e===undefined?e=n:e<0?e=0:e>=n&&(e=n-1,t=undefined);var r=this.getLine(e);return t==undefined&&(t=r.length),t=Math.min(Math.max(t,0),r.length),{row:e,column:t}},this.clonePos=function(e){return{row:e.row,column:e.column}},this.pos=function(e,t){return{row:e,column:t}},this.$clipPosition=function(e){var t=this.getLength();return e.row>=t?(e.row=Math.max(0,t-1),e.column=this.getLine(t-1).length):(e.row=Math.max(0,e.row),e.column=Math.min(Math.max(e.column,0),this.getLine(e.row).length)),e},this.insertFullLines=function(e,t){e=Math.min(Math.max(e,0),this.getLength());var n=0;e<this.getLength()?(t=t.concat([\"\"]),n=0):(t=[\"\"].concat(t),e--,n=this.$lines[e].length),this.insertMergedLines({row:e,column:n},t)},this.insertMergedLines=function(e,t){var n=this.clippedPos(e.row,e.column),r={row:n.row+t.length-1,column:(t.length==1?n.column:0)+t[t.length-1].length};return this.applyDelta({start:n,end:r,action:\"insert\",lines:t}),this.clonePos(r)},this.remove=function(e){var t=this.clippedPos(e.start.row,e.start.column),n=this.clippedPos(e.end.row,e.end.column);return this.applyDelta({start:t,end:n,action:\"remove\",lines:this.getLinesForRange({start:t,end:n})}),this.clonePos(t)},this.removeInLine=function(e,t,n){var r=this.clippedPos(e,t),i=this.clippedPos(e,n);return this.applyDelta({start:r,end:i,action:\"remove\",lines:this.getLinesForRange({start:r,end:i})},!0),this.clonePos(r)},this.removeFullLines=function(e,t){e=Math.min(Math.max(0,e),this.getLength()-1),t=Math.min(Math.max(0,t),this.getLength()-1);var n=t==this.getLength()-1&&e>0,r=t<this.getLength()-1,i=n?e-1:e,s=n?this.getLine(i).length:0,u=r?t+1:t,a=r?0:this.getLine(u).length,f=new o(i,s,u,a),l=this.$lines.slice(e,t+1);return this.applyDelta({start:f.start,end:f.end,action:\"remove\",lines:this.getLinesForRange(f)}),l},this.removeNewLine=function(e){e<this.getLength()-1&&e>=0&&this.applyDelta({start:this.pos(e,this.getLine(e).length),end:this.pos(e+1,0),action:\"remove\",lines:[\"\",\"\"]})},this.replace=function(e,t){e instanceof o||(e=o.fromPoints(e.start,e.end));if(t.length===0&&e.isEmpty())return e.start;if(t==this.getTextRange(e))return e.end;this.remove(e);var n;return t?n=this.insert(e.start,t):n=e.start,n},this.applyDeltas=function(e){for(var t=0;t<e.length;t++)this.applyDelta(e[t])},this.revertDeltas=function(e){for(var t=e.length-1;t>=0;t--)this.revertDelta(e[t])},this.applyDelta=function(e,t){var n=e.action==\"insert\";if(n?e.lines.length<=1&&!e.lines[0]:!o.comparePoints(e.start,e.end))return;n&&e.lines.length>2e4&&this.$splitAndapplyLargeDelta(e,2e4),i(this.$lines,e,t),this._signal(\"change\",e)},this.$splitAndapplyLargeDelta=function(e,t){var n=e.lines,r=n.length,i=e.start.row,s=e.start.column,o=0,u=0;do{o=u,u+=t-1;var a=n.slice(o,u);if(u>r){e.lines=a,e.start.row=i+o,e.start.column=s;break}a.push(\"\"),this.applyDelta({start:this.pos(i+o,s),end:this.pos(i+u,s=0),action:e.action,lines:a},!0)}while(!0)},this.revertDelta=function(e){this.applyDelta({start:this.clonePos(e.start),end:this.clonePos(e.end),action:e.action==\"insert\"?\"remove\":\"insert\",lines:e.lines.slice()})},this.indexToPosition=function(e,t){var n=this.$lines||this.getAllLines(),r=this.getNewLineCharacter().length;for(var i=t||0,s=n.length;i<s;i++){e-=n[i].length+r;if(e<0)return{row:i,column:e+n[i].length+r}}return{row:s-1,column:n[s-1].length}},this.positionToIndex=function(e,t){var n=this.$lines||this.getAllLines(),r=this.getNewLineCharacter().length,i=0,s=Math.min(e.row,n.length);for(var o=t||0;o<s;++o)i+=n[o].length+r;return i+e.column}}).call(a.prototype),t.Document=a}),define(\"ace/background_tokenizer\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/event_emitter\"],function(e,t,n){\"use strict\";var r=e(\"./lib/oop\"),i=e(\"./lib/event_emitter\").EventEmitter,s=function(e,t){this.running=!1,this.lines=[],this.states=[],this.currentLine=0,this.tokenizer=e;var n=this;this.$worker=function(){if(!n.running)return;var e=new Date,t=n.currentLine,r=-1,i=n.doc,s=t;while(n.lines[t])t++;var o=i.getLength(),u=0;n.running=!1;while(t<o){n.$tokenizeRow(t),r=t;do t++;while(n.lines[t]);u++;if(u%5===0&&new Date-e>20){n.running=setTimeout(n.$worker,20);break}}n.currentLine=t,r==-1&&(r=t),s<=r&&n.fireUpdateEvent(s,r)}};(function(){r.implement(this,i),this.setTokenizer=function(e){this.tokenizer=e,this.lines=[],this.states=[],this.start(0)},this.setDocument=function(e){this.doc=e,this.lines=[],this.states=[],this.stop()},this.fireUpdateEvent=function(e,t){var n={first:e,last:t};this._signal(\"update\",{data:n})},this.start=function(e){this.currentLine=Math.min(e||0,this.currentLine,this.doc.getLength()),this.lines.splice(this.currentLine,this.lines.length),this.states.splice(this.currentLine,this.states.length),this.stop(),this.running=setTimeout(this.$worker,700)},this.scheduleStart=function(){this.running||(this.running=setTimeout(this.$worker,700))},this.$updateOnChange=function(e){var t=e.start.row,n=e.end.row-t;if(n===0)this.lines[t]=null;else if(e.action==\"remove\")this.lines.splice(t,n+1,null),this.states.splice(t,n+1,null);else{var r=Array(n+1);r.unshift(t,1),this.lines.splice.apply(this.lines,r),this.states.splice.apply(this.states,r)}this.currentLine=Math.min(t,this.currentLine,this.doc.getLength()),this.stop()},this.stop=function(){this.running&&clearTimeout(this.running),this.running=!1},this.getTokens=function(e){return this.lines[e]||this.$tokenizeRow(e)},this.getState=function(e){return this.currentLine==e&&this.$tokenizeRow(e),this.states[e]||\"start\"},this.$tokenizeRow=function(e){var t=this.doc.getLine(e),n=this.states[e-1],r=this.tokenizer.getLineTokens(t,n,e);return this.states[e]+\"\"!=r.state+\"\"?(this.states[e]=r.state,this.lines[e+1]=null,this.currentLine>e+1&&(this.currentLine=e+1)):this.currentLine==e&&(this.currentLine=e+1),this.lines[e]=r.tokens}}).call(s.prototype),t.BackgroundTokenizer=s}),define(\"ace/search_highlight\",[\"require\",\"exports\",\"module\",\"ace/lib/lang\",\"ace/lib/oop\",\"ace/range\"],function(e,t,n){\"use strict\";var r=e(\"./lib/lang\"),i=e(\"./lib/oop\"),s=e(\"./range\").Range,o=function(e,t,n){this.setRegexp(e),this.clazz=t,this.type=n||\"text\"};(function(){this.MAX_RANGES=500,this.setRegexp=function(e){if(this.regExp+\"\"==e+\"\")return;this.regExp=e,this.cache=[]},this.update=function(e,t,n,i){if(!this.regExp)return;var o=i.firstRow,u=i.lastRow;for(var a=o;a<=u;a++){var f=this.cache[a];f==null&&(f=r.getMatchOffsets(n.getLine(a),this.regExp),f.length>this.MAX_RANGES&&(f=f.slice(0,this.MAX_RANGES)),f=f.map(function(e){return new s(a,e.offset,a,e.offset+e.length)}),this.cache[a]=f.length?f:\"\");for(var l=f.length;l--;)t.drawSingleLineMarker(e,f[l].toScreenRange(n),this.clazz,i)}}}).call(o.prototype),t.SearchHighlight=o}),define(\"ace/edit_session/fold_line\",[\"require\",\"exports\",\"module\",\"ace/range\"],function(e,t,n){\"use strict\";function i(e,t){this.foldData=e,Array.isArray(t)?this.folds=t:t=this.folds=[t];var n=t[t.length-1];this.range=new r(t[0].start.row,t[0].start.column,n.end.row,n.end.column),this.start=this.range.start,this.end=this.range.end,this.folds.forEach(function(e){e.setFoldLine(this)},this)}var r=e(\"../range\").Range;(function(){this.shiftRow=function(e){this.start.row+=e,this.end.row+=e,this.folds.forEach(function(t){t.start.row+=e,t.end.row+=e})},this.addFold=function(e){if(e.sameRow){if(e.start.row<this.startRow||e.endRow>this.endRow)throw new Error(\"Can't add a fold to this FoldLine as it has no connection\");this.folds.push(e),this.folds.sort(function(e,t){return-e.range.compareEnd(t.start.row,t.start.column)}),this.range.compareEnd(e.start.row,e.start.column)>0?(this.end.row=e.end.row,this.end.column=e.end.column):this.range.compareStart(e.end.row,e.end.column)<0&&(this.start.row=e.start.row,this.start.column=e.start.column)}else if(e.start.row==this.end.row)this.folds.push(e),this.end.row=e.end.row,this.end.column=e.end.column;else{if(e.end.row!=this.start.row)throw new Error(\"Trying to add fold to FoldRow that doesn't have a matching row\");this.folds.unshift(e),this.start.row=e.start.row,this.start.column=e.start.column}e.foldLine=this},this.containsRow=function(e){return e>=this.start.row&&e<=this.end.row},this.walk=function(e,t,n){var r=0,i=this.folds,s,o,u,a=!0;t==null&&(t=this.end.row,n=this.end.column);for(var f=0;f<i.length;f++){s=i[f],o=s.range.compareStart(t,n);if(o==-1){e(null,t,n,r,a);return}u=e(null,s.start.row,s.start.column,r,a),u=!u&&e(s.placeholder,s.start.row,s.start.column,r);if(u||o===0)return;a=!s.sameRow,r=s.end.column}e(null,t,n,r,a)},this.getNextFoldTo=function(e,t){var n,r;for(var i=0;i<this.folds.length;i++){n=this.folds[i],r=n.range.compareEnd(e,t);if(r==-1)return{fold:n,kind:\"after\"};if(r===0)return{fold:n,kind:\"inside\"}}return null},this.addRemoveChars=function(e,t,n){var r=this.getNextFoldTo(e,t),i,s;if(r){i=r.fold;if(r.kind==\"inside\"&&i.start.column!=t&&i.start.row!=e)window.console&&window.console.log(e,t,i);else if(i.start.row==e){s=this.folds;var o=s.indexOf(i);o===0&&(this.start.column+=n);for(o;o<s.length;o++){i=s[o],i.start.column+=n;if(!i.sameRow)return;i.end.column+=n}this.end.column+=n}}},this.split=function(e,t){var n=this.getNextFoldTo(e,t);if(!n||n.kind==\"inside\")return null;var r=n.fold,s=this.folds,o=this.foldData,u=s.indexOf(r),a=s[u-1];this.end.row=a.end.row,this.end.column=a.end.column,s=s.splice(u,s.length-u);var f=new i(o,s);return o.splice(o.indexOf(this)+1,0,f),f},this.merge=function(e){var t=e.folds;for(var n=0;n<t.length;n++)this.addFold(t[n]);var r=this.foldData;r.splice(r.indexOf(e),1)},this.toString=function(){var e=[this.range.toString()+\": [\"];return this.folds.forEach(function(t){e.push(\"  \"+t.toString())}),e.push(\"]\"),e.join(\"\\n\")},this.idxToPosition=function(e){var t=0;for(var n=0;n<this.folds.length;n++){var r=this.folds[n];e-=r.start.column-t;if(e<0)return{row:r.start.row,column:r.start.column+e};e-=r.placeholder.length;if(e<0)return r.start;t=r.end.column}return{row:this.end.row,column:this.end.column+e}}}).call(i.prototype),t.FoldLine=i}),define(\"ace/range_list\",[\"require\",\"exports\",\"module\",\"ace/range\"],function(e,t,n){\"use strict\";var r=e(\"./range\").Range,i=r.comparePoints,s=function(){this.ranges=[]};(function(){this.comparePoints=i,this.pointIndex=function(e,t,n){var r=this.ranges;for(var s=n||0;s<r.length;s++){var o=r[s],u=i(e,o.end);if(u>0)continue;var a=i(e,o.start);return u===0?t&&a!==0?-s-2:s:a>0||a===0&&!t?s:-s-1}return-s-1},this.add=function(e){var t=!e.isEmpty(),n=this.pointIndex(e.start,t);n<0&&(n=-n-1);var r=this.pointIndex(e.end,t,n);return r<0?r=-r-1:r++,this.ranges.splice(n,r-n,e)},this.addList=function(e){var t=[];for(var n=e.length;n--;)t.push.apply(t,this.add(e[n]));return t},this.substractPoint=function(e){var t=this.pointIndex(e);if(t>=0)return this.ranges.splice(t,1)},this.merge=function(){var e=[],t=this.ranges;t=t.sort(function(e,t){return i(e.start,t.start)});var n=t[0],r;for(var s=1;s<t.length;s++){r=n,n=t[s];var o=i(r.end,n.start);if(o<0)continue;if(o==0&&!r.isEmpty()&&!n.isEmpty())continue;i(r.end,n.end)<0&&(r.end.row=n.end.row,r.end.column=n.end.column),t.splice(s,1),e.push(n),n=r,s--}return this.ranges=t,e},this.contains=function(e,t){return this.pointIndex({row:e,column:t})>=0},this.containsPoint=function(e){return this.pointIndex(e)>=0},this.rangeAtPoint=function(e){var t=this.pointIndex(e);if(t>=0)return this.ranges[t]},this.clipRows=function(e,t){var n=this.ranges;if(n[0].start.row>t||n[n.length-1].start.row<e)return[];var r=this.pointIndex({row:e,column:0});r<0&&(r=-r-1);var i=this.pointIndex({row:t,column:0},r);i<0&&(i=-i-1);var s=[];for(var o=r;o<i;o++)s.push(n[o]);return s},this.removeAll=function(){return this.ranges.splice(0,this.ranges.length)},this.attach=function(e){this.session&&this.detach(),this.session=e,this.onChange=this.$onChange.bind(this),this.session.on(\"change\",this.onChange)},this.detach=function(){if(!this.session)return;this.session.removeListener(\"change\",this.onChange),this.session=null},this.$onChange=function(e){if(e.action==\"insert\")var t=e.start,n=e.end;else var n=e.start,t=e.end;var r=t.row,i=n.row,s=i-r,o=-t.column+n.column,u=this.ranges;for(var a=0,f=u.length;a<f;a++){var l=u[a];if(l.end.row<r)continue;if(l.start.row>r)break;l.start.row==r&&l.start.column>=t.column&&(l.start.column!=t.column||!this.$insertRight)&&(l.start.column+=o,l.start.row+=s);if(l.end.row==r&&l.end.column>=t.column){if(l.end.column==t.column&&this.$insertRight)continue;l.end.column==t.column&&o>0&&a<f-1&&l.end.column>l.start.column&&l.end.column==u[a+1].start.column&&(l.end.column-=o),l.end.column+=o,l.end.row+=s}}if(s!=0&&a<f)for(;a<f;a++){var l=u[a];l.start.row+=s,l.end.row+=s}}}).call(s.prototype),t.RangeList=s}),define(\"ace/edit_session/fold\",[\"require\",\"exports\",\"module\",\"ace/range\",\"ace/range_list\",\"ace/lib/oop\"],function(e,t,n){\"use strict\";function u(e,t){e.row-=t.row,e.row==0&&(e.column-=t.column)}function a(e,t){u(e.start,t),u(e.end,t)}function f(e,t){e.row==0&&(e.column+=t.column),e.row+=t.row}function l(e,t){f(e.start,t),f(e.end,t)}var r=e(\"../range\").Range,i=e(\"../range_list\").RangeList,s=e(\"../lib/oop\"),o=t.Fold=function(e,t){this.foldLine=null,this.placeholder=t,this.range=e,this.start=e.start,this.end=e.end,this.sameRow=e.start.row==e.end.row,this.subFolds=this.ranges=[]};s.inherits(o,i),function(){this.toString=function(){return'\"'+this.placeholder+'\" '+this.range.toString()},this.setFoldLine=function(e){this.foldLine=e,this.subFolds.forEach(function(t){t.setFoldLine(e)})},this.clone=function(){var e=this.range.clone(),t=new o(e,this.placeholder);return this.subFolds.forEach(function(e){t.subFolds.push(e.clone())}),t.collapseChildren=this.collapseChildren,t},this.addSubFold=function(e){if(this.range.isEqual(e))return;if(!this.range.containsRange(e))throw new Error(\"A fold can't intersect already existing fold\"+e.range+this.range);a(e,this.start);var t=e.start.row,n=e.start.column;for(var r=0,i=-1;r<this.subFolds.length;r++){i=this.subFolds[r].range.compare(t,n);if(i!=1)break}var s=this.subFolds[r];if(i==0)return s.addSubFold(e);var t=e.range.end.row,n=e.range.end.column;for(var o=r,i=-1;o<this.subFolds.length;o++){i=this.subFolds[o].range.compare(t,n);if(i!=1)break}var u=this.subFolds[o];if(i==0)throw new Error(\"A fold can't intersect already existing fold\"+e.range+this.range);var f=this.subFolds.splice(r,o-r,e);return e.setFoldLine(this.foldLine),e},this.restoreRange=function(e){return l(e,this.start)}}.call(o.prototype)}),define(\"ace/edit_session/folding\",[\"require\",\"exports\",\"module\",\"ace/range\",\"ace/edit_session/fold_line\",\"ace/edit_session/fold\",\"ace/token_iterator\"],function(e,t,n){\"use strict\";function u(){this.getFoldAt=function(e,t,n){var r=this.getFoldLine(e);if(!r)return null;var i=r.folds;for(var s=0;s<i.length;s++){var o=i[s];if(o.range.contains(e,t)){if(n==1&&o.range.isEnd(e,t))continue;if(n==-1&&o.range.isStart(e,t))continue;return o}}},this.getFoldsInRange=function(e){var t=e.start,n=e.end,r=this.$foldData,i=[];t.column+=1,n.column-=1;for(var s=0;s<r.length;s++){var o=r[s].range.compareRange(e);if(o==2)continue;if(o==-2)break;var u=r[s].folds;for(var a=0;a<u.length;a++){var f=u[a];o=f.range.compareRange(e);if(o==-2)break;if(o==2)continue;if(o==42)break;i.push(f)}}return t.column-=1,n.column+=1,i},this.getFoldsInRangeList=function(e){if(Array.isArray(e)){var t=[];e.forEach(function(e){t=t.concat(this.getFoldsInRange(e))},this)}else var t=this.getFoldsInRange(e);return t},this.getAllFolds=function(){var e=[],t=this.$foldData;for(var n=0;n<t.length;n++)for(var r=0;r<t[n].folds.length;r++)e.push(t[n].folds[r]);return e},this.getFoldStringAt=function(e,t,n,r){r=r||this.getFoldLine(e);if(!r)return null;var i={end:{column:0}},s,o;for(var u=0;u<r.folds.length;u++){o=r.folds[u];var a=o.range.compareEnd(e,t);if(a==-1){s=this.getLine(o.start.row).substring(i.end.column,o.start.column);break}if(a===0)return null;i=o}return s||(s=this.getLine(o.start.row).substring(i.end.column)),n==-1?s.substring(0,t-i.end.column):n==1?s.substring(t-i.end.column):s},this.getFoldLine=function(e,t){var n=this.$foldData,r=0;t&&(r=n.indexOf(t)),r==-1&&(r=0);for(r;r<n.length;r++){var i=n[r];if(i.start.row<=e&&i.end.row>=e)return i;if(i.end.row>e)return null}return null},this.getNextFoldLine=function(e,t){var n=this.$foldData,r=0;t&&(r=n.indexOf(t)),r==-1&&(r=0);for(r;r<n.length;r++){var i=n[r];if(i.end.row>=e)return i}return null},this.getFoldedRowCount=function(e,t){var n=this.$foldData,r=t-e+1;for(var i=0;i<n.length;i++){var s=n[i],o=s.end.row,u=s.start.row;if(o>=t){u<t&&(u>=e?r-=t-u:r=0);break}o>=e&&(u>=e?r-=o-u:r-=o-e+1)}return r},this.$addFoldLine=function(e){return this.$foldData.push(e),this.$foldData.sort(function(e,t){return e.start.row-t.start.row}),e},this.addFold=function(e,t){var n=this.$foldData,r=!1,o;e instanceof s?o=e:(o=new s(t,e),o.collapseChildren=t.collapseChildren),this.$clipRangeToDocument(o.range);var u=o.start.row,a=o.start.column,f=o.end.row,l=o.end.column;if(u<f||u==f&&a<=l-2){var c=this.getFoldAt(u,a,1),h=this.getFoldAt(f,l,-1);if(c&&h==c)return c.addSubFold(o);c&&!c.range.isStart(u,a)&&this.removeFold(c),h&&!h.range.isEnd(f,l)&&this.removeFold(h);var p=this.getFoldsInRange(o.range);p.length>0&&(this.removeFolds(p),p.forEach(function(e){o.addSubFold(e)}));for(var d=0;d<n.length;d++){var v=n[d];if(f==v.start.row){v.addFold(o),r=!0;break}if(u==v.end.row){v.addFold(o),r=!0;if(!o.sameRow){var m=n[d+1];if(m&&m.start.row==f){v.merge(m);break}}break}if(f<=v.start.row)break}return r||(v=this.$addFoldLine(new i(this.$foldData,o))),this.$useWrapMode?this.$updateWrapData(v.start.row,v.start.row):this.$updateRowLengthCache(v.start.row,v.start.row),this.$modified=!0,this._signal(\"changeFold\",{data:o,action:\"add\"}),o}throw new Error(\"The range has to be at least 2 characters width\")},this.addFolds=function(e){e.forEach(function(e){this.addFold(e)},this)},this.removeFold=function(e){var t=e.foldLine,n=t.start.row,r=t.end.row,i=this.$foldData,s=t.folds;if(s.length==1)i.splice(i.indexOf(t),1);else if(t.range.isEnd(e.end.row,e.end.column))s.pop(),t.end.row=s[s.length-1].end.row,t.end.column=s[s.length-1].end.column;else if(t.range.isStart(e.start.row,e.start.column))s.shift(),t.start.row=s[0].start.row,t.start.column=s[0].start.column;else if(e.sameRow)s.splice(s.indexOf(e),1);else{var o=t.split(e.start.row,e.start.column);s=o.folds,s.shift(),o.start.row=s[0].start.row,o.start.column=s[0].start.column}this.$updating||(this.$useWrapMode?this.$updateWrapData(n,r):this.$updateRowLengthCache(n,r)),this.$modified=!0,this._signal(\"changeFold\",{data:e,action:\"remove\"})},this.removeFolds=function(e){var t=[];for(var n=0;n<e.length;n++)t.push(e[n]);t.forEach(function(e){this.removeFold(e)},this),this.$modified=!0},this.expandFold=function(e){this.removeFold(e),e.subFolds.forEach(function(t){e.restoreRange(t),this.addFold(t)},this),e.collapseChildren>0&&this.foldAll(e.start.row+1,e.end.row,e.collapseChildren-1),e.subFolds=[]},this.expandFolds=function(e){e.forEach(function(e){this.expandFold(e)},this)},this.unfold=function(e,t){var n,i;e==null?(n=new r(0,0,this.getLength(),0),t=!0):typeof e==\"number\"?n=new r(e,0,e,this.getLine(e).length):\"row\"in e?n=r.fromPoints(e,e):n=e,i=this.getFoldsInRangeList(n);if(t)this.removeFolds(i);else{var s=i;while(s.length)this.expandFolds(s),s=this.getFoldsInRangeList(n)}if(i.length)return i},this.isRowFolded=function(e,t){return!!this.getFoldLine(e,t)},this.getRowFoldEnd=function(e,t){var n=this.getFoldLine(e,t);return n?n.end.row:e},this.getRowFoldStart=function(e,t){var n=this.getFoldLine(e,t);return n?n.start.row:e},this.getFoldDisplayLine=function(e,t,n,r,i){r==null&&(r=e.start.row),i==null&&(i=0),t==null&&(t=e.end.row),n==null&&(n=this.getLine(t).length);var s=this.doc,o=\"\";return e.walk(function(e,t,n,u){if(t<r)return;if(t==r){if(n<i)return;u=Math.max(i,u)}e!=null?o+=e:o+=s.getLine(t).substring(u,n)},t,n),o},this.getDisplayLine=function(e,t,n,r){var i=this.getFoldLine(e);if(!i){var s;return s=this.doc.getLine(e),s.substring(r||0,t||s.length)}return this.getFoldDisplayLine(i,e,t,n,r)},this.$cloneFoldData=function(){var e=[];return e=this.$foldData.map(function(t){var n=t.folds.map(function(e){return e.clone()});return new i(e,n)}),e},this.toggleFold=function(e){var t=this.selection,n=t.getRange(),r,i;if(n.isEmpty()){var s=n.start;r=this.getFoldAt(s.row,s.column);if(r){this.expandFold(r);return}(i=this.findMatchingBracket(s))?n.comparePoint(i)==1?n.end=i:(n.start=i,n.start.column++,n.end.column--):(i=this.findMatchingBracket({row:s.row,column:s.column+1}))?(n.comparePoint(i)==1?n.end=i:n.start=i,n.start.column++):n=this.getCommentFoldRange(s.row,s.column)||n}else{var o=this.getFoldsInRange(n);if(e&&o.length){this.expandFolds(o);return}o.length==1&&(r=o[0])}r||(r=this.getFoldAt(n.start.row,n.start.column));if(r&&r.range.toString()==n.toString()){this.expandFold(r);return}var u=\"...\";if(!n.isMultiLine()){u=this.getTextRange(n);if(u.length<4)return;u=u.trim().substring(0,2)+\"..\"}this.addFold(u,n)},this.getCommentFoldRange=function(e,t,n){var i=new o(this,e,t),s=i.getCurrentToken(),u=s.type;if(s&&/^comment|string/.test(u)){u=u.match(/comment|string/)[0],u==\"comment\"&&(u+=\"|doc-start\");var a=new RegExp(u),f=new r;if(n!=1){do s=i.stepBackward();while(s&&a.test(s.type));i.stepForward()}f.start.row=i.getCurrentTokenRow(),f.start.column=i.getCurrentTokenColumn()+2,i=new o(this,e,t);if(n!=-1){var l=-1;do{s=i.stepForward();if(l==-1){var c=this.getState(i.$row);a.test(c)||(l=i.$row)}else if(i.$row>l)break}while(s&&a.test(s.type));s=i.stepBackward()}else s=i.getCurrentToken();return f.end.row=i.getCurrentTokenRow(),f.end.column=i.getCurrentTokenColumn()+s.value.length-2,f}},this.foldAll=function(e,t,n){n==undefined&&(n=1e5);var r=this.foldWidgets;if(!r)return;t=t||this.getLength(),e=e||0;for(var i=e;i<t;i++){r[i]==null&&(r[i]=this.getFoldWidget(i));if(r[i]!=\"start\")continue;var s=this.getFoldWidgetRange(i);if(s&&s.isMultiLine()&&s.end.row<=t&&s.start.row>=e){i=s.end.row;try{var o=this.addFold(\"...\",s);o&&(o.collapseChildren=n)}catch(u){}}}},this.$foldStyles={manual:1,markbegin:1,markbeginend:1},this.$foldStyle=\"markbegin\",this.setFoldStyle=function(e){if(!this.$foldStyles[e])throw new Error(\"invalid fold style: \"+e+\"[\"+Object.keys(this.$foldStyles).join(\", \")+\"]\");if(this.$foldStyle==e)return;this.$foldStyle=e,e==\"manual\"&&this.unfold();var t=this.$foldMode;this.$setFolding(null),this.$setFolding(t)},this.$setFolding=function(e){if(this.$foldMode==e)return;this.$foldMode=e,this.off(\"change\",this.$updateFoldWidgets),this.off(\"tokenizerUpdate\",this.$tokenizerUpdateFoldWidgets),this._signal(\"changeAnnotation\");if(!e||this.$foldStyle==\"manual\"){this.foldWidgets=null;return}this.foldWidgets=[],this.getFoldWidget=e.getFoldWidget.bind(e,this,this.$foldStyle),this.getFoldWidgetRange=e.getFoldWidgetRange.bind(e,this,this.$foldStyle),this.$updateFoldWidgets=this.updateFoldWidgets.bind(this),this.$tokenizerUpdateFoldWidgets=this.tokenizerUpdateFoldWidgets.bind(this),this.on(\"change\",this.$updateFoldWidgets),this.on(\"tokenizerUpdate\",this.$tokenizerUpdateFoldWidgets)},this.getParentFoldRangeData=function(e,t){var n=this.foldWidgets;if(!n||t&&n[e])return{};var r=e-1,i;while(r>=0){var s=n[r];s==null&&(s=n[r]=this.getFoldWidget(r));if(s==\"start\"){var o=this.getFoldWidgetRange(r);i||(i=o);if(o&&o.end.row>=e)break}r--}return{range:r!==-1&&o,firstRange:i}},this.onFoldWidgetClick=function(e,t){t=t.domEvent;var n={children:t.shiftKey,all:t.ctrlKey||t.metaKey,siblings:t.altKey},r=this.$toggleFoldWidget(e,n);if(!r){var i=t.target||t.srcElement;i&&/ace_fold-widget/.test(i.className)&&(i.className+=\" ace_invalid\")}},this.$toggleFoldWidget=function(e,t){if(!this.getFoldWidget)return;var n=this.getFoldWidget(e),r=this.getLine(e),i=n===\"end\"?-1:1,s=this.getFoldAt(e,i===-1?0:r.length,i);if(s)return t.children||t.all?this.removeFold(s):this.expandFold(s),s;var o=this.getFoldWidgetRange(e,!0);if(o&&!o.isMultiLine()){s=this.getFoldAt(o.start.row,o.start.column,1);if(s&&o.isEqual(s.range))return this.removeFold(s),s}if(t.siblings){var u=this.getParentFoldRangeData(e);if(u.range)var a=u.range.start.row+1,f=u.range.end.row;this.foldAll(a,f,t.all?1e4:0)}else t.children?(f=o?o.end.row:this.getLength(),this.foldAll(e+1,f,t.all?1e4:0)):o&&(t.all&&(o.collapseChildren=1e4),this.addFold(\"...\",o));return o},this.toggleFoldWidget=function(e){var t=this.selection.getCursor().row;t=this.getRowFoldStart(t);var n=this.$toggleFoldWidget(t,{});if(n)return;var r=this.getParentFoldRangeData(t,!0);n=r.range||r.firstRange;if(n){t=n.start.row;var i=this.getFoldAt(t,this.getLine(t).length,1);i?this.removeFold(i):this.addFold(\"...\",n)}},this.updateFoldWidgets=function(e){var t=e.start.row,n=e.end.row-t;if(n===0)this.foldWidgets[t]=null;else if(e.action==\"remove\")this.foldWidgets.splice(t,n+1,null);else{var r=Array(n+1);r.unshift(t,1),this.foldWidgets.splice.apply(this.foldWidgets,r)}},this.tokenizerUpdateFoldWidgets=function(e){var t=e.data;t.first!=t.last&&this.foldWidgets.length>t.first&&this.foldWidgets.splice(t.first,this.foldWidgets.length)}}var r=e(\"../range\").Range,i=e(\"./fold_line\").FoldLine,s=e(\"./fold\").Fold,o=e(\"../token_iterator\").TokenIterator;t.Folding=u}),define(\"ace/edit_session/bracket_match\",[\"require\",\"exports\",\"module\",\"ace/token_iterator\",\"ace/range\"],function(e,t,n){\"use strict\";function s(){this.findMatchingBracket=function(e,t){if(e.column==0)return null;var n=t||this.getLine(e.row).charAt(e.column-1);if(n==\"\")return null;var r=n.match(/([\\(\\[\\{])|([\\)\\]\\}])/);return r?r[1]?this.$findClosingBracket(r[1],e):this.$findOpeningBracket(r[2],e):null},this.getBracketRange=function(e){var t=this.getLine(e.row),n=!0,r,s=t.charAt(e.column-1),o=s&&s.match(/([\\(\\[\\{])|([\\)\\]\\}])/);o||(s=t.charAt(e.column),e={row:e.row,column:e.column+1},o=s&&s.match(/([\\(\\[\\{])|([\\)\\]\\}])/),n=!1);if(!o)return null;if(o[1]){var u=this.$findClosingBracket(o[1],e);if(!u)return null;r=i.fromPoints(e,u),n||(r.end.column++,r.start.column--),r.cursor=r.end}else{var u=this.$findOpeningBracket(o[2],e);if(!u)return null;r=i.fromPoints(u,e),n||(r.start.column++,r.end.column--),r.cursor=r.start}return r},this.$brackets={\")\":\"(\",\"(\":\")\",\"]\":\"[\",\"[\":\"]\",\"{\":\"}\",\"}\":\"{\"},this.$findOpeningBracket=function(e,t,n){var i=this.$brackets[e],s=1,o=new r(this,t.row,t.column),u=o.getCurrentToken();u||(u=o.stepForward());if(!u)return;n||(n=new RegExp(\"(\\\\.?\"+u.type.replace(\".\",\"\\\\.\").replace(\"rparen\",\".paren\").replace(/\\b(?:end)\\b/,\"(?:start|begin|end)\")+\")+\"));var a=t.column-o.getCurrentTokenColumn()-2,f=u.value;for(;;){while(a>=0){var l=f.charAt(a);if(l==i){s-=1;if(s==0)return{row:o.getCurrentTokenRow(),column:a+o.getCurrentTokenColumn()}}else l==e&&(s+=1);a-=1}do u=o.stepBackward();while(u&&!n.test(u.type));if(u==null)break;f=u.value,a=f.length-1}return null},this.$findClosingBracket=function(e,t,n){var i=this.$brackets[e],s=1,o=new r(this,t.row,t.column),u=o.getCurrentToken();u||(u=o.stepForward());if(!u)return;n||(n=new RegExp(\"(\\\\.?\"+u.type.replace(\".\",\"\\\\.\").replace(\"lparen\",\".paren\").replace(/\\b(?:start|begin)\\b/,\"(?:start|begin|end)\")+\")+\"));var a=t.column-o.getCurrentTokenColumn();for(;;){var f=u.value,l=f.length;while(a<l){var c=f.charAt(a);if(c==i){s-=1;if(s==0)return{row:o.getCurrentTokenRow(),column:a+o.getCurrentTokenColumn()}}else c==e&&(s+=1);a+=1}do u=o.stepForward();while(u&&!n.test(u.type));if(u==null)break;a=0}return null}}var r=e(\"../token_iterator\").TokenIterator,i=e(\"../range\").Range;t.BracketMatch=s}),define(\"ace/edit_session\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/lang\",\"ace/config\",\"ace/lib/event_emitter\",\"ace/selection\",\"ace/mode/text\",\"ace/range\",\"ace/document\",\"ace/background_tokenizer\",\"ace/search_highlight\",\"ace/edit_session/folding\",\"ace/edit_session/bracket_match\"],function(e,t,n){\"use strict\";var r=e(\"./lib/oop\"),i=e(\"./lib/lang\"),s=e(\"./config\"),o=e(\"./lib/event_emitter\").EventEmitter,u=e(\"./selection\").Selection,a=e(\"./mode/text\").Mode,f=e(\"./range\").Range,l=e(\"./document\").Document,c=e(\"./background_tokenizer\").BackgroundTokenizer,h=e(\"./search_highlight\").SearchHighlight,p=function(e,t){this.$breakpoints=[],this.$decorations=[],this.$frontMarkers={},this.$backMarkers={},this.$markerId=1,this.$undoSelect=!0,this.$foldData=[],this.id=\"session\"+ ++p.$uid,this.$foldData.toString=function(){return this.join(\"\\n\")},this.on(\"changeFold\",this.onChangeFold.bind(this)),this.$onChange=this.onChange.bind(this);if(typeof e!=\"object\"||!e.getLine)e=new l(e);this.setDocument(e),this.selection=new u(this),s.resetOptions(this),this.setMode(t),s._signal(\"session\",this)};p.$uid=0,function(){function m(e){return e<4352?!1:e>=4352&&e<=4447||e>=4515&&e<=4519||e>=4602&&e<=4607||e>=9001&&e<=9002||e>=11904&&e<=11929||e>=11931&&e<=12019||e>=12032&&e<=12245||e>=12272&&e<=12283||e>=12288&&e<=12350||e>=12353&&e<=12438||e>=12441&&e<=12543||e>=12549&&e<=12589||e>=12593&&e<=12686||e>=12688&&e<=12730||e>=12736&&e<=12771||e>=12784&&e<=12830||e>=12832&&e<=12871||e>=12880&&e<=13054||e>=13056&&e<=19903||e>=19968&&e<=42124||e>=42128&&e<=42182||e>=43360&&e<=43388||e>=44032&&e<=55203||e>=55216&&e<=55238||e>=55243&&e<=55291||e>=63744&&e<=64255||e>=65040&&e<=65049||e>=65072&&e<=65106||e>=65108&&e<=65126||e>=65128&&e<=65131||e>=65281&&e<=65376||e>=65504&&e<=65510}r.implement(this,o),this.setDocument=function(e){this.doc&&this.doc.removeListener(\"change\",this.$onChange),this.doc=e,e.on(\"change\",this.$onChange),this.bgTokenizer&&this.bgTokenizer.setDocument(this.getDocument()),this.resetCaches()},this.getDocument=function(){return this.doc},this.$resetRowCache=function(e){if(!e){this.$docRowCache=[],this.$screenRowCache=[];return}var t=this.$docRowCache.length,n=this.$getRowCacheIndex(this.$docRowCache,e)+1;t>n&&(this.$docRowCache.splice(n,t),this.$screenRowCache.splice(n,t))},this.$getRowCacheIndex=function(e,t){var n=0,r=e.length-1;while(n<=r){var i=n+r>>1,s=e[i];if(t>s)n=i+1;else{if(!(t<s))return i;r=i-1}}return n-1},this.resetCaches=function(){this.$modified=!0,this.$wrapData=[],this.$rowLengthCache=[],this.$resetRowCache(0),this.bgTokenizer&&this.bgTokenizer.start(0)},this.onChangeFold=function(e){var t=e.data;this.$resetRowCache(t.start.row)},this.onChange=function(e){this.$modified=!0,this.$resetRowCache(e.start.row);var t=this.$updateInternalDataOnChange(e);!this.$fromUndo&&this.$undoManager&&!e.ignore&&(this.$deltasDoc.push(e),t&&t.length!=0&&this.$deltasFold.push({action:\"removeFolds\",folds:t}),this.$informUndoManager.schedule()),this.bgTokenizer&&this.bgTokenizer.$updateOnChange(e),this._signal(\"change\",e)},this.setValue=function(e){this.doc.setValue(e),this.selection.moveTo(0,0),this.$resetRowCache(0),this.$deltas=[],this.$deltasDoc=[],this.$deltasFold=[],this.setUndoManager(this.$undoManager),this.getUndoManager().reset()},this.getValue=this.toString=function(){return this.doc.getValue()},this.getSelection=function(){return this.selection},this.getState=function(e){return this.bgTokenizer.getState(e)},this.getTokens=function(e){return this.bgTokenizer.getTokens(e)},this.getTokenAt=function(e,t){var n=this.bgTokenizer.getTokens(e),r,i=0;if(t==null)s=n.length-1,i=this.getLine(e).length;else for(var s=0;s<n.length;s++){i+=n[s].value.length;if(i>=t)break}return r=n[s],r?(r.index=s,r.start=i-r.value.length,r):null},this.setUndoManager=function(e){this.$undoManager=e,this.$deltas=[],this.$deltasDoc=[],this.$deltasFold=[],this.$informUndoManager&&this.$informUndoManager.cancel();if(e){var t=this;this.$syncInformUndoManager=function(){t.$informUndoManager.cancel(),t.$deltasFold.length&&(t.$deltas.push({group:\"fold\",deltas:t.$deltasFold}),t.$deltasFold=[]),t.$deltasDoc.length&&(t.$deltas.push({group:\"doc\",deltas:t.$deltasDoc}),t.$deltasDoc=[]),t.$deltas.length>0&&e.execute({action:\"aceupdate\",args:[t.$deltas,t],merge:t.mergeUndoDeltas}),t.mergeUndoDeltas=!1,t.$deltas=[]},this.$informUndoManager=i.delayedCall(this.$syncInformUndoManager)}},this.markUndoGroup=function(){this.$syncInformUndoManager&&this.$syncInformUndoManager()},this.$defaultUndoManager={undo:function(){},redo:function(){},reset:function(){}},this.getUndoManager=function(){return this.$undoManager||this.$defaultUndoManager},this.getTabString=function(){return this.getUseSoftTabs()?i.stringRepeat(\" \",this.getTabSize()):\"\t\"},this.setUseSoftTabs=function(e){this.setOption(\"useSoftTabs\",e)},this.getUseSoftTabs=function(){return this.$useSoftTabs&&!this.$mode.$indentWithTabs},this.setTabSize=function(e){this.setOption(\"tabSize\",e)},this.getTabSize=function(){return this.$tabSize},this.isTabStop=function(e){return this.$useSoftTabs&&e.column%this.$tabSize===0},this.setNavigateWithinSoftTabs=function(e){this.setOption(\"navigateWithinSoftTabs\",e)},this.getNavigateWithinSoftTabs=function(){return this.$navigateWithinSoftTabs},this.$overwrite=!1,this.setOverwrite=function(e){this.setOption(\"overwrite\",e)},this.getOverwrite=function(){return this.$overwrite},this.toggleOverwrite=function(){this.setOverwrite(!this.$overwrite)},this.addGutterDecoration=function(e,t){this.$decorations[e]||(this.$decorations[e]=\"\"),this.$decorations[e]+=\" \"+t,this._signal(\"changeBreakpoint\",{})},this.removeGutterDecoration=function(e,t){this.$decorations[e]=(this.$decorations[e]||\"\").replace(\" \"+t,\"\"),this._signal(\"changeBreakpoint\",{})},this.getBreakpoints=function(){return this.$breakpoints},this.setBreakpoints=function(e){this.$breakpoints=[];for(var t=0;t<e.length;t++)this.$breakpoints[e[t]]=\"ace_breakpoint\";this._signal(\"changeBreakpoint\",{})},this.clearBreakpoints=function(){this.$breakpoints=[],this._signal(\"changeBreakpoint\",{})},this.setBreakpoint=function(e,t){t===undefined&&(t=\"ace_breakpoint\"),t?this.$breakpoints[e]=t:delete this.$breakpoints[e],this._signal(\"changeBreakpoint\",{})},this.clearBreakpoint=function(e){delete this.$breakpoints[e],this._signal(\"changeBreakpoint\",{})},this.addMarker=function(e,t,n,r){var i=this.$markerId++,s={range:e,type:n||\"line\",renderer:typeof n==\"function\"?n:null,clazz:t,inFront:!!r,id:i};return r?(this.$frontMarkers[i]=s,this._signal(\"changeFrontMarker\")):(this.$backMarkers[i]=s,this._signal(\"changeBackMarker\")),i},this.addDynamicMarker=function(e,t){if(!e.update)return;var n=this.$markerId++;return e.id=n,e.inFront=!!t,t?(this.$frontMarkers[n]=e,this._signal(\"changeFrontMarker\")):(this.$backMarkers[n]=e,this._signal(\"changeBackMarker\")),e},this.removeMarker=function(e){var t=this.$frontMarkers[e]||this.$backMarkers[e];if(!t)return;var n=t.inFront?this.$frontMarkers:this.$backMarkers;t&&(delete n[e],this._signal(t.inFront?\"changeFrontMarker\":\"changeBackMarker\"))},this.getMarkers=function(e){return e?this.$frontMarkers:this.$backMarkers},this.highlight=function(e){if(!this.$searchHighlight){var t=new h(null,\"ace_selected-word\",\"text\");this.$searchHighlight=this.addDynamicMarker(t)}this.$searchHighlight.setRegexp(e)},this.highlightLines=function(e,t,n,r){typeof t!=\"number\"&&(n=t,t=e),n||(n=\"ace_step\");var i=new f(e,0,t,Infinity);return i.id=this.addMarker(i,n,\"fullLine\",r),i},this.setAnnotations=function(e){this.$annotations=e,this._signal(\"changeAnnotation\",{})},this.getAnnotations=function(){return this.$annotations||[]},this.clearAnnotations=function(){this.setAnnotations([])},this.$detectNewLine=function(e){var t=e.match(/^.*?(\\r?\\n)/m);t?this.$autoNewLine=t[1]:this.$autoNewLine=\"\\n\"},this.getWordRange=function(e,t){var n=this.getLine(e),r=!1;t>0&&(r=!!n.charAt(t-1).match(this.tokenRe)),r||(r=!!n.charAt(t).match(this.tokenRe));if(r)var i=this.tokenRe;else if(/^\\s+$/.test(n.slice(t-1,t+1)))var i=/\\s/;else var i=this.nonTokenRe;var s=t;if(s>0){do s--;while(s>=0&&n.charAt(s).match(i));s++}var o=t;while(o<n.length&&n.charAt(o).match(i))o++;return new f(e,s,e,o)},this.getAWordRange=function(e,t){var n=this.getWordRange(e,t),r=this.getLine(n.end.row);while(r.charAt(n.end.column).match(/[ \\t]/))n.end.column+=1;return n},this.setNewLineMode=function(e){this.doc.setNewLineMode(e)},this.getNewLineMode=function(){return this.doc.getNewLineMode()},this.setUseWorker=function(e){this.setOption(\"useWorker\",e)},this.getUseWorker=function(){return this.$useWorker},this.onReloadTokenizer=function(e){var t=e.data;this.bgTokenizer.start(t.first),this._signal(\"tokenizerUpdate\",e)},this.$modes={},this.$mode=null,this.$modeId=null,this.setMode=function(e,t){if(e&&typeof e==\"object\"){if(e.getTokenizer)return this.$onChangeMode(e);var n=e,r=n.path}else r=e||\"ace/mode/text\";this.$modes[\"ace/mode/text\"]||(this.$modes[\"ace/mode/text\"]=new a);if(this.$modes[r]&&!n){this.$onChangeMode(this.$modes[r]),t&&t();return}this.$modeId=r,s.loadModule([\"mode\",r],function(e){if(this.$modeId!==r)return t&&t();this.$modes[r]&&!n?this.$onChangeMode(this.$modes[r]):e&&e.Mode&&(e=new e.Mode(n),n||(this.$modes[r]=e,e.$id=r),this.$onChangeMode(e)),t&&t()}.bind(this)),this.$mode||this.$onChangeMode(this.$modes[\"ace/mode/text\"],!0)},this.$onChangeMode=function(e,t){t||(this.$modeId=e.$id);if(this.$mode===e)return;this.$mode=e,this.$stopWorker(),this.$useWorker&&this.$startWorker();var n=e.getTokenizer();if(n.addEventListener!==undefined){var r=this.onReloadTokenizer.bind(this);n.addEventListener(\"update\",r)}if(!this.bgTokenizer){this.bgTokenizer=new c(n);var i=this;this.bgTokenizer.addEventListener(\"update\",function(e){i._signal(\"tokenizerUpdate\",e)})}else this.bgTokenizer.setTokenizer(n);this.bgTokenizer.setDocument(this.getDocument()),this.tokenRe=e.tokenRe,this.nonTokenRe=e.nonTokenRe,t||(e.attachToSession&&e.attachToSession(this),this.$options.wrapMethod.set.call(this,this.$wrapMethod),this.$setFolding(e.foldingRules),this.bgTokenizer.start(0),this._emit(\"changeMode\"))},this.$stopWorker=function(){this.$worker&&(this.$worker.terminate(),this.$worker=null)},this.$startWorker=function(){try{this.$worker=this.$mode.createWorker(this)}catch(e){s.warn(\"Could not load worker\",e),this.$worker=null}},this.getMode=function(){return this.$mode},this.$scrollTop=0,this.setScrollTop=function(e){if(this.$scrollTop===e||isNaN(e))return;this.$scrollTop=e,this._signal(\"changeScrollTop\",e)},this.getScrollTop=function(){return this.$scrollTop},this.$scrollLeft=0,this.setScrollLeft=function(e){if(this.$scrollLeft===e||isNaN(e))return;this.$scrollLeft=e,this._signal(\"changeScrollLeft\",e)},this.getScrollLeft=function(){return this.$scrollLeft},this.getScreenWidth=function(){return this.$computeWidth(),this.lineWidgets?Math.max(this.getLineWidgetMaxWidth(),this.screenWidth):this.screenWidth},this.getLineWidgetMaxWidth=function(){if(this.lineWidgetsWidth!=null)return this.lineWidgetsWidth;var e=0;return this.lineWidgets.forEach(function(t){t&&t.screenWidth>e&&(e=t.screenWidth)}),this.lineWidgetWidth=e},this.$computeWidth=function(e){if(this.$modified||e){this.$modified=!1;if(this.$useWrapMode)return this.screenWidth=this.$wrapLimit;var t=this.doc.getAllLines(),n=this.$rowLengthCache,r=0,i=0,s=this.$foldData[i],o=s?s.start.row:Infinity,u=t.length;for(var a=0;a<u;a++){if(a>o){a=s.end.row+1;if(a>=u)break;s=this.$foldData[i++],o=s?s.start.row:Infinity}n[a]==null&&(n[a]=this.$getStringScreenWidth(t[a])[0]),n[a]>r&&(r=n[a])}this.screenWidth=r}},this.getLine=function(e){return this.doc.getLine(e)},this.getLines=function(e,t){return this.doc.getLines(e,t)},this.getLength=function(){return this.doc.getLength()},this.getTextRange=function(e){return this.doc.getTextRange(e||this.selection.getRange())},this.insert=function(e,t){return this.doc.insert(e,t)},this.remove=function(e){return this.doc.remove(e)},this.removeFullLines=function(e,t){return this.doc.removeFullLines(e,t)},this.undoChanges=function(e,t){if(!e.length)return;this.$fromUndo=!0;var n=null;for(var r=e.length-1;r!=-1;r--){var i=e[r];i.group==\"doc\"?(this.doc.revertDeltas(i.deltas),n=this.$getUndoSelection(i.deltas,!0,n)):i.deltas.forEach(function(e){this.addFolds(e.folds)},this)}return this.$fromUndo=!1,n&&this.$undoSelect&&!t&&this.selection.setSelectionRange(n),n},this.redoChanges=function(e,t){if(!e.length)return;this.$fromUndo=!0;var n=null;for(var r=0;r<e.length;r++){var i=e[r];i.group==\"doc\"&&(this.doc.applyDeltas(i.deltas),n=this.$getUndoSelection(i.deltas,!1,n))}return this.$fromUndo=!1,n&&this.$undoSelect&&!t&&this.selection.setSelectionRange(n),n},this.setUndoSelect=function(e){this.$undoSelect=e},this.$getUndoSelection=function(e,t,n){function r(e){return t?e.action!==\"insert\":e.action===\"insert\"}var i=e[0],s,o,u=!1;r(i)?(s=f.fromPoints(i.start,i.end),u=!0):(s=f.fromPoints(i.start,i.start),u=!1);for(var a=1;a<e.length;a++)i=e[a],r(i)?(o=i.start,s.compare(o.row,o.column)==-1&&s.setStart(o),o=i.end,s.compare(o.row,o.column)==1&&s.setEnd(o),u=!0):(o=i.start,s.compare(o.row,o.column)==-1&&(s=f.fromPoints(i.start,i.start)),u=!1);if(n!=null){f.comparePoints(n.start,s.start)===0&&(n.start.column+=s.end.column-s.start.column,n.end.column+=s.end.column-s.start.column);var l=n.compareRange(s);l==1?s.setStart(n.start):l==-1&&s.setEnd(n.end)}return s},this.replace=function(e,t){return this.doc.replace(e,t)},this.moveText=function(e,t,n){var r=this.getTextRange(e),i=this.getFoldsInRange(e),s=f.fromPoints(t,t);if(!n){this.remove(e);var o=e.start.row-e.end.row,u=o?-e.end.column:e.start.column-e.end.column;u&&(s.start.row==e.end.row&&s.start.column>e.end.column&&(s.start.column+=u),s.end.row==e.end.row&&s.end.column>e.end.column&&(s.end.column+=u)),o&&s.start.row>=e.end.row&&(s.start.row+=o,s.end.row+=o)}s.end=this.insert(s.start,r);if(i.length){var a=e.start,l=s.start,o=l.row-a.row,u=l.column-a.column;this.addFolds(i.map(function(e){return e=e.clone(),e.start.row==a.row&&(e.start.column+=u),e.end.row==a.row&&(e.end.column+=u),e.start.row+=o,e.end.row+=o,e}))}return s},this.indentRows=function(e,t,n){n=n.replace(/\\t/g,this.getTabString());for(var r=e;r<=t;r++)this.doc.insertInLine({row:r,column:0},n)},this.outdentRows=function(e){var t=e.collapseRows(),n=new f(0,0,0,0),r=this.getTabSize();for(var i=t.start.row;i<=t.end.row;++i){var s=this.getLine(i);n.start.row=i,n.end.row=i;for(var o=0;o<r;++o)if(s.charAt(o)!=\" \")break;o<r&&s.charAt(o)==\"\t\"?(n.start.column=o,n.end.column=o+1):(n.start.column=0,n.end.column=o),this.remove(n)}},this.$moveLines=function(e,t,n){e=this.getRowFoldStart(e),t=this.getRowFoldEnd(t);if(n<0){var r=this.getRowFoldStart(e+n);if(r<0)return 0;var i=r-e}else if(n>0){var r=this.getRowFoldEnd(t+n);if(r>this.doc.getLength()-1)return 0;var i=r-t}else{e=this.$clipRowToDocument(e),t=this.$clipRowToDocument(t);var i=t-e+1}var s=new f(e,0,t,Number.MAX_VALUE),o=this.getFoldsInRange(s).map(function(e){return e=e.clone(),e.start.row+=i,e.end.row+=i,e}),u=n==0?this.doc.getLines(e,t):this.doc.removeFullLines(e,t);return this.doc.insertFullLines(e+i,u),o.length&&this.addFolds(o),i},this.moveLinesUp=function(e,t){return this.$moveLines(e,t,-1)},this.moveLinesDown=function(e,t){return this.$moveLines(e,t,1)},this.duplicateLines=function(e,t){return this.$moveLines(e,t,0)},this.$clipRowToDocument=function(e){return Math.max(0,Math.min(e,this.doc.getLength()-1))},this.$clipColumnToRow=function(e,t){return t<0?0:Math.min(this.doc.getLine(e).length,t)},this.$clipPositionToDocument=function(e,t){t=Math.max(0,t);if(e<0)e=0,t=0;else{var n=this.doc.getLength();e>=n?(e=n-1,t=this.doc.getLine(n-1).length):t=Math.min(this.doc.getLine(e).length,t)}return{row:e,column:t}},this.$clipRangeToDocument=function(e){e.start.row<0?(e.start.row=0,e.start.column=0):e.start.column=this.$clipColumnToRow(e.start.row,e.start.column);var t=this.doc.getLength()-1;return e.end.row>t?(e.end.row=t,e.end.column=this.doc.getLine(t).length):e.end.column=this.$clipColumnToRow(e.end.row,e.end.column),e},this.$wrapLimit=80,this.$useWrapMode=!1,this.$wrapLimitRange={min:null,max:null},this.setUseWrapMode=function(e){if(e!=this.$useWrapMode){this.$useWrapMode=e,this.$modified=!0,this.$resetRowCache(0);if(e){var t=this.getLength();this.$wrapData=Array(t),this.$updateWrapData(0,t-1)}this._signal(\"changeWrapMode\")}},this.getUseWrapMode=function(){return this.$useWrapMode},this.setWrapLimitRange=function(e,t){if(this.$wrapLimitRange.min!==e||this.$wrapLimitRange.max!==t)this.$wrapLimitRange={min:e,max:t},this.$modified=!0,this.$useWrapMode&&this._signal(\"changeWrapMode\")},this.adjustWrapLimit=function(e,t){var n=this.$wrapLimitRange;n.max<0&&(n={min:t,max:t});var r=this.$constrainWrapLimit(e,n.min,n.max);return r!=this.$wrapLimit&&r>1?(this.$wrapLimit=r,this.$modified=!0,this.$useWrapMode&&(this.$updateWrapData(0,this.getLength()-1),this.$resetRowCache(0),this._signal(\"changeWrapLimit\")),!0):!1},this.$constrainWrapLimit=function(e,t,n){return t&&(e=Math.max(t,e)),n&&(e=Math.min(n,e)),e},this.getWrapLimit=function(){return this.$wrapLimit},this.setWrapLimit=function(e){this.setWrapLimitRange(e,e)},this.getWrapLimitRange=function(){return{min:this.$wrapLimitRange.min,max:this.$wrapLimitRange.max}},this.$updateInternalDataOnChange=function(e){var t=this.$useWrapMode,n=e.action,r=e.start,i=e.end,s=r.row,o=i.row,u=o-s,a=null;this.$updating=!0;if(u!=0)if(n===\"remove\"){this[t?\"$wrapData\":\"$rowLengthCache\"].splice(s,u);var f=this.$foldData;a=this.getFoldsInRange(e),this.removeFolds(a);var l=this.getFoldLine(i.row),c=0;if(l){l.addRemoveChars(i.row,i.column,r.column-i.column),l.shiftRow(-u);var h=this.getFoldLine(s);h&&h!==l&&(h.merge(l),l=h),c=f.indexOf(l)+1}for(c;c<f.length;c++){var l=f[c];l.start.row>=i.row&&l.shiftRow(-u)}o=s}else{var p=Array(u);p.unshift(s,0);var d=t?this.$wrapData:this.$rowLengthCache;d.splice.apply(d,p);var f=this.$foldData,l=this.getFoldLine(s),c=0;if(l){var v=l.range.compareInside(r.row,r.column);v==0?(l=l.split(r.row,r.column),l&&(l.shiftRow(u),l.addRemoveChars(o,0,i.column-r.column))):v==-1&&(l.addRemoveChars(s,0,i.column-r.column),l.shiftRow(u)),c=f.indexOf(l)+1}for(c;c<f.length;c++){var l=f[c];l.start.row>=s&&l.shiftRow(u)}}else{u=Math.abs(e.start.column-e.end.column),n===\"remove\"&&(a=this.getFoldsInRange(e),this.removeFolds(a),u=-u);var l=this.getFoldLine(s);l&&l.addRemoveChars(s,r.column,u)}return t&&this.$wrapData.length!=this.doc.getLength()&&console.error(\"doc.getLength() and $wrapData.length have to be the same!\"),this.$updating=!1,t?this.$updateWrapData(s,o):this.$updateRowLengthCache(s,o),a},this.$updateRowLengthCache=function(e,t,n){this.$rowLengthCache[e]=null,this.$rowLengthCache[t]=null},this.$updateWrapData=function(e,t){var r=this.doc.getAllLines(),i=this.getTabSize(),s=this.$wrapData,o=this.$wrapLimit,a,f,l=e;t=Math.min(t,r.length-1);while(l<=t)f=this.getFoldLine(l,f),f?(a=[],f.walk(function(e,t,i,s){var o;if(e!=null){o=this.$getDisplayTokens(e,a.length),o[0]=n;for(var f=1;f<o.length;f++)o[f]=u}else o=this.$getDisplayTokens(r[t].substring(s,i),a.length);a=a.concat(o)}.bind(this),f.end.row,r[f.end.row].length+1),s[f.start.row]=this.$computeWrapSplits(a,o,i),l=f.end.row+1):(a=this.$getDisplayTokens(r[l]),s[l]=this.$computeWrapSplits(a,o,i),l++)};var e=1,t=2,n=3,u=4,l=9,p=10,d=11,v=12;this.$computeWrapSplits=function(e,r,i){function g(){var t=0;if(m===0)return t;if(h)for(var n=0;n<e.length;n++){var r=e[n];if(r==p)t+=1;else{if(r!=d){if(r==v)continue;break}t+=i}}return c&&h!==!1&&(t+=i),Math.min(t,m)}function y(t){var n=e.slice(a,t),r=n.length;n.join(\"\").replace(/12/g,function(){r-=1}).replace(/2/g,function(){r-=1}),s.length||(b=g(),s.indent=b),f+=r,s.push(f),a=t}if(e.length==0)return[];var s=[],o=e.length,a=0,f=0,c=this.$wrapAsCode,h=this.$indentedSoftWrap,m=r<=Math.max(2*i,8)||h===!1?0:Math.floor(r/2),b=0;while(o-a>r-b){var w=a+r-b;if(e[w-1]>=p&&e[w]>=p){y(w);continue}if(e[w]==n||e[w]==u){for(w;w!=a-1;w--)if(e[w]==n)break;if(w>a){y(w);continue}w=a+r;for(w;w<e.length;w++)if(e[w]!=u)break;if(w==e.length)break;y(w);continue}var E=Math.max(w-(r-(r>>2)),a-1);while(w>E&&e[w]<n)w--;if(c){while(w>E&&e[w]<n)w--;while(w>E&&e[w]==l)w--}else while(w>E&&e[w]<p)w--;if(w>E){y(++w);continue}w=a+r,e[w]==t&&w--,y(w-b)}return s},this.$getDisplayTokens=function(n,r){var i=[],s;r=r||0;for(var o=0;o<n.length;o++){var u=n.charCodeAt(o);if(u==9){s=this.getScreenTabSize(i.length+r),i.push(d);for(var a=1;a<s;a++)i.push(v)}else u==32?i.push(p):u>39&&u<48||u>57&&u<64?i.push(l):u>=4352&&m(u)?i.push(e,t):i.push(e)}return i},this.$getStringScreenWidth=function(e,t,n){if(t==0)return[0,0];t==null&&(t=Infinity),n=n||0;var r,i;for(i=0;i<e.length;i++){r=e.charCodeAt(i),r==9?n+=this.getScreenTabSize(n):r>=4352&&m(r)?n+=2:n+=1;if(n>t)break}return[n,i]},this.lineWidgets=null,this.getRowLength=function(e){if(this.lineWidgets)var t=this.lineWidgets[e]&&this.lineWidgets[e].rowCount||0;else t=0;return!this.$useWrapMode||!this.$wrapData[e]?1+t:this.$wrapData[e].length+1+t},this.getRowLineCount=function(e){return!this.$useWrapMode||!this.$wrapData[e]?1:this.$wrapData[e].length+1},this.getRowWrapIndent=function(e){if(this.$useWrapMode){var t=this.screenToDocumentPosition(e,Number.MAX_VALUE),n=this.$wrapData[t.row];return n.length&&n[0]<t.column?n.indent:0}return 0},this.getScreenLastRowColumn=function(e){var t=this.screenToDocumentPosition(e,Number.MAX_VALUE);return this.documentToScreenColumn(t.row,t.column)},this.getDocumentLastRowColumn=function(e,t){var n=this.documentToScreenRow(e,t);return this.getScreenLastRowColumn(n)},this.getDocumentLastRowColumnPosition=function(e,t){var n=this.documentToScreenRow(e,t);return this.screenToDocumentPosition(n,Number.MAX_VALUE/10)},this.getRowSplitData=function(e){return this.$useWrapMode?this.$wrapData[e]:undefined},this.getScreenTabSize=function(e){return this.$tabSize-e%this.$tabSize},this.screenToDocumentRow=function(e,t){return this.screenToDocumentPosition(e,t).row},this.screenToDocumentColumn=function(e,t){return this.screenToDocumentPosition(e,t).column},this.screenToDocumentPosition=function(e,t){if(e<0)return{row:0,column:0};var n,r=0,i=0,s,o=0,u=0,a=this.$screenRowCache,f=this.$getRowCacheIndex(a,e),l=a.length;if(l&&f>=0)var o=a[f],r=this.$docRowCache[f],c=e>a[l-1];else var c=!l;var h=this.getLength()-1,p=this.getNextFoldLine(r),d=p?p.start.row:Infinity;while(o<=e){u=this.getRowLength(r);if(o+u>e||r>=h)break;o+=u,r++,r>d&&(r=p.end.row+1,p=this.getNextFoldLine(r,p),d=p?p.start.row:Infinity),c&&(this.$docRowCache.push(r),this.$screenRowCache.push(o))}if(p&&p.start.row<=r)n=this.getFoldDisplayLine(p),r=p.start.row;else{if(o+u<=e||r>h)return{row:h,column:this.getLine(h).length};n=this.getLine(r),p=null}var v=0;if(this.$useWrapMode){var m=this.$wrapData[r];if(m){var g=Math.floor(e-o);s=m[g],g>0&&m.length&&(v=m.indent,i=m[g-1]||m[m.length-1],n=n.substring(i))}}return i+=this.$getStringScreenWidth(n,t-v)[1],this.$useWrapMode&&i>=s&&(i=s-1),p?p.idxToPosition(i):{row:r,column:i}},this.documentToScreenPosition=function(e,t){if(typeof t==\"undefined\")var n=this.$clipPositionToDocument(e.row,e.column);else n=this.$clipPositionToDocument(e,t);e=n.row,t=n.column;var r=0,i=null,s=null;s=this.getFoldAt(e,t,1),s&&(e=s.start.row,t=s.start.column);var o,u=0,a=this.$docRowCache,f=this.$getRowCacheIndex(a,e),l=a.length;if(l&&f>=0)var u=a[f],r=this.$screenRowCache[f],c=e>a[l-1];else var c=!l;var h=this.getNextFoldLine(u),p=h?h.start.row:Infinity;while(u<e){if(u>=p){o=h.end.row+1;if(o>e)break;h=this.getNextFoldLine(o,h),p=h?h.start.row:Infinity}else o=u+1;r+=this.getRowLength(u),u=o,c&&(this.$docRowCache.push(u),this.$screenRowCache.push(r))}var d=\"\";h&&u>=p?(d=this.getFoldDisplayLine(h,e,t),i=h.start.row):(d=this.getLine(e).substring(0,t),i=e);var v=0;if(this.$useWrapMode){var m=this.$wrapData[i];if(m){var g=0;while(d.length>=m[g])r++,g++;d=d.substring(m[g-1]||0,d.length),v=g>0?m.indent:0}}return{row:r,column:v+this.$getStringScreenWidth(d)[0]}},this.documentToScreenColumn=function(e,t){return this.documentToScreenPosition(e,t).column},this.documentToScreenRow=function(e,t){return this.documentToScreenPosition(e,t).row},this.getScreenLength=function(){var e=0,t=null;if(!this.$useWrapMode){e=this.getLength();var n=this.$foldData;for(var r=0;r<n.length;r++)t=n[r],e-=t.end.row-t.start.row}else{var i=this.$wrapData.length,s=0,r=0,t=this.$foldData[r++],o=t?t.start.row:Infinity;while(s<i){var u=this.$wrapData[s];e+=u?u.length+1:1,s++,s>o&&(s=t.end.row+1,t=this.$foldData[r++],o=t?t.start.row:Infinity)}}return this.lineWidgets&&(e+=this.$getWidgetScreenLength()),e},this.$setFontMetrics=function(e){if(!this.$enableVarChar)return;this.$getStringScreenWidth=function(t,n,r){if(n===0)return[0,0];n||(n=Infinity),r=r||0;var i,s;for(s=0;s<t.length;s++){i=t.charAt(s),i===\"\t\"?r+=this.getScreenTabSize(r):r+=e.getCharacterWidth(i);if(r>n)break}return[r,s]}},this.destroy=function(){this.bgTokenizer&&(this.bgTokenizer.setDocument(null),this.bgTokenizer=null),this.$stopWorker()}}.call(p.prototype),e(\"./edit_session/folding\").Folding.call(p.prototype),e(\"./edit_session/bracket_match\").BracketMatch.call(p.prototype),s.defineOptions(p.prototype,\"session\",{wrap:{set:function(e){!e||e==\"off\"?e=!1:e==\"free\"?e=!0:e==\"printMargin\"?e=-1:typeof e==\"string\"&&(e=parseInt(e,10)||!1);if(this.$wrap==e)return;this.$wrap=e;if(!e)this.setUseWrapMode(!1);else{var t=typeof e==\"number\"?e:null;this.setWrapLimitRange(t,t),this.setUseWrapMode(!0)}},get:function(){return this.getUseWrapMode()?this.$wrap==-1?\"printMargin\":this.getWrapLimitRange().min?this.$wrap:\"free\":\"off\"},handlesSet:!0},wrapMethod:{set:function(e){e=e==\"auto\"?this.$mode.type!=\"text\":e!=\"text\",e!=this.$wrapAsCode&&(this.$wrapAsCode=e,this.$useWrapMode&&(this.$modified=!0,this.$resetRowCache(0),this.$updateWrapData(0,this.getLength()-1)))},initialValue:\"auto\"},indentedSoftWrap:{initialValue:!0},firstLineNumber:{set:function(){this._signal(\"changeBreakpoint\")},initialValue:1},useWorker:{set:function(e){this.$useWorker=e,this.$stopWorker(),e&&this.$startWorker()},initialValue:!0},useSoftTabs:{initialValue:!0},tabSize:{set:function(e){if(isNaN(e)||this.$tabSize===e)return;this.$modified=!0,this.$rowLengthCache=[],this.$tabSize=e,this._signal(\"changeTabSize\")},initialValue:4,handlesSet:!0},navigateWithinSoftTabs:{initialValue:!1},overwrite:{set:function(e){this._signal(\"changeOverwrite\")},initialValue:!1},newLineMode:{set:function(e){this.doc.setNewLineMode(e)},get:function(){return this.doc.getNewLineMode()},handlesSet:!0},mode:{set:function(e){this.setMode(e)},get:function(){return this.$modeId}}}),t.EditSession=p}),define(\"ace/search\",[\"require\",\"exports\",\"module\",\"ace/lib/lang\",\"ace/lib/oop\",\"ace/range\"],function(e,t,n){\"use strict\";function u(e,t){function n(e){return/\\w/.test(e)||t.regExp?\"\\\\b\":\"\"}return n(e[0])+e+n(e[e.length-1])}var r=e(\"./lib/lang\"),i=e(\"./lib/oop\"),s=e(\"./range\").Range,o=function(){this.$options={}};(function(){this.set=function(e){return i.mixin(this.$options,e),this},this.getOptions=function(){return r.copyObject(this.$options)},this.setOptions=function(e){this.$options=e},this.find=function(e){var t=this.$options,n=this.$matchIterator(e,t);if(!n)return!1;var r=null;return n.forEach(function(e,n,i,o){return r=new s(e,n,i,o),n==o&&t.start&&t.start.start&&t.skipCurrent!=0&&r.isEqual(t.start)?(r=null,!1):!0}),r},this.findAll=function(e){var t=this.$options;if(!t.needle)return[];this.$assembleRegExp(t);var n=t.range,i=n?e.getLines(n.start.row,n.end.row):e.doc.getAllLines(),o=[],u=t.re;if(t.$isMultiLine){var a=u.length,f=i.length-a,l;e:for(var c=u.offset||0;c<=f;c++){for(var h=0;h<a;h++)if(i[c+h].search(u[h])==-1)continue e;var p=i[c],d=i[c+a-1],v=p.length-p.match(u[0])[0].length,m=d.match(u[a-1])[0].length;if(l&&l.end.row===c&&l.end.column>v)continue;o.push(l=new s(c,v,c+a-1,m)),a>2&&(c=c+a-2)}}else for(var g=0;g<i.length;g++){var y=r.getMatchOffsets(i[g],u);for(var h=0;h<y.length;h++){var b=y[h];o.push(new s(g,b.offset,g,b.offset+b.length))}}if(n){var w=n.start.column,E=n.start.column,g=0,h=o.length-1;while(g<h&&o[g].start.column<w&&o[g].start.row==n.start.row)g++;while(g<h&&o[h].end.column>E&&o[h].end.row==n.end.row)h--;o=o.slice(g,h+1);for(g=0,h=o.length;g<h;g++)o[g].start.row+=n.start.row,o[g].end.row+=n.start.row}return o},this.replace=function(e,t){var n=this.$options,r=this.$assembleRegExp(n);if(n.$isMultiLine)return t;if(!r)return;var i=r.exec(e);if(!i||i[0].length!=e.length)return null;t=e.replace(r,t);if(n.preserveCase){t=t.split(\"\");for(var s=Math.min(e.length,e.length);s--;){var o=e[s];o&&o.toLowerCase()!=o?t[s]=t[s].toUpperCase():t[s]=t[s].toLowerCase()}t=t.join(\"\")}return t},this.$assembleRegExp=function(e,t){if(e.needle instanceof RegExp)return e.re=e.needle;var n=e.needle;if(!e.needle)return e.re=!1;e.regExp||(n=r.escapeRegExp(n)),e.wholeWord&&(n=u(n,e));var i=e.caseSensitive?\"gm\":\"gmi\";e.$isMultiLine=!t&&/[\\n\\r]/.test(n);if(e.$isMultiLine)return e.re=this.$assembleMultilineRegExp(n,i);try{var s=new RegExp(n,i)}catch(o){s=!1}return e.re=s},this.$assembleMultilineRegExp=function(e,t){var n=e.replace(/\\r\\n|\\r|\\n/g,\"$\\n^\").split(\"\\n\"),r=[];for(var i=0;i<n.length;i++)try{r.push(new RegExp(n[i],t))}catch(s){return!1}return r},this.$matchIterator=function(e,t){var n=this.$assembleRegExp(t);if(!n)return!1;var r=t.backwards==1,i=t.skipCurrent!=0,s=t.range,o=t.start;o||(o=s?s[r?\"end\":\"start\"]:e.selection.getRange()),o.start&&(o=o[i!=r?\"end\":\"start\"]);var u=s?s.start.row:0,a=s?s.end.row:e.getLength()-1;if(r)var f=function(e){var n=o.row;if(c(n,o.column,e))return;for(n--;n>=u;n--)if(c(n,Number.MAX_VALUE,e))return;if(t.wrap==0)return;for(n=a,u=o.row;n>=u;n--)if(c(n,Number.MAX_VALUE,e))return};else var f=function(e){var n=o.row;if(c(n,o.column,e))return;for(n+=1;n<=a;n++)if(c(n,0,e))return;if(t.wrap==0)return;for(n=u,a=o.row;n<=a;n++)if(c(n,0,e))return};if(t.$isMultiLine)var l=n.length,c=function(t,i,s){var o=r?t-l+1:t;if(o<0)return;var u=e.getLine(o),a=u.search(n[0]);if(!r&&a<i||a===-1)return;for(var f=1;f<l;f++){u=e.getLine(o+f);if(u.search(n[f])==-1)return}var c=u.match(n[l-1])[0].length;if(r&&c>i)return;if(s(o,a,o+l-1,c))return!0};else if(r)var c=function(t,r,i){var s=e.getLine(t),o=[],u,a=0;n.lastIndex=0;while(u=n.exec(s)){var f=u[0].length;a=u.index;if(!f){if(a>=s.length)break;n.lastIndex=a+=1}if(u.index+f>r)break;o.push(u.index,f)}for(var l=o.length-1;l>=0;l-=2){var c=o[l-1],f=o[l];if(i(t,c,t,c+f))return!0}};else var c=function(t,r,i){var s=e.getLine(t),o,u=r;n.lastIndex=r;while(o=n.exec(s)){var a=o[0].length;u=o.index;if(i(t,u,t,u+a))return!0;if(!a){n.lastIndex=u+=1;if(u>=s.length)return!1}}};return{forEach:f}}}).call(o.prototype),t.Search=o}),define(\"ace/keyboard/hash_handler\",[\"require\",\"exports\",\"module\",\"ace/lib/keys\",\"ace/lib/useragent\"],function(e,t,n){\"use strict\";function o(e,t){this.platform=t||(i.isMac?\"mac\":\"win\"),this.commands={},this.commandKeyBinding={},this.addCommands(e),this.$singleCommand=!0}function u(e,t){o.call(this,e,t),this.$singleCommand=!1}var r=e(\"../lib/keys\"),i=e(\"../lib/useragent\"),s=r.KEY_MODS;u.prototype=o.prototype,function(){function e(e){return typeof e==\"object\"&&e.bindKey&&e.bindKey.position||(e.isDefault?-100:0)}this.addCommand=function(e){this.commands[e.name]&&this.removeCommand(e),this.commands[e.name]=e,e.bindKey&&this._buildKeyHash(e)},this.removeCommand=function(e,t){var n=e&&(typeof e==\"string\"?e:e.name);e=this.commands[n],t||delete this.commands[n];var r=this.commandKeyBinding;for(var i in r){var s=r[i];if(s==e)delete r[i];else if(Array.isArray(s)){var o=s.indexOf(e);o!=-1&&(s.splice(o,1),s.length==1&&(r[i]=s[0]))}}},this.bindKey=function(e,t,n){typeof e==\"object\"&&e&&(n==undefined&&(n=e.position),e=e[this.platform]);if(!e)return;if(typeof t==\"function\")return this.addCommand({exec:t,bindKey:e,name:t.name||e});e.split(\"|\").forEach(function(e){var r=\"\";if(e.indexOf(\" \")!=-1){var i=e.split(/\\s+/);e=i.pop(),i.forEach(function(e){var t=this.parseKeys(e),n=s[t.hashId]+t.key;r+=(r?\" \":\"\")+n,this._addCommandToBinding(r,\"chainKeys\")},this),r+=\" \"}var o=this.parseKeys(e),u=s[o.hashId]+o.key;this._addCommandToBinding(r+u,t,n)},this)},this._addCommandToBinding=function(t,n,r){var i=this.commandKeyBinding,s;if(!n)delete i[t];else if(!i[t]||this.$singleCommand)i[t]=n;else{Array.isArray(i[t])?(s=i[t].indexOf(n))!=-1&&i[t].splice(s,1):i[t]=[i[t]],typeof r!=\"number\"&&(r=e(n));var o=i[t];for(s=0;s<o.length;s++){var u=o[s],a=e(u);if(a>r)break}o.splice(s,0,n)}},this.addCommands=function(e){e&&Object.keys(e).forEach(function(t){var n=e[t];if(!n)return;if(typeof n==\"string\")return this.bindKey(n,t);typeof n==\"function\"&&(n={exec:n});if(typeof n!=\"object\")return;n.name||(n.name=t),this.addCommand(n)},this)},this.removeCommands=function(e){Object.keys(e).forEach(function(t){this.removeCommand(e[t])},this)},this.bindKeys=function(e){Object.keys(e).forEach(function(t){this.bindKey(t,e[t])},this)},this._buildKeyHash=function(e){this.bindKey(e.bindKey,e)},this.parseKeys=function(e){var t=e.toLowerCase().split(/[\\-\\+]([\\-\\+])?/).filter(function(e){return e}),n=t.pop(),i=r[n];if(r.FUNCTION_KEYS[i])n=r.FUNCTION_KEYS[i].toLowerCase();else{if(!t.length)return{key:n,hashId:-1};if(t.length==1&&t[0]==\"shift\")return{key:n.toUpperCase(),hashId:-1}}var s=0;for(var o=t.length;o--;){var u=r.KEY_MODS[t[o]];if(u==null)return typeof console!=\"undefined\"&&console.error(\"invalid modifier \"+t[o]+\" in \"+e),!1;s|=u}return{key:n,hashId:s}},this.findKeyCommand=function(t,n){var r=s[t]+n;return this.commandKeyBinding[r]},this.handleKeyboard=function(e,t,n,r){if(r<0)return;var i=s[t]+n,o=this.commandKeyBinding[i];e.$keyChain&&(e.$keyChain+=\" \"+i,o=this.commandKeyBinding[e.$keyChain]||o);if(o)if(o==\"chainKeys\"||o[o.length-1]==\"chainKeys\")return e.$keyChain=e.$keyChain||i,{command:\"null\"};if(e.$keyChain)if(!!t&&t!=4||n.length!=1){if(t==-1||r>0)e.$keyChain=\"\"}else e.$keyChain=e.$keyChain.slice(0,-i.length-1);return{command:o}},this.getStatusText=function(e,t){return t.$keyChain||\"\"}}.call(o.prototype),t.HashHandler=o,t.MultiHashHandler=u}),define(\"ace/commands/command_manager\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/keyboard/hash_handler\",\"ace/lib/event_emitter\"],function(e,t,n){\"use strict\";var r=e(\"../lib/oop\"),i=e(\"../keyboard/hash_handler\").MultiHashHandler,s=e(\"../lib/event_emitter\").EventEmitter,o=function(e,t){i.call(this,t,e),this.byName=this.commands,this.setDefaultHandler(\"exec\",function(e){return e.command.exec(e.editor,e.args||{})})};r.inherits(o,i),function(){r.implement(this,s),this.exec=function(e,t,n){if(Array.isArray(e)){for(var r=e.length;r--;)if(this.exec(e[r],t,n))return!0;return!1}typeof e==\"string\"&&(e=this.commands[e]);if(!e)return!1;if(t&&t.$readOnly&&!e.readOnly)return!1;if(e.isAvailable&&!e.isAvailable(t))return!1;var i={editor:t,command:e,args:n};return i.returnValue=this._emit(\"exec\",i),this._signal(\"afterExec\",i),i.returnValue===!1?!1:!0},this.toggleRecording=function(e){if(this.$inReplay)return;return e&&e._emit(\"changeStatus\"),this.recording?(this.macro.pop(),this.removeEventListener(\"exec\",this.$addCommandToMacro),this.macro.length||(this.macro=this.oldMacro),this.recording=!1):(this.$addCommandToMacro||(this.$addCommandToMacro=function(e){this.macro.push([e.command,e.args])}.bind(this)),this.oldMacro=this.macro,this.macro=[],this.on(\"exec\",this.$addCommandToMacro),this.recording=!0)},this.replay=function(e){if(this.$inReplay||!this.macro)return;if(this.recording)return this.toggleRecording(e);try{this.$inReplay=!0,this.macro.forEach(function(t){typeof t==\"string\"?this.exec(t,e):this.exec(t[0],e,t[1])},this)}finally{this.$inReplay=!1}},this.trimMacro=function(e){return e.map(function(e){return typeof e[0]!=\"string\"&&(e[0]=e[0].name),e[1]||(e=e[0]),e})}}.call(o.prototype),t.CommandManager=o}),define(\"ace/commands/default_commands\",[\"require\",\"exports\",\"module\",\"ace/lib/lang\",\"ace/config\",\"ace/range\"],function(e,t,n){\"use strict\";function o(e,t){return{win:e,mac:t}}var r=e(\"../lib/lang\"),i=e(\"../config\"),s=e(\"../range\").Range;t.commands=[{name:\"showSettingsMenu\",bindKey:o(\"Ctrl-,\",\"Command-,\"),exec:function(e){i.loadModule(\"ace/ext/settings_menu\",function(t){t.init(e),e.showSettingsMenu()})},readOnly:!0},{name:\"goToNextError\",bindKey:o(\"Alt-E\",\"F4\"),exec:function(e){i.loadModule(\"ace/ext/error_marker\",function(t){t.showErrorMarker(e,1)})},scrollIntoView:\"animate\",readOnly:!0},{name:\"goToPreviousError\",bindKey:o(\"Alt-Shift-E\",\"Shift-F4\"),exec:function(e){i.loadModule(\"ace/ext/error_marker\",function(t){t.showErrorMarker(e,-1)})},scrollIntoView:\"animate\",readOnly:!0},{name:\"selectall\",bindKey:o(\"Ctrl-A\",\"Command-A\"),exec:function(e){e.selectAll()},readOnly:!0},{name:\"centerselection\",bindKey:o(null,\"Ctrl-L\"),exec:function(e){e.centerSelection()},readOnly:!0},{name:\"gotoline\",bindKey:o(\"Ctrl-L\",\"Command-L\"),exec:function(e){var t=parseInt(prompt(\"Enter line number:\"),10);isNaN(t)||e.gotoLine(t)},readOnly:!0},{name:\"fold\",bindKey:o(\"Alt-L|Ctrl-F1\",\"Command-Alt-L|Command-F1\"),exec:function(e){e.session.toggleFold(!1)},multiSelectAction:\"forEach\",scrollIntoView:\"center\",readOnly:!0},{name:\"unfold\",bindKey:o(\"Alt-Shift-L|Ctrl-Shift-F1\",\"Command-Alt-Shift-L|Command-Shift-F1\"),exec:function(e){e.session.toggleFold(!0)},multiSelectAction:\"forEach\",scrollIntoView:\"center\",readOnly:!0},{name:\"toggleFoldWidget\",bindKey:o(\"F2\",\"F2\"),exec:function(e){e.session.toggleFoldWidget()},multiSelectAction:\"forEach\",scrollIntoView:\"center\",readOnly:!0},{name:\"toggleParentFoldWidget\",bindKey:o(\"Alt-F2\",\"Alt-F2\"),exec:function(e){e.session.toggleFoldWidget(!0)},multiSelectAction:\"forEach\",scrollIntoView:\"center\",readOnly:!0},{name:\"foldall\",bindKey:o(null,\"Ctrl-Command-Option-0\"),exec:function(e){e.session.foldAll()},scrollIntoView:\"center\",readOnly:!0},{name:\"foldOther\",bindKey:o(\"Alt-0\",\"Command-Option-0\"),exec:function(e){e.session.foldAll(),e.session.unfold(e.selection.getAllRanges())},scrollIntoView:\"center\",readOnly:!0},{name:\"unfoldall\",bindKey:o(\"Alt-Shift-0\",\"Command-Option-Shift-0\"),exec:function(e){e.session.unfold()},scrollIntoView:\"center\",readOnly:!0},{name:\"findnext\",bindKey:o(\"Ctrl-K\",\"Command-G\"),exec:function(e){e.findNext()},multiSelectAction:\"forEach\",scrollIntoView:\"center\",readOnly:!0},{name:\"findprevious\",bindKey:o(\"Ctrl-Shift-K\",\"Command-Shift-G\"),exec:function(e){e.findPrevious()},multiSelectAction:\"forEach\",scrollIntoView:\"center\",readOnly:!0},{name:\"selectOrFindNext\",bindKey:o(\"Alt-K\",\"Ctrl-G\"),exec:function(e){e.selection.isEmpty()?e.selection.selectWord():e.findNext()},readOnly:!0},{name:\"selectOrFindPrevious\",bindKey:o(\"Alt-Shift-K\",\"Ctrl-Shift-G\"),exec:function(e){e.selection.isEmpty()?e.selection.selectWord():e.findPrevious()},readOnly:!0},{name:\"find\",bindKey:o(\"Ctrl-F\",\"Command-F\"),exec:function(e){i.loadModule(\"ace/ext/searchbox\",function(t){t.Search(e)})},readOnly:!0},{name:\"overwrite\",bindKey:\"Insert\",exec:function(e){e.toggleOverwrite()},readOnly:!0},{name:\"selecttostart\",bindKey:o(\"Ctrl-Shift-Home\",\"Command-Shift-Home|Command-Shift-Up\"),exec:function(e){e.getSelection().selectFileStart()},multiSelectAction:\"forEach\",readOnly:!0,scrollIntoView:\"animate\",aceCommandGroup:\"fileJump\"},{name:\"gotostart\",bindKey:o(\"Ctrl-Home\",\"Command-Home|Command-Up\"),exec:function(e){e.navigateFileStart()},multiSelectAction:\"forEach\",readOnly:!0,scrollIntoView:\"animate\",aceCommandGroup:\"fileJump\"},{name:\"selectup\",bindKey:o(\"Shift-Up\",\"Shift-Up|Ctrl-Shift-P\"),exec:function(e){e.getSelection().selectUp()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"golineup\",bindKey:o(\"Up\",\"Up|Ctrl-P\"),exec:function(e,t){e.navigateUp(t.times)},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"selecttoend\",bindKey:o(\"Ctrl-Shift-End\",\"Command-Shift-End|Command-Shift-Down\"),exec:function(e){e.getSelection().selectFileEnd()},multiSelectAction:\"forEach\",readOnly:!0,scrollIntoView:\"animate\",aceCommandGroup:\"fileJump\"},{name:\"gotoend\",bindKey:o(\"Ctrl-End\",\"Command-End|Command-Down\"),exec:function(e){e.navigateFileEnd()},multiSelectAction:\"forEach\",readOnly:!0,scrollIntoView:\"animate\",aceCommandGroup:\"fileJump\"},{name:\"selectdown\",bindKey:o(\"Shift-Down\",\"Shift-Down|Ctrl-Shift-N\"),exec:function(e){e.getSelection().selectDown()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"golinedown\",bindKey:o(\"Down\",\"Down|Ctrl-N\"),exec:function(e,t){e.navigateDown(t.times)},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"selectwordleft\",bindKey:o(\"Ctrl-Shift-Left\",\"Option-Shift-Left\"),exec:function(e){e.getSelection().selectWordLeft()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"gotowordleft\",bindKey:o(\"Ctrl-Left\",\"Option-Left\"),exec:function(e){e.navigateWordLeft()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"selecttolinestart\",bindKey:o(\"Alt-Shift-Left\",\"Command-Shift-Left|Ctrl-Shift-A\"),exec:function(e){e.getSelection().selectLineStart()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"gotolinestart\",bindKey:o(\"Alt-Left|Home\",\"Command-Left|Home|Ctrl-A\"),exec:function(e){e.navigateLineStart()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"selectleft\",bindKey:o(\"Shift-Left\",\"Shift-Left|Ctrl-Shift-B\"),exec:function(e){e.getSelection().selectLeft()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"gotoleft\",bindKey:o(\"Left\",\"Left|Ctrl-B\"),exec:function(e,t){e.navigateLeft(t.times)},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"selectwordright\",bindKey:o(\"Ctrl-Shift-Right\",\"Option-Shift-Right\"),exec:function(e){e.getSelection().selectWordRight()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"gotowordright\",bindKey:o(\"Ctrl-Right\",\"Option-Right\"),exec:function(e){e.navigateWordRight()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"selecttolineend\",bindKey:o(\"Alt-Shift-Right\",\"Command-Shift-Right|Shift-End|Ctrl-Shift-E\"),exec:function(e){e.getSelection().selectLineEnd()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"gotolineend\",bindKey:o(\"Alt-Right|End\",\"Command-Right|End|Ctrl-E\"),exec:function(e){e.navigateLineEnd()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"selectright\",bindKey:o(\"Shift-Right\",\"Shift-Right\"),exec:function(e){e.getSelection().selectRight()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"gotoright\",bindKey:o(\"Right\",\"Right|Ctrl-F\"),exec:function(e,t){e.navigateRight(t.times)},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"selectpagedown\",bindKey:\"Shift-PageDown\",exec:function(e){e.selectPageDown()},readOnly:!0},{name:\"pagedown\",bindKey:o(null,\"Option-PageDown\"),exec:function(e){e.scrollPageDown()},readOnly:!0},{name:\"gotopagedown\",bindKey:o(\"PageDown\",\"PageDown|Ctrl-V\"),exec:function(e){e.gotoPageDown()},readOnly:!0},{name:\"selectpageup\",bindKey:\"Shift-PageUp\",exec:function(e){e.selectPageUp()},readOnly:!0},{name:\"pageup\",bindKey:o(null,\"Option-PageUp\"),exec:function(e){e.scrollPageUp()},readOnly:!0},{name:\"gotopageup\",bindKey:\"PageUp\",exec:function(e){e.gotoPageUp()},readOnly:!0},{name:\"scrollup\",bindKey:o(\"Ctrl-Up\",null),exec:function(e){e.renderer.scrollBy(0,-2*e.renderer.layerConfig.lineHeight)},readOnly:!0},{name:\"scrolldown\",bindKey:o(\"Ctrl-Down\",null),exec:function(e){e.renderer.scrollBy(0,2*e.renderer.layerConfig.lineHeight)},readOnly:!0},{name:\"selectlinestart\",bindKey:\"Shift-Home\",exec:function(e){e.getSelection().selectLineStart()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"selectlineend\",bindKey:\"Shift-End\",exec:function(e){e.getSelection().selectLineEnd()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"togglerecording\",bindKey:o(\"Ctrl-Alt-E\",\"Command-Option-E\"),exec:function(e){e.commands.toggleRecording(e)},readOnly:!0},{name:\"replaymacro\",bindKey:o(\"Ctrl-Shift-E\",\"Command-Shift-E\"),exec:function(e){e.commands.replay(e)},readOnly:!0},{name:\"jumptomatching\",bindKey:o(\"Ctrl-P\",\"Ctrl-P\"),exec:function(e){e.jumpToMatching()},multiSelectAction:\"forEach\",scrollIntoView:\"animate\",readOnly:!0},{name:\"selecttomatching\",bindKey:o(\"Ctrl-Shift-P\",\"Ctrl-Shift-P\"),exec:function(e){e.jumpToMatching(!0)},multiSelectAction:\"forEach\",scrollIntoView:\"animate\",readOnly:!0},{name:\"expandToMatching\",bindKey:o(\"Ctrl-Shift-M\",\"Ctrl-Shift-M\"),exec:function(e){e.jumpToMatching(!0,!0)},multiSelectAction:\"forEach\",scrollIntoView:\"animate\",readOnly:!0},{name:\"passKeysToBrowser\",bindKey:o(null,null),exec:function(){},passEvent:!0,readOnly:!0},{name:\"copy\",exec:function(e){},readOnly:!0},{name:\"cut\",exec:function(e){var t=e.getSelectionRange();e._emit(\"cut\",t),e.selection.isEmpty()||(e.session.remove(t),e.clearSelection())},scrollIntoView:\"cursor\",multiSelectAction:\"forEach\"},{name:\"paste\",exec:function(e,t){e.$handlePaste(t)},scrollIntoView:\"cursor\"},{name:\"removeline\",bindKey:o(\"Ctrl-D\",\"Command-D\"),exec:function(e){e.removeLines()},scrollIntoView:\"cursor\",multiSelectAction:\"forEachLine\"},{name:\"duplicateSelection\",bindKey:o(\"Ctrl-Shift-D\",\"Command-Shift-D\"),exec:function(e){e.duplicateSelection()},scrollIntoView:\"cursor\",multiSelectAction:\"forEach\"},{name:\"sortlines\",bindKey:o(\"Ctrl-Alt-S\",\"Command-Alt-S\"),exec:function(e){e.sortLines()},scrollIntoView:\"selection\",multiSelectAction:\"forEachLine\"},{name:\"togglecomment\",bindKey:o(\"Ctrl-/\",\"Command-/\"),exec:function(e){e.toggleCommentLines()},multiSelectAction:\"forEachLine\",scrollIntoView:\"selectionPart\"},{name:\"toggleBlockComment\",bindKey:o(\"Ctrl-Shift-/\",\"Command-Shift-/\"),exec:function(e){e.toggleBlockComment()},multiSelectAction:\"forEach\",scrollIntoView:\"selectionPart\"},{name:\"modifyNumberUp\",bindKey:o(\"Ctrl-Shift-Up\",\"Alt-Shift-Up\"),exec:function(e){e.modifyNumber(1)},scrollIntoView:\"cursor\",multiSelectAction:\"forEach\"},{name:\"modifyNumberDown\",bindKey:o(\"Ctrl-Shift-Down\",\"Alt-Shift-Down\"),exec:function(e){e.modifyNumber(-1)},scrollIntoView:\"cursor\",multiSelectAction:\"forEach\"},{name:\"replace\",bindKey:o(\"Ctrl-H\",\"Command-Option-F\"),exec:function(e){i.loadModule(\"ace/ext/searchbox\",function(t){t.Search(e,!0)})}},{name:\"undo\",bindKey:o(\"Ctrl-Z\",\"Command-Z\"),exec:function(e){e.undo()}},{name:\"redo\",bindKey:o(\"Ctrl-Shift-Z|Ctrl-Y\",\"Command-Shift-Z|Command-Y\"),exec:function(e){e.redo()}},{name:\"copylinesup\",bindKey:o(\"Alt-Shift-Up\",\"Command-Option-Up\"),exec:function(e){e.copyLinesUp()},scrollIntoView:\"cursor\"},{name:\"movelinesup\",bindKey:o(\"Alt-Up\",\"Option-Up\"),exec:function(e){e.moveLinesUp()},scrollIntoView:\"cursor\"},{name:\"copylinesdown\",bindKey:o(\"Alt-Shift-Down\",\"Command-Option-Down\"),exec:function(e){e.copyLinesDown()},scrollIntoView:\"cursor\"},{name:\"movelinesdown\",bindKey:o(\"Alt-Down\",\"Option-Down\"),exec:function(e){e.moveLinesDown()},scrollIntoView:\"cursor\"},{name:\"del\",bindKey:o(\"Delete\",\"Delete|Ctrl-D|Shift-Delete\"),exec:function(e){e.remove(\"right\")},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\"},{name:\"backspace\",bindKey:o(\"Shift-Backspace|Backspace\",\"Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H\"),exec:function(e){e.remove(\"left\")},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\"},{name:\"cut_or_delete\",bindKey:o(\"Shift-Delete\",null),exec:function(e){if(!e.selection.isEmpty())return!1;e.remove(\"left\")},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\"},{name:\"removetolinestart\",bindKey:o(\"Alt-Backspace\",\"Command-Backspace\"),exec:function(e){e.removeToLineStart()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\"},{name:\"removetolineend\",bindKey:o(\"Alt-Delete\",\"Ctrl-K\"),exec:function(e){e.removeToLineEnd()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\"},{name:\"removewordleft\",bindKey:o(\"Ctrl-Backspace\",\"Alt-Backspace|Ctrl-Alt-Backspace\"),exec:function(e){e.removeWordLeft()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\"},{name:\"removewordright\",bindKey:o(\"Ctrl-Delete\",\"Alt-Delete\"),exec:function(e){e.removeWordRight()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\"},{name:\"outdent\",bindKey:o(\"Shift-Tab\",\"Shift-Tab\"),exec:function(e){e.blockOutdent()},multiSelectAction:\"forEach\",scrollIntoView:\"selectionPart\"},{name:\"indent\",bindKey:o(\"Tab\",\"Tab\"),exec:function(e){e.indent()},multiSelectAction:\"forEach\",scrollIntoView:\"selectionPart\"},{name:\"blockoutdent\",bindKey:o(\"Ctrl-[\",\"Ctrl-[\"),exec:function(e){e.blockOutdent()},multiSelectAction:\"forEachLine\",scrollIntoView:\"selectionPart\"},{name:\"blockindent\",bindKey:o(\"Ctrl-]\",\"Ctrl-]\"),exec:function(e){e.blockIndent()},multiSelectAction:\"forEachLine\",scrollIntoView:\"selectionPart\"},{name:\"insertstring\",exec:function(e,t){e.insert(t)},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\"},{name:\"inserttext\",exec:function(e,t){e.insert(r.stringRepeat(t.text||\"\",t.times||1))},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\"},{name:\"splitline\",bindKey:o(null,\"Ctrl-O\"),exec:function(e){e.splitLine()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\"},{name:\"transposeletters\",bindKey:o(\"Alt-Shift-X\",\"Ctrl-T\"),exec:function(e){e.transposeLetters()},multiSelectAction:function(e){e.transposeSelections(1)},scrollIntoView:\"cursor\"},{name:\"touppercase\",bindKey:o(\"Ctrl-U\",\"Ctrl-U\"),exec:function(e){e.toUpperCase()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\"},{name:\"tolowercase\",bindKey:o(\"Ctrl-Shift-U\",\"Ctrl-Shift-U\"),exec:function(e){e.toLowerCase()},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\"},{name:\"expandtoline\",bindKey:o(\"Ctrl-Shift-L\",\"Command-Shift-L\"),exec:function(e){var t=e.selection.getRange();t.start.column=t.end.column=0,t.end.row++,e.selection.setRange(t,!1)},multiSelectAction:\"forEach\",scrollIntoView:\"cursor\",readOnly:!0},{name:\"joinlines\",bindKey:o(null,null),exec:function(e){var t=e.selection.isBackwards(),n=t?e.selection.getSelectionLead():e.selection.getSelectionAnchor(),i=t?e.selection.getSelectionAnchor():e.selection.getSelectionLead(),o=e.session.doc.getLine(n.row).length,u=e.session.doc.getTextRange(e.selection.getRange()),a=u.replace(/\\n\\s*/,\" \").length,f=e.session.doc.getLine(n.row);for(var l=n.row+1;l<=i.row+1;l++){var c=r.stringTrimLeft(r.stringTrimRight(e.session.doc.getLine(l)));c.length!==0&&(c=\" \"+c),f+=c}i.row+1<e.session.doc.getLength()-1&&(f+=e.session.doc.getNewLineCharacter()),e.clearSelection(),e.session.doc.replace(new s(n.row,0,i.row+2,0),f),a>0?(e.selection.moveCursorTo(n.row,n.column),e.selection.selectTo(n.row,n.column+a)):(o=e.session.doc.getLine(n.row).length>o?o+1:o,e.selection.moveCursorTo(n.row,o))},multiSelectAction:\"forEach\",readOnly:!0},{name:\"invertSelection\",bindKey:o(null,null),exec:function(e){var t=e.session.doc.getLength()-1,n=e.session.doc.getLine(t).length,r=e.selection.rangeList.ranges,i=[];r.length<1&&(r=[e.selection.getRange()]);for(var o=0;o<r.length;o++)o==r.length-1&&(r[o].end.row!==t||r[o].end.column!==n)&&i.push(new s(r[o].end.row,r[o].end.column,t,n)),o===0?(r[o].start.row!==0||r[o].start.column!==0)&&i.push(new s(0,0,r[o].start.row,r[o].start.column)):i.push(new s(r[o-1].end.row,r[o-1].end.column,r[o].start.row,r[o].start.column));e.exitMultiSelectMode(),e.clearSelection();for(var o=0;o<i.length;o++)e.selection.addRange(i[o],!1)},readOnly:!0,scrollIntoView:\"none\"}]}),define(\"ace/editor\",[\"require\",\"exports\",\"module\",\"ace/lib/fixoldbrowsers\",\"ace/lib/oop\",\"ace/lib/dom\",\"ace/lib/lang\",\"ace/lib/useragent\",\"ace/keyboard/textinput\",\"ace/mouse/mouse_handler\",\"ace/mouse/fold_handler\",\"ace/keyboard/keybinding\",\"ace/edit_session\",\"ace/search\",\"ace/range\",\"ace/lib/event_emitter\",\"ace/commands/command_manager\",\"ace/commands/default_commands\",\"ace/config\",\"ace/token_iterator\"],function(e,t,n){\"use strict\";e(\"./lib/fixoldbrowsers\");var r=e(\"./lib/oop\"),i=e(\"./lib/dom\"),s=e(\"./lib/lang\"),o=e(\"./lib/useragent\"),u=e(\"./keyboard/textinput\").TextInput,a=e(\"./mouse/mouse_handler\").MouseHandler,f=e(\"./mouse/fold_handler\").FoldHandler,l=e(\"./keyboard/keybinding\").KeyBinding,c=e(\"./edit_session\").EditSession,h=e(\"./search\").Search,p=e(\"./range\").Range,d=e(\"./lib/event_emitter\").EventEmitter,v=e(\"./commands/command_manager\").CommandManager,m=e(\"./commands/default_commands\").commands,g=e(\"./config\"),y=e(\"./token_iterator\").TokenIterator,b=function(e,t){var n=e.getContainerElement();this.container=n,this.renderer=e,this.id=\"editor\"+ ++b.$uid,this.commands=new v(o.isMac?\"mac\":\"win\",m),typeof document==\"object\"&&(this.textInput=new u(e.getTextAreaContainer(),this),this.renderer.textarea=this.textInput.getElement(),this.$mouseHandler=new a(this),new f(this)),this.keyBinding=new l(this),this.$blockScrolling=0,this.$search=(new h).set({wrap:!0}),this.$historyTracker=this.$historyTracker.bind(this),this.commands.on(\"exec\",this.$historyTracker),this.$initOperationListeners(),this._$emitInputEvent=s.delayedCall(function(){this._signal(\"input\",{}),this.session&&this.session.bgTokenizer&&this.session.bgTokenizer.scheduleStart()}.bind(this)),this.on(\"change\",function(e,t){t._$emitInputEvent.schedule(31)}),this.setSession(t||new c(\"\")),g.resetOptions(this),g._signal(\"editor\",this)};b.$uid=0,function(){r.implement(this,d),this.$initOperationListeners=function(){function e(e){return e[e.length-1]}this.selections=[],this.commands.on(\"exec\",this.startOperation.bind(this),!0),this.commands.on(\"afterExec\",this.endOperation.bind(this),!0),this.$opResetTimer=s.delayedCall(this.endOperation.bind(this)),this.on(\"change\",function(){this.curOp||this.startOperation(),this.curOp.docChanged=!0}.bind(this),!0),this.on(\"changeSelection\",function(){this.curOp||this.startOperation(),this.curOp.selectionChanged=!0}.bind(this),!0)},this.curOp=null,this.prevOp={},this.startOperation=function(e){if(this.curOp){if(!e||this.curOp.command)return;this.prevOp=this.curOp}e||(this.previousCommand=null,e={}),this.$opResetTimer.schedule(),this.curOp={command:e.command||{},args:e.args,scrollTop:this.renderer.scrollTop},this.curOp.command.name&&this.curOp.command.scrollIntoView!==undefined&&this.$blockScrolling++},this.endOperation=function(e){if(this.curOp){if(e&&e.returnValue===!1)return this.curOp=null;this._signal(\"beforeEndOperation\");var t=this.curOp.command;t.name&&this.$blockScrolling>0&&this.$blockScrolling--;var n=t&&t.scrollIntoView;if(n){switch(n){case\"center-animate\":n=\"animate\";case\"center\":this.renderer.scrollCursorIntoView(null,.5);break;case\"animate\":case\"cursor\":this.renderer.scrollCursorIntoView();break;case\"selectionPart\":var r=this.selection.getRange(),i=this.renderer.layerConfig;(r.start.row>=i.lastRow||r.end.row<=i.firstRow)&&this.renderer.scrollSelectionIntoView(this.selection.anchor,this.selection.lead);break;default:}n==\"animate\"&&this.renderer.animateScrolling(this.curOp.scrollTop)}this.prevOp=this.curOp,this.curOp=null}},this.$mergeableCommands=[\"backspace\",\"del\",\"insertstring\"],this.$historyTracker=function(e){if(!this.$mergeUndoDeltas)return;var t=this.prevOp,n=this.$mergeableCommands,r=t.command&&e.command.name==t.command.name;if(e.command.name==\"insertstring\"){var i=e.args;this.mergeNextCommand===undefined&&(this.mergeNextCommand=!0),r=r&&this.mergeNextCommand&&(!/\\s/.test(i)||/\\s/.test(t.args)),this.mergeNextCommand=!0}else r=r&&n.indexOf(e.command.name)!==-1;this.$mergeUndoDeltas!=\"always\"&&Date.now()-this.sequenceStartTime>2e3&&(r=!1),r?this.session.mergeUndoDeltas=!0:n.indexOf(e.command.name)!==-1&&(this.sequenceStartTime=Date.now())},this.setKeyboardHandler=function(e,t){if(e&&typeof e==\"string\"){this.$keybindingId=e;var n=this;g.loadModule([\"keybinding\",e],function(r){n.$keybindingId==e&&n.keyBinding.setKeyboardHandler(r&&r.handler),t&&t()})}else this.$keybindingId=null,this.keyBinding.setKeyboardHandler(e),t&&t()},this.getKeyboardHandler=function(){return this.keyBinding.getKeyboardHandler()},this.setSession=function(e){if(this.session==e)return;this.curOp&&this.endOperation(),this.curOp={};var t=this.session;if(t){this.session.off(\"change\",this.$onDocumentChange),this.session.off(\"changeMode\",this.$onChangeMode),this.session.off(\"tokenizerUpdate\",this.$onTokenizerUpdate),this.session.off(\"changeTabSize\",this.$onChangeTabSize),this.session.off(\"changeWrapLimit\",this.$onChangeWrapLimit),this.session.off(\"changeWrapMode\",this.$onChangeWrapMode),this.session.off(\"changeFold\",this.$onChangeFold),this.session.off(\"changeFrontMarker\",this.$onChangeFrontMarker),this.session.off(\"changeBackMarker\",this.$onChangeBackMarker),this.session.off(\"changeBreakpoint\",this.$onChangeBreakpoint),this.session.off(\"changeAnnotation\",this.$onChangeAnnotation),this.session.off(\"changeOverwrite\",this.$onCursorChange),this.session.off(\"changeScrollTop\",this.$onScrollTopChange),this.session.off(\"changeScrollLeft\",this.$onScrollLeftChange);var n=this.session.getSelection();n.off(\"changeCursor\",this.$onCursorChange),n.off(\"changeSelection\",this.$onSelectionChange)}this.session=e,e?(this.$onDocumentChange=this.onDocumentChange.bind(this),e.on(\"change\",this.$onDocumentChange),this.renderer.setSession(e),this.$onChangeMode=this.onChangeMode.bind(this),e.on(\"changeMode\",this.$onChangeMode),this.$onTokenizerUpdate=this.onTokenizerUpdate.bind(this),e.on(\"tokenizerUpdate\",this.$onTokenizerUpdate),this.$onChangeTabSize=this.renderer.onChangeTabSize.bind(this.renderer),e.on(\"changeTabSize\",this.$onChangeTabSize),this.$onChangeWrapLimit=this.onChangeWrapLimit.bind(this),e.on(\"changeWrapLimit\",this.$onChangeWrapLimit),this.$onChangeWrapMode=this.onChangeWrapMode.bind(this),e.on(\"changeWrapMode\",this.$onChangeWrapMode),this.$onChangeFold=this.onChangeFold.bind(this),e.on(\"changeFold\",this.$onChangeFold),this.$onChangeFrontMarker=this.onChangeFrontMarker.bind(this),this.session.on(\"changeFrontMarker\",this.$onChangeFrontMarker),this.$onChangeBackMarker=this.onChangeBackMarker.bind(this),this.session.on(\"changeBackMarker\",this.$onChangeBackMarker),this.$onChangeBreakpoint=this.onChangeBreakpoint.bind(this),this.session.on(\"changeBreakpoint\",this.$onChangeBreakpoint),this.$onChangeAnnotation=this.onChangeAnnotation.bind(this),this.session.on(\"changeAnnotation\",this.$onChangeAnnotation),this.$onCursorChange=this.onCursorChange.bind(this),this.session.on(\"changeOverwrite\",this.$onCursorChange),this.$onScrollTopChange=this.onScrollTopChange.bind(this),this.session.on(\"changeScrollTop\",this.$onScrollTopChange),this.$onScrollLeftChange=this.onScrollLeftChange.bind(this),this.session.on(\"changeScrollLeft\",this.$onScrollLeftChange),this.selection=e.getSelection(),this.selection.on(\"changeCursor\",this.$onCursorChange),this.$onSelectionChange=this.onSelectionChange.bind(this),this.selection.on(\"changeSelection\",this.$onSelectionChange),this.onChangeMode(),this.$blockScrolling+=1,this.onCursorChange(),this.$blockScrolling-=1,this.onScrollTopChange(),this.onScrollLeftChange(),this.onSelectionChange(),this.onChangeFrontMarker(),this.onChangeBackMarker(),this.onChangeBreakpoint(),this.onChangeAnnotation(),this.session.getUseWrapMode()&&this.renderer.adjustWrapLimit(),this.renderer.updateFull()):(this.selection=null,this.renderer.setSession(e)),this._signal(\"changeSession\",{session:e,oldSession:t}),this.curOp=null,t&&t._signal(\"changeEditor\",{oldEditor:this}),e&&e._signal(\"changeEditor\",{editor:this}),e&&e.bgTokenizer&&e.bgTokenizer.scheduleStart()},this.getSession=function(){return this.session},this.setValue=function(e,t){return this.session.doc.setValue(e),t?t==1?this.navigateFileEnd():t==-1&&this.navigateFileStart():this.selectAll(),e},this.getValue=function(){return this.session.getValue()},this.getSelection=function(){return this.selection},this.resize=function(e){this.renderer.onResize(e)},this.setTheme=function(e,t){this.renderer.setTheme(e,t)},this.getTheme=function(){return this.renderer.getTheme()},this.setStyle=function(e){this.renderer.setStyle(e)},this.unsetStyle=function(e){this.renderer.unsetStyle(e)},this.getFontSize=function(){return this.getOption(\"fontSize\")||i.computedStyle(this.container,\"fontSize\")},this.setFontSize=function(e){this.setOption(\"fontSize\",e)},this.$highlightBrackets=function(){this.session.$bracketHighlight&&(this.session.removeMarker(this.session.$bracketHighlight),this.session.$bracketHighlight=null);if(this.$highlightPending)return;var e=this;this.$highlightPending=!0,setTimeout(function(){e.$highlightPending=!1;var t=e.session;if(!t||!t.bgTokenizer)return;var n=t.findMatchingBracket(e.getCursorPosition());if(n)var r=new p(n.row,n.column,n.row,n.column+1);else if(t.$mode.getMatching)var r=t.$mode.getMatching(e.session);r&&(t.$bracketHighlight=t.addMarker(r,\"ace_bracket\",\"text\"))},50)},this.$highlightTags=function(){if(this.$highlightTagPending)return;var e=this;this.$highlightTagPending=!0,setTimeout(function(){e.$highlightTagPending=!1;var t=e.session;if(!t||!t.bgTokenizer)return;var n=e.getCursorPosition(),r=new y(e.session,n.row,n.column),i=r.getCurrentToken();if(!i||!/\\b(?:tag-open|tag-name)/.test(i.type)){t.removeMarker(t.$tagHighlight),t.$tagHighlight=null;return}if(i.type.indexOf(\"tag-open\")!=-1){i=r.stepForward();if(!i)return}var s=i.value,o=0,u=r.stepBackward();if(u.value==\"<\"){do u=i,i=r.stepForward(),i&&i.value===s&&i.type.indexOf(\"tag-name\")!==-1&&(u.value===\"<\"?o++:u.value===\"</\"&&o--);while(i&&o>=0)}else{do i=u,u=r.stepBackward(),i&&i.value===s&&i.type.indexOf(\"tag-name\")!==-1&&(u.value===\"<\"?o++:u.value===\"</\"&&o--);while(u&&o<=0);r.stepForward()}if(!i){t.removeMarker(t.$tagHighlight),t.$tagHighlight=null;return}var a=r.getCurrentTokenRow(),f=r.getCurrentTokenColumn(),l=new p(a,f,a,f+i.value.length),c=t.$backMarkers[t.$tagHighlight];t.$tagHighlight&&c!=undefined&&l.compareRange(c.range)!==0&&(t.removeMarker(t.$tagHighlight),t.$tagHighlight=null),l&&!t.$tagHighlight&&(t.$tagHighlight=t.addMarker(l,\"ace_bracket\",\"text\"))},50)},this.focus=function(){var e=this;setTimeout(function(){e.textInput.focus()}),this.textInput.focus()},this.isFocused=function(){return this.textInput.isFocused()},this.blur=function(){this.textInput.blur()},this.onFocus=function(e){if(this.$isFocused)return;this.$isFocused=!0,this.renderer.showCursor(),this.renderer.visualizeFocus(),this._emit(\"focus\",e)},this.onBlur=function(e){if(!this.$isFocused)return;this.$isFocused=!1,this.renderer.hideCursor(),this.renderer.visualizeBlur(),this._emit(\"blur\",e)},this.$cursorChange=function(){this.renderer.updateCursor()},this.onDocumentChange=function(e){var t=this.session.$useWrapMode,n=e.start.row==e.end.row?e.end.row:Infinity;this.renderer.updateLines(e.start.row,n,t),this._signal(\"change\",e),this.$cursorChange(),this.$updateHighlightActiveLine()},this.onTokenizerUpdate=function(e){var t=e.data;this.renderer.updateLines(t.first,t.last)},this.onScrollTopChange=function(){this.renderer.scrollToY(this.session.getScrollTop())},this.onScrollLeftChange=function(){this.renderer.scrollToX(this.session.getScrollLeft())},this.onCursorChange=function(){this.$cursorChange(),this.$blockScrolling||(g.warn(\"Automatically scrolling cursor into view after selection change\",\"this will be disabled in the next version\",\"set editor.$blockScrolling = Infinity to disable this message\"),this.renderer.scrollCursorIntoView()),this.$highlightBrackets(),this.$highlightTags(),this.$updateHighlightActiveLine(),this._signal(\"changeSelection\")},this.$updateHighlightActiveLine=function(){var e=this.getSession(),t;if(this.$highlightActiveLine){if(this.$selectionStyle!=\"line\"||!this.selection.isMultiLine())t=this.getCursorPosition();this.renderer.$maxLines&&this.session.getLength()===1&&!(this.renderer.$minLines>1)&&(t=!1)}if(e.$highlightLineMarker&&!t)e.removeMarker(e.$highlightLineMarker.id),e.$highlightLineMarker=null;else if(!e.$highlightLineMarker&&t){var n=new p(t.row,t.column,t.row,Infinity);n.id=e.addMarker(n,\"ace_active-line\",\"screenLine\"),e.$highlightLineMarker=n}else t&&(e.$highlightLineMarker.start.row=t.row,e.$highlightLineMarker.end.row=t.row,e.$highlightLineMarker.start.column=t.column,e._signal(\"changeBackMarker\"))},this.onSelectionChange=function(e){var t=this.session;t.$selectionMarker&&t.removeMarker(t.$selectionMarker),t.$selectionMarker=null;if(!this.selection.isEmpty()){var n=this.selection.getRange(),r=this.getSelectionStyle();t.$selectionMarker=t.addMarker(n,\"ace_selection\",r)}else this.$updateHighlightActiveLine();var i=this.$highlightSelectedWord&&this.$getSelectionHighLightRegexp();this.session.highlight(i),this._signal(\"changeSelection\")},this.$getSelectionHighLightRegexp=function(){var e=this.session,t=this.getSelectionRange();if(t.isEmpty()||t.isMultiLine())return;var n=t.start.column-1,r=t.end.column+1,i=e.getLine(t.start.row),s=i.length,o=i.substring(Math.max(n,0),Math.min(r,s));if(n>=0&&/^[\\w\\d]/.test(o)||r<=s&&/[\\w\\d]$/.test(o))return;o=i.substring(t.start.column,t.end.column);if(!/^[\\w\\d]+$/.test(o))return;var u=this.$search.$assembleRegExp({wholeWord:!0,caseSensitive:!0,needle:o});return u},this.onChangeFrontMarker=function(){this.renderer.updateFrontMarkers()},this.onChangeBackMarker=function(){this.renderer.updateBackMarkers()},this.onChangeBreakpoint=function(){this.renderer.updateBreakpoints()},this.onChangeAnnotation=function(){this.renderer.setAnnotations(this.session.getAnnotations())},this.onChangeMode=function(e){this.renderer.updateText(),this._emit(\"changeMode\",e)},this.onChangeWrapLimit=function(){this.renderer.updateFull()},this.onChangeWrapMode=function(){this.renderer.onResize(!0)},this.onChangeFold=function(){this.$updateHighlightActiveLine(),this.renderer.updateFull()},this.getSelectedText=function(){return this.session.getTextRange(this.getSelectionRange())},this.getCopyText=function(){var e=this.getSelectedText();return this._signal(\"copy\",e),e},this.onCopy=function(){this.commands.exec(\"copy\",this)},this.onCut=function(){this.commands.exec(\"cut\",this)},this.onPaste=function(e,t){var n={text:e,event:t};this.commands.exec(\"paste\",this,n)},this.$handlePaste=function(e){typeof e==\"string\"&&(e={text:e}),this._signal(\"paste\",e);var t=e.text;if(!this.inMultiSelectMode||this.inVirtualSelectionMode)this.insert(t);else{var n=t.split(/\\r\\n|\\r|\\n/),r=this.selection.rangeList.ranges;if(n.length>r.length||n.length<2||!n[1])return this.commands.exec(\"insertstring\",this,t);for(var i=r.length;i--;){var s=r[i];s.isEmpty()||this.session.remove(s),this.session.insert(s.start,n[i])}}},this.execCommand=function(e,t){return this.commands.exec(e,this,t)},this.insert=function(e,t){var n=this.session,r=n.getMode(),i=this.getCursorPosition();if(this.getBehavioursEnabled()&&!t){var s=r.transformAction(n.getState(i.row),\"insertion\",this,n,e);s&&(e!==s.text&&(this.session.mergeUndoDeltas=!1,this.$mergeNextCommand=!1),e=s.text)}e==\"\t\"&&(e=this.session.getTabString());if(!this.selection.isEmpty()){var o=this.getSelectionRange();i=this.session.remove(o),this.clearSelection()}else if(this.session.getOverwrite()&&e.indexOf(\"\\n\")==-1){var o=new p.fromPoints(i,i);o.end.column+=e.length,this.session.remove(o)}if(e==\"\\n\"||e==\"\\r\\n\"){var u=n.getLine(i.row);if(i.column>u.search(/\\S|$/)){var a=u.substr(i.column).search(/\\S|$/);n.doc.removeInLine(i.row,i.column,i.column+a)}}this.clearSelection();var f=i.column,l=n.getState(i.row),u=n.getLine(i.row),c=r.checkOutdent(l,u,e),h=n.insert(i,e);s&&s.selection&&(s.selection.length==2?this.selection.setSelectionRange(new p(i.row,f+s.selection[0],i.row,f+s.selection[1])):this.selection.setSelectionRange(new p(i.row+s.selection[0],s.selection[1],i.row+s.selection[2],s.selection[3])));if(n.getDocument().isNewLine(e)){var d=r.getNextLineIndent(l,u.slice(0,i.column),n.getTabString());n.insert({row:i.row+1,column:0},d)}c&&r.autoOutdent(l,n,i.row)},this.onTextInput=function(e){this.keyBinding.onTextInput(e)},this.onCommandKey=function(e,t,n){this.keyBinding.onCommandKey(e,t,n)},this.setOverwrite=function(e){this.session.setOverwrite(e)},this.getOverwrite=function(){return this.session.getOverwrite()},this.toggleOverwrite=function(){this.session.toggleOverwrite()},this.setScrollSpeed=function(e){this.setOption(\"scrollSpeed\",e)},this.getScrollSpeed=function(){return this.getOption(\"scrollSpeed\")},this.setDragDelay=function(e){this.setOption(\"dragDelay\",e)},this.getDragDelay=function(){return this.getOption(\"dragDelay\")},this.setSelectionStyle=function(e){this.setOption(\"selectionStyle\",e)},this.getSelectionStyle=function(){return this.getOption(\"selectionStyle\")},this.setHighlightActiveLine=function(e){this.setOption(\"highlightActiveLine\",e)},this.getHighlightActiveLine=function(){return this.getOption(\"highlightActiveLine\")},this.setHighlightGutterLine=function(e){this.setOption(\"highlightGutterLine\",e)},this.getHighlightGutterLine=function(){return this.getOption(\"highlightGutterLine\")},this.setHighlightSelectedWord=function(e){this.setOption(\"highlightSelectedWord\",e)},this.getHighlightSelectedWord=function(){return this.$highlightSelectedWord},this.setAnimatedScroll=function(e){this.renderer.setAnimatedScroll(e)},this.getAnimatedScroll=function(){return this.renderer.getAnimatedScroll()},this.setShowInvisibles=function(e){this.renderer.setShowInvisibles(e)},this.getShowInvisibles=function(){return this.renderer.getShowInvisibles()},this.setDisplayIndentGuides=function(e){this.renderer.setDisplayIndentGuides(e)},this.getDisplayIndentGuides=function(){return this.renderer.getDisplayIndentGuides()},this.setShowPrintMargin=function(e){this.renderer.setShowPrintMargin(e)},this.getShowPrintMargin=function(){return this.renderer.getShowPrintMargin()},this.setPrintMarginColumn=function(e){this.renderer.setPrintMarginColumn(e)},this.getPrintMarginColumn=function(){return this.renderer.getPrintMarginColumn()},this.setReadOnly=function(e){this.setOption(\"readOnly\",e)},this.getReadOnly=function(){return this.getOption(\"readOnly\")},this.setBehavioursEnabled=function(e){this.setOption(\"behavioursEnabled\",e)},this.getBehavioursEnabled=function(){return this.getOption(\"behavioursEnabled\")},this.setWrapBehavioursEnabled=function(e){this.setOption(\"wrapBehavioursEnabled\",e)},this.getWrapBehavioursEnabled=function(){return this.getOption(\"wrapBehavioursEnabled\")},this.setShowFoldWidgets=function(e){this.setOption(\"showFoldWidgets\",e)},this.getShowFoldWidgets=function(){return this.getOption(\"showFoldWidgets\")},this.setFadeFoldWidgets=function(e){this.setOption(\"fadeFoldWidgets\",e)},this.getFadeFoldWidgets=function(){return this.getOption(\"fadeFoldWidgets\")},this.remove=function(e){this.selection.isEmpty()&&(e==\"left\"?this.selection.selectLeft():this.selection.selectRight());var t=this.getSelectionRange();if(this.getBehavioursEnabled()){var n=this.session,r=n.getState(t.start.row),i=n.getMode().transformAction(r,\"deletion\",this,n,t);if(t.end.column===0){var s=n.getTextRange(t);if(s[s.length-1]==\"\\n\"){var o=n.getLine(t.end.row);/^\\s+$/.test(o)&&(t.end.column=o.length)}}i&&(t=i)}this.session.remove(t),this.clearSelection()},this.removeWordRight=function(){this.selection.isEmpty()&&this.selection.selectWordRight(),this.session.remove(this.getSelectionRange()),this.clearSelection()},this.removeWordLeft=function(){this.selection.isEmpty()&&this.selection.selectWordLeft(),this.session.remove(this.getSelectionRange()),this.clearSelection()},this.removeToLineStart=function(){this.selection.isEmpty()&&this.selection.selectLineStart(),this.session.remove(this.getSelectionRange()),this.clearSelection()},this.removeToLineEnd=function(){this.selection.isEmpty()&&this.selection.selectLineEnd();var e=this.getSelectionRange();e.start.column==e.end.column&&e.start.row==e.end.row&&(e.end.column=0,e.end.row++),this.session.remove(e),this.clearSelection()},this.splitLine=function(){this.selection.isEmpty()||(this.session.remove(this.getSelectionRange()),this.clearSelection());var e=this.getCursorPosition();this.insert(\"\\n\"),this.moveCursorToPosition(e)},this.transposeLetters=function(){if(!this.selection.isEmpty())return;var e=this.getCursorPosition(),t=e.column;if(t===0)return;var n=this.session.getLine(e.row),r,i;t<n.length?(r=n.charAt(t)+n.charAt(t-1),i=new p(e.row,t-1,e.row,t+1)):(r=n.charAt(t-1)+n.charAt(t-2),i=new p(e.row,t-2,e.row,t)),this.session.replace(i,r),this.session.selection.moveToPosition(i.end)},this.toLowerCase=function(){var e=this.getSelectionRange();this.selection.isEmpty()&&this.selection.selectWord();var t=this.getSelectionRange(),n=this.session.getTextRange(t);this.session.replace(t,n.toLowerCase()),this.selection.setSelectionRange(e)},this.toUpperCase=function(){var e=this.getSelectionRange();this.selection.isEmpty()&&this.selection.selectWord();var t=this.getSelectionRange(),n=this.session.getTextRange(t);this.session.replace(t,n.toUpperCase()),this.selection.setSelectionRange(e)},this.indent=function(){var e=this.session,t=this.getSelectionRange();if(t.start.row<t.end.row){var n=this.$getSelectedRows();e.indentRows(n.first,n.last,\"\t\");return}if(t.start.column<t.end.column){var r=e.getTextRange(t);if(!/^\\s+$/.test(r)){var n=this.$getSelectedRows();e.indentRows(n.first,n.last,\"\t\");return}}var i=e.getLine(t.start.row),o=t.start,u=e.getTabSize(),a=e.documentToScreenColumn(o.row,o.column);if(this.session.getUseSoftTabs())var f=u-a%u,l=s.stringRepeat(\" \",f);else{var f=a%u;while(i[t.start.column-1]==\" \"&&f)t.start.column--,f--;this.selection.setSelectionRange(t),l=\"\t\"}return this.insert(l)},this.blockIndent=function(){var e=this.$getSelectedRows();this.session.indentRows(e.first,e.last,\"\t\")},this.blockOutdent=function(){var e=this.session.getSelection();this.session.outdentRows(e.getRange())},this.sortLines=function(){var e=this.$getSelectedRows(),t=this.session,n=[];for(i=e.first;i<=e.last;i++)n.push(t.getLine(i));n.sort(function(e,t){return e.toLowerCase()<t.toLowerCase()?-1:e.toLowerCase()>t.toLowerCase()?1:0});var r=new p(0,0,0,0);for(var i=e.first;i<=e.last;i++){var s=t.getLine(i);r.start.row=i,r.end.row=i,r.end.column=s.length,t.replace(r,n[i-e.first])}},this.toggleCommentLines=function(){var e=this.session.getState(this.getCursorPosition().row),t=this.$getSelectedRows();this.session.getMode().toggleCommentLines(e,this.session,t.first,t.last)},this.toggleBlockComment=function(){var e=this.getCursorPosition(),t=this.session.getState(e.row),n=this.getSelectionRange();this.session.getMode().toggleBlockComment(t,this.session,n,e)},this.getNumberAt=function(e,t){var n=/[\\-]?[0-9]+(?:\\.[0-9]+)?/g;n.lastIndex=0;var r=this.session.getLine(e);while(n.lastIndex<t){var i=n.exec(r);if(i.index<=t&&i.index+i[0].length>=t){var s={value:i[0],start:i.index,end:i.index+i[0].length};return s}}return null},this.modifyNumber=function(e){var t=this.selection.getCursor().row,n=this.selection.getCursor().column,r=new p(t,n-1,t,n),i=this.session.getTextRange(r);if(!isNaN(parseFloat(i))&&isFinite(i)){var s=this.getNumberAt(t,n);if(s){var o=s.value.indexOf(\".\")>=0?s.start+s.value.indexOf(\".\")+1:s.end,u=s.start+s.value.length-o,a=parseFloat(s.value);a*=Math.pow(10,u),o!==s.end&&n<o?e*=Math.pow(10,s.end-n-1):e*=Math.pow(10,s.end-n),a+=e,a/=Math.pow(10,u);var f=a.toFixed(u),l=new p(t,s.start,t,s.end);this.session.replace(l,f),this.moveCursorTo(t,Math.max(s.start+1,n+f.length-s.value.length))}}},this.removeLines=function(){var e=this.$getSelectedRows();this.session.removeFullLines(e.first,e.last),this.clearSelection()},this.duplicateSelection=function(){var e=this.selection,t=this.session,n=e.getRange(),r=e.isBackwards();if(n.isEmpty()){var i=n.start.row;t.duplicateLines(i,i)}else{var s=r?n.start:n.end,o=t.insert(s,t.getTextRange(n),!1);n.start=s,n.end=o,e.setSelectionRange(n,r)}},this.moveLinesDown=function(){this.$moveLines(1,!1)},this.moveLinesUp=function(){this.$moveLines(-1,!1)},this.moveText=function(e,t,n){return this.session.moveText(e,t,n)},this.copyLinesUp=function(){this.$moveLines(-1,!0)},this.copyLinesDown=function(){this.$moveLines(1,!0)},this.$moveLines=function(e,t){var n,r,i=this.selection;if(!i.inMultiSelectMode||this.inVirtualSelectionMode){var s=i.toOrientedRange();n=this.$getSelectedRows(s),r=this.session.$moveLines(n.first,n.last,t?0:e),t&&e==-1&&(r=0),s.moveBy(r,0),i.fromOrientedRange(s)}else{var o=i.rangeList.ranges;i.rangeList.detach(this.session),this.inVirtualSelectionMode=!0;var u=0,a=0,f=o.length;for(var l=0;l<f;l++){var c=l;o[l].moveBy(u,0),n=this.$getSelectedRows(o[l]);var h=n.first,p=n.last;while(++l<f){a&&o[l].moveBy(a,0);var d=this.$getSelectedRows(o[l]);if(t&&d.first!=p)break;if(!t&&d.first>p+1)break;p=d.last}l--,u=this.session.$moveLines(h,p,t?0:e),t&&e==-1&&(c=l+1);while(c<=l)o[c].moveBy(u,0),c++;t||(u=0),a+=u}i.fromOrientedRange(i.ranges[0]),i.rangeList.attach(this.session),this.inVirtualSelectionMode=!1}},this.$getSelectedRows=function(e){return e=(e||this.getSelectionRange()).collapseRows(),{first:this.session.getRowFoldStart(e.start.row),last:this.session.getRowFoldEnd(e.end.row)}},this.onCompositionStart=function(e){this.renderer.showComposition(this.getCursorPosition())},this.onCompositionUpdate=function(e){this.renderer.setCompositionText(e)},this.onCompositionEnd=function(){this.renderer.hideComposition()},this.getFirstVisibleRow=function(){return this.renderer.getFirstVisibleRow()},this.getLastVisibleRow=function(){return this.renderer.getLastVisibleRow()},this.isRowVisible=function(e){return e>=this.getFirstVisibleRow()&&e<=this.getLastVisibleRow()},this.isRowFullyVisible=function(e){return e>=this.renderer.getFirstFullyVisibleRow()&&e<=this.renderer.getLastFullyVisibleRow()},this.$getVisibleRowCount=function(){return this.renderer.getScrollBottomRow()-this.renderer.getScrollTopRow()+1},this.$moveByPage=function(e,t){var n=this.renderer,r=this.renderer.layerConfig,i=e*Math.floor(r.height/r.lineHeight);this.$blockScrolling++,t===!0?this.selection.$moveSelection(function(){this.moveCursorBy(i,0)}):t===!1&&(this.selection.moveCursorBy(i,0),this.selection.clearSelection()),this.$blockScrolling--;var s=n.scrollTop;n.scrollBy(0,i*r.lineHeight),t!=null&&n.scrollCursorIntoView(null,.5),n.animateScrolling(s)},this.selectPageDown=function(){this.$moveByPage(1,!0)},this.selectPageUp=function(){this.$moveByPage(-1,!0)},this.gotoPageDown=function(){this.$moveByPage(1,!1)},this.gotoPageUp=function(){this.$moveByPage(-1,!1)},this.scrollPageDown=function(){this.$moveByPage(1)},this.scrollPageUp=function(){this.$moveByPage(-1)},this.scrollToRow=function(e){this.renderer.scrollToRow(e)},this.scrollToLine=function(e,t,n,r){this.renderer.scrollToLine(e,t,n,r)},this.centerSelection=function(){var e=this.getSelectionRange(),t={row:Math.floor(e.start.row+(e.end.row-e.start.row)/2),column:Math.floor(e.start.column+(e.end.column-e.start.column)/2)};this.renderer.alignCursor(t,.5)},this.getCursorPosition=function(){return this.selection.getCursor()},this.getCursorPositionScreen=function(){return this.session.documentToScreenPosition(this.getCursorPosition())},this.getSelectionRange=function(){return this.selection.getRange()},this.selectAll=function(){this.$blockScrolling+=1,this.selection.selectAll(),this.$blockScrolling-=1},this.clearSelection=function(){this.selection.clearSelection()},this.moveCursorTo=function(e,t){this.selection.moveCursorTo(e,t)},this.moveCursorToPosition=function(e){this.selection.moveCursorToPosition(e)},this.jumpToMatching=function(e,t){var n=this.getCursorPosition(),r=new y(this.session,n.row,n.column),i=r.getCurrentToken(),s=i||r.stepForward();if(!s)return;var o,u=!1,a={},f=n.column-s.start,l,c={\")\":\"(\",\"(\":\"(\",\"]\":\"[\",\"[\":\"[\",\"{\":\"{\",\"}\":\"{\"};do{if(s.value.match(/[{}()\\[\\]]/g))for(;f<s.value.length&&!u;f++){if(!c[s.value[f]])continue;l=c[s.value[f]]+\".\"+s.type.replace(\"rparen\",\"lparen\"),isNaN(a[l])&&(a[l]=0);switch(s.value[f]){case\"(\":case\"[\":case\"{\":a[l]++;break;case\")\":case\"]\":case\"}\":a[l]--,a[l]===-1&&(o=\"bracket\",u=!0)}}else s&&s.type.indexOf(\"tag-name\")!==-1&&(isNaN(a[s.value])&&(a[s.value]=0),i.value===\"<\"?a[s.value]++:i.value===\"</\"&&a[s.value]--,a[s.value]===-1&&(o=\"tag\",u=!0));u||(i=s,s=r.stepForward(),f=0)}while(s&&!u);if(!o)return;var h,d;if(o===\"bracket\"){h=this.session.getBracketRange(n);if(!h){h=new p(r.getCurrentTokenRow(),r.getCurrentTokenColumn()+f-1,r.getCurrentTokenRow(),r.getCurrentTokenColumn()+f-1),d=h.start;if(t||d.row===n.row&&Math.abs(d.column-n.column)<2)h=this.session.getBracketRange(d)}}else if(o===\"tag\"){if(!s||s.type.indexOf(\"tag-name\")===-1)return;var v=s.value;h=new p(r.getCurrentTokenRow(),r.getCurrentTokenColumn()-2,r.getCurrentTokenRow(),r.getCurrentTokenColumn()-2);if(h.compare(n.row,n.column)===0){u=!1;do s=i,i=r.stepBackward(),i&&(i.type.indexOf(\"tag-close\")!==-1&&h.setEnd(r.getCurrentTokenRow(),r.getCurrentTokenColumn()+1),s.value===v&&s.type.indexOf(\"tag-name\")!==-1&&(i.value===\"<\"?a[v]++:i.value===\"</\"&&a[v]--,a[v]===0&&(u=!0)));while(i&&!u)}s&&s.type.indexOf(\"tag-name\")&&(d=h.start,d.row==n.row&&Math.abs(d.column-n.column)<2&&(d=h.end))}d=h&&h.cursor||d,d&&(e?h&&t?this.selection.setRange(h):h&&h.isEqual(this.getSelectionRange())?this.clearSelection():this.selection.selectTo(d.row,d.column):this.selection.moveTo(d.row,d.column))},this.gotoLine=function(e,t,n){this.selection.clearSelection(),this.session.unfold({row:e-1,column:t||0}),this.$blockScrolling+=1,this.exitMultiSelectMode&&this.exitMultiSelectMode(),this.moveCursorTo(e-1,t||0),this.$blockScrolling-=1,this.isRowFullyVisible(e-1)||this.scrollToLine(e-1,!0,n)},this.navigateTo=function(e,t){this.selection.moveTo(e,t)},this.navigateUp=function(e){if(this.selection.isMultiLine()&&!this.selection.isBackwards()){var t=this.selection.anchor.getPosition();return this.moveCursorToPosition(t)}this.selection.clearSelection(),this.selection.moveCursorBy(-e||-1,0)},this.navigateDown=function(e){if(this.selection.isMultiLine()&&this.selection.isBackwards()){var t=this.selection.anchor.getPosition();return this.moveCursorToPosition(t)}this.selection.clearSelection(),this.selection.moveCursorBy(e||1,0)},this.navigateLeft=function(e){if(!this.selection.isEmpty()){var t=this.getSelectionRange().start;this.moveCursorToPosition(t)}else{e=e||1;while(e--)this.selection.moveCursorLeft()}this.clearSelection()},this.navigateRight=function(e){if(!this.selection.isEmpty()){var t=this.getSelectionRange().end;this.moveCursorToPosition(t)}else{e=e||1;while(e--)this.selection.moveCursorRight()}this.clearSelection()},this.navigateLineStart=function(){this.selection.moveCursorLineStart(),this.clearSelection()},this.navigateLineEnd=function(){this.selection.moveCursorLineEnd(),this.clearSelection()},this.navigateFileEnd=function(){this.selection.moveCursorFileEnd(),this.clearSelection()},this.navigateFileStart=function(){this.selection.moveCursorFileStart(),this.clearSelection()},this.navigateWordRight=function(){this.selection.moveCursorWordRight(),this.clearSelection()},this.navigateWordLeft=function(){this.selection.moveCursorWordLeft(),this.clearSelection()},this.replace=function(e,t){t&&this.$search.set(t);var n=this.$search.find(this.session),r=0;return n?(this.$tryReplace(n,e)&&(r=1),n!==null&&(this.selection.setSelectionRange(n),this.renderer.scrollSelectionIntoView(n.start,n.end)),r):r},this.replaceAll=function(e,t){t&&this.$search.set(t);var n=this.$search.findAll(this.session),r=0;if(!n.length)return r;this.$blockScrolling+=1;var i=this.getSelectionRange();this.selection.moveTo(0,0);for(var s=n.length-1;s>=0;--s)this.$tryReplace(n[s],e)&&r++;return this.selection.setSelectionRange(i),this.$blockScrolling-=1,r},this.$tryReplace=function(e,t){var n=this.session.getTextRange(e);return t=this.$search.replace(n,t),t!==null?(e.end=this.session.replace(e,t),e):null},this.getLastSearchOptions=function(){return this.$search.getOptions()},this.find=function(e,t,n){t||(t={}),typeof e==\"string\"||e instanceof RegExp?t.needle=e:typeof e==\"object\"&&r.mixin(t,e);var i=this.selection.getRange();t.needle==null&&(e=this.session.getTextRange(i)||this.$search.$options.needle,e||(i=this.session.getWordRange(i.start.row,i.start.column),e=this.session.getTextRange(i)),this.$search.set({needle:e})),this.$search.set(t),t.start||this.$search.set({start:i});var s=this.$search.find(this.session);if(t.preventScroll)return s;if(s)return this.revealRange(s,n),s;t.backwards?i.start=i.end:i.end=i.start,this.selection.setRange(i)},this.findNext=function(e,t){this.find({skipCurrent:!0,backwards:!1},e,t)},this.findPrevious=function(e,t){this.find(e,{skipCurrent:!0,backwards:!0},t)},this.revealRange=function(e,t){this.$blockScrolling+=1,this.session.unfold(e),this.selection.setSelectionRange(e),this.$blockScrolling-=1;var n=this.renderer.scrollTop;this.renderer.scrollSelectionIntoView(e.start,e.end,.5),t!==!1&&this.renderer.animateScrolling(n)},this.undo=function(){this.$blockScrolling++,this.session.getUndoManager().undo(),this.$blockScrolling--,this.renderer.scrollCursorIntoView(null,.5)},this.redo=function(){this.$blockScrolling++,this.session.getUndoManager().redo(),this.$blockScrolling--,this.renderer.scrollCursorIntoView(null,.5)},this.destroy=function(){this.renderer.destroy(),this._signal(\"destroy\",this),this.session&&this.session.destroy()},this.setAutoScrollEditorIntoView=function(e){if(!e)return;var t,n=this,r=!1;this.$scrollAnchor||(this.$scrollAnchor=document.createElement(\"div\"));var i=this.$scrollAnchor;i.style.cssText=\"position:absolute\",this.container.insertBefore(i,this.container.firstChild);var s=this.on(\"changeSelection\",function(){r=!0}),o=this.renderer.on(\"beforeRender\",function(){r&&(t=n.renderer.container.getBoundingClientRect())}),u=this.renderer.on(\"afterRender\",function(){if(r&&t&&(n.isFocused()||n.searchBox&&n.searchBox.isFocused())){var e=n.renderer,s=e.$cursorLayer.$pixelPos,o=e.layerConfig,u=s.top-o.offset;s.top>=0&&u+t.top<0?r=!0:s.top<o.height&&s.top+t.top+o.lineHeight>window.innerHeight?r=!1:r=null,r!=null&&(i.style.top=u+\"px\",i.style.left=s.left+\"px\",i.style.height=o.lineHeight+\"px\",i.scrollIntoView(r)),r=t=null}});this.setAutoScrollEditorIntoView=function(e){if(e)return;delete this.setAutoScrollEditorIntoView,this.off(\"changeSelection\",s),this.renderer.off(\"afterRender\",u),this.renderer.off(\"beforeRender\",o)}},this.$resetCursorStyle=function(){var e=this.$cursorStyle||\"ace\",t=this.renderer.$cursorLayer;if(!t)return;t.setSmoothBlinking(/smooth/.test(e)),t.isBlinking=!this.$readOnly&&e!=\"wide\",i.setCssClass(t.element,\"ace_slim-cursors\",/slim/.test(e))}}.call(b.prototype),g.defineOptions(b.prototype,\"editor\",{selectionStyle:{set:function(e){this.onSelectionChange(),this._signal(\"changeSelectionStyle\",{data:e})},initialValue:\"line\"},highlightActiveLine:{set:function(){this.$updateHighlightActiveLine()},initialValue:!0},highlightSelectedWord:{set:function(e){this.$onSelectionChange()},initialValue:!0},readOnly:{set:function(e){this.$resetCursorStyle()},initialValue:!1},cursorStyle:{set:function(e){this.$resetCursorStyle()},values:[\"ace\",\"slim\",\"smooth\",\"wide\"],initialValue:\"ace\"},mergeUndoDeltas:{values:[!1,!0,\"always\"],initialValue:!0},behavioursEnabled:{initialValue:!0},wrapBehavioursEnabled:{initialValue:!0},autoScrollEditorIntoView:{set:function(e){this.setAutoScrollEditorIntoView(e)}},keyboardHandler:{set:function(e){this.setKeyboardHandler(e)},get:function(){return this.keybindingId},handlesSet:!0},hScrollBarAlwaysVisible:\"renderer\",vScrollBarAlwaysVisible:\"renderer\",highlightGutterLine:\"renderer\",animatedScroll:\"renderer\",showInvisibles:\"renderer\",showPrintMargin:\"renderer\",printMarginColumn:\"renderer\",printMargin:\"renderer\",fadeFoldWidgets:\"renderer\",showFoldWidgets:\"renderer\",showLineNumbers:\"renderer\",showGutter:\"renderer\",displayIndentGuides:\"renderer\",fontSize:\"renderer\",fontFamily:\"renderer\",maxLines:\"renderer\",minLines:\"renderer\",scrollPastEnd:\"renderer\",fixedWidthGutter:\"renderer\",theme:\"renderer\",scrollSpeed:\"$mouseHandler\",dragDelay:\"$mouseHandler\",dragEnabled:\"$mouseHandler\",focusTimout:\"$mouseHandler\",tooltipFollowsMouse:\"$mouseHandler\",firstLineNumber:\"session\",overwrite:\"session\",newLineMode:\"session\",useWorker:\"session\",useSoftTabs:\"session\",tabSize:\"session\",wrap:\"session\",indentedSoftWrap:\"session\",foldStyle:\"session\",mode:\"session\"}),t.Editor=b}),define(\"ace/undomanager\",[\"require\",\"exports\",\"module\"],function(e,t,n){\"use strict\";var r=function(){this.reset()};(function(){function e(e){return{action:e.action,start:e.start,end:e.end,lines:e.lines.length==1?null:e.lines,text:e.lines.length==1?e.lines[0]:null}}function t(e){return{action:e.action,start:e.start,end:e.end,lines:e.lines||[e.text]}}function n(e,t){var n=new Array(e.length);for(var r=0;r<e.length;r++){var i=e[r],s={group:i.group,deltas:new Array(i.length)};for(var o=0;o<i.deltas.length;o++){var u=i.deltas[o];s.deltas[o]=t(u)}n[r]=s}return n}this.execute=function(e){var t=e.args[0];this.$doc=e.args[1],e.merge&&this.hasUndo()&&(this.dirtyCounter--,t=this.$undoStack.pop().concat(t)),this.$undoStack.push(t),this.$redoStack=[],this.dirtyCounter<0&&(this.dirtyCounter=NaN),this.dirtyCounter++},this.undo=function(e){var t=this.$undoStack.pop(),n=null;return t&&(n=this.$doc.undoChanges(t,e),this.$redoStack.push(t),this.dirtyCounter--),n},this.redo=function(e){var t=this.$redoStack.pop(),n=null;return t&&(n=this.$doc.redoChanges(this.$deserializeDeltas(t),e),this.$undoStack.push(t),this.dirtyCounter++),n},this.reset=function(){this.$undoStack=[],this.$redoStack=[],this.dirtyCounter=0},this.hasUndo=function(){return this.$undoStack.length>0},this.hasRedo=function(){return this.$redoStack.length>0},this.markClean=function(){this.dirtyCounter=0},this.isClean=function(){return this.dirtyCounter===0},this.$serializeDeltas=function(t){return n(t,e)},this.$deserializeDeltas=function(e){return n(e,t)}}).call(r.prototype),t.UndoManager=r}),define(\"ace/layer/gutter\",[\"require\",\"exports\",\"module\",\"ace/lib/dom\",\"ace/lib/oop\",\"ace/lib/lang\",\"ace/lib/event_emitter\"],function(e,t,n){\"use strict\";var r=e(\"../lib/dom\"),i=e(\"../lib/oop\"),s=e(\"../lib/lang\"),o=e(\"../lib/event_emitter\").EventEmitter,u=function(e){this.element=r.createElement(\"div\"),this.element.className=\"ace_layer ace_gutter-layer\",e.appendChild(this.element),this.setShowFoldWidgets(this.$showFoldWidgets),this.gutterWidth=0,this.$annotations=[],this.$updateAnnotations=this.$updateAnnotations.bind(this),this.$cells=[]};(function(){i.implement(this,o),this.setSession=function(e){this.session&&this.session.removeEventListener(\"change\",this.$updateAnnotations),this.session=e,e&&e.on(\"change\",this.$updateAnnotations)},this.addGutterDecoration=function(e,t){window.console&&console.warn&&console.warn(\"deprecated use session.addGutterDecoration\"),this.session.addGutterDecoration(e,t)},this.removeGutterDecoration=function(e,t){window.console&&console.warn&&console.warn(\"deprecated use session.removeGutterDecoration\"),this.session.removeGutterDecoration(e,t)},this.setAnnotations=function(e){this.$annotations=[];for(var t=0;t<e.length;t++){var n=e[t],r=n.row,i=this.$annotations[r];i||(i=this.$annotations[r]={text:[]});var o=n.text;o=o?s.escapeHTML(o):n.html||\"\",i.text.indexOf(o)===-1&&i.text.push(o);var u=n.type;u==\"error\"?i.className=\" ace_error\":u==\"warning\"&&i.className!=\" ace_error\"?i.className=\" ace_warning\":u==\"info\"&&!i.className&&(i.className=\" ace_info\")}},this.$updateAnnotations=function(e){if(!this.$annotations.length)return;var t=e.start.row,n=e.end.row-t;if(n!==0)if(e.action==\"remove\")this.$annotations.splice(t,n+1,null);else{var r=new Array(n+1);r.unshift(t,1),this.$annotations.splice.apply(this.$annotations,r)}},this.update=function(e){var t=this.session,n=e.firstRow,i=Math.min(e.lastRow+e.gutterOffset,t.getLength()-1),s=t.getNextFoldLine(n),o=s?s.start.row:Infinity,u=this.$showFoldWidgets&&t.foldWidgets,a=t.$breakpoints,f=t.$decorations,l=t.$firstLineNumber,c=0,h=t.gutterRenderer||this.$renderer,p=null,d=-1,v=n;for(;;){v>o&&(v=s.end.row+1,s=t.getNextFoldLine(v,s),o=s?s.start.row:Infinity);if(v>i){while(this.$cells.length>d+1)p=this.$cells.pop(),this.element.removeChild(p.element);break}p=this.$cells[++d],p||(p={element:null,textNode:null,foldWidget:null},p.element=r.createElement(\"div\"),p.textNode=document.createTextNode(\"\"),p.element.appendChild(p.textNode),this.element.appendChild(p.element),this.$cells[d]=p);var m=\"ace_gutter-cell \";a[v]&&(m+=a[v]),f[v]&&(m+=f[v]),this.$annotations[v]&&(m+=this.$annotations[v].className),p.element.className!=m&&(p.element.className=m);var g=t.getRowLength(v)*e.lineHeight+\"px\";g!=p.element.style.height&&(p.element.style.height=g);if(u){var y=u[v];y==null&&(y=u[v]=t.getFoldWidget(v))}if(y){p.foldWidget||(p.foldWidget=r.createElement(\"span\"),p.element.appendChild(p.foldWidget));var m=\"ace_fold-widget ace_\"+y;y==\"start\"&&v==o&&v<s.end.row?m+=\" ace_closed\":m+=\" ace_open\",p.foldWidget.className!=m&&(p.foldWidget.className=m);var g=e.lineHeight+\"px\";p.foldWidget.style.height!=g&&(p.foldWidget.style.height=g)}else p.foldWidget&&(p.element.removeChild(p.foldWidget),p.foldWidget=null);var b=c=h?h.getText(t,v):v+l;b!==p.textNode.data&&(p.textNode.data=b),v++}this.element.style.height=e.minHeight+\"px\";if(this.$fixedWidth||t.$useWrapMode)c=t.getLength()+l;var w=h?h.getWidth(t,c,e):c.toString().length*e.characterWidth,E=this.$padding||this.$computePadding();w+=E.left+E.right,w!==this.gutterWidth&&!isNaN(w)&&(this.gutterWidth=w,this.element.style.width=Math.ceil(this.gutterWidth)+\"px\",this._emit(\"changeGutterWidth\",w))},this.$fixedWidth=!1,this.$showLineNumbers=!0,this.$renderer=\"\",this.setShowLineNumbers=function(e){this.$renderer=!e&&{getWidth:function(){return\"\"},getText:function(){return\"\"}}},this.getShowLineNumbers=function(){return this.$showLineNumbers},this.$showFoldWidgets=!0,this.setShowFoldWidgets=function(e){e?r.addCssClass(this.element,\"ace_folding-enabled\"):r.removeCssClass(this.element,\"ace_folding-enabled\"),this.$showFoldWidgets=e,this.$padding=null},this.getShowFoldWidgets=function(){return this.$showFoldWidgets},this.$computePadding=function(){if(!this.element.firstChild)return{left:0,right:0};var e=r.computedStyle(this.element.firstChild);return this.$padding={},this.$padding.left=parseInt(e.paddingLeft)+1||0,this.$padding.right=parseInt(e.paddingRight)||0,this.$padding},this.getRegion=function(e){var t=this.$padding||this.$computePadding(),n=this.element.getBoundingClientRect();if(e.x<t.left+n.left)return\"markers\";if(this.$showFoldWidgets&&e.x>n.right-t.right)return\"foldWidgets\"}}).call(u.prototype),t.Gutter=u}),define(\"ace/layer/marker\",[\"require\",\"exports\",\"module\",\"ace/range\",\"ace/lib/dom\"],function(e,t,n){\"use strict\";var r=e(\"../range\").Range,i=e(\"../lib/dom\"),s=function(e){this.element=i.createElement(\"div\"),this.element.className=\"ace_layer ace_marker-layer\",e.appendChild(this.element)};(function(){function e(e,t,n,r){return(e?1:0)|(t?2:0)|(n?4:0)|(r?8:0)}this.$padding=0,this.setPadding=function(e){this.$padding=e},this.setSession=function(e){this.session=e},this.setMarkers=function(e){this.markers=e},this.update=function(e){if(!e)return;this.config=e;var t=[];for(var n in this.markers){var r=this.markers[n];if(!r.range){r.update(t,this,this.session,e);continue}var i=r.range.clipRows(e.firstRow,e.lastRow);if(i.isEmpty())continue;i=i.toScreenRange(this.session);if(r.renderer){var s=this.$getTop(i.start.row,e),o=this.$padding+i.start.column*e.characterWidth;r.renderer(t,i,o,s,e)}else r.type==\"fullLine\"?this.drawFullLineMarker(t,i,r.clazz,e):r.type==\"screenLine\"?this.drawScreenLineMarker(t,i,r.clazz,e):i.isMultiLine()?r.type==\"text\"?this.drawTextMarker(t,i,r.clazz,e):this.drawMultiLineMarker(t,i,r.clazz,e):this.drawSingleLineMarker(t,i,r.clazz+\" ace_start\"+\" ace_br15\",e)}this.element.innerHTML=t.join(\"\")},this.$getTop=function(e,t){return(e-t.firstRowScreen)*t.lineHeight},this.drawTextMarker=function(t,n,i,s,o){var u=this.session,a=n.start.row,f=n.end.row,l=a,c=0,h=0,p=u.getScreenLastRowColumn(l),d=new r(l,n.start.column,l,h);for(;l<=f;l++)d.start.row=d.end.row=l,d.start.column=l==a?n.start.column:u.getRowWrapIndent(l),d.end.column=p,c=h,h=p,p=l+1<f?u.getScreenLastRowColumn(l+1):l==f?0:n.end.column,this.drawSingleLineMarker(t,d,i+(l==a?\" ace_start\":\"\")+\" ace_br\"+e(l==a||l==a+1&&n.start.column,c<h,h>p,l==f),s,l==f?0:1,o)},this.drawMultiLineMarker=function(e,t,n,r,i){var s=this.$padding,o=r.lineHeight,u=this.$getTop(t.start.row,r),a=s+t.start.column*r.characterWidth;i=i||\"\",e.push(\"<div class='\",n,\" ace_br1 ace_start' style='\",\"height:\",o,\"px;\",\"right:0;\",\"top:\",u,\"px;\",\"left:\",a,\"px;\",i,\"'></div>\"),u=this.$getTop(t.end.row,r);var f=t.end.column*r.characterWidth;e.push(\"<div class='\",n,\" ace_br12' style='\",\"height:\",o,\"px;\",\"width:\",f,\"px;\",\"top:\",u,\"px;\",\"left:\",s,\"px;\",i,\"'></div>\"),o=(t.end.row-t.start.row-1)*r.lineHeight;if(o<=0)return;u=this.$getTop(t.start.row+1,r);var l=(t.start.column?1:0)|(t.end.column?0:8);e.push(\"<div class='\",n,l?\" ace_br\"+l:\"\",\"' style='\",\"height:\",o,\"px;\",\"right:0;\",\"top:\",u,\"px;\",\"left:\",s,\"px;\",i,\"'></div>\")},this.drawSingleLineMarker=function(e,t,n,r,i,s){var o=r.lineHeight,u=(t.end.column+(i||0)-t.start.column)*r.characterWidth,a=this.$getTop(t.start.row,r),f=this.$padding+t.start.column*r.characterWidth;e.push(\"<div class='\",n,\"' style='\",\"height:\",o,\"px;\",\"width:\",u,\"px;\",\"top:\",a,\"px;\",\"left:\",f,\"px;\",s||\"\",\"'></div>\")},this.drawFullLineMarker=function(e,t,n,r,i){var s=this.$getTop(t.start.row,r),o=r.lineHeight;t.start.row!=t.end.row&&(o+=this.$getTop(t.end.row,r)-s),e.push(\"<div class='\",n,\"' style='\",\"height:\",o,\"px;\",\"top:\",s,\"px;\",\"left:0;right:0;\",i||\"\",\"'></div>\")},this.drawScreenLineMarker=function(e,t,n,r,i){var s=this.$getTop(t.start.row,r),o=r.lineHeight;e.push(\"<div class='\",n,\"' style='\",\"height:\",o,\"px;\",\"top:\",s,\"px;\",\"left:0;right:0;\",i||\"\",\"'></div>\")}}).call(s.prototype),t.Marker=s}),define(\"ace/layer/text\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/dom\",\"ace/lib/lang\",\"ace/lib/useragent\",\"ace/lib/event_emitter\"],function(e,t,n){\"use strict\";var r=e(\"../lib/oop\"),i=e(\"../lib/dom\"),s=e(\"../lib/lang\"),o=e(\"../lib/useragent\"),u=e(\"../lib/event_emitter\").EventEmitter,a=function(e){this.element=i.createElement(\"div\"),this.element.className=\"ace_layer ace_text-layer\",e.appendChild(this.element),this.$updateEolChar=this.$updateEolChar.bind(this)};(function(){r.implement(this,u),this.EOF_CHAR=\"\\u00b6\",this.EOL_CHAR_LF=\"\\u00ac\",this.EOL_CHAR_CRLF=\"\\u00a4\",this.EOL_CHAR=this.EOL_CHAR_LF,this.TAB_CHAR=\"\\u2014\",this.SPACE_CHAR=\"\\u00b7\",this.$padding=0,this.$updateEolChar=function(){var e=this.session.doc.getNewLineCharacter()==\"\\n\"?this.EOL_CHAR_LF:this.EOL_CHAR_CRLF;if(this.EOL_CHAR!=e)return this.EOL_CHAR=e,!0},this.setPadding=function(e){this.$padding=e,this.element.style.padding=\"0 \"+e+\"px\"},this.getLineHeight=function(){return this.$fontMetrics.$characterSize.height||0},this.getCharacterWidth=function(){return this.$fontMetrics.$characterSize.width||0},this.$setFontMetrics=function(e){this.$fontMetrics=e,this.$fontMetrics.on(\"changeCharacterSize\",function(e){this._signal(\"changeCharacterSize\",e)}.bind(this)),this.$pollSizeChanges()},this.checkForSizeChanges=function(){this.$fontMetrics.checkForSizeChanges()},this.$pollSizeChanges=function(){return this.$pollSizeChangesTimer=this.$fontMetrics.$pollSizeChanges()},this.setSession=function(e){this.session=e,e&&this.$computeTabString()},this.showInvisibles=!1,this.setShowInvisibles=function(e){return this.showInvisibles==e?!1:(this.showInvisibles=e,this.$computeTabString(),!0)},this.displayIndentGuides=!0,this.setDisplayIndentGuides=function(e){return this.displayIndentGuides==e?!1:(this.displayIndentGuides=e,this.$computeTabString(),!0)},this.$tabStrings=[],this.onChangeTabSize=this.$computeTabString=function(){var e=this.session.getTabSize();this.tabSize=e;var t=this.$tabStrings=[0];for(var n=1;n<e+1;n++)this.showInvisibles?t.push(\"<span class='ace_invisible ace_invisible_tab'>\"+s.stringRepeat(this.TAB_CHAR,n)+\"</span>\"):t.push(s.stringRepeat(\" \",n));if(this.displayIndentGuides){this.$indentGuideRe=/\\s\\S| \\t|\\t |\\s$/;var r=\"ace_indent-guide\",i=\"\",o=\"\";if(this.showInvisibles){r+=\" ace_invisible\",i=\" ace_invisible_space\",o=\" ace_invisible_tab\";var u=s.stringRepeat(this.SPACE_CHAR,this.tabSize),a=s.stringRepeat(this.TAB_CHAR,this.tabSize)}else var u=s.stringRepeat(\" \",this.tabSize),a=u;this.$tabStrings[\" \"]=\"<span class='\"+r+i+\"'>\"+u+\"</span>\",this.$tabStrings[\"\t\"]=\"<span class='\"+r+o+\"'>\"+a+\"</span>\"}},this.updateLines=function(e,t,n){(this.config.lastRow!=e.lastRow||this.config.firstRow!=e.firstRow)&&this.scrollLines(e),this.config=e;var r=Math.max(t,e.firstRow),i=Math.min(n,e.lastRow),s=this.element.childNodes,o=0;for(var u=e.firstRow;u<r;u++){var a=this.session.getFoldLine(u);if(a){if(a.containsRow(r)){r=a.start.row;break}u=a.end.row}o++}var u=r,a=this.session.getNextFoldLine(u),f=a?a.start.row:Infinity;for(;;){u>f&&(u=a.end.row+1,a=this.session.getNextFoldLine(u,a),f=a?a.start.row:Infinity);if(u>i)break;var l=s[o++];if(l){var c=[];this.$renderLine(c,u,!this.$useLineGroups(),u==f?a:!1),l.style.height=e.lineHeight*this.session.getRowLength(u)+\"px\",l.innerHTML=c.join(\"\")}u++}},this.scrollLines=function(e){var t=this.config;this.config=e;if(!t||t.lastRow<e.firstRow)return this.update(e);if(e.lastRow<t.firstRow)return this.update(e);var n=this.element;if(t.firstRow<e.firstRow)for(var r=this.session.getFoldedRowCount(t.firstRow,e.firstRow-1);r>0;r--)n.removeChild(n.firstChild);if(t.lastRow>e.lastRow)for(var r=this.session.getFoldedRowCount(e.lastRow+1,t.lastRow);r>0;r--)n.removeChild(n.lastChild);if(e.firstRow<t.firstRow){var i=this.$renderLinesFragment(e,e.firstRow,t.firstRow-1);n.firstChild?n.insertBefore(i,n.firstChild):n.appendChild(i)}if(e.lastRow>t.lastRow){var i=this.$renderLinesFragment(e,t.lastRow+1,e.lastRow);n.appendChild(i)}},this.$renderLinesFragment=function(e,t,n){var r=this.element.ownerDocument.createDocumentFragment(),s=t,o=this.session.getNextFoldLine(s),u=o?o.start.row:Infinity;for(;;){s>u&&(s=o.end.row+1,o=this.session.getNextFoldLine(s,o),u=o?o.start.row:Infinity);if(s>n)break;var a=i.createElement(\"div\"),f=[];this.$renderLine(f,s,!1,s==u?o:!1),a.innerHTML=f.join(\"\");if(this.$useLineGroups())a.className=\"ace_line_group\",r.appendChild(a),a.style.height=e.lineHeight*this.session.getRowLength(s)+\"px\";else while(a.firstChild)r.appendChild(a.firstChild);s++}return r},this.update=function(e){this.config=e;var t=[],n=e.firstRow,r=e.lastRow,i=n,s=this.session.getNextFoldLine(i),o=s?s.start.row:Infinity;for(;;){i>o&&(i=s.end.row+1,s=this.session.getNextFoldLine(i,s),o=s?s.start.row:Infinity);if(i>r)break;this.$useLineGroups()&&t.push(\"<div class='ace_line_group' style='height:\",e.lineHeight*this.session.getRowLength(i),\"px'>\"),this.$renderLine(t,i,!1,i==o?s:!1),this.$useLineGroups()&&t.push(\"</div>\"),i++}this.element.innerHTML=t.join(\"\")},this.$textToken={text:!0,rparen:!0,lparen:!0},this.$renderToken=function(e,t,n,r){var i=this,o=/\\t|&|<|>|( +)|([\\x00-\\x1f\\x80-\\xa0\\xad\\u1680\\u180E\\u2000-\\u200f\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF\\uFFF9-\\uFFFC])|[\\u1100-\\u115F\\u11A3-\\u11A7\\u11FA-\\u11FF\\u2329-\\u232A\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u2FF0-\\u2FFB\\u3000-\\u303E\\u3041-\\u3096\\u3099-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u3190-\\u31BA\\u31C0-\\u31E3\\u31F0-\\u321E\\u3220-\\u3247\\u3250-\\u32FE\\u3300-\\u4DBF\\u4E00-\\uA48C\\uA490-\\uA4C6\\uA960-\\uA97C\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFAFF\\uFE10-\\uFE19\\uFE30-\\uFE52\\uFE54-\\uFE66\\uFE68-\\uFE6B\\uFF01-\\uFF60\\uFFE0-\\uFFE6]/g,u=function(e,n,r,o,u){if(n)return i.showInvisibles?\"<span class='ace_invisible ace_invisible_space'>\"+s.stringRepeat(i.SPACE_CHAR,e.length)+\"</span>\":e;if(e==\"&\")return\"&#38;\";if(e==\"<\")return\"&#60;\";if(e==\">\")return\"&#62;\";if(e==\"\t\"){var a=i.session.getScreenTabSize(t+o);return t+=a-1,i.$tabStrings[a]}if(e==\"\\u3000\"){var f=i.showInvisibles?\"ace_cjk ace_invisible ace_invisible_space\":\"ace_cjk\",l=i.showInvisibles?i.SPACE_CHAR:\"\";return t+=1,\"<span class='\"+f+\"' style='width:\"+i.config.characterWidth*2+\"px'>\"+l+\"</span>\"}return r?\"<span class='ace_invisible ace_invisible_space ace_invalid'>\"+i.SPACE_CHAR+\"</span>\":(t+=1,\"<span class='ace_cjk' style='width:\"+i.config.characterWidth*2+\"px'>\"+e+\"</span>\")},a=r.replace(o,u);if(!this.$textToken[n.type]){var f=\"ace_\"+n.type.replace(/\\./g,\" ace_\"),l=\"\";n.type==\"fold\"&&(l=\" style='width:\"+n.value.length*this.config.characterWidth+\"px;' \"),e.push(\"<span class='\",f,\"'\",l,\">\",a,\"</span>\")}else e.push(a);return t+r.length},this.renderIndentGuide=function(e,t,n){var r=t.search(this.$indentGuideRe);return r<=0||r>=n?t:t[0]==\" \"?(r-=r%this.tabSize,e.push(s.stringRepeat(this.$tabStrings[\" \"],r/this.tabSize)),t.substr(r)):t[0]==\"\t\"?(e.push(s.stringRepeat(this.$tabStrings[\"\t\"],r)),t.substr(r)):t},this.$renderWrappedLine=function(e,t,n,r){var i=0,o=0,u=n[0],a=0;for(var f=0;f<t.length;f++){var l=t[f],c=l.value;if(f==0&&this.displayIndentGuides){i=c.length,c=this.renderIndentGuide(e,c,u);if(!c)continue;i-=c.length}if(i+c.length<u)a=this.$renderToken(e,a,l,c),i+=c.length;else{while(i+c.length>=u)a=this.$renderToken(e,a,l,c.substring(0,u-i)),c=c.substring(u-i),i=u,r||e.push(\"</div>\",\"<div class='ace_line' style='height:\",this.config.lineHeight,\"px'>\"),e.push(s.stringRepeat(\"\\u00a0\",n.indent)),o++,a=0,u=n[o]||Number.MAX_VALUE;c.length!=0&&(i+=c.length,a=this.$renderToken(e,a,l,c))}}},this.$renderSimpleLine=function(e,t){var n=0,r=t[0],i=r.value;this.displayIndentGuides&&(i=this.renderIndentGuide(e,i)),i&&(n=this.$renderToken(e,n,r,i));for(var s=1;s<t.length;s++)r=t[s],i=r.value,n=this.$renderToken(e,n,r,i)},this.$renderLine=function(e,t,n,r){!r&&r!=0&&(r=this.session.getFoldLine(t));if(r)var i=this.$getFoldLineTokens(t,r);else var i=this.session.getTokens(t);n||e.push(\"<div class='ace_line' style='height:\",this.config.lineHeight*(this.$useLineGroups()?1:this.session.getRowLength(t)),\"px'>\");if(i.length){var s=this.session.getRowSplitData(t);s&&s.length?this.$renderWrappedLine(e,i,s,n):this.$renderSimpleLine(e,i)}this.showInvisibles&&(r&&(t=r.end.row),e.push(\"<span class='ace_invisible ace_invisible_eol'>\",t==this.session.getLength()-1?this.EOF_CHAR:this.EOL_CHAR,\"</span>\")),n||e.push(\"</div>\")},this.$getFoldLineTokens=function(e,t){function i(e,t,n){var i=0,s=0;while(s+e[i].value.length<t){s+=e[i].value.length,i++;if(i==e.length)return}if(s!=t){var o=e[i].value.substring(t-s);o.length>n-t&&(o=o.substring(0,n-t)),r.push({type:e[i].type,value:o}),s=t+o.length,i+=1}while(s<n&&i<e.length){var o=e[i].value;o.length+s>n?r.push({type:e[i].type,value:o.substring(0,n-s)}):r.push(e[i]),s+=o.length,i+=1}}var n=this.session,r=[],s=n.getTokens(e);return t.walk(function(e,t,o,u,a){e!=null?r.push({type:\"fold\",value:e}):(a&&(s=n.getTokens(t)),s.length&&i(s,u,o))},t.end.row,this.session.getLine(t.end.row).length),r},this.$useLineGroups=function(){return this.session.getUseWrapMode()},this.destroy=function(){clearInterval(this.$pollSizeChangesTimer),this.$measureNode&&this.$measureNode.parentNode.removeChild(this.$measureNode),delete this.$measureNode}}).call(a.prototype),t.Text=a}),define(\"ace/layer/cursor\",[\"require\",\"exports\",\"module\",\"ace/lib/dom\"],function(e,t,n){\"use strict\";var r=e(\"../lib/dom\"),i,s=function(e){this.element=r.createElement(\"div\"),this.element.className=\"ace_layer ace_cursor-layer\",e.appendChild(this.element),i===undefined&&(i=!(\"opacity\"in this.element.style)),this.isVisible=!1,this.isBlinking=!0,this.blinkInterval=1e3,this.smoothBlinking=!1,this.cursors=[],this.cursor=this.addCursor(),r.addCssClass(this.element,\"ace_hidden-cursors\"),this.$updateCursors=(i?this.$updateVisibility:this.$updateOpacity).bind(this)};(function(){this.$updateVisibility=function(e){var t=this.cursors;for(var n=t.length;n--;)t[n].style.visibility=e?\"\":\"hidden\"},this.$updateOpacity=function(e){var t=this.cursors;for(var n=t.length;n--;)t[n].style.opacity=e?\"\":\"0\"},this.$padding=0,this.setPadding=function(e){this.$padding=e},this.setSession=function(e){this.session=e},this.setBlinking=function(e){e!=this.isBlinking&&(this.isBlinking=e,this.restartTimer())},this.setBlinkInterval=function(e){e!=this.blinkInterval&&(this.blinkInterval=e,this.restartTimer())},this.setSmoothBlinking=function(e){e!=this.smoothBlinking&&!i&&(this.smoothBlinking=e,r.setCssClass(this.element,\"ace_smooth-blinking\",e),this.$updateCursors(!0),this.$updateCursors=this.$updateOpacity.bind(this),this.restartTimer())},this.addCursor=function(){var e=r.createElement(\"div\");return e.className=\"ace_cursor\",this.element.appendChild(e),this.cursors.push(e),e},this.removeCursor=function(){if(this.cursors.length>1){var e=this.cursors.pop();return e.parentNode.removeChild(e),e}},this.hideCursor=function(){this.isVisible=!1,r.addCssClass(this.element,\"ace_hidden-cursors\"),this.restartTimer()},this.showCursor=function(){this.isVisible=!0,r.removeCssClass(this.element,\"ace_hidden-cursors\"),this.restartTimer()},this.restartTimer=function(){var e=this.$updateCursors;clearInterval(this.intervalId),clearTimeout(this.timeoutId),this.smoothBlinking&&r.removeCssClass(this.element,\"ace_smooth-blinking\"),e(!0);if(!this.isBlinking||!this.blinkInterval||!this.isVisible)return;this.smoothBlinking&&setTimeout(function(){r.addCssClass(this.element,\"ace_smooth-blinking\")}.bind(this));var t=function(){this.timeoutId=setTimeout(function(){e(!1)},.6*this.blinkInterval)}.bind(this);this.intervalId=setInterval(function(){e(!0),t()},this.blinkInterval),t()},this.getPixelPosition=function(e,t){if(!this.config||!this.session)return{left:0,top:0};e||(e=this.session.selection.getCursor());var n=this.session.documentToScreenPosition(e),r=this.$padding+n.column*this.config.characterWidth,i=(n.row-(t?this.config.firstRowScreen:0))*this.config.lineHeight;return{left:r,top:i}},this.update=function(e){this.config=e;var t=this.session.$selectionMarkers,n=0,r=0;if(t===undefined||t.length===0)t=[{cursor:null}];for(var n=0,i=t.length;n<i;n++){var s=this.getPixelPosition(t[n].cursor,!0);if((s.top>e.height+e.offset||s.top<0)&&n>1)continue;var o=(this.cursors[r++]||this.addCursor()).style;this.drawCursor?this.drawCursor(o,s,e,t[n],this.session):(o.left=s.left+\"px\",o.top=s.top+\"px\",o.width=e.characterWidth+\"px\",o.height=e.lineHeight+\"px\")}while(this.cursors.length>r)this.removeCursor();var u=this.session.getOverwrite();this.$setOverwrite(u),this.$pixelPos=s,this.restartTimer()},this.drawCursor=null,this.$setOverwrite=function(e){e!=this.overwrite&&(this.overwrite=e,e?r.addCssClass(this.element,\"ace_overwrite-cursors\"):r.removeCssClass(this.element,\"ace_overwrite-cursors\"))},this.destroy=function(){clearInterval(this.intervalId),clearTimeout(this.timeoutId)}}).call(s.prototype),t.Cursor=s}),define(\"ace/scrollbar\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/dom\",\"ace/lib/event\",\"ace/lib/event_emitter\"],function(e,t,n){\"use strict\";var r=e(\"./lib/oop\"),i=e(\"./lib/dom\"),s=e(\"./lib/event\"),o=e(\"./lib/event_emitter\").EventEmitter,u=32768,a=function(e){this.element=i.createElement(\"div\"),this.element.className=\"ace_scrollbar ace_scrollbar\"+this.classSuffix,this.inner=i.createElement(\"div\"),this.inner.className=\"ace_scrollbar-inner\",this.element.appendChild(this.inner),e.appendChild(this.element),this.setVisible(!1),this.skipEvent=!1,s.addListener(this.element,\"scroll\",this.onScroll.bind(this)),s.addListener(this.element,\"mousedown\",s.preventDefault)};(function(){r.implement(this,o),this.setVisible=function(e){this.element.style.display=e?\"\":\"none\",this.isVisible=e,this.coeff=1}}).call(a.prototype);var f=function(e,t){a.call(this,e),this.scrollTop=0,this.scrollHeight=0,t.$scrollbarWidth=this.width=i.scrollbarWidth(e.ownerDocument),this.inner.style.width=this.element.style.width=(this.width||15)+5+\"px\",this.$minWidth=0};r.inherits(f,a),function(){this.classSuffix=\"-v\",this.onScroll=function(){if(!this.skipEvent){this.scrollTop=this.element.scrollTop;if(this.coeff!=1){var e=this.element.clientHeight/this.scrollHeight;this.scrollTop=this.scrollTop*(1-e)/(this.coeff-e)}this._emit(\"scroll\",{data:this.scrollTop})}this.skipEvent=!1},this.getWidth=function(){return Math.max(this.isVisible?this.width:0,this.$minWidth||0)},this.setHeight=function(e){this.element.style.height=e+\"px\"},this.setInnerHeight=this.setScrollHeight=function(e){this.scrollHeight=e,e>u?(this.coeff=u/e,e=u):this.coeff!=1&&(this.coeff=1),this.inner.style.height=e+\"px\"},this.setScrollTop=function(e){this.scrollTop!=e&&(this.skipEvent=!0,this.scrollTop=e,this.element.scrollTop=e*this.coeff)}}.call(f.prototype);var l=function(e,t){a.call(this,e),this.scrollLeft=0,this.height=t.$scrollbarWidth,this.inner.style.height=this.element.style.height=(this.height||15)+5+\"px\"};r.inherits(l,a),function(){this.classSuffix=\"-h\",this.onScroll=function(){this.skipEvent||(this.scrollLeft=this.element.scrollLeft,this._emit(\"scroll\",{data:this.scrollLeft})),this.skipEvent=!1},this.getHeight=function(){return this.isVisible?this.height:0},this.setWidth=function(e){this.element.style.width=e+\"px\"},this.setInnerWidth=function(e){this.inner.style.width=e+\"px\"},this.setScrollWidth=function(e){this.inner.style.width=e+\"px\"},this.setScrollLeft=function(e){this.scrollLeft!=e&&(this.skipEvent=!0,this.scrollLeft=this.element.scrollLeft=e)}}.call(l.prototype),t.ScrollBar=f,t.ScrollBarV=f,t.ScrollBarH=l,t.VScrollBar=f,t.HScrollBar=l}),define(\"ace/renderloop\",[\"require\",\"exports\",\"module\",\"ace/lib/event\"],function(e,t,n){\"use strict\";var r=e(\"./lib/event\"),i=function(e,t){this.onRender=e,this.pending=!1,this.changes=0,this.window=t||window};(function(){this.schedule=function(e){this.changes=this.changes|e;if(!this.pending&&this.changes){this.pending=!0;var t=this;r.nextFrame(function(){t.pending=!1;var e;while(e=t.changes)t.changes=0,t.onRender(e)},this.window)}}}).call(i.prototype),t.RenderLoop=i}),define(\"ace/layer/font_metrics\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/dom\",\"ace/lib/lang\",\"ace/lib/useragent\",\"ace/lib/event_emitter\"],function(e,t,n){var r=e(\"../lib/oop\"),i=e(\"../lib/dom\"),s=e(\"../lib/lang\"),o=e(\"../lib/useragent\"),u=e(\"../lib/event_emitter\").EventEmitter,a=0,f=t.FontMetrics=function(e){this.el=i.createElement(\"div\"),this.$setMeasureNodeStyles(this.el.style,!0),this.$main=i.createElement(\"div\"),this.$setMeasureNodeStyles(this.$main.style),this.$measureNode=i.createElement(\"div\"),this.$setMeasureNodeStyles(this.$measureNode.style),this.el.appendChild(this.$main),this.el.appendChild(this.$measureNode),e.appendChild(this.el),a||this.$testFractionalRect(),this.$measureNode.innerHTML=s.stringRepeat(\"X\",a),this.$characterSize={width:0,height:0},this.checkForSizeChanges()};(function(){r.implement(this,u),this.$characterSize={width:0,height:0},this.$testFractionalRect=function(){var e=i.createElement(\"div\");this.$setMeasureNodeStyles(e.style),e.style.width=\"0.2px\",document.documentElement.appendChild(e);var t=e.getBoundingClientRect().width;t>0&&t<1?a=50:a=100,e.parentNode.removeChild(e)},this.$setMeasureNodeStyles=function(e,t){e.width=e.height=\"auto\",e.left=e.top=\"0px\",e.visibility=\"hidden\",e.position=\"absolute\",e.whiteSpace=\"pre\",o.isIE<8?e[\"font-family\"]=\"inherit\":e.font=\"inherit\",e.overflow=t?\"hidden\":\"visible\"},this.checkForSizeChanges=function(){var e=this.$measureSizes();if(e&&(this.$characterSize.width!==e.width||this.$characterSize.height!==e.height)){this.$measureNode.style.fontWeight=\"bold\";var t=this.$measureSizes();this.$measureNode.style.fontWeight=\"\",this.$characterSize=e,this.charSizes=Object.create(null),this.allowBoldFonts=t&&t.width===e.width&&t.height===e.height,this._emit(\"changeCharacterSize\",{data:e})}},this.$pollSizeChanges=function(){if(this.$pollSizeChangesTimer)return this.$pollSizeChangesTimer;var e=this;return this.$pollSizeChangesTimer=setInterval(function(){e.checkForSizeChanges()},500)},this.setPolling=function(e){e?this.$pollSizeChanges():this.$pollSizeChangesTimer&&(clearInterval(this.$pollSizeChangesTimer),this.$pollSizeChangesTimer=0)},this.$measureSizes=function(){if(a===50){var e=null;try{e=this.$measureNode.getBoundingClientRect()}catch(t){e={width:0,height:0}}var n={height:e.height,width:e.width/a}}else var n={height:this.$measureNode.clientHeight,width:this.$measureNode.clientWidth/a};return n.width===0||n.height===0?null:n},this.$measureCharWidth=function(e){this.$main.innerHTML=s.stringRepeat(e,a);var t=this.$main.getBoundingClientRect();return t.width/a},this.getCharacterWidth=function(e){var t=this.charSizes[e];return t===undefined&&(t=this.charSizes[e]=this.$measureCharWidth(e)/this.$characterSize.width),t},this.destroy=function(){clearInterval(this.$pollSizeChangesTimer),this.el&&this.el.parentNode&&this.el.parentNode.removeChild(this.el)}}).call(f.prototype)}),define(\"ace/virtual_renderer\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/dom\",\"ace/config\",\"ace/lib/useragent\",\"ace/layer/gutter\",\"ace/layer/marker\",\"ace/layer/text\",\"ace/layer/cursor\",\"ace/scrollbar\",\"ace/scrollbar\",\"ace/renderloop\",\"ace/layer/font_metrics\",\"ace/lib/event_emitter\"],function(e,t,n){\"use strict\";var r=e(\"./lib/oop\"),i=e(\"./lib/dom\"),s=e(\"./config\"),o=e(\"./lib/useragent\"),u=e(\"./layer/gutter\").Gutter,a=e(\"./layer/marker\").Marker,f=e(\"./layer/text\").Text,l=e(\"./layer/cursor\").Cursor,c=e(\"./scrollbar\").HScrollBar,h=e(\"./scrollbar\").VScrollBar,p=e(\"./renderloop\").RenderLoop,d=e(\"./layer/font_metrics\").FontMetrics,v=e(\"./lib/event_emitter\").EventEmitter,m='.ace_editor {position: relative;overflow: hidden;font: 12px/normal \\'Monaco\\', \\'Menlo\\', \\'Ubuntu Mono\\', \\'Consolas\\', \\'source-code-pro\\', monospace;direction: ltr;text-align: left;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;background-color: inherit;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;cursor: text;}.ace_content {position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;min-width: 100%;}.ace_dragging .ace_scroller:before{position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: \\'\\';background: rgba(250, 250, 250, 0.01);z-index: 1000;}.ace_dragging.ace_dark .ace_scroller:before{background: rgba(0, 0, 0, 0.01);}.ace_selecting, .ace_selecting * {cursor: text !important;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==\");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==\");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=\");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC\");}.ace_scrollbar {position: absolute;right: 0;bottom: 0;z-index: 6;}.ace_scrollbar-inner {position: absolute;cursor: text;left: 0;top: 0;}.ace_scrollbar-v{overflow-x: hidden;overflow-y: scroll;top: 0;}.ace_scrollbar-h {overflow-x: scroll;overflow-y: hidden;left: 0;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;text-indent: -1em;-ms-user-select: text;-moz-user-select: text;-webkit-user-select: text;user-select: text;white-space: pre!important;}.ace_text-input.ace_composition {background: inherit;color: inherit;z-index: 1000;opacity: 1;text-indent: 0;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;word-wrap: normal;white-space: pre;height: 100%;width: 100%;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;}.ace_text-layer {font: inherit !important;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;border-left: 2px solid;transform: translatez(0);}.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_slim-cursors .ace_cursor {border-left-width: 1px;}.ace_overwrite-cursors .ace_cursor {border-left-width: 0;border-bottom: 1px solid;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_smooth-blinking .ace_cursor {-webkit-transition: opacity 0.18s;transition: opacity 0.18s;}.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}.ace_line .ace_fold {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII=\"),url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=\");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII=\"),url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC\");}.ace_tooltip {background-color: #FFF;background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.1));background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;max-width: 100%;padding: 3px 4px;position: fixed;z-index: 999999;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: default;white-space: pre;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;pointer-events: none;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==\");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;cursor: pointer;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==\");}.ace_fold-widget.ace_closed {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==\");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}.ace_dark .ace_fold-widget {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC\");}.ace_dark .ace_fold-widget.ace_end {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==\");}.ace_dark .ace_fold-widget.ace_closed {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==\");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {-webkit-transition: opacity 0.4s ease 0.05s;transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {-webkit-transition: opacity 0.05s ease 0.05s;transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}.ace_error-marker {background-color: rgba(255, 0, 0,0.2);position: absolute;z-index: 9;}.ace_highlight-marker {background-color: rgba(255, 255, 0,0.2);position: absolute;z-index: 8;}.ace_br1 {border-top-left-radius    : 3px;}.ace_br2 {border-top-right-radius   : 3px;}.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}.ace_br4 {border-bottom-right-radius: 3px;}.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}.ace_br8 {border-bottom-left-radius : 3px;}.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}.ace_text-input-ios {position: absolute !important;top: -100000px !important;left: -100000px !important;}';i.importCssString(m,\"ace_editor.css\");var g=function(e,t){var n=this;this.container=e||i.createElement(\"div\"),this.$keepTextAreaAtCursor=!o.isOldIE,i.addCssClass(this.container,\"ace_editor\"),this.setTheme(t),this.$gutter=i.createElement(\"div\"),this.$gutter.className=\"ace_gutter\",this.container.appendChild(this.$gutter),this.scroller=i.createElement(\"div\"),this.scroller.className=\"ace_scroller\",this.container.appendChild(this.scroller),this.content=i.createElement(\"div\"),this.content.className=\"ace_content\",this.scroller.appendChild(this.content),this.$gutterLayer=new u(this.$gutter),this.$gutterLayer.on(\"changeGutterWidth\",this.onGutterResize.bind(this)),this.$markerBack=new a(this.content);var r=this.$textLayer=new f(this.content);this.canvas=r.element,this.$markerFront=new a(this.content),this.$cursorLayer=new l(this.content),this.$horizScroll=!1,this.$vScroll=!1,this.scrollBar=this.scrollBarV=new h(this.container,this),this.scrollBarH=new c(this.container,this),this.scrollBarV.addEventListener(\"scroll\",function(e){n.$scrollAnimation||n.session.setScrollTop(e.data-n.scrollMargin.top)}),this.scrollBarH.addEventListener(\"scroll\",function(e){n.$scrollAnimation||n.session.setScrollLeft(e.data-n.scrollMargin.left)}),this.scrollTop=0,this.scrollLeft=0,this.cursorPos={row:0,column:0},this.$fontMetrics=new d(this.container),this.$textLayer.$setFontMetrics(this.$fontMetrics),this.$textLayer.addEventListener(\"changeCharacterSize\",function(e){n.updateCharacterSize(),n.onResize(!0,n.gutterWidth,n.$size.width,n.$size.height),n._signal(\"changeCharacterSize\",e)}),this.$size={width:0,height:0,scrollerHeight:0,scrollerWidth:0,$dirty:!0},this.layerConfig={width:1,padding:0,firstRow:0,firstRowScreen:0,lastRow:0,lineHeight:0,characterWidth:0,minHeight:1,maxHeight:1,offset:0,height:1,gutterOffset:1},this.scrollMargin={left:0,right:0,top:0,bottom:0,v:0,h:0},this.$loop=new p(this.$renderChanges.bind(this),this.container.ownerDocument.defaultView),this.$loop.schedule(this.CHANGE_FULL),this.updateCharacterSize(),this.setPadding(4),s.resetOptions(this),s._emit(\"renderer\",this)};(function(){this.CHANGE_CURSOR=1,this.CHANGE_MARKER=2,this.CHANGE_GUTTER=4,this.CHANGE_SCROLL=8,this.CHANGE_LINES=16,this.CHANGE_TEXT=32,this.CHANGE_SIZE=64,this.CHANGE_MARKER_BACK=128,this.CHANGE_MARKER_FRONT=256,this.CHANGE_FULL=512,this.CHANGE_H_SCROLL=1024,r.implement(this,v),this.updateCharacterSize=function(){this.$textLayer.allowBoldFonts!=this.$allowBoldFonts&&(this.$allowBoldFonts=this.$textLayer.allowBoldFonts,this.setStyle(\"ace_nobold\",!this.$allowBoldFonts)),this.layerConfig.characterWidth=this.characterWidth=this.$textLayer.getCharacterWidth(),this.layerConfig.lineHeight=this.lineHeight=this.$textLayer.getLineHeight(),this.$updatePrintMargin()},this.setSession=function(e){this.session&&this.session.doc.off(\"changeNewLineMode\",this.onChangeNewLineMode),this.session=e,e&&this.scrollMargin.top&&e.getScrollTop()<=0&&e.setScrollTop(-this.scrollMargin.top),this.$cursorLayer.setSession(e),this.$markerBack.setSession(e),this.$markerFront.setSession(e),this.$gutterLayer.setSession(e),this.$textLayer.setSession(e);if(!e)return;this.$loop.schedule(this.CHANGE_FULL),this.session.$setFontMetrics(this.$fontMetrics),this.scrollBarH.scrollLeft=this.scrollBarV.scrollTop=null,this.onChangeNewLineMode=this.onChangeNewLineMode.bind(this),this.onChangeNewLineMode(),this.session.doc.on(\"changeNewLineMode\",this.onChangeNewLineMode)},this.updateLines=function(e,t,n){t===undefined&&(t=Infinity),this.$changedLines?(this.$changedLines.firstRow>e&&(this.$changedLines.firstRow=e),this.$changedLines.lastRow<t&&(this.$changedLines.lastRow=t)):this.$changedLines={firstRow:e,lastRow:t};if(this.$changedLines.lastRow<this.layerConfig.firstRow){if(!n)return;this.$changedLines.lastRow=this.layerConfig.lastRow}if(this.$changedLines.firstRow>this.layerConfig.lastRow)return;this.$loop.schedule(this.CHANGE_LINES)},this.onChangeNewLineMode=function(){this.$loop.schedule(this.CHANGE_TEXT),this.$textLayer.$updateEolChar()},this.onChangeTabSize=function(){this.$loop.schedule(this.CHANGE_TEXT|this.CHANGE_MARKER),this.$textLayer.onChangeTabSize()},this.updateText=function(){this.$loop.schedule(this.CHANGE_TEXT)},this.updateFull=function(e){e?this.$renderChanges(this.CHANGE_FULL,!0):this.$loop.schedule(this.CHANGE_FULL)},this.updateFontSize=function(){this.$textLayer.checkForSizeChanges()},this.$changes=0,this.$updateSizeAsync=function(){this.$loop.pending?this.$size.$dirty=!0:this.onResize()},this.onResize=function(e,t,n,r){if(this.resizing>2)return;this.resizing>0?this.resizing++:this.resizing=e?1:0;var i=this.container;r||(r=i.clientHeight||i.scrollHeight),n||(n=i.clientWidth||i.scrollWidth);var s=this.$updateCachedSize(e,t,n,r);if(!this.$size.scrollerHeight||!n&&!r)return this.resizing=0;e&&(this.$gutterLayer.$padding=null),e?this.$renderChanges(s|this.$changes,!0):this.$loop.schedule(s|this.$changes),this.resizing&&(this.resizing=0),this.scrollBarV.scrollLeft=this.scrollBarV.scrollTop=null},this.$updateCachedSize=function(e,t,n,r){r-=this.$extraHeight||0;var i=0,s=this.$size,o={width:s.width,height:s.height,scrollerHeight:s.scrollerHeight,scrollerWidth:s.scrollerWidth};r&&(e||s.height!=r)&&(s.height=r,i|=this.CHANGE_SIZE,s.scrollerHeight=s.height,this.$horizScroll&&(s.scrollerHeight-=this.scrollBarH.getHeight()),this.scrollBarV.element.style.bottom=this.scrollBarH.getHeight()+\"px\",i|=this.CHANGE_SCROLL);if(n&&(e||s.width!=n)){i|=this.CHANGE_SIZE,s.width=n,t==null&&(t=this.$showGutter?this.$gutter.offsetWidth:0),this.gutterWidth=t,this.scrollBarH.element.style.left=this.scroller.style.left=t+\"px\",s.scrollerWidth=Math.max(0,n-t-this.scrollBarV.getWidth()),this.scrollBarH.element.style.right=this.scroller.style.right=this.scrollBarV.getWidth()+\"px\",this.scroller.style.bottom=this.scrollBarH.getHeight()+\"px\";if(this.session&&this.session.getUseWrapMode()&&this.adjustWrapLimit()||e)i|=this.CHANGE_FULL}return s.$dirty=!n||!r,i&&this._signal(\"resize\",o),i},this.onGutterResize=function(){var e=this.$showGutter?this.$gutter.offsetWidth:0;e!=this.gutterWidth&&(this.$changes|=this.$updateCachedSize(!0,e,this.$size.width,this.$size.height)),this.session.getUseWrapMode()&&this.adjustWrapLimit()?this.$loop.schedule(this.CHANGE_FULL):this.$size.$dirty?this.$loop.schedule(this.CHANGE_FULL):(this.$computeLayerConfig(),this.$loop.schedule(this.CHANGE_MARKER))},this.adjustWrapLimit=function(){var e=this.$size.scrollerWidth-this.$padding*2,t=Math.floor(e/this.characterWidth);return this.session.adjustWrapLimit(t,this.$showPrintMargin&&this.$printMarginColumn)},this.setAnimatedScroll=function(e){this.setOption(\"animatedScroll\",e)},this.getAnimatedScroll=function(){return this.$animatedScroll},this.setShowInvisibles=function(e){this.setOption(\"showInvisibles\",e)},this.getShowInvisibles=function(){return this.getOption(\"showInvisibles\")},this.getDisplayIndentGuides=function(){return this.getOption(\"displayIndentGuides\")},this.setDisplayIndentGuides=function(e){this.setOption(\"displayIndentGuides\",e)},this.setShowPrintMargin=function(e){this.setOption(\"showPrintMargin\",e)},this.getShowPrintMargin=function(){return this.getOption(\"showPrintMargin\")},this.setPrintMarginColumn=function(e){this.setOption(\"printMarginColumn\",e)},this.getPrintMarginColumn=function(){return this.getOption(\"printMarginColumn\")},this.getShowGutter=function(){return this.getOption(\"showGutter\")},this.setShowGutter=function(e){return this.setOption(\"showGutter\",e)},this.getFadeFoldWidgets=function(){return this.getOption(\"fadeFoldWidgets\")},this.setFadeFoldWidgets=function(e){this.setOption(\"fadeFoldWidgets\",e)},this.setHighlightGutterLine=function(e){this.setOption(\"highlightGutterLine\",e)},this.getHighlightGutterLine=function(){return this.getOption(\"highlightGutterLine\")},this.$updateGutterLineHighlight=function(){var e=this.$cursorLayer.$pixelPos,t=this.layerConfig.lineHeight;if(this.session.getUseWrapMode()){var n=this.session.selection.getCursor();n.column=0,e=this.$cursorLayer.getPixelPosition(n,!0),t*=this.session.getRowLength(n.row)}this.$gutterLineHighlight.style.top=e.top-this.layerConfig.offset+\"px\",this.$gutterLineHighlight.style.height=t+\"px\"},this.$updatePrintMargin=function(){if(!this.$showPrintMargin&&!this.$printMarginEl)return;if(!this.$printMarginEl){var e=i.createElement(\"div\");e.className=\"ace_layer ace_print-margin-layer\",this.$printMarginEl=i.createElement(\"div\"),this.$printMarginEl.className=\"ace_print-margin\",e.appendChild(this.$printMarginEl),this.content.insertBefore(e,this.content.firstChild)}var t=this.$printMarginEl.style;t.left=this.characterWidth*this.$printMarginColumn+this.$padding+\"px\",t.visibility=this.$showPrintMargin?\"visible\":\"hidden\",this.session&&this.session.$wrap==-1&&this.adjustWrapLimit()},this.getContainerElement=function(){return this.container},this.getMouseEventTarget=function(){return this.scroller},this.getTextAreaContainer=function(){return this.container},this.$moveTextAreaToCursor=function(){if(!this.$keepTextAreaAtCursor)return;var e=this.layerConfig,t=this.$cursorLayer.$pixelPos.top,n=this.$cursorLayer.$pixelPos.left;t-=e.offset;var r=this.textarea.style,i=this.lineHeight;if(t<0||t>e.height-i){r.top=r.left=\"0\";return}var s=this.characterWidth;if(this.$composition){var o=this.textarea.value.replace(/^\\x01+/,\"\");s*=this.session.$getStringScreenWidth(o)[0]+2,i+=2}n-=this.scrollLeft,n>this.$size.scrollerWidth-s&&(n=this.$size.scrollerWidth-s),n+=this.gutterWidth,r.height=i+\"px\",r.width=s+\"px\",r.left=Math.min(n,this.$size.scrollerWidth-s)+\"px\",r.top=Math.min(t,this.$size.height-i)+\"px\"},this.getFirstVisibleRow=function(){return this.layerConfig.firstRow},this.getFirstFullyVisibleRow=function(){return this.layerConfig.firstRow+(this.layerConfig.offset===0?0:1)},this.getLastFullyVisibleRow=function(){var e=this.layerConfig,t=e.lastRow,n=this.session.documentToScreenRow(t,0)*e.lineHeight;return n-this.session.getScrollTop()>e.height-e.lineHeight?t-1:t},this.getLastVisibleRow=function(){return this.layerConfig.lastRow},this.$padding=null,this.setPadding=function(e){this.$padding=e,this.$textLayer.setPadding(e),this.$cursorLayer.setPadding(e),this.$markerFront.setPadding(e),this.$markerBack.setPadding(e),this.$loop.schedule(this.CHANGE_FULL),this.$updatePrintMargin()},this.setScrollMargin=function(e,t,n,r){var i=this.scrollMargin;i.top=e|0,i.bottom=t|0,i.right=r|0,i.left=n|0,i.v=i.top+i.bottom,i.h=i.left+i.right,i.top&&this.scrollTop<=0&&this.session&&this.session.setScrollTop(-i.top),this.updateFull()},this.getHScrollBarAlwaysVisible=function(){return this.$hScrollBarAlwaysVisible},this.setHScrollBarAlwaysVisible=function(e){this.setOption(\"hScrollBarAlwaysVisible\",e)},this.getVScrollBarAlwaysVisible=function(){return this.$vScrollBarAlwaysVisible},this.setVScrollBarAlwaysVisible=function(e){this.setOption(\"vScrollBarAlwaysVisible\",e)},this.$updateScrollBarV=function(){var e=this.layerConfig.maxHeight,t=this.$size.scrollerHeight;!this.$maxLines&&this.$scrollPastEnd&&(e-=(t-this.lineHeight)*this.$scrollPastEnd,this.scrollTop>e-t&&(e=this.scrollTop+t,this.scrollBarV.scrollTop=null)),this.scrollBarV.setScrollHeight(e+this.scrollMargin.v),this.scrollBarV.setScrollTop(this.scrollTop+this.scrollMargin.top)},this.$updateScrollBarH=function(){this.scrollBarH.setScrollWidth(this.layerConfig.width+2*this.$padding+this.scrollMargin.h),this.scrollBarH.setScrollLeft(this.scrollLeft+this.scrollMargin.left)},this.$frozen=!1,this.freeze=function(){this.$frozen=!0},this.unfreeze=function(){this.$frozen=!1},this.$renderChanges=function(e,t){this.$changes&&(e|=this.$changes,this.$changes=0);if(!this.session||!this.container.offsetWidth||this.$frozen||!e&&!t){this.$changes|=e;return}if(this.$size.$dirty)return this.$changes|=e,this.onResize(!0);this.lineHeight||this.$textLayer.checkForSizeChanges(),this._signal(\"beforeRender\");var n=this.layerConfig;if(e&this.CHANGE_FULL||e&this.CHANGE_SIZE||e&this.CHANGE_TEXT||e&this.CHANGE_LINES||e&this.CHANGE_SCROLL||e&this.CHANGE_H_SCROLL){e|=this.$computeLayerConfig();if(n.firstRow!=this.layerConfig.firstRow&&n.firstRowScreen==this.layerConfig.firstRowScreen){var r=this.scrollTop+(n.firstRow-this.layerConfig.firstRow)*this.lineHeight;r>0&&(this.scrollTop=r,e|=this.CHANGE_SCROLL,e|=this.$computeLayerConfig())}n=this.layerConfig,this.$updateScrollBarV(),e&this.CHANGE_H_SCROLL&&this.$updateScrollBarH(),this.$gutterLayer.element.style.marginTop=-n.offset+\"px\",this.content.style.marginTop=-n.offset+\"px\",this.content.style.width=n.width+2*this.$padding+\"px\",this.content.style.height=n.minHeight+\"px\"}e&this.CHANGE_H_SCROLL&&(this.content.style.marginLeft=-this.scrollLeft+\"px\",this.scroller.className=this.scrollLeft<=0?\"ace_scroller\":\"ace_scroller ace_scroll-left\");if(e&this.CHANGE_FULL){this.$textLayer.update(n),this.$showGutter&&this.$gutterLayer.update(n),this.$markerBack.update(n),this.$markerFront.update(n),this.$cursorLayer.update(n),this.$moveTextAreaToCursor(),this.$highlightGutterLine&&this.$updateGutterLineHighlight(),this._signal(\"afterRender\");return}if(e&this.CHANGE_SCROLL){e&this.CHANGE_TEXT||e&this.CHANGE_LINES?this.$textLayer.update(n):this.$textLayer.scrollLines(n),this.$showGutter&&this.$gutterLayer.update(n),this.$markerBack.update(n),this.$markerFront.update(n),this.$cursorLayer.update(n),this.$highlightGutterLine&&this.$updateGutterLineHighlight(),this.$moveTextAreaToCursor(),this._signal(\"afterRender\");return}e&this.CHANGE_TEXT?(this.$textLayer.update(n),this.$showGutter&&this.$gutterLayer.update(n)):e&this.CHANGE_LINES?(this.$updateLines()||e&this.CHANGE_GUTTER&&this.$showGutter)&&this.$gutterLayer.update(n):(e&this.CHANGE_TEXT||e&this.CHANGE_GUTTER)&&this.$showGutter&&this.$gutterLayer.update(n),e&this.CHANGE_CURSOR&&(this.$cursorLayer.update(n),this.$moveTextAreaToCursor(),this.$highlightGutterLine&&this.$updateGutterLineHighlight()),e&(this.CHANGE_MARKER|this.CHANGE_MARKER_FRONT)&&this.$markerFront.update(n),e&(this.CHANGE_MARKER|this.CHANGE_MARKER_BACK)&&this.$markerBack.update(n),this._signal(\"afterRender\")},this.$autosize=function(){var e=this.session.getScreenLength()*this.lineHeight,t=this.$maxLines*this.lineHeight,n=Math.min(t,Math.max((this.$minLines||1)*this.lineHeight,e))+this.scrollMargin.v+(this.$extraHeight||0);this.$horizScroll&&(n+=this.scrollBarH.getHeight()),this.$maxPixelHeight&&n>this.$maxPixelHeight&&(n=this.$maxPixelHeight);var r=e>t;if(n!=this.desiredHeight||this.$size.height!=this.desiredHeight||r!=this.$vScroll){r!=this.$vScroll&&(this.$vScroll=r,this.scrollBarV.setVisible(r));var i=this.container.clientWidth;this.container.style.height=n+\"px\",this.$updateCachedSize(!0,this.$gutterWidth,i,n),this.desiredHeight=n,this._signal(\"autosize\")}},this.$computeLayerConfig=function(){var e=this.session,t=this.$size,n=t.height<=2*this.lineHeight,r=this.session.getScreenLength(),i=r*this.lineHeight,s=this.$getLongestLine(),o=!n&&(this.$hScrollBarAlwaysVisible||t.scrollerWidth-s-2*this.$padding<0),u=this.$horizScroll!==o;u&&(this.$horizScroll=o,this.scrollBarH.setVisible(o));var a=this.$vScroll;this.$maxLines&&this.lineHeight>1&&this.$autosize();var f=this.scrollTop%this.lineHeight,l=t.scrollerHeight+this.lineHeight,c=!this.$maxLines&&this.$scrollPastEnd?(t.scrollerHeight-this.lineHeight)*this.$scrollPastEnd:0;i+=c;var h=this.scrollMargin;this.session.setScrollTop(Math.max(-h.top,Math.min(this.scrollTop,i-t.scrollerHeight+h.bottom))),this.session.setScrollLeft(Math.max(-h.left,Math.min(this.scrollLeft,s+2*this.$padding-t.scrollerWidth+h.right)));var p=!n&&(this.$vScrollBarAlwaysVisible||t.scrollerHeight-i+c<0||this.scrollTop>h.top),d=a!==p;d&&(this.$vScroll=p,this.scrollBarV.setVisible(p));var v=Math.ceil(l/this.lineHeight)-1,m=Math.max(0,Math.round((this.scrollTop-f)/this.lineHeight)),g=m+v,y,b,w=this.lineHeight;m=e.screenToDocumentRow(m,0);var E=e.getFoldLine(m);E&&(m=E.start.row),y=e.documentToScreenRow(m,0),b=e.getRowLength(m)*w,g=Math.min(e.screenToDocumentRow(g,0),e.getLength()-1),l=t.scrollerHeight+e.getRowLength(g)*w+b,f=this.scrollTop-y*w;var S=0;this.layerConfig.width!=s&&(S=this.CHANGE_H_SCROLL);if(u||d)S=this.$updateCachedSize(!0,this.gutterWidth,t.width,t.height),this._signal(\"scrollbarVisibilityChanged\"),d&&(s=this.$getLongestLine());return this.layerConfig={width:s,padding:this.$padding,firstRow:m,firstRowScreen:y,lastRow:g,lineHeight:w,characterWidth:this.characterWidth,minHeight:l,maxHeight:i,offset:f,gutterOffset:w?Math.max(0,Math.ceil((f+t.height-t.scrollerHeight)/w)):0,height:this.$size.scrollerHeight},S},this.$updateLines=function(){if(!this.$changedLines)return;var e=this.$changedLines.firstRow,t=this.$changedLines.lastRow;this.$changedLines=null;var n=this.layerConfig;if(e>n.lastRow+1)return;if(t<n.firstRow)return;if(t===Infinity){this.$showGutter&&this.$gutterLayer.update(n),this.$textLayer.update(n);return}return this.$textLayer.updateLines(n,e,t),!0},this.$getLongestLine=function(){var e=this.session.getScreenWidth();return this.showInvisibles&&!this.session.$useWrapMode&&(e+=1),Math.max(this.$size.scrollerWidth-2*this.$padding,Math.round(e*this.characterWidth))},this.updateFrontMarkers=function(){this.$markerFront.setMarkers(this.session.getMarkers(!0)),this.$loop.schedule(this.CHANGE_MARKER_FRONT)},this.updateBackMarkers=function(){this.$markerBack.setMarkers(this.session.getMarkers()),this.$loop.schedule(this.CHANGE_MARKER_BACK)},this.addGutterDecoration=function(e,t){this.$gutterLayer.addGutterDecoration(e,t)},this.removeGutterDecoration=function(e,t){this.$gutterLayer.removeGutterDecoration(e,t)},this.updateBreakpoints=function(e){this.$loop.schedule(this.CHANGE_GUTTER)},this.setAnnotations=function(e){this.$gutterLayer.setAnnotations(e),this.$loop.schedule(this.CHANGE_GUTTER)},this.updateCursor=function(){this.$loop.schedule(this.CHANGE_CURSOR)},this.hideCursor=function(){this.$cursorLayer.hideCursor()},this.showCursor=function(){this.$cursorLayer.showCursor()},this.scrollSelectionIntoView=function(e,t,n){this.scrollCursorIntoView(e,n),this.scrollCursorIntoView(t,n)},this.scrollCursorIntoView=function(e,t,n){if(this.$size.scrollerHeight===0)return;var r=this.$cursorLayer.getPixelPosition(e),i=r.left,s=r.top,o=n&&n.top||0,u=n&&n.bottom||0,a=this.$scrollAnimation?this.session.getScrollTop():this.scrollTop;a+o>s?(t&&a+o>s+this.lineHeight&&(s-=t*this.$size.scrollerHeight),s===0&&(s=-this.scrollMargin.top),this.session.setScrollTop(s)):a+this.$size.scrollerHeight-u<s+this.lineHeight&&(t&&a+this.$size.scrollerHeight-u<s-this.lineHeight&&(s+=t*this.$size.scrollerHeight),this.session.setScrollTop(s+this.lineHeight-this.$size.scrollerHeight));var f=this.scrollLeft;f>i?(i<this.$padding+2*this.layerConfig.characterWidth&&(i=-this.scrollMargin.left),this.session.setScrollLeft(i)):f+this.$size.scrollerWidth<i+this.characterWidth?this.session.setScrollLeft(Math.round(i+this.characterWidth-this.$size.scrollerWidth)):f<=this.$padding&&i-f<this.characterWidth&&this.session.setScrollLeft(0)},this.getScrollTop=function(){return this.session.getScrollTop()},this.getScrollLeft=function(){return this.session.getScrollLeft()},this.getScrollTopRow=function(){return this.scrollTop/this.lineHeight},this.getScrollBottomRow=function(){return Math.max(0,Math.floor((this.scrollTop+this.$size.scrollerHeight)/this.lineHeight)-1)},this.scrollToRow=function(e){this.session.setScrollTop(e*this.lineHeight)},this.alignCursor=function(e,t){typeof e==\"number\"&&(e={row:e,column:0});var n=this.$cursorLayer.getPixelPosition(e),r=this.$size.scrollerHeight-this.lineHeight,i=n.top-r*(t||0);return this.session.setScrollTop(i),i},this.STEPS=8,this.$calcSteps=function(e,t){var n=0,r=this.STEPS,i=[],s=function(e,t,n){return n*(Math.pow(e-1,3)+1)+t};for(n=0;n<r;++n)i.push(s(n/this.STEPS,e,t-e));return i},this.scrollToLine=function(e,t,n,r){var i=this.$cursorLayer.getPixelPosition({row:e,column:0}),s=i.top;t&&(s-=this.$size.scrollerHeight/2);var o=this.scrollTop;this.session.setScrollTop(s),n!==!1&&this.animateScrolling(o,r)},this.animateScrolling=function(e,t){var n=this.scrollTop;if(!this.$animatedScroll)return;var r=this;if(e==n)return;if(this.$scrollAnimation){var i=this.$scrollAnimation.steps;if(i.length){e=i[0];if(e==n)return}}var s=r.$calcSteps(e,n);this.$scrollAnimation={from:e,to:n,steps:s},clearInterval(this.$timer),r.session.setScrollTop(s.shift()),r.session.$scrollTop=n,this.$timer=setInterval(function(){s.length?(r.session.setScrollTop(s.shift()),r.session.$scrollTop=n):n!=null?(r.session.$scrollTop=-1,r.session.setScrollTop(n),n=null):(r.$timer=clearInterval(r.$timer),r.$scrollAnimation=null,t&&t())},10)},this.scrollToY=function(e){this.scrollTop!==e&&(this.$loop.schedule(this.CHANGE_SCROLL),this.scrollTop=e)},this.scrollToX=function(e){this.scrollLeft!==e&&(this.scrollLeft=e),this.$loop.schedule(this.CHANGE_H_SCROLL)},this.scrollTo=function(e,t){this.session.setScrollTop(t),this.session.setScrollLeft(t)},this.scrollBy=function(e,t){t&&this.session.setScrollTop(this.session.getScrollTop()+t),e&&this.session.setScrollLeft(this.session.getScrollLeft()+e)},this.isScrollableBy=function(e,t){if(t<0&&this.session.getScrollTop()>=1-this.scrollMargin.top)return!0;if(t>0&&this.session.getScrollTop()+this.$size.scrollerHeight-this.layerConfig.maxHeight<-1+this.scrollMargin.bottom)return!0;if(e<0&&this.session.getScrollLeft()>=1-this.scrollMargin.left)return!0;if(e>0&&this.session.getScrollLeft()+this.$size.scrollerWidth-this.layerConfig.width<-1+this.scrollMargin.right)return!0},this.pixelToScreenCoordinates=function(e,t){var n=this.scroller.getBoundingClientRect(),r=(e+this.scrollLeft-n.left-this.$padding)/this.characterWidth,i=Math.floor((t+this.scrollTop-n.top)/this.lineHeight),s=Math.round(r);return{row:i,column:s,side:r-s>0?1:-1}},this.screenToTextCoordinates=function(e,t){var n=this.scroller.getBoundingClientRect(),r=Math.round((e+this.scrollLeft-n.left-this.$padding)/this.characterWidth),i=(t+this.scrollTop-n.top)/this.lineHeight;return this.session.screenToDocumentPosition(i,Math.max(r,0))},this.textToScreenCoordinates=function(e,t){var n=this.scroller.getBoundingClientRect(),r=this.session.documentToScreenPosition(e,t),i=this.$padding+Math.round(r.column*this.characterWidth),s=r.row*this.lineHeight;return{pageX:n.left+i-this.scrollLeft,pageY:n.top+s-this.scrollTop}},this.visualizeFocus=function(){i.addCssClass(this.container,\"ace_focus\")},this.visualizeBlur=function(){i.removeCssClass(this.container,\"ace_focus\")},this.showComposition=function(e){this.$composition||(this.$composition={keepTextAreaAtCursor:this.$keepTextAreaAtCursor,cssText:this.textarea.style.cssText}),this.$keepTextAreaAtCursor=!0,i.addCssClass(this.textarea,\"ace_composition\"),this.textarea.style.cssText=\"\",this.$moveTextAreaToCursor()},this.setCompositionText=function(e){this.$moveTextAreaToCursor()},this.hideComposition=function(){if(!this.$composition)return;i.removeCssClass(this.textarea,\"ace_composition\"),this.$keepTextAreaAtCursor=this.$composition.keepTextAreaAtCursor,this.textarea.style.cssText=this.$composition.cssText,this.$composition=null},this.setTheme=function(e,t){function o(r){if(n.$themeId!=e)return t&&t();if(!r||!r.cssClass)throw new Error(\"couldn't load module \"+e+\" or it didn't call define\");i.importCssString(r.cssText,r.cssClass,n.container.ownerDocument),n.theme&&i.removeCssClass(n.container,n.theme.cssClass);var s=\"padding\"in r?r.padding:\"padding\"in(n.theme||{})?4:n.$padding;n.$padding&&s!=n.$padding&&n.setPadding(s),n.$theme=r.cssClass,n.theme=r,i.addCssClass(n.container,r.cssClass),i.setCssClass(n.container,\"ace_dark\",r.isDark),n.$size&&(n.$size.width=0,n.$updateSizeAsync()),n._dispatchEvent(\"themeLoaded\",{theme:r}),t&&t()}var n=this;this.$themeId=e,n._dispatchEvent(\"themeChange\",{theme:e});if(!e||typeof e==\"string\"){var r=e||this.$options.theme.initialValue;s.loadModule([\"theme\",r],o)}else o(e)},this.getTheme=function(){return this.$themeId},this.setStyle=function(e,t){i.setCssClass(this.container,e,t!==!1)},this.unsetStyle=function(e){i.removeCssClass(this.container,e)},this.setCursorStyle=function(e){this.scroller.style.cursor!=e&&(this.scroller.style.cursor=e)},this.setMouseCursor=function(e){this.scroller.style.cursor=e},this.destroy=function(){this.$textLayer.destroy(),this.$cursorLayer.destroy()}}).call(g.prototype),s.defineOptions(g.prototype,\"renderer\",{animatedScroll:{initialValue:!1},showInvisibles:{set:function(e){this.$textLayer.setShowInvisibles(e)&&this.$loop.schedule(this.CHANGE_TEXT)},initialValue:!1},showPrintMargin:{set:function(){this.$updatePrintMargin()},initialValue:!0},printMarginColumn:{set:function(){this.$updatePrintMargin()},initialValue:80},printMargin:{set:function(e){typeof e==\"number\"&&(this.$printMarginColumn=e),this.$showPrintMargin=!!e,this.$updatePrintMargin()},get:function(){return this.$showPrintMargin&&this.$printMarginColumn}},showGutter:{set:function(e){this.$gutter.style.display=e?\"block\":\"none\",this.$loop.schedule(this.CHANGE_FULL),this.onGutterResize()},initialValue:!0},fadeFoldWidgets:{set:function(e){i.setCssClass(this.$gutter,\"ace_fade-fold-widgets\",e)},initialValue:!1},showFoldWidgets:{set:function(e){this.$gutterLayer.setShowFoldWidgets(e)},initialValue:!0},showLineNumbers:{set:function(e){this.$gutterLayer.setShowLineNumbers(e),this.$loop.schedule(this.CHANGE_GUTTER)},initialValue:!0},displayIndentGuides:{set:function(e){this.$textLayer.setDisplayIndentGuides(e)&&this.$loop.schedule(this.CHANGE_TEXT)},initialValue:!0},highlightGutterLine:{set:function(e){if(!this.$gutterLineHighlight){this.$gutterLineHighlight=i.createElement(\"div\"),this.$gutterLineHighlight.className=\"ace_gutter-active-line\",this.$gutter.appendChild(this.$gutterLineHighlight);return}this.$gutterLineHighlight.style.display=e?\"\":\"none\",this.$cursorLayer.$pixelPos&&this.$updateGutterLineHighlight()},initialValue:!1,value:!0},hScrollBarAlwaysVisible:{set:function(e){(!this.$hScrollBarAlwaysVisible||!this.$horizScroll)&&this.$loop.schedule(this.CHANGE_SCROLL)},initialValue:!1},vScrollBarAlwaysVisible:{set:function(e){(!this.$vScrollBarAlwaysVisible||!this.$vScroll)&&this.$loop.schedule(this.CHANGE_SCROLL)},initialValue:!1},fontSize:{set:function(e){typeof e==\"number\"&&(e+=\"px\"),this.container.style.fontSize=e,this.updateFontSize()},initialValue:12},fontFamily:{set:function(e){this.container.style.fontFamily=e,this.updateFontSize()}},maxLines:{set:function(e){this.updateFull()}},minLines:{set:function(e){this.updateFull()}},maxPixelHeight:{set:function(e){this.updateFull()},initialValue:0},scrollPastEnd:{set:function(e){e=+e||0;if(this.$scrollPastEnd==e)return;this.$scrollPastEnd=e,this.$loop.schedule(this.CHANGE_SCROLL)},initialValue:0,handlesSet:!0},fixedWidthGutter:{set:function(e){this.$gutterLayer.$fixedWidth=!!e,this.$loop.schedule(this.CHANGE_GUTTER)}},theme:{set:function(e){this.setTheme(e)},get:function(){return this.$themeId||this.theme},initialValue:\"./theme/textmate\",handlesSet:!0}}),t.VirtualRenderer=g}),define(\"ace/worker/worker_client\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/net\",\"ace/lib/event_emitter\",\"ace/config\"],function(e,t,n){\"use strict\";function u(e){var t=\"importScripts('\"+i.qualifyURL(e)+\"');\";try{return new Blob([t],{type:\"application/javascript\"})}catch(n){var r=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder,s=new r;return s.append(t),s.getBlob(\"application/javascript\")}}function a(e){var t=u(e),n=window.URL||window.webkitURL,r=n.createObjectURL(t);return new Worker(r)}var r=e(\"../lib/oop\"),i=e(\"../lib/net\"),s=e(\"../lib/event_emitter\").EventEmitter,o=e(\"../config\"),f=function(t,n,r,i,s){this.$sendDeltaQueue=this.$sendDeltaQueue.bind(this),this.changeListener=this.changeListener.bind(this),this.onMessage=this.onMessage.bind(this),e.nameToUrl&&!e.toUrl&&(e.toUrl=e.nameToUrl);if(o.get(\"packaged\")||!e.toUrl)i=i||o.moduleUrl(n,\"worker\");else{var u=this.$normalizePath;i=i||u(e.toUrl(\"ace/worker/worker.js\",null,\"_\"));var f={};t.forEach(function(t){f[t]=u(e.toUrl(t,null,\"_\").replace(/(\\.js)?(\\?.*)?$/,\"\"))})}this.$worker=a(i),s&&this.send(\"importScripts\",s),this.$worker.postMessage({init:!0,tlns:f,module:n,classname:r}),this.callbackId=1,this.callbacks={},this.$worker.onmessage=this.onMessage};(function(){r.implement(this,s),this.onMessage=function(e){var t=e.data;switch(t.type){case\"event\":this._signal(t.name,{data:t.data});break;case\"call\":var n=this.callbacks[t.id];n&&(n(t.data),delete this.callbacks[t.id]);break;case\"error\":this.reportError(t.data);break;case\"log\":window.console&&console.log&&console.log.apply(console,t.data)}},this.reportError=function(e){window.console&&console.error&&console.error(e)},this.$normalizePath=function(e){return i.qualifyURL(e)},this.terminate=function(){this._signal(\"terminate\",{}),this.deltaQueue=null,this.$worker.terminate(),this.$worker=null,this.$doc&&this.$doc.off(\"change\",this.changeListener),this.$doc=null},this.send=function(e,t){this.$worker.postMessage({command:e,args:t})},this.call=function(e,t,n){if(n){var r=this.callbackId++;this.callbacks[r]=n,t.push(r)}this.send(e,t)},this.emit=function(e,t){try{this.$worker.postMessage({event:e,data:{data:t.data}})}catch(n){console.error(n.stack)}},this.attachToDocument=function(e){this.$doc&&this.terminate(),this.$doc=e,this.call(\"setValue\",[e.getValue()]),e.on(\"change\",this.changeListener)},this.changeListener=function(e){this.deltaQueue||(this.deltaQueue=[],setTimeout(this.$sendDeltaQueue,0)),e.action==\"insert\"?this.deltaQueue.push(e.start,e.lines):this.deltaQueue.push(e.start,e.end)},this.$sendDeltaQueue=function(){var e=this.deltaQueue;if(!e)return;this.deltaQueue=null,e.length>50&&e.length>this.$doc.getLength()>>1?this.call(\"setValue\",[this.$doc.getValue()]):this.emit(\"change\",{data:e})}}).call(f.prototype);var l=function(e,t,n){this.$sendDeltaQueue=this.$sendDeltaQueue.bind(this),this.changeListener=this.changeListener.bind(this),this.callbackId=1,this.callbacks={},this.messageBuffer=[];var r=null,i=!1,u=Object.create(s),a=this;this.$worker={},this.$worker.terminate=function(){},this.$worker.postMessage=function(e){a.messageBuffer.push(e),r&&(i?setTimeout(f):f())},this.setEmitSync=function(e){i=e};var f=function(){var e=a.messageBuffer.shift();e.command?r[e.command].apply(r,e.args):e.event&&u._signal(e.event,e.data)};u.postMessage=function(e){a.onMessage({data:e})},u.callback=function(e,t){this.postMessage({type:\"call\",id:t,data:e})},u.emit=function(e,t){this.postMessage({type:\"event\",name:e,data:t})},o.loadModule([\"worker\",t],function(e){r=new e[n](u);while(a.messageBuffer.length)f()})};l.prototype=f.prototype,t.UIWorkerClient=l,t.WorkerClient=f,t.createWorker=a}),define(\"ace/placeholder\",[\"require\",\"exports\",\"module\",\"ace/range\",\"ace/lib/event_emitter\",\"ace/lib/oop\"],function(e,t,n){\"use strict\";var r=e(\"./range\").Range,i=e(\"./lib/event_emitter\").EventEmitter,s=e(\"./lib/oop\"),o=function(e,t,n,r,i,s){var o=this;this.length=t,this.session=e,this.doc=e.getDocument(),this.mainClass=i,this.othersClass=s,this.$onUpdate=this.onUpdate.bind(this),this.doc.on(\"change\",this.$onUpdate),this.$others=r,this.$onCursorChange=function(){setTimeout(function(){o.onCursorChange()})},this.$pos=n;var u=e.getUndoManager().$undoStack||e.getUndoManager().$undostack||{length:-1};this.$undoStackDepth=u.length,this.setup(),e.selection.on(\"changeCursor\",this.$onCursorChange)};(function(){s.implement(this,i),this.setup=function(){var e=this,t=this.doc,n=this.session;this.selectionBefore=n.selection.toJSON(),n.selection.inMultiSelectMode&&n.selection.toSingleRange(),this.pos=t.createAnchor(this.$pos.row,this.$pos.column);var i=this.pos;i.$insertRight=!0,i.detach(),i.markerId=n.addMarker(new r(i.row,i.column,i.row,i.column+this.length),this.mainClass,null,!1),this.others=[],this.$others.forEach(function(n){var r=t.createAnchor(n.row,n.column);r.$insertRight=!0,r.detach(),e.others.push(r)}),n.setUndoSelect(!1)},this.showOtherMarkers=function(){if(this.othersActive)return;var e=this.session,t=this;this.othersActive=!0,this.others.forEach(function(n){n.markerId=e.addMarker(new r(n.row,n.column,n.row,n.column+t.length),t.othersClass,null,!1)})},this.hideOtherMarkers=function(){if(!this.othersActive)return;this.othersActive=!1;for(var e=0;e<this.others.length;e++)this.session.removeMarker(this.others[e].markerId)},this.onUpdate=function(e){if(this.$updating)return this.updateAnchors(e);var t=e;if(t.start.row!==t.end.row)return;if(t.start.row!==this.pos.row)return;this.$updating=!0;var n=e.action===\"insert\"?t.end.column-t.start.column:t.start.column-t.end.column,i=t.start.column>=this.pos.column&&t.start.column<=this.pos.column+this.length+1,s=t.start.column-this.pos.column;this.updateAnchors(e),i&&(this.length+=n);if(i&&!this.session.$fromUndo)if(e.action===\"insert\")for(var o=this.others.length-1;o>=0;o--){var u=this.others[o],a={row:u.row,column:u.column+s};this.doc.insertMergedLines(a,e.lines)}else if(e.action===\"remove\")for(var o=this.others.length-1;o>=0;o--){var u=this.others[o],a={row:u.row,column:u.column+s};this.doc.remove(new r(a.row,a.column,a.row,a.column-n))}this.$updating=!1,this.updateMarkers()},this.updateAnchors=function(e){this.pos.onChange(e);for(var t=this.others.length;t--;)this.others[t].onChange(e);this.updateMarkers()},this.updateMarkers=function(){if(this.$updating)return;var e=this,t=this.session,n=function(n,i){t.removeMarker(n.markerId),n.markerId=t.addMarker(new r(n.row,n.column,n.row,n.column+e.length),i,null,!1)};n(this.pos,this.mainClass);for(var i=this.others.length;i--;)n(this.others[i],this.othersClass)},this.onCursorChange=function(e){if(this.$updating||!this.session)return;var t=this.session.selection.getCursor();t.row===this.pos.row&&t.column>=this.pos.column&&t.column<=this.pos.column+this.length?(this.showOtherMarkers(),this._emit(\"cursorEnter\",e)):(this.hideOtherMarkers(),this._emit(\"cursorLeave\",e))},this.detach=function(){this.session.removeMarker(this.pos&&this.pos.markerId),this.hideOtherMarkers(),this.doc.removeEventListener(\"change\",this.$onUpdate),this.session.selection.removeEventListener(\"changeCursor\",this.$onCursorChange),this.session.setUndoSelect(!0),this.session=null},this.cancel=function(){if(this.$undoStackDepth===-1)return;var e=this.session.getUndoManager(),t=(e.$undoStack||e.$undostack).length-this.$undoStackDepth;for(var n=0;n<t;n++)e.undo(!0);this.selectionBefore&&this.session.selection.fromJSON(this.selectionBefore)}}).call(o.prototype),t.PlaceHolder=o}),define(\"ace/mouse/multi_select_handler\",[\"require\",\"exports\",\"module\",\"ace/lib/event\",\"ace/lib/useragent\"],function(e,t,n){function s(e,t){return e.row==t.row&&e.column==t.column}function o(e){var t=e.domEvent,n=t.altKey,o=t.shiftKey,u=t.ctrlKey,a=e.getAccelKey(),f=e.getButton();u&&i.isMac&&(f=t.button);if(e.editor.inMultiSelectMode&&f==2){e.editor.textInput.onContextMenu(e.domEvent);return}if(!u&&!n&&!a){f===0&&e.editor.inMultiSelectMode&&e.editor.exitMultiSelectMode();return}if(f!==0)return;var l=e.editor,c=l.selection,h=l.inMultiSelectMode,p=e.getDocumentPosition(),d=c.getCursor(),v=e.inSelection()||c.isEmpty()&&s(p,d),m=e.x,g=e.y,y=function(e){m=e.clientX,g=e.clientY},b=l.session,w=l.renderer.pixelToScreenCoordinates(m,g),E=w,S;if(l.$mouseHandler.$enableJumpToDef)u&&n||a&&n?S=o?\"block\":\"add\":n&&l.$blockSelectEnabled&&(S=\"block\");else if(a&&!n){S=\"add\";if(!h&&o)return}else n&&l.$blockSelectEnabled&&(S=\"block\");S&&i.isMac&&t.ctrlKey&&l.$mouseHandler.cancelContextMenu();if(S==\"add\"){if(!h&&v)return;if(!h){var x=c.toOrientedRange();l.addSelectionMarker(x)}var T=c.rangeList.rangeAtPoint(p);l.$blockScrolling++,l.inVirtualSelectionMode=!0,o&&(T=null,x=c.ranges[0]||x,l.removeSelectionMarker(x)),l.once(\"mouseup\",function(){var e=c.toOrientedRange();T&&e.isEmpty()&&s(T.cursor,e.cursor)?c.substractPoint(e.cursor):(o?c.substractPoint(x.cursor):x&&(l.removeSelectionMarker(x),c.addRange(x)),c.addRange(e)),l.$blockScrolling--,l.inVirtualSelectionMode=!1})}else if(S==\"block\"){e.stop(),l.inVirtualSelectionMode=!0;var N,C=[],k=function(){var e=l.renderer.pixelToScreenCoordinates(m,g),t=b.screenToDocumentPosition(e.row,e.column);if(s(E,e)&&s(t,c.lead))return;E=e,l.$blockScrolling++,l.selection.moveToPosition(t),l.renderer.scrollCursorIntoView(),l.removeSelectionMarkers(C),C=c.rectangularRangeBlock(E,w),l.$mouseHandler.$clickSelection&&C.length==1&&C[0].isEmpty()&&(C[0]=l.$mouseHandler.$clickSelection.clone()),C.forEach(l.addSelectionMarker,l),l.updateSelectionMarkers(),l.$blockScrolling--};l.$blockScrolling++,h&&!a?c.toSingleRange():!h&&a&&(N=c.toOrientedRange(),l.addSelectionMarker(N)),o?w=b.documentToScreenPosition(c.lead):c.moveToPosition(p),l.$blockScrolling--,E={row:-1,column:-1};var L=function(e){clearInterval(O),l.removeSelectionMarkers(C),C.length||(C=[c.toOrientedRange()]),l.$blockScrolling++,N&&(l.removeSelectionMarker(N),c.toSingleRange(N));for(var t=0;t<C.length;t++)c.addRange(C[t]);l.inVirtualSelectionMode=!1,l.$mouseHandler.$clickSelection=null,l.$blockScrolling--},A=k;r.capture(l.container,y,L);var O=setInterval(function(){A()},20);return e.preventDefault()}}var r=e(\"../lib/event\"),i=e(\"../lib/useragent\");t.onMouseDown=o}),define(\"ace/commands/multi_select_commands\",[\"require\",\"exports\",\"module\",\"ace/keyboard/hash_handler\"],function(e,t,n){t.defaultCommands=[{name:\"addCursorAbove\",exec:function(e){e.selectMoreLines(-1)},bindKey:{win:\"Ctrl-Alt-Up\",mac:\"Ctrl-Alt-Up\"},scrollIntoView:\"cursor\",readOnly:!0},{name:\"addCursorBelow\",exec:function(e){e.selectMoreLines(1)},bindKey:{win:\"Ctrl-Alt-Down\",mac:\"Ctrl-Alt-Down\"},scrollIntoView:\"cursor\",readOnly:!0},{name:\"addCursorAboveSkipCurrent\",exec:function(e){e.selectMoreLines(-1,!0)},bindKey:{win:\"Ctrl-Alt-Shift-Up\",mac:\"Ctrl-Alt-Shift-Up\"},scrollIntoView:\"cursor\",readOnly:!0},{name:\"addCursorBelowSkipCurrent\",exec:function(e){e.selectMoreLines(1,!0)},bindKey:{win:\"Ctrl-Alt-Shift-Down\",mac:\"Ctrl-Alt-Shift-Down\"},scrollIntoView:\"cursor\",readOnly:!0},{name:\"selectMoreBefore\",exec:function(e){e.selectMore(-1)},bindKey:{win:\"Ctrl-Alt-Left\",mac:\"Ctrl-Alt-Left\"},scrollIntoView:\"cursor\",readOnly:!0},{name:\"selectMoreAfter\",exec:function(e){e.selectMore(1)},bindKey:{win:\"Ctrl-Alt-Right\",mac:\"Ctrl-Alt-Right\"},scrollIntoView:\"cursor\",readOnly:!0},{name:\"selectNextBefore\",exec:function(e){e.selectMore(-1,!0)},bindKey:{win:\"Ctrl-Alt-Shift-Left\",mac:\"Ctrl-Alt-Shift-Left\"},scrollIntoView:\"cursor\",readOnly:!0},{name:\"selectNextAfter\",exec:function(e){e.selectMore(1,!0)},bindKey:{win:\"Ctrl-Alt-Shift-Right\",mac:\"Ctrl-Alt-Shift-Right\"},scrollIntoView:\"cursor\",readOnly:!0},{name:\"splitIntoLines\",exec:function(e){e.multiSelect.splitIntoLines()},bindKey:{win:\"Ctrl-Alt-L\",mac:\"Ctrl-Alt-L\"},readOnly:!0},{name:\"alignCursors\",exec:function(e){e.alignCursors()},bindKey:{win:\"Ctrl-Alt-A\",mac:\"Ctrl-Alt-A\"},scrollIntoView:\"cursor\"},{name:\"findAll\",exec:function(e){e.findAll()},bindKey:{win:\"Ctrl-Alt-K\",mac:\"Ctrl-Alt-G\"},scrollIntoView:\"cursor\",readOnly:!0}],t.multiSelectCommands=[{name:\"singleSelection\",bindKey:\"esc\",exec:function(e){e.exitMultiSelectMode()},scrollIntoView:\"cursor\",readOnly:!0,isAvailable:function(e){return e&&e.inMultiSelectMode}}];var r=e(\"../keyboard/hash_handler\").HashHandler;t.keyboardHandler=new r(t.multiSelectCommands)}),define(\"ace/multi_select\",[\"require\",\"exports\",\"module\",\"ace/range_list\",\"ace/range\",\"ace/selection\",\"ace/mouse/multi_select_handler\",\"ace/lib/event\",\"ace/lib/lang\",\"ace/commands/multi_select_commands\",\"ace/search\",\"ace/edit_session\",\"ace/editor\",\"ace/config\"],function(e,t,n){function h(e,t,n){return c.$options.wrap=!0,c.$options.needle=t,c.$options.backwards=n==-1,c.find(e)}function v(e,t){return e.row==t.row&&e.column==t.column}function m(e){if(e.$multiselectOnSessionChange)return;e.$onAddRange=e.$onAddRange.bind(e),e.$onRemoveRange=e.$onRemoveRange.bind(e),e.$onMultiSelect=e.$onMultiSelect.bind(e),e.$onSingleSelect=e.$onSingleSelect.bind(e),e.$multiselectOnSessionChange=t.onSessionChange.bind(e),e.$checkMultiselectChange=e.$checkMultiselectChange.bind(e),e.$multiselectOnSessionChange(e),e.on(\"changeSession\",e.$multiselectOnSessionChange),e.on(\"mousedown\",o),e.commands.addCommands(f.defaultCommands),g(e)}function g(e){function r(t){n&&(e.renderer.setMouseCursor(\"\"),n=!1)}var t=e.textInput.getElement(),n=!1;u.addListener(t,\"keydown\",function(t){var i=t.keyCode==18&&!(t.ctrlKey||t.shiftKey||t.metaKey);e.$blockSelectEnabled&&i?n||(e.renderer.setMouseCursor(\"crosshair\"),n=!0):n&&r()}),u.addListener(t,\"keyup\",r),u.addListener(t,\"blur\",r)}var r=e(\"./range_list\").RangeList,i=e(\"./range\").Range,s=e(\"./selection\").Selection,o=e(\"./mouse/multi_select_handler\").onMouseDown,u=e(\"./lib/event\"),a=e(\"./lib/lang\"),f=e(\"./commands/multi_select_commands\");t.commands=f.defaultCommands.concat(f.multiSelectCommands);var l=e(\"./search\").Search,c=new l,p=e(\"./edit_session\").EditSession;(function(){this.getSelectionMarkers=function(){return this.$selectionMarkers}}).call(p.prototype),function(){this.ranges=null,this.rangeList=null,this.addRange=function(e,t){if(!e)return;if(!this.inMultiSelectMode&&this.rangeCount===0){var n=this.toOrientedRange();this.rangeList.add(n),this.rangeList.add(e);if(this.rangeList.ranges.length!=2)return this.rangeList.removeAll(),t||this.fromOrientedRange(e);this.rangeList.removeAll(),this.rangeList.add(n),this.$onAddRange(n)}e.cursor||(e.cursor=e.end);var r=this.rangeList.add(e);return this.$onAddRange(e),r.length&&this.$onRemoveRange(r),this.rangeCount>1&&!this.inMultiSelectMode&&(this._signal(\"multiSelect\"),this.inMultiSelectMode=!0,this.session.$undoSelect=!1,this.rangeList.attach(this.session)),t||this.fromOrientedRange(e)},this.toSingleRange=function(e){e=e||this.ranges[0];var t=this.rangeList.removeAll();t.length&&this.$onRemoveRange(t),e&&this.fromOrientedRange(e)},this.substractPoint=function(e){var t=this.rangeList.substractPoint(e);if(t)return this.$onRemoveRange(t),t[0]},this.mergeOverlappingRanges=function(){var e=this.rangeList.merge();e.length?this.$onRemoveRange(e):this.ranges[0]&&this.fromOrientedRange(this.ranges[0])},this.$onAddRange=function(e){this.rangeCount=this.rangeList.ranges.length,this.ranges.unshift(e),this._signal(\"addRange\",{range:e})},this.$onRemoveRange=function(e){this.rangeCount=this.rangeList.ranges.length;if(this.rangeCount==1&&this.inMultiSelectMode){var t=this.rangeList.ranges.pop();e.push(t),this.rangeCount=0}for(var n=e.length;n--;){var r=this.ranges.indexOf(e[n]);this.ranges.splice(r,1)}this._signal(\"removeRange\",{ranges:e}),this.rangeCount===0&&this.inMultiSelectMode&&(this.inMultiSelectMode=!1,this._signal(\"singleSelect\"),this.session.$undoSelect=!0,this.rangeList.detach(this.session)),t=t||this.ranges[0],t&&!t.isEqual(this.getRange())&&this.fromOrientedRange(t)},this.$initRangeList=function(){if(this.rangeList)return;this.rangeList=new r,this.ranges=[],this.rangeCount=0},this.getAllRanges=function(){return this.rangeCount?this.rangeList.ranges.concat():[this.getRange()]},this.splitIntoLines=function(){if(this.rangeCount>1){var e=this.rangeList.ranges,t=e[e.length-1],n=i.fromPoints(e[0].start,t.end);this.toSingleRange(),this.setSelectionRange(n,t.cursor==t.start)}else{var n=this.getRange(),r=this.isBackwards(),s=n.start.row,o=n.end.row;if(s==o){if(r)var u=n.end,a=n.start;else var u=n.start,a=n.end;this.addRange(i.fromPoints(a,a)),this.addRange(i.fromPoints(u,u));return}var f=[],l=this.getLineRange(s,!0);l.start.column=n.start.column,f.push(l);for(var c=s+1;c<o;c++)f.push(this.getLineRange(c,!0));l=this.getLineRange(o,!0),l.end.column=n.end.column,f.push(l),f.forEach(this.addRange,this)}},this.toggleBlockSelection=function(){if(this.rangeCount>1){var e=this.rangeList.ranges,t=e[e.length-1],n=i.fromPoints(e[0].start,t.end);this.toSingleRange(),this.setSelectionRange(n,t.cursor==t.start)}else{var r=this.session.documentToScreenPosition(this.selectionLead),s=this.session.documentToScreenPosition(this.selectionAnchor),o=this.rectangularRangeBlock(r,s);o.forEach(this.addRange,this)}},this.rectangularRangeBlock=function(e,t,n){var r=[],s=e.column<t.column;if(s)var o=e.column,u=t.column;else var o=t.column,u=e.column;var a=e.row<t.row;if(a)var f=e.row,l=t.row;else var f=t.row,l=e.row;o<0&&(o=0),f<0&&(f=0),f==l&&(n=!0);for(var c=f;c<=l;c++){var h=i.fromPoints(this.session.screenToDocumentPosition(c,o),this.session.screenToDocumentPosition(c,u));if(h.isEmpty()){if(p&&v(h.end,p))break;var p=h.end}h.cursor=s?h.start:h.end,r.push(h)}a&&r.reverse();if(!n){var d=r.length-1;while(r[d].isEmpty()&&d>0)d--;if(d>0){var m=0;while(r[m].isEmpty())m++}for(var g=d;g>=m;g--)r[g].isEmpty()&&r.splice(g,1)}return r}}.call(s.prototype);var d=e(\"./editor\").Editor;(function(){this.updateSelectionMarkers=function(){this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.addSelectionMarker=function(e){e.cursor||(e.cursor=e.end);var t=this.getSelectionStyle();return e.marker=this.session.addMarker(e,\"ace_selection\",t),this.session.$selectionMarkers.push(e),this.session.selectionMarkerCount=this.session.$selectionMarkers.length,e},this.removeSelectionMarker=function(e){if(!e.marker)return;this.session.removeMarker(e.marker);var t=this.session.$selectionMarkers.indexOf(e);t!=-1&&this.session.$selectionMarkers.splice(t,1),this.session.selectionMarkerCount=this.session.$selectionMarkers.length},this.removeSelectionMarkers=function(e){var t=this.session.$selectionMarkers;for(var n=e.length;n--;){var r=e[n];if(!r.marker)continue;this.session.removeMarker(r.marker);var i=t.indexOf(r);i!=-1&&t.splice(i,1)}this.session.selectionMarkerCount=t.length},this.$onAddRange=function(e){this.addSelectionMarker(e.range),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onRemoveRange=function(e){this.removeSelectionMarkers(e.ranges),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onMultiSelect=function(e){if(this.inMultiSelectMode)return;this.inMultiSelectMode=!0,this.setStyle(\"ace_multiselect\"),this.keyBinding.addKeyboardHandler(f.keyboardHandler),this.commands.setDefaultHandler(\"exec\",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onSingleSelect=function(e){if(this.session.multiSelect.inVirtualMode)return;this.inMultiSelectMode=!1,this.unsetStyle(\"ace_multiselect\"),this.keyBinding.removeKeyboardHandler(f.keyboardHandler),this.commands.removeDefaultHandler(\"exec\",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers(),this._emit(\"changeSelection\")},this.$onMultiSelectExec=function(e){var t=e.command,n=e.editor;if(!n.multiSelect)return;if(!t.multiSelectAction){var r=t.exec(n,e.args||{});n.multiSelect.addRange(n.multiSelect.toOrientedRange()),n.multiSelect.mergeOverlappingRanges()}else t.multiSelectAction==\"forEach\"?r=n.forEachSelection(t,e.args):t.multiSelectAction==\"forEachLine\"?r=n.forEachSelection(t,e.args,!0):t.multiSelectAction==\"single\"?(n.exitMultiSelectMode(),r=t.exec(n,e.args||{})):r=t.multiSelectAction(n,e.args||{});return r},this.forEachSelection=function(e,t,n){if(this.inVirtualSelectionMode)return;var r=n&&n.keepOrder,i=n==1||n&&n.$byLines,o=this.session,u=this.selection,a=u.rangeList,f=(r?u:a).ranges,l;if(!f.length)return e.exec?e.exec(this,t||{}):e(this,t||{});var c=u._eventRegistry;u._eventRegistry={};var h=new s(o);this.inVirtualSelectionMode=!0;for(var p=f.length;p--;){if(i)while(p>0&&f[p].start.row==f[p-1].end.row)p--;h.fromOrientedRange(f[p]),h.index=p,this.selection=o.selection=h;var d=e.exec?e.exec(this,t||{}):e(this,t||{});!l&&d!==undefined&&(l=d),h.toOrientedRange(f[p])}h.detach(),this.selection=o.selection=u,this.inVirtualSelectionMode=!1,u._eventRegistry=c,u.mergeOverlappingRanges();var v=this.renderer.$scrollAnimation;return this.onCursorChange(),this.onSelectionChange(),v&&v.from==v.to&&this.renderer.animateScrolling(v.from),l},this.exitMultiSelectMode=function(){if(!this.inMultiSelectMode||this.inVirtualSelectionMode)return;this.multiSelect.toSingleRange()},this.getSelectedText=function(){var e=\"\";if(this.inMultiSelectMode&&!this.inVirtualSelectionMode){var t=this.multiSelect.rangeList.ranges,n=[];for(var r=0;r<t.length;r++)n.push(this.session.getTextRange(t[r]));var i=this.session.getDocument().getNewLineCharacter();e=n.join(i),e.length==(n.length-1)*i.length&&(e=\"\")}else this.selection.isEmpty()||(e=this.session.getTextRange(this.getSelectionRange()));return e},this.$checkMultiselectChange=function(e,t){if(this.inMultiSelectMode&&!this.inVirtualSelectionMode){var n=this.multiSelect.ranges[0];if(this.multiSelect.isEmpty()&&t==this.multiSelect.anchor)return;var r=t==this.multiSelect.anchor?n.cursor==n.start?n.end:n.start:n.cursor;(r.row!=t.row||this.session.$clipPositionToDocument(r.row,r.column).column!=t.column)&&this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange())}},this.findAll=function(e,t,n){t=t||{},t.needle=e||t.needle;if(t.needle==undefined){var r=this.selection.isEmpty()?this.selection.getWordRange():this.selection.getRange();t.needle=this.session.getTextRange(r)}this.$search.set(t);var i=this.$search.findAll(this.session);if(!i.length)return 0;this.$blockScrolling+=1;var s=this.multiSelect;n||s.toSingleRange(i[0]);for(var o=i.length;o--;)s.addRange(i[o],!0);return r&&s.rangeList.rangeAtPoint(r.start)&&s.addRange(r,!0),this.$blockScrolling-=1,i.length},this.selectMoreLines=function(e,t){var n=this.selection.toOrientedRange(),r=n.cursor==n.end,s=this.session.documentToScreenPosition(n.cursor);this.selection.$desiredColumn&&(s.column=this.selection.$desiredColumn);var o=this.session.screenToDocumentPosition(s.row+e,s.column);if(!n.isEmpty())var u=this.session.documentToScreenPosition(r?n.end:n.start),a=this.session.screenToDocumentPosition(u.row+e,u.column);else var a=o;if(r){var f=i.fromPoints(o,a);f.cursor=f.start}else{var f=i.fromPoints(a,o);f.cursor=f.end}f.desiredColumn=s.column;if(!this.selection.inMultiSelectMode)this.selection.addRange(n);else if(t)var l=n.cursor;this.selection.addRange(f),l&&this.selection.substractPoint(l)},this.transposeSelections=function(e){var t=this.session,n=t.multiSelect,r=n.ranges;for(var i=r.length;i--;){var s=r[i];if(s.isEmpty()){var o=t.getWordRange(s.start.row,s.start.column);s.start.row=o.start.row,s.start.column=o.start.column,s.end.row=o.end.row,s.end.column=o.end.column}}n.mergeOverlappingRanges();var u=[];for(var i=r.length;i--;){var s=r[i];u.unshift(t.getTextRange(s))}e<0?u.unshift(u.pop()):u.push(u.shift());for(var i=r.length;i--;){var s=r[i],o=s.clone();t.replace(s,u[i]),s.start.row=o.start.row,s.start.column=o.start.column}},this.selectMore=function(e,t,n){var r=this.session,i=r.multiSelect,s=i.toOrientedRange();if(s.isEmpty()){s=r.getWordRange(s.start.row,s.start.column),s.cursor=e==-1?s.start:s.end,this.multiSelect.addRange(s);if(n)return}var o=r.getTextRange(s),u=h(r,o,e);u&&(u.cursor=e==-1?u.start:u.end,this.$blockScrolling+=1,this.session.unfold(u),this.multiSelect.addRange(u),this.$blockScrolling-=1,this.renderer.scrollCursorIntoView(null,.5)),t&&this.multiSelect.substractPoint(s.cursor)},this.alignCursors=function(){var e=this.session,t=e.multiSelect,n=t.ranges,r=-1,s=n.filter(function(e){if(e.cursor.row==r)return!0;r=e.cursor.row});if(!n.length||s.length==n.length-1){var o=this.selection.getRange(),u=o.start.row,f=o.end.row,l=u==f;if(l){var c=this.session.getLength(),h;do h=this.session.getLine(f);while(/[=:]/.test(h)&&++f<c);do h=this.session.getLine(u);while(/[=:]/.test(h)&&--u>0);u<0&&(u=0),f>=c&&(f=c-1)}var p=this.session.removeFullLines(u,f);p=this.$reAlignText(p,l),this.session.insert({row:u,column:0},p.join(\"\\n\")+\"\\n\"),l||(o.start.column=0,o.end.column=p[p.length-1].length),this.selection.setRange(o)}else{s.forEach(function(e){t.substractPoint(e.cursor)});var d=0,v=Infinity,m=n.map(function(t){var n=t.cursor,r=e.getLine(n.row),i=r.substr(n.column).search(/\\S/g);return i==-1&&(i=0),n.column>d&&(d=n.column),i<v&&(v=i),i});n.forEach(function(t,n){var r=t.cursor,s=d-r.column,o=m[n]-v;s>o?e.insert(r,a.stringRepeat(\" \",s-o)):e.remove(new i(r.row,r.column,r.row,r.column-s+o)),t.start.column=t.end.column=d,t.start.row=t.end.row=r.row,t.cursor=t.end}),t.fromOrientedRange(n[0]),this.renderer.updateCursor(),this.renderer.updateBackMarkers()}},this.$reAlignText=function(e,t){function u(e){return a.stringRepeat(\" \",e)}function f(e){return e[2]?u(i)+e[2]+u(s-e[2].length+o)+e[4].replace(/^([=:])\\s+/,\"$1 \"):e[0]}function l(e){return e[2]?u(i+s-e[2].length)+e[2]+u(o,\" \")+e[4].replace(/^([=:])\\s+/,\"$1 \"):e[0]}function c(e){return e[2]?u(i)+e[2]+u(o)+e[4].replace(/^([=:])\\s+/,\"$1 \"):e[0]}var n=!0,r=!0,i,s,o;return e.map(function(e){var t=e.match(/(\\s*)(.*?)(\\s*)([=:].*)/);return t?i==null?(i=t[1].length,s=t[2].length,o=t[3].length,t):(i+s+o!=t[1].length+t[2].length+t[3].length&&(r=!1),i!=t[1].length&&(n=!1),i>t[1].length&&(i=t[1].length),s<t[2].length&&(s=t[2].length),o>t[3].length&&(o=t[3].length),t):[e]}).map(t?f:n?r?l:f:c)}}).call(d.prototype),t.onSessionChange=function(e){var t=e.session;t&&!t.multiSelect&&(t.$selectionMarkers=[],t.selection.$initRangeList(),t.multiSelect=t.selection),this.multiSelect=t&&t.multiSelect;var n=e.oldSession;n&&(n.multiSelect.off(\"addRange\",this.$onAddRange),n.multiSelect.off(\"removeRange\",this.$onRemoveRange),n.multiSelect.off(\"multiSelect\",this.$onMultiSelect),n.multiSelect.off(\"singleSelect\",this.$onSingleSelect),n.multiSelect.lead.off(\"change\",this.$checkMultiselectChange),n.multiSelect.anchor.off(\"change\",this.$checkMultiselectChange)),t&&(t.multiSelect.on(\"addRange\",this.$onAddRange),t.multiSelect.on(\"removeRange\",this.$onRemoveRange),t.multiSelect.on(\"multiSelect\",this.$onMultiSelect),t.multiSelect.on(\"singleSelect\",this.$onSingleSelect),t.multiSelect.lead.on(\"change\",this.$checkMultiselectChange),t.multiSelect.anchor.on(\"change\",this.$checkMultiselectChange)),t&&this.inMultiSelectMode!=t.selection.inMultiSelectMode&&(t.selection.inMultiSelectMode?this.$onMultiSelect():this.$onSingleSelect())},t.MultiSelect=m,e(\"./config\").defineOptions(d.prototype,\"editor\",{enableMultiselect:{set:function(e){m(this),e?(this.on(\"changeSession\",this.$multiselectOnSessionChange),this.on(\"mousedown\",o)):(this.off(\"changeSession\",this.$multiselectOnSessionChange),this.off(\"mousedown\",o))},value:!0},enableBlockSelect:{set:function(e){this.$blockSelectEnabled=e},value:!0}})}),define(\"ace/mode/folding/fold_mode\",[\"require\",\"exports\",\"module\",\"ace/range\"],function(e,t,n){\"use strict\";var r=e(\"../../range\").Range,i=t.FoldMode=function(){};(function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);return this.foldingStartMarker.test(r)?\"start\":t==\"markbeginend\"&&this.foldingStopMarker&&this.foldingStopMarker.test(r)?\"end\":\"\"},this.getFoldWidgetRange=function(e,t,n){return null},this.indentationBlock=function(e,t,n){var i=/\\S/,s=e.getLine(t),o=s.search(i);if(o==-1)return;var u=n||s.length,a=e.getLength(),f=t,l=t;while(++t<a){var c=e.getLine(t).search(i);if(c==-1)continue;if(c<=o)break;l=t}if(l>f){var h=e.getLine(l).length;return new r(f,u,l,h)}},this.openingBracketBlock=function(e,t,n,i,s){var o={row:n,column:i+1},u=e.$findClosingBracket(t,o,s);if(!u)return;var a=e.foldWidgets[u.row];return a==null&&(a=e.getFoldWidget(u.row)),a==\"start\"&&u.row>o.row&&(u.row--,u.column=e.getLine(u.row).length),r.fromPoints(o,u)},this.closingBracketBlock=function(e,t,n,i,s){var o={row:n,column:i},u=e.$findOpeningBracket(t,o);if(!u)return;return u.column++,o.column--,r.fromPoints(u,o)}}).call(i.prototype)}),define(\"ace/theme/textmate\",[\"require\",\"exports\",\"module\",\"ace/lib/dom\"],function(e,t,n){\"use strict\";t.isDark=!1,t.cssClass=\"ace-tm\",t.cssText='.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm {background-color: #FFFFFF;color: black;}.ace-tm .ace_cursor {color: black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;}';var r=e(\"../lib/dom\");r.importCssString(t.cssText,t.cssClass)}),define(\"ace/line_widgets\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/lib/dom\",\"ace/range\"],function(e,t,n){\"use strict\";function o(e){this.session=e,this.session.widgetManager=this,this.session.getRowLength=this.getRowLength,this.session.$getWidgetScreenLength=this.$getWidgetScreenLength,this.updateOnChange=this.updateOnChange.bind(this),this.renderWidgets=this.renderWidgets.bind(this),this.measureWidgets=this.measureWidgets.bind(this),this.session._changedWidgets=[],this.$onChangeEditor=this.$onChangeEditor.bind(this),this.session.on(\"change\",this.updateOnChange),this.session.on(\"changeFold\",this.updateOnFold),this.session.on(\"changeEditor\",this.$onChangeEditor)}var r=e(\"./lib/oop\"),i=e(\"./lib/dom\"),s=e(\"./range\").Range;(function(){this.getRowLength=function(e){var t;return this.lineWidgets?t=this.lineWidgets[e]&&this.lineWidgets[e].rowCount||0:t=0,!this.$useWrapMode||!this.$wrapData[e]?1+t:this.$wrapData[e].length+1+t},this.$getWidgetScreenLength=function(){var e=0;return this.lineWidgets.forEach(function(t){t&&t.rowCount&&!t.hidden&&(e+=t.rowCount)}),e},this.$onChangeEditor=function(e){this.attach(e.editor)},this.attach=function(e){e&&e.widgetManager&&e.widgetManager!=this&&e.widgetManager.detach();if(this.editor==e)return;this.detach(),this.editor=e,e&&(e.widgetManager=this,e.renderer.on(\"beforeRender\",this.measureWidgets),e.renderer.on(\"afterRender\",this.renderWidgets))},this.detach=function(e){var t=this.editor;if(!t)return;this.editor=null,t.widgetManager=null,t.renderer.off(\"beforeRender\",this.measureWidgets),t.renderer.off(\"afterRender\",this.renderWidgets);var n=this.session.lineWidgets;n&&n.forEach(function(e){e&&e.el&&e.el.parentNode&&(e._inDocument=!1,e.el.parentNode.removeChild(e.el))})},this.updateOnFold=function(e,t){var n=t.lineWidgets;if(!n||!e.action)return;var r=e.data,i=r.start.row,s=r.end.row,o=e.action==\"add\";for(var u=i+1;u<s;u++)n[u]&&(n[u].hidden=o);n[s]&&(o?n[i]?n[s].hidden=o:n[i]=n[s]:(n[i]==n[s]&&(n[i]=undefined),n[s].hidden=o))},this.updateOnChange=function(e){var t=this.session.lineWidgets;if(!t)return;var n=e.start.row,r=e.end.row-n;if(r!==0)if(e.action==\"remove\"){var i=t.splice(n+1,r);i.forEach(function(e){e&&this.removeLineWidget(e)},this),this.$updateRows()}else{var s=new Array(r);s.unshift(n,0),t.splice.apply(t,s),this.$updateRows()}},this.$updateRows=function(){var e=this.session.lineWidgets;if(!e)return;var t=!0;e.forEach(function(e,n){if(e){t=!1,e.row=n;while(e.$oldWidget)e.$oldWidget.row=n,e=e.$oldWidget}}),t&&(this.session.lineWidgets=null)},this.addLineWidget=function(e){this.session.lineWidgets||(this.session.lineWidgets=new Array(this.session.getLength()));var t=this.session.lineWidgets[e.row];t&&(e.$oldWidget=t,t.el&&t.el.parentNode&&(t.el.parentNode.removeChild(t.el),t._inDocument=!1)),this.session.lineWidgets[e.row]=e,e.session=this.session;var n=this.editor.renderer;e.html&&!e.el&&(e.el=i.createElement(\"div\"),e.el.innerHTML=e.html),e.el&&(i.addCssClass(e.el,\"ace_lineWidgetContainer\"),e.el.style.position=\"absolute\",e.el.style.zIndex=5,n.container.appendChild(e.el),e._inDocument=!0),e.coverGutter||(e.el.style.zIndex=3),e.pixelHeight==null&&(e.pixelHeight=e.el.offsetHeight),e.rowCount==null&&(e.rowCount=e.pixelHeight/n.layerConfig.lineHeight);var r=this.session.getFoldAt(e.row,0);e.$fold=r;if(r){var s=this.session.lineWidgets;e.row==r.end.row&&!s[r.start.row]?s[r.start.row]=e:e.hidden=!0}return this.session._emit(\"changeFold\",{data:{start:{row:e.row}}}),this.$updateRows(),this.renderWidgets(null,n),this.onWidgetChanged(e),e},this.removeLineWidget=function(e){e._inDocument=!1,e.session=null,e.el&&e.el.parentNode&&e.el.parentNode.removeChild(e.el);if(e.editor&&e.editor.destroy)try{e.editor.destroy()}catch(t){}if(this.session.lineWidgets){var n=this.session.lineWidgets[e.row];if(n==e)this.session.lineWidgets[e.row]=e.$oldWidget,e.$oldWidget&&this.onWidgetChanged(e.$oldWidget);else while(n){if(n.$oldWidget==e){n.$oldWidget=e.$oldWidget;break}n=n.$oldWidget}}this.session._emit(\"changeFold\",{data:{start:{row:e.row}}}),this.$updateRows()},this.getWidgetsAtRow=function(e){var t=this.session.lineWidgets,n=t&&t[e],r=[];while(n)r.push(n),n=n.$oldWidget;return r},this.onWidgetChanged=function(e){this.session._changedWidgets.push(e),this.editor&&this.editor.renderer.updateFull()},this.measureWidgets=function(e,t){var n=this.session._changedWidgets,r=t.layerConfig;if(!n||!n.length)return;var i=Infinity;for(var s=0;s<n.length;s++){var o=n[s];if(!o||!o.el)continue;if(o.session!=this.session)continue;if(!o._inDocument){if(this.session.lineWidgets[o.row]!=o)continue;o._inDocument=!0,t.container.appendChild(o.el)}o.h=o.el.offsetHeight,o.fixedWidth||(o.w=o.el.offsetWidth,o.screenWidth=Math.ceil(o.w/r.characterWidth));var u=o.h/r.lineHeight;o.coverLine&&(u-=this.session.getRowLineCount(o.row),u<0&&(u=0)),o.rowCount!=u&&(o.rowCount=u,o.row<i&&(i=o.row))}i!=Infinity&&(this.session._emit(\"changeFold\",{data:{start:{row:i}}}),this.session.lineWidgetWidth=null),this.session._changedWidgets=[]},this.renderWidgets=function(e,t){var n=t.layerConfig,r=this.session.lineWidgets;if(!r)return;var i=Math.min(this.firstRow,n.firstRow),s=Math.max(this.lastRow,n.lastRow,r.length);while(i>0&&!r[i])i--;this.firstRow=n.firstRow,this.lastRow=n.lastRow,t.$cursorLayer.config=n;for(var o=i;o<=s;o++){var u=r[o];if(!u||!u.el)continue;if(u.hidden){u.el.style.top=-100-(u.pixelHeight||0)+\"px\";continue}u._inDocument||(u._inDocument=!0,t.container.appendChild(u.el));var a=t.$cursorLayer.getPixelPosition({row:o,column:0},!0).top;u.coverLine||(a+=n.lineHeight*this.session.getRowLineCount(u.row)),u.el.style.top=a-n.offset+\"px\";var f=u.coverGutter?0:t.gutterWidth;u.fixedWidth||(f-=t.scrollLeft),u.el.style.left=f+\"px\",u.fullWidth&&u.screenWidth&&(u.el.style.minWidth=n.width+2*n.padding+\"px\"),u.fixedWidth?u.el.style.right=t.scrollBar.getWidth()+\"px\":u.el.style.right=\"\"}}}).call(o.prototype),t.LineWidgets=o}),define(\"ace/ext/error_marker\",[\"require\",\"exports\",\"module\",\"ace/line_widgets\",\"ace/lib/dom\",\"ace/range\"],function(e,t,n){\"use strict\";function o(e,t,n){var r=0,i=e.length-1;while(r<=i){var s=r+i>>1,o=n(t,e[s]);if(o>0)r=s+1;else{if(!(o<0))return s;i=s-1}}return-(r+1)}function u(e,t,n){var r=e.getAnnotations().sort(s.comparePoints);if(!r.length)return;var i=o(r,{row:t,column:-1},s.comparePoints);i<0&&(i=-i-1),i>=r.length?i=n>0?0:r.length-1:i===0&&n<0&&(i=r.length-1);var u=r[i];if(!u||!n)return;if(u.row===t){do u=r[i+=n];while(u&&u.row===t);if(!u)return r.slice()}var a=[];t=u.row;do a[n<0?\"unshift\":\"push\"](u),u=r[i+=n];while(u&&u.row==t);return a.length&&a}var r=e(\"../line_widgets\").LineWidgets,i=e(\"../lib/dom\"),s=e(\"../range\").Range;t.showErrorMarker=function(e,t){var n=e.session;n.widgetManager||(n.widgetManager=new r(n),n.widgetManager.attach(e));var s=e.getCursorPosition(),o=s.row,a=n.widgetManager.getWidgetsAtRow(o).filter(function(e){return e.type==\"errorMarker\"})[0];a?a.destroy():o-=t;var f=u(n,o,t),l;if(f){var c=f[0];s.column=(c.pos&&typeof c.column!=\"number\"?c.pos.sc:c.column)||0,s.row=c.row,l=e.renderer.$gutterLayer.$annotations[s.row]}else{if(a)return;l={text:[\"Looks good!\"],className:\"ace_ok\"}}e.session.unfold(s.row),e.selection.moveToPosition(s);var h={row:s.row,fixedWidth:!0,coverGutter:!0,el:i.createElement(\"div\"),type:\"errorMarker\"},p=h.el.appendChild(i.createElement(\"div\")),d=h.el.appendChild(i.createElement(\"div\"));d.className=\"error_widget_arrow \"+l.className;var v=e.renderer.$cursorLayer.getPixelPosition(s).left;d.style.left=v+e.renderer.gutterWidth-5+\"px\",h.el.className=\"error_widget_wrapper\",p.className=\"error_widget \"+l.className,p.innerHTML=l.text.join(\"<br>\"),p.appendChild(i.createElement(\"div\"));var m=function(e,t,n){if(t===0&&(n===\"esc\"||n===\"return\"))return h.destroy(),{command:\"null\"}};h.destroy=function(){if(e.$mouseHandler.isMousePressed)return;e.keyBinding.removeKeyboardHandler(m),n.widgetManager.removeLineWidget(h),e.off(\"changeSelection\",h.destroy),e.off(\"changeSession\",h.destroy),e.off(\"mouseup\",h.destroy),e.off(\"change\",h.destroy)},e.keyBinding.addKeyboardHandler(m),e.on(\"changeSelection\",h.destroy),e.on(\"changeSession\",h.destroy),e.on(\"mouseup\",h.destroy),e.on(\"change\",h.destroy),e.session.widgetManager.addLineWidget(h),h.el.onmousedown=e.focus.bind(e),e.renderer.scrollCursorIntoView(null,.5,{bottom:h.el.offsetHeight})},i.importCssString(\"    .error_widget_wrapper {        background: inherit;        color: inherit;        border:none    }    .error_widget {        border-top: solid 2px;        border-bottom: solid 2px;        margin: 5px 0;        padding: 10px 40px;        white-space: pre-wrap;    }    .error_widget.ace_error, .error_widget_arrow.ace_error{        border-color: #ff5a5a    }    .error_widget.ace_warning, .error_widget_arrow.ace_warning{        border-color: #F1D817    }    .error_widget.ace_info, .error_widget_arrow.ace_info{        border-color: #5a5a5a    }    .error_widget.ace_ok, .error_widget_arrow.ace_ok{        border-color: #5aaa5a    }    .error_widget_arrow {        position: absolute;        border: solid 5px;        border-top-color: transparent!important;        border-right-color: transparent!important;        border-left-color: transparent!important;        top: -5px;    }\",\"\")}),define(\"ace/ace\",[\"require\",\"exports\",\"module\",\"ace/lib/fixoldbrowsers\",\"ace/lib/dom\",\"ace/lib/event\",\"ace/editor\",\"ace/edit_session\",\"ace/undomanager\",\"ace/virtual_renderer\",\"ace/worker/worker_client\",\"ace/keyboard/hash_handler\",\"ace/placeholder\",\"ace/multi_select\",\"ace/mode/folding/fold_mode\",\"ace/theme/textmate\",\"ace/ext/error_marker\",\"ace/config\"],function(e,t,n){\"use strict\";e(\"./lib/fixoldbrowsers\");var r=e(\"./lib/dom\"),i=e(\"./lib/event\"),s=e(\"./editor\").Editor,o=e(\"./edit_session\").EditSession,u=e(\"./undomanager\").UndoManager,a=e(\"./virtual_renderer\").VirtualRenderer;e(\"./worker/worker_client\"),e(\"./keyboard/hash_handler\"),e(\"./placeholder\"),e(\"./multi_select\"),e(\"./mode/folding/fold_mode\"),e(\"./theme/textmate\"),e(\"./ext/error_marker\"),t.config=e(\"./config\"),t.require=e,typeof define==\"function\"&&(t.define=define),t.edit=function(e){if(typeof e==\"string\"){var n=e;e=document.getElementById(n);if(!e)throw new Error(\"ace.edit can't find div #\"+n)}if(e&&e.env&&e.env.editor instanceof s)return e.env.editor;var o=\"\";if(e&&/input|textarea/i.test(e.tagName)){var u=e;o=u.value,e=r.createElement(\"pre\"),u.parentNode.replaceChild(e,u)}else e&&(o=r.getInnerText(e),e.innerHTML=\"\");var f=t.createEditSession(o),l=new s(new a(e));l.setSession(f);var c={document:f,editor:l,onResize:l.resize.bind(l,null)};return u&&(c.textarea=u),i.addListener(window,\"resize\",c.onResize),l.on(\"destroy\",function(){i.removeListener(window,\"resize\",c.onResize),c.editor.container.env=null}),l.container.env=l.env=c,l},t.createEditSession=function(e,t){var n=new o(e,t);return n.setUndoManager(new u),n},t.EditSession=o,t.UndoManager=u,t.version=\"1.2.8\"});\n            (function() {\n                window.require([\"ace/ace\"], function(a) {\n                    if (a) {\n                        a.config.init(true);\n                        a.define = window.define;\n                    }\n                    if (!window.ace)\n                        window.ace = a;\n                    for (var key in a) if (a.hasOwnProperty(key))\n                        window.ace[key] = a[key];\n                });\n            })();\n        "

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2)(__webpack_require__(15))

/***/ }),
/* 15 */
/***/ (function(module, exports) {


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2)(__webpack_require__(17))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "/**\n * @author qiao / https://github.com/qiao\n * @author mrdoob / http://mrdoob.com\n * @author alteredq / http://alteredqualia.com/\n * @author WestLangley / http://github.com/WestLangley\n * @author erich666 / http://erichaines.com\n */\n\n// This set of controls performs orbiting, dollying (zooming), and panning.\n// Unlike TrackballControls, it maintains the \"up\" direction object.up (+Y by default).\n//\n//    Orbit - left mouse / touch: one finger move\n//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish\n//    Pan - right mouse, or arrow keys / touch: three finger swipe\n\nTHREE.OrbitControls = function ( object, domElement ) {\n\n\tthis.object = object;\n\n\tthis.domElement = ( domElement !== undefined ) ? domElement : document;\n\n\t// Set to false to disable this control\n\tthis.enabled = true;\n\n\t// \"target\" sets the location of focus, where the object orbits around\n\tthis.target = new THREE.Vector3();\n\n\t// How far you can dolly in and out ( PerspectiveCamera only )\n\tthis.minDistance = 0;\n\tthis.maxDistance = Infinity;\n\n\t// How far you can zoom in and out ( OrthographicCamera only )\n\tthis.minZoom = 0;\n\tthis.maxZoom = Infinity;\n\n\t// How far you can orbit vertically, upper and lower limits.\n\t// Range is 0 to Math.PI radians.\n\tthis.minPolarAngle = 0; // radians\n\tthis.maxPolarAngle = Math.PI; // radians\n\n\t// How far you can orbit horizontally, upper and lower limits.\n\t// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].\n\tthis.minAzimuthAngle = - Infinity; // radians\n\tthis.maxAzimuthAngle = Infinity; // radians\n\n\t// Set to true to enable damping (inertia)\n\t// If damping is enabled, you must call controls.update() in your animation loop\n\tthis.enableDamping = false;\n\tthis.dampingFactor = 0.25;\n\n\t// This option actually enables dollying in and out; left as \"zoom\" for backwards compatibility.\n\t// Set to false to disable zooming\n\tthis.enableZoom = true;\n\tthis.zoomSpeed = 1.0;\n\n\t// Set to false to disable rotating\n\tthis.enableRotate = true;\n\tthis.rotateSpeed = 1.0;\n\n\t// Set to false to disable panning\n\tthis.enablePan = true;\n\tthis.keyPanSpeed = 7.0;\t// pixels moved per arrow key push\n\n\t// Set to true to automatically rotate around the target\n\t// If auto-rotate is enabled, you must call controls.update() in your animation loop\n\tthis.autoRotate = false;\n\tthis.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60\n\n\t// Set to false to disable use of the keys\n\tthis.enableKeys = true;\n\n\t// The four arrow keys\n\tthis.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };\n\n\t// Mouse buttons\n\tthis.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };\n\n\t// for reset\n\tthis.target0 = this.target.clone();\n\tthis.position0 = this.object.position.clone();\n\tthis.zoom0 = this.object.zoom;\n\n\t//\n\t// public methods\n\t//\n\n\tthis.getPolarAngle = function () {\n\n\t\treturn spherical.phi;\n\n\t};\n\n\tthis.getAzimuthalAngle = function () {\n\n\t\treturn spherical.theta;\n\n\t};\n\n\tthis.saveState = function () {\n\n\t\tscope.target0.copy( scope.target );\n\t\tscope.position0.copy( scope.object.position );\n\t\tscope.zoom0 = scope.object.zoom;\n\n\t};\n\n\tthis.reset = function () {\n\n\t\tscope.target.copy( scope.target0 );\n\t\tscope.object.position.copy( scope.position0 );\n\t\tscope.object.zoom = scope.zoom0;\n\n\t\tscope.object.updateProjectionMatrix();\n\t\tscope.dispatchEvent( changeEvent );\n\n\t\tscope.update();\n\n\t\tstate = STATE.NONE;\n\n\t};\n\n\t// this method is exposed, but perhaps it would be better if we can make it private...\n\tthis.update = function () {\n\n\t\tvar offset = new THREE.Vector3();\n\n\t\t// so camera.up is the orbit axis\n\t\tvar quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );\n\t\tvar quatInverse = quat.clone().inverse();\n\n\t\tvar lastPosition = new THREE.Vector3();\n\t\tvar lastQuaternion = new THREE.Quaternion();\n\n\t\treturn function update() {\n\n\t\t\tvar position = scope.object.position;\n\n\t\t\toffset.copy( position ).sub( scope.target );\n\n\t\t\t// rotate offset to \"y-axis-is-up\" space\n\t\t\toffset.applyQuaternion( quat );\n\n\t\t\t// angle from z-axis around y-axis\n\t\t\tspherical.setFromVector3( offset );\n\n\t\t\tif ( scope.autoRotate && state === STATE.NONE ) {\n\n\t\t\t\trotateLeft( getAutoRotationAngle() );\n\n\t\t\t}\n\n\t\t\tspherical.theta += sphericalDelta.theta;\n\t\t\tspherical.phi += sphericalDelta.phi;\n\n\t\t\t// restrict theta to be between desired limits\n\t\t\tspherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );\n\n\t\t\t// restrict phi to be between desired limits\n\t\t\tspherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );\n\n\t\t\tspherical.makeSafe();\n\n\n\t\t\tspherical.radius *= scale;\n\n\t\t\t// restrict radius to be between desired limits\n\t\t\tspherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );\n\n\t\t\t// move target to panned location\n\t\t\tscope.target.add( panOffset );\n\n\t\t\toffset.setFromSpherical( spherical );\n\n\t\t\t// rotate offset back to \"camera-up-vector-is-up\" space\n\t\t\toffset.applyQuaternion( quatInverse );\n\n\t\t\tposition.copy( scope.target ).add( offset );\n\n\t\t\tscope.object.lookAt( scope.target );\n\n\t\t\tif ( scope.enableDamping === true ) {\n\n\t\t\t\tsphericalDelta.theta *= ( 1 - scope.dampingFactor );\n\t\t\t\tsphericalDelta.phi *= ( 1 - scope.dampingFactor );\n\n\t\t\t} else {\n\n\t\t\t\tsphericalDelta.set( 0, 0, 0 );\n\n\t\t\t}\n\n\t\t\tscale = 1;\n\t\t\tpanOffset.set( 0, 0, 0 );\n\n\t\t\t// update condition is:\n\t\t\t// min(camera displacement, camera rotation in radians)^2 > EPS\n\t\t\t// using small-angle approximation cos(x/2) = 1 - x^2 / 8\n\n\t\t\tif ( zoomChanged ||\n\t\t\t\tlastPosition.distanceToSquared( scope.object.position ) > EPS ||\n\t\t\t\t8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {\n\n\t\t\t\tscope.dispatchEvent( changeEvent );\n\n\t\t\t\tlastPosition.copy( scope.object.position );\n\t\t\t\tlastQuaternion.copy( scope.object.quaternion );\n\t\t\t\tzoomChanged = false;\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\t\t\treturn false;\n\n\t\t};\n\n\t}();\n\n\tthis.dispose = function () {\n\n\t\tscope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );\n\t\tscope.domElement.removeEventListener( 'mousedown', onMouseDown, false );\n\t\tscope.domElement.removeEventListener( 'wheel', onMouseWheel, false );\n\n\t\tscope.domElement.removeEventListener( 'touchstart', onTouchStart, false );\n\t\tscope.domElement.removeEventListener( 'touchend', onTouchEnd, false );\n\t\tscope.domElement.removeEventListener( 'touchmove', onTouchMove, false );\n\n\t\tdocument.removeEventListener( 'mousemove', onMouseMove, false );\n\t\tdocument.removeEventListener( 'mouseup', onMouseUp, false );\n\n\t\twindow.removeEventListener( 'keydown', onKeyDown, false );\n\n\t\t//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?\n\n\t};\n\n\t//\n\t// internals\n\t//\n\n\tvar scope = this;\n\n\tvar changeEvent = { type: 'change' };\n\tvar startEvent = { type: 'start' };\n\tvar endEvent = { type: 'end' };\n\n\tvar STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };\n\n\tvar state = STATE.NONE;\n\n\tvar EPS = 0.000001;\n\n\t// current position in spherical coordinates\n\tvar spherical = new THREE.Spherical();\n\tvar sphericalDelta = new THREE.Spherical();\n\n\tvar scale = 1;\n\tvar panOffset = new THREE.Vector3();\n\tvar zoomChanged = false;\n\n\tvar rotateStart = new THREE.Vector2();\n\tvar rotateEnd = new THREE.Vector2();\n\tvar rotateDelta = new THREE.Vector2();\n\n\tvar panStart = new THREE.Vector2();\n\tvar panEnd = new THREE.Vector2();\n\tvar panDelta = new THREE.Vector2();\n\n\tvar dollyStart = new THREE.Vector2();\n\tvar dollyEnd = new THREE.Vector2();\n\tvar dollyDelta = new THREE.Vector2();\n\n\tfunction getAutoRotationAngle() {\n\n\t\treturn 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;\n\n\t}\n\n\tfunction getZoomScale() {\n\n\t\treturn Math.pow( 0.95, scope.zoomSpeed );\n\n\t}\n\n\tfunction rotateLeft( angle ) {\n\n\t\tsphericalDelta.theta -= angle;\n\n\t}\n\n\tfunction rotateUp( angle ) {\n\n\t\tsphericalDelta.phi -= angle;\n\n\t}\n\n\tvar panLeft = function () {\n\n\t\tvar v = new THREE.Vector3();\n\n\t\treturn function panLeft( distance, objectMatrix ) {\n\n\t\t\tv.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix\n\t\t\tv.multiplyScalar( - distance );\n\n\t\t\tpanOffset.add( v );\n\n\t\t};\n\n\t}();\n\n\tvar panUp = function () {\n\n\t\tvar v = new THREE.Vector3();\n\n\t\treturn function panUp( distance, objectMatrix ) {\n\n\t\t\tv.setFromMatrixColumn( objectMatrix, 1 ); // get Y column of objectMatrix\n\t\t\tv.multiplyScalar( distance );\n\n\t\t\tpanOffset.add( v );\n\n\t\t};\n\n\t}();\n\n\t// deltaX and deltaY are in pixels; right and down are positive\n\tvar pan = function () {\n\n\t\tvar offset = new THREE.Vector3();\n\n\t\treturn function pan( deltaX, deltaY ) {\n\n\t\t\tvar element = scope.domElement === document ? scope.domElement.body : scope.domElement;\n\n\t\t\tif ( scope.object instanceof THREE.PerspectiveCamera ) {\n\n\t\t\t\t// perspective\n\t\t\t\tvar position = scope.object.position;\n\t\t\t\toffset.copy( position ).sub( scope.target );\n\t\t\t\tvar targetDistance = offset.length();\n\n\t\t\t\t// half of the fov is center to top of screen\n\t\t\t\ttargetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );\n\n\t\t\t\t// we actually don't use screenWidth, since perspective camera is fixed to screen height\n\t\t\t\tpanLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );\n\t\t\t\tpanUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );\n\n\t\t\t} else if ( scope.object instanceof THREE.OrthographicCamera ) {\n\n\t\t\t\t// orthographic\n\t\t\t\tpanLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );\n\t\t\t\tpanUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );\n\n\t\t\t} else {\n\n\t\t\t\t// camera neither orthographic nor perspective\n\t\t\t\tconsole.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );\n\t\t\t\tscope.enablePan = false;\n\n\t\t\t}\n\n\t\t};\n\n\t}();\n\n\tfunction dollyIn( dollyScale ) {\n\n\t\tif ( scope.object instanceof THREE.PerspectiveCamera ) {\n\n\t\t\tscale /= dollyScale;\n\n\t\t} else if ( scope.object instanceof THREE.OrthographicCamera ) {\n\n\t\t\tscope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );\n\t\t\tscope.object.updateProjectionMatrix();\n\t\t\tzoomChanged = true;\n\n\t\t} else {\n\n\t\t\tconsole.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );\n\t\t\tscope.enableZoom = false;\n\n\t\t}\n\n\t}\n\n\tfunction dollyOut( dollyScale ) {\n\n\t\tif ( scope.object instanceof THREE.PerspectiveCamera ) {\n\n\t\t\tscale *= dollyScale;\n\n\t\t} else if ( scope.object instanceof THREE.OrthographicCamera ) {\n\n\t\t\tscope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );\n\t\t\tscope.object.updateProjectionMatrix();\n\t\t\tzoomChanged = true;\n\n\t\t} else {\n\n\t\t\tconsole.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );\n\t\t\tscope.enableZoom = false;\n\n\t\t}\n\n\t}\n\n\t//\n\t// event callbacks - update the object state\n\t//\n\n\tfunction handleMouseDownRotate( event ) {\n\n\t\t//console.log( 'handleMouseDownRotate' );\n\n\t\trotateStart.set( event.clientX, event.clientY );\n\n\t}\n\n\tfunction handleMouseDownDolly( event ) {\n\n\t\t//console.log( 'handleMouseDownDolly' );\n\n\t\tdollyStart.set( event.clientX, event.clientY );\n\n\t}\n\n\tfunction handleMouseDownPan( event ) {\n\n\t\t//console.log( 'handleMouseDownPan' );\n\n\t\tpanStart.set( event.clientX, event.clientY );\n\n\t}\n\n\tfunction handleMouseMoveRotate( event ) {\n\n\t\t//console.log( 'handleMouseMoveRotate' );\n\n\t\trotateEnd.set( event.clientX, event.clientY );\n\t\trotateDelta.subVectors( rotateEnd, rotateStart );\n\n\t\tvar element = scope.domElement === document ? scope.domElement.body : scope.domElement;\n\n\t\t// rotating across whole screen goes 360 degrees around\n\t\trotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );\n\n\t\t// rotating up and down along whole screen attempts to go 360, but limited to 180\n\t\trotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );\n\n\t\trotateStart.copy( rotateEnd );\n\n\t\tscope.update();\n\n\t}\n\n\tfunction handleMouseMoveDolly( event ) {\n\n\t\t//console.log( 'handleMouseMoveDolly' );\n\n\t\tdollyEnd.set( event.clientX, event.clientY );\n\n\t\tdollyDelta.subVectors( dollyEnd, dollyStart );\n\n\t\tif ( dollyDelta.y > 0 ) {\n\n\t\t\tdollyIn( getZoomScale() );\n\n\t\t} else if ( dollyDelta.y < 0 ) {\n\n\t\t\tdollyOut( getZoomScale() );\n\n\t\t}\n\n\t\tdollyStart.copy( dollyEnd );\n\n\t\tscope.update();\n\n\t}\n\n\tfunction handleMouseMovePan( event ) {\n\n\t\t//console.log( 'handleMouseMovePan' );\n\n\t\tpanEnd.set( event.clientX, event.clientY );\n\n\t\tpanDelta.subVectors( panEnd, panStart );\n\n\t\tpan( panDelta.x, panDelta.y );\n\n\t\tpanStart.copy( panEnd );\n\n\t\tscope.update();\n\n\t}\n\n\tfunction handleMouseUp( event ) {\n\n\t\t// console.log( 'handleMouseUp' );\n\n\t}\n\n\tfunction handleMouseWheel( event ) {\n\n\t\t// console.log( 'handleMouseWheel' );\n\n\t\tif ( event.deltaY < 0 ) {\n\n\t\t\tdollyOut( getZoomScale() );\n\n\t\t} else if ( event.deltaY > 0 ) {\n\n\t\t\tdollyIn( getZoomScale() );\n\n\t\t}\n\n\t\tscope.update();\n\n\t}\n\n\tfunction handleKeyDown( event ) {\n\n\t\t//console.log( 'handleKeyDown' );\n\n\t\tswitch ( event.keyCode ) {\n\n\t\t\tcase scope.keys.UP:\n\t\t\t\tpan( 0, scope.keyPanSpeed );\n\t\t\t\tscope.update();\n\t\t\t\tbreak;\n\n\t\t\tcase scope.keys.BOTTOM:\n\t\t\t\tpan( 0, - scope.keyPanSpeed );\n\t\t\t\tscope.update();\n\t\t\t\tbreak;\n\n\t\t\tcase scope.keys.LEFT:\n\t\t\t\tpan( scope.keyPanSpeed, 0 );\n\t\t\t\tscope.update();\n\t\t\t\tbreak;\n\n\t\t\tcase scope.keys.RIGHT:\n\t\t\t\tpan( - scope.keyPanSpeed, 0 );\n\t\t\t\tscope.update();\n\t\t\t\tbreak;\n\n\t\t}\n\n\t}\n\n\tfunction handleTouchStartRotate( event ) {\n\n\t\t//console.log( 'handleTouchStartRotate' );\n\n\t\trotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );\n\n\t}\n\n\tfunction handleTouchStartDolly( event ) {\n\n\t\t//console.log( 'handleTouchStartDolly' );\n\n\t\tvar dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;\n\t\tvar dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;\n\n\t\tvar distance = Math.sqrt( dx * dx + dy * dy );\n\n\t\tdollyStart.set( 0, distance );\n\n\t}\n\n\tfunction handleTouchStartPan( event ) {\n\n\t\t//console.log( 'handleTouchStartPan' );\n\n\t\tpanStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );\n\n\t}\n\n\tfunction handleTouchMoveRotate( event ) {\n\n\t\t//console.log( 'handleTouchMoveRotate' );\n\n\t\trotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );\n\t\trotateDelta.subVectors( rotateEnd, rotateStart );\n\n\t\tvar element = scope.domElement === document ? scope.domElement.body : scope.domElement;\n\n\t\t// rotating across whole screen goes 360 degrees around\n\t\trotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );\n\n\t\t// rotating up and down along whole screen attempts to go 360, but limited to 180\n\t\trotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );\n\n\t\trotateStart.copy( rotateEnd );\n\n\t\tscope.update();\n\n\t}\n\n\tfunction handleTouchMoveDolly( event ) {\n\n\t\t//console.log( 'handleTouchMoveDolly' );\n\n\t\tvar dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;\n\t\tvar dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;\n\n\t\tvar distance = Math.sqrt( dx * dx + dy * dy );\n\n\t\tdollyEnd.set( 0, distance );\n\n\t\tdollyDelta.subVectors( dollyEnd, dollyStart );\n\n\t\tif ( dollyDelta.y > 0 ) {\n\n\t\t\tdollyOut( getZoomScale() );\n\n\t\t} else if ( dollyDelta.y < 0 ) {\n\n\t\t\tdollyIn( getZoomScale() );\n\n\t\t}\n\n\t\tdollyStart.copy( dollyEnd );\n\n\t\tscope.update();\n\n\t}\n\n\tfunction handleTouchMovePan( event ) {\n\n\t\t//console.log( 'handleTouchMovePan' );\n\n\t\tpanEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );\n\n\t\tpanDelta.subVectors( panEnd, panStart );\n\n\t\tpan( panDelta.x, panDelta.y );\n\n\t\tpanStart.copy( panEnd );\n\n\t\tscope.update();\n\n\t}\n\n\tfunction handleTouchEnd( event ) {\n\n\t\t//console.log( 'handleTouchEnd' );\n\n\t}\n\n\t//\n\t// event handlers - FSM: listen for events and reset state\n\t//\n\n\tfunction onMouseDown( event ) {\n\n\t\tif ( scope.enabled === false ) return;\n\n\t\tevent.preventDefault();\n\n\t\tswitch ( event.button ) {\n\n\t\t\tcase scope.mouseButtons.ORBIT:\n\n\t\t\t\tif ( scope.enableRotate === false ) return;\n\n\t\t\t\thandleMouseDownRotate( event );\n\n\t\t\t\tstate = STATE.ROTATE;\n\n\t\t\t\tbreak;\n\n\t\t\tcase scope.mouseButtons.ZOOM:\n\n\t\t\t\tif ( scope.enableZoom === false ) return;\n\n\t\t\t\thandleMouseDownDolly( event );\n\n\t\t\t\tstate = STATE.DOLLY;\n\n\t\t\t\tbreak;\n\n\t\t\tcase scope.mouseButtons.PAN:\n\n\t\t\t\tif ( scope.enablePan === false ) return;\n\n\t\t\t\thandleMouseDownPan( event );\n\n\t\t\t\tstate = STATE.PAN;\n\n\t\t\t\tbreak;\n\n\t\t}\n\n\t\tif ( state !== STATE.NONE ) {\n\n\t\t\tdocument.addEventListener( 'mousemove', onMouseMove, false );\n\t\t\tdocument.addEventListener( 'mouseup', onMouseUp, false );\n\n\t\t\tscope.dispatchEvent( startEvent );\n\n\t\t}\n\n\t}\n\n\tfunction onMouseMove( event ) {\n\n\t\tif ( scope.enabled === false ) return;\n\n\t\tevent.preventDefault();\n\n\t\tswitch ( state ) {\n\n\t\t\tcase STATE.ROTATE:\n\n\t\t\t\tif ( scope.enableRotate === false ) return;\n\n\t\t\t\thandleMouseMoveRotate( event );\n\n\t\t\t\tbreak;\n\n\t\t\tcase STATE.DOLLY:\n\n\t\t\t\tif ( scope.enableZoom === false ) return;\n\n\t\t\t\thandleMouseMoveDolly( event );\n\n\t\t\t\tbreak;\n\n\t\t\tcase STATE.PAN:\n\n\t\t\t\tif ( scope.enablePan === false ) return;\n\n\t\t\t\thandleMouseMovePan( event );\n\n\t\t\t\tbreak;\n\n\t\t}\n\n\t}\n\n\tfunction onMouseUp( event ) {\n\n\t\tif ( scope.enabled === false ) return;\n\n\t\thandleMouseUp( event );\n\n\t\tdocument.removeEventListener( 'mousemove', onMouseMove, false );\n\t\tdocument.removeEventListener( 'mouseup', onMouseUp, false );\n\n\t\tscope.dispatchEvent( endEvent );\n\n\t\tstate = STATE.NONE;\n\n\t}\n\n\tfunction onMouseWheel( event ) {\n\n\t\tif ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;\n\n\t\tevent.preventDefault();\n\t\tevent.stopPropagation();\n\n\t\thandleMouseWheel( event );\n\n\t\tscope.dispatchEvent( startEvent ); // not sure why these are here...\n\t\tscope.dispatchEvent( endEvent );\n\n\t}\n\n\tfunction onKeyDown( event ) {\n\n\t\tif ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;\n\n\t\thandleKeyDown( event );\n\n\t}\n\n\tfunction onTouchStart( event ) {\n\n\t\tif ( scope.enabled === false ) return;\n\n\t\tswitch ( event.touches.length ) {\n\n\t\t\tcase 1:\t// one-fingered touch: rotate\n\n\t\t\t\tif ( scope.enableRotate === false ) return;\n\n\t\t\t\thandleTouchStartRotate( event );\n\n\t\t\t\tstate = STATE.TOUCH_ROTATE;\n\n\t\t\t\tbreak;\n\n\t\t\tcase 2:\t// two-fingered touch: dolly\n\n\t\t\t\tif ( scope.enableZoom === false ) return;\n\n\t\t\t\thandleTouchStartDolly( event );\n\n\t\t\t\tstate = STATE.TOUCH_DOLLY;\n\n\t\t\t\tbreak;\n\n\t\t\tcase 3: // three-fingered touch: pan\n\n\t\t\t\tif ( scope.enablePan === false ) return;\n\n\t\t\t\thandleTouchStartPan( event );\n\n\t\t\t\tstate = STATE.TOUCH_PAN;\n\n\t\t\t\tbreak;\n\n\t\t\tdefault:\n\n\t\t\t\tstate = STATE.NONE;\n\n\t\t}\n\n\t\tif ( state !== STATE.NONE ) {\n\n\t\t\tscope.dispatchEvent( startEvent );\n\n\t\t}\n\n\t}\n\n\tfunction onTouchMove( event ) {\n\n\t\tif ( scope.enabled === false ) return;\n\n\t\tevent.preventDefault();\n\t\tevent.stopPropagation();\n\n\t\tswitch ( event.touches.length ) {\n\n\t\t\tcase 1: // one-fingered touch: rotate\n\n\t\t\t\tif ( scope.enableRotate === false ) return;\n\t\t\t\tif ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?...\n\n\t\t\t\thandleTouchMoveRotate( event );\n\n\t\t\t\tbreak;\n\n\t\t\tcase 2: // two-fingered touch: dolly\n\n\t\t\t\tif ( scope.enableZoom === false ) return;\n\t\t\t\tif ( state !== STATE.TOUCH_DOLLY ) return; // is this needed?...\n\n\t\t\t\thandleTouchMoveDolly( event );\n\n\t\t\t\tbreak;\n\n\t\t\tcase 3: // three-fingered touch: pan\n\n\t\t\t\tif ( scope.enablePan === false ) return;\n\t\t\t\tif ( state !== STATE.TOUCH_PAN ) return; // is this needed?...\n\n\t\t\t\thandleTouchMovePan( event );\n\n\t\t\t\tbreak;\n\n\t\t\tdefault:\n\n\t\t\t\tstate = STATE.NONE;\n\n\t\t}\n\n\t}\n\n\tfunction onTouchEnd( event ) {\n\n\t\tif ( scope.enabled === false ) return;\n\n\t\thandleTouchEnd( event );\n\n\t\tscope.dispatchEvent( endEvent );\n\n\t\tstate = STATE.NONE;\n\n\t}\n\n\tfunction onContextMenu( event ) {\n\n\t\tif ( scope.enabled === false ) return;\n\n\t\tevent.preventDefault();\n\n\t}\n\n\t//\n\n\tscope.domElement.addEventListener( 'contextmenu', onContextMenu, false );\n\n\tscope.domElement.addEventListener( 'mousedown', onMouseDown, false );\n\tscope.domElement.addEventListener( 'wheel', onMouseWheel, false );\n\n\tscope.domElement.addEventListener( 'touchstart', onTouchStart, false );\n\tscope.domElement.addEventListener( 'touchend', onTouchEnd, false );\n\tscope.domElement.addEventListener( 'touchmove', onTouchMove, false );\n\n\twindow.addEventListener( 'keydown', onKeyDown, false );\n\n\t// force an update at start\n\n\tthis.update();\n\n};\n\nTHREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );\nTHREE.OrbitControls.prototype.constructor = THREE.OrbitControls;\n\nObject.defineProperties( THREE.OrbitControls.prototype, {\n\n\tcenter: {\n\n\t\tget: function () {\n\n\t\t\tconsole.warn( 'THREE.OrbitControls: .center has been renamed to .target' );\n\t\t\treturn this.target;\n\n\t\t}\n\n\t},\n\n\t// backward compatibility\n\n\tnoZoom: {\n\n\t\tget: function () {\n\n\t\t\tconsole.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );\n\t\t\treturn ! this.enableZoom;\n\n\t\t},\n\n\t\tset: function ( value ) {\n\n\t\t\tconsole.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );\n\t\t\tthis.enableZoom = ! value;\n\n\t\t}\n\n\t},\n\n\tnoRotate: {\n\n\t\tget: function () {\n\n\t\t\tconsole.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );\n\t\t\treturn ! this.enableRotate;\n\n\t\t},\n\n\t\tset: function ( value ) {\n\n\t\t\tconsole.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );\n\t\t\tthis.enableRotate = ! value;\n\n\t\t}\n\n\t},\n\n\tnoPan: {\n\n\t\tget: function () {\n\n\t\t\tconsole.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );\n\t\t\treturn ! this.enablePan;\n\n\t\t},\n\n\t\tset: function ( value ) {\n\n\t\t\tconsole.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );\n\t\t\tthis.enablePan = ! value;\n\n\t\t}\n\n\t},\n\n\tnoKeys: {\n\n\t\tget: function () {\n\n\t\t\tconsole.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );\n\t\t\treturn ! this.enableKeys;\n\n\t\t},\n\n\t\tset: function ( value ) {\n\n\t\t\tconsole.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );\n\t\t\tthis.enableKeys = ! value;\n\n\t\t}\n\n\t},\n\n\tstaticMoving: {\n\n\t\tget: function () {\n\n\t\t\tconsole.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );\n\t\t\treturn ! this.enableDamping;\n\n\t\t},\n\n\t\tset: function ( value ) {\n\n\t\t\tconsole.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );\n\t\t\tthis.enableDamping = ! value;\n\n\t\t}\n\n\t},\n\n\tdynamicDampingFactor: {\n\n\t\tget: function () {\n\n\t\t\tconsole.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );\n\t\t\treturn this.dampingFactor;\n\n\t\t},\n\n\t\tset: function ( value ) {\n\n\t\t\tconsole.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );\n\t\t\tthis.dampingFactor = value;\n\n\t\t}\n\n\t}\n\n} );\n"

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2)(__webpack_require__(19))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "DebugShaders = {}\r\n\r\n;(function() {\r\n\r\n    const variableRegex = /((((precision|varying|uniform|attribute)\\s+)?)((highp|mediump|lowp)\\s+)?)(vec4|vec3|vec2|float|int|uint|bool)\\s+([A-Za-z0-9]+)/\r\n    const canvas = document.createElement('canvas')\r\n    const ctx = canvas.getContext('2d')\r\n    canvas.width = 100\r\n    canvas.height = 100\r\n\r\n    const normalize = shader => {\r\n        return shader\r\n            .replace(/\\/\\/[^\\n]*\\n/g, '')               // comment line\r\n            .replace(/\\/\\*(\\*(?!\\/)|[^*])*\\*\\//, '')    // block comment\r\n            .replace(/(\\n|\\s)+/g, ' ')\r\n            .replace(/\\s*{\\s*/g, '\\n{\\n')\r\n            .replace(/\\s*}\\s*/g, '\\n}\\n')\r\n            .replace(/\\s*;\\s*/g, ';\\n')\r\n            .replace(/void\\s+main\\s*\\(\\)(\\s|\\n)*{/, 'void main() {')\r\n    }\r\n\r\n    const toGlFragColorLine = (type, name) => {\r\n        let r = 0\r\n        let g = 0\r\n        let b = 0\r\n        let a = 1\r\n        \r\n        if (/^vec/.test(type)) {\r\n            // TODO: Pack these more so more of\r\n            // the data can be read back out, otherwise\r\n            // they're clamped from 0 to 1.0\r\n            r = `${name}.r`\r\n            g = `${name}.g`\r\n            if (/^vec(3|4)/.test(type)) b = `${name}.b`\r\n            if (/^vec4/.test(type)) a = `${name}.a`\r\n        }\r\n        else if(type === 'bool') {\r\n            r = `${name} ? 1 : 0`\r\n            g = r\r\n            b = r\r\n            a = r\r\n        }\r\n        else if(/^(int|uint)/.test(type)) {\r\n            r = `float((${name} << 0 ) & 0xFF) / 0xFF`\r\n            g = `float((${name} << 8 ) & 0xFF) / 0xFF`\r\n            b = `float((${name} << 16) & 0xFF) / 0xFF`\r\n            a = `float((${name} << 24) & 0xFF) / 0xFF`\r\n        }\r\n        else if(type === 'float') {\r\n            // TODO : Pack this into bytes so we can\r\n            // read it back out as a larger float\r\n            r = `${name}`\r\n        }\r\n\r\n        return `gl_FragColor = vec4(${r},${g},${b},${a});`\r\n    }\r\n\r\n    DebugShaders.enumerate = (vs, fs) => {\r\n        vs = normalize(vs)\r\n        fs = normalize(fs)\r\n\r\n        const shaders = []\r\n        const fsVarying = []\r\n\r\n        // output color for each variable in the frag shader\r\n        const lines = fs.split('\\n')\r\n        lines\r\n            .forEach((line, i) => {\r\n                const matches = line.match(variableRegex)\r\n                if (matches) {\r\n                    const prefix = (matches[1] || '').trim()\r\n                    const type = matches[7].trim()\r\n                    const name = matches[8].trim()\r\n\r\n                    if (prefix) {\r\n                        if (prefix === 'varying') fsVarying.push({ type, name })\r\n                        return\r\n                    }\r\n\r\n                    const newlines = [].concat(lines)\r\n                    newlines[i] += '\\n' + toGlFragColorLine(type, name) + '\\nreturn;\\n'\r\n\r\n                    shaders.push({\r\n                        type,\r\n                        name,\r\n                        vertexShader: vs,\r\n                        fragmentShader: newlines.join('\\n')\r\n                    })\r\n                }\r\n            })\r\n\r\n\r\n        // output color for each varying variable in the frag shader\r\n        fsVarying\r\n            .forEach(it => {\r\n                const mainSig = 'void main() {'\r\n                const res = fs.replace(mainSig, mainSig + '\\n' + toGlFragColorLine(it.type, it.name) + '\\nreturn;\\n')\r\n                shaders.push({\r\n                    type: it.type,\r\n                    name: it.name,\r\n                    vertexShader: vs,\r\n                    fragmentShader: res\r\n                })\r\n            })\r\n\r\n\r\n        return shaders\r\n    }\r\n\r\n    DebugShaders.readPixelColor = (data, x, y, cb) => {\r\n        // TODO: this may be resource intensive? Should create a pool?\r\n        // Should probably require that the containing element\r\n        // manage the image lifecycle        \r\n        let img = new Image()\r\n        img.onload = () => {\r\n            ctx.clearRect(0, 0, 1, 1)\r\n            ctx.drawImage(img, x, y, 1, 1, 0, 0, 1, 1)\r\n\r\n            const data = ctx.getImageData(0,0,1,1).data\r\n            cb({\r\n                get x() { return this.r },\r\n                get y() { return this.g },\r\n                get z() { return this.b },\r\n                get w() { return this.a },\r\n                r: data[0],\r\n                g: data[1],\r\n                b: data[2],\r\n                a: data[3]\r\n            })\r\n\r\n            img.onload = null\r\n            img = null\r\n        }\r\n\r\n        img.src = data\r\n    }\r\n})()"

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(21);

__webpack_require__(1);

__webpack_require__(4);

__webpack_require__(22);

__webpack_require__(3);

__webpack_require__(23);

__webpack_require__(6);


(function() {
  'use strict';

  /**
   * Element class mixin that provides the core API for Polymer's meta-programming
   * features including template stamping, data-binding, attribute deserialization,
   * and property change observation.
   *
   * Subclassers may provide the following static getters to return metadata
   * used to configure Polymer's features for the class:
   *
   * - `static get is()`: When the template is provided via a `dom-module`,
   *   users should return the `dom-module` id from a static `is` getter.  If
   *   no template is needed or the template is provided directly via the
   *   `template` getter, there is no need to define `is` for the element.
   *
   * - `static get template()`: Users may provide the template directly (as
   *   opposed to via `dom-module`) by implementing a static `template` getter.
   *   The getter may return an `HTMLTemplateElement` or a string, which will
   *   automatically be parsed into a template.
   *
   * - `static get properties()`: Should return an object describing
   *   property-related metadata used by Polymer features (key: property name
   *   value: object containing property metadata). Valid keys in per-property
   *   metadata include:
   *   - `type` (String|Number|Object|Array|...): Used by
   *     `attributeChangedCallback` to determine how string-based attributes
   *     are deserialized to JavaScript property values.
   *   - `notify` (boolean): Causes a change in the property to fire a
   *     non-bubbling event called `<property>-changed`. Elements that have
   *     enabled two-way binding to the property use this event to observe changes.
   *   - `readOnly` (boolean): Creates a getter for the property, but no setter.
   *     To set a read-only property, use the private setter method
   *     `_setProperty(property, value)`.
   *   - `observer` (string): Observer method name that will be called when
   *     the property changes. The arguments of the method are
   *     `(value, previousValue)`.
   *   - `computed` (string): String describing method and dependent properties
   *     for computing the value of this property (e.g. `'computeFoo(bar, zot)'`).
   *     Computed properties are read-only by default and can only be changed
   *     via the return value of the computing method.
   *
   * - `static get observers()`: Array of strings describing multi-property
   *   observer methods and their dependent properties (e.g.
   *   `'observeABC(a, b, c)'`).
   *
   * The base class provides default implementations for the following standard
   * custom element lifecycle callbacks; users may override these, but should
   * call the super method to ensure
   * - `constructor`: Run when the element is created or upgraded
   * - `connectedCallback`: Run each time the element is connected to the
   *   document
   * - `disconnectedCallback`: Run each time the element is disconnected from
   *   the document
   * - `attributeChangedCallback`: Run each time an attribute in
   *   `observedAttributes` is set or removed (note: this element's default
   *   `observedAttributes` implementation will automatically return an array
   *   of dash-cased attributes based on `properties`)
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin Polymer.PropertyEffects
   * @memberof Polymer
   * @property rootPath {string} Set to the value of `Polymer.rootPath`,
   *   which defaults to the main document path
   * @property importPath {string} Set to the value of the class's static
   *   `importPath` property, which defaults to the path of this element's
   *   `dom-module` (when `is` is used), but can be overridden for other
   *   import strategies.
   * @summary Element class mixin that provides the core API for Polymer's
   * meta-programming features.
   */
  Polymer.ElementMixin = Polymer.dedupingMixin(base => {

    /**
     * @constructor
     * @extends {base}
     * @implements {Polymer_PropertyEffects}
     */
    const polymerElementBase = Polymer.PropertyEffects(base);

    let caseMap = Polymer.CaseMap;

    /**
     * Returns the `properties` object specifically on `klass`. Use for:
     * (1) super chain mixes togther to make `propertiesForClass` which is
     * then used to make `observedAttributes`.
     * (2) properties effects and observers are created from it at `finalize` time.
     *
     * @param {HTMLElement} klass Element class
     * @return {Object} Object containing own properties for this class
     * @private
     */
    function ownPropertiesForClass(klass) {
      if (!klass.hasOwnProperty(
        JSCompiler_renameProperty('__ownProperties', klass))) {
        klass.__ownProperties =
          klass.hasOwnProperty(JSCompiler_renameProperty('properties', klass)) ?
          /** @type PolymerElementConstructor */ (klass).properties : {};
      }
      return klass.__ownProperties;
    }

    /**
     * Returns the `observers` array specifically on `klass`. Use for
     * setting up observers.
     *
     * @param {HTMLElement} klass Element class
     * @return {Array} Array containing own observers for this class
     * @private
     */
    function ownObserversForClass(klass) {
      if (!klass.hasOwnProperty(
        JSCompiler_renameProperty('__ownObservers', klass))) {
        klass.__ownObservers =
          klass.hasOwnProperty(JSCompiler_renameProperty('observers', klass)) ?
          /** @type PolymerElementConstructor */ (klass).observers : [];
      }
      return klass.__ownObservers;
    }

    /**
     * Mixes `props` into `flattenedProps` but upgrades shorthand type
     * syntax to { type: Type}.
     *
     * @param {Object} flattenedProps Bag to collect flattened properties into
     * @param {Object} props Bag of properties to add to `flattenedProps`
     * @return {Object} The input `flattenedProps` bag
     * @private
     */
    function flattenProperties(flattenedProps, props) {
      for (let p in props) {
        let o = props[p];
        if (typeof o == 'function') {
          o = { type: o };
        }
        flattenedProps[p] = o;
      }
      return flattenedProps;
    }

    /**
     * Returns a flattened list of properties mixed together from the chain of all
     * constructor's `config.properties`. This list is used to create
     * (1) observedAttributes,
     * (2) class property default values
     *
     * @param {PolymerElementConstructor} klass Element class
     * @return {PolymerElementProperties} Flattened properties for this class
     * @suppress {missingProperties} class.prototype is not a property for some reason?
     * @private
     */
    function propertiesForClass(klass) {
      if (!klass.hasOwnProperty(
        JSCompiler_renameProperty('__classProperties', klass))) {
        klass.__classProperties =
        flattenProperties({}, ownPropertiesForClass(klass));
        let superCtor = Object.getPrototypeOf(klass.prototype).constructor;
        if (superCtor.prototype instanceof PolymerElement) {
          klass.__classProperties = Object.assign(
            Object.create(propertiesForClass(/** @type PolymerElementConstructor */(superCtor))),
            klass.__classProperties);
        }
      }
      return klass.__classProperties;
    }

    /**
     * Returns a list of properties with default values.
     * This list is created as an optimization since it is a subset of
     * the list returned from `propertiesForClass`.
     * This list is used in `_initializeProperties` to set property defaults.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @return {PolymerElementProperties} Flattened properties for this class
     *   that have default values
     * @private
     */
    function propertyDefaultsForClass(klass) {
      if (!klass.hasOwnProperty(
        JSCompiler_renameProperty('__classPropertyDefaults', klass))) {
        klass.__classPropertyDefaults = null;
        let props = propertiesForClass(klass);
        for (let p in props) {
          let info = props[p];
          if ('value' in info) {
            klass.__classPropertyDefaults = klass.__classPropertyDefaults || {};
            klass.__classPropertyDefaults[p] = info;
          }
        }
      }
      return klass.__classPropertyDefaults;
    }

    /**
     * Returns true if a `klass` has finalized. Called in `ElementClass.finalize()`
     * @param {PolymerElementConstructor} klass Element class
     * @return {boolean} True if all metaprogramming for this class has been
     *   completed
     * @private
     */
    function hasClassFinalized(klass) {
      return klass.hasOwnProperty(JSCompiler_renameProperty('__finalized', klass));
    }

    /**
     * Called by `ElementClass.finalize()`. Ensures this `klass` and
     * *all superclasses* are finalized by traversing the prototype chain
     * and calling `klass.finalize()`.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @private
     */
    function finalizeClassAndSuper(klass) {
      let proto = /** @type PolymerElementConstructor */ (klass).prototype;
      let superCtor = Object.getPrototypeOf(proto).constructor;
      if (superCtor.prototype instanceof PolymerElement) {
        superCtor.finalize();
      }
      finalizeClass(klass);
    }

    /**
     * Configures a `klass` based on a staic `klass.config` object and
     * a `template`. This includes creating accessors and effects
     * for properties in `config` and the `template` as well as preparing the
     * `template` for stamping.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @private
     */
    function finalizeClass(klass) {
      klass.__finalized = true;
      let proto = /** @type PolymerElementConstructor */ (klass).prototype;
      if (klass.hasOwnProperty(
        JSCompiler_renameProperty('is', klass)) && klass.is) {
        Polymer.telemetry.register(proto);
      }
      let props = ownPropertiesForClass(klass);
      if (props) {
        finalizeProperties(proto, props);
      }
      let observers = ownObserversForClass(klass);
      if (observers) {
        finalizeObservers(proto, observers, props);
      }
      // note: create "working" template that is finalized at instance time
      let template = /** @type PolymerElementConstructor */ (klass).template;
      if (template) {
        if (typeof template === 'string') {
          let t = document.createElement('template');
          t.innerHTML = template;
          template = t;
        } else {
          template = template.cloneNode(true);
        }
        proto._template = template;
      }
    }

    /**
     * Configures a `proto` based on a `properties` object.
     * Leverages `PropertyEffects` to create property accessors and effects
     * supporting, observers, reflecting to attributes, change notification,
     * computed properties, and read only properties.
     * @param {PolymerElement} proto Element class prototype to add accessors
     *    and effects to
     * @param {Object} properties Flattened bag of property descriptors for
     *    this class
     * @private
     */
    function finalizeProperties(proto, properties) {
      for (let p in properties) {
        createPropertyFromConfig(proto, p, properties[p], properties);
      }
    }

    /**
     * Configures a `proto` based on a `observers` array.
     * Leverages `PropertyEffects` to create observers.
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {Object} observers Flattened array of observer descriptors for
     *   this class
     * @param {Object} dynamicFns Object containing keys for any properties
     *   that are functions and should trigger the effect when the function
     *   reference is changed
     * @private
     */
    function finalizeObservers(proto, observers, dynamicFns) {
      for (let i=0; i < observers.length; i++) {
        proto._createMethodObserver(observers[i], dynamicFns);
      }
    }

    /**
     * Creates effects for a property.
     *
     * Note, once a property has been set to
     * `readOnly`, `computed`, `reflectToAttribute`, or `notify`
     * these values may not be changed. For example, a subclass cannot
     * alter these settings. However, additional `observers` may be added
     * by subclasses.
     *
     * The info object should may contain property metadata as follows:
     *
     * * `type`: {function} type to which an attribute matching the property
     * is deserialized. Note the property is camel-cased from a dash-cased
     * attribute. For example, 'foo-bar' attribute is dersialized to a
     * property named 'fooBar'.
     *
     * * `readOnly`: {boolean} creates a readOnly property and
     * makes a private setter for the private of the form '_setFoo' for a
     * property 'foo',
     *
     * * `computed`: {string} creates a computed property. A computed property
     * also automatically is set to `readOnly: true`. The value is calculated
     * by running a method and arguments parsed from the given string. For
     * example 'compute(foo)' will compute a given property when the
     * 'foo' property changes by executing the 'compute' method. This method
     * must return the computed value.
     *
     * * `reflectToAttriute`: {boolean} If true, the property value is reflected
     * to an attribute of the same name. Note, the attribute is dash-cased
     * so a property named 'fooBar' is reflected as 'foo-bar'.
     *
     * * `notify`: {boolean} sends a non-bubbling notification event when
     * the property changes. For example, a property named 'foo' sends an
     * event named 'foo-changed' with `event.detail` set to the value of
     * the property.
     *
     * * observer: {string} name of a method that runs when the property
     * changes. The arguments of the method are (value, previousValue).
     *
     * Note: Users may want control over modifying property
     * effects via subclassing. For example, a user might want to make a
     * reflectToAttribute property not do so in a subclass. We've chosen to
     * disable this because it leads to additional complication.
     * For example, a readOnly effect generates a special setter. If a subclass
     * disables the effect, the setter would fail unexpectedly.
     * Based on feedback, we may want to try to make effects more malleable
     * and/or provide an advanced api for manipulating them.
     * Also consider adding warnings when an effect cannot be changed.
     *
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {string} name Name of the property.
     * @param {Object} info Info object from which to create property effects.
     * Supported keys:
     * @param {Object} allProps Flattened map of all properties defined in this
     *   element (including inherited properties)
     * @private
     */
    function createPropertyFromConfig(proto, name, info, allProps) {
      // computed forces readOnly...
      if (info.computed) {
        info.readOnly = true;
      }
      // Note, since all computed properties are readOnly, this prevents
      // adding additional computed property effects (which leads to a confusing
      // setup where multiple triggers for setting a property)
      // While we do have `hasComputedEffect` this is set on the property's
      // dependencies rather than itself.
      if (info.computed  && !proto._hasReadOnlyEffect(name)) {
        proto._createComputedProperty(name, info.computed, allProps);
      }
      if (info.readOnly && !proto._hasReadOnlyEffect(name)) {
        proto._createReadOnlyProperty(name, !info.computed);
      }
      if (info.reflectToAttribute && !proto._hasReflectEffect(name)) {
        proto._createReflectedProperty(name);
      }
      if (info.notify && !proto._hasNotifyEffect(name)) {
        proto._createNotifyingProperty(name);
      }
      // always add observer
      if (info.observer) {
        proto._createPropertyObserver(name, info.observer, allProps[info.observer]);
      }
    }

    /**
     * Configures an element `proto` to function with a given `template`.
     * The element name `is` and extends `ext` must be specified for ShadyCSS
     * style scoping.
     *
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {!HTMLTemplateElement} template Template to process and bind
     * @param {string} baseURI URL against which to resolve urls in
     *   style element cssText
     * @param {string} is Tag name (or type extension name) for this element
     * @param {string=} ext For type extensions, the tag name that was extended
     * @private
     */
    function finalizeTemplate(proto, template, baseURI, is, ext) {
      // support `include="module-name"`
      let cssText =
        Polymer.StyleGather.cssFromTemplate(template, baseURI) +
        Polymer.StyleGather.cssFromModuleImports(is);
      if (cssText) {
        let style = document.createElement('style');
        style.textContent = cssText;
        template.content.insertBefore(style, template.content.firstChild);
      }
      if (window.ShadyCSS) {
        window.ShadyCSS.prepareTemplate(template, is, ext);
      }
      proto._bindTemplate(template);
    }

    /**
     * @polymer
     * @mixinClass
     * @unrestricted
     * @implements {Polymer_ElementMixin}
     */
    class PolymerElement extends polymerElementBase {

      /**
       * Standard Custom Elements V1 API.  The default implementation returns
       * a list of dash-cased attributes based on a flattening of all properties
       * declared in `static get properties()` for this element and any
       * superclasses.
       *
       * @return {Array} Observed attribute list
       */
      static get observedAttributes() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('__observedAttributes', this))) {
          let list = [];
          let properties = propertiesForClass(this);
          for (let prop in properties) {
            list.push(Polymer.CaseMap.camelToDashCase(prop));
          }
          this.__observedAttributes = list;
        }
        return this.__observedAttributes;
      }

      /**
       * Called automatically when the first element instance is created to
       * ensure that class finalization work has been completed.
       * May be called by users to eagerly perform class finalization work
       * prior to the creation of the first element instance.
       *
       * Class finalization work generally includes meta-programming such as
       * creating property accessors and any property effect metadata needed for
       * the features used.
       *
       * @public
       */
      static finalize() {
        if (!hasClassFinalized(this)) {
          finalizeClassAndSuper(this);
        }
      }

      /**
       * Returns the template that will be stamped into this element's shadow root.
       *
       * If a `static get is()` getter is defined, the default implementation
       * will return the first `<template>` in a `dom-module` whose `id`
       * matches this element's `is`.
       *
       * Users may override this getter to return an arbitrary template
       * (in which case the `is` getter is unnecessary). The template returned
       * may be either an `HTMLTemplateElement` or a string that will be
       * automatically parsed into a template.
       *
       * Note that when subclassing, if the super class overrode the default
       * implementation and the subclass would like to provide an alternate
       * template via a `dom-module`, it should override this getter and
       * return `Polymer.DomModule.import(this.is, 'template')`.
       *
       * If a subclass would like to modify the super class template, it should
       * clone it rather than modify it in place.  If the getter does expensive
       * work such as cloning/modifying a template, it should memoize the
       * template for maximum performance:
       *
       *   let memoizedTemplate;
       *   class MySubClass extends MySuperClass {
       *     static get template() {
       *       if (!memoizedTemplate) {
       *         memoizedTemplate = super.template.cloneNode(true);
       *         let subContent = document.createElement('div');
       *         subContent.textContent = 'This came from MySubClass';
       *         memoizedTemplate.content.appendChild(subContent);
       *       }
       *       return memoizedTemplate;
       *     }
       *   }
       *
       * @return {HTMLTemplateElement|string} Template to be stamped
       */
      static get template() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_template', this))) {
          this._template = Polymer.DomModule && Polymer.DomModule.import(
            /** @type PolymerElementConstructor*/ (this).is, 'template') ||
            // note: implemented so a subclass can retrieve the super
            // template; call the super impl this way so that `this` points
            // to the superclass.
            Object.getPrototypeOf(/** @type PolymerElementConstructor*/ (this).prototype).constructor.template;
        }
        return this._template;
      }

      /**
       * Path matching the url from which the element was imported.
       * This path is used to resolve url's in template style cssText.
       * The `importPath` property is also set on element instances and can be
       * used to create bindings relative to the import path.
       * Defaults to the path matching the url containing a `dom-module` element
       * matching this element's static `is` property.
       * Note, this path should contain a trailing `/`.
       *
       * @return {string} The import path for this element class
       */
      static get importPath() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
            const module = Polymer.DomModule && Polymer.DomModule.import(/** @type PolymerElementConstructor */ (this).is);
            this._importPath = module ? module.assetpath : '' ||
            Object.getPrototypeOf(/** @type PolymerElementConstructor*/ (this).prototype).constructor.importPath;
        }
        return this._importPath;
      }

      /**
       * Overrides the default `Polymer.PropertyAccessors` to ensure class
       * metaprogramming related to property accessors and effects has
       * completed (calls `finalize`).
       *
       * It also initializes any property defaults provided via `value` in
       * `properties` metadata.
       *
       * @override
       * @suppress {invalidCasts}
       */
      _initializeProperties() {
        Polymer.telemetry.instanceCount++;
        this.constructor.finalize();
        const importPath = this.constructor.importPath;
        // note: finalize template when we have access to `localName` to
        // avoid dependence on `is` for polyfilling styling.
        if (this._template && !this._template.__polymerFinalized) {
          this._template.__polymerFinalized = true;
          const baseURI =
            importPath ? Polymer.ResolveUrl.resolveUrl(importPath) : '';
          finalizeTemplate(/** @type {!PolymerElement} */(this.__proto__), this._template, baseURI,
            /**@type {!HTMLElement}*/(this).localName);
        }
        super._initializeProperties();
        // set path defaults
        this.rootPath = Polymer.rootPath;
        this.importPath = importPath;
        // apply property defaults...
        let p$ = propertyDefaultsForClass(this.constructor);
        if (!p$) {
          return;
        }
        for (let p in p$) {
          let info = p$[p];
          // Don't set default value if there is already an own property, which
          // happens when a `properties` property with default but no effects had
          // a property set (e.g. bound) by its host before upgrade
          if (!this.hasOwnProperty(p)) {
            let value = typeof info.value == 'function' ?
              info.value.call(this) :
              info.value;
            // Set via `_setProperty` if there is an accessor, to enable
            // initializing readOnly property defaults
            if (this._hasAccessor(p)) {
              this._setPendingProperty(p, value, true);
            } else {
              this[p] = value;
            }
          }
        }
      }

      /**
       * Provides a default implementation of the standard Custom Elements
       * `connectedCallback`.
       *
       * The default implementation enables the property effects system and
       * flushes any pending properties, and updates shimmed CSS properties
       * when using the ShadyCSS scoping/custom properties polyfill.
       *
       * @suppress {invalidCasts}
       */
      connectedCallback() {
        if (window.ShadyCSS && this._template) {
          window.ShadyCSS.styleElement(/** @type {!HTMLElement} */(this));
        }
        this._enableProperties();
      }

      /**
       * Provides a default implementation of the standard Custom Elements
       * `disconnectedCallback`.
       */
      disconnectedCallback() {}

      /**
       * Stamps the element template.
       *
       * @override
       */
      ready() {
        if (this._template) {
          this.root = this._stampTemplate(this._template);
          this.$ = this.root.$;
        }
        super.ready();
      }

      /**
       * Implements `PropertyEffects`'s `_readyClients` call. Attaches
       * element dom by calling `_attachDom` with the dom stamped from the
       * element's template via `_stampTemplate`. Note that this allows
       * client dom to be attached to the element prior to any observers
       * running.
       *
       * @override
       */
      _readyClients() {
        if (this._template) {
          this.root = this._attachDom(this.root);
        }
        // The super._readyClients here sets the clients initialized flag.
        // We must wait to do this until after client dom is created/attached
        // so that this flag can be checked to prevent notifications fired
        // during this process from being handled before clients are ready.
        super._readyClients();
      }


      /**
       * Attaches an element's stamped dom to itself. By default,
       * this method creates a `shadowRoot` and adds the dom to it.
       * However, this method may be overridden to allow an element
       * to put its dom in another location.
       *
       * @throws {Error}
       * @suppress {missingReturn}
       * @param {NodeList} dom to attach to the element.
       * @return {Node} node to which the dom has been attached.
       */
      _attachDom(dom) {
        if (this.attachShadow) {
          if (dom) {
            if (!this.shadowRoot) {
              this.attachShadow({mode: 'open'});
            }
            this.shadowRoot.appendChild(dom);
            return this.shadowRoot;
          }
          return null;
        } else {
          throw new Error('ShadowDOM not available. ' +
            // TODO(sorvell): move to compile-time conditional when supported
          'Polymer.Element can create dom as children instead of in ' +
          'ShadowDOM by setting `this.root = this;\` before \`ready\`.');
        }
      }

      /**
       * Provides a default implementation of the standard Custom Elements
       * `attributeChangedCallback`.
       *
       * By default, attributes declared in `properties` metadata are
       * deserialized using their `type` information to properties of the
       * same name.  "Dash-cased" attributes are deserialzed to "camelCase"
       * properties.
       *
       * @param {string} name Name of attribute.
       * @param {?string} old Old value of attribute.
       * @param {?string} value Current value of attribute.
       * @override
       */
      attributeChangedCallback(name, old, value) {
        if (old !== value) {
          let property = caseMap.dashToCamelCase(name);
          let type = propertiesForClass(this.constructor)[property].type;
          if (!this._hasReadOnlyEffect(property)) {
            this._attributeToProperty(name, value, type);
          }
        }
      }

      /**
       * When using the ShadyCSS scoping and custom property shim, causes all
       * shimmed styles in this element (and its subtree) to be updated
       * based on current custom property values.
       *
       * The optional parameter overrides inline custom property styles with an
       * object of properties where the keys are CSS properties, and the values
       * are strings.
       *
       * Example: `this.updateStyles({'--color': 'blue'})`
       *
       * These properties are retained unless a value of `null` is set.
       *
       * @param {Object=} properties Bag of custom property key/values to
       *   apply to this element.
       * @suppress {invalidCasts}
       */
      updateStyles(properties) {
        if (window.ShadyCSS) {
          window.ShadyCSS.styleSubtree(/** @type {!HTMLElement} */(this), properties);
        }
      }

      /**
       * Rewrites a given URL relative to a base URL. The base URL defaults to
       * the original location of the document containing the `dom-module` for
       * this element. This method will return the same URL before and after
       * bundling.
       *
       * @param {string} url URL to resolve.
       * @param {string=} base Optional base URL to resolve against, defaults
       * to the element's `importPath`
       * @return {string} Rewritten URL relative to base
       */
      resolveUrl(url, base) {
        if (!base && this.importPath) {
          base = Polymer.ResolveUrl.resolveUrl(this.importPath);
        }
        return Polymer.ResolveUrl.resolveUrl(url, base);
      }

      /**
       * Overrides `PropertyAccessors` to add map of dynamic functions on
       * template info, for consumption by `PropertyEffects` template binding
       * code. This map determines which method templates should have accessors
       * created for them.
       *
       * @override
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      static _parseTemplateContent(template, templateInfo, nodeInfo) {
        templateInfo.dynamicFns = templateInfo.dynamicFns || propertiesForClass(this);
        return super._parseTemplateContent(template, templateInfo, nodeInfo);
      }

    }

    return PolymerElement;
  });

  /**
   * Provides basic tracking of element definitions (registrations) and
   * instance counts.
   *
   * @namespace
   * @summary Provides basic tracking of element definitions (registrations) and
   * instance counts.
   */
  Polymer.telemetry = {
    /**
     * Total number of Polymer element instances created.
     * @type {number}
     */
    instanceCount: 0,
    /**
     * Array of Polymer element classes that have been finalized.
     * @type {Array<Polymer.Element>}
     */
    registrations: [],
    /**
     * @param {!PolymerElementConstructor} prototype Element prototype to log
     * @this {this}
     * @private
     */
    _regLog: function(prototype) {
      console.log('[' + prototype.is + ']: registered')
    },
    /**
     * Registers a class prototype for telemetry purposes.
     * @param {HTMLElement} prototype Element prototype to register
     * @this {this}
     * @protected
     */
    register: function(prototype) {
      this.registrations.push(prototype);
      Polymer.log && this._regLog(prototype);
    },
    /**
     * Logs all elements registered with an `is` to the console.
     * @public
     * @this {this}
     */
    dumpRegistrations: function() {
      this.registrations.forEach(this._regLog);
    }
  };

  /**
   * When using the ShadyCSS scoping and custom property shim, causes all
   * shimmed `styles` (via `custom-style`) in the document (and its subtree)
   * to be updated based on current custom property values.
   *
   * The optional parameter overrides inline custom property styles with an
   * object of properties where the keys are CSS properties, and the values
   * are strings.
   *
   * Example: `Polymer.updateStyles({'--color': 'blue'})`
   *
   * These properties are retained unless a value of `null` is set.
   *
   * @param {Object=} props Bag of custom property key/values to
   *   apply to the document.
   */
  Polymer.updateStyles = function(props) {
    if (window.ShadyCSS) {
      window.ShadyCSS.styleDocument(props);
    }
  };

})();



/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(3);


/** @suppress {deprecated} */
(function() {
  'use strict';

  /**
   * Legacy settings.
   * @namespace
   * @memberof Polymer
   */
  const settings = Polymer.Settings || {};
  settings.useShadow = !(window.ShadyDOM);
  settings.useNativeCSSProperties =
    Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
  settings.useNativeCustomElements =
    !(window.customElements.polyfillWrapFlushCallback);

  /**
   * Sets the global, legacy settings.
   *
   * @deprecated
   * @memberof Polymer
   */
  Polymer.Settings = settings;

  /**
   * Globally settable property that is automatically assigned to
   * `Polymer.ElementMixin` instances, useful for binding in templates to
   * make URL's relative to an application's root.  Defaults to the main
   * document URL, but can be overridden by users.  It may be useful to set
   * `Polymer.rootPath` to provide a stable application mount path when
   * using client side routing.
   *
   * @memberof Polymer
   */
  let rootPath = Polymer.rootPath ||
    Polymer.ResolveUrl.pathFromUrl(document.baseURI || window.location.href);

  Polymer.rootPath = rootPath;

  /**
   * Sets the global rootPath property used by `Polymer.ElementMixin` and
   * available via `Polymer.rootPath`.
   *
   * @memberof Polymer
   * @param {string} path The new root path
   */
  Polymer.setRootPath = function(path) {
    Polymer.rootPath = path;
  }
})();



/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(3);


(function() {
  'use strict';

  const MODULE_STYLE_LINK_SELECTOR = 'link[rel=import][type~=css]';
  const INCLUDE_ATTR = 'include';

  function importModule(moduleId) {
    if (!Polymer.DomModule) {
      return null;
    }
    return Polymer.DomModule.import(moduleId);
  }

  /** @typedef {{assetpath: string}} */
  let templateWithAssetPath; // eslint-disable-line no-unused-vars

  /**
   * Module with utilities for collection CSS text from `<templates>`, external
   * stylesheets, and `dom-module`s.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module with utilities for collection CSS text from various sources.
   */
  const StyleGather = {

    /**
     * Returns CSS text of styles in a space-separated list of `dom-module`s.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleIds List of dom-module id's within which to
     * search for css.
     * @return {string} Concatenated CSS content from specified `dom-module`s
     * @this {StyleGather}
     */
    cssFromModules(moduleIds) {
      let modules = moduleIds.trim().split(' ');
      let cssText = '';
      for (let i=0; i < modules.length; i++) {
        cssText += this.cssFromModule(modules[i]);
      }
      return cssText;
    },

    /**
     * Returns CSS text of styles in a given `dom-module`.  CSS in a `dom-module`
     * can come either from `<style>`s within the first `<template>`, or else
     * from one or more `<link rel="import" type="css">` links outside the
     * template.
     *
     * Any `<styles>` processed are removed from their original location.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleId dom-module id to gather styles from
     * @return {string} Concatenated CSS content from specified `dom-module`
     * @this {StyleGather}
     */
    cssFromModule(moduleId) {
      let m = importModule(moduleId);
      if (m && m._cssText === undefined) {
        let cssText = '';
        // include css from the first template in the module
        let t = m.querySelector('template');
        if (t) {
          cssText += this.cssFromTemplate(t, /** @type {templateWithAssetPath }*/(m).assetpath);
        }
        // module imports: <link rel="import" type="css">
        cssText += this.cssFromModuleImports(moduleId);
        m._cssText = cssText || null;
      }
      if (!m) {
        console.warn('Could not find style data in module named', moduleId);
      }
      return m && m._cssText || '';
    },

    /**
     * Returns CSS text of `<styles>` within a given template.
     *
     * Any `<styles>` processed are removed from their original location.
     *
     * @memberof Polymer.StyleGather
     * @param {HTMLTemplateElement} template Template to gather styles from
     * @param {string} baseURI Base URI to resolve the URL against
     * @return {string} Concatenated CSS content from specified template
     * @this {StyleGather}
     */
    cssFromTemplate(template, baseURI) {
      let cssText = '';
      // if element is a template, get content from its .content
      let e$ = template.content.querySelectorAll('style');
      for (let i=0; i < e$.length; i++) {
        let e = e$[i];
        // support style sharing by allowing styles to "include"
        // other dom-modules that contain styling
        let include = e.getAttribute(INCLUDE_ATTR);
        if (include) {
          cssText += this.cssFromModules(include);
        }
        e.parentNode.removeChild(e);
        cssText += baseURI ?
          Polymer.ResolveUrl.resolveCss(e.textContent, baseURI) : e.textContent;
      }
      return cssText;
    },

    /**
     * Returns CSS text from stylsheets loaded via `<link rel="import" type="css">`
     * links within the specified `dom-module`.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleId Id of `dom-module` to gather CSS from
     * @return {string} Concatenated CSS content from links in specified `dom-module`
     * @this {StyleGather}
     */
    cssFromModuleImports(moduleId) {
      let cssText = '';
      let m = importModule(moduleId);
      if (!m) {
        return cssText;
      }
      let p$ = m.querySelectorAll(MODULE_STYLE_LINK_SELECTOR);
      for (let i=0; i < p$.length; i++) {
        let p = p$[i];
        if (p.import) {
          let importDoc = p.import;
          // NOTE: polyfill affordance.
          // under the HTMLImports polyfill, there will be no 'body',
          // but the import pseudo-doc can be used directly.
          let container = importDoc.body ? importDoc.body : importDoc;
          cssText +=
            Polymer.ResolveUrl.resolveCss(container.textContent,
              importDoc.baseURI);
        }
      }
      return cssText;
    }
  };

  Polymer.StyleGather = StyleGather;
})();



/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(3);


(function() {
  'use strict';

  let modules = {};
  let lcModules = {};
  function findModule(id) {
    return modules[id] || lcModules[id.toLowerCase()];
  }

  function styleOutsideTemplateCheck(inst) {
    if (inst.querySelector('style')) {
      console.warn('dom-module %s has style outside template', inst.id);
    }
  }

  /**
   * The `dom-module` element registers the dom it contains to the name given
   * by the module's id attribute. It provides a unified database of dom
   * accessible via its static `import` API.
   *
   * A key use case of `dom-module` is for providing custom element `<template>`s
   * via HTML imports that are parsed by the native HTML parser, that can be
   * relocated during a bundling pass and still looked up by `id`.
   *
   * Example:
   *
   *     <dom-module id="foo">
   *       <img src="stuff.png">
   *     </dom-module>
   *
   * Then in code in some other location that cannot access the dom-module above
   *
   *     let img = document.createElement('dom-module').import('foo', 'img');
   *
   * @customElement
   * @extends HTMLElement
   * @memberof Polymer
   * @summary Custom element that provides a registry of relocatable DOM content
   *   by `id` that is agnostic to bundling.
   * @unrestricted
   */
  class DomModule extends HTMLElement {

    static get observedAttributes() { return ['id'] }

    /**
     * Retrieves the element specified by the css `selector` in the module
     * registered by `id`. For example, this.import('foo', 'img');
     * @param {string} id The id of the dom-module in which to search.
     * @param {string=} selector The css selector by which to find the element.
     * @return {Element} Returns the element which matches `selector` in the
     * module registered at the specified `id`.
     */
    static import(id, selector) {
      if (id) {
        let m = findModule(id);
        if (m && selector) {
          return m.querySelector(selector);
        }
        return m;
      }
      return null;
    }

    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        this.register();
      }
    }

    /**
     * The absolute URL of the original location of this `dom-module`.
     *
     * This value will differ from this element's `ownerDocument` in the
     * following ways:
     * - Takes into account any `assetpath` attribute added during bundling
     *   to indicate the original location relative to the bundled location
     * - Uses the HTMLImports polyfill's `importForElement` API to ensure
     *   the path is relative to the import document's location since
     *   `ownerDocument` is not currently polyfilled
     */
    get assetpath() {
      // Don't override existing assetpath.
      if (!this.__assetpath) {
        // note: assetpath set via an attribute must be relative to this
        // element's location; accomodate polyfilled HTMLImports
        const owner = window.HTMLImports && HTMLImports.importForElement ?
          HTMLImports.importForElement(this) || document : this.ownerDocument;
        const url = Polymer.ResolveUrl.resolveUrl(
          this.getAttribute('assetpath') || '', owner.baseURI);
        this.__assetpath = Polymer.ResolveUrl.pathFromUrl(url);
      }
      return this.__assetpath;
    }

    /**
     * Registers the dom-module at a given id. This method should only be called
     * when a dom-module is imperatively created. For
     * example, `document.createElement('dom-module').register('foo')`.
     * @param {string=} id The id at which to register the dom-module.
     */
    register(id) {
      id = id || this.id;
      if (id) {
        this.id = id;
        // store id separate from lowercased id so that
        // in all cases mixedCase id will stored distinctly
        // and lowercase version is a fallback
        modules[id] = this;
        lcModules[id.toLowerCase()] = this;
        styleOutsideTemplateCheck(this);
      }
    }
  }

  DomModule.prototype['modules'] = modules;

  customElements.define('dom-module', DomModule);

  // export
  Polymer.DomModule = DomModule;

})();



/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);


(function() {
  'use strict';

  /**
   * Module with utilities for manipulating structured data path strings.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module with utilities for manipulating structured data path strings.
   */
  const Path = {

    /**
     * Returns true if the given string is a structured data path (has dots).
     *
     * Example:
     *
     * ```
     * Polymer.Path.isPath('foo.bar.baz') // true
     * Polymer.Path.isPath('foo')         // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} path Path string
     * @return {boolean} True if the string contained one or more dots
     */
    isPath: function(path) {
      return path.indexOf('.') >= 0;
    },

    /**
     * Returns the root property name for the given path.
     *
     * Example:
     *
     * ```
     * Polymer.Path.root('foo.bar.baz') // 'foo'
     * Polymer.Path.root('foo')         // 'foo'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} path Path string
     * @return {string} Root property name
     */
    root: function(path) {
      let dotIndex = path.indexOf('.');
      if (dotIndex === -1) {
        return path;
      }
      return path.slice(0, dotIndex);
    },

    /**
     * Given `base` is `foo.bar`, `foo` is an ancestor, `foo.bar` is not
     * Returns true if the given path is an ancestor of the base path.
     *
     * Example:
     *
     * ```
     * Polymer.Path.isAncestor('foo.bar', 'foo')         // true
     * Polymer.Path.isAncestor('foo.bar', 'foo.bar')     // false
     * Polymer.Path.isAncestor('foo.bar', 'foo.bar.baz') // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Path string to test against.
     * @param {string} path Path string to test.
     * @return {boolean} True if `path` is an ancestor of `base`.
     */
    isAncestor: function(base, path) {
      //     base.startsWith(path + '.');
      return base.indexOf(path + '.') === 0;
    },

    /**
     * Given `base` is `foo.bar`, `foo.bar.baz` is an descendant
     *
     * Example:
     *
     * ```
     * Polymer.Path.isDescendant('foo.bar', 'foo.bar.baz') // true
     * Polymer.Path.isDescendant('foo.bar', 'foo.bar')     // false
     * Polymer.Path.isDescendant('foo.bar', 'foo')         // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Path string to test against.
     * @param {string} path Path string to test.
     * @return {boolean} True if `path` is a descendant of `base`.
     */
    isDescendant: function(base, path) {
      //     path.startsWith(base + '.');
      return path.indexOf(base + '.') === 0;
    },

    /**
     * Replaces a previous base path with a new base path, preserving the
     * remainder of the path.
     *
     * User must ensure `path` has a prefix of `base`.
     *
     * Example:
     *
     * ```
     * Polymer.Path.translate('foo.bar', 'zot' 'foo.bar.baz') // 'zot.baz'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Current base string to remove
     * @param {string} newBase New base string to replace with
     * @param {string} path Path to translate
     * @return {string} Translated string
     */
    translate: function(base, newBase, path) {
      return newBase + path.slice(base.length);
    },

    /**
     * @param {string} base Path string to test against
     * @param {string} path Path string to test
     * @return {boolean} True if `path` is equal to `base`
     * @this {Path}
     */
    matches: function(base, path) {
      return (base === path) ||
             this.isAncestor(base, path) ||
             this.isDescendant(base, path);
    },

    /**
     * Converts array-based paths to flattened path.  String-based paths
     * are returned as-is.
     *
     * Example:
     *
     * ```
     * Polymer.Path.normalize(['foo.bar', 0, 'baz'])  // 'foo.bar.0.baz'
     * Polymer.Path.normalize('foo.bar.0.baz')        // 'foo.bar.0.baz'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string | !Array<string|number>} path Input path
     * @return {string} Flattened path
     */
    normalize: function(path) {
      if (Array.isArray(path)) {
        let parts = [];
        for (let i=0; i<path.length; i++) {
          let args = path[i].toString().split('.');
          for (let j=0; j<args.length; j++) {
            parts.push(args[j]);
          }
        }
        return parts.join('.');
      } else {
        return path;
      }
    },

    /**
     * Splits a path into an array of property names. Accepts either arrays
     * of path parts or strings.
     *
     * Example:
     *
     * ```
     * Polymer.Path.split(['foo.bar', 0, 'baz'])  // ['foo', 'bar', '0', 'baz']
     * Polymer.Path.split('foo.bar.0.baz')        // ['foo', 'bar', '0', 'baz']
     * ```
     *
     * @memberof Polymer.Path
     * @param {string | !Array<string|number>} path Input path
     * @return {!Array<string>} Array of path parts
     * @this {Path}
     * @suppress {checkTypes}
     */
    split: function(path) {
      if (Array.isArray(path)) {
        return this.normalize(path).split('.');
      }
      return path.toString().split('.');
    },

    /**
     * Reads a value from a path.  If any sub-property in the path is `undefined`,
     * this method returns `undefined` (will never throw.
     *
     * @memberof Polymer.Path
     * @param {Object} root Object from which to dereference path from
     * @param {string | !Array<string|number>} path Path to read
     * @param {Object=} info If an object is provided to `info`, the normalized
     *  (flattened) path will be set to `info.path`.
     * @return {*} Value at path, or `undefined` if the path could not be
     *  fully dereferenced.
     * @this {Path}
     */
    get: function(root, path, info) {
      let prop = root;
      let parts = this.split(path);
      // Loop over path parts[0..n-1] and dereference
      for (let i=0; i<parts.length; i++) {
        if (!prop) {
          return;
        }
        let part = parts[i];
        prop = prop[part];
      }
      if (info) {
        info.path = parts.join('.');
      }
      return prop;
    },

    /**
     * Sets a value to a path.  If any sub-property in the path is `undefined`,
     * this method will no-op.
     *
     * @memberof Polymer.Path
     * @param {Object} root Object from which to dereference path from
     * @param {string | !Array<string|number>} path Path to set
     * @param {*} value Value to set to path
     * @return {string | undefined} The normalized version of the input path
     * @this {Path}
     */
    set: function(root, path, value) {
      let prop = root;
      let parts = this.split(path);
      let last = parts[parts.length-1];
      if (parts.length > 1) {
        // Loop over path parts[0..n-2] and dereference
        for (let i=0; i<parts.length-1; i++) {
          let part = parts[i];
          prop = prop[part];
          if (!prop) {
            return;
          }
        }
        // Set value to object at end of path
        prop[last] = value;
      } else {
        // Simple property set
        prop[path] = value;
      }
      return parts.join('.');
    }

  };

  /**
   * Returns true if the given string is a structured data path (has dots).
   *
   * This function is deprecated.  Use `Polymer.Path.isPath` instead.
   *
   * Example:
   *
   * ```
   * Polymer.Path.isDeep('foo.bar.baz') // true
   * Polymer.Path.isDeep('foo')         // false
   * ```
   *
   * @deprecated
   * @memberof Polymer.Path
   * @param {string} path Path string
   * @return {boolean} True if the string contained one or more dots
   */
  Path.isDeep = Path.isPath;

  Polymer.Path = Path;

})();



/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(1);

__webpack_require__(4);

__webpack_require__(7);


(function() {

  'use strict';

  let caseMap = Polymer.CaseMap;

  let microtask = Polymer.Async.microTask;

  // Save map of native properties; this forms a blacklist or properties
  // that won't have their values "saved" by `saveAccessorValue`, since
  // reading from an HTMLElement accessor from the context of a prototype throws
  const nativeProperties = {};
  let proto = HTMLElement.prototype;
  while (proto) {
    let props = Object.getOwnPropertyNames(proto);
    for (let i=0; i<props.length; i++) {
      nativeProperties[props[i]] = true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  /**
   * Used to save the value of a property that will be overridden with
   * an accessor. If the `model` is a prototype, the values will be saved
   * in `__dataProto`, and it's up to the user (or downstream mixin) to
   * decide how/when to set these values back into the accessors.
   * If `model` is already an instance (it has a `__data` property), then
   * the value will be set as a pending property, meaning the user should
   * call `_invalidateProperties` or `_flushProperties` to take effect
   *
   * @param {Object} model Prototype or instance
   * @param {string} property Name of property
   * @private
   */
  function saveAccessorValue(model, property) {
    // Don't read/store value for any native properties since they could throw
    if (!nativeProperties[property]) {
      let value = model[property];
      if (value !== undefined) {
        if (model.__data) {
          // Adding accessor to instance; update the property
          // It is the user's responsibility to call _flushProperties
          model._setPendingProperty(property, value);
        } else {
          // Adding accessor to proto; save proto's value for instance-time use
          if (!model.__dataProto) {
            model.__dataProto = {};
          } else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
            model.__dataProto = Object.create(model.__dataProto);
          }
          model.__dataProto[property] = value;
        }
      }
    }
  }

  /**
   * Element class mixin that provides basic meta-programming for creating one
   * or more property accessors (getter/setter pair) that enqueue an async
   * (batched) `_propertiesChanged` callback.
   *
   * For basic usage of this mixin, simply declare attributes to observe via
   * the standard `static get observedAttributes()`, implement `_propertiesChanged`
   * on the class, and then call `MyClass.createPropertiesForAttributes()` once
   * on the class to generate property accessors for each observed attribute
   * prior to instancing.  Last, call `this._flushProperties()` once to enable
   * the accessors.
   *
   * Any `observedAttributes` will automatically be
   * deserialized via `attributeChangedCallback` and set to the associated
   * property using `dash-case`-to-`camelCase` convention.
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin for reacting to property changes from
   *   generated property accessors.
   */
  Polymer.PropertyAccessors = Polymer.dedupingMixin(superClass => {

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_PropertyAccessors}
     * @extends HTMLElement
     * @unrestricted
     */
    class PropertyAccessors extends superClass {

      /**
       * Generates property accessors for all attributes in the standard
       * static `observedAttributes` array.
       *
       * Attribute names are mapped to property names using the `dash-case` to
       * `camelCase` convention
       *
       */
      static createPropertiesForAttributes() {
        let a$ = this.observedAttributes;
        for (let i=0; i < a$.length; i++) {
          this.prototype._createPropertyAccessor(caseMap.dashToCamelCase(a$[i]));
        }
      }

      constructor() {
        super();
        /** @type {boolean} */
        this.__serializing;
        /** @type {number} */
        this.__dataCounter;
        /** @type {boolean} */
        this.__dataEnabled;
        /** @type {boolean} */
        this.__dataReady;
        /** @type {boolean} */
        this.__dataInvalid;
        /** @type {!Object} */
        this.__data;
        /** @type {Object} */
        this.__dataPending;
        /** @type {Object} */
        this.__dataOld;
        /** @type {Object} */
        this.__dataProto;
        /** @type {Object} */
        this.__dataHasAccessor;
        /** @type {Object} */
        this.__dataInstanceProps;
        this._initializeProperties();
      }

      /**
       * Implements native Custom Elements `attributeChangedCallback` to
       * set an attribute value to a property via `_attributeToProperty`.
       *
       * @param {string} name Name of attribute that changed
       * @param {?string} old Old attribute value
       * @param {?string} value New attribute value
       */
      attributeChangedCallback(name, old, value) {
        if (old !== value) {
          this._attributeToProperty(name, value);
        }
      }

      /**
       * Initializes the local storage for property accessors.
       *
       * Provided as an override point for performing any setup work prior
       * to initializing the property accessor system.
       *
       * @protected
       */
      _initializeProperties() {
        this.__serializing = false;
        this.__dataCounter = 0;
        this.__dataEnabled = false;
        this.__dataReady = false;
        this.__dataInvalid = false;
        this.__data = {};
        this.__dataPending = null;
        this.__dataOld = null;
        if (this.__dataProto) {
          this._initializeProtoProperties(this.__dataProto);
          this.__dataProto = null;
        }
        // Capture instance properties; these will be set into accessors
        // during first flush. Don't set them here, since we want
        // these to overwrite defaults/constructor assignments
        for (let p in this.__dataHasAccessor) {
          if (this.hasOwnProperty(p)) {
            this.__dataInstanceProps = this.__dataInstanceProps || {};
            this.__dataInstanceProps[p] = this[p];
            delete this[p];
          }
        }
      }

      /**
       * Called at instance time with bag of properties that were overwritten
       * by accessors on the prototype when accessors were created.
       *
       * The default implementation sets these properties back into the
       * setter at instance time.  This method is provided as an override
       * point for customizing or providing more efficient initialization.
       *
       * @param {Object} props Bag of property values that were overwritten
       *   when creating property accessors.
       * @protected
       */
      _initializeProtoProperties(props) {
        for (let p in props) {
          this._setProperty(p, props[p]);
        }
      }

      /**
       * Called at ready time with bag of instance properties that overwrote
       * accessors when the element upgraded.
       *
       * The default implementation sets these properties back into the
       * setter at ready time.  This method is provided as an override
       * point for customizing or providing more efficient initialization.
       *
       * @param {Object} props Bag of property values that were overwritten
       *   when creating property accessors.
       * @protected
       */
      _initializeInstanceProperties(props) {
        Object.assign(this, props);
      }

      /**
       * Ensures the element has the given attribute. If it does not,
       * assigns the given value to the attribute.
       *
       *
       * @param {string} attribute Name of attribute to ensure is set.
       * @param {string} value of the attribute.
       */
      _ensureAttribute(attribute, value) {
        if (!this.hasAttribute(attribute)) {
          this._valueToNodeAttribute(this, value, attribute);
        }
      }

      /**
       * Deserializes an attribute to its associated property.
       *
       * This method calls the `_deserializeValue` method to convert the string to
       * a typed value.
       *
       * @param {string} attribute Name of attribute to deserialize.
       * @param {?string} value of the attribute.
       * @param {*=} type type to deserialize to.
       */
      _attributeToProperty(attribute, value, type) {
        // Don't deserialize back to property if currently reflecting
        if (!this.__serializing) {
          let property = caseMap.dashToCamelCase(attribute);
          this[property] = this._deserializeValue(value, type);
        }
      }

      /**
       * Serializes a property to its associated attribute.
       *
       * @param {string} property Property name to reflect.
       * @param {string=} attribute Attribute name to reflect.
       * @param {*=} value Property value to refect.
       */
      _propertyToAttribute(property, attribute, value) {
        this.__serializing = true;
        value = (arguments.length < 3) ? this[property] : value;
        this._valueToNodeAttribute(this, value,
          attribute || caseMap.camelToDashCase(property));
        this.__serializing = false;
      }

      /**
       * Sets a typed value to an HTML attribute on a node.
       *
       * This method calls the `_serializeValue` method to convert the typed
       * value to a string.  If the `_serializeValue` method returns `undefined`,
       * the attribute will be removed (this is the default for boolean
       * type `false`).
       *
       * @param {Element} node Element to set attribute to.
       * @param {*} value Value to serialize.
       * @param {string} attribute Attribute name to serialize to.
       */
      _valueToNodeAttribute(node, value, attribute) {
        let str = this._serializeValue(value);
        if (str === undefined) {
          node.removeAttribute(attribute);
        } else {
          node.setAttribute(attribute, str);
        }
      }

      /**
       * Converts a typed JavaScript value to a string.
       *
       * This method is called by Polymer when setting JS property values to
       * HTML attributes.  Users may override this method on Polymer element
       * prototypes to provide serialization for custom types.
       *
       * @param {*} value Property value to serialize.
       * @return {string | undefined} String serialized from the provided property value.
       */
      _serializeValue(value) {
        /* eslint-disable no-fallthrough */
        switch (typeof value) {
          case 'boolean':
            return value ? '' : undefined;

          case 'object':
            if (value instanceof Date) {
              return value.toString();
            } else if (value) {
              try {
                return JSON.stringify(value);
              } catch(x) {
                return '';
              }
            }

          default:
            return value != null ? value.toString() : undefined;
        }
      }

      /**
       * Converts a string to a typed JavaScript value.
       *
       * This method is called by Polymer when reading HTML attribute values to
       * JS properties.  Users may override this method on Polymer element
       * prototypes to provide deserialization for custom `type`s.  Note,
       * the `type` argument is the value of the `type` field provided in the
       * `properties` configuration object for a given property, and is
       * by convention the constructor for the type to deserialize.
       *
       * Note: The return value of `undefined` is used as a sentinel value to
       * indicate the attribute should be removed.
       *
       * @param {?string} value Attribute value to deserialize.
       * @param {*=} type Type to deserialize the string to.
       * @return {*} Typed value deserialized from the provided string.
       */
      _deserializeValue(value, type) {
        /**
         * @type {*}
         */
        let outValue;
        switch (type) {
          case Number:
            outValue = Number(value);
            break;

          case Boolean:
            outValue = (value !== null);
            break;

          case Object:
            try {
              outValue = JSON.parse(/** @type string */(value));
            } catch(x) {
              // allow non-JSON literals like Strings and Numbers
            }
            break;

          case Array:
            try {
              outValue = JSON.parse(/** @type string */(value));
            } catch(x) {
              outValue = null;
              console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${value}`);
            }
            break;

          case Date:
            outValue = new Date(value);
            break;

          case String:
          default:
            outValue = value;
            break;
        }

        return outValue;
      }
      /* eslint-enable no-fallthrough */

      /**
       * Creates a setter/getter pair for the named property with its own
       * local storage.  The getter returns the value in the local storage,
       * and the setter calls `_setProperty`, which updates the local storage
       * for the property and enqueues a `_propertiesChanged` callback.
       *
       * This method may be called on a prototype or an instance.  Calling
       * this method may overwrite a property value that already exists on
       * the prototype/instance by creating the accessor.  When calling on
       * a prototype, any overwritten values are saved in `__dataProto`,
       * and it is up to the subclasser to decide how/when to set those
       * properties back into the accessor.  When calling on an instance,
       * the overwritten value is set via `_setPendingProperty`, and the
       * user should call `_invalidateProperties` or `_flushProperties`
       * for the values to take effect.
       *
       * @param {string} property Name of the property
       * @param {boolean=} readOnly When true, no setter is created; the
       *   protected `_setProperty` function must be used to set the property
       * @protected
       */
      _createPropertyAccessor(property, readOnly) {
        if (!this.hasOwnProperty('__dataHasAccessor')) {
          this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
        }
        if (!this.__dataHasAccessor[property]) {
          this.__dataHasAccessor[property] = true;
          saveAccessorValue(this, property);
          Object.defineProperty(this, property, {
            /* eslint-disable valid-jsdoc */
            /** @this {PropertyAccessors} */
            get: function() {
              return this.__data[property];
            },
            /** @this {PropertyAccessors} */
            set: readOnly ? function() {} : function(value) {
              this._setProperty(property, value);
            }
            /* eslint-enable */
          });
        }
      }

      /**
       * Returns true if this library created an accessor for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if an accessor was created
       */
      _hasAccessor(property) {
        return this.__dataHasAccessor && this.__dataHasAccessor[property];
      }

      /**
       * Updates the local storage for a property (via `_setPendingProperty`)
       * and enqueues a `_proeprtiesChanged` callback.
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @protected
       */
      _setProperty(property, value) {
        if (this._setPendingProperty(property, value)) {
          this._invalidateProperties();
        }
      }

      /**
       * Updates the local storage for a property, records the previous value,
       * and adds it to the set of "pending changes" that will be passed to the
       * `_propertiesChanged` callback.  This method does not enqueue the
       * `_propertiesChanged` callback.
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @return {boolean} Returns true if the property changed
       * @protected
       */
      _setPendingProperty(property, value) {
        let old = this.__data[property];
        let changed = this._shouldPropertyChange(property, value, old)
        if (changed) {
          if (!this.__dataPending) {
            this.__dataPending = {};
            this.__dataOld = {};
          }
          // Ensure old is captured from the last turn
          if (this.__dataOld && !(property in this.__dataOld)) {
            this.__dataOld[property] = old;
          }
          this.__data[property] = value;
          this.__dataPending[property] = value;
        }
        return changed;
      }

      /**
       * Returns true if the specified property has a pending change.
       *
       * @param {string} prop Property name
       * @return {boolean} True if property has a pending change
       * @protected
       */
      _isPropertyPending(prop) {
        return Boolean(this.__dataPending && (prop in this.__dataPending));
      }

      /**
       * Marks the properties as invalid, and enqueues an async
       * `_propertiesChanged` callback.
       *
       * @protected
       */
      _invalidateProperties() {
        if (!this.__dataInvalid && this.__dataReady) {
          this.__dataInvalid = true;
          microtask.run(() => {
            if (this.__dataInvalid) {
              this.__dataInvalid = false;
              this._flushProperties();
            }
          });
        }
      }

      /**
       * Call to enable property accessor processing. Before this method is
       * called accessor values will be set but side effects are
       * queued. When called, any pending side effects occur immediately.
       * For elements, generally `connectedCallback` is a normal spot to do so.
       * It is safe to call this method multiple times as it only turns on
       * property accessors once.
       */
      _enableProperties() {
        if (!this.__dataEnabled) {
          this.__dataEnabled = true;
          if (this.__dataInstanceProps) {
            this._initializeInstanceProperties(this.__dataInstanceProps);
            this.__dataInstanceProps = null;
          }
          this.ready()
        }
      }

      /**
       * Calls the `_propertiesChanged` callback with the current set of
       * pending changes (and old values recorded when pending changes were
       * set), and resets the pending set of changes. Generally, this method
       * should not be called in user code.
       *
       *
       * @protected
       */
      _flushProperties() {
        if (this.__dataPending && this.__dataOld) {
          let changedProps = this.__dataPending;
          this.__dataPending = null;
          this.__dataCounter++;
          this._propertiesChanged(this.__data, changedProps, this.__dataOld);
          this.__dataCounter--;
        }
      }

      /**
       * Lifecycle callback called the first time properties are being flushed.
       * Prior to `ready`, all property sets through accessors are queued and
       * their effects are flushed after this method returns.
       *
       * Users may override this function to implement behavior that is
       * dependent on the element having its properties initialized, e.g.
       * from defaults (initialized from `constructor`, `_initializeProperties`),
       * `attributeChangedCallback`, or values propagated from host e.g. via
       * bindings.  `super.ready()` must be called to ensure the data system
       * becomes enabled.
       *
       * @public
       */
      ready() {
        this.__dataReady = true;
        // Run normal flush
        this._flushProperties();
      }

      /**
       * Callback called when any properties with accessors created via
       * `_createPropertyAccessor` have been set.
       *
       * @param {!Object} currentProps Bag of all current accessor values
       * @param {!Object} changedProps Bag of properties changed since the last
       *   call to `_propertiesChanged`
       * @param {!Object} oldProps Bag of previous values for each property
       *   in `changedProps`
       * @protected
       */
      _propertiesChanged(currentProps, changedProps, oldProps) { // eslint-disable-line no-unused-vars
      }

      /**
       * Method called to determine whether a property value should be
       * considered as a change and cause the `_propertiesChanged` callback
       * to be enqueued.
       *
       * The default implementation returns `true` for primitive types if a
       * strict equality check fails, and returns `true` for all Object/Arrays.
       * The method always returns false for `NaN`.
       *
       * Override this method to e.g. provide stricter checking for
       * Objects/Arrays when using immutable patterns.
       *
       * @param {string} property Property name
       * @param {*} value New property value
       * @param {*} old Previous property value
       * @return {boolean} Whether the property should be considered a change
       *   and enqueue a `_proeprtiesChanged` callback
       * @protected
       */
      _shouldPropertyChange(property, value, old) {
        return (
          // Strict equality check
          (old !== value &&
           // This ensures (old==NaN, value==NaN) always returns false
           (old === old || value === value))
        );
      }

    }

    return PropertyAccessors;

  });

})();



/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(1);


(function() {

  'use strict';

  // 1.x backwards-compatible auto-wrapper for template type extensions
  // This is a clear layering violation and gives favored-nation status to
  // dom-if and dom-repeat templates.  This is a conceit we're choosing to keep
  // a.) to ease 1.x backwards-compatibility due to loss of `is`, and
  // b.) to maintain if/repeat capability in parser-constrained elements
  //     (e.g. table, select) in lieu of native CE type extensions without
  //     massive new invention in this space (e.g. directive system)
  const templateExtensions = {
    'dom-if': true,
    'dom-repeat': true
  };
  function wrapTemplateExtension(node) {
    let is = node.getAttribute('is');
    if (is && templateExtensions[is]) {
      let t = node;
      t.removeAttribute('is');
      node = t.ownerDocument.createElement(is);
      t.parentNode.replaceChild(node, t);
      node.appendChild(t);
      while(t.attributes.length) {
        node.setAttribute(t.attributes[0].name, t.attributes[0].value);
        t.removeAttribute(t.attributes[0].name);
      }
    }
    return node;
  }

  function findTemplateNode(root, nodeInfo) {
    // recursively ascend tree until we hit root
    let parent = nodeInfo.parentInfo && findTemplateNode(root, nodeInfo.parentInfo);
    // unwind the stack, returning the indexed node at each level
    if (parent) {
      // note: marginally faster than indexing via childNodes
      // (http://jsperf.com/childnodes-lookup)
      for (let n=parent.firstChild, i=0; n; n=n.nextSibling) {
        if (nodeInfo.parentIndex === i++) {
          return n;
        }
      }
    } else {
      return root;
    }
  }

  // construct `$` map (from id annotations)
  function applyIdToMap(inst, map, node, nodeInfo) {
    if (nodeInfo.id) {
      map[nodeInfo.id] = node;
    }
  }

  // install event listeners (from event annotations)
  function applyEventListener(inst, node, nodeInfo) {
    if (nodeInfo.events && nodeInfo.events.length) {
      for (let j=0, e$=nodeInfo.events, e; (j<e$.length) && (e=e$[j]); j++) {
        inst._addMethodEventListenerToNode(node, e.name, e.value, inst);
      }
    }
  }

  // push configuration references at configure time
  function applyTemplateContent(inst, node, nodeInfo) {
    if (nodeInfo.templateInfo) {
      node._templateInfo = nodeInfo.templateInfo;
    }
  }

  function createNodeEventHandler(context, eventName, methodName) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    context = context._methodHost || context;
    let handler = function(e) {
      if (context[methodName]) {
        context[methodName](e, e.detail);
      } else {
        console.warn('listener method `' + methodName + '` not defined');
      }
    };
    return handler;
  }

  /**
   * Element mixin that provides basic template parsing and stamping, including
   * the following template-related features for stamped templates:
   *
   * - Declarative event listeners (`on-eventname="listener"`)
   * - Map of node id's to stamped node instances (`this.$.id`)
   * - Nested template content caching/removal and re-installation (performance
   *   optimization)
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin that provides basic template parsing and stamping
   */
  Polymer.TemplateStamp = Polymer.dedupingMixin(superClass => {

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_TemplateStamp}
     */
    class TemplateStamp extends superClass {

      /**
       * Scans a template to produce template metadata.
       *
       * Template-specific metadata are stored in the object returned, and node-
       * specific metadata are stored in objects in its flattened `nodeInfoList`
       * array.  Only nodes in the template that were parsed as nodes of
       * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
       * contains an `index` (`childNodes` index in parent) and optionally
       * `parent`, which points to node info of its parent (including its index).
       *
       * The template metadata object returned from this method has the following
       * structure (many fields optional):
       *
       * ```js
       *   {
       *     // Flattened list of node metadata (for nodes that generated metadata)
       *     nodeInfoList: [
       *       {
       *         // `id` attribute for any nodes with id's for generating `$` map
       *         id: {string},
       *         // `on-event="handler"` metadata
       *         events: [
       *           {
       *             name: {string},   // event name
       *             value: {string},  // handler method name
       *           }, ...
       *         ],
       *         // Notes when the template contained a `<slot>` for shady DOM
       *         // optimization purposes
       *         hasInsertionPoint: {boolean},
       *         // For nested `<template>`` nodes, nested template metadata
       *         templateInfo: {object}, // nested template metadata
       *         // Metadata to allow efficient retrieval of instanced node
       *         // corresponding to this metadata
       *         parentInfo: {number},   // reference to parent nodeInfo>
       *         parentIndex: {number},  // index in parent's `childNodes` collection
       *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
       *       },
       *       ...
       *     ],
       *     // When true, the template had the `strip-whitespace` attribute
       *     // or was nested in a template with that setting
       *     stripWhitespace: {boolean},
       *     // For nested templates, nested template content is moved into
       *     // a document fragment stored here; this is an optimization to
       *     // avoid the cost of nested template cloning
       *     content: {DocumentFragment}
       *   }
       * ```
       *
       * This method kicks off a recursive treewalk as follows:
       *
       * ```
       *    _parseTemplate <---------------------+
       *      _parseTemplateContent              |
       *        _parseTemplateNode  <------------|--+
       *          _parseTemplateNestedTemplate --+  |
       *          _parseTemplateChildNodes ---------+
       *          _parseTemplateNodeAttributes
       *            _parseTemplateNodeAttribute
       *
       * ```
       *
       * These methods may be overridden to add custom metadata about templates
       * to either `templateInfo` or `nodeInfo`.
       *
       * Note that this method may be destructive to the template, in that
       * e.g. event annotations may be removed after being noted in the
       * template metadata.
       *
       * @param {!HTMLTemplateElement} template Template to parse
       * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
       *   template, for parsing nested templates
       * @return {!TemplateInfo} Parsed template metadata
       */
      static _parseTemplate(template, outerTemplateInfo) {
        // since a template may be re-used, memo-ize metadata
        if (!template._templateInfo) {
          let templateInfo = template._templateInfo = {};
          templateInfo.nodeInfoList = [];
          templateInfo.stripWhiteSpace =
            (outerTemplateInfo && outerTemplateInfo.stripWhiteSpace) ||
            template.hasAttribute('strip-whitespace');
          this._parseTemplateContent(template, templateInfo, {parent: null});
        }
        return template._templateInfo;
      }

      static _parseTemplateContent(template, templateInfo, nodeInfo) {
        return this._parseTemplateNode(template.content, templateInfo, nodeInfo);
      }

      /**
       * Parses template node and adds template and node metadata based on
       * the current node, and its `childNodes` and `attributes`.
       *
       * This method may be overridden to add custom node or template specific
       * metadata based on this node.
       *
       * @param {Node} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */
      static _parseTemplateNode(node, templateInfo, nodeInfo) {
        let noted;
        let element = /** @type Element */(node);
        if (element.localName == 'template' && !element.hasAttribute('preserve-content')) {
          noted = this._parseTemplateNestedTemplate(element, templateInfo, nodeInfo) || noted;
        } else if (element.localName === 'slot') {
          // For ShadyDom optimization, indicating there is an insertion point
          templateInfo.hasInsertionPoint = true;
        }
        if (element.firstChild) {
          noted = this._parseTemplateChildNodes(element, templateInfo, nodeInfo) || noted;
        }
        if (element.hasAttributes && element.hasAttributes()) {
          noted = this._parseTemplateNodeAttributes(element, templateInfo, nodeInfo) || noted;
        }
        return noted;
      }

      /**
       * Parses template child nodes for the given root node.
       *
       * This method also wraps whitelisted legacy template extensions
       * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
       * wrappers, collapses text nodes, and strips whitespace from the template
       * if the `templateInfo.stripWhitespace` setting was provided.
       *
       * @param {Node} root Root node whose `childNodes` will be parsed
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       */
      static _parseTemplateChildNodes(root, templateInfo, nodeInfo) {
        for (let node=root.firstChild, parentIndex=0, next; node; node=next) {
          // Wrap templates
          if (node.localName == 'template') {
            node = wrapTemplateExtension(node);
          }
          // collapse adjacent textNodes: fixes an IE issue that can cause
          // text nodes to be inexplicably split =(
          // note that root.normalize() should work but does not so we do this
          // manually.
          next = node.nextSibling;
          if (node.nodeType === Node.TEXT_NODE) {
            let /** Node */ n = next;
            while (n && (n.nodeType === Node.TEXT_NODE)) {
              node.textContent += n.textContent;
              next = n.nextSibling;
              root.removeChild(n);
              n = next;
            }
            // optionally strip whitespace
            if (templateInfo.stripWhiteSpace && !node.textContent.trim()) {
              root.removeChild(node);
              continue;
            }
          }
          let childInfo = { parentIndex, parentInfo: nodeInfo };
          if (this._parseTemplateNode(node, templateInfo, childInfo)) {
            childInfo.infoIndex = templateInfo.nodeInfoList.push(/** @type {!NodeInfo} */(childInfo)) - 1;
          }
          // Increment if not removed
          if (node.parentNode) {
            parentIndex++;
          }
        }
      }

      /**
       * Parses template content for the given nested `<template>`.
       *
       * Nested template info is stored as `templateInfo` in the current node's
       * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
       * It will then be the responsibility of the host to set it back to the
       * template and for users stamping nested templates to use the
       * `_contentForTemplate` method to retrieve the content for this template
       * (an optimization to avoid the cost of cloning nested template content).
       *
       * @param {HTMLTemplateElement} node Node to parse (a <template>)
       * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
       *   that includes the template `node`
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */
      static _parseTemplateNestedTemplate(node, outerTemplateInfo, nodeInfo) {
        let templateInfo = this._parseTemplate(node, outerTemplateInfo);
        let content = templateInfo.content =
          node.content.ownerDocument.createDocumentFragment();
        content.appendChild(node.content);
        nodeInfo.templateInfo = templateInfo;
        return true;
      }

      /**
       * Parses template node attributes and adds node metadata to `nodeInfo`
       * for nodes of interest.
       *
       * @param {Element} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */
      static _parseTemplateNodeAttributes(node, templateInfo, nodeInfo) {
        // Make copy of original attribute list, since the order may change
        // as attributes are added and removed
        let noted = false;
        let attrs = Array.from(node.attributes);
        for (let i=attrs.length-1, a; (a=attrs[i]); i--) {
          noted = this._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, a.name, a.value) || noted;
        }
        return noted;
      }

      /**
       * Parses a single template node attribute and adds node metadata to
       * `nodeInfo` for attributes of interest.
       *
       * This implementation adds metadata for `on-event="handler"` attributes
       * and `id` attributes.
       *
       * @param {Element} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @param {string} name Attribute name
       * @param {string} value Attribute value
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */
      static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
        // events (on-*)
        if (name.slice(0, 3) === 'on-') {
          node.removeAttribute(name);
          nodeInfo.events = nodeInfo.events || [];
          nodeInfo.events.push({
            name: name.slice(3),
            value
          });
          return true;
        }
        // static id
        else if (name === 'id') {
          nodeInfo.id = value;
          return true;
        }
        return false;
      }

      /**
       * Returns the `content` document fragment for a given template.
       *
       * For nested templates, Polymer performs an optimization to cache nested
       * template content to avoid the cost of cloning deeply nested templates.
       * This method retrieves the cached content for a given template.
       *
       * @param {HTMLTemplateElement} template Template to retrieve `content` for
       * @return {DocumentFragment} Content fragment
       */
      static _contentForTemplate(template) {
        let templateInfo = /** @type {HTMLTemplateElementWithInfo} */ (template)._templateInfo;
        return (templateInfo && templateInfo.content) || template.content;
      }

      /**
       * Clones the provided template content and returns a document fragment
       * containing the cloned dom.
       *
       * The template is parsed (once and memoized) using this library's
       * template parsing features, and provides the following value-added
       * features:
       * * Adds declarative event listeners for `on-event="handler"` attributes
       * * Generates an "id map" for all nodes with id's under `$` on returned
       *   document fragment
       * * Passes template info including `content` back to templates as
       *   `_templateInfo` (a performance optimization to avoid deep template
       *   cloning)
       *
       * Note that the memoized template parsing process is destructive to the
       * template: attributes for bindings and declarative event listeners are
       * removed after being noted in notes, and any nested `<template>.content`
       * is removed and stored in notes as well.
       *
       * @param {!HTMLTemplateElement} template Template to stamp
       * @return {!StampedTemplate} Cloned template content
       */
      _stampTemplate(template) {
        // Polyfill support: bootstrap the template if it has not already been
        if (template && !template.content &&
            window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
          HTMLTemplateElement.decorate(template);
        }
        let templateInfo = this.constructor._parseTemplate(template);
        let nodeInfo = templateInfo.nodeInfoList;
        let content = templateInfo.content || template.content;
        let dom = /** @type DocumentFragment */ (document.importNode(content, true));
        // NOTE: ShadyDom optimization indicating there is an insertion point
        dom.__noInsertionPoint = !templateInfo.hasInsertionPoint;
        let nodes = dom.nodeList = new Array(nodeInfo.length);
        dom.$ = {};
        for (let i=0, l=nodeInfo.length, info; (i<l) && (info=nodeInfo[i]); i++) {
          let node = nodes[i] = findTemplateNode(dom, info);
          applyIdToMap(this, dom.$, node, info);
          applyTemplateContent(this, node, info);
          applyEventListener(this, node, info);
        }
        return /** @type {!StampedTemplate} */(dom);
      }

      /**
       * Adds an event listener by method name for the event provided.
       *
       * This method generates a handler function that looks up the method
       * name at handling time.
       *
       * @param {Node} node Node to add listener on
       * @param {string} eventName Name of event
       * @param {string} methodName Name of method
       * @param {*=} context Context the method will be called on (defaults
       *   to `node`)
       * @return {Function} Generated handler function
       */
      _addMethodEventListenerToNode(node, eventName, methodName, context) {
        context = context || node;
        let handler = createNodeEventHandler(context, eventName, methodName);
        this._addEventListenerToNode(node, eventName, handler);
        return handler;
      }

      /**
       * Override point for adding custom or simulated event handling.
       *
       * @param {Node} node Node to add event listener to
       * @param {string} eventName Name of event
       * @param {Function} handler Listener function to add
       */
      _addEventListenerToNode(node, eventName, handler) {
        node.addEventListener(eventName, handler);
      }

      /**
       * Override point for adding custom or simulated event handling.
       *
       * @param {Node} node Node to remove event listener from
       * @param {string} eventName Name of event
       * @param {Function} handler Listener function to remove
       */
      _removeEventListenerFromNode(node, eventName, handler) {
        node.removeEventListener(eventName, handler);
      }

    }

    return TemplateStamp;

  });

})();



/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(5);

__webpack_require__(28);

__webpack_require__(29);

__webpack_require__(30);

__webpack_require__(8);


(function() {
  'use strict';

  let TemplateInstanceBase = Polymer.TemplateInstanceBase; // eslint-disable-line

  /**
   * @constructor
   * @implements {Polymer_OptionalMutableData}
   * @extends {Polymer.Element}
   */
  const domRepeatBase = Polymer.OptionalMutableData(Polymer.Element);

  /**
   * The `<dom-repeat>` element will automatically stamp and binds one instance
   * of template content to each object in a user-provided array.
   * `dom-repeat` accepts an `items` property, and one instance of the template
   * is stamped for each item into the DOM at the location of the `dom-repeat`
   * element.  The `item` property will be set on each instance's binding
   * scope, thus templates should bind to sub-properties of `item`.
   *
   * Example:
   *
   * ```html
   * <dom-module id="employee-list">
   *
   *   <template>
   *
   *     <div> Employee list: </div>
   *     <template is="dom-repeat" items="{{employees}}">
   *         <div>First name: <span>{{item.first}}</span></div>
   *         <div>Last name: <span>{{item.last}}</span></div>
   *     </template>
   *
   *   </template>
   *
   *   <script>
   *     Polymer({
   *       is: 'employee-list',
   *       ready: function() {
   *         this.employees = [
   *             {first: 'Bob', last: 'Smith'},
   *             {first: 'Sally', last: 'Johnson'},
   *             ...
   *         ];
   *       }
   *     });
   *   < /script>
   *
   * </dom-module>
   * ```
   *
   * Notifications for changes to items sub-properties will be forwarded to template
   * instances, which will update via the normal structured data notification system.
   *
   * Mutations to the `items` array itself should be made using the Array
   * mutation API's on `Polymer.Base` (`push`, `pop`, `splice`, `shift`,
   * `unshift`), and template instances will be kept in sync with the data in the
   * array.
   *
   * Events caught by event handlers within the `dom-repeat` template will be
   * decorated with a `model` property, which represents the binding scope for
   * each template instance.  The model is an instance of Polymer.Base, and should
   * be used to manipulate data on the instance, for example
   * `event.model.set('item.checked', true);`.
   *
   * Alternatively, the model for a template instance for an element stamped by
   * a `dom-repeat` can be obtained using the `modelForElement` API on the
   * `dom-repeat` that stamped it, for example
   * `this.$.domRepeat.modelForElement(event.target).set('item.checked', true);`.
   * This may be useful for manipulating instance data of event targets obtained
   * by event handlers on parents of the `dom-repeat` (event delegation).
   *
   * A view-specific filter/sort may be applied to each `dom-repeat` by supplying a
   * `filter` and/or `sort` property.  This may be a string that names a function on
   * the host, or a function may be assigned to the property directly.  The functions
   * should implemented following the standard `Array` filter/sort API.
   *
   * In order to re-run the filter or sort functions based on changes to sub-fields
   * of `items`, the `observe` property may be set as a space-separated list of
   * `item` sub-fields that should cause a re-filter/sort when modified.  If
   * the filter or sort function depends on properties not contained in `items`,
   * the user should observe changes to those properties and call `render` to update
   * the view based on the dependency change.
   *
   * For example, for an `dom-repeat` with a filter of the following:
   *
   * ```js
   * isEngineer: function(item) {
   *     return item.type == 'engineer' || item.manager.type == 'engineer';
   * }
   * ```
   *
   * Then the `observe` property should be configured as follows:
   *
   * ```html
   * <template is="dom-repeat" items="{{employees}}"
   *           filter="isEngineer" observe="type manager.type">
   * ```
   *
   * @customElement
   * @polymer
   * @memberof Polymer
   * @extends {domRepeatBase}
   * @appliesMixin Polymer.OptionalMutableData
   * @summary Custom element for stamping instance of a template bound to
   *   items in an array.
   */
  class DomRepeat extends domRepeatBase {

    // Not needed to find template; can be removed once the analyzer
    // can find the tag name from customElements.define call
    static get is() { return 'dom-repeat'; }

    static get template() { return null; }

    static get properties() {

      /**
       * Fired whenever DOM is added or removed by this template (by
       * default, rendering occurs lazily).  To force immediate rendering, call
       * `render`.
       *
       * @event dom-change
       */
      return {

        /**
         * An array containing items determining how many instances of the template
         * to stamp and that that each template instance should bind to.
         */
        items: {
          type: Array
        },

        /**
         * The name of the variable to add to the binding scope for the array
         * element associated with a given template instance.
         */
        as: {
          type: String,
          value: 'item'
        },

        /**
         * The name of the variable to add to the binding scope with the index
         * of the instance in the sorted and filtered list of rendered items.
         * Note, for the index in the `this.items` array, use the value of the
         * `itemsIndexAs` property.
         */
        indexAs: {
          type: String,
          value: 'index'
        },

        /**
         * The name of the variable to add to the binding scope with the index
         * of the instance in the `this.items` array. Note, for the index of
         * this instance in the sorted and filtered list of rendered items,
         * use the value of the `indexAs` property.
         */
        itemsIndexAs: {
          type: String,
          value: 'itemsIndex'
        },

        /**
         * A function that should determine the sort order of the items.  This
         * property should either be provided as a string, indicating a method
         * name on the element's host, or else be an actual function.  The
         * function should match the sort function passed to `Array.sort`.
         * Using a sort function has no effect on the underlying `items` array.
         */
        sort: {
          type: Function,
          observer: '__sortChanged'
        },

        /**
         * A function that can be used to filter items out of the view.  This
         * property should either be provided as a string, indicating a method
         * name on the element's host, or else be an actual function.  The
         * function should match the sort function passed to `Array.filter`.
         * Using a filter function has no effect on the underlying `items` array.
         */
        filter: {
          type: Function,
          observer: '__filterChanged'
        },

        /**
         * When using a `filter` or `sort` function, the `observe` property
         * should be set to a space-separated list of the names of item
         * sub-fields that should trigger a re-sort or re-filter when changed.
         * These should generally be fields of `item` that the sort or filter
         * function depends on.
         */
        observe: {
          type: String,
          observer: '__observeChanged'
        },

        /**
         * When using a `filter` or `sort` function, the `delay` property
         * determines a debounce time after a change to observed item
         * properties that must pass before the filter or sort is re-run.
         * This is useful in rate-limiting shuffing of the view when
         * item changes may be frequent.
         */
        delay: Number,

        /**
         * Count of currently rendered items after `filter` (if any) has been applied.
         * If "chunking mode" is enabled, `renderedItemCount` is updated each time a
         * set of template instances is rendered.
         *
         */
        renderedItemCount: {
          type: Number,
          notify: true,
          readOnly: true
        },

        /**
         * Defines an initial count of template instances to render after setting
         * the `items` array, before the next paint, and puts the `dom-repeat`
         * into "chunking mode".  The remaining items will be created and rendered
         * incrementally at each animation frame therof until all instances have
         * been rendered.
         */
        initialCount: {
          type: Number,
          observer: '__initializeChunking'
        },

        /**
         * When `initialCount` is used, this property defines a frame rate to
         * target by throttling the number of instances rendered each frame to
         * not exceed the budget for the target frame rate.  Setting this to a
         * higher number will allow lower latency and higher throughput for
         * things like event handlers, but will result in a longer time for the
         * remaining items to complete rendering.
         */
        targetFramerate: {
          type: Number,
          value: 20
        },

        _targetFrameTime: {
          type: Number,
          computed: '__computeFrameTime(targetFramerate)'
        }

      }

    }

    static get observers() {
      return [ '__itemsChanged(items.*)' ]
    }

    constructor() {
      super();
      this.__instances = [];
      this.__limit = Infinity;
      this.__pool = [];
      this.__renderDebouncer = null;
      this.__itemsIdxToInstIdx = {};
      this.__chunkCount = null;
      this.__lastChunkTime = null;
      this.__sortFn = null;
      this.__filterFn = null;
      this.__observePaths = null;
      this.__ctor = null;
      this.__isDetached = true;
      this.template = null;
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.__isDetached = true;
      for (let i=0; i<this.__instances.length; i++) {
        this.__detachInstance(i);
      }
    }

    connectedCallback() {
      super.connectedCallback();
      // only perform attachment if the element was previously detached.
      if (this.__isDetached) {
        this.__isDetached = false;
        let parent = this.parentNode;
        for (let i=0; i<this.__instances.length; i++) {
          this.__attachInstance(i, parent);
        }
      }
    }

    __ensureTemplatized() {
      // Templatizing (generating the instance constructor) needs to wait
      // until ready, since won't have its template content handed back to
      // it until then
      if (!this.__ctor) {
        let template = this.template = this.querySelector('template');
        if (!template) {
          // // Wait until childList changes and template should be there by then
          let observer = new MutationObserver(() => {
            if (this.querySelector('template')) {
              observer.disconnect();
              this.__render();
            } else {
              throw new Error('dom-repeat requires a <template> child');
            }
          })
          observer.observe(this, {childList: true});
          return false;
        }
        // Template instance props that should be excluded from forwarding
        let instanceProps = {};
        instanceProps[this.as] = true;
        instanceProps[this.indexAs] = true;
        instanceProps[this.itemsIndexAs] = true;
        this.__ctor = Polymer.Templatize.templatize(template, this, {
          mutableData: this.mutableData,
          parentModel: true,
          instanceProps: instanceProps,
          /**
           * @this {this}
           * @param {string} prop Property to set
           * @param {*} value Value to set property to
           */
          forwardHostProp: function(prop, value) {
            let i$ = this.__instances;
            for (let i=0, inst; (i<i$.length) && (inst=i$[i]); i++) {
              inst.forwardHostProp(prop, value);
            }
          },
          /**
           * @this {this}
           * @param {Object} inst Instance to notify
           * @param {string} prop Property to notify
           * @param {*} value Value to notify
           */
          notifyInstanceProp: function(inst, prop, value) {
            if (Polymer.Path.matches(this.as, prop)) {
              let idx = inst[this.itemsIndexAs];
              if (prop == this.as) {
                this.items[idx] = value;
              }
              let path = Polymer.Path.translate(this.as, 'items.' + idx, prop);
              this.notifyPath(path, value);
            }
          }
        });
      }
      return true;
    }

    __getMethodHost() {
      // Technically this should be the owner of the outermost template.
      // In shadow dom, this is always getRootNode().host, but we can
      // approximate this via cooperation with our dataHost always setting
      // `_methodHost` as long as there were bindings (or id's) on this
      // instance causing it to get a dataHost.
      return this.__dataHost._methodHost || this.__dataHost;
    }

    __sortChanged(sort) {
      let methodHost = this.__getMethodHost();
      this.__sortFn = sort && (typeof sort == 'function' ? sort :
        function() { return methodHost[sort].apply(methodHost, arguments); });
      if (this.items) {
        this.__debounceRender(this.__render);
      }
    }

    __filterChanged(filter) {
      let methodHost = this.__getMethodHost();
      this.__filterFn = filter && (typeof filter == 'function' ? filter :
        function() { return methodHost[filter].apply(methodHost, arguments); });
      if (this.items) {
        this.__debounceRender(this.__render);
      }
    }

    __computeFrameTime(rate) {
      return Math.ceil(1000/rate);
    }

    __initializeChunking() {
      if (this.initialCount) {
        this.__limit = this.initialCount;
        this.__chunkCount = this.initialCount;
        this.__lastChunkTime = performance.now();
      }
    }

    __tryRenderChunk() {
      // Debounced so that multiple calls through `_render` between animation
      // frames only queue one new rAF (e.g. array mutation & chunked render)
      if (this.items && this.__limit < this.items.length) {
        this.__debounceRender(this.__requestRenderChunk);
      }
    }

    __requestRenderChunk() {
      requestAnimationFrame(()=>this.__renderChunk());
    }

    __renderChunk() {
      // Simple auto chunkSize throttling algorithm based on feedback loop:
      // measure actual time between frames and scale chunk count by ratio
      // of target/actual frame time
      let currChunkTime = performance.now();
      let ratio = this._targetFrameTime / (currChunkTime - this.__lastChunkTime);
      this.__chunkCount = Math.round(this.__chunkCount * ratio) || 1;
      this.__limit += this.__chunkCount;
      this.__lastChunkTime = currChunkTime;
      this.__debounceRender(this.__render);
    }

    __observeChanged() {
      this.__observePaths = this.observe &&
        this.observe.replace('.*', '.').split(' ');
    }

    __itemsChanged(change) {
      if (this.items && !Array.isArray(this.items)) {
        console.warn('dom-repeat expected array for `items`, found', this.items);
      }
      // If path was to an item (e.g. 'items.3' or 'items.3.foo'), forward the
      // path to that instance synchronously (retuns false for non-item paths)
      if (!this.__handleItemPath(change.path, change.value)) {
        // Otherwise, the array was reset ('items') or spliced ('items.splices'),
        // so queue a full refresh
        this.__initializeChunking();
        this.__debounceRender(this.__render);
      }
    }

    __handleObservedPaths(path) {
      if (this.__observePaths) {
        path = path.substring(path.indexOf('.') + 1);
        let paths = this.__observePaths;
        for (let i=0; i<paths.length; i++) {
          if (path.indexOf(paths[i]) === 0) {
            this.__debounceRender(this.__render, this.delay);
            return true;
          }
        }
      }
    }

    /**
     * @param {function(this:DomRepeat)} fn Function to debounce.
     * @param {number=} delay Delay in ms to debounce by.
     */
    __debounceRender(fn, delay = 0) {
      this.__renderDebouncer = Polymer.Debouncer.debounce(
            this.__renderDebouncer
          , delay > 0 ? Polymer.Async.timeOut.after(delay) : Polymer.Async.microTask
          , fn.bind(this));
      Polymer.enqueueDebouncer(this.__renderDebouncer);
    }

    /**
     * Forces the element to render its content. Normally rendering is
     * asynchronous to a provoking change. This is done for efficiency so
     * that multiple changes trigger only a single render. The render method
     * should be called if, for example, template rendering is required to
     * validate application state.
     */
    render() {
      // Queue this repeater, then flush all in order
      this.__debounceRender(this.__render);
      Polymer.flush();
    }

    __render() {
      if (!this.__ensureTemplatized()) {
        // No template found yet
        return;
      }
      this.__applyFullRefresh();
      // Reset the pool
      // TODO(kschaaf): Reuse pool across turns and nested templates
      // Now that objects/arrays are re-evaluated when set, we can safely
      // reuse pooled instances across turns, however we still need to decide
      // semantics regarding how long to hold, how many to hold, etc.
      this.__pool.length = 0;
      // Set rendered item count
      this._setRenderedItemCount(this.__instances.length);
      // Notify users
      this.dispatchEvent(new CustomEvent('dom-change', {
        bubbles: true,
        composed: true
      }));
      // Check to see if we need to render more items
      this.__tryRenderChunk();
    }

    __applyFullRefresh() {
      let items = this.items || [];
      let isntIdxToItemsIdx = new Array(items.length);
      for (let i=0; i<items.length; i++) {
        isntIdxToItemsIdx[i] = i;
      }
      // Apply user filter
      if (this.__filterFn) {
        isntIdxToItemsIdx = isntIdxToItemsIdx.filter((i, idx, array) =>
          this.__filterFn(items[i], idx, array));
      }
      // Apply user sort
      if (this.__sortFn) {
        isntIdxToItemsIdx.sort((a, b) => this.__sortFn(items[a], items[b]));
      }
      // items->inst map kept for item path forwarding
      const itemsIdxToInstIdx = this.__itemsIdxToInstIdx = {};
      let instIdx = 0;
      // Generate instances and assign items
      const limit = Math.min(isntIdxToItemsIdx.length, this.__limit);
      for (; instIdx<limit; instIdx++) {
        let inst = this.__instances[instIdx];
        let itemIdx = isntIdxToItemsIdx[instIdx];
        let item = items[itemIdx];
        itemsIdxToInstIdx[itemIdx] = instIdx;
        if (inst && instIdx < this.__limit) {
          inst._setPendingProperty(this.as, item);
          inst._setPendingProperty(this.indexAs, instIdx);
          inst._setPendingProperty(this.itemsIndexAs, itemIdx);
          inst._flushProperties();
        } else {
          this.__insertInstance(item, instIdx, itemIdx);
        }
      }
      // Remove any extra instances from previous state
      for (let i=this.__instances.length-1; i>=instIdx; i--) {
        this.__detachAndRemoveInstance(i);
      }
    }

    __detachInstance(idx) {
      let inst = this.__instances[idx];
      for (let i=0; i<inst.children.length; i++) {
        let el = inst.children[i];
        inst.root.appendChild(el);
      }
      return inst;
    }

    __attachInstance(idx, parent) {
      let inst = this.__instances[idx];
      parent.insertBefore(inst.root, this);
    }

    __detachAndRemoveInstance(idx) {
      let inst = this.__detachInstance(idx);
      if (inst) {
        this.__pool.push(inst);
      }
      this.__instances.splice(idx, 1);
    }

    __stampInstance(item, instIdx, itemIdx) {
      let model = {};
      model[this.as] = item;
      model[this.indexAs] = instIdx;
      model[this.itemsIndexAs] = itemIdx;
      return new this.__ctor(model);
    }

    __insertInstance(item, instIdx, itemIdx) {
      let inst = this.__pool.pop();
      if (inst) {
        // TODO(kschaaf): If the pool is shared across turns, hostProps
        // need to be re-set to reused instances in addition to item
        inst._setPendingProperty(this.as, item);
        inst._setPendingProperty(this.indexAs, instIdx);
        inst._setPendingProperty(this.itemsIndexAs, itemIdx);
        inst._flushProperties();
      } else {
        inst = this.__stampInstance(item, instIdx, itemIdx);
      }
      let beforeRow = this.__instances[instIdx + 1];
      let beforeNode = beforeRow ? beforeRow.children[0] : this;
      this.parentNode.insertBefore(inst.root, beforeNode);
      this.__instances[instIdx] = inst;
      return inst;
    }

    // Implements extension point from Templatize mixin
    _showHideChildren(hidden) {
      for (let i=0; i<this.__instances.length; i++) {
        this.__instances[i]._showHideChildren(hidden);
      }
    }

    // Called as a side effect of a host items.<key>.<path> path change,
    // responsible for notifying item.<path> changes to inst for key
    __handleItemPath(path, value) {
      let itemsPath = path.slice(6); // 'items.'.length == 6
      let dot = itemsPath.indexOf('.');
      let itemsIdx = dot < 0 ? itemsPath : itemsPath.substring(0, dot);
      // If path was index into array...
      if (itemsIdx == parseInt(itemsIdx, 10)) {
        let itemSubPath = dot < 0 ? '' : itemsPath.substring(dot+1);
        // If the path is observed, it will trigger a full refresh
        this.__handleObservedPaths(itemSubPath);
        // Note, even if a rull refresh is triggered, always do the path
        // notification because unless mutableData is used for dom-repeat
        // and all elements in the instance subtree, a full refresh may
        // not trigger the proper update.
        let instIdx = this.__itemsIdxToInstIdx[itemsIdx];
        let inst = this.__instances[instIdx];
        if (inst) {
          let itemPath = this.as + (itemSubPath ? '.' + itemSubPath : '');
          // This is effectively `notifyPath`, but avoids some of the overhead
          // of the public API
          inst._setPendingPropertyOrPath(itemPath, value, false, true);
          inst._flushProperties();
        }
        return true;
      }
    }

    /**
     * Returns the item associated with a given element stamped by
     * this `dom-repeat`.
     *
     * Note, to modify sub-properties of the item,
     * `modelForElement(el).set('item.<sub-prop>', value)`
     * should be used.
     *
     * @param {HTMLElement} el Element for which to return the item.
     * @return {*} Item associated with the element.
     */
    itemForElement(el) {
      let instance = this.modelForElement(el);
      return instance && instance[this.as];
    }

    /**
     * Returns the inst index for a given element stamped by this `dom-repeat`.
     * If `sort` is provided, the index will reflect the sorted order (rather
     * than the original array order).
     *
     * @param {HTMLElement} el Element for which to return the index.
     * @return {*} Row index associated with the element (note this may
     *   not correspond to the array index if a user `sort` is applied).
     */
    indexForElement(el) {
      let instance = this.modelForElement(el);
      return instance && instance[this.indexAs];
    }

    /**
     * Returns the template "model" associated with a given element, which
     * serves as the binding scope for the template instance the element is
     * contained in. A template model is an instance of `Polymer.Base`, and
     * should be used to manipulate data associated with this template instance.
     *
     * Example:
     *
     *   let model = modelForElement(el);
     *   if (model.index < 10) {
     *     model.set('item.checked', true);
     *   }
     *
     * @param {HTMLElement} el Element for which to return a template model.
     * @return {TemplateInstanceBase} Model representing the binding scope for
     *   the element.
     */
    modelForElement(el) {
      return Polymer.Templatize.modelForElement(this.template, el);
    }

  }

  customElements.define(DomRepeat.is, DomRepeat);

  Polymer.DomRepeat = DomRepeat;

})();




/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(6);

__webpack_require__(8);


  (function() {
    'use strict';

    // Base class for HTMLTemplateElement extension that has property effects
    // machinery for propagating host properties to children. This is an ES5
    // class only because Babel (incorrectly) requires super() in the class
    // constructor even though no `this` is used and it returns an instance.
    let newInstance = null;
    /**
     * @constructor
     * @extends {HTMLTemplateElement}
     */
    function HTMLTemplateElementExtension() { return newInstance; }
    HTMLTemplateElementExtension.prototype = Object.create(HTMLTemplateElement.prototype, {
      constructor: {
        value: HTMLTemplateElementExtension,
        writable: true
      }
    });
    /**
     * @constructor
     * @implements {Polymer_PropertyEffects}
     * @extends {HTMLTemplateElementExtension}
     */
    const DataTemplate = Polymer.PropertyEffects(HTMLTemplateElementExtension);
    /**
     * @constructor
     * @implements {Polymer_MutableData}
     * @extends {DataTemplate}
     */
    const MutableDataTemplate = Polymer.MutableData(DataTemplate);

    // Applies a DataTemplate subclass to a <template> instance
    function upgradeTemplate(template, constructor) {
      newInstance = template;
      Object.setPrototypeOf(template, constructor.prototype);
      new constructor();
      newInstance = null;
    }

    // Base class for TemplateInstance's
    /**
     * @constructor
     * @implements {Polymer_PropertyEffects}
     */
    const base = Polymer.PropertyEffects(class {});

    /**
     * @polymer
     * @customElement
     * @appliesMixin Polymer.PropertyEffects
     * @unrestricted
     */
    class TemplateInstanceBase extends base {
      constructor(props) {
        super();
        this._configureProperties(props);
        this.root = this._stampTemplate(this.__dataHost);
        // Save list of stamped children
        let children = this.children = [];
        for (let n = this.root.firstChild; n; n=n.nextSibling) {
          children.push(n);
          n.__templatizeInstance = this;
        }
        if (this.__templatizeOwner.__hideTemplateChildren__) {
          this._showHideChildren(true);
        }
        // Flush props only when props are passed if instance props exist
        // or when there isn't instance props.
        let options = this.__templatizeOptions;
        if ((props && options.instanceProps) || !options.instanceProps) {
          this._enableProperties();
        }
      }
      /**
       * Configure the given `props` by calling `_setPendingProperty`. Also
       * sets any properties stored in `__hostProps`.
       * @private
       * @param {Object} props Object of property name-value pairs to set.
       */
      _configureProperties(props) {
        let options = this.__templatizeOptions;
        if (props) {
          for (let iprop in options.instanceProps) {
            if (iprop in props) {
              this._setPendingProperty(iprop, props[iprop]);
            }
          }
        }
        for (let hprop in this.__hostProps) {
          this._setPendingProperty(hprop, this.__dataHost['_host_' + hprop]);
        }
      }
      /**
       * Forwards a host property to this instance.  This method should be
       * called on instances from the `options.forwardHostProp` callback
       * to propagate changes of host properties to each instance.
       *
       * Note this method enqueues the change, which are flushed as a batch.
       *
       * @param {string} prop Property or path name
       * @param {*} value Value of the property to forward
       */
      forwardHostProp(prop, value) {
        if (this._setPendingPropertyOrPath(prop, value, false, true)) {
          this.__dataHost._enqueueClient(this);
        }
      }
      /**
       * @override
       */
      _addEventListenerToNode(node, eventName, handler) {
        if (this._methodHost && this.__templatizeOptions.parentModel) {
          // If this instance should be considered a parent model, decorate
          // events this template instance as `model`
          this._methodHost._addEventListenerToNode(node, eventName, (e) => {
            e.model = this;
            handler(e);
          });
        } else {
          // Otherwise delegate to the template's host (which could be)
          // another template instance
          let templateHost = this.__dataHost.__dataHost;
          if (templateHost) {
            templateHost._addEventListenerToNode(node, eventName, handler);
          }
        }
      }
      /**
       * Shows or hides the template instance top level child elements. For
       * text nodes, `textContent` is removed while "hidden" and replaced when
       * "shown."
       * @param {boolean} hide Set to true to hide the children;
       * set to false to show them.
       * @protected
       */
      _showHideChildren(hide) {
        let c = this.children;
        for (let i=0; i<c.length; i++) {
          let n = c[i];
          // Ignore non-changes
          if (Boolean(hide) != Boolean(n.__hideTemplateChildren__)) {
            if (n.nodeType === Node.TEXT_NODE) {
              if (hide) {
                n.__polymerTextContent__ = n.textContent;
                n.textContent = '';
              } else {
                n.textContent = n.__polymerTextContent__;
              }
            } else if (n.style) {
              if (hide) {
                n.__polymerDisplay__ = n.style.display;
                n.style.display = 'none';
              } else {
                n.style.display = n.__polymerDisplay__;
              }
            }
          }
          n.__hideTemplateChildren__ = hide;
          if (n._showHideChildren) {
            n._showHideChildren(hide);
          }
        }
      }
      /**
       * Overrides default property-effects implementation to intercept
       * textContent bindings while children are "hidden" and cache in
       * private storage for later retrieval.
       *
       * @override
       */
      _setUnmanagedPropertyToNode(node, prop, value) {
        if (node.__hideTemplateChildren__ &&
            node.nodeType == Node.TEXT_NODE && prop == 'textContent') {
          node.__polymerTextContent__ = value;
        } else {
          super._setUnmanagedPropertyToNode(node, prop, value);
        }
      }
      /**
       * Find the parent model of this template instance.  The parent model
       * is either another templatize instance that had option `parentModel: true`,
       * or else the host element.
       *
       * @return {Polymer_PropertyEffects} The parent model of this instance
       */
      get parentModel() {
        let model = this.__parentModel;
        if (!model) {
          let options;
          model = this
          do {
            // A template instance's `__dataHost` is a <template>
            // `model.__dataHost.__dataHost` is the template's host
            model = model.__dataHost.__dataHost;
          } while ((options = model.__templatizeOptions) && !options.parentModel)
          this.__parentModel = model;
        }
        return model;
      }
    }

    /** @type {!DataTemplate} */
    TemplateInstanceBase.prototype.__dataHost;
    /** @type {!TemplatizeOptions} */
    TemplateInstanceBase.prototype.__templatizeOptions;
    /** @type {!Polymer_PropertyEffects} */
    TemplateInstanceBase.prototype._methodHost;
    /** @type {!Object} */
    TemplateInstanceBase.prototype.__templatizeOwner;
    /** @type {!Object} */
    TemplateInstanceBase.prototype.__hostProps;

    /**
     * @constructor
     * @extends {TemplateInstanceBase}
     * @implements {Polymer_MutableData}
     */
    const MutableTemplateInstanceBase = Polymer.MutableData(TemplateInstanceBase);

    function findMethodHost(template) {
      // Technically this should be the owner of the outermost template.
      // In shadow dom, this is always getRootNode().host, but we can
      // approximate this via cooperation with our dataHost always setting
      // `_methodHost` as long as there were bindings (or id's) on this
      // instance causing it to get a dataHost.
      let templateHost = template.__dataHost;
      return templateHost && templateHost._methodHost || templateHost;
    }

    /* eslint-disable valid-jsdoc */
    /**
     * @suppress {missingProperties} class.prototype is not defined for some reason
     */
    function createTemplatizerClass(template, templateInfo, options) {
      // Anonymous class created by the templatize
      let base = options.mutableData ?
        MutableTemplateInstanceBase : TemplateInstanceBase;
      /**
       * @constructor
       * @extends {base}
       */
      let klass = class extends base { }
      klass.prototype.__templatizeOptions = options;
      klass.prototype._bindTemplate(template);
      addNotifyEffects(klass, template, templateInfo, options);
      return klass;
    }

    /**
     * @suppress {missingProperties} class.prototype is not defined for some reason
     */
    function addPropagateEffects(template, templateInfo, options) {
      let userForwardHostProp = options.forwardHostProp;
      if (userForwardHostProp) {
        // Provide data API and property effects on memoized template class
        let klass = templateInfo.templatizeTemplateClass;
        if (!klass) {
          let base = options.mutableData ? MutableDataTemplate : DataTemplate;
          klass = templateInfo.templatizeTemplateClass =
            class TemplatizedTemplate extends base {}
          // Add template - >instances effects
          // and host <- template effects
          let hostProps = templateInfo.hostProps;
          for (let prop in hostProps) {
            klass.prototype._addPropertyEffect('_host_' + prop,
              klass.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,
              {fn: createForwardHostPropEffect(prop, userForwardHostProp)});
            klass.prototype._createNotifyingProperty('_host_' + prop);
          }
        }
        upgradeTemplate(template, klass);
        // Mix any pre-bound data into __data; no need to flush this to
        // instances since they pull from the template at instance-time
        if (template.__dataProto) {
          // Note, generally `__dataProto` could be chained, but it's guaranteed
          // to not be since this is a vanilla template we just added effects to
          Object.assign(template.__data, template.__dataProto);
        }
        // Clear any pending data for performance
        template.__dataTemp = {};
        template.__dataPending = null;
        template.__dataOld = null;
        template._enableProperties();
      }
    }
    /* eslint-enable valid-jsdoc */

    function createForwardHostPropEffect(hostProp, userForwardHostProp) {
      return function forwardHostProp(template, prop, props) {
        userForwardHostProp.call(template.__templatizeOwner,
          prop.substring('_host_'.length), props[prop]);
      }
    }

    function addNotifyEffects(klass, template, templateInfo, options) {
      let hostProps = templateInfo.hostProps || {};
      for (let iprop in options.instanceProps) {
        delete hostProps[iprop];
        let userNotifyInstanceProp = options.notifyInstanceProp;
        if (userNotifyInstanceProp) {
          klass.prototype._addPropertyEffect(iprop,
            klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
            {fn: createNotifyInstancePropEffect(iprop, userNotifyInstanceProp)});
        }
      }
      if (options.forwardHostProp && template.__dataHost) {
        for (let hprop in hostProps) {
          klass.prototype._addPropertyEffect(hprop,
            klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
            {fn: createNotifyHostPropEffect()})
        }
      }
    }

    function createNotifyInstancePropEffect(instProp, userNotifyInstanceProp) {
      return function notifyInstanceProp(inst, prop, props) {
        userNotifyInstanceProp.call(inst.__templatizeOwner,
          inst, prop, props[prop]);
      }
    }

    function createNotifyHostPropEffect() {
      return function notifyHostProp(inst, prop, props) {
        inst.__dataHost._setPendingPropertyOrPath('_host_' + prop, props[prop], true, true);
      }
    }

    /**
     * Module for preparing and stamping instances of templates that utilize
     * Polymer's data-binding and declarative event listener features.
     *
     * Example:
     *
     *     // Get a template from somewhere, e.g. light DOM
     *     let template = this.querySelector('template');
     *     // Prepare the template
     *     let TemplateClass = Polymer.Templatize.templatize(template);
     *     // Instance the template with an initial data model
     *     let instance = new TemplateClass({myProp: 'initial'});
     *     // Insert the instance's DOM somewhere, e.g. element's shadow DOM
     *     this.shadowRoot.appendChild(instance.root);
     *     // Changing a property on the instance will propagate to bindings
     *     // in the template
     *     instance.myProp = 'new value';
     *
     * The `options` dictionary passed to `templatize` allows for customizing
     * features of the generated template class, including how outer-scope host
     * properties should be forwarded into template instances, how any instance
     * properties added into the template's scope should be notified out to
     * the host, and whether the instance should be decorated as a "parent model"
     * of any event handlers.
     *
     *     // Customze property forwarding and event model decoration
     *     let TemplateClass = Polymer.Templatize.templatize(template, this, {
     *       parentModel: true,
     *       instanceProps: {...},
     *       forwardHostProp(property, value) {...},
     *       notifyInstanceProp(instance, property, value) {...},
     *     });
     *
     *
     * @namespace
     * @memberof Polymer
     * @summary Module for preparing and stamping instances of templates
     *   utilizing Polymer templating features.
     */

    const Templatize = {

      /**
       * Returns an anonymous `Polymer.PropertyEffects` class bound to the
       * `<template>` provided.  Instancing the class will result in the
       * template being stamped into document fragment stored as the instance's
       * `root` property, after which it can be appended to the DOM.
       *
       * Templates may utilize all Polymer data-binding features as well as
       * declarative event listeners.  Event listeners and inline computing
       * functions in the template will be called on the host of the template.
       *
       * The constructor returned takes a single argument dictionary of initial
       * property values to propagate into template bindings.  Additionally
       * host properties can be forwarded in, and instance properties can be
       * notified out by providing optional callbacks in the `options` dictionary.
       *
       * Valid configuration in `options` are as follows:
       *
       * - `forwardHostProp(property, value)`: Called when a property referenced
       *   in the template changed on the template's host. As this library does
       *   not retain references to templates instanced by the user, it is the
       *   templatize owner's responsibility to forward host property changes into
       *   user-stamped instances.  The `instance.forwardHostProp(property, value)`
       *    method on the generated class should be called to forward host
       *   properties into the template to prevent unnecessary property-changed
       *   notifications. Any properties referenced in the template that are not
       *   defined in `instanceProps` will be notified up to the template's host
       *   automatically.
       * - `instanceProps`: Dictionary of property names that will be added
       *   to the instance by the templatize owner.  These properties shadow any
       *   host properties, and changes within the template to these properties
       *   will result in `notifyInstanceProp` being called.
       * - `mutableData`: When `true`, the generated class will skip strict
       *   dirty-checking for objects and arrays (always consider them to be
       *   "dirty").
       * - `notifyInstanceProp(instance, property, value)`: Called when
       *   an instance property changes.  Users may choose to call `notifyPath`
       *   on e.g. the owner to notify the change.
       * - `parentModel`: When `true`, events handled by declarative event listeners
       *   (`on-event="handler"`) will be decorated with a `model` property pointing
       *   to the template instance that stamped it.  It will also be returned
       *   from `instance.parentModel` in cases where template instance nesting
       *   causes an inner model to shadow an outer model.
       *
       * Note that the class returned from `templatize` is generated only once
       * for a given `<template>` using `options` from the first call for that
       * template, and the cached class is returned for all subsequent calls to
       * `templatize` for that template.  As such, `options` callbacks should not
       * close over owner-specific properties since only the first `options` is
       * used; rather, callbacks are called bound to the `owner`, and so context
       * needed from the callbacks (such as references to `instances` stamped)
       * should be stored on the `owner` such that they can be retrieved via `this`.
       *
       * @memberof Polymer.Templatize
       * @param {!HTMLTemplateElement} template Template to templatize
       * @param {!Polymer_PropertyEffects} owner Owner of the template instances;
       *   any optional callbacks will be bound to this owner.
       * @param {Object=} options Options dictionary (see summary for details)
       * @return {function(new:TemplateInstanceBase)} Generated class bound to the template
       *   provided
       * @suppress {invalidCasts}
       */
      templatize(template, owner, options) {
        options = /** @type {!TemplatizeOptions} */(options || {});
        if (template.__templatizeOwner) {
          throw new Error('A <template> can only be templatized once');
        }
        template.__templatizeOwner = owner;
        let templateInfo = owner.constructor._parseTemplate(template);
        // Get memoized base class for the prototypical template, which
        // includes property effects for binding template & forwarding
        let baseClass = templateInfo.templatizeInstanceClass;
        if (!baseClass) {
          baseClass = createTemplatizerClass(template, templateInfo, options);
          templateInfo.templatizeInstanceClass = baseClass;
        }
        // Host property forwarding must be installed onto template instance
        addPropagateEffects(template, templateInfo, options);
        // Subclass base class and add reference for this specific template
        let klass = class TemplateInstance extends baseClass {};
        klass.prototype._methodHost = findMethodHost(template);
        klass.prototype.__dataHost = template;
        klass.prototype.__templatizeOwner = owner;
        klass.prototype.__hostProps = templateInfo.hostProps;
        return /** @type {function(new:TemplateInstanceBase)} */(klass);
      },

      /**
       * Returns the template "model" associated with a given element, which
       * serves as the binding scope for the template instance the element is
       * contained in. A template model is an instance of
       * `TemplateInstanceBase`, and should be used to manipulate data
       * associated with this template instance.
       *
       * Example:
       *
       *   let model = modelForElement(el);
       *   if (model.index < 10) {
       *     model.set('item.checked', true);
       *   }
       *
       * @memberof Polymer.Templatize
       * @param {HTMLTemplateElement} template The model will be returned for
       *   elements stamped from this template
       * @param {Node} node Node for which to return a template model.
       * @return {TemplateInstanceBase} Template instance representing the
       *   binding scope for the element
       */
      modelForElement(template, node) {
        let model;
        while (node) {
          // An element with a __templatizeInstance marks the top boundary
          // of a scope; walk up until we find one, and then ensure that
          // its __dataHost matches `this`, meaning this dom-repeat stamped it
          if ((model = node.__templatizeInstance)) {
            // Found an element stamped by another template; keep walking up
            // from its __dataHost
            if (model.__dataHost != template) {
              node = model.__dataHost;
            } else {
              return model;
            }
          } else {
            // Still in a template scope, keep going up until
            // a __templatizeInstance is found
            node = node.parentNode;
          }
        }
        return null;
      }
    }

    Polymer.Templatize = Templatize;
    Polymer.TemplateInstanceBase = TemplateInstanceBase;

  })();




/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(1);

__webpack_require__(7);


(function() {
  'use strict';

  /** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */
  let AsyncModule; // eslint-disable-line no-unused-vars

  /**
   * @summary Collapse multiple callbacks into one invocation after a timer.
   * @memberof Polymer
   */
  class Debouncer {
    constructor() {
      this._asyncModule = null;
      this._callback = null;
      this._timer = null;
    }
    /**
     * Sets the scheduler; that is, a module with the Async interface,
     * a callback and optional arguments to be passed to the run function
     * from the async module.
     *
     * @param {!AsyncModule} asyncModule Object with Async interface.
     * @param {function()} callback Callback to run.
     */
    setConfig(asyncModule, callback) {
      this._asyncModule = asyncModule;
      this._callback = callback;
      this._timer = this._asyncModule.run(() => {
        this._timer = null;
        this._callback()
      });
    }
    /**
     * Cancels an active debouncer and returns a reference to itself.
     */
    cancel() {
      if (this.isActive()) {
        this._asyncModule.cancel(this._timer);
        this._timer = null;
      }
    }
    /**
     * Flushes an active debouncer and returns a reference to itself.
     */
    flush() {
      if (this.isActive()) {
        this.cancel();
        this._callback();
      }
    }
    /**
     * Returns true if the debouncer is active.
     *
     * @return {boolean} True if active.
     */
    isActive() {
      return this._timer != null;
    }
  /**
   * Creates a debouncer if no debouncer is passed as a parameter
   * or it cancels an active debouncer otherwise. The following
   * example shows how a debouncer can be called multiple times within a
   * microtask and "debounced" such that the provided callback function is
   * called once. Add this method to a custom element:
   *
   * _debounceWork() {
   *   this._debounceJob = Polymer.Debouncer.debounce(this._debounceJob,
   *       Polymer.Async.microTask, () => {
   *     this._doWork();
   *   });
   * }
   *
   * If the `_debounceWork` method is called multiple times within the same
   * microtask, the `_doWork` function will be called only once at the next
   * microtask checkpoint.
   *
   * Note: In testing it is often convenient to avoid asynchrony. To accomplish
   * this with a debouncer, you can use `Polymer.enqueueDebouncer` and
   * `Polymer.flush`. For example, extend the above example by adding
   * `Polymer.enqueueDebouncer(this._debounceJob)` at the end of the
   * `_debounceWork` method. Then in a test, call `Polymer.flush` to ensure
   * the debouncer has completed.
   *
   * @param {Debouncer?} debouncer Debouncer object.
   * @param {!AsyncModule} asyncModule Object with Async interface
   * @param {function()} callback Callback to run.
   * @return {!Debouncer} Returns a debouncer object.
   */
    static debounce(debouncer, asyncModule, callback) {
      if (debouncer instanceof Debouncer) {
        debouncer.cancel();
      } else {
        debouncer = new Debouncer();
      }
      debouncer.setConfig(asyncModule, callback);
      return debouncer;
    }
  }

  Polymer.Debouncer = Debouncer;
})();



/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);


(function() {
  'use strict';

  let debouncerQueue = [];

  /**
   * Adds a `Polymer.Debouncer` to a list of globally flushable tasks.
   *
   * @memberof Polymer
   * @param {Polymer.Debouncer} debouncer Debouncer to enqueue
   */
  Polymer.enqueueDebouncer = function(debouncer) {
    debouncerQueue.push(debouncer);
  }

  function flushDebouncers() {
    const didFlush = Boolean(debouncerQueue.length);
    while (debouncerQueue.length) {
      try {
        debouncerQueue.shift().flush();
      } catch(e) {
        setTimeout(() => {
          throw e;
        });
      }
    }
    return didFlush;
  }

  /**
   * Forces several classes of asynchronously queued tasks to flush:
   * - Debouncers added via `enqueueDebouncer`
   * - ShadyDOM distribution
   *
   * @memberof Polymer
   */
  Polymer.flush = function() {
    let shadyDOM, debouncers;
    do {
      shadyDOM = window.ShadyDOM && ShadyDOM.flush();
      if (window.ShadyCSS && window.ShadyCSS.ScopingShim) {
        window.ShadyCSS.ScopingShim.flush();
      }
      debouncers = flushDebouncers();
    } while (shadyDOM || debouncers);
  }

})();



/***/ }),
/* 31 */
/***/ (function(module, exports) {

/*__wc__loader*/!function(a){var b="<style>ace-editor{display:block;}</style>\n\n";if(a.head){var c=a.head,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);

    class AceEditor extends Polymer.Element {
        static get is() { return 'ace-editor' }

        static get properties() {
            return {
                value: {
                    type: String,
                    value: '',
                    notify: true,
                    observer: '_valueObserver'
                },

                annotations: {
                    type: Array,
                    value: () => [],
                    observer: '_annotationsObserver'
                },

                _editor: {
                    type: Object,
                    value: null                    
                }
            }
        }

        /* Lifecycle */
        ready() {
            this.value = this.innerText || this.value
            super.ready()
            this._editor = ace.edit(this)
            this._editor.setTheme("ace/theme/monokai")
            this._editor.getSession().setMode("ace/mode/glsl")
            this._editor.setShowPrintMargin(false)

            this._editor.setValue(this.value)
            this._editor.session.setAnnotations(this.annotations)
            this._editor.selection.clearSelection()

            this._editor.on('change', (e, ed) => this.value = ed.getValue())
        }

        /* Observers */
        _valueObserver(val) {
            if (!this._editor || this._editor.getValue() == val) return
            this._editor.setValue(val)
        }

        _annotationsObserver(ann) {
            if (this._editor) this._editor.session.setAnnotations(ann)
        }

        /* Overrides */
        _attachDom(d) { this.appendChild(d) }
    }

    customElements.define(AceEditor.is, AceEditor)



/***/ }),
/* 32 */
/***/ (function(module, exports) {

/*__wc__loader*/!function(a){var b="<dom-module id=\"zoomable-image\">\n    <template>\n        <style>:host{display:block;position:relative;}#proxy-image{display:block;visibility:hidden;}#zoom-container{width:100%;height:100%;position:absolute;overflow:hidden;top:0;left:0;}#zoom-image{position:absolute;}</style>\n\n        \n        <img id=\"proxy-image\" src=\"[[src]]\">\n\n        <div id=\"zoom-container\">\n            <img id=\"zoom-image\" src=\"[[src]]\" style=\"[[_getStyle(scale, xOffset, yOffset)]]\" on-mousemove=\"_imageMouseMoveHandler\">\n        </div>\n    </template>\n</dom-module>\n\n";if(a.body){var c=a.body,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);

    class ZoomableImage extends Polymer.Element {
        static get is() { return 'zoomable-image' }

        static get properties() {
            return {
                scale: {
                    type: Number,
                    value: 1,
                    notify: true,
                    observer: '_scaleObserver'
                },

                maxScale: {
                    type: Number,
                    value: null
                },

                clamp: {
                    type: Boolean,
                    value: false
                },

                src: {
                    type: String,
                    value: ''
                },

                xOffset: {
                    type: Number,
                    value: 0,
                    notify: true
                },

                yOffset: {
                    type: Number,
                    value: 0,
                    notify: true
                },

                _dragging: {
                    type: Boolean,
                    value: false
                }
            }
        }

        static get observers() {
            return ['_offsetObserver(xOffset, yOffset, scale, src, clamp)']
        }

        // Lifecycle
        ready() {
            super.ready()

            this.addEventListener('wheel', e => {
                const oldScale = this.scale

                // set the scale first because the
                // offsets are clamped by the scale
                // and the scale is clamped by
                // the max value
                this.scale = oldScale - e.deltaY * 1e-2
                const newScale = this.scale

                // calculate the offset before and after
                // the scale change and move the offset by
                // that amount to keep the mouse over the
                // current pixel
                const xpxdelta = Math.floor(e.offsetX / newScale) - Math.floor(e.offsetX / oldScale)
                const ypxdelta = Math.floor(e.offsetY / newScale) - Math.floor(e.offsetY / oldScale)

                this.xOffset += xpxdelta
                this.yOffset += ypxdelta
            })

            let lastPageX, lastPageY
            this.addEventListener('mousedown', e => {
                if (e.which !== 2) return
                this._dragging = true
                
                lastPageX = e.pageX
                lastPageY = e.pageY
            })

            document.addEventListener('mouseup', e => {
                if (e.which !== 2) return
                this._dragging = false
            })

            document.addEventListener('mousemove', e => {
                if (!this._dragging) return

                const deltaX = e.pageX - lastPageX
                const deltaY = e.pageY - lastPageY

                this.xOffset += deltaX / this.scale
                this.yOffset += deltaY / this.scale

                lastPageX = e.pageX
                lastPageY = e.pageY
            })
        }

        // Utilities
        _getStyle(s, x, y) {
            x = Math.floor(x)            
            y = Math.floor(y)            
            x *= s
            y *= s
            s *= 100

            return `width:${s}%; top:${y}px; left:${x}px;`
        }

        // Observers
        _scaleObserver(s) {
            s = Math.max(1, Math.min(this.maxScale || Infinity, s))
            if (this.scale !== s) this.scale = s
        }

        _offsetObserver(x, y, s, src, clamp) {
            if (!clamp) return

            const prox = this.shadowRoot.querySelector('#proxy-image')

            const maxX = prox.width - prox.width / s
            const maxY = prox.height - prox.height / s

            // don't go past the top left edge
            x = Math.max(-maxX, Math.min(0, x))
            y = Math.max(-maxY, Math.min(0, y))

            if (this.xOffset !== x) this.xOffset = x
            if (this.yOffset !== y) this.yOffset = y
        }

        // Event Handlers
        _imageMouseMoveHandler(e) {
            const xpx = Math.floor(e.offsetX / this.scale)
            const ypx = Math.floor(e.offsetY / this.scale)

            e.pixel = {
                x: xpx,
                y: ypx        
            }
        }
    }

    customElements.define(ZoomableImage.is, ZoomableImage)



/***/ }),
/* 33 */
/***/ (function(module, exports) {

/*__wc__loader*/!function(a){var b="<dom-module id=\"image-magnifier\">\n    <template>\n        <style>:host{display:block;position:absolute;pointer-events:none;}#image-magnifier{right:0;top:0;position:absolute;z-index:1000;width:90px;height:90px;pointer-events:none;}#magnifier-container{width:80px;height:80px;border:5px solid white;border-radius:100px;overflow:hidden;background:#111;position:absolute;}#magnifier-container img{position:relative;image-rendering:pixelated;}#image-magnifier:before{content:\"\";width:30px;height:30px;top:7px;right:7px;position:absolute;background:white;}#pixel-outline{position:absolute;border:1px solid white;/* -1px on each side for the outline */ width:18px;height:18px;top:30px;left:30px;z-index:1000;opacity:0.5;}zoomable-image{position:absolute;image-rendering:pixelated;}</style>\n\n        <div id=\"image-magnifier\">\n            <div id=\"magnifier-container\">\n                <div id=\"pixel-outline\"></div>\n                <zoomable-image src=\"[[src]]\" scale=\"[[scale]]\" x-offset=\"[[_toOffset(xPixel)]]\" y-offset=\"[[_toOffset(yPixel)]]\" style=\"[[_getOffsetStyle(scale)]]\"></zoomable-image>\n            </div>\n        </div>\n    </template>\n</dom-module>\n\n";if(a.body){var c=a.body,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);

    class ImageMagnifier extends Polymer.Element {
        static get is() { return 'image-magnifier' }

        static get properties() {
            return {
                scale: {
                    type: Number,
                    value: 1,
                    notify: true,
                },

                src: {
                    type: String,
                    value: ''
                },

                xPixel: {
                    type: Number,
                    value: 0
                },

                yPixel: {
                    type: Number,
                    value: 0
                }
            }
        }

        static get observers() {
            return ['_offsetObserver(xPixel, yPixel)']
        }

        // Utilities
        _toOffset(px) {
            return -px + 2
        }

        _getOffsetStyle(s) {
            const offset = -s / 2
            return `top:${offset}px; left:${offset}px;`
        }
        
        // Observers
        _offsetObserver(x, y, s, src) {

        }
    }

    customElements.define(ImageMagnifier.is, ImageMagnifier)



/***/ }),
/* 34 */
/***/ (function(module, exports) {

/*__wc__loader*/!function(a){var b="<dom-module id=\"shader-editor\">\n    <template>\n        <style type=\"text/css\">#container{display:flex;height:100%;}shader-preview{flex:1;max-width:400px;background:#111;color:white;}#editors{height:100%;display:flex;flex-direction:column;flex:2;}ace-editor{flex:1;}h5{padding:5px;margin:0;color:white;background:#272822;font-size:12px;}</style>\n        <div id=\"container\">\n            <div id=\"editors\">\n                <h5>Vertex Shader</h5>\n                <ace-editor value=\"{{ vertexShader }}\" annotations=\"[[ _errorsToAnnotations(vertexErrors) ]]\" type=\"glsl\"></ace-editor>\n                \n                <h5>Fragment Shader</h5>\n                <ace-editor value=\"{{ fragmentShader }}\" annotations=\"[[ _errorsToAnnotations(fragmentErrors) ]]\" type=\"glsl\"></ace-editor>\n            </div>\n            <shader-preview vertex-shader=\"[[ vertexShader ]]\" vertex-errors=\"{{ vertexErrors }}\" fragment-shader=\"[[ fragmentShader ]]\" fragment-errors=\"{{ fragmentErrors }}\"></shader-preview>\n        </div>\n    </template>\n</dom-module>\n";if(a.body){var c=a.body,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);

    const vs = `// Lighting
struct DirLight {
    vec3 color;
    vec3 direction;
};

uniform DirLight directionalLights[NUM_DIR_LIGHTS];
uniform vec3 ambientLightColor;

varying vec3 lighting;

void main() 
{
    vec3 worldNorm = (modelViewMatrix * vec4(normal, 0)).xyz;
    
    lighting = ambientLightColor;
    for(int i = 0; i < NUM_DIR_LIGHTS; i ++) {
        DirLight dl = directionalLights[i];
        lighting += clamp(dot(worldNorm, dl.direction), 0.0, 1.0) * dl.color;
    } 

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

    const fs = `varying vec3 lighting;

void main() {
    vec3 rgb = vec3(1, 1, 1);

    gl_FragColor = vec4(rgb * lighting, 1);
}`

    class ShaderEditor extends Polymer.Element {
        static get is() { return 'shader-editor' }

        static get properties() {
            return {
                vertexShader: {
                    type: String,
                    value: vs,
                    notify: true
                },

                fragmentShader: {
                    type: String,
                    value: fs,
                    notify: true,
                },

                vertexErrors: {
                    type: Array,
                    value: null,
                    notify: true
                },

                fragmentErrors: {
                    type: Array,
                    value: null,
                    notify: true
                }
            }
        }

        _attachDom(d) { this.appendChild(d) }

        // Utilities
        _errorsToAnnotations(e) {
            if (!e) return null

            return e.map(i => {
                return {
                    row: i.row,
                    column: i.col,
                    text: i.log,
                    type: 'error'
                }
            })
        }
    }
 
    customElements.define(ShaderEditor.is, ShaderEditor)



/***/ }),
/* 35 */
/***/ (function(module, exports) {

/*__wc__loader*/!function(a){var b="<dom-module id=\"shader-preview\">\n    <template>\n        <style type=\"text/css\">#target{width:100%;image-rendering:pixelated;}image-magnifier{visibility:hidden;}#debug-list{display:flex;flex-wrap:wrap;width:100%;}#debug-list .shader{flex:1;min-width:100px;max-width:200px;transition:opacity .25s ease;}#debug-list:hover .shader{opacity:0.25;}#debug-list:hover .shader:hover{opacity:1;}#debug-list .shader .name{font-weight:500;font-size:14px;font-style:italic;text-align:center;}#debug-list .shader img{width:100%;}</style>\n        \n        <image-magnifier scale=\"20\" src=\"[[_primaryImageSrc]]\"></image-magnifier>\n\n        <zoomable-image id=\"target\" src=\"[[_primaryImageSrc]]\" max-scale=\"10\" on-mouseenter=\"_imageMouseEnterHandler\" on-mousemove=\"_imageMouseMoveHandler\" on-mouseleave=\"_imageMouseLeaveHandler\" clamp=\"\"></zoomable-image>\n        \n        <div id=\"debug-list\">\n            <template is=\"dom-repeat\" items=\"[[_images]]\">\n                <div class=\"shader\" active$=\"[[_equals(index,_activeImage)]]\" on-click=\"_debugImageClickHandler\">\n                    <div class=\"name\">[[item.type]] [[item.name]]</div>\n                    <img src$=\"[[item.src]]\">\n                </div>\n            </template>\n        </div>        \n    </template>\n</dom-module>\n";if(a.body){var c=a.body,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);

    class ShaderPreview extends Polymer.Element {
        static get is() { return 'shader-preview' }

        static get properties() {
            return {
                vertexShader: {
                    type: String,
                    value: '',
                    notify: true
                },

                fragmentShader: {
                    type: String,
                    value: '',
                    notify: true,
                },

                vertexErrors: {
                    type: Array,
                    value: null,
                    notify: true
                },

                fragmentErrors: {
                    type: Array,
                    value: null,
                    notify: true
                },

                _shaders: {
                    type: Array,
                    value: () => [],
                    computed: '_computeShaders(vertexShader, fragmentShader)'
                },

                _images: {
                    type: Array,
                    value: () => []
                },

                _activeImage: {
                    type: Number,
                    value: 0
                },

                _primaryImageSrc: {
                    type: String,
                    computed: '_computeImageSrc(_images.*, _activeImage)'
                }
            }
        }

        static get observers() {
            return [ '_shadersObserver(_shaders)' ]
        }

        // Lifecycle Functions
        ready() {
            super.ready()

            const scene = new THREE.Scene()
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
            renderer.setPixelRatio(window.devicePixelRatio)
            renderer.setSize(400, 400)
            renderer.setClearColor(0x000000, 0)

            const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 50)
            camera.position.z = 10
            scene.add(camera)

            const material = new THREE.ShaderMaterial({ uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib["lights"]
            ]), lights: true })
            const sphere = new THREE.Mesh(new THREE.SphereGeometry( 5, 32, 32 ), material )
            scene.add( sphere );
            scene.add(new THREE.AmbientLight(0x222222))
            
            const dl = new THREE.DirectionalLight( 0xffffff, 0.5 );
            dl.position.x = 1;
            dl.position.y = 1;
            dl.position.z = 1;
            scene.add( dl );
            
            const orbit = new THREE.OrbitControls(camera, this.querySelector('#target'))
            orbit.enableZoom = false
            orbit.addEventListener('change', () => this._render())

            this._renderer = renderer
            this._scene = scene
            this._camera = camera
            this._material = material

            this._render()
        }

        // Utilities
        _equals(a,b) {
            return a === b
        }

        _getLogErrors(logs, lineOffset = 0) {
            return logs
                .replace(String.fromCharCode(0), '')
                .trim()
                .split('\n')
                .map(line => this._getLogError(line, lineOffset))
        }

        _getLogError(log, lineOffset = 0) {
            const regex = /^ERROR: ([^:]+):([^:]+)\s*:/
            const matches = log.match(regex)
            let row = 0
            let col = 0
            if(matches != null) {
                row = parseFloat(matches[2]) - lineOffset
                col = parseFloat(matches[1])

                row = row || 0
                col = col || 0
            }
            log = log.replace(regex, '').trim()            

            return { row, col, log }
        }

        // Private Functions
        _updateMaterialAndRender(vs, fs, checkforerrors) {
            if (!this._material) return

            this._material.vertexShader = vs
            this._material.fragmentShader = fs

            this._material.lights = true
            this._material.uniforms = THREE.UniformsUtils.merge([
                THREE.UniformsLib["lights"]
            ]);

            this._material.needsUpdate = true
            this._renderer.render(this._scene, this._camera)

            if (checkforerrors) this._checkForError()
        }

        _checkForError() {
            const diag = this._renderer.info.programs[0].diagnostics
            if (!diag || !diag.fragmentShader.log) {
                this.fragmentErrors = null
            } else {
                this.fragmentErrors = this._getLogErrors(diag.fragmentShader.log, diag.fragmentShader.prefix.split('\n').length)
            }

            if (!diag || !diag.vertexShader.log) {
                this.vertexErrors = null
            } else {
                this.vertexErrors = this._getLogErrors(diag.vertexShader.log, diag.vertexShader.prefix.split('\n').length)
            }
        }

        _render() {
            if (!this._renderer) return


            let arr = this._images

            // expand the array if necessary
            while (arr.length > this._shaders.length) this.pop('_images')
            while (arr.length < this._shaders.length) this.push('_images', {})

            // TODO: Do this over multiple frames
            let bail = false
            for (let i = 0; i < this._shaders.length; i ++) {
                const item = this._shaders[i]
                const vs = item.vertexShader
                const fs = item.fragmentShader

                const setpref = `_images.${i}`

                this.set(`${setpref}.name`, item.name)
                this.set(`${setpref}.type`, item.type)
                arr[i].img = arr[i].img || new Image()

                if (!bail) {
                    this._updateMaterialAndRender(vs, fs, i === 0)
                    this.set(`${setpref}.src`, this._renderer.domElement.toDataURL('image/png'))
                } else {
                    this.set(`${setpref}.src`, '')
                }

                arr[i].img.src = arr[i].src

                bail = this.fragmentErrors || this.vertexErrors
            }
        }

        // Event Handlers
        _imageMouseEnterHandler() {
            this.querySelector('image-magnifier').style.visibility = 'visible'
        }

        _imageMouseMoveHandler(e) {
            const im = this.querySelector('image-magnifier')

            im.style.top = e.pageY + 'px'
            im.style.left = (e.pageX - im.clientWidth) + 'px'

            im.xPixel = e.pixel.x
            im.yPixel = e.pixel.y
        }

        _imageMouseLeaveHandler() {
            this.querySelector('image-magnifier').style.visibility = 'hidden'
        }

        _debugImageClickHandler(e) {
            this._activeImage = e.model.index
        }

        // Computed Variables
        _computeShaders(vs, fs) {
            const prim = {
                type: 'vec4',
                name: 'color',
                vertexShader: vs,
                fragmentShader: fs
            }
            const arr = [prim].concat(DebugShaders.enumerate(vs, fs))

            return arr
        }

        _computeImageSrc(images, i) {
            return images.base[i] ? images.base[i].src : ''
        }

        // Observers
        _shadersObserver(shaders) {
            this._render()
        }

        // Overrides
        _attachDom(d) { this.appendChild(d) }
    }
 
    customElements.define(ShaderPreview.is, ShaderPreview)



/***/ })
/******/ ]);