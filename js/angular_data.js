var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookies, $cookieStore, $http,$filter)
{


/************************** Date Details ***********************************/
			
 $scope.ModifiedDate = $filter("date")(Date.now(), 'yyyy-MM-dd');
 
	
/****************************************************************************/
/************************** Get Admin Details ***********************************/
/****************************************************************************/	
	$scope.cook_user_email = $cookieStore.get("cook_user_email");
	$scope.cook_user_mob = $cookieStore.get("cook_user_mob");
	$scope.cook_user_name = $cookieStore.get("cook_user_name");

	$scope.cook_user_mail = $cookieStore.get("cook_user_mail");
	$scope.cook_admin_email = $cookieStore.get("cook_admin_email");
	$scope.cook_user_type = $cookieStore.get("cook_user_type");
	$scope.cook_user_dept = $cookieStore.get("cook_user_dept");
	
	
/************************** Tracking Code **********************************/	

    // Retrieve the cookie value
    var userEmail = $cookieStore.get("cook_user_email");

    // Check if the cookie has a value
    if (userEmail) {
        // Define the interval time (e.g., 1 minutes in milliseconds)
        var intervalTime = 1 * 60 * 1000; // 1 minutes

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

			
	$scope.admin_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.cook_admin_email = "";
			$cookies.cook_user_email = "";
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
				window.location = "index.html";
				alert("Logout successfully");
				$cookies.cook_user_email = "";
				$cookies.cook_admin_email = "";
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

	$scope.clear_map_details = function() 
	{
			$cookies.cook_field_6 = "";
			$cookies.cook_field_5 = "";
			window.location = "latdetails.html";
			return;
	}

	$http.post('get_dept.php')
	.success(function(data, status, headers, config) 
	{
			$scope.dept_details = data.details;
	});
	
	
	$http.post('get_category.php')
	.success(function(data, status, headers, config) 
	{
			$scope.category_details = data.details;
	});
	

/****************************************************************************/
/************************** create_grievance **********************************/
/****************************************************************************/

	
	$scope.create_grievance = function() 
	{
		$scope.field_11="Nil";
		$scope.cook_user_site="Nil";
		$scope.cook_user_mail="Nil";
		$scope.cook_user_area="Nil";
		$scope.cook_user_desg="Nil";
		
		$http.post('create_grievance.php', 
		{
		'field_1':$scope.ModifiedDate,'field_2':$scope.field_2,
		'field_3':$scope.cook_user_mail,'field_4':$scope.cook_user_name,
		'site':$scope.cook_user_site,'area':$scope.cook_user_area,
		'type':$scope.cook_user_type,
		'field_5':$scope.cook_user_dept,'field_6':$scope.cook_user_mob,
		'field_7':$scope.cook_user_email,'field_8':$scope.cook_user_desg,
		'field_9':$scope.field_9,'field_10':$scope.field_10,
		'field_11':$scope.field_11,'field_12':$scope.field_12
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Created Successfully");
				window.location = "my_grievance.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Fill All Fields");
			}
			else if(data.success == 3)
			{
				alert("Fill Min 5 char in Grievance ");
			}
			else if(data.success == 4)
			{
				alert("Mobile must be 10 digits ");
			}
			else
			{
				alert("Fill All Fields");
			}
        });
    }
	
	 

/****************************************************************************/
/************************** Add Complaint *********************************/
/****************************************************************************/
	$scope.create_site = function() 
	{		
		$http.post('create_site.php', {
		'field_1':$scope.field_1,'field_2':$scope.field_2,'field_3':$scope.field_3,
		'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Created Successfully");
				window.location = "user_home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 3)
			{
				alert("Enter 10 Digit Valid Mobile No");
			}
			else
			{
				alert("Un Successfully");
			}
        });
    }
/****************************************************************************/
/************************** Add Complaint *********************************/
/****************************************************************************/
	$scope.create_block = function() 
	{		
		$http.post('create_block.php', {
		'field_1':$scope.field_1
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Site Created Successfully");
				window.location = "block_site.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				alert("Un Successfully");
			}
        });
    }
/****************************************************************************/
/************************** User View Complaint *********************************/
/****************************************************************************/
	$http.post('get_block.php')
	.success(function(data, status, headers, config) 
	{
			$scope.block_details = data.details;
    });
	
	$http.post('get_user.php', {'email': $scope.cook_user_email} )
	.success(function(data, status, headers, config) 
	{
			$scope.user_details = data.details;
    });
	
/****************************************************************************/
/************************** Add Requirment ***********************************/
/****************************************************************************/
	$http.post('viewdetails.php', {'email': $scope.cook_user_email})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.child_details = data.details;
		}
		else
		{
			$scope.child_details = "No Data Found !!!";
		}
    });
	
