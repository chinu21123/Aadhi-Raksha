<?php
header("Content-Type: application/json");

require 'vendor/autoload.php';

use Google\Cloud\Dialogflow\V2\SessionsClient;
use Google\Cloud\Dialogflow\V2\TextInput;
use Google\Cloud\Dialogflow\V2\QueryInput;

// Google Dialogflow Credentials File
putenv('GOOGLE_APPLICATION_CREDENTIALS=surakshasathi-key.json');

$projectId = 'surakshasathi-lpiq'; // Your Dialogflow Project ID

// Get user message
$requestPayload = file_get_contents("php://input");
$data = json_decode($requestPayload, true);
$userMessage = trim($data['message']);

if (!$userMessage) {
    echo json_encode(["response" => "Invalid input."]);
    exit;
}

try {
    $sessionClient = new SessionsClient();
    $session = $sessionClient->sessionName($projectId, uniqid());

    // Create text input
    $textInput = new TextInput();
    $textInput->setText($userMessage);
    $textInput->setLanguageCode('en');

    // Create query input
    $queryInput = new QueryInput();
    $queryInput->setText($textInput);

    // Detect intent
    $response = $sessionClient->detectIntent($session, $queryInput);
    $queryResult = $response->getQueryResult();
    $botResponse = $queryResult->getFulfillmentText();

    echo json_encode(["response" => $botResponse]);

    $sessionClient->close();
} catch (Exception $e) {
    echo json_encode(["response" => "Error processing request."]);
}
?>
