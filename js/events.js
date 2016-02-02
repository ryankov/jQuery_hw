
var GlobalEventHandler = (function(){

    $( "ul" ).on( "click", "#modal-triger", function( event ) {

        $('#inputModal').modal('show');
        $( ".btn-primary" ).one( "click", function() {

            Aplication.saveCar();
            $('#car-register').trigger('reset');
            $('#inputModal').modal('hide');

            Aplication.renderCars();
        });
    });
    Aplication.renderCars();

    return {
        applyEventLisener:function(){

            $( "table" ).on( "click", ".btn-danger", function( event ) {

                var target_id = this.getAttribute('data');
                var cars = JSON.parse(localStorage.cars);
                var newCarList = [];

                cars.forEach(function(car){
                    if (car.id != target_id){
                        console.log(car,'pased')
                        newCarList.push(car);
                    }
                });
                console.log(cars,'old cars');
                cars = newCarList;
                console.log(cars,'new cars');

                localStorage.cars = JSON.stringify(cars);
                Aplication.renderCars();

            });
            $( "table" ).on( "click", ".btn-primary", function(e) {


                var target_id = this.getAttribute('data');

                console.log(this.closest("tr"));


                var cars = JSON.parse(localStorage.cars);
                cars.forEach(function(car){
                    if(car.id ==target_id){

                        $('#inputModal').modal('show');
                        $('#car-maker').val(car.make);
                        $('#car-model').val(car.model);
                        $('#car-year').val(car.year);
                        $('#car-odomer').val(car.odomer);

                    }
                });
                $( ".btn-primary" ).one( "click", function() {

                    for(var i = 0;i< cars.length;i++){
                        console.log(cars[i],target_id);
                        if(cars[i].id == target_id){

                            $('#inputModal').modal('show');
                            cars[i].make = $('#car-maker').val();
                            cars[i].model = $('#car-model').val();
                            cars[i].year = $('#car-year').val();
                            cars[i].odomer = $('#car-odomer').val();
                            console.log(cars[i]);
                            break;
                        }

                    }
                    localStorage.cars = JSON.stringify(cars);
                    $('#car-register').trigger('reset');
                    $('#inputModal').modal('hide');

                    Aplication.renderCars();
                });
               
            });



        }
    }

}());

