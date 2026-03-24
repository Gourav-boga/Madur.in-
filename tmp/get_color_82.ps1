Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('C:\Users\AKHIL KUMAR\OneDrive\Desktop\madur.in\public\new-logo-82.png')
$bitmap = New-Object System.Drawing.Bitmap($img)
$color = $bitmap.GetPixel(0, 0)
Write-Host ("#{0:X2}{1:X2}{2:X2}" -f $color.R, $color.G, $color.B)
