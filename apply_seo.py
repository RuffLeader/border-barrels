import os
import re

ROOT = r"c:\Users\Hudson\git\border-barrels"
BASE_URL = "https://borderbarrels.com"

PAGE_SEO = {
    "beerandbrew.html": {
        "title": "Beers & Breweries Hub | Border Barrels",
        "description": "Explore Border Barrels' archive of independent Australian breweries and craft beers scored with the BBBRS rating system.",
        "keywords": "Australian craft beer directory, independent breweries Australia, Border Barrels, BBBRS, craft beer reviews",
        "url": f"{BASE_URL}/beerandbrew.html",
    },
    "beers.html": {
        "title": "Browse Craft Beers | Border Barrels",
        "description": "Search, filter, and sort every craft beer reviewed on the Border Barrels podcast with full BBBRS and Untappd score breakdowns.",
        "keywords": "Australian craft beer reviews, BBBRS beer scores, Untappd craft beer ratings, Border Barrels beers",
        "url": f"{BASE_URL}/beers.html",
    },
    "beerstable.html": {
        "title": "Full Craft Beer Scores Table | Border Barrels",
        "description": "Compare every beer reviewed on Border Barrels side by side with full Simon, Zach, and Hudson BBBRS category scores.",
        "keywords": "Border Barrels beer table, BBBRS breakdown, Australian craft beer ratings table",
        "url": f"{BASE_URL}/beerstable.html",
    },
    "breweries/index.html": {
        "title": "Independent Australian Breweries | Border Barrels",
        "description": "Interactive map and directory of independent Australian craft breweries featured and reviewed on the Border Barrels podcast.",
        "keywords": "independent breweries Australia, Australian brewery map, craft breweries directory, Border Barrels",
        "url": f"{BASE_URL}/breweries/index.html",
    },
    "breweries/brewery.html": {
        "title": "Brewery Profile & Beers | Border Barrels",
        "description": "Explore brewery history, taprooms, and every craft beer reviewed by Border Barrels using the BBBRS rating system.",
        "keywords": "Australian brewery profile, taprooms, craft beer reviews, Border Barrels",
        "url": f"{BASE_URL}/breweries/brewery.html",
    },
    "episodes.html": {
        "title": "Podcast Episodes | Border Barrels",
        "description": "Watch and listen to every Border Barrels podcast episode, featuring brewery stories, guest interviews, and beer tastings.",
        "keywords": "Border Barrels episodes, Australian craft beer podcast, beer tasting podcast, Spotify Apple Podcasts",
        "url": f"{BASE_URL}/episodes.html",
    },
    "leaderboard.html": {
        "title": "Top Beers & Breweries Leaderboards | Border Barrels",
        "description": "See the highest-rated Australian craft beers and independent breweries ranked by BBBRS and Untappd scores.",
        "keywords": "best Australian craft beers, top craft breweries Australia, BBBRS leaderboard, Untappd rankings",
        "url": f"{BASE_URL}/leaderboard.html",
    },
    "about.html": {
        "title": "About Us & BBBRS | Border Barrels",
        "description": "Meet Simon, Zach, and Hudson from Border Barrels and learn how the Border Barrels Beer Review System (BBBRS) works.",
        "keywords": "About Border Barrels, BBBRS beer review system, Australian beer podcast hosts",
        "url": f"{BASE_URL}/about.html",
    },
    "ratingaggregate.html": {
        "title": "BBBRS Rating Calculator | Border Barrels",
        "description": "Calculate beer scores using the Border Barrels Beer Review System (BBBRS) across As Advertised, Can Art, Blurb, Value, and Untappd.",
        "keywords": "BBBRS calculator, beer rating calculator, Border Barrels Beer Review System",
        "url": f"{BASE_URL}/ratingaggregate.html",
    },
    "blog/index.html": {
        "title": "Craft Beer Blog & Adventures | Border Barrels",
        "description": "Read craft beer festival recaps, advent calendar reviews, brewery road trips, and interviews from the Border Barrels crew.",
        "keywords": "Australian craft beer blog, brewery road trips, Canvent, Beer Cartel Advent Calendar, Border Barrels",
        "url": f"{BASE_URL}/blog/index.html",
    },
    "blog/akasha-tap-takeover/index.html": {
        "title": "Akasha Tap Takeover | Border Barrels Blog",
        "description": "Border Barrels recap of the Akasha Brewing tap takeover, tasting notes, and highlights.",
        "keywords": "Akasha Brewing, Akasha tap takeover, Australian craft beer blog, Border Barrels",
        "url": f"{BASE_URL}/blog/akasha-tap-takeover/index.html",
    },
    "blog/beer-cartel-advent-2025/index.html": {
        "title": "Beer Cartel Advent Calendar 2025 Review | Border Barrels",
        "description": "Border Barrels takes on the Beer Cartel Craft Beer Advent Calendar 2025 with daily tasting notes and standout pours.",
        "keywords": "Beer Cartel Advent Calendar 2025, Australian craft beer advent calendar, Border Barrels",
        "url": f"{BASE_URL}/blog/beer-cartel-advent-2025/index.html",
    },
    "blog/carwyn-canvent-2025/index.html": {
        "title": "Carwyn Cellars Canvent 2025 Review | Border Barrels",
        "description": "Daily reviews and highlights from the Carwyn Cellars Canvent 2025 craft beer advent calendar by Border Barrels.",
        "keywords": "Carwyn Canvent 2025, Carwyn Cellars, craft beer advent calendar Australia, Border Barrels",
        "url": f"{BASE_URL}/blog/carwyn-canvent-2025/index.html",
    },
    "blog/murray-towns-interview/index.html": {
        "title": "Murray Towns Interview | Border Barrels Blog",
        "description": "Border Barrels sits down with Murray Towns to talk brewing, Australian independent beer, and craft beer culture.",
        "keywords": "Murray Towns interview, Australian craft beer interview, Border Barrels podcast",
        "url": f"{BASE_URL}/blog/murray-towns-interview/index.html",
    },
    "blog/zach-northern-trip/index.html": {
        "title": "Zach's Northern Brewery Road Trip | Border Barrels",
        "description": "Follow Zach's northern brewery trip across independent craft breweries, taprooms, and standout beers.",
        "keywords": "Australian brewery road trip, craft beer travel Australia, Border Barrels blog",
        "url": f"{BASE_URL}/blog/zach-northern-trip/index.html",
    },
}

