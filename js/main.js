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
    progress_div = 100/total_questions;
    $("#progressbar").css("width", "1%");

    $("#priorityElement1").text(Object.keys(itemObject)[i]);
    $("#priorityElement2").text(Object.keys(itemObject)[j]);
  }

  $("#listComparison").on(
    "click",
    "#priorityElement1, #priorityElement2",
    function() {
      // increment key of object
      itemObject[$(this).text()] = itemObject[$(this).text()] + 1;

      $("#progressbar").css("width", `${current_percent+progress_div}%`)
      current_percent += progress_div;


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

      console.log(itemObject);
    }
  );

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
    var $input_container = $(e.target)
      .parent()
      .parent();
    $input_container.slideUp("slow", () => {
      $input_container.remove();
    });
  });

  // Moving webapp to stage 2 - removing input fields, buttons and storing items in objects
  $("#doneButton").on("click", () => {
    console.log("done");

    // initialising zeros for array
    itemObject = {};
    $("input:text").each(function() {
      itemObject[$(this).val()] = 0;
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
