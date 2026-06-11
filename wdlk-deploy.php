<?php
// One-click deploy trigger. Restricted to admin session only.
// Hit this URL after pushing to GitHub to pull + reset the working tree.
declare(strict_types=1);
require_once __DIR__ . '/backend/session.php';
require_once __DIR__ . '/backend/security.php';
start_secure_session();

$token = 'wdlk_deploy_Alivexbs12355';   // change this if you want
$given = $_GET['token'] ?? '';
if (!hash_equals($token, $given)) {
    http_response_code(403);
    die('Forbidden');
}

header('Content-Type: text/plain');
@set_time_limit(120);

$root = __DIR__;

// Step 1: Find git
$git = '/usr/local/cpanel/3rdparty/bin/git';
if (!file_exists($git)) $git = trim(shell_exec('which git 2>/dev/null') ?: '');
if (!$git) { echo "ERROR: git not found\n"; exit(1); }
echo "git: $git\n";

// Step 2: Hard-reset tracked files to HEAD
$reset = shell_exec("cd " . escapeshellarg($root) . " && $git reset --hard HEAD 2>&1");
echo "reset: $reset\n";

// Step 3: Remove untracked files that would block the pull (gitignored files like uploads/ are safe)
$clean = shell_exec("cd " . escapeshellarg($root) . " && $git clean -fd 2>&1");
echo "clean: $clean\n";

// Step 4: Pull from origin
$pull = shell_exec("cd " . escapeshellarg($root) . " && $git pull origin master 2>&1");
echo "pull:\n$pull\n";

echo "\nDONE — current HEAD: ";
echo shell_exec("cd " . escapeshellarg($root) . " && $git rev-parse --short HEAD 2>&1");
