var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookies, $cookieStore, $http) 
{
	
/****************************************************************************/
/************************** Get Admin Details ***********************************/
/****************************************************************************/	
	$scope.cook_user_email = $cookieStore.get("cook_user_email");
	$scope.cook_admin_email = $cookieStore.get("cook_admin_email");

	
/****************************************************************************/
/************************** User Logout ************************************/
/****************************************************************************/		
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
/****************************************************************************/
/************************** Add Complaint *********************************/
/****************************************************************************/
	$scope.complaint_status = function(cus_id) 
	{		
		window.location = "admin_post_complaint.html";
		$cookieStore.put("cook_cus_id",cus_id);
		return;				
    }
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");

	$scope.view_user_location = function(email) 
	{		
		window.location = "admin_user_location.html";
		$cookieStore.put("cook_email",email);
		return;				
    }
	$scope.cook_email = $cookieStore.get("cook_email");

	$scope.complaint_solution = function() 
	{		
		$http.post('viewdetails.php', {
		'field_9':$scope.field_9,'field_10':$scope.field_10,
		'field_11':$scope.field_11,	'cus_id':$scope.cook_cus_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submitted Successfully");
				window.location = "admin_view_complaint.html";
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
/************************** All Complaint *********************************/
/****************************************************************************/

	$http.post('get_all_user.php')
	.success(function(data, status, headers, config) 
	{
			$scope.all_user_details = data.details;
    });
	
	$http.post('get_all_map.php')
	.success(function(data, status, headers, config) 
	{
			$scope.all_map_details = data.details;
    });
	
	$http.post('get_user_details.php', {'email':$scope.cook_user_email})
	.success(function(data, status, headers, config) 
	{
			$scope.view_user_details = data.details;
    });
	
	$http.post('get_all_gar.php')
	.success(function(data, status, headers, config) 
	{
			$scope.all_gar_details = data.details;
    });
	
	
$scope.img_update = function(cus_id) 
	{
		window.location = "file_1.html";
		$cookieStore.put("cook_app_id",cus_id);
	
		return;
	}	
	
	$scope.cook_app_id = $cookieStore.get("cook_app_id");
	

/****************************************************************************/
/************************** create_employee *********************************/
/****************************************************************************/
	$scope.create_employee = function() 
	{
	$http.post('create_employee.php', 
		{
		'name':$scope.name1,'email':$scope.email,'password':$scope.password,
		'mobile':$scope.mobile,'field_1':$scope.field_1,'field_2':$scope.field_2,
		'field_3':$scope.field_3,'field_4':$scope.field_4,
		'field_5':$scope.field_5,'field_6':$scope.field_6,
		'field_7':$scope.field_7,'field_8':$scope.field_8
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Created Successfully");
				window.location = "view_employee.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Fill All Fields");
			}
			
			else
				{
					alert("Un Successfully");
				}
        });
    }

/****************************************************************************/
/************************** create_category *********************************/
/****************************************************************************/
	$scope.create_category = function() 
	{
	$http.post('create_category.php', 
		{
		'field_1':$scope.field_1
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				location.reload(); 
				return;				
			}
			else if(data.success == 2)
			{
				alert("Fill All Fields");
			}
			
			else
				{
					alert("Un Successfully");
				}
        });
    }
/****************************************************************************/
/************************** create_dept *********************************/
/****************************************************************************/
	$scope.create_dept = function() 
	{
	$http.post('create_dept.php', 
		{
		'field_1':$scope.field_1
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				   location.reload(); 
			return;				
			}
			else if(data.success == 2)
			{
				alert("Fill All Fields");
			}
			
			else
				{
					alert("Un Successfully");
				}
        });
    }
/*****************************************************************************/
/************************** Update update_employee*********************************/
/****************************************************************************/
	$scope.update_dept = function(cus_id,field_1) 
	{
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_1);
		window.location = "edit_dept.html";
		return;
	}
	
	$scope.update_cat = function(cus_id,field_1) 
	{
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_1);
		window.location = "edit_cat.html";
		return;
	}
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	
		
$scope.save_dept = function() 
	{
	$http.post('save_dept.php', {
			'id': $scope.cook_cus_id,
			'field_1': $scope.cook_field_1})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			alert("Updated Successfully");
			window.location = "create_dept.html";
			$cookies.cook_cus_id = "";
			$cookies.cook_field_1 = "";	
			return;
		}
				else if(data.success == 2)
				{
					alert("Adding Unsuccessful");
				}
				else
				{
					alert("Fill All Fields");
				}
			
    });
	}
	
