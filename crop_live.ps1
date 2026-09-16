Add-Type -AssemblyName System.Drawing

$src = "C:\Users\Admin\.gemini\antigravity-ide\brain\7f49d5df-0444-410e-a92a-3440d1cca02e\good_mattress_section_1789535237802.png"
$bmp = [System.Drawing.Bitmap]::FromFile($src)

function CropImage($x, $y, $w, $h, $dest) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $cropped.Save($dest, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
    Write-Host "Saved: $dest ($w x $h)"
}

# 1. Top-Left: Woman sleeping on pillow
CropImage 742 143 234 266 "d:\office_project_siva\indofrench\assets\good-mattress-sleep-1.jpg"

# 2. Right: Tall wooden bed with headboard and lamp
CropImage 996 115 322 525 "d:\office_project_siva\indofrench\assets\good-mattress-bed.jpg"

# 3. Bottom-Left: Woman sleeping peacefully
CropImage 742 425 320 216 "d:\office_project_siva\indofrench\assets\good-mattress-sleep-2.jpg"

$bmp.Dispose()
