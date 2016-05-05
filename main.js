var baseUrl = "http://localhost:3004"

$(document).ready(function() {
  $.ajax({
    method: "GET",
    url: baseUrl + "/products.json",
    success: function(data)
    {
      //console.log(data);

      var products = data;

      var template = $('#products-summary').html();
      Mustache.parse(template);

      for (var i=0; i<products.length; i++)
      {
        var rendered = Mustache.render(template, products[i]);
        $("#products").append(rendered);
      }
    },
    error: function() {
      alert("Problem loading products. Please retry");
    }
  });

  $("#products").on("click", "h2 a", function(){
    $.ajax({
      method: "GET",
      url: baseUrl + "/products/" + $(this).data("id") + ".json",
      success: function(product) {
        var template = $('#product-details').html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, product);
        $("#single-product").html(rendered);
        $("#products").fadeOut(500, function(){
          $("#single-product").fadeIn(500);
        });
      },
      error: function(){
        alert("Error loading product.  Please try again");
      }
    });
  });

  $("#single-product").on("click", "#back", function() {
    $("#single-product").fadeOut(500, function() {
        $("#products").fadeIn(500);
    });

  });




});
