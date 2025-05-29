var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookieStore, $cookies, $http) 
{
	
/****************************************************************************/
/************************** User Login *************************************/
/****************************************************************************/

	// sign in button
	$scope.user_login = function() 
	{		
	           if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            var lat = position.coords.latitude;
                            var lon = position.coords.longitude;
												
							$scope.field_1 = lat;
							$scope.field_2 = lon;
                            $scope.postLocation(lat, lon);							
                            // Print latitude and longitude to the console
							
							//alert("Login Successful");

                            console.log('Latitude:', lat);
                            console.log('Longitude:', lon);                            
                        }, function(error) {
                            console.error('Error getting geolocation: ', error);
                        });
                    } else {
                        console.error('Geolocation is not supported by this browser.');
                    }
               
											/////////////////////////////////
									

                $scope.postLocation = function(lat, lon) {
                    var data = {
                        field_1: lat,
                        field_2: lon
                    };								
							$http.post('user_login.php', 
								{
								'field_1': $scope.field_1,'field_2':$scope.field_2,
								'email': $scope.email, 'password':$scope.password
								})
							.success(function(data, status, headers, config) 
							{
								if(data.success == 1)
								{
									alert("Login Successful");
									$cookieStore.put("cook_user_email",data.email);
									
									$cookieStore.put("cook_user_mob",data.mobile);
									$cookieStore.put("cook_user_name",data.name);
									$cookieStore.put("cook_user_type",data.field_2);
									window.location = "user_home.html";  // Home Page
									return;				
								}
								else if(data.success == 2)
								{
									alert("Please Fill All Fields");
								}
								else
								{
									alert("Login Unsuccessful");
								}
							});
				}

							/////////////////////////////////

    }
	// User Login End //
/************************** Cookies **********************************/	
	$scope.cook_user_email = $cookieStore.get("cook_user_email");
	$scope.cook_user_mob = $cookieStore.get("cook_user_mob");
	$scope.cook_user_name = $cookieStore.get("cook_user_name");
	$scope.cook_user_type = $cookieStore.get("cook_user_type");
	
/************************** Tracking Code **********************************/	

    // Retrieve the cookie value
    var userEmail = $cookieStore.get("cook_user_email");

    // Check if the cookie has a value
    if (userEmail) {
        // Define the interval time (e.g., 1 minutes in milliseconds)
        var intervalTime =  60 * 1000; // 1 minutes

	// Log the interval time
		console.log("Interval time is:", intervalTime);
        // Set an interval to call the updateLocation function every 5 minutes
        setInterval(updateLocation, intervalTime);

        console.log("Location tracking started.");
    } else {
        console.log("User cookie not set. Location tracking not started.");
    }
	
// Function to get the current location and send it to the server
function updateLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            
            // Call the function to send the updated location to the server
            $scope.postnewLocation(lat, lon);
            
            // Print latitude and longitude to the console
            console.log('Latitude:', lat);
            console.log('Longitude:', lon);
        }, function(error) {
            console.error('Error getting geolocation: ', error);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}


$scope.postnewLocation = function(lat, lon) {
    var data = {
        field_1: lat,
        field_2: lon,
        email: $scope.cook_user_email
    };

    $http.post('update_location.php', data)
        .success(function(data, status, headers, config) {
            if(data.success == 1) {
                // Handle successful login and location update
                alert("Location Updated Successfully");
            } else if(data.success == 2) {
                alert("Please Fill All Fields");
            } else {
                alert("Update Unsuccessful");
            }
        })
        .error(function(data, status, headers, config) {
            console.error('Error posting location:', status);
        });
};
/************************** Tracking Code **********************************/	


/****************************************************************************/
/************************** Police Login *************************************/
/****************************************************************************/
	// sign in button
	$scope.police_login = function() 
	{		
        $http.post('police_login.php', 
			{'email': $scope.email, 'password':$scope.password})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 5) // Head Login 
			{
				alert("Login Successful");
				$cookieStore.put("cook_user_mail",data.email);
				$cookieStore.put("cook_user_email",data.field_1);
				$cookieStore.put("cook_user_type",data.field_2);
				$cookieStore.put("cook_user_dept",data.field_3);
				window.location = "police_home.html";  // Home Page
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 4)
			{
				alert("Please Install New Version!");
			}
			else
			{
				alert("Login Unsuccessful");
			}
        });
    }
	
