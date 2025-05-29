<?php
/*********************

**** CPanel ******************
*********/

/* Following register will admin login credentials */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));

$get_field_1 = ($data->field_1);
$get_field_2 = ($data->field_2);
$get_field_3 = ($data->field_3);
$get_field_4 = ($data->field_4);
$get_created_date = date('Y-m-d');

/*$get_field_1='nandha';
$get_field_2='test@gmail.com';
$get_field_3='test';
$get_field_4='9750218608';*/

if(empty($get_field_1) || empty($get_field_2) ||
 empty($get_field_3) || empty($get_field_4) )
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	// get customer 
	$result1 = mysqli_query($conn,"INSERT INTO login
				(field_1, field_2, field_3, field_4, field_5)
			VALUES('$get_field_1',  '$get_field_2', '$get_field_3', '$get_field_4', '$get_created_date')");

	//** check for empty result
	if($result1)
	{
		
			$response["success"] = 1;	
		echo json_encode($response);
	}
	else 
	{
		// unsuccess
		$response["success"] = 0;
		
		// echoing JSON response
		echo json_encode($response);
	}
}

?>