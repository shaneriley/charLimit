/* jQuery character limit plugin
   Name: charLimit
   Version: 1.0.1
   Description: https://github.com/shaneriley/charLimit
   Usage: http://shaneriley.com/jquery/char_limit
*/
(function(factory) {
  typeof define === "function" && define.amd ? define(["jquery"], factory) : factory(jQuery);
})(function($) {
  var charLimit = {
    name: "charLimit",
    limit: 0,
    $counter: null,
    counter_regex: /-?\d+/,
    warning_threshold: 0,
    classes: {
      exceeded: "exceeded_limit",
      warning: "warning_limit"
    },
    getLimit: function() {
      return this.$el.attr("data-limit") || this.limit;
    },
    getCounter: function() {
      return this.$el.closest("dl").find("mark");
    },
    getThreshold: function() {
      return this.$el.attr("data-threshold") || 0;
    },
    counterFormat: function(count) {
      return this.$counter.text().replace(this.counter_regex, count);
    },
    checkLimit: function(e) {
      var count = this.limit - this.$el.val().length,
          limit_exceeded = this.$el.val().length > this.limit;
      this.$counter.text(this.counterFormat(count))
        .toggleClass(this.classes.exceeded, limit_exceeded)
        .toggleClass(this.classes.warning, this.limit - this.$el.val().length < this.warning_threshold && !!count);
    },
    setOptions: function() {
      if (!this.$counter) { this.$counter = this.getCounter(); }
      if (!this.limit) { this.limit = this.getLimit(); }
      if (!this.warning_threshold) { this.warning_threshold = this.getThreshold(); }
    },
    init: function() {
      this.$el.on("change keyup", $.proxy(this.checkLimit, this));
      this.setOptions();
      this.checkLimit();
    }
  };

  var internals = {
    createPlugin: function(plugin) {
      $.fn[plugin.name] = function(opts) {
        var $els = this,
            args = arguments,
            method = $.isPlainObject(opts) || !opts ? "" : opts;
        if (method && plugin[method]) {
          $els.each(function(i) {
            plugin[method].apply($els.eq(i).data(plugin.name), Array.prototype.slice.call(arguments, 1));
          });
        }
        else if (!method) {
          $els.each(function(i) {
            var plugin_instance = $.extend(true, {
              $el: $els.eq(i)
            }, plugin, opts);
            $els.eq(i).data(plugin.name, plugin_instance);
            plugin_instance.init();
          });
        }
        else {
          $.error('Method ' +  method + ' does not exist on jQuery.' + plugin.name);
        }
        return $els;
      };
    }
  };

  internals.createPlugin(charLimit);
});
