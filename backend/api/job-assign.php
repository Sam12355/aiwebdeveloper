<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
require_admin();

$data = input_json();
$projectId = (int)($data['projectId'] ?? 0);
$staffId = (int)($data['staffId'] ?? 0);
$jobType = trim($data['jobType'] ?? '');
$instructions = trim($data['instructions'] ?? '');

if (!$projectId || !$staffId || !$jobType) {
    json_response(['success'=>false,'message'=>'Project, staff and job type required'],422);
}

$stmt = db()->prepare("INSERT INTO job_assignments (project_id, staff_id, job_type, instructions) VALUES (?,?,?,?)");
$stmt->execute([$projectId, $staffId, $jobType, $instructions]);

json_response(['success'=>true,'assignmentId'=>db()->lastInsertId()]);
