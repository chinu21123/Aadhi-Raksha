<?php
/* Following code will match admin login credentials */

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_empid =   ($data->email);
$get_set = "0";

if(empty($get_empid)  )
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	
	$result = mysqli_query($conn,"UPDATE login SET field_7='$get_set' WHERE email = '$get_empid' ");

		if ($result)
		{
			
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