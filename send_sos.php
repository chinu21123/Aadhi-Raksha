<?php
// send_sos.php

$sosData = json_decode(file_get_contents('php://input'), true);

if ($sosData) {
    // Replace with your actual SOS sending logic.
    // Example:
    // $location = $sosData['location'];
    // $otherData = $sosData['otherData'];
    // ... your SOS sending code ...

    $response = array(
        'status' => 'success',
        'message' => 'SOS signal sent successfully.',
    );
} else {
    $response = array(
        'status' => 'error',
        'message' => 'Failed to receive SOS data.',
    );
}

header('Content-Type: application/json');
echo json_encode($response);
?>