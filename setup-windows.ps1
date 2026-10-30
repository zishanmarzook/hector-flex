$ErrorActionPreference = 'Stop'
$envPath = Join-Path $PSScriptRoot '.env'
if (Test-Path $envPath) {
    Write-Host "Existing local .env found. Keeping your settings."
    exit 0
}
Write-Host ""
Write-Host "First-time HECTORFLEX setup"
Write-Host "Open https://discord.com/developers/applications"
Write-Host "Choose your NEW HECTORFLEX application, open Bot, and copy its token."
Write-Host "NEVER send the token in chat or save it in GitHub."
$secure = Read-Host "Paste bot token (hidden input)" -AsSecureString
$ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
try {
    $token = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
    if ([string]::IsNullOrWhiteSpace($token) -or $token.Contains([char]10) -or $token.Contains([char]13)) {
        throw "Token must not be empty or contain a line break."
    }
    $lines = @(
        "DISCORD_TOKEN=$token",
        "DISCORD_CLIENT_ID=1565760164638756935",
        "DISCORD_GUILD_ID=1403735082044227626",
        "VOUCH_CHANNEL_ID=1403752243999543356",
        "REVIEW_CHANNEL_ID=1403752422601658489",
        "ORDER_PROOF_CHANNEL_ID=1403752839167344681"
    )
    [IO.File]::WriteAllLines($envPath, $lines, [Text.UTF8Encoding]::new($false))
    Write-Host "Saved settings locally to .env. Do not upload this file."
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
    Remove-Variable token -ErrorAction SilentlyContinue
}
