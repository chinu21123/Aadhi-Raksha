<?php
/***************************
****  ***
****************************/

/* Following register will admin login credentials */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db

date_default_timezone_set('Asia/Kolkata');


$data = json_decode(file_get_contents("php://input"));
$get_id = ($data->email);
$get_field_1 = ($data->field_1);
$get_field_2 = ($data->field_2);
$get_create_date = date('Y-m-d');
$get_field_3 = date('H:i');


	$result1 = mysqli_query($conn,"UPDATE login SET
		field_5='$get_field_1', field_6='$get_field_2' WHERE email = '$get_id'");

	$result = mysqli_query($conn,"INSERT INTO map( email, field_1, field_2, field_3,created_date	)
					VALUES(	'$get_id','$get_field_1', '$get_field_2','$get_field_3','$get_create_date')");
	// check for empty result
	if($result1)
	{
		// success
		$response["success"] = 1;		
		// echoing JSON response
		echo json_encode($response);
	}
	else 
	{
		// unsuccess
		$response["success"] = 0;
		
		// echoing JSON response
		echo json_encode($response);
	}

?>