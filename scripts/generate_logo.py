from PIL import Image, ImageDraw

def create_logo():
    # 150x150 transparent
    size = (150, 150)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Background: Circle
    # Color: #667eea (approx (102, 126, 234))
    bg_color = (102, 126, 234, 255)
    
    # Draw circle
    margin = 5
    draw.ellipse([margin, margin, size[0]-margin, size[1]-margin], fill=bg_color)

    # Draw "Z" in white
    # 150x150 context
    line_width = 18
    line_color = (255, 255, 255, 255)

    # Coordinates
    # Top Left
    x1, y1 = 45, 45
    # Top Right
    x2, y2 = 105, 45
    # Bottom Left
    x3, y3 = 45, 105
    # Bottom Right
    x4, y4 = 105, 105

    # To make the corners look nice, we can manually draw circles at joints or just use a polygon
    # Polygon for Z
    # We want a thick Z.
    
    # Let's define polygon points for a thick Z
    thickness = 15
    # Top bar
    # (x1, y1) -> (x2, y2)
    
    # Let's stick to lines for simplicity, but adjust coordinates to overlap cleanly
    draw.line([(x1, y1), (x2, y2)], fill=line_color, width=line_width)
    draw.line([(x2, y1), (x3, y4)], fill=line_color, width=line_width) # Diagonal top-right to bottom-left
    draw.line([(x3, y4), (x4, y4)], fill=line_color, width=line_width)

    img.save('public/logo_150x150.png', 'PNG')
    print("Logo created at public/logo_150x150.png")

if __name__ == "__main__":
    create_logo()
