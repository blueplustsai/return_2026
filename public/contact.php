<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['code' => 'error'], JSON_UNESCAPED_UNICODE);
    exit;
}

function field(string $key): string
{
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }
    $value = preg_replace('/[\x00-\x1F\x7F]/u', '', $value) ?? '';
    return trim($value);
}

function fail(string $code): void
{
    echo json_encode(['code' => $code], JSON_UNESCAPED_UNICODE);
    exit;
}

if (field('company_website') !== '') {
    echo json_encode(['code' => 'ok'], JSON_UNESCAPED_UNICODE);
    exit;
}

$name = field('name');
$company = field('company');
$email = field('email');
$plan = field('plan');
$problem = field('problem');
$plans = ['poc', 'standard', 'enterprise'];

if ($name === '' || mb_strlen($name) > 80) {
    fail('name');
}
if (mb_strlen($company) > 120) {
    fail('company');
}
if (mb_strlen($email) > 200 || preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email) !== 1) {
    fail('email');
}
if (!in_array($plan, $plans, true)) {
    fail('plan');
}
if ($problem === '' || mb_strlen($problem) > 2000) {
    fail('problem');
}

echo json_encode(['code' => 'ok'], JSON_UNESCAPED_UNICODE);
