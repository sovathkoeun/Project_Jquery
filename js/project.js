$(document).ready(function () {
    var url = "https://raw.githubusercontent.com/ronanogor/jquery-project/master/database-v1.json";
    $.getJSON(
      url,
      function(data) {
        var result = "";
        data.recipes.forEach(item => {
          console.log(item);
          result+=`
            <td class="text-center">${item.name}</td>
            <img src="${item.iconUrl} class="img-fluid">
            ${item.recipes}
          `; 
        });
        $('#result').append(result);
      }
    );
  });