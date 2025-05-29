<?php
/* Following code will match admin login credentials */

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_empid = ($data->email);
$get_password = ($data->password);
$get_field_1 =  ($data->field_1);
$get_field_2 = ($data->field_2);
	
if(empty($get_empid) || empty($get_password) )
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	
	$result = mysqli_query($conn,"SELECT * FROM login WHERE email = '$get_empid' AND password = '$get_password'");
	
		if (mysqli_num_rows($result))
		{
			
			mysqli_query($conn,"UPDATE login SET field_5='$get_field_1', field_6='$get_field_2' , field_7='1' 
			WHERE email = '$get_empid' ");
			
			$Allresponse = mysqli_fetch_array($result);
			// temp user array
			$response = array();
			$response = $Allresponse;
						
			$get_name = $Allresponse["name"];
			//$get_field_1 = $Allresponse["field_5"];
			//$get_field_2 = $Allresponse["field_6"];
			/// SMS ///////////////////
		
				/*
				$get_lat = =substr($get_field_1, 0,6);
				$get_log =  substr($get_field_2,0,6);
				*/
			$response["success"] = 1;	
			echo json_encode($response);


		} 
		else
		{
			// success	
			$response["success"] = 0;
			// echoing JSON response
			echo json_encode($response);
		}
		
}
?>