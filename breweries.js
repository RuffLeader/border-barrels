const breweries = [
  {
    name: "Aether Brewing",
    city: "Northgate",
    state: "Queensland",
    logo: "/media/logos/aether-brewing.png",
    website: "https://aetherbrewing.com.au/",
    instagram: "https://www.instagram.com/aether_brewing",
    description: "Aether Brewing is a family-owned and independent craft brewery based in Brisbane, Australia. Our passion for creativity flows, not only through our taps, but onto our labels, which showcase the talents of local visual artists. While you’re here, check out the Artist Amplifier Initiative, a collaborative springboard that looks to grow awareness and appreciation of the Australian arts community. We aim to inspire creative, flavourful, connected, and fulfilling lives in our community. We look to grow awareness and appreciation of the Australian arts community – combining its artistic talent with the inspired flair of our exceptional brew team. In doing so, we hope to enhance engagement between creatives and artists, as well as the brewing and hospitality communities.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Aether Brewing",
        address: "340 Melton Rd, Northgate QLD 4013",
        map: "https://maps.app.goo.gl/zrAUYUWSnavn29R37",
        photo: "/media/taprooms/aether-taproom.jpg"
      }
    ]
  },
  {
    name: "AVNGE Brewing",
    city: "Melbourne",
    state: "Victoria",
    logo: "/media/logos/avnge-brewing.png",
    website: null,
    instagram: "https://instagram.com/avngebrewing/",
    description: "AVNGE Brewing is an independent brewing company based in Melbourne, focusing on producing small batch, high quality beer. We are a husband and wife team, James and Steph. James focuses on brewing and recipe development, while Steph manages branding and social media. Currently, we brew through Killer Sprocket in Bayswater. Our aim is to use the best available ingredients of hops, malt, and yeast to ensure our beer is of the highest quality and great to drink.",
    closed: true,
    independent: true,
    owner: null,
    taprooms: []
  },
  {
    name: "Bacchus Brewing Co.",
    city: "Capalaba",
    state: "Queensland",
    logo: "/media/logos/bacchus-brewing-co.png",
    website: "https://www.bacchusbrewing.com.au/",
    instagram: "https://www.instagram.com/bacchus_brewing/",
    description: "Bacchus Brewing Co. is an award-winning microbrewery located in the Redlands Coast hinterland suburb of Capalaba, just 20 minutes' drive from the centre of Brisbane. We are renowned for producing some of Australia's most interesting, diverse, and distinct craft beer flavours while also brewing and perfecting the more classic styles. Established in 2005, we offer bespoke brewing services, creating individually tailored beers for the trade and public. Our brewery features over 23 taps, many of which are available to purchase in handy 5L party kegs. We are also Australia's premier homebrew store, offering a wide range of quality equipment and fresh ingredients.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Bacchus Brewing Co.",
        address: "1/2 Christine Pl, Capalaba QLD 4157",
        map: "https://maps.app.goo.gl/3nmaDiRSHPqcn8cR9",
        photo: "/media/taprooms/bacchus-taproom.jpg"
      }
    ]
  },
  {
    name: "Balter Brewing",
    city: "Currumbin",
    state: "Queensland",
    logo: "/media/logos/balter-brewing.png",
    website: "https://www.balter.com.au/",
    instagram: "https://www.instagram.com/balterbrewers",
    description: "Balter Brewing is an Australian craft brewery based in Currumbin, Queensland, established in 2016 by a group of Australian surfing champions, including Mick Fanning, Joel Parkinson, Josh Kerr, and Bede Durbidge. The brewery was sold to Carlton & United Breweries in 2019. Balter Brewing Company offers a variety of beer styles, including their full-time beers such as XPA, which is described as a pale beer with a 5.0% ABV and 30 IBU, characterized by its bold hop flavors. Their brewery, known as Balter HQ, serves as a tasting house and event hub, providing a space for visitors to tour the facility, taste the beers, and enjoy special events, great music, food vans, and a fun crew.",
    closed: false,
    independent: false,
    owner: "Carlton & United Breweries (Asahi Breweries)",
    taprooms: [
      {
        name: "Balter Brewing",
        address: "14 Traders Way, Currumbin Waters QLD 4223",
        map: "https://maps.app.goo.gl/e26AHzHcgxctqae78",
        photo: "/media/taprooms/balter-taproom.jpg"
      }
    ]
  },
  {
    name: "BentSpoke Brewing Co.",
    city: "Braddon",
    state: "ACT",
    logo: "/media/logos/bentspoke-brewing-co.png",
    website: "https://www.bentspokebrewing.com.au/",
    instagram: "https://www.instagram.com/BentSpokeBeer",
    description: "BentSpoke Brewing Co. is a Canberra-based brewing company founded in 2014 by brewers Richard Watkins and Tracy Margrain. The brewery operates a brewpub in the central Canberra suburb of Braddon and a commercial brewing and canning facility in the Canberra light-industrial estate of Mitchell. BentSpoke Brewing Co acknowledges the Ngunnawal peoples, the Traditional Custodians of the Canberra region, and recognizes their continuous connection to culture, community, and Country. Their brewpub showcases a significant range of Canberra and Australian-made spirits, and local farmers collect spent grain from the brewery as feed for their livestock.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "BentSpoke Brewing Co.",
        address: "48/38 Mort St, Braddon ACT 2612",
        map: "https://maps.app.goo.gl/3uViHmT2uXWMrTGs8",
        photo: "/media/taprooms/bentspoke-taproom.jpg"
      }
    ]
  },
  {
    name: "Big Shed Brewing",
    city: "Royal Park",
    state: "South Australia",
    logo: "/media/logos/big-shed-brewing.png",
    website: "https://bigshed.beer/",
    instagram: "https://www.instagram.com/bigshedbeer",
    description: "Big Shed Brewing Concern is a craft brewery located in the Barossa Valley, South Australia. The brewery was founded in 2002 by two mates who started brewing beers in a shed, leading to the establishment of the brewery. Big Shed Brewing Concern offers a range of beers and has become known for its unique and creative brews. The brewery has celebrated milestones, including its 10th anniversary, reflecting on the challenges and successes of the past decade.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Big Shed Brewing",
        address: "1154 Old Port Rd, Royal Park SA 5014",
        map: "https://maps.app.goo.gl/MfxKVcuMbctZgfH36",
        photo: "/media/taprooms/big-shed-taproom.jpeg"
      }
    ]
  },
  {
    name: "Blackman's Brewery",
    city: "Torquay",
    state: "Victoria",
    logo: "/media/logos/blackmans-brewery.png",
    website: "https://www.blackmansbrewery.com.au/",
    instagram: "https://www.instagram.com/blackmansbrewery",
    description: "Blackman's Brewery is an independent, family-run brewery based on the Surf Coast and Geelong in Victoria. Their philosophy centers around producing good beer by using the best quality ingredients and allowing their beers the right amount of time in the tank, without rushing the process. Blackman's Brewery offers a core range of beers that cover a variety of flavors and styles, aiming to make good beer for everyone. They also have a presence in Torquay, where they operate a venue that includes a Mexican cantina, providing a space for visitors to enjoy their beers and food offerings.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Torquay Mexican Cantina & Margaritaville",
        address: "26 Bell St, Torquay VIC 3228",
        map: "https://maps.app.goo.gl/e9jdqitgTKNoYVL28",
        photo: "/media/taprooms/blackmans-torquay.jpeg"
      },
      {
        name: "Geelong Beer Bar",
        address: "29/8 Lewalan St, Grovedale VIC 3216",
        map: "https://maps.app.goo.gl/SDDGWrEkcVq3zPzm8",
        photo: "/media/taprooms/blackmans-geelong.jpg"
      },
      {
        name: "Ocean Grove Beer & Burger Bar",
        address: "82 The Terrace, Ocean Grove VIC 3226",
        map: "https://maps.app.goo.gl/dwHVXrQm1fgvpHje7",
        photo: "/media/taprooms/blackmans-ocean-grove.png"
      }
    ]
  },
  {
    name: "Bracket Brewing",
    city: "Marrickville",
    state: "New South Wales",
    logo: "/media/logos/bracket-brewing.png",
    website: "https://bracketbrewing.com.au/",
    instagram: "https://instagram.com/bracketbrewing",
    description: "Bracket Brewing is a craft, independent nanobrewery located in Marrickville, Sydney, on Gadigal Land. The brewery is known for constantly changing and improving its beers, offering a variety of styles such as Hazy IPAs, Sours, DDH IPAs, and Imperial Stouts. Founded by father and son team Mark and Mike Meletopoulo, Bracket Brewing has quickly gained recognition in the craft beer community. Their high-caliber hazy IPAs have regularly topped the Untappd charts, earning them a reputation among brewers and drinkers alike.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Bracket Brewing",
        address: "2/48 Addison Rd, Marrickville NSW 2204",
        map: "https://maps.app.goo.gl/2moxtzW6RKbr6uMq8",
        photo: "/media/taprooms/bracket-taproom.jpg"
      }
    ]
  },
  {
    name: "Bridge Road Brewers",
    city: "Beechworth",
    state: "Victoria",
    logo: "/media/logos/bridge-road-brewers.png",
    website: "https://bridgeroadbrewers.com.au/",
    instagram: "https://www.instagram.com/bridgeroadbrewers",
    description: "Bridge Road Brewers officially began its journey in 2006 in Beechworth, born from a family’s passion and a backyard brew setup. Its current HQ features a 340-seat taproom, a pizzeria, and a 25 hL brewhouse, embodying the founders’ values of independence, authenticity, and quality. The venue itself is steeped in history, housed in a circa 1850s Victorian gold-rush coach house and stables. It’s become a beloved family-friendly destination, boasting a large beer garden, kids’ play area, and creative offerings—from spent-grain bread and wood-fired pizzas to locally inspired experimental beers.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Beechworth",
        address: "Enter via laneway, 42 Ford St, Beechworth VIC 3747",
        map: "https://maps.app.goo.gl/EoHwFX46Xs7gitx47",
        photo: "/media/taprooms/bridge-road-beechworth.jpg"
      },
      {
        name: "Brunswick",
        address: "137/141 Nicholson St, Brunswick East VIC 3057",
        map: "https://maps.app.goo.gl/r5LDdHt8rnLxXFgT6",
        photo: "/media/taprooms/bridge-road-brunswick.jpg"
      },
      {
        name: "Melbourne Airport",
        address: "Terminal 1 Departure Dr, Melbourne Airport VIC 3045",
        map: "https://maps.app.goo.gl/fvK4d2jidi9vLsac9",
        photo: "/media/taprooms/bridge-road-airport.jpg"
      }
    ]
  },
  {
    name: "Bright Brewery",
    city: "Bright",
    state: "Victoria",
    logo: "/media/logos/bright-brewery.png",
    website: "https://brightbrewery.com.au/",
    instagram: "https://www.instagram.com/brightbrewery",
    description: "Bright Brewery is an independent, family-owned brewery, bar, restaurant, and bike hub tucked into the High Country of Bright, Victoria. Built on values of activity, sustainability, and authenticity, it embraces the adventurer’s spirit of the region. Located on the banks of the Ovens River, the venue was designed with natural, recycled, and reclaimed materials to reflect its alpine surrounds. From its beginnings in two humble tin sheds in 2005 to today’s venue with indoor and outdoor riverside seating, the brewery highlights bold MountainCrafted beers made with Alpine water and local hops.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Bright Brewery",
        address: "121 Great Alpine Rd, Bright VIC 3741",
        map: "https://maps.app.goo.gl/akGdpJDCxAhgNxP3A",
        photo: "/media/taprooms/bright-taproom.png"
      }
    ]
  },
  {
    name: "Bucketty's Brewing Co.",
    city: "Brookvale",
    state: "New South Wales",
    logo: "/media/logos/buckettys-brewing-co.png",
    website: "https://www.buckettys.com.au/",
    instagram: "https://www.instagram.com/Buckettys",
    description: "Bucketty’s Brewing Co. invites patrons into what they call a “good-times factory” nestled in Brookvale’s brewery district. With a full bar license, late-night hours, and a lively atmosphere built for fun, it’s a place designed for enjoyment and community. Their origin story is one of grit and determination—starting with dreams of off-grid brewing on a farming site in Bucketty, overcoming zoning hurdles, and ultimately rebuilding in Brookvale. The journey features a playful sense of resilience and a community that’s invited along for the ride.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Bucketty's Brewing Co.",
        address: "26 Orchard Rd, Brookvale NSW 2100",
        map: "https://maps.app.goo.gl/nmvkK4KbTwEzhZ9y6",
        photo: "/media/taprooms/buckettys-taproom.jpg"
      }
    ]
  },
  {
    name: "Burnley Brewing",
    city: "Richmond",
    state: "Victoria",
    logo: "/media/logos/burnley-brewing.png",
    website: null,
    instagram: "https://www.instagram.com/burnleybrewing",
    description: "Burnley Brewing merges German brewing tradition with Melbourne’s vibrant, local character. Crafted in Richmond since roughly 2017, their approach blends precision and creativity to produce fresh, surprising beers like lemongrass-pear saisons and fruity ales. The venue is as thoughtfully designed as the beer—featuring pastel tones, light wood accents, and onsite tanks that pour directly into a modern, welcoming taproom. It’s a relaxed spot serving house-brewed beers, seasonal offerings, and modern Australian eats seven days a week.",
    closed: true,
    independent: true,
    owner: null,
    taprooms: []
  },
  {
    name: "Capital Brewing Co",
    city: "Fyshwick",
    state: "ACT",
    logo: "/media/logos/capital-brewing-co.png",
    website: "https://capitalbrewing.co/",
    instagram: "https://www.instagram.com/capitalbrewing",
    description: "Founded in 2016 by Canberra locals Tom Hertel and Laurence Kain, Capital Brewing Co. has grown into one of Australia’s largest independent craft breweries, with a team of more than 70. They operate a brewpub in Fyshwick, Canberra, deeply rooted in their local community. Capital distinguishes itself through its strong commitment to sustainability. It’s both B Corp-certified and Australia’s first fully carbon-neutral brewery, pioneering efforts to minimize environmental impact while focusing on 'Good Natured Brews.'",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Capital Brewing Co",
        address: "Building 3/1 Dairy Rd, Fyshwick ACT 2609",
        map: "https://maps.app.goo.gl/nTQCUP5hD9KHDCTNA",
        photo: "/media/taprooms/capital-taproom.jpeg"
      }
    ]
  },
  {
    name: "Co-Conspirators Brewing Co",
    city: "Brunswick",
    state: "Victoria",
    logo: "/media/logos/co-conspirators-brewing-co.png",
    website: "https://coconspirators.com.au/",
    instagram: "https://www.instagram.com/coconspiratorsbeer",
    description: "CoConspirators Brewing Co started life in 2016 as a gypsy brewing collective in Melbourne. Each beer is represented by a playful 'character' – from The Matriarch to The Beancounter – telling stories through artwork and names as much as through taste. Their style is bold and inventive, with a focus on flavour-forward beers that challenge conventions and bring personality to the pint. While they began without a home, CoConspirators opened their own brewpub in Brunswick in 2021, giving fans a space to gather and enjoy their creations fresh from the tanks. Their beers have become well known across Australia for their creativity, clever branding, and knack for bringing people into the story behind each brew.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Co-Conspirators Brewpub",
        address: "377 Victoria St, Brunswick VIC 3056",
        map: "https://maps.app.goo.gl/SjzgsTib5aS7RZd68",
        photo: "/media/taprooms/co-conspirators-taproom.jpg"
      }
    ]
  },
  {
    name: "Cypher Brewing Co",
    city: "Gungahlin",
    state: "ACT",
    logo: "/media/logos/cypher-brewing-co.png",
    website: "https://www.cypherbrewing.com.au/",
    instagram: "https://www.instagram.com/cypherbrewingco",
    description: "Cypher Brewing Co is an independent brewery located in Gungahlin, ACT. Established by a group of homebrewers, the brewery offers a diverse range of beers brewed on-site, including tropical IPAs and rich imperial stouts. The venue features a relaxed atmosphere, making it a popular spot for locals to enjoy craft beer. The brewery places a strong emphasis on community engagement, aiming to create a space where beer enthusiasts can gather and share their passion for quality brews. With its commitment to innovation and quality, Cypher Brewing Co has become a notable addition to Canberra's craft beer scene.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Cypher Brewing Co",
        address: "Unit 3/35 Hinder St, Gungahlin ACT 2912",
        map: "https://maps.app.goo.gl/hjtz3zG9eS2qqHm6A",
        photo: "/media/taprooms/cypher-taproom.jpg"
      }
    ]
  },
  {
    name: "Dainton Beer",
    city: "Carrum Downs",
    state: "Victoria",
    logo: "/media/logos/dainton-beer.png",
    website: "https://www.dainton.beer/",
    instagram: "https://www.instagram.com/dainton.beer",
    description: "Dainton Beer is a family-owned craft brewery based in Carrum Downs, Victoria. Known for its inventive and flavorful beers, the brewery offers a core range alongside a variety of limited seasonal brews. Their taphouses in Carrum Downs and Croydon provide a welcoming environment for patrons to sample their creations. The brewery prides itself on producing some of the most inventive and delicious beers in Australia. With a focus on quality and creativity, Dainton Beer continues to make a significant impact on the Australian craft beer landscape.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Dainton Brewery",
        address: "560 Frankston - Dandenong Rd, Carrum Downs VIC 3201",
        map: "https://maps.app.goo.gl/EJxFLpeWK2K8SUjv7",
        photo: "/media/taprooms/dainton-carrum-downs.jpg"
      },
      {
        name: "Dainton Taphouse Croydon",
        address: "13 Lacey St, Croydon VIC 3136",
        map: "https://maps.app.goo.gl/TmJ4U6P1j5tA3jfK9",
        photo: "/media/taprooms/dainton-croydon.jpg"
      }
    ]
  },
  {
    name: "Deeds Brewing",
    city: "Glen Iris",
    state: "Victoria",
    logo: "/media/logos/deeds-brewing.png",
    website: "https://deedsbrewing.com.au/",
    instagram: "https://www.instagram.com/deedsbrewing",
    description: "Deeds Brewing is an Australian craft brewery located in Glen Iris, Melbourne. The brewery is housed in an industrial-chic venue that was once a car workshop dating back to the 1890s. Deeds Brewing offers a wide range of beers, including hazy IPAs and barrel-aged stouts, brewed on-site for patrons to enjoy. Despite facing financial challenges in 2024, Deeds Brewing has managed to continue operations, maintaining its commitment to brewing high-quality beers. The brewery's dedication to craftsmanship and innovation ensures that it remains a respected name in Melbourne's craft beer community.",
    closed: true,
    independent: true,
    owner: null,
    taprooms: []
  },
  {
    name: "Fox Friday Brewery",
    city: "Hobart",
    state: "Tasmania",
    logo: "/media/logos/fox-friday-brewery.png",
    website: "https://www.foxfriday.com.au/",
    instagram: "https://www.instagram.com/foxfridaybrewery",
    description: "Fox Friday Brewery was a Tasmanian-based craft brewery known for its hop-forward beers. The brewery operated taprooms in Hobart, Melbourne, and Perth, offering a variety of craft beers in each location. In 2025, Fox Friday entered voluntary administration due to significant financial challenges, including delays and eventual liquidation of their lender, Falcon Capital. Following the administration, Mountain Culture, an Australian craft brewery, acquired Fox Friday's assets, including its hospitality venues and production breweries. The acquisition allowed Mountain Culture to expand its presence into Tasmania, continuing the legacy of Fox Friday's commitment to quality craft beer.",
    closed: true,
    independent: true,
    owner: null,
    taprooms: []
  },
  {
    name: "Future Brewing",
    city: "Saint Peters",
    state: "New South Wales",
    logo: "/media/logos/future-brewing.png",
    website: "https://futurebrewing.com.au/",
    instagram: "https://www.instagram.com/futurebrewingsyd",
    description: "Future Brewing is an independent microbrewery located in St Peters, Sydney. The brewery focuses on producing quality beers using forward-thinking brewing techniques, aiming to create balance and flavor in every brew. Future Brewing seeks to push the boundaries of modern brewing while respecting traditional methods. The brewery's commitment to innovation and quality has made it a notable player in Sydney's craft beer scene. Future Brewing continues to offer a diverse range of beers, appealing to both traditional beer enthusiasts and those seeking new and exciting flavors.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Future Brewing",
        address: "82 May St, St Peters NSW 2044",
        map: "https://maps.app.goo.gl/FuRqQk12S3MaciDS7",
        photo: "/media/taprooms/future-taproom.jpg"
      }
    ]
  },
  {
    name: "Garage Project",
    city: "Wellington",
    state: "New Zealand",
    logo: "/media/logos/garage-project.png",
    website: "https://garageproject.com.au",
    instagram: "https://www.instagram.com/garageproject",
    description: "Garage Project is a small brewery based in Aro Valley, Wellington, New Zealand. Founded in 2011, the brewery began in a garage and has since grown into one of New Zealand's most influential craft beer producers. Garage Project is known for its experimental approach to brewing, producing a wide range of beers that often feature unique ingredients and bold flavors. The brewery operates a taproom and cellar door in Wellington, where visitors can sample a rotating selection of beers. Garage Project's commitment to innovation and quality has earned it a dedicated following among craft beer enthusiasts.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Garage Project Aro Cellar Door",
        address: "68/70 Aro Street, Aro Valley, Wellington 6021, New Zealand",
        map: "https://maps.app.goo.gl/711CbjUxT6UErNPY9",
        photo: "/media/taprooms/garage-project-aro-cellar.jpg"
      },
      {
        name: "Garage Project Aro Taproom: 91 Aro",
        address: "91 Aro Street, Aro Valley, Wellington 6021, New Zealand",
        map: "https://maps.app.goo.gl/L4iS5S5uVhPuVjL29",
        photo: "/media/taprooms/garage-project-aro-taproom.jpg"
      },
      {
        name: "Garage Project Taproom & Cellar Door Kingsland",
        address: "357 New North Road, Kingsland, Auckland 1021, New Zealand",
        map: "https://maps.app.goo.gl/dUHpfA6tX1tDMGZAA",
        photo: "/media/taprooms/garage-project-kingsland.jpg"
      },
      {
        name: "Garage Project Wild Workshop Taproom & Cellar Door",
        address: "7 Furness Lane, Te Aro, Wellington 6011, New Zealand",
        map: "https://maps.app.goo.gl/U1RfEznDXXNtAQ79A",
        photo: "/media/taprooms/garage-project-wild-workshop.jpg"
      }
    ]
  },
  {
    name: "Good Land Brewing Co",
    city: "Traralgon",
    state: "Victoria",
    logo: "/media/logos/good-land-brewing-co.png",
    website: "https://www.goodland.beer/",
    instagram: "https://www.instagram.com/goodlandbeer",
    description: "Good Land Brewing Co is a family-owned brewery located in Traralgon East, Victoria. The brewery offers a variety of beers brewed on-site, including hoppy IPAs, sour ales, and dark beers. Their taproom features 12 rotating taps, allowing patrons to experience a diverse range of flavors. In addition to beer, Good Land Brewing Co offers a selection of Gippsland wines, whiskeys, and ciders. The brewery's commitment to quality and community engagement has made it a popular destination for beer enthusiasts in the Gippsland region. Good Land Brewing Co continues to expand its offerings, providing a welcoming space for locals and visitors alike.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Good Land Brewing Co",
        address: "12 Standing Dr, Traralgon East VIC 3844",
        map: "https://maps.app.goo.gl/QaDqxC9JKMNcf9eu9",
        photo: "/media/taprooms/good-land-taproom.jpeg"
      }
    ]
  },
  {
    name: "Hargreaves Hill Brewing Co.",
    city: "Yarra Glen",
    state: "Victoria",
    logo: "/media/logos/hargreaves-hill-brewing-co.png",
    website: "https://hargreaveshill.com.au/",
    instagram: "https://www.instagram.com/hargreaveshill",
    description: "Hargreaves Hill Brewing Co. is one of Australia's pioneering craft breweries, located in Yarra Glen, Victoria. The brewery is known for its dedication to classic brewing processes and styles, producing a range of beers that showcase both tradition and innovation. Hargreaves Hill Brewing Co offers a solid, award-winning core range, along with a variety of seasonal releases. The brewery's commitment to quality and craftsmanship has earned it a respected place in the Australian craft beer industry. Hargreaves Hill Brewing Co continues to be a destination for beer enthusiasts seeking well-crafted and flavorful beers.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: []
  },
  {
    name: "Hawkers Beer",
    city: "Reservoir",
    state: "Victoria",
    logo: "/media/logos/hawkers-beer.png",
    website: "https://hawkers.beer/",
    instagram: "https://www.instagram.com/hawkersbeer",
    description: "Hawkers Beer is an independent craft brewery based in Melbourne, Victoria. The brewery offers a diverse range of beers, including lagers, IPAs, and stouts, brewed on-site for patrons to enjoy. Hawkers Beer is known for its commitment to quality and innovation, producing beers that appeal to a wide audience. The brewery's dedication to excellence has made it a notable name in Melbourne's craft beer scene. Hawkers Beer continues to offer a variety of brews, ensuring that there is something for every beer enthusiast to enjoy.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Hawkers Beer",
        address: "167 Henty St, Reservoir VIC 3073",
        map: "https://maps.app.goo.gl/ZSqqic7DErh3GZbC8",
        photo: "/media/taprooms/hawkers-taproom.jpg"
      }
    ]
  },
  {
    name: "Hop Nation Brewing Co",
    city: "Footscray",
    state: "Victoria",
    logo: "/media/logos/hop-nation-brewing-co.png",
    website: "https://hopnation.com.au/",
    instagram: "https://www.instagram.com/hopnationbeer",
    description: "Hop Nation Brewing Co is a craft brewery located in Footscray, Melbourne. Founded by winemakers-turned-brewers Sam Hambour and Duncan Gibson, the brewery focuses on producing hop-forward beers, particularly IPAs and pale ales. Hop Nation Brewing Co is known for its distinctive can art and experimental limited releases, showcasing their adventurous approach to brewing. The brewery's commitment to quality and creativity has made it a standout in Melbourne's craft beer community. Hop Nation Brewing Co continues to push the boundaries of brewing, offering a diverse range of beers that cater to a variety of tastes.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Hop Nation Brewing Co.",
        address: "Unit 6/107-109 Whitehall St, Footscray VIC 3011",
        map: "https://maps.app.goo.gl/Y2ePFzd83Nhi66Zd7",
        photo: "/media/taprooms/hop-nation-taproom.jpg"
      }
    ]
  },
  {
    name: "Jervis Bay Brewing Co",
    city: "Huskisson",
    state: "New South Wales",
    logo: "/media/logos/jervis-bay-brewing-co.png",
    website: "https://www.jervisbaybrewing.co/",
    instagram: "https://www.instagram.com/jervisbaybrewing_co",
    description: "Jervis Bay Brewing Co is the first craft brewery in Huskisson, New South Wales. Established to offer high-quality beers that celebrate the local region, the brewery provides a laid-back atmosphere suitable for families and pets. Their taproom and beer garden are designed to deliver good vibes and, of course, great beer. The brewery is committed to supporting and respecting the local culture and values of the land, which has been nurtured and managed for tens of thousands of years. Through this respect, they aim to benefit all for the future.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Jervis Bay Brewing Co",
        address: "3 Duranbah Dr, Huskisson NSW 2540",
        map: "https://maps.app.goo.gl/MA7Xdb6ypYEa2gmBA",
        photo: "/media/taprooms/jervis-bay-taproom.jpeg"
      }
    ]
  },
  {
    name: "KAIJU! Beer",
    city: "Dandenong South",
    state: "Victoria",
    logo: "/media/logos/kaiju-beer.png",
    website: "https://kaijubeer.com.au/",
    instagram: "https://www.instagram.com/kaijubeer",
    description: "KAIJU! Beer is a Melbourne-based, 100% family-owned and independent brewery founded by brothers Nat and Callum Reeves in 2013. The brewery is known for its unashamedly intense craft beers and ciders, including popular offerings like KAIJU! KRUSH, Pleazure Kruze, and Aftermath.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "KAIJU! Beer & Pizza",
        address: "27 Hume St, Huntingdale VIC 3166",
        map: "https://maps.app.goo.gl/yVaaEcSFbzM1NQ8r5",
        photo: "/media/taprooms/kaiju-taproom.jpg"
      }
    ]
  },
  {
    name: "Kicks Brewing",
    city: "Marrickville",
    state: "New South Wales",
    logo: "/media/logos/kicks-brewing.png",
    website: "https://kicksbrewing.com.au/",
    instagram: "https://www.instagram.com/kicksbrewing",
    description: "Kicks Brewing is a craft brewery located in the Inner West of Sydney, Australia. Established in 2020, Kicks focuses on creating fresh, progressive, and highly drinkable beers. The brewery's relaxed attitude to life is underpinned by expert knowledge, attention to detail, and unwavering passion for beer making. The brewery has earned a reputation for its hoppy lagers, juicy hazy IPAs, and other innovative brews. Kicks Brewing is proudly independent and continues to contribute to Sydney's vibrant craft beer scene.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Kicks Brewing",
        address: "31 Shepherd St, Marrickville NSW 2204",
        map: "https://maps.app.goo.gl/ffidcsjKAmRMoZze7",
        photo: "/media/taprooms/kicks-taproom.jpg"
      }
    ]
  },
  {
    name: "Lost Palms Brewing Co",
    city: "Miami",
    state: "Queensland",
    logo: "/media/logos/lost-palms-brewing-co.png",
    website: "https://lostpalms.com.au/",
    instagram: "https://www.instagram.com/lostpalmsbrewingco",
    description: "Lost Palms Brewing Co is an independent brewery located in the heart of Miami, Queensland. Established in 2017 by Ed Donohue and Jared Hart, the brewery is dedicated to creating small-batch beers that reflect the craft beer culture. The brewery's offerings include a variety of styles, with a focus on quality and innovation. Lost Palms Brewing Co has become a staple in Queensland's craft beer community, known for its commitment to excellence and creativity.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Lost Palms Brewing Co",
        address: "11 Oak Ave, Miami QLD 4220",
        map: "https://maps.app.goo.gl/6LEsFaq3CDhesgZ8A",
        photo: "/media/taprooms/lost-palms-taproom.jpg"
      }
    ]
  },
  {
    name: "Mountain Culture Beer Co",
    city: "Katoomba",
    state: "New South Wales",
    logo: "/media/logos/mountain-culture-beer-co.png",
    website: "https://mountainculture.com.au/",
    instagram: "https://www.instagram.com/mountainculturebeerco",
    description: "Mountain Culture Beer Co is a boutique brewery based in the Blue Mountains of New South Wales. Founded in 2019 by DJ and Harriet McCready, the brewery has rapidly expanded, now producing 700,000 cases annually and ranking as Australia's fourth-largest independent brewer. Despite early setbacks from bushfires and COVID-19, Mountain Culture Beer Co has grown into a nationally recognized brand with multiple production facilities and venues in Sydney, Melbourne, and Hobart. The brewery is known for its flagship Status Quo Pale Ale and continues to be a defining presence in the Australian craft beer scene.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Katoomba Brewpub",
        address: "23-25 Parke St, Katoomba NSW 2780",
        map: "https://maps.app.goo.gl/JPpGb5wwcpaWAFb39",
        photo: "/media/taprooms/mountain-culture-katoomba.jpg"
      },
      {
        name: "Redfern Pub",
        address: "158 Regent St, Redfern NSW 2016",
        map: "https://maps.app.goo.gl/L7AbmDSgoy4ZzY776",
        photo: "/media/taprooms/mountain-culture-redfern.jpg"
      },
      {
        name: "Melbourne Brewpub",
        address: "148/150 Murphy St, Richmond VIC 3121",
        map: "https://maps.app.goo.gl/Nq9FvhrmJpLUMx1cA",
        photo: "/media/taprooms/mountain-culture-melbourne.jpg"
      },
      {
        name: "Hobart Taproom",
        address: "105 Murray St, Hobart TAS 7000",
        map: "https://maps.app.goo.gl/avkULNboPQN5NjoL6",
        photo: "/media/taprooms/mountain-culture-hobart.jpg"
      },
      {
        name: "Emu Plains Taproom",
        address: "35 David Rd, Emu Plains NSW 2750",
        map: "https://maps.app.goo.gl/VavF1J7UwgxE3rDn7",
        photo: "/media/taprooms/mountain-culture-emu-plains.jpg"
      }
    ]
  },
  {
    name: "Noodledoof Brewery & Distillery",
    city: "Koroit",
    state: "Victoria",
    logo: "/media/logos/noodledoof.png",
    website: "https://www.noodledoof.com/",
    instagram: "https://www.instagram.com/noodledoof",
    description: "Noodledoof Brewery & Distillery is a craft brewery and distillery located in Koroit, Victoria. Established by two mates, Noodles and Doof, the brewery produces a wide range of delicious craft beers and spirits, including gin, vodka, liqueurs, and whiskey. The brewery is known for its experimental beer styles and spirits loaded with native botanicals from a nearby volcano. Noodledoof Brewery & Distillery offers a unique experience, combining innovative brews with a distinctive atmosphere.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Noodledoof Brewery & Distillery",
        address: "128 Commercial Rd, Koroit VIC 3282",
        map: "https://maps.app.goo.gl/7S1SzksysatTCyso7",
        photo: "/media/taprooms/noodledoof-taproom.jpg"
      }
    ]
  },
  {
    name: "Ocean Reach Brewing",
    city: "Cowes",
    state: "Victoria",
    logo: "/media/logos/ocean-reach-brewing.png",
    website: "https://oceanreach.beer/",
    instagram: "https://www.instagram.com/oceanreachbrewing",
    description: "Ocean Reach Brewing is a family-owned craft brewery located in Cowes, Phillip Island, Victoria. The brewery offers a range of independent craft beers at their taphouse, accompanied by delicious burgers in a relaxed coastal setting. Ocean Reach Brewing is committed to providing a welcoming environment for locals and visitors alike. With its focus on quality beer and food, the brewery has become a popular destination on Phillip Island.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Ocean Reach Brewing",
        address: "47 Thompson Ave, Cowes VIC 3922",
        map: "https://maps.app.goo.gl/QC3hS1qhHqRfDd1w6",
        photo: "/media/taprooms/ocean-reach-taproom.jpg"
      }
    ]
  },
  {
    name: "One Drop Brewing Co.",
    city: "Botany",
    state: "New South Wales",
    logo: "/media/logos/one-drop-brewing-co.png",
    website: "https://www.onedropbrewingco.com.au/",
    instagram: "https://www.instagram.com/onedropbrewingco",
    description: "One Drop Brewing Co is a brewery and beer garden located in Botany, New South Wales. Founded in 2019 by Clay and Meg, the brewery is inspired by the foundational ideals of reggae music, emphasizing community, freedom, and creative self-expression. The brewery offers a variety of beers and fosters a vibrant atmosphere, aiming to connect people through a shared love of good times and quality brews. One Drop Brewing Co continues to be a beloved establishment in the Botany area.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "One Drop Brewing Co",
        address: "5 Erith St, Botany NSW 2019",
        map: "https://maps.app.goo.gl/ZX9DqsTgdMWwVTfWA",
        photo: "/media/taprooms/one-drop-taproom.jpg"
      }
    ]
  },
  {
    name: "Pirate Life Brewing",
    city: "Adelaide",
    state: "South Australia",
    logo: "/media/logos/pirate-life-brewing.png",
    website: "https://www.piratelife.com.au/",
    instagram: "https://www.instagram.com/PirateLifeBeer",
    description: "Pirate Life Brewing is a craft brewery based in Port Adelaide, South Australia. Founded in 2014, the brewery quickly gained recognition for its bold and hop-forward beers, including the popular Throwback IPA and IIPA. Pirate Life Brewing has expanded its reach nationally and internationally, known for its commitment to quality and innovation. The brewery continues to push the boundaries of craft beer, offering a diverse range of styles to satisfy adventurous palates.",
    closed: false,
    independent: false,
    owner: "Carlton & United Breweries (Asahi Breweries)",
    taprooms: [
      {
        name: "Pirate Life Headquarters",
        address: "18 Baker St, Port Adelaide SA 5015",
        map: "https://maps.app.goo.gl/Fgt7d6my6EmqPE6L6",
        photo: "/media/taprooms/pirate-life-headquarters.jpg"
      },
      {
        name: "Pirate Life South Melbourne",
        address: "139-145 Market St, South Melbourne VIC 3205",
        map: "https://maps.app.goo.gl/Qg5osdv3Xk2FY5tVA",
        photo: "/media/taprooms/pirate-life-melbourne.jpg"
      },
      {
        name: "Pirate Life Microbrewery",
        address: "SkyCity Adelaide, 125 North Terrace, Adelaide SA 5000",
        map: "https://maps.app.goo.gl/GJdmMY55tyxhJTia6",
        photo: "/media/taprooms/pirate-life-skycity.jpg"
      },
      {
        name: "Pirate Life Perth",
        address: "TOMA/440 Murray St, Perth WA 6000",
        map: "https://maps.app.goo.gl/M1ia8Zet1YqD3vy66",
        photo: "/media/taprooms/pirate-life-perth.jpg"
      }
    ]
  },
  {
    name: "Range Brewing",
    city: "Newstead",
    state: "Queensland",
    logo: "/media/logos/range-brewing.png",
    website: "https://www.rangebrewing.com/",
    instagram: "https://www.instagram.com/rangebrewing",
    description: "Range Brewing is a craft brewery located in Brisbane, Queensland. Established in 2016, the brewery is known for its hazy IPAs and other hop-forward beers, brewed with a focus on quality and creativity. The brewery offers a rotating selection of beers, often experimenting with new styles and ingredients. Range Brewing has become a staple in Brisbane's craft beer scene, attracting enthusiasts with its innovative approach to brewing.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Range Brewing Taproom",
        address: "4 Byres St, Newstead QLD 4006",
        map: "https://maps.app.goo.gl/t5iz1rSxJR91fdsy9",
        photo: "/media/taprooms/range-newstead.jpg"
      },
      {
        name: "Patio by Range Brewing",
        address: "146 Baroona Rd, Paddington QLD 4064",
        map: "https://maps.app.goo.gl/jxak2vRRZS6zsY4G6",
        photo: "/media/taprooms/range-patio.jpg"
      },
      {
        name: "The Bethnal",
        address: "6 Byres St, Newstead QLD 4006",
        map: "https://maps.app.goo.gl/fd1XzoCRYZcKBSHC6",
        photo: "/media/taprooms/range-bethnal.jpg"
      },
      {
        name: "Rays by Range Brewing",
        address: "4 Newman Ave, Camp Hill QLD 4152",
        map: "https://maps.app.goo.gl/BHwYpMo5UoSygiM78",
        photo: "/media/taprooms/range-rays.jpg"
      }
    ]
  },
  {
    name: "Revel Brewing Co.",
    city: "Bulimba",
    state: "Queensland",
    logo: "/media/logos/revel-brewing-co.png",
    website: "https://revelbrewingco.com.au/",
    instagram: "https://www.instagram.com/Revelbrewingco",
    description: "Revel Brewing Co. is an independent brewery located in Morningside, Brisbane. Established in 2020, the brewery operates from the historic Commonwealth Acetate of Lime Factory, now known as Rivermakers. Revel Brewing Co focuses on crafting bold, award-winning beers that celebrate the local community and culture. Their offerings include a diverse range of styles, brewed with a commitment to quality and innovation. The brewery's Rivermakers location provides a spacious venue for patrons to enjoy their beers in a relaxed and welcoming environment. Revel Brewing Co is dedicated to fostering a sense of community, offering a place where locals and visitors alike can gather to appreciate craft beer.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Revel Brewing Co. Rivermakers",
        address: "82 Colmslie Rd, Morningside QLD 4170",
        map: "https://maps.app.goo.gl/UWaworiaqKcsekKb6",
        photo: "/media/taprooms/revel-taproom.jpg"
      }
    ]
  },
  {
    name: "Seeker Brewing",
    city: "Unanderra",
    state: "New South Wales",
    logo: "/media/logos/seeker-brewing.png",
    website: "https://www.seekerbrewing.com/",
    instagram: "https://www.instagram.com/seekerbrew",
    description: "Seeker Brewing is a craft brewery situated in Unanderra, New South Wales. The brewery is known for its award-winning beers, including the Mystic NEIPA. Seeker Brewing offers a rotating selection of 16 taps, featuring their own brews alongside local wines and non-alcoholic options. Their venue also serves wood-fired pizzas and hosts regular live music events. The brewery's atmosphere is vibrant and community-focused, reflecting the founders' passion for great beer and live music. Seeker Brewing has become a popular destination for craft beer enthusiasts in the Illawarra region, offering a unique blend of quality brews and entertainment.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Seeker Brewing",
        address: "Shop 4/1 Industrial Rd, Unanderra NSW 2526",
        map: "https://maps.app.goo.gl/gddMX5jHGyWKhT526",
        photo: "/media/taprooms/seeker-taproom.jpg"
      }
    ]
  },
  {
    name: "Shapeshifter Brewing Co.",
    city: "Findon",
    state: "South Australia",
    logo: "/media/logos/shapeshifter-brewing-co.png",
    website: "https://www.shapeshifterbrewing.com.au/",
    instagram: "https://www.instagram.com/shapeshifterbrewingco",
    description: "Shapeshifter Brewing Co. is a craft brewery located in Findon, South Australia. Established in 2018, the brewery is known for its focus on fresh, modern beers brewed in small batches. Their offerings include a mix of hop-forward, hazy styles and clean, crisp refreshing beers. The brewery's venue is family and dog-friendly, featuring pinball and arcade machines, as well as a dedicated kids' corner. Shapeshifter Brewing Co also hosts live entertainment from local musicians and features food trucks on weekends.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Shapeshifter Brewing Co.",
        address: "Unit 2/54 Crittenden Rd, Findon SA 5023",
        map: "https://maps.app.goo.gl/cLmyPurGiB5c7wLo6",
        photo: "/media/taprooms/shapeshifter-taproom.jpeg"
      }
    ]
  },
  {
    name: "Shout Brewing Co.",
    city: "Islington",
    state: "New South Wales",
    logo: "/media/logos/shout-brewing-co.png",
    website: "https://www.shoutbrewing.com.au/",
    instagram: "https://www.instagram.com/shoutbrewing",
    description: "Shout Brewing Co. is an independent, family-owned craft brewery located in Islington, Newcastle, New South Wales. The brewery is committed to crafting a diverse range of fresh, pure, and innovative beers. Pride is taken in being independent, with the founders actively involved in the brewing process. The brewery's venue provides a welcoming environment for patrons to enjoy their beers. Shout Brewing Co is dedicated to contributing to the local craft beer scene in Newcastle, offering quality brews and fostering a sense of community.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Shout Brewing",
        address: "22 Clyde St, Islington NSW 2296",
        map: "https://maps.app.goo.gl/2eSdBaDAm2dA2TxD6",
        photo: "/media/taprooms/shout-taproom.jpg"
      }
    ]
  },
  {
    name: "SixTwelve Brewing",
    city: "St Agnes",
    state: "South Australia",
    logo: "/media/logos/sixtwelve-brewing.png",
    website: "https://www.sixtwelvebrewing.com.au/",
    instagram: "https://www.instagram.com/sixtwelvebrewing",
    description: "SixTwelve Brewing is a family-owned craft brewery located in the northeastern suburbs of Adelaide, South Australia. Known for their passion and creativity in brewing, they blend inspiration from world-class brews with their unique flair. After years of home brewing and perfecting their recipes, SixTwelve has grown into a local favorite, offering a diverse range of beers from pale ales to experimental limited releases. Their focus is on delivering flavorful, balanced beers in a welcoming community atmosphere. SixTwelve Brewing continues to contribute to Adelaide's vibrant craft beer scene, offering innovative brews that appeal to both traditional beer enthusiasts and those seeking new flavors.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "SixTwelve Brewing",
        address: "Warehouse 3/132 Tolley Rd, St Agnes SA 5097",
        map: "https://maps.app.goo.gl/gti3pPV7Q1okzHGc6",
        photo: "/media/taprooms/sixtwelve-taproom.jpg"
      }
    ]
  },
  {
    name: "Small Gods",
    city: "Auckland",
    state: "New Zealand",
    logo: "/media/logos/small-gods.png",
    website: "https://www.smallgods.co.nz/",
    instagram: "https://www.instagram.com/smallgodsbrewery",
    description: "Small Gods Brewing is a collaborative, historical, and experimental brewing project based in Auckland, New Zealand. The brewery is dedicated to reviving ancient beer styles and legends with a modern twist. Named in honor of the yeasts responsible for fermentation and the late Terry Pratchett, Small Gods Brewing aims to keep history alive through their unique brews. Located at 2 Shaddock Street, Eden Terrace, the Small Gods Taproom offers a selection of their own beers alongside rare and interesting beers from New Zealand and around the world, curated by craft beer experts. The venue also hosts events such as quiz nights and run clubs, fostering a community atmosphere.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Small Gods Taproom",
        address: "2/2 Shaddock Street, Eden Terrace, Auckland 1021, New Zealand",
        map: "https://maps.app.goo.gl/Z14eUWDVb4uzSMna7",
        photo: "/media/taprooms/small-gods-taproom.jpg"
      }
    ]
  },
  {
    name: "Sunday Road Brewing Co.",
    city: "Kirrawee",
    state: "New South Wales",
    logo: "/media/logos/sunday-road-brewing-co.png",
    website: "https://sundayroadbrewing.com.au/",
    instagram: "https://www.instagram.com/sundayroadbrewing",
    description: "Sunday Road Brewing Co. is a 100% locally owned and proudly independent brewery located in Kirrawee, New South Wales. Born and raised in the Sutherland Shire, the brewery is committed to great beer as an extension of their dedication to family, good produce, sustainability, and community. The brewery's offerings include a range of award-winning beers, complemented by bar snacks and community events. Sunday Road Brewing Co has become a popular destination for locals and visitors alike, providing a space to enjoy quality brews in a relaxed and welcoming environment.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Sunday Road Brewing",
        address: "147 Bath Rd, Kirrawee NSW 2232",
        map: "https://maps.app.goo.gl/fkVKioEhRnLPnLGbA",
        photo: "/media/taprooms/sunday-road-taproom.jpeg"
      }
    ]
  },
  {
    name: "SURE Brewing",
    city: "Melbourne",
    state: "Victoria",
    logo: "/media/logos/sure-brewing.png",
    website: "https://surebrewing.com/",
    instagram: "https://www.instagram.com/surebrewing",
    description: "SURE Brewing is a craft brewery based in Melbourne, Victoria. The brewery was born out of a love for classic hops, styles, and flavor profiles, with beers made with care and attention. SURE Brewing offers a range of beers, including their 'Greatest Hits' and 'Future Classics', which are crafted to complement their unique approach to brewing. The brewery's approach combines traditional brewing techniques with modern influences, aiming to create beers that resonate with both classic beer enthusiasts and those seeking contemporary flavors. SURE Brewing continues to contribute to Melbourne's vibrant craft beer scene.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: []
  },
  {
    name: "Tar Barrel Brewery & Distillery",
    city: "Mornington",
    state: "Victoria",
    logo: "/media/logos/tar-barrel-brewery.png",
    website: "https://tarbarrel.com.au/",
    instagram: "https://www.instagram.com/tar.barrel",
    description: "Tar Barrel Brewery & Distillery is a craft brewery and distillery situated in Mornington, Victoria. The venue, located at 72 Watt Road, is known for its handcrafted beers and spirits, including whiskey and gin. The name 'Tar Barrel' originates from the area's history, where road builders stored tar barrels during road construction. The brewery and distillery offer a range of experiences, including beer tasting paddles, brewery and distillery tours, and wood-fired pizzas. The relaxed and casual venue features a beer garden, an indoor hanging garden, and a mezzanine overlooking the brewing and distilling areas. It is also dog-friendly, making it a popular spot for individuals, groups, and families to enjoy a drink and a meal.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Tar Barrel Brewery & Distillery",
        address: "72 Watt Rd, Mornington VIC 3931",
        map: "https://maps.app.goo.gl/cxNqZXAq6dL2JBCc8",
        photo: "/media/taprooms/tar-barrel-taproom.jpg"
      }
    ]
  },
  {
    name: "Working Title Brew Co.",
    city: "Newstead",
    state: "Queensland",
    logo: "/media/logos/working-title-brew-co.png",
    website: "https://workingtitlebrew.co/",
    instagram: "https://www.instagram.com/workingtitlebrew.co",
    description: "Working Title Brew Co. is a craft brewery located in Brisbane, Queensland. The brewery is known for its experimental approach to brewing, offering a range of innovative beers that push the boundaries of traditional styles. Their offerings include a variety of brews, often featuring unique ingredients and flavor profiles. The brewery's venue provides a space for patrons to enjoy their creations, with a focus on fostering a community of beer enthusiasts. Working Title Brew Co continues to contribute to Brisbane's dynamic craft beer scene, offering exciting and unconventional brews.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Working Title Brew Co.",
        address: "85 Doggett St, Newstead QLD 4006",
        map: "https://maps.app.goo.gl/Q6QnWuYGEQPoBkc37",
        photo: "/media/taprooms/working-title-taproom.jpg"
      }
    ]
  },
  {
    name: "Your Mates Brewing Co",
    city: "Warana",
    state: "Queensland",
    logo: "/media/logos/your-mates-brewing-co.png",
    website: "https://yourmatesbrewing.com/",
    instagram: "https://www.instagram.com/yourmatesbrewing",
    description: "Your Mates Brewing Co is a craft brewery located in the Sunshine Coast, Queensland. The brewery is known for producing high-quality beers that are both approachable and flavorful. Their offerings include a range of styles, brewed with a focus on quality and consistency. The brewery's venue provides a relaxed and welcoming environment for patrons to enjoy their beers, focusing on creating a friendly and social atmosphere. Your Mates Brewing Co continues to be a staple in the Sunshine Coast craft beer community.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Your Mates Warana",
        address: "41 Technology Dr, Warana QLD 4575",
        map: "https://maps.app.goo.gl/uRUkXuzAu11u5K329",
        photo: "/media/taprooms/your-mates-warana.jpg"
      },
      {
        name: "Crackerjack Cooroy",
        address: "5 Opal St, Cooroy QLD 4563",
        map: "https://maps.app.goo.gl/Nw7MFpFCHCSXPmWGA",
        photo: "/media/taprooms/your-mates-crackerjack.jpg"
      }
    ]
  }
];
