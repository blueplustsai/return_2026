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

function mailConfig(): array
{
    $path = dirname(__DIR__) . '/tmp/mailgun.php';
    if (!is_file($path)) {
        return [];
    }
    $config = require $path;
    return is_array($config) ? $config : [];
}

function sendConsultation(string $name, string $company, string $email, string $plan, string $problem): bool
{
    $config = mailConfig();
    $key = $config['key'] ?? '';
    $domain = $config['domain'] ?? '';
    $from = $config['from'] ?? '';
    $to = $config['to'] ?? '';
    $endpoint = $config['endpoint'] ?? '';
    if (!is_string($key) || !is_string($domain) || !is_string($from) || !is_string($to) || !is_string($endpoint)) {
        return false;
    }
    if ($key === '' || $domain === '' || $from === '' || $to === '' || $endpoint === '') {
        return false;
    }

    $labels = [
        'poc' => 'PoC 輕量體驗包',
        'standard' => '標準 AI 自動化方案',
        'enterprise' => '企業級深度整合方案',
    ];
    $planLabel = $labels[$plan] ?? $plan;
    $text = "姓名：{$name}\n公司：{$company}\nEmail：{$email}\n方案：{$planLabel}\n\n想解決的問題：\n{$problem}\n";
    $payload = http_build_query([
        'from' => $from,
        'to' => $to,
        'h:Reply-To' => $email,
        'subject' => '官網諮詢｜' . $planLabel,
        'text' => $text,
    ]);

    $handle = curl_init(rtrim($endpoint, '/') . '/v3/' . $domain . '/messages');
    if ($handle === false) {
        return false;
    }
    curl_setopt_array($handle, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_USERPWD => 'api:' . $key,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
    ]);
    $response = curl_exec($handle);
    $status = (int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
    curl_close($handle);
    if ($response === false || $status < 200 || $status >= 300) {
        error_log('contact mail failed with status ' . $status);
        return false;
    }
    return true;
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

if (!sendConsultation($name, $company, $email, $plan, $problem)) {
    fail('error');
}

echo json_encode(['code' => 'ok'], JSON_UNESCAPED_UNICODE);
