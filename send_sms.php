<?php

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// Load Composer's autoloader
require 'vendor/autoload.php';

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Create an instance of PHPMailer
$mail = new PHPMailer(true);
// connecting to db


// check for post data

$data = json_decode(file_get_contents("php://input"));
$get_field_1 =   ($data->field_1);
$get_field_2 = ($data->field_2);
$get_empid =  ($data->email);


				
$result = mysqli_query($conn,"SELECT * FROM login WHERE email = '$get_empid'");
$Allresponse = mysqli_fetch_array($result);
$get_name = $Allresponse["name"];
$get_status = $Allresponse["field_7"];

$result1 = mysqli_query($conn,"SELECT * FROM details WHERE email = '$get_empid'");
$Allresponse1 = mysqli_fetch_array($result1);
$get_sender_mail = $Allresponse1["field_3"];
$get_image = $Allresponse1["field_4"];

$get_number = $Allresponse1["field_1"];
$get_number_2 = $Allresponse1["field_2"];


	$username = "contact@arudhrainnovations.com";
	$apiKey = urlencode('gFiNovbuwFA-Sq6GSGPLvCfzHKWRcQBbuzlt0ChGEK');

	$numbers = $get_number;
	$numbers1 = $get_number_2;
	
	
	$get_lat = substr($get_field_1, 0,6);
	$get_long = substr($get_field_2,0,6);



	$test = "0";
	$sender = urlencode('AISOFT');
	$message = 'Im '.$get_name.', current location lat '.$get_lat.' and log '.$get_long.'';
	$message = urlencode($message);

	if ($get_status)
	{
		
		
	///////////////////////////////////////////
	//////////////Email////////////////////////
    ///////////////////////////////////////////
	//Server settings
    $mail->isSMTP();                                            // Send using SMTP
	$mail->Host       = 'smtp.gmail.com';                      
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'codeshoppy@gmail.com';                 // SMTP username
    $mail->Password   = 'qsnj oyls rqkd hssw';                  // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 587;                                    // TCP port to connect to



				$get_gmap = "https://maps.google.com/?q=";
				$message2 = "I am in trouble " .$get_name." sending Current Location Lat & Long ".$get_gmap."".$get_lat.",".$get_long." \r\n Image -".$get_image."\r\n";
				
				$subject = "My Geo Location";	//.$get_order_id."\r\n";

				$from ="womensafety@gmail.com";	// $get_empid;//  // from
				$message3 = wordwrap($message2, 200);
				
				// Send Mail By PHP Mail Function
				$mailto= $get_sender_mail; //$get_sender_mail TO 
				
				
// Set additional headers
$headers = "From: contact@myapphosting.in" . "\r\n";
$headers .= "Reply-To: sender@example.com" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

				//mail($mailto, $subject, $message3, $headers);
				
    //Recipients
    $mail->setFrom($get_sender_mail, 'Mailer');
    $mail->addAddress($get_sender_mail, 'Recipient Name');     // Add a recipient

    // Content
    $mail->isHTML(true);                                        // Set email format to HTML
    $mail->Subject = 'My Geo Location';
    $mail->Body    = "I am in trouble " .$get_name." sending Current Location Lat & Long ".$get_gmap."".$get_lat.",".$get_long." \r\n Image -".$get_image."\r\n";
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
	///////////////////////////////////////////
	//////////////Email////////////////////////
    ///////////////////////////////////////////

	$data = array('apikey' => $apiKey, 'numbers' => $numbers, 
	"sender" => $sender, "message" => $message, "test" => $test);
	
	$ch = curl_init('https://api.textlocal.in/send/');
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$result2 = curl_exec($ch); // This is the result from the API
	curl_close($ch);
	

	$data1 = array('apikey' => $apiKey, 'numbers' => $numbers1, 
	"sender" => $sender, "message" => $message, "test" => $test);
	
	$ch1 = curl_init('https://api.textlocal.in/send/');
	curl_setopt($ch1, CURLOPT_POST, true);
	curl_setopt($ch1, CURLOPT_POSTFIELDS, $data1);
	curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
	$result3 = curl_exec($ch1); // This is the result from the API
	curl_close($ch1);
	

//////////////////Mail ////////////////////////////

			
				
//////////////////Mail ////////////////////////////
	
			$response["success"] = 1;	
			echo json_encode($response);

	}
	else {
	
			$response["success"] = 0;	
			echo json_encode($response);
		
	}
?>