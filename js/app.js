
Aplication = (function(){


    var cars =[
        {"make":"Mercedes","model":"124","year":"1994","odomer":"460921","id":1},
        {"make":"HONDA","model":"Civic","year":"1999","odomer":"168000","id":2},
        {"make":"VW","model":"Pasat","year":"2014","odomer":"45987","id":3}
    ];
    var view ='';
    //localStorage.clear();

    function plock(car){
        if (!localStorage.cars){
            car.id=cars.length +1;
            cars.push(car);
            localStorage.cars = JSON.stringify(cars);


        }else {
            cars = JSON.parse(localStorage.cars);
            console.log(car);
            car.id=cars.length + 1;
            cars.push(car);
            localStorage.cars = JSON.stringify(cars);

        }
    }
    function renderData(view,cars){

        var renderedView = Mustache.render(view,{cars:cars});
        $("#aplication").html(renderedView);
        GlobalEventHandler.applyEventLisener();
    }


    return {

        renderData:function(){
          renderData(view,JSON.parse(localStorage.cars));
        },
        renderCars:function(){
            $.ajax({
                url: 'views/table.html',
                success: function(view,staus,jqXHR){
                    view = view;
                    var cars = JSON.parse(localStorage.cars);
                    console.log(cars)
                    renderData(view,cars);

                },
                dataType: 'html'
            });
        },
        saveCar:function(){
            if(
                $("#car-year").val() != Math.floor($("#car-year").val()) ||
                $("#car-odomer").val() != Math.floor($("#car-odomer").val())
            ){
                console.log($("#car-year").val());
                console.log($("#car-odomer").val());
                $("#error-flash").removeClass('hide').addClass('show');
                setTimeout(function(){
                    $("#error-flash").removeClass('show').addClass('hide');
                },700)

            }else {

                plock(new Car($("#car-maker").val(),$("#car-model").val(),$("#car-year").val(),$("#car-odomer").val()));

            }
        }
    }
}());