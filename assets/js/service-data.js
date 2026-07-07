/* =========================================================================
   SERVICE DATA — the ONLY file you edit to manage the Service page.
   No HTML needed. The Service page reads this and builds itself:
   the category tabs (multi-select) AND the cards below them.

   HOW IT WORKS
     categories  →  the tabs shown at the top, in this exact order.
                    An "All" tab is added automatically as the first tab.
     items       →  each entry (a role, award, experience, etc.).
                    Every item lists which categories it belongs to via
                    "cats" — it will show under EACH of those tabs, and its
                    categories appear as little labels on the card.

     Tabs are MULTI-SELECT: a visitor can turn on several at once and see
     every item that matches ANY of the selected tabs. "All" clears them.

   TO ADD AN ENTRY
     Copy an existing { ... } item block below and edit:
       title  – the headline (role / award / experience name)
       meta   – small line above the title (organization, your role, etc.)
       date   – any text: "2024", "2023 – present", "Summer 2025", ...
       body   – 1–2 sentence description
       cats   – one or more category ids from the list below (see the id: '…')
       link   – OPTIONAL { href, label } for an external link
     Save. Done. Empty categories simply show "nothing here yet" until you
     add an item to them — that's expected as the page grows.

   NOTE: Awards & honors are NOT listed here — they come from the shared
   "awards" list in site-data.js and appear automatically under the
   "Honors / Awards / Recognitions" tab. Edit awards there, once.
   ========================================================================= */

// Shared facts (books donated, Instagram, etc.) come from site-data.js,
// which loads before this file. Fall back to plain values if it's missing.
var SITE = window.SITE || {};

window.SERVICE = {

  /* The tabs, in display order. "id" is what you reference in an item's
     "cats". "name" is the label shown on the tab. Edit names freely;
     if you change an id, update any items that use it.                     */
  categories: [
    { id: 'artistic',      name: 'Artistic Endeavors' },
    { id: 'med-community', name: 'Medical Community Service' },
    { id: 'community',     name: 'Community Service' },
    { id: 'conferences',   name: 'Conferences Attended' },
    { id: 'clubs',         name: 'Clubs' },
    { id: 'hobbies',       name: 'Hobbies' },
    { id: 'honors',        name: 'Honors / Awards / Recognitions' },
    { id: 'leadership',    name: 'Leadership' },
    { id: 'clinical',      name: 'Medical / Clinical Experience' },
    { id: 'shadowing',     name: 'Physician Shadowing / Clinical Observation' },
    { id: 'presentations', name: 'Presentations / Posters' },
    { id: 'publications',  name: 'Publications' },
    { id: 'research',      name: 'Research / Lab' },
    { id: 'advocacy',      name: 'Social Justice / Advocacy' },
    { id: 'teaching',      name: 'Teaching / Tutoring' }
  ],

  items: [
    {
      title: SITE.orgName || 'Bookish Beginning',
      meta: 'Founder & Lead · Literacy Initiative',
      date: '2023 – present',
      body: 'A literacy initiative I founded to expand book access for underserved communities — organizing donations, distribution, and outreach. ' +
            (SITE.booksDonated || '4,000+') + ' books donated to date.',
      cats: ['leadership', 'community', 'advocacy'],
      link: { href: SITE.instagramUrl || 'https://www.instagram.com/YOUR_HANDLE', label: 'Instagram ↗' }
    },
    {
      title: (SITE.booksDonated || '4,000+') + ' books donated',
      meta: 'Recognized by Kentlake High School',
      date: '2023',
      body: 'Recognized for donating ' + (SITE.booksDonated || '4,000+') + ' books to communities with limited access to reading materials — a concrete measure of the initiative\'s reach.',
      cats: ['community'],
      link: { href: 'gallery.html', label: 'See photos & recognition →' }
    },
    {
      title: 'North Creek High School Science Bowl',
      meta: 'Founder & Lead',
      date: '',   // EDIT: add the years, e.g. '2021 – 2023'
      body: 'Founded the North Creek High School Science Bowl team and led it for two years, guiding members to regional competition.',
      cats: ['leadership', 'clubs']
    },
    {
      title: 'CPR & Stop the Bleed certified',
      meta: 'Emergency response training',
      date: '2024',
      body: 'Completed CPR and Stop the Bleed certifications; NAC (Nursing Assistant Certified) in progress.',
      cats: ['clinical']
    }

    // ADD: copy a block above (from { to }) and edit it for each new entry.
    // Remember the comma between items.
    // ,{
    //   title: 'Example role',
    //   meta: 'Organization · your role',
    //   date: '2025 – present',
    //   body: 'One or two sentences describing what you did and its impact.',
    //   cats: ['clinical', 'community'],
    //   link: { href: 'https://example.com', label: 'Learn more ↗' }
    // }
  ]
};
