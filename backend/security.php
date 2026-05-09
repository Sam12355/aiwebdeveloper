<?php
declare(strict_types=1);

/**
 * Webdeveloper.lk V53 backend security helper.
 * Include this in new PHP endpoints before processing requests.
 */

function wdlk_security_headers(): void {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()');
}

function wdlk_clean_string(string $value, int $max = 5000): string {
    $value = trim($value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return mb_substr($value, 0, $max, 'UTF-8');
}

function wdlk_allowed_upload_mime(string $tmpFile): bool {
    $allowed = ['image/jpeg','image/png','image/webp','application/pdf'];
    $mime = mime_content_type($tmpFile);
    return in_array($mime, $allowed, true);
}

wdlk_security_headers();
