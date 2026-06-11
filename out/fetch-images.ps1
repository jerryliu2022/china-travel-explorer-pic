# 从中文维基百科 pageimages API 下载北京景点图片
$ErrorActionPreference = "Continue"
$imgDir = "c:\Users\Administrator\projects\china-travel-explorer-pic\assets\img"
New-Item -ItemType Directory -Force -Path $imgDir | Out-Null

$spots = @(
    @{ id = "gugong";       titles = @("紫禁城", "故宫博物院") },
    @{ id = "tiananmen";    titles = @("天安门") },
    @{ id = "tiantan";      titles = @("天坛") },
    @{ id = "yiheyuan";     titles = @("颐和园") },
    @{ id = "badaling";     titles = @("八达岭长城", "八达岭") },
    @{ id = "niaochao";     titles = @("国家体育场 (北京)", "北京国家体育场") },
    @{ id = "beihai";       titles = @("北海公园") },
    @{ id = "yonghegong";   titles = @("雍和宫") },
    @{ id = "nanluoguxiang";titles = @("南锣鼓巷") },
    @{ id = "xiangshan";    titles = @("香山公园", "香山 (北京市)") },
    @{ id = "zhongguozun";  titles = @("中信大厦", "中国尊") },
    @{ id = "shisanling";   titles = @("明十三陵") }
)

foreach ($s in $spots) {
    $dest = Join-Path $imgDir "$($s.id).jpg"
    if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 10kb)) {
        Write-Host "SKIP $($s.id) (exists)"
        continue
    }
    $ok = $false
    foreach ($t in $s.titles) {
        $enc = [uri]::EscapeDataString($t)
        $api = "https://zh.wikipedia.org/w/api.php?action=query&titles=$enc&prop=pageimages&format=json&pithumbsize=900&redirects=1"
        try {
            $json = curl.exe -sS --max-time 20 $api | ConvertFrom-Json
            $page = ($json.query.pages.PSObject.Properties | Select-Object -First 1).Value
            $url = $page.thumbnail.source
            if ($url) {
                curl.exe -sS -L --max-time 60 -o $dest $url
                if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 10kb)) {
                    Write-Host "OK   $($s.id) <- $t ($([math]::Round((Get-Item $dest).Length/1kb))KB)"
                    $ok = $true
                    break
                }
            } else {
                Write-Host "NOIMG $($s.id) page=$t"
            }
        } catch {
            Write-Host "ERR  $($s.id) page=$t : $_"
        }
    }
    if (-not $ok) { Write-Host "FAIL $($s.id)" }
}
Write-Host "DONE"
