# 生成上海区县简化 GeoJSON（矩形近似，用于纸板叠层 3D 地图）
$districts = @(
  @{ adcode=310101; name="黄浦区"; center=@(121.4846, 31.2317); lon1=121.468; lon2=121.510; lat1=31.210; lat2=31.245 },
  @{ adcode=310104; name="徐汇区"; center=@(121.4372, 31.1882); lon1=121.405; lon2=121.478; lat1=31.172; lat2=31.215 },
  @{ adcode=310105; name="长宁区"; center=@(121.4098, 31.2204); lon1=121.380; lon2=121.435; lat1=31.200; lat2=31.240 },
  @{ adcode=310106; name="静安区"; center=@(121.4485, 31.2288); lon1=121.428; lon2=121.470; lat1=31.213; lat2=31.250 },
  @{ adcode=310107; name="普陀区"; center=@(121.3955, 31.2496); lon1=121.370; lon2=121.428; lat1=31.232; lat2=31.282 },
  @{ adcode=310109; name="虹口区"; center=@(121.4883, 31.2642); lon1=121.462; lon2=121.518; lat1=31.245; lat2=31.285 },
  @{ adcode=310110; name="杨浦区"; center=@(121.5261, 31.2595); lon1=121.502; lon2=121.575; lat1=31.250; lat2=31.300 },
  @{ adcode=310115; name="浦东新区"; center=@(121.5447, 31.2213); lon1=121.505; lon2=121.660; lat1=31.140; lat2=31.315 },
  @{ adcode=310112; name="闵行区"; center=@(121.3817, 31.1129); lon1=121.345; lon2=121.445; lat1=31.038; lat2=31.148 },
  @{ adcode=310113; name="宝山区"; center=@(121.4894, 31.4055); lon1=121.420; lon2=121.505; lat1=31.310; lat2=31.420 },
  @{ adcode=310114; name="嘉定区"; center=@(121.2655, 31.3756); lon1=121.215; lon2=121.345; lat1=31.320; lat2=31.425 },
  @{ adcode=310117; name="松江区"; center=@(121.2274, 31.0323); lon1=121.175; lon2=121.325; lat1=30.995; lat2=31.085 },
  @{ adcode=310118; name="青浦区"; center=@(121.1242, 31.1498); lon1=121.048; lon2=121.208; lat1=31.078; lat2=31.185 },
  @{ adcode=310120; name="奉贤区"; center=@(121.4741, 30.9182); lon1=121.395; lon2=121.555; lat1=30.875; lat2=30.975 },
  @{ adcode=310116; name="金山区"; center=@(121.3420, 30.7420); lon1=121.275; lon2=121.462; lat1=30.698; lat2=30.808 },
  @{ adcode=310151; name="崇明区"; center=@(121.3975, 31.6230); lon1=121.240; lon2=121.760; lat1=31.475; lat2=31.740 }
)

$features = foreach ($d in $districts) {
  $lons = @($d.lon1, $d.lon1, $d.lon2, $d.lon2)
  $lats = @($d.lat2, $d.lat1, $d.lat1, $d.lat2)
  $coords = for ($i = 0; $i -lt 4; $i++) {
    $r = ,@($lons[$i], $lats[$i])
    $r
  }
  $coords += ,@($lons[0], $lats[0])  # close ring
  $coords = ,$coords  # wrap in ring array (polygon's rings)
  $coords = ,$coords  # wrap in polygon array (= MultiPolygon coordinates)

  @{
    type = "Feature"
    properties = @{
      adcode = $d.adcode
      name = $d.name
      center = $d.center
    }
    geometry = @{
      type = "MultiPolygon"
      coordinates = $coords
    }
  }
}

$featureCollection = @{
  type = "FeatureCollection"
  features = $features
}

$json = $featureCollection | ConvertTo-Json -Depth 10 -Compress
Set-Content -Path "assets/data/shanghai.json" -Value $json -Encoding UTF8
Write-Host "Generated assets/data/shanghai.json"
