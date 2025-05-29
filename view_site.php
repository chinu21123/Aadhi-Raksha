<?php

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_field_3 = ($data->field_3);
		
// get all news
$result = mysqli_query($conn,"SELECT * FROM block WHERE field_1 = '$get_field_3' ");
	
// check for empty result
if (mysqli_num_rows($result))
{
	// success	
	$response["success"] = 1;
	// echoing JSON response
	echo json_encode($response);
} 
else
{
	$response["success"] = 0;
	// echoing JSON response
	echo json_encode($response);
	
}

	
?>