/************************** Cookies **********************************/	
	$scope.cook_user_mail = $cookieStore.get("cook_user_mail");
	$scope.cook_admin_email = $cookieStore.get("cook_admin_email");
	$scope.cook_user_type = $cookieStore.get("cook_user_type");
	$scope.cook_user_dept = $cookieStore.get("cook_user_dept");
	

/****************************************************************************/
/************************** User Logout ************************************/
/***************************************************************************	
	*/	
	$scope.admin_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.cook_user_email = "";
			$cookies.cook_admin_email = "";
			window.location = "index.html";
			return;
		}
		else
		{
			return false;
		}
	}

$scope.user_logout = function() 
	{		
		$http.post('user_logout.php',{'email':$scope.cook_user_email})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Logout successfully");
				$cookies.cook_user_email = "";
				$cookies.cook_admin_email = "";
				window.location = "index.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 0)
			{
				alert("Error");
			}			
			else
			{
				alert(" Un Successfull");
			}   
          });
     }
//************************** admin_register **********************************/	

	$scope.user_register = function() 
	{		
		$http.post('user_register.php',{
		 'name':$scope.name,'email':$scope.email,'password':$scope.password, 
		 'mobile': $scope.mobile,'field_1': $scope.field_1,'field_2': $scope.field_2, 
		 'field_3': $scope.field_3,'field_4': $scope.field_4 })
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Registered successfully");
				window.location = "login.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 3)
			{
				alert("Enter 10 Digit Mobile No");
			}
			else if(data.success == 4)
			{
				alert("Email ID Already Exists");
			}
			else if(data.success == 5)
			{
				alert("Enter 8 Digit Password");
			}
			else if(data.success == 6)
			{
				alert("Atleast Use One Special, Number and Captial Character - $1A ");
			}
			else if(data.success == 0)
			{
				alert("Error");
			}			
			else
			{
				alert(" Un Successfull");
			}   
          });
     }
/****************************************************************************/
/************************** Admin Login *************************************/
/****************************************************************************/
	// sign in button
	$scope.admin_login = function() 
	{		
        $http.post('admin_login.php', 
			{'email': $scope.email, 'password':$scope.password})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Login Successful");
				$cookieStore.put("cook_admin_email",data.email);
				window.location = "admin_home.html";  // Home Page
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				alert("Login Unsuccessful");
			}
        });
    }
	
/************************** Cookies Login **********************************/	
	$scope.cook_admin_email = $cookieStore.get("cook_admin_email");
	

//************************** admin_register **********************************/	

	$scope.admin_register = function() 
	{		
		$http.post('admin_register.php',{
		 'name':$scope.name,'email':$scope.email,
		 'password':$scope.password,'mobile': $scope.mobile})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Registered successfully");
				window.location = "admin_login.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }
	 
/************************** Update Admin Info **********************************/

		$http.post('get_admin_info.php')
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{			
				$scope.details = data.details;
			}
          });
		
/************************** Update User Info **********************************/
		
		$http.post('get_user_info.php',
		{
			'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{			
				$scope.userdetails = data.details;
			}
          });
		  
/****************************************************************************/
/************************** User Login *************************************/
/****************************************************************************/
		  
	 $scope.myinfovar = true;

/****************************************************************************/
/************************** Admin Update Login *************************************/
/****************************************************************************/
	 
	 $scope.update_info = function(email,password,name,mobile) 
	{
		$scope.myinfovar = false;
		$scope.email = email;
		$scope.password = password;
		$scope.name = name;
		$scope.mobile = mobile;
		//window.location = "home.html";
	}	
	 
	$scope.save_info = function() 
	{		
		$http.post('admin_update.php',{
		 'name':$scope.name,'email':$scope.email,
		 'password':$scope.password,'mobile': $scope.mobile})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "admin_post_info.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }

/****************************************************************************/
/************************** User Login *************************************/
/****************************************************************************/
	// sign in button
	$scope.newpassword = function() 
	{		
        $http.post('newpassword.php', 
			{	'email': $scope.email, 'password':$scope.password,
				'field_3': $scope.field_3, 'field_4':$scope.field_4
				})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Password Reset Successful");
				window.location = "index.html";  // Home Page
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 0)
			{
				alert("Reset Unsuccessful");
			}
			else
			{
				alert("Reset Unsuccessful");
			}
        });
    }
	

	 
	
});