$(function() {
  $("#default").charLimit();

  $("#limit").charLimit({
    limit: +$("#limit").closest("dl").find("mark").text().replace(/\D/g, "")
  });
});
