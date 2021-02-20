var resourseURL = new URL(document.location.href);
var resourseParam = resourseURL.searchParams.get("resUUID") || 1; 
let restaurantURL = new URL('https://nmn9ans4ca.execute-api.us-east-1.amazonaws.com/Prod/?resUUID=' + resourseParam);

fetch( restaurantURL )
  .then(function(response) {
    return response.json();
  }).then(function(obj){

    var resName = obj.name;
    console.log(resName);


  }).catch(function(error) {
    console.error('Something went wrong' + error)
  })