$ErrorActionPreference = "Continue"
$imgDir = "c:\Users\Administrator\projects\china-travel-explorer-pic\assets\img"

$spots = @(
    @{ id = "badaling";    titles = @("Badaling", "Great Wall of China") },
    @{ id = "beihai";      titles = @("Beihai Park") },
    @{ id = "xiangshan";   titles = @("Fragrant Hills") },
    @{ id = "zhongguozun"; titles = @("CITIC Tower", "China Zun") },
    @{ id = "shisanling";  titles = @("Ming tombs") }
)

foreach ($s in $spots) {
    $dest = Join-Path $imgDir "$($s.id).jpg"
    if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 10kb)) { Write-Host "SKIP $($s.id)"; continue }
    $ok = $false
    foreach ($t in $s.titles) {
        $enc = [uri]::EscapeDataString($t)
        $api = "https://en.wikipedia.org/w/api.php?action=query&titles=$enc&prop=pageimages&format=json&pithumbsize=900&redirects=1"
        try {
            $raw = curl.exe -sS --max-time 20 $api
            $json = $raw | ConvertFrom-Json
            $page = ($json.query.pages.PSObject.Properties | Select-Object -First 1).Value
            $url = $page.thumbnail.source
            if ($url) {
                curl.exe -sS -L --max-time 60 -o $dest $url
                if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 10kb)) {
                    Write-Host "OK   $($s.id) <- $t"
                    $ok = $true
                    break
                }
            } else { Write-Host "NOIMG $($s.id) page=$t" }
        } catch { Write-Host "ERR  $($s.id) page=$t : $_" }
        Start-Sleep -Milliseconds 500
    }
    if (-not $ok) { Write-Host "FAIL $($s.id)" }
}
Write-Host "DONE"
