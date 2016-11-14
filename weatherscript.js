
var app = angular.module("myApp",[]);

app.controller("myController", function($scope ,$http ,$log) 
{ 

  $http({
        method: 'GET',
        url   : 'http://api.openweathermap.org/data/2.5/forecast/city?id=1273874&APPID=b58b4fbb2c6e4fe87877fd6dddae12f6'
      }).then(function successCallback(response)
         {
            $scope.obj = response.data;
            
            $log.info(response);
            $scope.obj.city.country=countrylist[response.data.city.country];
      });

  $http({
  				method: 'GET',
  				url   : 'citylist.json'
			  }).then(function successCallback(response)

			  {

         		$scope.result = response.data;
        		$log.info(response);
      });

  $scope.myFunction=function(cityName)
  {
      

       var i;
       var temp=0;
       $scope.displayerror='';
       for(i=0;i<($scope.result).length;i++)
    	{
          	if($scope.result[i].name.toLowerCase()==cityName.toLowerCase())            
         	{
			    $scope.cityId=$scope.result[i]._id;
			    temp=1;
			}
   		}
        
        if(temp==0)
        {
        	$scope.displayerror='Please Enter a Valid City Name';
        }
   //scope.clock = Date.now();
        $scope.cityName='';
        
        $http({
		        method: 'GET',
		        url   : 'http://api.openweathermap.org/data/2.5/forecast/city?id='+$scope.cityId+'&APPID=b58b4fbb2c6e4fe87877fd6dddae12f6'
		        }).then(function successCallback(response)

		       {

		        	$scope.obj = response.data;
		        	$log.info(response);
		        	$scope.obj.city.country=countrylist[response.data.city.country];

		        },function errorCallback(reason) 

		        {

		       		$scope.error = reason.data;
		       		$log.info(reason);
		     });
  }


});	
