# Personal Portfolio

A clean, static portfolio site — plain HTML, one stylesheet, one tiny script.
No build tools, no frameworks, nothing to break. It runs anywhere and deploys
free on GitHub Pages.

---

## 1. What's already filled in

Name, email (nitya.kansal2020@gmail.com), LinkedIn, and GitHub links are wired
in across every page. The only thing left is your **CV PDF** (below), plus an
**Instagram** link when you're ready — a ready-to-uncomment row is waiting in
`contact.html`.

### Add your CV PDF
1. The `assets/` folder already exists next to the HTML files.
2. Drop your resume in it as `assets/nitya-kansal-cv.pdf`.
3. That's the path the CV page's "Download PDF" button already points to.

### Fill in the Instagram handle
Three files link to the Bookish Beginnings Instagram with a `YOUR_HANDLE`
placeholder: `gallery.html`, `impact.html`, and `contact.html`. Find-and-replace
`YOUR_HANDLE` with the real handle in one step.

### Add photos to the Gallery
The gallery holds hundreds of photos across events and categories (Bookish
Beginnings, Awards, Certificates, In the News). It's **data-driven**: you edit
**one file, `gallery-data.js`** — no HTML. The page shows one cover per event;
visitors click an event to see all its photos, and click a photo to view it
fullscreen with next/previous arrows.

**To add an event:**
1. Create a folder for it under `assets/images/`, e.g. `assets/images/book-2024-fall/`,
   and drop the photos in.
2. Open `gallery-data.js`, copy an existing album `{ ... }` block, and set the
   `title`, `date`, `cover`, and the `photos` list. (For a newsletter feature,
   add a `link:` with the public URL.)
3. Save. That's it — the gallery rebuilds itself.

**Recommended folder layout**
```
assets/images/
  book-2023-spring/   cover.jpg  2.jpg  3.jpg ...
  award-women-icon/   cover.jpg ...
  certificates/       cpr.jpg  stop-the-bleed.jpg ...
  press-newsletter-2024/  cover.jpg ...
```

> **Resize before uploading — important with hundreds of photos.** Full-res phone
> photos (3–8 MB each) will bloat the repo and slow the site. Resize to ~1600px
> wide first. Quick one-liner (needs [ImageMagick](https://imagemagick.org)):
> ```
> magick mogrify -resize 1600x1600\> -quality 82 assets/images/EVENT-FOLDER/*.jpg
> ```
> GitHub Pages also has soft limits (~1 GB site, 100 GB/month bandwidth), so
> keeping images web-sized matters.

> **Privacy:** for certificates, letters, or newsletter screenshots that show
> **other people's** names, emails, or signatures, redact them first — or link to
> the public page instead of posting a private image. Your own certificates and
> public newsletters are fine to show as-is.

---

## 2. How the site is organized

```
index.html        Home (hero + highlights)
about.html        About + short journey timeline
experience.html   Clinical prep + community/leadership experience
research.html     Research interests, projects, publications, presentations
impact.html       Service & leadership (labeled "Service" in the nav)
awards.html       Awards & honors
cv.html           Curriculum vitae + PDF download
timeline.html     Full timeline
contact.html      Contact details
styles.css        All styling (design system lives here)
script.js         Mobile menu, active nav link, footer year
```

Every page shares the **same header and footer** block. The look of the whole
site is controlled by the tokens at the top of `styles.css` (`:root { ... }`) —
change a color or font once there and it updates everywhere.

---

## 3. How to update content (the common cases)

You don't need to know CSS. Copy an existing block and edit the text.

**Add an award** — in `awards.html`, copy one `<li class="record">…</li>` block
and change the title, description, and year.

**Add a project or publication** — in `research.html`, copy a `<article class="card">`
(for projects) or an `<li class="record">` (for publications) and edit it.

**Add an experience or service item** — in `experience.html` / `impact.html`,
copy a `<article class="card">…</article>` block.

**Add a timeline milestone** — in `timeline.html`, copy a
`<div class="timeline__item">…</div>` block (newest goes at the bottom).

Each file has an `<!-- ADD: ... -->` comment showing exactly which block to copy.

---

## 4. How to add a whole new page (scales for years)

1. **Copy the closest existing page** (e.g. `research.html`) to a new file,
   e.g. `presentations.html`.
2. Change the `<title>`, the `<h1>`/page heading, and the body content.
3. **Add it to the nav** — add one `<li>` to the `.nav__links` list. Because the
   nav is repeated on every page, add the same `<li>` to each file's header.
   *(Tip: use "Find in Files" to locate the nav and paste into each.)*
4. Done. The active-link highlight and mobile menu work automatically.

> Adding sections you mentioned wanting later — presentations/conferences,
> a blog/reflections, more shadowing — is just "copy a page, add a nav link."

---

## 5. Preview locally

Just double-click any `.html` file to open it in your browser. That's it — no
server needed. (For a closer-to-production preview you can run
`python3 -m http.server` in this folder and visit `http://localhost:8000`.)

---

## 6. Publish on GitHub Pages (free)

1. Create a new repository on GitHub.
   - For a URL like `https://<username>.github.io`, name the repo
     **`<username>.github.io`**.
   - For a URL like `https://<username>.github.io/portfolio`, name it anything
     (e.g. `portfolio`).
2. Upload these files to the repo (drag-and-drop in the GitHub web UI works, or
   use `git`).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source: Deploy from a branch**, then
   choose branch **`main`** and folder **`/ (root)`**. Save.
5. Wait ~1 minute, then reload the Pages settings page for your live URL.

No Jekyll/Actions config needed — GitHub serves the HTML as-is. (An empty
`.nojekyll` file is included so GitHub never tries to process it.)

**To update the live site later:** edit a file and push/upload it again. Pages
redeploys automatically.

---

## 7. Design notes (for when you want to tweak the look)

- **Colors & fonts:** all in `:root` at the top of `styles.css`. Change
  `--accent` to reskin the accent color everywhere.
- **Accessibility:** semantic HTML, a skip link, keyboard focus styles, and a
  `prefers-reduced-motion` guard are already in place. Keep image `alt` text and
  good heading order when you add content.
- **Print:** the site has a print stylesheet, so a committee can print any page
  as a clean document.
