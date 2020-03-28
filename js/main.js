$(document).ready(function() {
  var itemList = [];
  console.log("ready!");

  // adding event listeners
  $("#newItemButton").click(() => {
    var newContnet = `
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Item" />
            <div class="input-group-append">
                <span class="input-group-text" style="cursor:pointer;">remove</span>
            </div>
        </div>`;
    $("#prioritiesList").append(newContnet);
    console.log("button press");
  });

  $(document).on("click", ".input-group-append", event => {
    console.log("remove pressed", event.target);
    $(event.target)
      .parent()
      .parent()
      .remove();
  });

  $(document).on("keypress", ".form-control", function(e) {
    if (e.which == 13) {
      $("#newItemButton").click();
      $("input:text:visible:last").focus();
    }
  });

  $(document).on("click", "#doneButton", () => {
    console.log("done");
    $(
      "#prioritiesList, #newItemButton, #doneButton, #instructionParagraph"
    ).toggle("slide", { direction: "left" }, 500);
    $("#previousButton, #listComparison")
      .toggleClass("d-none")
      .hide()
      .delay(500)
      .fadeIn(500);

    itemList = [];
    $("input:text").each(function() {
      itemList.push($(this).val());
      console.log($(this).val());
    });
    console.log(itemList);
  });

  $(document).on("click", "#previousButton", () => {
    $("#doneButton").click();
  });

  $('[data-toggle="tooltip"]').tooltip();
});
