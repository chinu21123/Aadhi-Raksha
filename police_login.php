<?php
/* Following code will match admin login credentials */

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_empid =($data->email);
$get_password = ($data->password);

if(empty($get_empid) || empty($get_password))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	

	$result = mysqli_query($conn,"SELECT * FROM login WHERE email = '$get_empid' AND password = '$get_password'
					AND field_9 = 'Approved' ");

		if (mysqli_num_rows($result))
		{
			
			while($Allresponse = mysqli_fetch_array($result))
			{
				// temp user array
				$response = array();
				$response = $Allresponse;
				$user_type = $Allresponse["field_2"];
				
							if (strcmp($user_type,"master")==0)
							{
								$response["success"] = 1;	
								echo json_encode($response);
							}
							else if (strcmp($user_type,"Public")==0)
							{
								$response["success"] = 3;	
								echo json_encode($response);
							} 
							else if  ( (strcmp($user_type,"Law & Order")==0)  ||  (strcmp($user_type,"Traffic")==0) ||  
							(strcmp($user_type,"Crime")==0)||  (strcmp($user_type,"Womens")==0)	)
							{
								$response["success"] = 5;	
								echo json_encode($response);
							}
							else 
							{
								null;
							}	
			}	
			
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