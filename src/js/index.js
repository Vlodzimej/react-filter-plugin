
import domReady from '../utils/domReady';

import {
  createStore,
  applyMiddleware
} from 'redux';
import createLogger from 'redux-logger';

import {
  RootReducer
} from './reducers/Root';
import Filter from './components/Filter';

const createStoreWithMiddleware = applyMiddleware(createLogger())(createStore);
const store = createStoreWithMiddleware(RootReducer);

(function ($, window, document, undefined) {
  'use strict';
  var __slice = [].slice;
  var pluginName = 'itemsViewerFilter',
    defaults = {};


  function ItemsViewerFilter(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  ItemsViewerFilter.prototype = {
    init: function () {
		var that = this;
      console.log('ItemsViewerFilter init', this.element.className, store);
      domReady(() => {
        new Filter(`.${this.element.className}`, that.options, store);
      });
    },
  };

  $.fn[pluginName] = function (options) {
    $.fn[pluginName].getters = ['layout'];
    var args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (options === undefined || typeof options === 'object') {
      return this.each(function () {
        if (!$.data(this, 'plugin-' + pluginName)) {
          $.data(
            this,
            'plugin-' + pluginName,
            new ItemsViewerFilter(this, options)
          );
        }
      });
    } else if (
      typeof options === 'string' &&
      options[0] !== '_' &&
      options !== 'init'
    ) {
      if (
        Array.prototype.slice.call(arguments, 1).length === 0 &&
        $.inArray(options, $.fn[pluginName].getters) !== -1
      ) {
        var instance = $.data(this[0], 'plugin-' + pluginName);
        if (
          instance instanceof ItemsViewerFilter &&
          typeof instance[options] === 'function'
        ) {
          return instance[options].apply(instance, args);
        }
      } else {
        return this.each(function () {
          var instance = $.data(this, 'plugin-' + pluginName);
          if (
            instance instanceof ItemsViewerFilter &&
            typeof instance[options] === 'function'
          ) {
            instance[options].apply(instance, args);
          }
        });
      }
    }
  };
})(jQuery, window, document);
