// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {

  var us = [ "AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MP","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UM","UT","VA","VI","VT","WA","WI","WV","WY"],
      ca = ["AB","BC","MB","NB","NL","NS","NT","NU","ON","PE","QC","SK","YT"],
      sop = $('#states_or_provinces');


  function options(country) {
    var select = document.createElement('select');
    select.id = 'order_state';
    select.name = "order[state]";

    for (var i = 0; i< country.length; i++){
        var opt = document.createElement('option');
        opt.value = country[i];
        opt.innerHTML = country[i];
        select.appendChild(opt);
    }
    sop.append(select);
  }

  $("#order_country").on("change", function() {
    sop.find('select').remove();
    if (this.value === 'CA') {
      options(ca);
    }
    else {
       options(us);
    }
  });


$("#order_shipping_cost").on("change", function() {

    var cost = $("#cost"),
        shipping_row = $(".shipping_row");

    $.ajax({
      url: $(this).parents('form').attr("action"),
      type: 'PATCH',
      dataType: 'json',
      data: {order: {shipping_cost: $(":selected").val() }},
      success: function(data, textStatus, xhr) {
        cost.remove();

        var formatted_num = parseFloat(data.shipping_cost).toFixed(2),
            shipping_cost = "<td id='cost'>$"+ formatted_num + "</td>",
            value = $("#subtotal").html().split("$")[1],
            total = parseFloat(value)+ parseFloat(data.shipping_cost);

        shipping_row.append(shipping_cost);
        $("#total").html("$"+total.toFixed(2));
      },
      error: function(xhr, textStatus, errorThrown) {
        alert("There was a problem");
      }
    });
    return false;
  });
});
