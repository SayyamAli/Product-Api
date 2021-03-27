$(function () {
    loadRecipe();
    $("#recipes").on("click", ".btn-danger", handleDelete);
    $("#recipes").on("click", ".btn-warning", handleUpdate);
    $("#addBtn").click(addRecipe);
    $("#updateSave").click(saveUpdate);
});

function loadRecipe() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        success: function (res) {
            var recipes = $("#recipes");
            recipes.empty();
            for (var i = 0; i < res.length; i++) {
                var rec = res[i];
                recipes.append(
                    `<div class="recipe bg-light p-2 m-3 shadow-lg p-3 mb-5 bg-white rounded" data-id="${rec._id}"><h3>${rec.title}</h3><p class="pr-3 pb-3"><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button><span class="mr-4">${rec.body}</span></p></div>`
                );
                // recipes.append("<div><h3>" + rec.title + "</h3></div>");
            }
        }

    });
}

function handleDelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    // console.log(id);
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "DELETE",
        success: function () {
            loadRecipe();
            $("#msg").html("Recipe Deleted");
            $("#alert").modal("show");
        }
    });
}

function addRecipe() {
    var title = $("#title").val();
    var body = $("#body").val();
    // console.log(title, body);
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "POST",
        data: { title, body },
        success: function (response) {
            console.log(response);
            $("#title").val("");
            $("#body").val("");
            loadRecipe();
            $("#addModal").modal("hide");
            $("#msg").html("Recipe Added");
            $("#alert").modal("show");

        }
    });

}

function saveUpdate() {
    var id = $("#updateId").val();
    var title = $("#updateTitle").val();
    var body = $("#updateBody").val();
    console.log(id, title, body);
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "PUT",
        data: { title, body },
        success: function (res) {
            // console.log(res);
            loadRecipe();
            $("#updateModal").modal("hide");
            $("#msg").html("Recipe Updated");
            $("#alert").modal("show");
        }
    });
}

function handleUpdate() {
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id, function (res) {
        $("#updateId").val(res._id);
        $("#updateTitle").val(res.title);
        $("#updateBody").val(res.body);
        $("#updateModal").modal("show");
    });
}