SEO_BLOCK = """\
  <link rel="canonical" href="{url}">
  <meta name="description" content="{description}">
  <meta name="keywords" content="{keywords}">
  <meta property="og:type" content="{og_type}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:image" content="https://borderbarrels.com/logo.png">
  <meta property="og:url" content="{url}">
  <meta name="twitter:card" content="summary_large_image">"""

# Match existing generic SEO tags + optional canonical to replace cleanly
OLD_SEO_PATTERN = re.compile(
    r'(?:\s*<link rel="canonical"[^>]*>\s*)?'
    r'(?:\s*<meta name="description"[^>]*>\s*)?'
    r'(?:\s*<meta name="keywords"[^>]*>\s*)?'
    r'(?:\s*<meta property="og:type"[^>]*>\s*)?'
    r'(?:\s*<meta property="og:title"[^>]*>\s*)?'
    r'(?:\s*<meta property="og:description"[^>]*>\s*)?'
    r'(?:\s*<meta property="og:image"[^>]*>\s*)?'
    r'(?:\s*<meta property="og:url"[^>]*>\s*)?'
    r'(?:\s*<meta name="twitter:card"[^>]*>\s*)',
    re.IGNORECASE,
)

for rel_path, meta in PAGE_SEO.items():
    full_path = os.path.join(ROOT, rel_path.replace("/", os.sep))
    if not os.path.exists(full_path):
        print(f"SKIP (missing): {rel_path}")
        continue

    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()

    og_type = "article" if rel_path.startswith("blog/") and rel_path != "blog/index.html" else "website"
    block = SEO_BLOCK.format(
        url=meta["url"],
        title=meta["title"],
        description=meta["description"],
        keywords=meta["keywords"],
        og_type=og_type,
    )

    # Remove old SEO tags wherever they are in <head>
    head_end = content.find("</head>")
    if head_end == -1:
        print(f"SKIP (no </head>): {rel_path}")
        continue

    head = content[:head_end]
    rest = content[head_end:]

    for tag_pat in [
        r'\s*<link rel="canonical"[^>]*>',
        r'\s*<meta name="description"[^>]*>',
        r'\s*<meta name="keywords"[^>]*>',
        r'\s*<meta property="og:type"[^>]*>',
        r'\s*<meta property="og:title"[^>]*>',
        r'\s*<meta property="og:description"[^>]*>',
        r'\s*<meta property="og:image"[^>]*>',
        r'\s*<meta property="og:url"[^>]*>',
        r'\s*<meta name="twitter:card"[^>]*>',
    ]:
        head = re.sub(tag_pat, "", head, flags=re.IGNORECASE)

    new_content = head.rstrip() + "\n" + block + "\n" + rest

    with open(full_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"OK: {rel_path}")
