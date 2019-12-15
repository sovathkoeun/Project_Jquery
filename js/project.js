
$(document).ready(function () {
  //hide input calulate
  $('#hide').hide();
  //hide modal line
  $('#modalhide').hide();
  //requerst name of element from api
  requerstApi();
  var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
  $('#choose').on('change', function () {
      //show input calulate
      $('#hide').show();
      // show Modal line
      $('#modalhide').show();
      //Instructions
      $('#Instructions').html('Instructions');
      //Ingredients 
      $('#Ingredients').html('Ingredients');
      $.ajax({
          dataType: 'json',
          url: url,
          success: function (data) {
              var result = "";
              var output = "";

              data.recipes.forEach(ele => {
                  var getData = $('#choose').val();
                  if (getData == ele.id) {
                      getStep(ele.instructions);
                      result += `
                  <div class="row">
                      <div class="col-2"></div>
                      <div class="col-4">
                          <h1>${ele.name}</h1>
                      </div>
                      <div class="col-3">
                          <img src="${ele.iconUrl}" 
                          class="img-fluid" style="width: 200px; height: 150px; border-radius: 20px;"/>
                      </div>
                      <div class="col-3"></div>
                  </div>
                  `;
                      // get data from on ele and use forEach under
                      ele.ingredients.forEach(item => {
                          output += `
                    <tr>
                      <td><img src="${item.iconUrl}" width="60"></td>
                      <td>${item.quantity}</td>
                      <td>${(item.unit[0]).toLowerCase()}</td>
                      <td>${item.name}</td>
                    </tr>
                    `;
                      });//foreach from loop for ingredients
                      $('#output').html(output);
                      //Instructions          
                  };
              });
              $('#result').html(result);
          }
      });
  });
});
//get url
function getUrl() {
  var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
  return url;
}
//requerst api
function requerstApi() {
  $.ajax({
      dataType: 'json',
      url: getUrl(),
      success: (data) => chooseRecipe(data.recipes),
      error: () => console.log('error'),
  })
}
// get data for list choose option
function chooseRecipe(recipe) {
  var option = "";
  recipe.forEach(item => {
      option += `
          <option value="${item.id}">${item.name}</option>
      `;
  });
  $('#choose').append(option);
}

// get data from step
function getStep(item) {
  var instruction = "";
  var step = item.split("<step>");
  for (let i = 1; i < step.length; i++) {
      instruction += `
          <h5 class="text-primary">step${i}:</h5>
           ${step[i]}
      `;
  }
  $('#step').html(instruction);
}
//============== calutate number =======================//
$('#up').on('click', function () {
  var getInput = $('#getInput').val();
  userUp(getInput);
});

$('#donw').on('click', function () {
  var getInput = $('#getInput').val();
  userDonw(getInput);
});
function userUp(up) {
  var getVarlueUp = parseInt(up) + 1;
  if (getVarlueUp <= 15) {
      $('#getInput').val(getVarlueUp);
      multiple(getVarlueUp);

  }
}
function userDonw(donw) {
  var getVarlueDonw = parseInt(donw) - 1;
  if (getVarlueDonw >= 0) {
      $('#getInput').val(getVarlueDonw);
      multiple(getVarlueDonw);

  }
}
function multiple(calculate) {
  var muls = calculate * 2;
  output(muls);
}
function output(out) {
  $('#result').html(out);
}