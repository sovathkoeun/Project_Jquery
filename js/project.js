$(document).ready(function () {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    // hide input calulate
    $('#hide').hide();
    // hide modal line
    $('#modalhide').hide();
    // requerst name of element from api
    requerstApi();
    $('#choose').on('change', function () {
        // show input calulate
        $('#hide').show();
        // show Modal line
        $('#modalhide').show();
        // Instructions
        $('#Instructions').html('Instructions');
        // Ingredients 
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
                        // request oldGuest
                        oldGuest = ele.nbGuests;
                        // get function getOldguest
                        getOldguest(ele.nbGuests);
                        // getstep from function under
                        getStep(ele.instructions);
                        // get  from function
                        eachQuanlitie = ele.ingredients;
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
                        // get data from on ele and use forEach on
                        ele.ingredients.forEach(item => {
                            output += `
                             <tr>
                                <td><img src="${item.iconUrl}" width="90" style="border-radius:5px"></td>
                                <td>${item.quantity}</td>
                                <td>${(item.unit[0])}</td>
                                <td>${item.name}</td>
                            </tr>
                             `;
                        });
                        $('#output').html(output);
                    };
                });
                // output image header
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
            <h4 class="text-primary">step${i}</h4>
             ${step[i]}
        `;
    }
    $('#step').html(instruction);
}

//============== calutate number =======================//

// function for click add caculator
$('#Adds').on('click', function () {
    var caculate = $('#caculate').val();
    Add(caculate);
});

// function for  click  Substract
$('#substract').on('click', function () {
    var caculate = $('#caculate').val();
    Subtract(caculate);
});

// function for caculator Add
function Add(Adds) {
    var getAdd = parseInt(Adds) + 1;
    if (getAdd <= 15) {
        $('#caculate').val(getAdd);
        getGuests(getAdd);
    }
}

// function for caculator substract
function Subtract(substract) {
    var getSubstract = parseInt(substract) - 1;
    if (getSubstract >= 1) {
        $('#caculate').val(getSubstract);
        getGuests(getSubstract);
    }
}

// calulate new quantity when user click 
// use oldGest 
var oldGuest;
// declear variable array
var eachQuanlitie = [];
function getGuests(newGuest) {
    var device;
    var nbQuanlity;
    var result = "";
    eachQuanlitie.forEach(element => {
        var { quantity, iconUrl, name, unit } = element;
        device = quantity / oldGuest;
        nbQuanlity = device * newGuest;
        result += `
        <tr>
            <td><img src="${iconUrl}" width="90"></td>
            <td id='quantity'>${nbQuanlity}</td>
            <td>${(unit[0])}</td>
            <td>${name}</td>
        </tr>
    `;
    });
    $("#output").html(result);
}

// desplay result
function getOldguest(oldGest) {
    $('#caculate').val(oldGest);
}