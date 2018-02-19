/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AnimatedImplementation
 * 
 * @format
 * @preventMunge
 */
'use strict';

var _require = require('./AnimatedEvent'),
    AnimatedEvent = _require.AnimatedEvent,
    attachNativeEvent = _require.attachNativeEvent;

var AnimatedAddition = require('./nodes/AnimatedAddition');
var AnimatedDiffClamp = require('./nodes/AnimatedDiffClamp');
var AnimatedDivision = require('./nodes/AnimatedDivision');
var AnimatedInterpolation = require('./nodes/AnimatedInterpolation');
var AnimatedModulo = require('./nodes/AnimatedModulo');
var AnimatedMultiplication = require('./nodes/AnimatedMultiplication');
var AnimatedNode = require('./nodes/AnimatedNode');
var AnimatedProps = require('./nodes/AnimatedProps');
var AnimatedTracking = require('./nodes/AnimatedTracking');
var AnimatedValue = require('./nodes/AnimatedValue');
var AnimatedValueXY = require('./nodes/AnimatedValueXY');
var DecayAnimation = require('./animations/DecayAnimation');
var SpringAnimation = require('./animations/SpringAnimation');
var TimingAnimation = require('./animations/TimingAnimation');

var createAnimatedComponent = require('./createAnimatedComponent');

var add = function add(a, b) {
  return new AnimatedAddition(a, b);
};

var divide = function divide(a, b) {
  return new AnimatedDivision(a, b);
};

var multiply = function multiply(a, b) {
  return new AnimatedMultiplication(a, b);
};

var modulo = function modulo(a, modulus) {
  return new AnimatedModulo(a, modulus);
};

var diffClamp = function diffClamp(a, min, max) {
  return new AnimatedDiffClamp(a, min, max);
};

var _combineCallbacks = function _combineCallbacks(callback, config) {
  if (callback && config.onComplete) {
    return function () {
      config.onComplete && config.onComplete.apply(config, arguments);
      callback && callback.apply(undefined, arguments);
    };
  } else {
    return callback || config.onComplete;
  }
};

var maybeVectorAnim = function maybeVectorAnim(value, config, anim) {
  if (value instanceof AnimatedValueXY) {
    var configX = Object.assign({}, config);
    var configY = Object.assign({}, config);
    for (var key in config) {
      var _config$key = config[key],
          x = _config$key.x,
          y = _config$key.y;

      if (x !== undefined && y !== undefined) {
        configX[key] = x;
        configY[key] = y;
      }
    }
    var aX = anim(value.x, configX);
    var aY = anim(value.y, configY);
    // We use `stopTogether: false` here because otherwise tracking will break
    // because the second animation will get stopped before it can update.
    return parallel([aX, aY], { stopTogether: false });
  }
  return null;
};

var spring = function spring(value, config) {
  var start = function start(animatedValue, configuration, callback) {
    callback = _combineCallbacks(callback, configuration);
    var singleValue = animatedValue;
    var singleConfig = configuration;
    singleValue.stopTracking();
    if (configuration.toValue instanceof AnimatedNode) {
      singleValue.track(new AnimatedTracking(singleValue, configuration.toValue, SpringAnimation, singleConfig, callback));
    } else {
      singleValue.animate(new SpringAnimation(singleConfig), callback);
    }
  };
  return maybeVectorAnim(value, config, spring) || {
    start: function (_start) {
      function start(_x) {
        return _start.apply(this, arguments);
      }

      start.toString = function () {
        return _start.toString();
      };

      return start;
    }(function (callback) {
      start(value, config, callback);
    }),

    stop: function stop() {
      value.stopAnimation();
    },

    reset: function reset() {
      value.resetAnimation();
    },

    _startNativeLoop: function _startNativeLoop(iterations) {
      var singleConfig = Object.assign({}, config, { iterations: iterations });
      start(value, singleConfig);
    },

    _isUsingNativeDriver: function _isUsingNativeDriver() {
      return config.useNativeDriver || false;
    }
  };
};

var timing = function timing(value, config) {
  var start = function start(animatedValue, configuration, callback) {
    callback = _combineCallbacks(callback, configuration);
    var singleValue = animatedValue;
    var singleConfig = configuration;
    singleValue.stopTracking();
    if (configuration.toValue instanceof AnimatedNode) {
      singleValue.track(new AnimatedTracking(singleValue, configuration.toValue, TimingAnimation, singleConfig, callback));
    } else {
      singleValue.animate(new TimingAnimation(singleConfig), callback);
    }
  };

  return maybeVectorAnim(value, config, timing) || {
    start: function (_start2) {
      function start(_x2) {
        return _start2.apply(this, arguments);
      }

      start.toString = function () {
        return _start2.toString();
      };

      return start;
    }(function (callback) {
      start(value, config, callback);
    }),

    stop: function stop() {
      value.stopAnimation();
    },

    reset: function reset() {
      value.resetAnimation();
    },

    _startNativeLoop: function _startNativeLoop(iterations) {
      var singleConfig = Object.assign({}, config, { iterations: iterations });
      start(value, singleConfig);
    },

    _isUsingNativeDriver: function _isUsingNativeDriver() {
      return config.useNativeDriver || false;
    }
  };
};

