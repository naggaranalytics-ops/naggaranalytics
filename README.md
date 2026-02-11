# Naggar Analytics Website

This is a multi-page static website built with HTML, Tailwind CSS (via CDN), and Vanilla JavaScript.

## 📂 Project Structure

```
/
├── index.html          # Home Page (Regression, Significance, Process)
├── services.html       # Services Page
├── portfolio.html      # Portfolio Page
├── about.html          # About Us Page
├── careers.html        # Careers Page
├── faq.html            # FAQ Page
└── assets/
    ├── css/
    │   └── style.css   # Main custom styles (Animations, Glass effects)
    └── js/
        ├── main.js     # Global scripts (Particles, Mobile Menu)
        └── home.js     # Homepage-only scripts (Charts, Timeline)
```

## 🛠️ How to Edit

Since this is a simple static site, you don't need any complex tools. You can edit the files directly in any text editor (like VS Code, Notepad++, etc).

### 1. Changing Text
Open the relevant `.html` file and look for the text you want to change.
*   **Example**: To change a service price, open `services.html`, search for `$249`, and replace it.

### 2. Changing the Menu
The Navigation Bar is repeated in every HTML file (Lines ~20-60). 
*   **Important**: If you add a new link to the menu, you must copy-paste the new Navigation section into ALL `.html` files to keep them consistent.

### 3. Changing Colors/Styles
*   **Global Styles**: Edit `assets/css/style.css`.
*   **Tailwind Classes**: You can change classes directly in the HTML (e.g., changing `text-white` to `text-gray-500`).

## 🚀 How to Deploy (Cloudflare Pages)

1.  **GitHub**:
    *   Create a new Repository on GitHub (e.g., `naggar-analytics-site`).
    *   Upload all these files to that repository.
2.  **Cloudflare Pages**:
    *   Log in to Cloudflare Dashboard > Pages.
    *   Click "Connect to Git" and select your new repository.
    *   **Build Settings**:
        *   **Framework**: None / Static HTML
        *   **Build directory**: (Leave empty or put `/` if asked)
    *   Click "Save and Deploy".

## 📱 Mobile Menu Fix
The mobile menu has been fixed to sit *above* the background particles using `z-index: 9999`.

## ⚠️ Note for Future Developers
This site uses Tailwind via CDN for simplicity of editing. For a production environment with high traffic, it is recommended to set up a proper Tailwind build step to generate a minified CSS file, but strictly speaking, it will work fine as-is for a small business site.