/****************************************************************************/
/************************** Add Requirment ***********************************/
/****************************************************************************/
	$scope.delete_site = function(id) 
	{		
        $http.post('delete_site.php', 
		{
		'id': id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Deleted Successful");
				window.location = "block_site.html";	
				return;
			}
			else if(data.success == 0)
			{
				alert("Error While Deleting Product!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }

/****************************************************************************/
/************************** Add Requirment ***********************************/
/****************************************************************************/
	$scope.view_site = function(field_3) 
	{		
        $http.post('view_site.php', 
		{
		'field_3': field_3
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Site Blocked");
				//window.location = "viewdetails.html";	
				return;
			}
			else if(data.success == 0)
			{
				alert("Site is Safe!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }

	$scope.send_mail = function(field_5,field_6) 
	{		
        $http.post('send_mail.php', 
		{
		'field_1': field_5,'field_2': field_6
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Mail Sent Successfully");
				//window.location = "viewdetails.html";	
				return;
			}
			else if(data.success == 0)
			{
				alert("Site is Safe!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }

	$scope.send_sms = function(field_5,field_6) 
	{		
        $http.post('send_sms.php', 
		{
		'field_1': field_5,'field_2': field_6,'email': $scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("SMS Alert Sent Successfully");
				window.location = "latdetails.html";	
				return;
			}
			else if(data.success == 0)
			{
				alert("Site is Safe!!");
			}
			else
			{
				alert("SMS Alert Sent Successfully");
			}
        });
    }

	
		$scope.map_details = function(field_5,field_6) 
			{
				$cookieStore.put("cook_field_5",field_5);
				$cookieStore.put("cook_field_6",field_6);
				window.location = "map_details.html";
				return;
			}
		$scope.cook_field_5 = $cookieStore.get("cook_field_5");
		$scope.cook_field_6 = $cookieStore.get("cook_field_6");
		
		$scope.reload = function() 
			{
				window.location = "map_details.html";
				return;
			}
		
	/****************************************************************************/
/************************** Sport Update *********************************/
/****************************************************************************/
$scope.update_details = function(cus_id,field_1,field_2,field_3) 
	{
		window.location = "update_details.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
	$scope.cook_field_3 = $cookieStore.get("cook_field_3");

	$scope.save_details = function() 
	{		
		$http.post('save_details.php',{
		'id':$scope.cook_cus_id,'field_1':$scope.cook_field_1,'field_2':$scope.cook_field_2,
		'field_3':$scope.cook_field_3})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Update successfully");
				window.location = "admin_viewdetails.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }
	 
	 
	$http.post('get_user_grievance.php', 
		{
		'id':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			$scope.user_grievance_details = data.details;
        });
		
	
$scope.file_upload = function(cus_id) 
	{
		window.location = "file.html";
		$cookieStore.put("cook_app_id",cus_id);
		return;
	}	
	
	$scope.cook_app_id = $cookieStore.get("cook_app_id");
	
	
		 
/****************************************************************************/
/************************** Rating User  *********************************/
/****************************************************************************/

	$scope.grievance_rating = function(email) 
	{
		window.location = "user_rating.html";
		$cookieStore.put("cook_email",email);
		return;
	}	
	
	$scope.cook_email = $cookieStore.get("cook_email");

	$scope.save_rating = function() 
	{		
		$http.post('save_rating.php',{
		 'email':$scope.cook_email, 'field_1':$scope.field_1,'field_2':$scope.comment
		 })
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "user_home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }


	$http.post('get_user_redressal.php', 
		{
		'dept':$scope.cook_user_dept
		})
		.success(function(data, status, headers, config) 
		{
			$scope.user_redressal_details = data.details;
        });
	
	
/****************************************************************************/
/************************** update_grievance  **********************************/
/****************************************************************************/
		 
	$scope.update_grievance = function(email,field_21) 
	{		
		$http.post('update_grievance.php',{
		 'email':email, 'field_1':field_21
		 })
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Updated successfully");
				window.location = "redressal.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }


/****************************************************************************/
/************************** delay_grievance  **********************************/
/****************************************************************************/
		 
	$scope.delay_grievance = function(email,delay) 
	{		
		$http.post('delay_grievance.php',{
		 'email':email, 'field_1':delay
		 })
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Updated successfully");
				window.location = "redressal.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }
	 
	 
		$http.post('get_user_info.php',
		{
			'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
				$scope.userdetails = data.details;
          });
		  
$scope.user_update_info = function(name,password,mobile) 
	{
		window.location = "user_info_edit.html";
		$cookieStore.put("cook_name",name);
		$cookieStore.put("cook_password",password);
		$cookieStore.put("cook_mobile",mobile);
		return;
	}	
	
	$scope.cook_name = $cookieStore.get("cook_name");
	$scope.cook_password = $cookieStore.get("cook_password");
	$scope.cook_mobile = $cookieStore.get("cook_mobile");

	$scope.save_update_info = function() 
	{		
		$http.post('user_update_info.php',{
		 'name':$scope.cook_name, 'password':$scope.cook_password,
		 'mobile': $scope.cook_mobile, 'email': $scope.cook_user_email})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "user_update_info.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }
	 


});