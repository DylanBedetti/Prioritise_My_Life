$(document).ready(function() {
  var itemObject = {};
  var i = 0;
  var j = 1;
  var itemLength;
  var total_questions;
  var progress_div;
  var current_percent;
  //   console.log("ready!");
  function sumAll(n) {
    total = 0;
    for (i = n - 1; i > 0; i--) {
      total = total + i;
    }
    return total;
  }

  // function to populate selections
  function isVisible() {
    i = 0;
    j = 1;
    current_percent = 0;

    // console.log(itemObject);
    total_questions = sumAll(itemLength);
    progress_div = 100 / total_questions;
    $("#progressbar").css("width", "1%");

    $("#priorityElement1").text(Object.keys(itemObject)[i]);
    $("#priorityElement2").text(Object.keys(itemObject)[j]);
  }

  $(".multi-button-prefernce").on("click", e => {
    console.log($(e.target).attr("id"));
    $btn_id = $(e.target).attr("id");

    switch ($btn_id) {
      case "btn_1":
        itemObject[$("#priorityElement1").text()] =
          itemObject[$("#priorityElement1").text()] + 4;
        break;
      case "btn_2":
        itemObject[$("#priorityElement1").text()] =
          itemObject[$("#priorityElement1").text()] + 1;
        break;
      case "btn_3":
        itemObject[$("#priorityElement2").text()] =
          itemObject[$("#priorityElement2").text()] + 1;
        break;
      case "btn_4":
        itemObject[$("#priorityElement2").text()] =
          itemObject[$("#priorityElement2").text()] + 4;
        break;
    }

    console.log(itemObject);

    // update progress bar
    $("#progressbar").css("width", `${current_percent + progress_div}%`);
    current_percent += progress_div;

    // looping through list
    if (j < itemLength - 1) {
      // first limit
      j++;
      $("#priorityElement2").text(Object.keys(itemObject)[j]);
    } else if (i < itemLength - 2) {
      // second element
      i++;
      j = i + 1;
      $("#priorityElement1").text(Object.keys(itemObject)[i]);
      $("#priorityElement2").text(Object.keys(itemObject)[j]);
    } else {
      // done
      $("#listComparison").hide();

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
          sortedList[i][0] +
          `</li>`;
        $("#orderedListItems").append(newContent);
      }

      $("#orderedList").show();
    }
  });

  // Add new input element when clicking "new Item"
  $("#newItemButton").on("click", () => {
    var $newContent = $("#prioritiesList")
      .children(":last")
      .clone();
    $newContent.find("input").val("");
    $("#prioritiesList").append($newContent);

    $("#prioritiesList")
      .children(":last")
      .find("input")
      .select();
    console.log("button press");
  });

  // remove button - used document because global?
  $("#prioritiesList").on("mouseover", ".remove_btn", e => {
    $(e.target).css("background-color", "#db9ca0");
  });

  $("#prioritiesList").on("mouseout", ".remove_btn", e => {
    $(e.target).css("background-color", "#e9ecef");
  });

  // Calling new input item event listener when enter button is used
  $("#prioritiesList").on("keypress", ".form-control", function(e) {
    if (e.which == 13) {
      $("#newItemButton").click();
      $("input:text:visible:last").focus();
    }
  });

  // Removing input element when remove button pressud
  $("#prioritiesList").on("click", ".remove_btn", e => {
    if ($("#prioritiesList input").length <= 1) {
      $("#prioritiesList input")
        .parent()
        .fadeOut(100)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
      $("#prioritiesList div span").css("background-color", "#e9ecef");
      return false;
    }

    var $input_container = $(e.target)
      .parent()
      .parent();
    $input_container.slideUp("slow", () => {
      $input_container.remove();
    });
  });

  // alert exist button
  $("#alert_div").on("click", "button", e => {
    $(e.target)
      .parent()
      .parent()
      .fadeOut();
  });
  // Moving webapp to stage 2 - removing input fields, buttons and storing items in objects
  $("#doneButton").on("click", () => {
    console.log("done");

    if ($("input:text").length < 2) {
      console.log("fuck");
      $("#alert_div").fadeIn();
      $("#alert_div")
        .delay(5000)
        .fadeOut();
      return false;
    }

    // initialising zeros for array
    itemObject = {};
    $("input:text").each(function() {
      if ($(this).val() != ""){
        itemObject[$(this).val()] = 0;
      }
    });

    itemLength = Object.keys(itemObject).length;

    isVisible();

    console.log(itemObject);

    $("#page_1").toggle("slide", { direction: "left" }, 500);

    $("#page_2")
      .delay(500)
      .fadeIn(500);

    $("#listComparison").show();
  });

  // enabling previous button
  $("#previousButton").on("click", () => {
    $("#page_2").fadeOut(500);

    $("#page_1")
      .delay(600)
      .toggle("slide", { direction: "left" }, 500);

    $("#orderedList").hide();
  });

  // enabling information tooltip
  $('[data-toggle="tooltip"]').tooltip();
  // $('.progress .progress-bar').progressbar();
});
