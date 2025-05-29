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
$get_site = ($data->site);
$get_area = ($data->area);
$get_field_5 = ($data->field_5);
$get_field_6 = ($data->field_6);
$get_field_7 = ($data->field_7);
$get_field_8 = ($data->field_8);
$get_field_9 =  ($data->field_9);
$get_field_10 = ($data->field_10);
$get_field_11 = ($data->field_11);
$get_field_12 = ($data->field_12);
$get_field_17 = 'No';
$get_type = ($data->type);


if( empty($get_type ) ||empty($get_site ) ||empty($get_area) || empty($get_field_2) || 
	empty($get_field_3) ||
	empty($get_field_4) || empty($get_field_5) || empty($get_field_6) ||
	empty($get_field_7)  || empty($get_field_8)|| empty($get_field_10)|| 
	empty($get_field_11)|| empty($get_field_12) )
{
	$response["success"] = 2;
	echo json_encode($response);
}
else if (strlen($get_field_6) != 10) 
{
	$response["success"] = 4;
	echo json_encode($response);
}
else
{
	
	
	if (strlen($get_field_2) >= 5)  // String Length Min 5 letters
	{
		$get_field_14 = '1';
		$get_field_21 = 'Under Progress';
		$get_created_date =date('Y-m-d');
		$get_field_13 = "";
				$get_manager = "";
$get_gri_forwardto = "";

		$get_for_empid ="";
	$get_field_19  = "";
		
	$result2 = mysqli_query($conn,"SELECT COUNT(site) as total_balance FROM ticket WHERE site='$get_field_10'");
	$Allsurvey = mysqli_fetch_array($result2);
	$get_id = $Allsurvey["total_balance"] ;
	$ticke_id = $get_field_10.'-'.($get_id + 1);
	
	$result6 = mysqli_query($conn,"SELECT * FROM site_results where site='$get_field_10' ");
	$Allsite= mysqli_fetch_array($result6);
	$get_site_1 = $Allsite["site"];
	
	if( empty($get_site_1))
	{
		$get_field_UP = 1;
		$get_field_tot = 1;
		mysqli_query($conn,"INSERT INTO site_results ( site,field_1, field_5	)
					VALUES(	'$get_field_10','$get_field_UP','$get_field_tot' )");
	}
	else
	{
		mysqli_query($conn,"UPDATE site_results SET 
				field_1=field_1+1,field_5=field_5+1
				where site='$get_field_10' ");
	}

	
	
	
	$result = mysqli_query($conn,"INSERT INTO ticket
							( email,field_1, field_2, field_3, field_4,site,area,
							field_5, field_6,field_7,field_8,field_9,fempid, field_10, 
							field_11, field_12,  field_13,field_14,field_15,field_17, field_19, field_21, created_date	)
			VALUES(	'$ticke_id', '$get_field_1', '$get_field_2', '$get_field_3', 
					'$get_field_4', '$get_site','$get_area', 
					'$get_field_5', '$get_field_6','$get_field_7',
					'$get_field_8', '$get_field_9','$get_for_empid',
					'$get_field_10','$get_field_11','$get_field_12',
					'$get_field_13','$get_field_14','$get_gri_forwardto',
					'$get_field_17','$get_field_19',
					'$get_field_21','$get_created_date')");

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
		else 
		{
			// unsuccess
			$response["success"] = 3;		
			// echoing JSON response
			echo json_encode($response);
		}
	
}
?>