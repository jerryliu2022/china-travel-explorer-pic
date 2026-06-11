$j = Get-Content -Raw 'c:\Users\Administrator\projects\china-travel-explorer-pic\assets\data\beijing.json' | ConvertFrom-Json
foreach ($f in $j.features) {
    Write-Host ($f.properties.name + " | " + $f.geometry.type + " | adcode=" + $f.properties.adcode)
}
