/* =========================================================================
   GALLERY DATA — this is the ONLY file you edit to manage your photos.
   No HTML needed. The gallery page reads this and builds itself.

   HOW IT'S ORGANIZED
     categories  →  a group like "Bookish Beginning", "Awards", etc.
       albums    →  one event (a book drive, an award ceremony, ...)
         photos  →  the individual pictures inside that event

   The gallery landing page shows ONE cover per album. Visitors click an
   album to see all its photos, and click a photo to view it fullscreen
   with next/previous arrows.

   TO ADD AN EVENT
     1. Put your image files in assets/images/ (a subfolder per event keeps
        things tidy, e.g. assets/images/book-2023-spring/).
     2. Copy an existing { ... } album block below and edit:
          title   – event name shown on the card
          date    – "YYYY-MM" or "YYYY" (used for the date label + sorting)
          cover   – the one photo shown on the card (path to a file)
          link    – OPTIONAL, an external URL (great for newsletter features)
          photos  – the list of every photo in this event
     3. Save. Done.

   TIPS
     - Keep images web-sized (resize to ~1600px wide) so pages load fast.
       Hundreds of full-resolution phone photos will make the site slow and
       the repo huge — see the README for a one-click resizing tip.
     - caption is optional on each photo.
     - You can leave "photos" with just the cover for now and add the rest later.

   PRIVACY REMINDER: for certificates, letters, or newsletter screenshots that
   show OTHER people's names, emails, or signatures, redact them first (or link
   to the public page instead of posting a private image).
   ========================================================================= */

// Shared facts (books donated, org name, ...) come from site-data.js, which
// loads before this file. Fall back to plain values if it's ever missing.
var SITE = window.SITE || {};

window.GALLERY = {
  categories: [

    /* ---------- 1) BOOKISH BEGINNINGS ---------- */
    {
      id: 'book',
      name: 'Bookish Beginning',
      albums: [
        {
          title: 'Spring 2023 Book Drive',
          date: '2023-04',
          cover: 'assets/images/book-2023-spring/cover.jpg',
          photos: [
            { src: 'assets/images/book-2023-spring/cover.jpg', caption: 'Sorting donated books' },
            { src: 'assets/images/book-2023-spring/2.jpg', caption: 'Boxing up 120 books' },
            { src: 'assets/images/book-2023-spring/3.jpg' }
            // ...add as many as you like
          ]
        },
        {
          title: 'Book Donation — Kentlake HS',
          date: '2023',
          cover: 'assets/images/book-kentlake/cover.jpg',
          photos: [
            { src: 'assets/images/book-kentlake/cover.jpg', caption: 'Recognition for ' + (SITE.booksDonated || '4,000+') + ' books donated' }
          ]
        }
        // ...copy an album block for each additional book event
      ]
    },

    /* ---------- 2) AWARDS ---------- */
    {
      id: 'awards',
      name: 'Awards',
      albums: [
        {
          title: 'Women Icon Award',
          date: '2025',
          cover: 'assets/images/award-women-icon/cover.jpg',
          photos: [
            { src: 'assets/images/award-women-icon/cover.jpg', caption: 'Receiving the Women Icon Award, 2025' }
          ]
        }
        // ...National Merit, Voice of Youth, Purple Comet, etc.
      ]
    },

    /* ---------- 3) CERTIFICATES ---------- */
    {
      id: 'certificates',
      name: 'Certificates',
      albums: [
        {
          title: 'Certifications & Awards Certificates',
          date: '2024',
          cover: 'assets/images/certificates/cover.jpg',
          photos: [
            { src: 'assets/images/certificates/cpr.jpg', caption: 'CPR certification' },
            { src: 'assets/images/certificates/stop-the-bleed.jpg', caption: 'Stop the Bleed' }
          ]
        }
      ]
    },

    /* ---------- 4) IN THE NEWS (newsletters / press) ---------- */
    {
      id: 'press',
      name: 'In the News',
      albums: [
        {
          title: 'Featured in the community newsletter',
          date: '2024',
          cover: 'assets/images/press-newsletter-2024/cover.jpg',
          link: 'https://example.com/the-newsletter',   // ← the public URL you have
          photos: [
            { src: 'assets/images/press-newsletter-2024/cover.jpg', caption: 'Newsletter feature (screenshot)' }
          ]
        }
      ]
    }

  ]
};
