import os
import re

seo_block_template = """
  <meta name="description" content="Three mates from The Border review craft beers from every independent brewery in Australia using the meticulously crafted Border Barrels Beer Review System.">
  <meta name="keywords" content="Australian craft beer reviews, beer podcast, independent breweries Australia, craft beer ratings, Border Barrels, BBBRS, brewery directory">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="Three mates from &quot;The Border&quot; have made it their mission to sample beers from every independent brewery in Australia. The approach is a relatively simple one: Provide a history of the showcase brewery in question, bring along a minimum of three beers to sample from that same brewery, and then score them using the unique, meticulously crafted Border Barrels Beer Review System.">
  <meta property="og:image" content="https://borderbarrels.com/logo.png">
  <meta property="og:url" content="https://borderbarrels.com/">
  <meta name="twitter:card" content="summary_large_image">
"""

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already applied
    if 'meta property="og:image"' in content:
        return

    # Extract title
    title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
    title = title_match.group(1).strip() if title_match else "Border Barrels"
    
    seo_block = seo_block_template.format(title=title)

    # Insert before </head>
    if '</head>' in content:
        new_content = content.replace('</head>', seo_block + '\n</head>', 1)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Applied SEO tags to {filepath}")

for root, dirs, files in os.walk(r'c:\Users\Hudson\git\border-barrels'):
    # Ignore hidden folders
    if '.git' in root or '.github' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))

print("done")
