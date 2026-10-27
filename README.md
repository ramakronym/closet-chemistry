# Closet Chemistry

Your day. Your style. Your personal stylist. A personal styling app that solves the “what do I wear?” problem by recommending looks from your own closet. Built on Anu's own closet as a baseline, but upload your own for a personalized experience. 

Try it here: https://ramakronym.github.io/closet-chemistry/

## Product
Choose a demo garment from Anu's closet or upload your own, switch office/weekend/dinner, lock pieces, set an owned-only or one-purchase rule, and explore three outfit combinations. Explicit feedback adapts the ranking; explanations expose the rules behind each look.

## What is and is not AI
The live experience uses a content-based recommender and explicit feedback weights. It does not call an LLM or automatically recognize photos. Users confirm uploaded item details. The architecture leaves room for a vision service to propose editable attributes later. No collaborative-filtering claim is made without interaction data.

## Build journey
Anu supplied the styling objective and feature requirements. ChatGPT Work implemented the first playable version and tests. Anu subsequently requested replacing the illustrated catalog with her real LTK picks. The update imports public product records and makes them shoppable without claiming a live LTK integration. The story page records decisions without claiming unperformed research, real-world sales improvements, or automatic image recognition. Multiple product testing and iterations resulted in improving recommendation coverage (by adding more items from Anu's catalog), diversity and relevance.

## Run
Serve `docs/` with any static HTTP server. Example: `python3 -m http.server 8000 --directory docs`.

## Architecture
- `catalog.js`: original SVG artwork and prototype data.
- `ltk-products.js`: active catalog of 47 public LTK product records with source images, paid links, and listed-price snapshots.
- `catalog-provenance.json`: import decisions, sources, exclusions, and timestamps.
- `recommender.js`: pure JavaScript candidate generation, constraint checks, ranking, diversity, and grounded explanations.
- `app.js`: browser interactions, photo resizing, local persistence, preferences, and outfit locks.
- `story.html`: product decisions, agentic development, and limitations.

## Data and privacy
The active catalog contains 47 real products selected from Anu’s public LTK profile, posts, and product collections. Published paid links are preserved. Prices are source-listed snapshots captured October 25–27, 2026, not retailer-confirmed quotes. Unpriced records are excluded from purchases and can be styled only as owned items. Variant and availability are unverified. No authenticated LTK connection, automatic synchronization, live inventory, or retailer API is used. Product photos are referenced from LTK’s public CDN and outbound links may be tracked by LTK/retailers. The previous illustration catalog remains in source as prototype history. Uploaded photos are resized and stored locally, never uploaded to a server. Up to 12 personal uploads are supported. Google Fonts have local fallbacks. No analytics are included.

## Tests
Run `node tests/recommender.test.cjs` and `node tests/ltk-catalog.test.cjs`. Tests check owned-only results, maximum one purchase, spending limits, lock persistence, outfit diversity, impossible wardrobes, quieter-feedback behavior, and price-sensitive ranking. Styling quality still needs human evaluation.

## GitHub Pages
The application is buildless and needs no API key or visitor login. In repository **Settings → Pages**, select **Deploy from a branch**, then **main** and **/docs**, and save. All site assets use relative paths, so the app works under a GitHub project URL.

Website source lives in `docs/`. Tests and catalog provenance are kept alongside it in the repository. The in-app “Behind the chemistry” page documents the product journey.
