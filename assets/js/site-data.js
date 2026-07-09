/* =========================================================================
   SITE DATA — the SINGLE source of truth for facts shown in MORE THAN ONE
   place on the site. Change a value here once and every page updates.

   HOW IT WORKS (you don't need to touch any HTML)
     - Wherever a page shows one of these facts, the HTML is marked with
         data-site="key"        → fills in the text  (e.g. the books number)
         data-site-href="key"   → fills in a link's URL
       and site.js copies the value from here into it when the page loads.
     - The "awards" list below is rendered on THREE pages automatically:
       the Awards page, the CV page, and the Service page. Edit it once here.

   SO, TO UPDATE:
     • Books donated, org name, Instagram, email, socials → edit a value below.
     • Add / edit an award → edit the "awards" list below (copy a line).
   ========================================================================= */

window.SITE = {

  /* ---- Bookish Beginning ---- */
  orgName:      'Bookish Beginning',
  booksDonated: '4,000+',                                   // number shown in "N books donated"
  instagramUrl: 'https://www.instagram.com/YOUR_HANDLE',   // EDIT: real Instagram handle

  /* ---- Contact & social (used in every footer + the Contact page) ---- */
  email:       'nitya.kansal2020@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/nitya-kansal',
  githubUrl:   'https://github.com/nitya-kansal',
  location:    'Seattle, Washington',

  /* ---- Awards & honors ----
     Shown on the Awards page, the CV page, and the Service page.
     year : use '' if you don't have one yet — it displays as "—".
     desc : optional one-line description.
     cats : OPTIONAL — extra Service-page category ids besides 'honors'
            (see the ids in service-data.js, e.g. 'leadership', 'community'). */
  awards: [
    { title: 'National Merit Finalist', year: '2024', desc: 'National recognition for academic excellence.' },
    { title: 'Purple Comet Math Competition — 1st Place (Team Lead)', year: '', desc: 'Led team to first place, Massachusetts.', cats: ['leadership'] },
    { title: 'Women Icon Award', year: '2025', desc: 'Recognized for leadership and advocacy.', cats: ['leadership'] },
    { title: 'Voice of Youth Award', year: '', desc: 'Honored for community advocacy and youth impact.', cats: ['community'] }
    // ADD: copy a line above and edit it for each new award (mind the comma).
  ]
};
