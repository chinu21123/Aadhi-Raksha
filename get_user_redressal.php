<?php
/*********************
**** CPanel ******************
*********/

/* Following code will match admin login credentials */

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_dept = ($data->dept);


$result = mysqli_query($conn,"SELECT * FROM ticket WHERE  field_10= '$get_dept'   ");

if(mysqli_num_rows($result))
{					

		$response["details"] = array();	
			while($Alldetails2 = mysqli_fetch_array($result))
			{
				// temp user array
				$details = array();
				$details = $Alldetails2;
				array_push($response["details"],$details);
			}
		$response["success"] = 1;
		echo json_encode($response);

}
else
{
	$response["success"] = 0;	
	echo json_encode($response);
}

?>