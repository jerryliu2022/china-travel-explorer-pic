# 生成上海景点占位图片
$spots = @(
    @{id="waitan"; name="外滩"; color="#C0392B"},
    @{id="dongfangmingzhu"; name="东方明珠塔"; color="#2980B9"},
    @{id="yuyuan"; name="豫园"; color="#27AE60"},
    @{id="shanghaizhongxin"; name="上海中心大厦"; color="#8E44AD"},
    @{id="nanjinglu"; name="南京路步行街"; color="#D35400"},
    @{id="shanghaibowuguan"; name="上海博物馆"; color="#16A085"},
    @{id="tianzifang"; name="田子坊"; color="#F39C12"},
    @{id="xintiandi"; name="新天地"; color="#E74C3C"},
    @{id="jingansi"; name="静安寺"; color="#2C3E50"},
    @{id="disney"; name="上海迪士尼"; color="#9B59B6"},
    @{id="zhujiajiao"; name="朱家角古镇"; color="#1ABC9C"},
    @{id="shiboyuan"; name="中华艺术宫"; color="#E67E22"}
)

Add-Type -AssemblyName System.Drawing

$dir = "assets/img"
foreach ($spot in $spots) {
    $path = Join-Path $dir "$($spot.id).jpg"
    if (Test-Path $path) { continue }

    $bmp = New-Object System.Drawing.Bitmap 512, 400
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "HighQuality"

    # 背景色
    $color = [System.Drawing.ColorTranslator]::FromHtml($spot.color)
    $brush = New-Object System.Drawing.SolidBrush($color)
    $g.FillRectangle($brush, 0, 0, 512, 400)

    # 渐变效果
    $lightBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(40, 255, 255, 255))
    $g.FillEllipse($lightBrush, -80, -50, 350, 350)

    # 文字
    $font = New-Object System.Drawing.Font("KaiTi", 36, [System.Drawing.FontStyle]::Bold)
    $textBrush = [System.Drawing.Brushes]::White
    $fmt = New-Object System.Drawing.StringFormat
    $fmt.Alignment = "Center"
    $fmt.LineAlignment = "Center"
    $g.DrawString($spot.name, $font, $textBrush, 256, 160, $fmt)

    # 副标题
    $font2 = New-Object System.Drawing.Font("Arial", 14, [System.Drawing.FontStyle]::Italic)
    $g.DrawString("Shanghai · 3D Travel Map", $font2, $textBrush, 256, 240, $fmt)

    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Generated: $path"
}
Write-Host "All placeholder images created!"
