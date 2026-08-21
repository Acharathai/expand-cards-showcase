# Category Explorer

Create a complete, production-ready Category Page for a Telegram Mini App, using the attached reference images as the visual and interaction reference.

REFERENCE IMAGES

Use the attached images directly as design references:

- Reference Image 1: Use this as the primary reference for the initial collapsed Category Page layout, card design, spacing, typography, colors, circular product/category images, and overall visual hierarchy.

- Reference Image 2 and Reference Image 3: Use these as references for what happens when a user taps/opens a category. The category should smoothly expand into a detailed subcategory browsing layout similar to these references.

Do NOT simply copy the screenshots. Recreate the same design language and interaction pattern as a polished, original Telegram Mini App UI.

---

1. PAGE TYPE

Build a complete Categories section/page specifically optimized for a Telegram Mini App on mobile.

The page must feel like a modern premium shopping application while remaining lightweight, clean, highly responsive, and touch-friendly.

The entire UI must fit naturally inside Telegram's Mini App viewport.

Design for approximately:

- Mobile-first layout

- 390px-ish width as the primary design target

- Responsive scaling for smaller and larger phones

- Telegram Mini App safe areas

- No desktop-style layout

- No unnecessary horizontal scrolling

---

2. INITIAL CATEGORY PAGE

The initial state should closely follow Reference Image 1.

At the top, create a clean mobile header containing:

- Back/menu control where appropriate

- Page title: Categories

- Wishlist/favourite icon

- Cart/bag icon

- Small notification/count badge where appropriate

Keep the header spacious and premium.

Below the header, display the main categories as large horizontal rounded cards.

Example structure:

Categories

┌─────────────────────────────────────┐

│  Category Name          ○ ○ ○       │

│                                     │

└─────────────────────────────────────┘

┌─────────────────────────────────────┐

│  Another Category       ○ ○ ○       │

│                                     │

└─────────────────────────────────────┘

Each category card should contain:

- Large category name on the left

- 2–4 overlapping circular product/category images on the right

- Soft pastel background

- Large rounded corners

- Clean typography

- Generous internal spacing

- Subtle depth/shadow

- Touch-friendly dimensions

The cards should feel visually similar to the pink category cards shown in Reference Image 1.

Do not make them look like generic Bootstrap cards.

---

3. CATEGORY CARD DESIGN

Each category card should have:

- Border radius around 18–24px

- Large readable title

- Strong but elegant typography

- Minimal/no border

- Very subtle shadow

- Soft pastel background

- Circular image containers

- Images slightly overlapping each other

- Proper clipping inside circles

- Consistent image sizing

The category cards should have a premium fashion/e-commerce appearance.

Example:

┌────────────────────────────────────────┐

│                                        │

│  TOPWEAR                    ◯ ◯ ◯       │

│                                        │

└────────────────────────────────────────┘

Use the same visual rhythm and proportions as Reference Image 1.

---

4. TAP / EXPAND INTERACTION

This is the MOST IMPORTANT interaction.

When the user taps a category card, do NOT simply navigate immediately to another page.

Instead, create a smooth expand / reveal interaction inspired by Reference Image 2 and Reference Image 3.

The selected category should visually transform from the compact category card into an expanded category section.

Animation flow:

1. User taps category.

2. The card slightly scales down during touch feedback.

3. The selected card smoothly expands.

4. The category title moves into the expanded section header.

5. The category's subcategories smoothly reveal underneath.

6. Other category cards move downward naturally.

7. Subcategory cards fade + slide upward into view.

8. The layout settles without any sudden jump.

Use smooth spring-based animation rather than basic instant transitions.

Suggested animation:

- Duration: 350–500ms

- Easing: spring / cubic-bezier

- Opacity + translateY + scale

- No harsh movement

- No excessive bouncing

---

5. EXPANDED CATEGORY VIEW

After expansion, display a layout inspired by Reference Image 2 and Reference Image 3.

The expanded section should contain:

Category Header

Example:

TOPWEAR                         ˄

────────────────────────────────

Include:

- Category title

- Small decorative divider/accent

- Collapse/expand icon

- Smooth rotating chevron

Then show the subcategories in a 3-column grid.