var decay = function decay(value, config) {
  var start = function start(animatedValue, configuration, callback) {
    callback = _combineCallbacks(callback, configuration);
    var singleValue = animatedValue;
    var singleConfig = configuration;
    singleValue.stopTracking();
    singleValue.animate(new DecayAnimation(singleConfig), callback);
  };

  return maybeVectorAnim(value, config, decay) || {
    start: function (_start3) {
      function start(_x3) {
        return _start3.apply(this, arguments);
      }

      start.toString = function () {
        return _start3.toString();
      };

      return start;
    }(function (callback) {
      start(value, config, callback);
    }),

    stop: function stop() {
      value.stopAnimation();
    },

    reset: function reset() {
      value.resetAnimation();
    },

    _startNativeLoop: function _startNativeLoop(iterations) {
      var singleConfig = Object.assign({}, config, { iterations: iterations });
      start(value, singleConfig);
    },

    _isUsingNativeDriver: function _isUsingNativeDriver() {
      return config.useNativeDriver || false;
    }
  };
};

var sequence = function sequence(animations) {
  var current = 0;
  return {
    start: function start(callback) {
      var onComplete = function onComplete(result) {
        if (!result.finished) {
          callback && callback(result);
          return;
        }

        current++;

        if (current === animations.length) {
          callback && callback(result);
          return;
        }

        animations[current].start(onComplete);
      };

      if (animations.length === 0) {
        callback && callback({ finished: true });
      } else {
        animations[current].start(onComplete);
      }
    },

    stop: function stop() {
      if (current < animations.length) {
        animations[current].stop();
      }
    },

    reset: function reset() {
      animations.forEach(function (animation, idx) {
        if (idx <= current) {
          animation.reset();
        }
      });
      current = 0;
    },

    _startNativeLoop: function _startNativeLoop() {
      throw new Error('Loops run using the native driver cannot contain Animated.sequence animations');
    },

    _isUsingNativeDriver: function _isUsingNativeDriver() {
      return false;
    }
  };
};

var parallel = function parallel(animations, config) {
  var doneCount = 0;
  // Make sure we only call stop() at most once for each animation
  var hasEnded = {};
  var stopTogether = !(config && config.stopTogether === false);

  var result = {
    start: function start(callback) {
      if (doneCount === animations.length) {
        callback && callback({ finished: true });
        return;
      }

      animations.forEach(function (animation, idx) {
        var cb = function cb(endResult) {
          hasEnded[idx] = true;
          doneCount++;
          if (doneCount === animations.length) {
            doneCount = 0;
            callback && callback(endResult);
            return;
          }

          if (!endResult.finished && stopTogether) {
            result.stop();
          }
        };

        if (!animation) {
          cb({ finished: true });
        } else {
          animation.start(cb);
        }
      });
    },

    stop: function stop() {
      animations.forEach(function (animation, idx) {
        !hasEnded[idx] && animation.stop();
        hasEnded[idx] = true;
      });
    },

    reset: function reset() {
      animations.forEach(function (animation, idx) {
        animation.reset();
        hasEnded[idx] = false;
        doneCount = 0;
      });
    },

    _startNativeLoop: function _startNativeLoop() {
      throw new Error('Loops run using the native driver cannot contain Animated.parallel animations');
    },

    _isUsingNativeDriver: function _isUsingNativeDriver() {
      return false;
    }
  };

  return result;
};

var delay = function delay(time) {
  // Would be nice to make a specialized implementation
  return timing(new AnimatedValue(0), { toValue: 0, delay: time, duration: 0 });
};

var stagger = function stagger(time, animations) {
  return parallel(animations.map(function (animation, i) {
    return sequence([delay(time * i), animation]);
  }));
};

var loop = function loop(animation) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$iterations = _ref.iterations,
      iterations = _ref$iterations === undefined ? -1 : _ref$iterations;

  var isFinished = false;
  var iterationsSoFar = 0;
  return {
    start: function start(callback) {
      var restart = function restart() {
        var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { finished: true };

        if (isFinished || iterationsSoFar === iterations || result.finished === false) {
          callback && callback(result);
        } else {
          iterationsSoFar++;
          animation.reset();
          animation.start(restart);
        }
      };
      if (!animation || iterations === 0) {
        callback && callback({ finished: true });
      } else {
        if (animation._isUsingNativeDriver()) {
          animation._startNativeLoop(iterations);
        } else {
          restart(); // Start looping recursively on the js thread
        }
      }
    },

    stop: function stop() {
      isFinished = true;
      animation.stop();
    },

    reset: function reset() {
      iterationsSoFar = 0;
      isFinished = false;
      animation.reset();
    },

    _startNativeLoop: function _startNativeLoop() {
      throw new Error('Loops run using the native driver cannot contain Animated.loop animations');
    },

    _isUsingNativeDriver: function _isUsingNativeDriver() {
      return animation._isUsingNativeDriver();
    }
  };
};

