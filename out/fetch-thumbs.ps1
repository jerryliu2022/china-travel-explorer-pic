$dir = "c:\Users\Administrator\projects\china-travel-explorer-pic\assets\img\yt"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$ids = @(
  "BHsdSe4VPaw","T8z-VWzDgvI","NU_pUiJoTBU","SZj-aTVYVVU","s1E2woRJgr4","7R1MIYmp9lM",
  "fisuPAUpGks","UI25GwKqTZY","9y6QmP2BEW0","CaNgxgkyi7s","hH3-roIQXec","vvktMUBksqM",
  "Jsn8r8uboiM","8kprn5-pcA4","T7lYXrNKX68","6LXRXIr7maQ","6Wc28rP8GWM","pyHwLnMmWs0",
  "hzd8ZzLjkFU","rm3lhwLejsM","HT8n2yXLRzU","T3NEoYKGqZE","O0zEgBq46_A"
)
foreach ($id in $ids) {
  $dest = Join-Path $dir "$id.jpg"
  if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 3kb)) { Write-Host "SKIP $id"; continue }
  curl.exe -sS -L --max-time 30 -o $dest "https://i.ytimg.com/vi/$id/hqdefault.jpg"
  if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 3kb)) {
    Write-Host "OK   $id ($([math]::Round((Get-Item $dest).Length/1kb))KB)"
  } else {
    Write-Host "FAIL $id"
    if (Test-Path $dest) { Remove-Item $dest }
  }
}
Write-Host "DONE"
