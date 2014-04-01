if (typeof define !== 'function') {
  /* jshint latedef:false */
  var define = require('amdefine')(module);
}

define(['lodash'], function (_) {
  'use strict';

  var self = {

    ////////////////////////////////////////////////////////////////////////////////
    // Constructors

    range: function (from, to) {
      return {
        get: function (ar) { return ar.slice(from, to); },
        set: function (val, ar) { return ar.slice(0, from) + val + ar.slice(to); }
      };
    },

    at: function (i) { return self.range(i, i); },

    property: function (name) {
      return {
        get: function (obj) { return obj[name]; },
        set: function (val, obj) {
          var r = _.clone(obj);
          r[name] = val;
          return r;
        }
      };
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Operations

  };
  return self;
});
