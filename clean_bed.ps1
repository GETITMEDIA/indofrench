Add-Type -AssemblyName System.Drawing

# 1. Clean up good-mattress-bed.jpg (patch the whatsapp icon at bottom right)
$bedPath = "d:\office_project_siva\indofrench\assets\good-mattress-bed.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($bedPath)

# Dark brown wood color samples from the bed base around (240, 480)
# Let's clone wood texture from x: 180-240, y: 430-520 into x: 260-322, y: 430-525
for ($y = 425; $y -lt 525; $y++) {
    for ($x = 260; $x -lt 322; $x++) {
        $sourceX = $x - 60
        if ($sourceX -lt 160) { $sourceX = 160 }
        $pixelColor = $bmp.GetPixel($sourceX, $y)
        $bmp.SetPixel($x, $y, $pixelColor)
    }
}
$bmp.Save("d:\office_project_siva\indofrench\assets\good-mattress-bed-clean.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()

Write-Host "Cleaned good-mattress-bed-clean.jpg"