$scope.save_cat = function() 
	{
	$http.post('save_cat.php', {
			'id': $scope.cook_cus_id,
			'field_1': $scope.cook_field_1})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			alert("Updated Successfully");
			window.location = "create_cat.html";
			$cookies.cook_cus_id = "";
			$cookies.cook_field_1 = "";	
			return;
		}
				else if(data.success == 2)
				{
					alert("Adding Unsuccessful");
				}
				else
				{
					alert("Fill All Fields");
				}
			
    });
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
/************************** Delete User  *********************************/
/****************************************************************************/
	// products_delete
	$scope.delete_dept = function(cusid) 
	{		
        $http.post('delete_dept.php', 
		{
		'id': cusid
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Deleted Successful");
				window.location = "create_dept.html";
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

	$scope.delete_cat = function(cusid) 
	{		
        $http.post('delete_cat.php', 
		{
		'id': cusid
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Deleted Successful");
				window.location = "create_cat.html";
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
	
	

	$scope.delete_details = function(cus_id) 
	{		
        $http.post('delete_details.php', 
		{
		'id': cus_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Deleted Successful");
				window.location = "user_view_details.html";
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
	
	
	$http.post('get_employee.php')
	.success(function(data, status, headers, config) 
	{
		$scope.emp_details = data.details;
    });
	
	/*****************************************************************************/
/************************** Update update_employee **************************/
/****************************************************************************/
	$scope.update_employee = function(user_id,name,email,password,mobile,field_1,field_2,
					field_3,field_4,field_5,field_6,field_7,field_8) 
	{
		
		$cookieStore.put("user_id",user_id);
		$cookieStore.put("cook_name",name);
		$cookieStore.put("cook_email",email);
		$cookieStore.put("cook_password",password);
		$cookieStore.put("cook_mobile",mobile);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		$cookieStore.put("cook_field_4",field_4);
		$cookieStore.put("cook_field_5",field_5);
		$cookieStore.put("cook_field_6",field_6);
		$cookieStore.put("cook_field_7",field_7);
		$cookieStore.put("cook_field_8",field_8);
		
		window.location = "edit_employee.html";
		return;
	}
	

	$scope.user_id = $cookieStore.get("user_id");
	$scope.cook_name = $cookieStore.get("cook_name");
	$scope.cook_email = $cookieStore.get("cook_email");
	$scope.cook_password = $cookieStore.get("cook_password");
	$scope.cook_mobile = $cookieStore.get("cook_mobile");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
	$scope.cook_field_3 = $cookieStore.get("cook_field_3");
	$scope.cook_field_4 = $cookieStore.get("cook_field_4");
	$scope.cook_field_5 = $cookieStore.get("cook_field_5");
	$scope.cook_field_6 = $cookieStore.get("cook_field_6");
	$scope.cook_field_7 = $cookieStore.get("cook_field_7");
	$scope.cook_field_8 = $cookieStore.get("cook_field_8");
	

	$scope.employee_more_info = function(user_id) 
	{
		
		$cookieStore.put("cook_user_id",user_id);
		window.location = "view_employee_info.html";
		return;
	}
	$scope.cook_user_id = $cookieStore.get("cook_user_id");

	$http.post('get_employee_info.php', 
		{
		'id':$scope.cook_user_id
		})
		.success(function(data, status, headers, config) 
		{
			$scope.employee_more_details = data.details;
        });
    
	
	
	
	
$scope.save_employee = function() 
	{
	$http.post('save_employee.php', {
			'id': $scope.user_id,'name': $scope.cook_name,'email': $scope.cook_email, 
			'password': $scope.cook_password,'mobile': $scope.cook_mobile,
			'field_1': $scope.cook_field_1,'field_2': $scope.cook_field_2, 
			'field_3': $scope.cook_field_3,  'field_4': $scope.cook_field_4,
			'field_5': $scope.cook_field_5,'field_6': $scope.cook_field_6,
			'field_7': $scope.cook_field_7,'field_8': $scope.cook_field_8})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			alert("Updated Successfully");
			window.location = "view_employee.html";
			$cookies.id = "";
				$cookies.cook_field_1 = "";	
				$cookies.cook_field_2 = "";
				$cookies.cook_field_3 = "";	
				$cookies.cook_field_4 = "";
				$cookies.cook_field_5 = "";	
				$cookies.cook_field_6 = "";	
				$cookies.cook_field_7 = "";	
				$cookies.cook_field_8 = "";	
				$cookies.cook_name = "";	
				$cookies.cook_email = "";	
				$cookies.cook_mobile = "";	
				$cookies.cook_password = "";	
			return;
		}
				else if(data.success == 2)
				{
					alert("Adding Unsuccessful");
				}
				else
				{
					alert("Fill All Fields");
				}
			
    });
	}

	$http.post('get_all_results.php')
		.success(function(data, status, headers, config) 
		{
			$scope.all_results = data.details;
        });
		
	
	$http.post('get_site_results.php')
	.success(function(data, status, headers, config) 
	{
			$scope.all_site_results = data.details;
	});

		
	$scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Complaint_Report.xls");
		};



});