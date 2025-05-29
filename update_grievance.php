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

$get_id = ($data->email);
$get_field_1 = ($data->field_1);
$get_created_date =date('Y-m-d');

if( empty($get_field_1) )
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
		
		if ( (strcmp($get_field_1 ,"Completed")==0) ) 
			{
				$get_closing = $get_created_date;
			}
			else 
			{
				$get_closing = '';
			}
			
		
	/*****************************************************/		
	/************** Site Results *********************/		
	/*****************************************************/		
		// Forward TO Emp ID
	$result4 = mysqli_query($conn,"SELECT * FROM ticket WHERE email = '$get_id'  ");
	$Allforward = mysqli_fetch_array($result4);
	$get_site = $Allforward["field_10"];

	if (strcmp($get_field_1 ,"Completed")==0) 
	{
		mysqli_query($conn,"UPDATE site_results SET field_2 =field_2+1, field_5 =field_5+1
		where site='$get_site' ");
	}
	else if (strcmp($get_field_1 ,"Rejected")==0) 
	{
		mysqli_query($conn,"UPDATE site_results SET field_3 =field_3+1 , field_5 =field_5+1
		where site='$get_site'  ");
	}
	else if (strcmp($get_field_1 ,"Forced Completed")==0) 
	{
		mysqli_query($conn,"UPDATE site_results SET field_4 =field_4+1 , field_5 =field_5+1
		where  site='$get_site'  ");
	}
	else
	{
		null;
	}

	
	$result = mysqli_query($conn,"UPDATE ticket SET field_21='$get_field_1',
						closing_date='$get_created_date',completed='$get_closing'
							WHERE email = '$get_id' ");

	// check for empty result
	if($result)
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
}
?>