(function($) {
  var charLimit = {
    name: "charLimit",
    limit: 0,
    $counter: null,
    counter_regex: /-?\d+/,
    prevent_exceeding: false,
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
    checkLimit: function(e) {
      var count = this.limit - this.$el.val().length,
          limit_exceeded = this.$el.val().length > this.limit;
      if (this.prevent_exceeding && limit_exceeded) {
        this.concatValue();
      }
      this.$counter.text(this.$counter.text().replace(this.counter_regex, count))
        .toggleClass(this.classes.exceeded, limit_exceeded)
        .toggleClass(this.classes.warning, this.limit - this.$el.val().length < this.warning_threshold && !!count);
    },
    concatValue: function() {
      this.$el.val(this.$el.val().substring(0, this.limit));
    },
    setOptions: function() {
      if (!this.$counter) { this.$counter = this.getCounter(); }
      if (!this.limit) { this.limit = this.getLimit(); }
      if (!this.warning_threshold) { this.warning_threshold = this.getThreshold(); }
    },
    init: function() {
      this.$el.on("change keyup", $.proxy(this.checkLimit, this));
      this.setOptions();
    }
  };

  var internals = {
    createPlugin: function(plugin) {
      $.fn[plugin.name] = function(opts) {
        var $els = this,
            method = $.isPlainObject(opts) || !opts ? "" : opts;
        if (method && plugin[method]) {
          plugin[method].apply($els, Array.prototype.slice.call(arguments, 1));
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
})(jQuery);
