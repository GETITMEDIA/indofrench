Add-Type -AssemblyName System.Drawing

$src = "C:\Users\Admin\.gemini\antigravity-ide\brain\7f49d5df-0444-410e-a92a-3440d1cca02e\.user_uploaded\media_1789534933024.png"
$bmp = [System.Drawing.Bitmap]::FromFile($src)

# Let's inspect the exact bounding box of image 3 in media_1789534933024.png:
# In media_1789534933024.png (1024 x 463):
# Image 3 top is around y: 263
# Left is around x: 553
# Right is around x: 790 (width ~237)
# Bottom is around y: 463 (height ~200)

$rect = New-Object System.Drawing.Rectangle(553, 263, 237, 198)
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)
$cropped.Save("d:\office_project_siva\indofrench\assets\good-mattress-sleep-2.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cropped.Dispose()
$bmp.Dispose()

Write-Host "Saved image 3 from user screenshot"
