# RCB Fan Website - Media Reference Guide

This guide shows you where sample media content is used throughout the website and provides suggestions for replacing them with actual RCB content.

## 📁 Directory Structure

```
assets/
├── images/
│   ├── players/          # Player photos and action shots
│   ├── hero/            # Hero slider background images
│   ├── news/            # News article images
│   ├── gallery/         # Photo gallery and moments
│   └── logos/           # RCB logos and branding
└── videos/              # Video content and highlights
```

## 🏏 Sample Content Added

### **Player Images** (`assets/images/players/`)
Sample placeholder images for:
- `virat-kohli.jpg` - Team captain portrait
- `faf-du-plessis.jpg` - Captain action shot
- `glenn-maxwell.jpg` - All-rounder batting
- `mohammed-siraj.jpg` - Fast bowler in action
- `dinesh-karthik.jpg` - Wicket-keeper batting
- `josh-hazlewood.jpg` - Pace bowler delivery

**Where to find real images:**
- RCB Official Website: https://www.royalchallengers.com/
- IPL Official Website: https://www.iplt20.com/teams/royal-challengers-bangalore
- Player Instagram accounts
- Getty Images (with proper licensing)
- BCCI Official Archives

### **Hero Section Images** (`assets/images/hero/`)
Sample backgrounds for hero slider:
- `hero-1.jpg` - Stadium atmosphere with crowd
- `hero-2.jpg` - Team celebration moment
- `hero-3.jpg` - Match action shot
- `hero-background.jpg` - M. Chinnaswamy Stadium

**Where to find real images:**
- RCB match highlights from IPL
- Stadium photos from M. Chinnaswamy
- Team celebration moments
- Official RCB photography

### **News Images** (`assets/images/news/`)
Sample news article images:
- `news-1.jpg` - Training session photo
- `news-2.jpg` - Press conference
- `news-3.jpg` - Match preparation
- `news-4.jpg` - Fan engagement event

### **Gallery Images** (`assets/images/gallery/`)
Sample photo gallery content:
- `gallery-1.jpg` - Team photo
- `gallery-2.jpg` - Victory celebration
- `gallery-3.jpg` - Fan moments
- `gallery-4.jpg` - Behind-the-scenes
- `gallery-5.jpg` - Training ground
- `gallery-6.jpg` - Match highlights

### **Video Content** (`assets/videos/`)
Sample video placeholders:
- `team-intro.mp4` - Team introduction video
- `highlights-reel.mp4` - Match highlights compilation
- `player-interview.mp4` - Player interview sample
- `training-montage.mp4` - Training session montage
- `fan-anthem.mp4` - RCB fan anthem video

**Where to find real videos:**
- RCB Official YouTube Channel
- IPL Official Video Library
- Player social media content
- Match broadcasts and highlights

## 🔄 How to Replace Sample Content

### **Step 1: Download Real Content**
1. Visit official RCB sources
2. Download high-quality images (minimum 1920x1080 for hero images)
3. Ensure proper licensing/usage rights

### **Step 2: Optimize Images**
```bash
# Recommended image sizes:
- Hero images: 1920x1080px (landscape)
- Player photos: 400x500px (portrait)
- News images: 800x450px (landscape)
- Gallery images: 600x400px (landscape)
```

### **Step 3: Replace Files**
1. Keep the same filename as the sample
2. Or update the HTML/CSS references to new filenames
3. Ensure file formats are web-optimized (JPEG for photos, PNG for logos)

### **Step 4: Update Alt Text**
Update image alt attributes in HTML files for better accessibility and SEO.

## 📺 Video Integration Points

### **Homepage (`index.html`)**
- Hero video background (line ~150)
- Featured highlights section (line ~280)
- Player spotlight videos (line ~320)

### **Squad Page (`pages/squad.html`)**
- Player introduction videos in modals
- Team training montage

### **Future Pages**
- Match highlights in Matches section
- Behind-the-scenes content in News section
- Historical moments in Hall of Fame

## 🎨 Sample Image Placeholders

All sample images use these placeholder services:
- **Unsplash**: High-quality cricket and sports photos
- **Placeholder.com**: Sized placeholder images
- **Lorem Picsum**: Random sample images

**Sample Image URLs Used:**
```html
<!-- Hero Images -->
<img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop" alt="Cricket Stadium">

<!-- Player Images -->
<img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop" alt="Cricket Player">

<!-- News Images -->
<img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=450&fit=crop" alt="Cricket News">
```

## 📋 Content Replacement Checklist

- [ ] Replace hero slider images (3 images)
- [ ] Update player photos (6 main players)
- [ ] Add news article images (4+ images)
- [ ] Create photo gallery (6+ images)
- [ ] Add video content (5+ videos)
- [ ] Update logos with official RCB branding
- [ ] Optimize all images for web performance
- [ ] Update alt text for accessibility
- [ ] Test loading times after replacement

## 🔗 Official RCB Resources

- **Website**: https://www.royalchallengers.com/
- **YouTube**: https://www.youtube.com/c/royalchallengersbangalore
- **Instagram**: https://www.instagram.com/royalchallengersbangalore/
- **Twitter**: https://twitter.com/RCBTweets
- **Facebook**: https://www.facebook.com/RCBTweets

## ⚖️ Legal Considerations

- Always check image/video licensing before use
- Prefer official RCB content or properly licensed stock images
- Credit photographers/sources when required
- Avoid using copyrighted material without permission

---

**Note**: All sample content is temporary and should be replaced with official RCB media for production use.