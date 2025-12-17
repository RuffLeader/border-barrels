const adventBeers = [
  {
    day: 1,
    image: "/media/carwyncanvent/day-1.png",
    beerName: "Big In Sheboygan",
    brewery: "Banks Brewing",
    style: "Oat Cream Triple IPA",
    abv: "10%",
    blurb: "A lot of citrus at first, with a background of creamy papaya and stonefruit. A bit like a candy shop, with multiple layers and an aroma that fills the room. Maaaasive beer! The booze is definitely there but it is cushioned (or “pillowed” wink wink) by a solid sweetness that leads to a mildly candied finish with a bitter aftertaste, reminding you that this is not boost juice but an actual bangin IPA.",

    scores: {
      advertised: 4.75,
      canArt: 3.5,
      blurb: 3.75,
      value: 5,
      untappd: 4.5,
      total: 21.5
    },

    reviews: {
      hudson: "HOLY BOOZEY! The 10% absolutely smacks you right in the chops. Even with this beer fueling me as though it’s Unleaded 97 in my SUV, it is smooth like great Jazz and oh so sweet, like revenge on those that have caused a great betrayal",
      sarah: "Tastes really nice, tastes just like a tropical juice. Is that what you’re after?"
    }
  },

  {
    day: 2,
    image: "/media/carwyncanvent/day-2.png",
    beerName: "Hoppy Farmhouse Estate Ale",
    brewery: "Devilbend Farm Beer Co",
    style: "Farmhouse Ale",
    abv: "5%",
    blurb: "The funk and earthy aromas dominate, with notes of wet hay, musk, pomme and light citrus in the background. Quite phenolic and refreshing, a great example of a Farmhouse Ale with Pale Ale drinkability. This beer really encapsulates the “Paddock to Pint” (or in the case of Canvent “Country to Can”) ethos that they live by, with as many elements from each beer as possible grown at the brewery farm.",

    scores: {
      advertised: 4.5,
      canArt: 3.75,
      blurb: 4.5,
      value: 3,
      untappd: 3.25,
      total: 19
    },

    reviews: {
      hudson: "Forgot to write a review.",
      sarah: "Hudson forgot to ask for a review."
    }
  },

  {
    day: 3,
    image: "/media/carwyncanvent/day-3.png",
    beerName: "Raze",
    brewery: "Cypher Brewing Co",
    style: "West Coast IPA",
    abv: "7%",
    blurb: "Big Pineapple and Vinous straight out of the bat, with underlying diesel notes. Certainly fruity, with some orange citrus and punchy resin, supported by a sweet background bready malt. The bitterness is moderate, true to the modern versions of the West Coast style. Delicious!",

    scores: {
      advertised: 4.5,
      canArt: 4.75,
      blurb: 4,
      value: 4.5,
      untappd: 4.5,
      total: 22.25
    },

    reviews: {
      hudson: "As soon as it was poured into the glass I was worried, it is so light in colour. As soon as my nose  was touched by its sweet aromas, my worry was alleviated. This is a brilliant West Coast IPA, full of your typical resin, piney, and dank flavours. Never judge a beer by its colour.",
      sarah: "It’s very bitter, it’s like, very bitter. Not sure about that one."
    }
  },

  {
    day: 4,
    image: "/media/carwyncanvent/day-4.png",
    beerName: "Pavaclicious",
    brewery: "Phat Brew Club",
    style: "Pavlova Sour",
    abv: "6%",
    blurb: "This could not get any closer to what the artwork says! Massive strawberry and kiwi, with notes of pasito and some rosewater in the background. Super juicy, with a solid acidity that balances that sweet fruit character. Not absurdly thick for the pastry sour style, which just adds to its massive drinkability.",

    scores: {
      advertised: 5,
      canArt: 4.5,
      blurb: 4.25,
      value: 3.75,
      untappd: 4.5,
      total: 22
    },

    reviews: {
      hudson: "This is more Pav than Matthew. If a pav was sour and also beer, this is what it would be. I’ve never been happier to steal an NZ tradition more than the pav.",
      sarah: "That’s sour. Tastes like berries. Once the sour’s gone, it’s nice."
    }
  },

  {
    day: 5,
    image: "/media/carwyncanvent/day-5.png",
    beerName: "A Deal for Good",
    brewery: "Good Land Brewing Co x Adroit Theory",
    style: "Barrel Blend Dark Ale",
    abv: "14.8%",
    blurb: "What a nose! Burnt Basque Cheesecake, Chocolate Wafer Sticks, Dark Fruit, Toffee, Dark Caramel, Vanilla. And as it warms up you get light Bourbon and Coconut, with a Cinnamon-like heat. It gets better and better the longer you keep on going back to it. Big bitter roasty finish that adds balance and gives it both dimension and length, without letting it get too cloying.",

    scores: {
      advertised: 5,
      canArt: 3.75,
      blurb: 4.5,
      value: 5,
      untappd: 4.75,
      total: 23
    },

    reviews: {
      hudson: "Just read the lyrics to the chorus of Rocket Man by Elton John, except I am a literal hybrid Rocket-Man who is fuelled by rocket fuel and/or this monstrous beer. It’s kind of like if Vanilla Essence was poured into the strongest stout you’ve ever had, and then topped off with coconut distilled in Diesel and spirits. This is 100% the most complex beer I’ve ever had, both in production, and in my feelings. My heart is saying yum, but my head is saying, what the fuck are you doing to us.",
      sarah: "Smells like an espresso martini, but like a beer version. *Keels over and coughs* That is awful. Does it have whiskey in it? It’s hitting my throat and my oesophagus, the burn of drinking a shot of whiskey. Ughhhhh yucky! *5 mins later* It’s sitting in my heart, like it’s hurting, it’s actually hurting."
    }
  },

  {
    day: 6,
    image: "/media/carwyncanvent/day-6.png",
    beerName: "Dream State",
    brewery: "Allday Brewing Co",
    style: "Hazy IIPA",
    abv: "8.5%",
    blurb: "This Double Hazy has notes of Orange Creamsicle & Yellow Peach, with Rock Melon Rind. The bitterness is definitely present, reminding us that this is not a NEIPA but a Hazy that does not mess around. The booze does lets itself notice, but it’s enjoyable nonetheless. Big and Bold. What a debut!",

    scores: {
      advertised: 4.5,
      canArt: 4,
      blurb: 3,
      value: 5,
      untappd: 4.25,
      total: 20.75
    },

    reviews: {
      hudson: "Juicy, boozy, tropical, slightly dank. It has the properties of both a melt-in-your-mouth hazy IPA, and a thick punch-in-your-mouth IIPA. A wonderful experience for my tastebuds.",
      sarah: "Is that it? *Pointing at can* It tastes thick, like, I don’t know what like, but it just tastes thick. Not like milk, but you know, that consistency. It’s pretty nice."
    }
  },

  {
    day: 7,
    image: "/media/carwyncanvent/day-7.png",
    beerName: "Fruity Wonderland",
    brewery: "Hiker Brewing Co",
    style: "Tropical West Coast IPA",
    abv: "7%",
    blurb: "What a treat to finish off week one! Brewed with Citra and Mosaic Cryo and loaded with different fruit terpenes. It smells wonderful, with notes of “Prescribed” Gummies, Mango, Pineapple Lollies, Passionfruit & Peach. It has a solid bitter backbone like an old school IPA, but without the taste. Slick in texture but refreshing. Truly a 'fruity wonderland'.",

    scores: {
      advertised: 5,
      canArt: 5,
      blurb: 3,
      value: 4.5,
      untappd: 4.75,
      total: 22.25
    },

    reviews: {
      hudson: "Tropical is an absolute understatement, this is the most tropical. Like if a tropical island went to an even better tropical island for its summer holiday. Juicy, piney, gorgeous.",
      sarah: "Smells nice. Ooooh it’s strong. Flavour. *Two sips* I’m trying to work out what I’m tasting. No don’t put that in! Is it wheaty? Hoppy? It’s earthy. Dirt? That’s not the right word."
    }
  },

  {
    day: 8,
    image: "/media/carwyncanvent/day-8.png",
    beerName: "Czechlist",
    brewery: "Slow Lane Brewing",
    style: "Czech Pilsner",
    abv: "5.5%",
    blurb: "The nose is Bready, with a light spiciness carried by some herbal & grassy hop notes. Medium bodied, with a mild sweetness that’s quickly covered by a solid bitterness that carries till the end of the sip and lingers slightly. A great refreshing start for this week, it’s a school night after all.",

    scores: {
      advertised: 5,
      canArt: 3.5,
      blurb: 4.75,
      value: 3.5,
      untappd: 4.75,
      total: 21.5
    },

    reviews: {
      hudson: "Saaz is instantly recognisable, earthy and spicy. I also taste some banana, and a hint of nuts. Maybe I’m the one that’s nuts, nuts for this beer!",
      sarah: "That’s really nice. That’s all I’ve got, that’s nice."
    }
  },

  {
    day: 9,
    image: "/media/carwyncanvent/day-9.png",
    beerName: "Liquid Hot Magma",
    brewery: "Rocky Ridge Brewing Co.",
    style: "Belgian Lava Cake Stout",
    abv: "7%",
    blurb: "A traditional Belgian yeast with a massive modern twist. Notes of Burnt Chocolate, 99% Chocolate, Brownie Crust and some lovely Pomegranate esters that come forward as it warms up. Drinks as a tasty but richer dry stout with an extra roasty kick. Beware as the alcohol is very well hidden, this magma won’t burn you, but it might hit later!",

    scores: {
      advertised: 5,
      canArt: 3.75,
      blurb: 3,
      value: 4.5,
      untappd: 4.75,
      total: 21
    },

    reviews: {
      hudson: "Decadent without being too rich, like a wonderful chocolate cake with notes of caramel, and possibly coffee? Because it isn’t so rich, it’s quite easy to drink, and really allows the flavours to hit hard.",
      sarah: "Oh what is that aftertaste? I mean it’s probably one of the better dark beers I’ve tasted. Is it nutty slightly? A chocolate nutty taste."
    }
  },

  {
    day: 10,
    image: "/media/carwyncanvent/day-10.png",
    beerName: "Endless Sky",
    brewery: "Range Brewing",
    style: "California IPA",
    abv: "6%",
    blurb: "Tropical paradise in a can! Underripe Pineapple, Meyer Lemons, Honeydew, Light resin. Massive drinkability on this one, as the style dictates. Easy mid-week treat with delicious.",

    scores: {
      advertised: 4.75,
      canArt: 3.75,
      blurb: 4,
      value: 3.5,
      untappd: 4.5,
      total: 20.5
    },

    reviews: {
      hudson: "Crispy. Super, super tropical, I assume thanks in large part to the Citra Hyperboost. If they put that in a large NEIPA, I might not ever drink anything ever again.",
      sarah: "It’s nice. Easy to drink. Got a bit of orange, or peach, or stone fruit. It’s a very summery beer. I reckon that’s easier to drink after mowing the lawns than the one you said earlier in the week."
    }
  },

  {
    day: 11,
    image: "/media/carwyncanvent/day-11.png",
    beerName: "Yarra Red",
    brewery: "RWarrandyte Brewing Co",
    style: "Hoppy Red Ale",
    abv: "5.6%",
    blurb: "Notes of Strawberry Jam, Dates, Caramel and Table Red Grapes with an underlying tropical character. It has a toasty assertive bitterness, with Berry Compote flavour but very easy drinking. Definitely a modern take on an American Red Ale, with tropical notes all around a big malty base. Old school craft meets modern hype! Delish!",

    scores: {
      advertised: 4.5,
      canArt: 3.5,
      blurb: 4.75,
      value: 3.5,
      untappd: 4.25,
      total: 20.5
    },

    reviews: {
      hudson: "Extremely light Red Ale, seems almost a Red IPA. Bitter with flavours of tropical and stone fruits. This is just really fresh and a lovely drink.",
      sarah: "That’s strong. It’s not bad."
    }
  },

  {
    day: 12,
    image: "/media/carwyncanvent/day-12.png",
    beerName: "Pow Wow",
    brewery: "One Drop Brewing Co x RaR Brewing",
    style: "Smoothie Cream Sour",
    abv: "6.4%",
    blurb: "Just look at that pour and those slow creeping bubbles trying to escape. This is thick thick thiiiiiiiick!!! Notes of Blackberry Yogurt, Apricot, Light Thyme and Banana with a light Coconut aftertaste. A solid acidity cuts through that cake sweetness, and it brings balance to an impressive beer.",

    scores: {
      advertised: 5,
      canArt: 4.25,
      blurb: 4.75,
      value: 4,
      untappd: 4.75,
      total: 22.75
    },

    reviews: {
      hudson: "Thick boi! This poured like an actual smoothie, and looked like blueberry juice. A luscious and velvety mouthfeel, with an absolute barrage of berry and tropical flavours. Not so sweet that it is off putting, and also not super sour that it crinkles your face. Still, it’s bloody delicious.",
      sarah: "That is so thick. But really nice, genuinely just tastes like a berry smoothie with a slight hint of sour. Drinking a beer this thick is unusual."
    }
  },

  {
    day: 13,
    image: "/media/carwyncanvent/day-13.png",
    beerName: "Baltic Porter",
    brewery: "The Albert Brewery",
    style: "Baltic Porter",
    abv: "6.7%",
    blurb: "Notes of Chocolate, Brownie Ends, Nuts, Light Toffee with some Pomegranate & Dark Cherry esters as it warms up. Dark fruit character in mouth with roasty bitterness. Rich but still only medium bodied, honestly what a delicious beer.",

    scores: {
      advertised: 4.5,
      canArt: 3.5,
      blurb: 3,
      value: 4.25,
      untappd: 3.75,
      total: 19
    },

    reviews: {
      hudson: "Smokey, coffee, chocolate and a perfect amount of carbonation. Easy drinking, and non-offensive, a really approachable porter.",
      sarah: "It’s alright, it’s not bad. It doesn’t have a normal heavy and strong taste like a dark beer. It’s not too bad."
    }
  },

  {
    day: 14,
    image: "/media/carwyncanvent/day-14.png",
    beerName: "Hoppy Lil' Accident",
    brewery: "Bridge Road Brewers x Firestone Walker Brewing Company",
    style: "West Coast Pilsner",
    abv: "6.1%",
    blurb: "A true delicious hoppy beer. Tropical delight on the nose with massive fruit character packed into this lager. Notes of Pineapple, Guava, Melon & Canned Peaches. Really refreshing, with a pleasing herbal bitterness and some lemongrass notes in the finish.",

    scores: {
      advertised: 4.75,
      canArt: 5,
      blurb: 4.5,
      value: 3.75,
      untappd: 4.75,
      total: 22.75
    },

    reviews: {
      hudson: "I’ll tell you what, this beer is absolutely wonderful! The perfect blend of hoppy, crisp and fullness. A delight for the buds.",
      sarah: "That’s pretty nice, very refreshing. Not a very strong beer taste."
    }
  },

  {
    day: 15,
    image: "/media/carwyncanvent/day-15.png",
    beerName: "Cherry BOMG (Beaker Oh My God)",
    brewery: "KAIJU! Beer",
    style: "Cherry Terpene Sour",
    abv: "5.5%",
    blurb: "Notes of Bomg Water Slurpee, Candy, Pastilles, Strawberry Kush & High-biscus Tea. Some malty bready notes in the background, with a soft acidity that gives it a dry finish. A fruity beer that leaves us ready to tackle the week ahead!",

    scores: {
      advertised: 5,
      canArt: 4.75,
      blurb: 3,
      value: 3.5,
      untappd: 5,
      total: 21.25
    },

    reviews: {
      hudson: "The smell had me a bit worried, but the taste is absolutely incredible. Sour cherries that rounds out so smoothly. This is a truly special beer.",
      sarah: "I like that. That's really nice, it doesn't taste like a beer. It's just a very light refreshing drink, without the normal beer aftertaste or anything."
    }
  },
  
  {
    day: 2,
    image: "/media/advent-bc/day2.jpg",
    beerName: "Placeholder Beer",
    brewery: "TBC",
    style: "TBC",
    abv: "—",
    blurb: "Beer not yet reviewed.",

    placeholder: true
  }
];
