$(document).ready(function() {
  var itemObject = {};
  var i = 0;
  var j = 1;
  var itemLength;
  //   console.log("ready!");

  // function to populate selections
  function isVisible() {
    console.log("stage 2 visible");
    console.log(itemObject);

    i = 0;
    j = 1;

    $("#priorityElement1").text(Object.keys(itemObject)[i]);
    $("#priorityElement2").text(Object.keys(itemObject)[j]);
  }

  $(document).on("click", "#priorityElement1, #priorityElement2", function() {
    // increment key of object
    itemObject[$(this).text()] = itemObject[$(this).text()] + 1;

    if (j < itemLength - 1) {
      j++;
      console.log(i, j);
      $("#priorityElement2").text(Object.keys(itemObject)[j]);
    } else if (i < itemLength - 2) {
      i++;
      j = i + 1;
      console.log(i, j);
      $("#priorityElement1").text(Object.keys(itemObject)[i]);
      $("#priorityElement2").text(Object.keys(itemObject)[j]);
    } else {
      console.log("done!");

      $("#listComparison").toggle();

      var sortedList = [];
      for (var el in itemObject) {
        sortedList.push([el, itemObject[el]]);
      }

      sortedList.sort(function(a, b) {
        return a[1] - b[1];
      });

      console.log(sortedList);

      $("#orderedListItems").empty();

      for (let i = sortedList.length - 1; i >= 0; i--) {
        var newContent =
          `<li class="list-group-item final-list">` +
          Object.keys(itemObject)[i] +
          `</li>`;
        $("#orderedListItems").append(newContent);
      }

      $("#orderedList").removeClass("d-none");
    }

    console.log(itemObject);
  });

  // Add new input element when clicking "new Item"
  $("#newItemButton *").click(() => {
    var newContent = `
		<div class="input-group mb-3">
			<input type="text" class="form-control" placeholder="Item" />
			<div class="input-group-append">
				<span class="input-group-text" style="cursor:pointer;">remove</span>
			</div>
		</div>`;
    $("#prioritiesList").append(newContent);
    console.log("button press");
  });

  // Calling new input item event listener when enter button is used
  $(document).on("keypress", ".form-control", function(e) {
    if (e.which == 13) {
      $("#newItemButton *").click();
      $("input:text:visible:last").focus();
    }
  });

  // Removing input element when remove button pressud
  $(document).on("click", ".input-group-append", event => {
    console.log("remove pressed", event.target);
    $(event.target)
      .parent()
      .parent()
      .remove();
  });

  // Moving webapp to stage 2 - removing input fields, buttons and storing items in objects
  $(document).on("click", "#doneButton *", () => {
    console.log("done");
    $(
      "#prioritiesList, #newItemButton, #doneButton, #instructionParagraph"
    ).toggle("slide", { direction: "left" }, 500);

    itemObject = [];
    $("input:text").each(function() {
      itemObject[$(this).val()] = 0;
      console.log($(this).val());
    });
    console.log(itemObject);

    $("#previousButton, #listComparison")
      .delay(500)
      .fadeIn(500);

    itemLength = Object.keys(itemObject).length;
    isVisible();
  });

  // enabling previous button
  $(document).on("click", "#previousButtonClick", () => {
    // $("#doneButton *").click();
    $("#previousButton, #listComparison").fadeOut(500);

    $("#prioritiesList, #newItemButton, #doneButton, #instructionParagraph")
      .delay(600)
      .toggle("slide", { direction: "left" }, 500);

    console.log("previous");
    $("#orderedList").addClass("d-none");
  });

  // enabling information tooltip
  $('[data-toggle="tooltip"]').tooltip();
});