Example:

┌──────────┐ ┌──────────┐ ┌──────────┐

│          │ │          │ │          │

│  Image   │ │  Image   │ │  Image   │

│          │ │          │ │          │

│ All      │ │ T-Shirts │ │ Shirts   │

└──────────┘ └──────────┘ └──────────┘

┌──────────┐ ┌──────────┐ ┌──────────┐

│  Image   │ │  Image   │ │  Image   │

│          │ │          │ │          │

│ Hoodies  │ │ Sweaters │ │ Jackets  │

└──────────┘ └──────────┘ └──────────┘

Each subcategory card should contain:

- Large product/category image

- Category name

- Rounded corners

- Light neutral/off-white background

- Subtle border

- Minimal shadow

- Proper image cropping

- Consistent card dimensions

The overall visual treatment should feel like the product/category grid from the reference screenshots.

---

6. MULTIPLE CATEGORY SECTIONS

The page must support multiple categories.

Example:

CATEGORIES

[Topwear]

  ├─ All Topwear

  ├─ T-Shirts

  ├─ Shirts

  ├─ Polo T-Shirts

  ├─ Oversized T-Shirts

  ├─ Classic Fit T-Shirts

  ├─ Hoodies

  └─ Sweatshirts

[Bottomwear]

[Footwear]

[Accessories]

[New Arrivals]

[Trending]

[Brands]

Only the selected category should be expanded at a time.

When another category is tapped:

- Current category smoothly collapses

- New category smoothly expands

- Scroll position automatically adjusts if necessary

- No abrupt page reload

- Preserve the user's browsing context

---

7. CATEGORY GRID BEHAVIOUR

Subcategory cards must be fully interactive.

On tap:

- Apply subtle scale-down feedback

- Slight opacity change

- Smooth transition

- Then navigate/open the corresponding product listing

Example:

T-Shirts

      ↓

T-Shirt Product Listing

Do not use fake buttons.

Entire cards should be tappable.

---

8. TOP NAVIGATION

Create a premium mobile top navigation similar in visual quality to the references.

Include:

- Menu/back icon

- Brand/logo area

- Search icon

- Notification icon if required

- Wishlist icon

- Cart/bag icon

Keep icons simple, thin, and elegant.

Avoid oversized icons.

Use consistent stroke width.

The top navigation must remain comfortable inside Telegram's safe area.

---

9. BOTTOM NAVIGATION DOCK

Create a fixed bottom navigation dock specifically designed for the Telegram Mini App.

It should always remain visible while browsing the category page.

Example:

┌──────────────────────────────────────────┐

│  Home    Categories    Search    Account │

└──────────────────────────────────────────┘

Use approximately 4–5 navigation items.

Recommended:

- Home

- Categories

- Search

- Wishlist

- Account

The active Categories item should have a visually stronger state.

Use:

- Icon

- Label

- Active indicator

- Smooth active-state animation

The dock must:

- Stay fixed at the bottom

- Respect Telegram safe-area inset

- Never overlap category content

- Have a clean elevated/card-like appearance

- Use subtle blur/translucency if appropriate

- Feel like a premium native mobile navigation dock

---

10. TYPOGRAPHY

Typography is extremely important.

Use a modern clean sans-serif font similar to the reference screenshots.

Recommended font stack:

Inter, SF Pro Display, SF Pro Text, system-ui, sans-serif

Typography should have:

- Strong category headings

- Medium-weight subcategory names

- Excellent readability

- Tight but natural letter spacing

- No italic typography

- No unnecessary decorative fonts

Category headings should be visually prominent without being excessively bold.

---

11. COLORS

Follow the color language of the references.

Primary visual direction:

- Soft pastel pink

- Warm white

- Off-white

- Deep charcoal/navy text

- Very subtle grey borders

- Clean black/dark icons

Use the reference images to determine the exact visual balance.

Do NOT use:

- Neon gradients

- Glassmorphism everywhere

- Excessive shadows

- Random bright colors

- Heavy outlines

- Generic purple/blue SaaS styling

The interface should feel like a polished fashion/e-commerce application.

---

12. ANIMATIONS

The entire page should feel alive.

Implement smooth animations for:

Category cards

