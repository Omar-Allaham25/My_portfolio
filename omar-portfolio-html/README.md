# Omar Allahham Portfolio v2 — "The Developer's Observatory"

An immersive, interactive static portfolio built with pure HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies.

## ✨ Features

- **Particle Constellation Canvas** — Interactive starfield that responds to mouse movement
- **Typing Effect** — Animated role cycling on the hero
- **Orbital Avatar** — Your photo with orbiting tech icons and glowing rings
- **3D Tilt Cards** — Projects and credentials tilt on hover
- **Magnetic Buttons** — Buttons subtly follow your cursor
- **Scroll Progress Bar** — Cyan-to-purple gradient bar at the top
- **Skill Constellations** — Animated skill nodes with level bars
- **Terminal Contact** — macOS-style terminal showing contact info
- **Project Filtering** — Filter by status (Shipped/In Progress/Planned)
- **Animated Timeline** — Experience with glowing line and pulsing active marker
- **Fully Responsive** — Works on mobile, tablet, and desktop
- **Reduced Motion** — Respects `prefers-reduced-motion`

## 📁 Project Structure

```
omar-portfolio-html/
├── index.html          # Home page (hero + featured projects)
├── about.html          # Bio + credentials
├── skills.html         # Interactive skill constellation
├── experience.html     # Animated timeline
├── projects.html       # Filterable project showcase
├── contact.html        # Terminal + contact form
├── css/
│   └── main.css        # All styles (space theme)
├── js/
│   └── main.js         # All interactions (canvas, animations, etc.)
└── README.md           # This file
```

## 🚀 How to Run

### Option 1: Open Directly
Simply double-click `index.html` — it works in any browser instantly.

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .

# Using VS Code Live Server extension
# Just right-click index.html → "Open with Live Server"
```
Then open `http://localhost:8080`

### Option 3: Deploy Online (Free)

**GitHub Pages:**
1. Push this folder to a GitHub repo
2. Go to Settings → Pages → Source: Deploy from Branch → main → / (root)
3. Your site is live at `https://yourusername.github.io/repo-name/`

**Netlify:**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop this folder
3. Instant live URL

**Vercel:**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Deploy instantly

**Cloudflare Pages:**
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repo
3. Deploy

## 🛠️ Customization

### Colors
Edit CSS variables at the top of `css/main.css`:
```css
--accent-cyan: #00d4ff;
--accent-purple: #a855f7;
--accent-pink: #ec4899;
```

### Content
Edit the HTML files directly — each page is self-contained and easy to read.

### Photo
Your photo is currently linked from your existing portfolio. To use a local image:
1. Add `photo.jpg` to the project root
2. Replace `https://omar-portfolio.lahamomar25.workers.dev/photo.jpg` with `./photo.jpg` in `index.html` and `about.html`

### Contact Form
The form is set up for **Formspree** (free). To enable it:
1. Go to [formspree.io](https://formspree.io) and create a form
2. Replace `YOUR_FORM_ID` in `contact.html` with your actual form ID
3. That's it — form submissions go to your email

## 📄 License

MIT — Built with curiosity & caffeine.
