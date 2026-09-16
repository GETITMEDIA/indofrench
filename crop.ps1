Add-Type -AssemblyName System.Drawing

$srcFile = "C:\Users\Admin\.gemini\antigravity-ide\brain\7f49d5df-0444-410e-a92a-3440d1cca02e\.user_uploaded\media_1789534933024.png"
$img = [System.Drawing.Bitmap]::FromFile($srcFile)

function CropAndSave($x, $y, $w, $h, $outFile) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, $img.PixelFormat)
    $cropped.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
    Write-Host "Saved $outFile ($w x $h)"
}

# Image 1: Top-Left woman sleeping on pillow
# Starts around x: 552, y: 35, width: ~174, height: ~210
CropAndSave 552 35 174 210 "d:\office_project_siva\indofrench\assets\good-mattress-sleep-1.jpg"

# Image 2: Right tall wooden bed
# Starts around x: 742, y: 16, width: ~240, height: ~412
CropAndSave 742 16 240 412 "d:\office_project_siva\indofrench\assets\good-mattress-bed.jpg"

# Image 3: Bottom-Left woman sleeping
# Starts around x: 552, y: 260, width: ~238, height: ~200
CropAndSave 552 260 238 200 "d:\office_project_siva\indofrench\assets\good-mattress-sleep-2.jpg"

$img.Dispose()
