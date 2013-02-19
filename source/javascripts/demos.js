$(function() {
  $("#default").charLimit();

  $("#limit").charLimit({
    limit: +$("#limit").closest("dl").find("mark").text().replace(/\D/g, "")
  });

  $("#enforced").charLimit({
    limit: 30,
    warning_threshold: 10
  });

  $("#get_counter").charLimit({
    getCounter: function() { return this.$el.next("p"); },
    counterFormat: function(count) {
      return this.$counter.text().replace(/(, )-?\d+/, function($1, $2) {
        return $2 + count;
      });
    }
  });
});