- Press scale

- Hover/press feedback

- Expand transition

Expansion

- Height animation

- Fade

- TranslateY

- Scale

- Chevron rotation

Subcategory cards

- Staggered reveal

- Slight upward movement

- Fade-in

Example stagger:

Card 1 → 0ms

Card 2 → 40ms

Card 3 → 80ms

Card 4 → 120ms

Card 5 → 160ms

Keep animations fast and premium.

Avoid excessive animation that makes navigation feel slow.

---

13. SCROLL BEHAVIOUR

The page must have smooth native mobile scrolling.

When expanding a category:

- Automatically scroll enough to keep the expanded category visible

- Do not unexpectedly jump to the top

- Preserve scroll position when collapsing

- Use smooth scrolling

- Ensure the bottom navigation never covers the final cards

Add enough bottom padding for the fixed navigation dock.

---

14. TELEGRAM MINI APP OPTIMIZATION

This is NOT a normal website.

Optimize specifically for Telegram Mini Apps.

Support:

- Telegram viewport

- Safe-area insets

- Touch interactions

- Mobile scrolling

- Telegram theme compatibility where practical

- Fast loading

- No unnecessary heavy libraries

- Responsive layout

- Android and iOS Telegram behaviour

Use touch-friendly hit areas.

Do not rely on desktop hover interactions.

---

15. UI DETAILS

Add subtle details that make the interface feel premium:

- Press animations

- Smooth icon transitions

- Chevron rotation

- Image lazy loading

- Skeleton loading where necessary

- Soft shadows

- Consistent spacing

- Proper image aspect ratios

- Smooth page transitions

- No layout shift

- No flashing content

The final result should feel like a real production shopping app, not a prototype.

---

16. CONTENT STRUCTURE

Build the page using reusable data-driven components.

For example:

categories = [

  {

    id: "topwear",

    title: "Topwear",

    color: "...",

    items: [

      {

        title: "All Topwear",

        image: "...",

        route: "..."

      },

      {

        title: "T-Shirts",

        image: "...",

        route: "..."

      },

      {

        title: "Shirts",

        image: "...",

        route: "..."

      }

    ]

  }

]

Do not hardcode every card individually.

The system should make it easy to add/remove/reorder categories and subcategories later.

---

17. RESPONSIVE BEHAVIOUR

On smaller screens:

- Reduce card spacing slightly

- Maintain readable typography

- Keep 3-column subcategory grid where it remains usable

- Properly crop images

- Never allow text to overflow

- Keep bottom navigation usable

On larger mobile screens:

- Increase horizontal padding slightly

- Keep the visual proportions consistent

- Do not stretch cards excessively

---

18. IMPORTANT DESIGN RULE

The first view must visually communicate:

"This is a category browser."

The interaction after tapping must communicate:

"This category has expanded into its detailed subcategories."

The transition between these two states should feel like one continuous interface rather than navigating between unrelated screens.

---

19. REFERENCE IMAGE PRIORITY

Follow this priority:

Reference Image 1

→ Initial category cards, typography, colors, spacing, header and overall category-page composition.

Reference Image 2 + Reference Image 3

→ Expanded category layout, subcategory grid, category section structure, image cards and browsing behaviour.

Use the references as visual guidance throughout the implementation.

---

20. FINAL QUALITY BAR

Before considering the page complete, verify:

- Initial category layout resembles Reference Image 1

- Tapping a category expands it smoothly

- Expanded layout resembles Reference Image 2/3

- Category cards are fully interactive

- Subcategory cards are fully interactive

- Only one category expands at a time

- Top navigation is present

- Bottom navigation dock is fixed

- Telegram Mini App safe areas are handled

- Typography is clean and consistent

- Colors match the reference aesthetic

- Animations are smooth

- No layout jumps

- No horizontal overflow

- No desktop-looking UI

- No unnecessary gradients

- No excessive shadows

- UI feels premium and production-ready

Most importantly, do not create a static screenshot-like page. Build the complete functional category experience with real expandable sections, interactive subcategories, smooth transitions, responsive behaviour, top navigation and fixed bottom navigation.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://expand-category-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a0753b46-611a-420a-877f-246fd3f2dbd6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
