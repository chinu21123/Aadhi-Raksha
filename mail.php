<?php
	
// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db


//"dineshkumar24.dlk@gmail.com"; //

$get_empid = "user@gmail.com"; //($data->email);

$result = mysqli_query($conn,"SELECT * FROM details  where email= '$get_empid' ");
$Alldetails = mysqli_fetch_array($result);

$get_sender_mail = $Alldetails["field_1"];

$result1 = mysqli_query($conn,"SELECT * FROM login  where email= '$get_empid' ");
$Alldetails1 = mysqli_fetch_array($result1);

$get_name = $Alldetails1["name"];
$get_lat = $Alldetails1["field_5"];
$get_long = $Alldetails1["field_6"];
$get_status = $Alldetails1["field_7"];

				
				$message2 = "I am " .$get_name." Current Location Lat & Long ".$get_lat." & " .$get_long. "\r\n";

				$subject = "My Geo Location";	//.$get_order_id."\r\n";

				$from ="womensafety@gmail.com";	// $get_empid; //"panner224@gmail.com"; //  // from
				$message3 = wordwrap($message2, 200);
				
				// Send Mail By PHP Mail Function
				$mailto= "womensafety@gmail.com"; //$get_sender_mail; //$get_sender_mail TO 
				//mail($mailto, $subject, $message3, "From:".$from);
				
				
			$response["success"] = 1;	
			echo json_encode($response);
	
	if($get_status)
	{
			if($result)
			{
				echo "Registeration Successfull";
				//header('Location: success.html');
			}
			else
			{
				echo "Both file and data not inserted";
			}
	}


?>