function forkEvent(event, listener) {
  if (!event) {
    return listener;
  } else if (event instanceof AnimatedEvent) {
    event.__addListener(listener);
    return event;
  } else {
    return function () {
      typeof event === 'function' && event.apply(undefined, arguments);
      listener.apply(undefined, arguments);
    };
  }
}

function unforkEvent(event, listener) {
  if (event && event instanceof AnimatedEvent) {
    event.__removeListener(listener);
  }
}

var event = function event(argMapping, config) {
  var animatedEvent = new AnimatedEvent(argMapping, config);
  if (animatedEvent.__isNative) {
    return animatedEvent;
  } else {
    return animatedEvent.__getHandler();
  }
};

/**
 * The `Animated` library is designed to make animations fluid, powerful, and
 * easy to build and maintain. `Animated` focuses on declarative relationships
 * between inputs and outputs, with configurable transforms in between, and
 * simple `start`/`stop` methods to control time-based animation execution.
 *
 * See http://facebook.github.io/react-native/docs/animated.html
 */
module.exports = {
  /**
   * Standard value class for driving animations.  Typically initialized with
   * `new Animated.Value(0);`
   *
   * See http://facebook.github.io/react-native/docs/animated.html#value
   */
  Value: AnimatedValue,
  /**
   * 2D value class for driving 2D animations, such as pan gestures.
   *
   * See https://facebook.github.io/react-native/releases/next/docs/animatedvaluexy.html
   */
  ValueXY: AnimatedValueXY,
  /**
   * Exported to use the Interpolation type in flow.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#interpolation
   */
  Interpolation: AnimatedInterpolation,
  /**
   * Exported for ease of type checking. All animated values derive from this
   * class.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#node
   */
  Node: AnimatedNode,

  /**
   * Animates a value from an initial velocity to zero based on a decay
   * coefficient.
   *
   * See http://facebook.github.io/react-native/docs/animated.html#decay
   */
  decay: decay,
  /**
   * Animates a value along a timed easing curve. The Easing module has tons of
   * predefined curves, or you can use your own function.
   *
   * See http://facebook.github.io/react-native/docs/animated.html#timing
   */
  timing: timing,
  /**
   * Animates a value according to an analytical spring model based on
   * damped harmonic oscillation.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#spring
   */
  spring: spring,

  /**
   * Creates a new Animated value composed from two Animated values added
   * together.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#add
   */
  add: add,

  /**
   * Creates a new Animated value composed by dividing the first Animated value
   * by the second Animated value.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#divide
   */
  divide: divide,

  /**
   * Creates a new Animated value composed from two Animated values multiplied
   * together.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#multiply
   */
  multiply: multiply,

  /**
   * Creates a new Animated value that is the (non-negative) modulo of the
   * provided Animated value.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#modulo
   */
  modulo: modulo,

  /**
   * Create a new Animated value that is limited between 2 values. It uses the
   * difference between the last value so even if the value is far from the
   * bounds it will start changing when the value starts getting closer again.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#diffclamp
   */
  diffClamp: diffClamp,

  /**
   * Starts an animation after the given delay.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#delay
   */
  delay: delay,
  /**
   * Starts an array of animations in order, waiting for each to complete
   * before starting the next. If the current running animation is stopped, no
   * following animations will be started.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#sequence
   */
  sequence: sequence,
  /**
   * Starts an array of animations all at the same time. By default, if one
   * of the animations is stopped, they will all be stopped. You can override
   * this with the `stopTogether` flag.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#parallel
   */
  parallel: parallel,
  /**
   * Array of animations may run in parallel (overlap), but are started in
   * sequence with successive delays.  Nice for doing trailing effects.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#stagger
   */
  stagger: stagger,
  /**
   * Loops a given animation continuously, so that each time it reaches the
   * end, it resets and begins again from the start.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#loop
  */
  loop: loop,

  /**
   * Takes an array of mappings and extracts values from each arg accordingly,
   * then calls `setValue` on the mapped outputs.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#event
   */
  event: event,

  /**
   * Make any React component Animatable.  Used to create `Animated.View`, etc.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#createanimatedcomponent
   */
  createAnimatedComponent: createAnimatedComponent,

  /**
   * Imperative API to attach an animated value to an event on a view. Prefer 
   * using `Animated.event` with `useNativeDrive: true` if possible.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#attachnativeevent
   */
  attachNativeEvent: attachNativeEvent,

  /**
   * Advanced imperative API for snooping on animated events that are passed in
   * through props. Use values directly where possible.
   * 
   * See http://facebook.github.io/react-native/docs/animated.html#forkevent
   */
  forkEvent: forkEvent,
  unforkEvent: unforkEvent,

  __PropsOnlyForTests: AnimatedProps
};