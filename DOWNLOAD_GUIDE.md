# 3D Models & Sounds Download Guide

## Step 1: Download 3D Models

Download these files and save them to `/public/models/`:

### Desk Lamp
1. Go to: https://polyhaven.com/a/desk_lamp_arm_01
2. Click "Download" → Select "GLTF" format
3. Extract and rename the `.glb` file to `desk-lamp.glb`
4. Place in: `/public/models/desk-lamp.glb`

### Notebook
1. Go to: https://sketchfab.com/3d-models/notebook-b58d334fb340449589e1efb9dc3e6119
2. Click "Download 3D Model" (need free account)
3. Select "GLTF" format
4. Extract and rename to `notebook.glb`
5. Place in: `/public/models/notebook.glb`

### Desk (Wooden Table)
1. Go to: https://polyhaven.com/a/WoodenTable_01
2. Click "Download" → Select "GLTF" format
3. Extract and rename to `desk.glb`
4. Place in: `/public/models/desk.glb`

### Bookshelf
1. Go to: https://sketchfab.com/3d-models/dusty-old-bookshelf-free-6c5ac2547db34c3c81b2e4808b000386
2. Download as GLTF
3. Rename to `bookshelf.glb`
4. Place in: `/public/models/bookshelf.glb`

### Vinyl Record Player
1. Go to: https://sketchfab.com/3d-models/vinyl-record-player-b773bec3e11a4d27aa5febc5c32b608c
2. Download as GLTF
3. Rename to `vinyl-player.glb`
4. Place in: `/public/models/vinyl-player.glb`

---

## Step 2: Download Sound Effects

Download sounds and save them to `/public/sounds/`:

### From Freesound.org (free account required):
- Search "lamp switch click" → save as `lamp-click.mp3`
- Search "page turn paper" → save as `page-turn-1.mp3` and `page-turn-2.mp3`
- Search "vinyl record crackle" → save as `vinyl-crackle.mp3`
- Search "quiet room ambience" → save as `ambient-room.mp3`

### Your Background Music:
- Add any lofi/ambient track as `your-song.mp3`

---

## Final Folder Structure

```
portfolio/
├── public/
│   ├── models/
│   │   ├── desk-lamp.glb
│   │   ├── notebook.glb
│   │   ├── desk.glb
│   │   ├── bookshelf.glb
│   │   └── vinyl-player.glb
│   ├── sounds/
│   │   ├── lamp-click.mp3
│   │   ├── page-turn-1.mp3
│   │   ├── page-turn-2.mp3
│   │   ├── vinyl-crackle.mp3
│   │   ├── ambient-room.mp3
│   │   └── your-song.mp3
│   └── images/
│       └── projects/
│           └── (your project screenshots)
```

---

**Note:** The app will work with placeholder geometries if models aren't present. You can add them later!
