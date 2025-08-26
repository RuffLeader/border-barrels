const breweries = [
  {
    name: "Aether Brewing",
    city: "Northgate",
    state: "Queensland",
    logo: "media/logos/aether-brewing.png",
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
        map: "https://maps.app.goo.gl/zrAUYUWSnavn29R37"
      }
    ]
  },
  {
    name: "AVNGE Brewing",
    city: "Melbourne",
    state: "Victoria",
    logo: "media/logos/avnge-brewing.png",
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
    logo: "media/logos/bacchus-brewing-co.png",
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
        map: "https://maps.app.goo.gl/3nmaDiRSHPqcn8cR9"
      }
    ]
  },
  {
    name: "Balter Brewing Company",
    city: "Currumbin",
    state: "Queensland",
    logo: "media/logos/balter-brewing.png",
    website: "https://www.balter.com.au/",
    instagram: "https://www.instagram.com/balterbrewers",
    description: "Balter Brewing Company is an Australian craft brewery based in Currumbin, Queensland, established in 2016 by a group of Australian surfing champions, including Mick Fanning, Joel Parkinson, Josh Kerr, and Bede Durbidge. The brewery was sold to Carlton & United Breweries in 2019. Balter Brewing Company offers a variety of beer styles, including their full-time beers such as XPA, which is described as a pale beer with a 5.0% ABV and 30 IBU, characterized by its bold hop flavors. Their brewery, known as Balter HQ, serves as a tasting house and event hub, providing a space for visitors to tour the facility, taste the beers, and enjoy special events, great music, food vans, and a fun crew.",
    closed: false,
    independent: false,
    owner: "Carlton & United Breweries (Asahi Breweries)",
    taprooms: [
      {
        name: "Balter Brewing Company",
        address: "14 Traders Way, Currumbin Waters QLD 4223",
        map: "https://maps.app.goo.gl/e26AHzHcgxctqae78"
      }
    ]
  },
  {
    name: "BentSpoke Brewing Co",
    city: "Braddon",
    state: "Australian Capital Territory",
    logo: "media/logos/bentspoke-brewing-co.png",
    website: "https://www.bentspokebrewing.com.au/",
    instagram: "https://www.instagram.com/BentSpokeBeer",
    description: "BentSpoke Brewing Co is a Canberra-based brewing company founded in 2014 by brewers Richard Watkins and Tracy Margrain. The brewery operates a brewpub in the central Canberra suburb of Braddon and a commercial brewing and canning facility in the Canberra light-industrial estate of Mitchell. BentSpoke Brewing Co acknowledges the Ngunnawal peoples, the Traditional Custodians of the Canberra region, and recognizes their continuous connection to culture, community, and Country. Their brewpub showcases a significant range of Canberra and Australian-made spirits, and local farmers collect spent grain from the brewery as feed for their livestock.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "BentSpoke Brewing Co.",
        address: "48/38 Mort St, Braddon ACT 2612",
        map: "https://maps.app.goo.gl/3uViHmT2uXWMrTGs8"
      }
    ]
  },
  {
    name: "Big Shed Brewing",
    city: "Royal Park",
    state: "South Australia",
    logo: "media/logos/big-shed-brewing.png",
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
        map: "https://maps.app.goo.gl/MfxKVcuMbctZgfH36"
      }
    ]
  },
  {
    name: "Blackman's Brewery",
    city: "Torquay",
    state: "Victoria",
    logo: "media/logos/blackmans-brewery.png",
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
        map: "https://maps.app.goo.gl/e9jdqitgTKNoYVL28"
      },
      {
        name: "Geelong Beer Bar",
        address: "29/8 Lewalan St, Grovedale VIC 3216",
        map: "https://maps.app.goo.gl/SDDGWrEkcVq3zPzm8"
      },
      {
        name: "Ocean Grove Beer & Burger Bar",
        address: "82 The Terrace, Ocean Grove VIC 3226",
        map: "https://maps.app.goo.gl/dwHVXrQm1fgvpHje7"
      }
    ]
  },
  {
    name: "Bracket Brewing",
    city: "Marrickville",
    state: "New South Wales",
    logo: "media/logos/bracket-brewing.png",
    website: "https://bracketbrewing.com.au/",
    instagram: "http://instagram.com/bracketbrewing",
    description: "Bracket Brewing is a craft, independent nanobrewery located in Marrickville, Sydney, on Gadigal Land. The brewery is known for constantly changing and improving its beers, offering a variety of styles such as Hazy IPAs, Sours, DDH IPAs, and Imperial Stouts. Founded by father and son team Mark and Mike Meletopoulo, Bracket Brewing has quickly gained recognition in the craft beer community. Their high-caliber hazy IPAs have regularly topped the Untappd charts, earning them a reputation among brewers and drinkers alike.",
    closed: false,
    independent: true,
    owner: null,
    taprooms: [
      {
        name: "Bracket Brewing",
        address: "2/48 Addison Rd, Marrickville NSW 2204",
        map: "https://maps.app.goo.gl/2moxtzW6RKbr6uMq8"
      }
    ]
  },
];
