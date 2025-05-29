<?php
/* Following code will match admin login credentials */

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_field_1 =  ($data->field_1);
$get_field_2 =  ($data->field_2);
$get_empid = "user@gmail.com";
	
if(empty($get_field_1) || empty($get_field_2) )
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
			$result = mysqli_query($conn,"SELECT * FROM login WHERE email = '$get_empid'");
	
		
			$Allresponse = mysqli_fetch_array($result);
			// temp user array
			$response = array();
			$response = $Allresponse;
						
			$get_name = $Allresponse["name"];
	
			$response["success"] = 1;	
			echo json_encode($response);
////////Mail ////////////////

	$message = "I am " .$get_name." Current Location Lat & Long ".$get_field_1." & " .$get_field_2. "\r\n";

				$subject = "Geo Location";	//.$get_order_id."\r\n";

				$from ="panner224@gmail.com";// $get_empid; //"panner224@gmail.com"; //  // from
				// Message lines should not exceed 70 characters (PHP rule), so wrap it
				$message = wordwrap($message, 200);
				
				// Send Mail By PHP Mail Function
				$mailto= "contact@codeshoppy.com"; //$get_sender_mail; //$get_sender_mail TO 
				//mail($mailto, $subject, $message, "From:".$from);
		

		} 

?>