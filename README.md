# jQuery Character Limit Plugin

## Usage

Call on a form control using `$("textarea").charLimit()`. By default, the plugin looks for a data attribute for the limit on the form control using the attribute selector `data-limit`. An optional `data-threshold` tells the plugin when to start adding a warning_limit class to the counter element. Once the limit has been exceeded, an exceeded_limit class will be added to the counter element.

The plugin also expects the markup structure to follow a dl-style form markup system, ie:

```html
<dl>
  <dt>
    <label>Message</label>
    <mark>140 characters remaining</mark>
  </dt>
  <dd>
    <textarea rows="5" cols="60" data-limit="140" data-threshold="30"></textarea>
  </dd>
</dl>
```

Where the mark element is the element used to display the number of characters remaining. To use a different element, pass in a custom method for getCounter that returns the jQuery object representing the element whose text node you wish to display the characters remaining in. Example:

```javascript
$("textarea").charLimit({
  getCounter: function() { return this.$el.next("p"); }
});
```

The default means of updating the text node of the character remaining element is to search for the first instance of digits and replace it with the character remaining count. To format differently, use the counterFormat method, which receives a count argument.

```javascript
$("textarea").charLimit({
  counterFormat: function(count) {
    return this.$counter.text().replace(/(, )-?\d+/, function($1, $2) {
      return $2 + count;
    });
  }
});
```

All methods receive the plugin instance object as its context. For convenience, $el and $counter are jQuery objects representing the original element and the counter element.

To set the limit and warning threshold during initialization, pass them on as options.

```javascript
$("textarea").charLimit({
  limit: 30,
  warning_threshold: 10
});
```

If you'd like to use different class names for the warning and/or exceeded classes, pass them in on a classes object.

```javascript
$("textarea").charLimit({
  classes: {
    exceeded: "exceeded_limit",
    warning: "warning_limit"
  }
});
```

You can also call any of the plugin's methods individually from the element itself once it's been initialized. Simply pass in the name of the method as a string. To see all methods available, you can inspect the object stored using jQuery's .data() method using the key "charLimit".

```javascript
$("textarea").charLimit().value("My character limit's not updated!");
// These two lines are functionally identical.
$("textarea").charLimit("checkLimit");
$("textarea").data("charLimit").checkLimit();
```

Using this data object, you can also change any of the plugin's options per-element by modifying the properties and methods of the object stored in data.

```javascript
// Change character limit to 300. Don't forget to call the checkLimit method to display the new
// characters remaining.
$("textarea").data("charLimit").limit = 300;
$("textarea").charLimit("checkLimit");
```
