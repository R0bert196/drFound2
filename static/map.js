// let mode = document.getElementById("mode").value;
let directionsService = new google.maps.DirectionsService()
let directionsRenderer = new google.maps.DirectionsRenderer();
// var end = document.getElementById('end').value;
// var start = document.getElementById('start').value;
// new google.maps.places.Autocomplete(
//     document.getElementById("start"),
//     {
//         fields: ["formatted_address", "geometry", "name"],
//         strictBounds: false,
//         types: ["establishment"],
//     });
// new google.maps.places.Autocomplete(
//     document.getElementById("end"),
//     {
//         fields: ["formatted_address", "geometry", "name"],
//         strictBounds: false,
//         types: ["address"],
//     });
function initMap() {


    var mapOptions = {
        zoom:15,
        center: {lat:44.439211,lng:26.112343},
        scrollwheel: true
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));
    directionsRenderer.setOptions({draggable:true})
    directionsRenderer.addListener("directions_changed", () => {
        const directions = directionsRenderer.getDirections();

        if (directions) {
            computeTotalDistance(directions);
        }
    });
    // displayRoute(
    //     "Perth, WA",
    //     "Sydney, NSW",
    //     directionsService,
    //     directionsRenderer
    // );



}
// const modeForm = document.getElementById("mode").children;
// for(elem of modeForm){
//     console.log(elem.value);
// }

function displayRoute(origin, destination, service, display) {
    if(origin && destination){
        service
            .route({
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode[mode],
                avoidTolls: true,
            })
            .then((result) => {
                display.setDirections(result);
            })
            .catch((e) => {
                alert("Could not display directions due to: " + e);
            });
    }

}
// function calcRoute() {
//
//
//     var start = document.getElementById('start').value;
//     var end = document.getElementById('end').value;
//     var request = {
//         origin:start,
//         destination:end,
//         travelMode: google.maps.TravelMode[mode],
//     };
//     directionsService.route(request, function(response, status) {
//         var routes = response.routes;
//         console.log(routes)
//         if (status == 'OK') {
//             directionsRenderer.setDirections(response);
//         }
//     });
// }
function computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];

    if (!myroute) {
        return;
    }

    for (let i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }

    total = total / 1000;
    document.getElementById("total").innerHTML = total + " km";
}
initMap()
// https://developers.google.com/maps/documentation/javascript/overview#maps_map_simple-css
