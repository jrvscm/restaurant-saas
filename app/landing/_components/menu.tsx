
'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Icon } from '@/components/custom-icons';
import { ReservationForm } from './reservation-form';
import { Button } from '@/components/ui/button';

export const Menu = () => {
  const menuSectionRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    
    const handleScroll = () => {
      const menuSection = menuSectionRef.current;
      if (!menuSection) return;

      const menuTop = menuSection.getBoundingClientRect().top;
      const menuBottom = menuSection.getBoundingClientRect().bottom;

      if (menuTop <= 0 && menuBottom > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuData = {
    appetizers: [
      {
        name: 'Fogatza Dipping Bread',
        options: [
          {
            description: 'Served with San Marzano marinara. (VEGAN)',
            price: 8
          },
          {
            description: 'Served with house-made spinach artichoke dip.',
            price: 13
          }
        ]
      },
      {
        name: 'Jalapeño Poppers',
        description:
          "Four jalapeño halves, filled with cream cheese, and wrapped in Daily's bacon. *Unpredictably spicy!*",
        price: 12
      },
      {
        name: 'Mushroom Trio',
        description:
          'Three portabello mushrooms filled with cheese, each topped with a different ingredient: Peppers - Sausage - Pepperoni. Served on top of a balsamic reduction!',
        price: 12
      },
      {
        name: 'Wood-Fired Wings',
        description:
          'Choose one of our house-made dry rubs or sauces: Dry Rub, Dill Pickle Dry Rub, Carrello Buffalo Sauce, Our house-made BBQ sauce, or Chipotle Raspberry sauce.',
        price: { personal: 12, family: 18 },
      },
      {
        name: 'Caprese Salad',
        description:
          'Fresh basil, tomatoes, fresh mozzarella, served with garlic-infused olive oil and balsamic reduction.',
        price: 12
      },
      {
        name: 'Cheesy Bread',
        description:
          'Artisan dough topped with garlic-infused olive oil and cheeses, cut into strips and served with our San Marzano marinara sauce.',
        price: 8
      },
      {
        name: 'Cucumber Salad',
        description:
          'Tomato, red onion, and cucumber with an herbaceous creamy vinaigrette.',
        price: 10
      },
      {
        name: 'Olives, Herbs, Bread, & Cheese',
        description:
          'Imported olives warmed in the oven with herbs and garlic-infused olive oil, served with feta cheese & fresh homemade pita bread!',
        price: 10,
        notes: 'Make it VEGAN - ask for no feta.'
      }
    ],
    stuffed_pita_wraps: [
      {
        name: 'Chicken Bacon Ranch Wrap',
        description:
          "Wood-fired chicken, Daily's bacon, pepperoni, and peppers, warmed in the oven and tossed with tomatoes, shredded mozzarella, spinach, and our house-made ranch.",
        price: 13
      },
      {
        name: 'The Big Spicy Wrap',
        description:
          'Wood-fired chicken, pepperoni, jalapeños, black olives, and red onions warmed in the oven and tossed with shredded mozzarella, spinach, and our chipotle sauce.',
        price: 12
      },
      {
        name: 'The Crisper',
        description:
          'A cold wrap with spinach, chicken, shredded mozzarella, tomatoes, peppers, cucumber, and ranch.',
        price: 12,
        add_ons: [{ description: 'Add bacon', price: 1 }]
      },
      {
        name: 'Hamberry Wrap',
        description:
          'Sizzling ham from the oven, spinach, fresh mozzarella and mayo, served with a side of raspberry compote.',
        price: 12
      },
      {
        name: 'Pesto Chicken Wrap',
        description:
          'Wood-fired chicken, house-made pesto, tomatoes, fresh mozzarella, & fresh spinach.',
        price: 12
      },
      {
        name: 'BLT Wrap',
        description:
          "Six slices of Daily's bacon, spinach, tomatoes, and mayo, all stuffed in a fresh pita.",
        price: 10
      }
    ],
    pizzas: [
      {
        name: 'Classic Cheese',
        description:
        'Our classic rendition.',
        price: { personal: 7, family: 13 }
      },
      {
        name: 'Pepperoni Pizza',
        description:
          'San Marzano tomato sauce, shredded mozzarella and pepperoni.',
        price: { personal: 8, family: 15 }
      },
      {
        name: "1980's Pepperoni Pizza",
        description:
          'An over the top pepperoni pizza made with zesty marinara, shredded mozzarella, extra pepperoni, salt & black pepper, and Parmigiana Reggiano.',
        price: { personal: 11, family: 20 }
      },
      {
        name: 'Pesto Pepperoni',
        description:
          'House-made fresh basil pesto, cream cheese, shredded mozzarella, and pepperoni.',
        price: { personal: 11, family: 20 }
      },
      {
        name: 'Margherita',
        description:
          'San Marzano tomato sauce, fresh mozzarella, fresh basil, and garlic-infused olive oil.',
        price: { personal: 10, family: 18 }
      },
      {
        name: 'Fajita Pizza',
        description:
          'Spicy cumin garlic lime sauce, wood-fired chicken, mozzarella, peppers, red onions, jalapeños, dusted with chili pepper and topped with cilantro & lime.',
        price: { personal: 13, family: 24 },
        add_ons: [
          {
            description: 'Make it steak instead of chicken',
            price: { personal: 1, family: 2 }
          }
        ]
      }
    ],
    wood_fired_pastas: [
      {
        name: 'Pesto Chicken',
        description:
          'Fresh pasta, pesto cream sauce, wood-fired chicken, tomatoes, spinach and Parmigiana Reggiano.',
        price: 16
      },
      {
        name: 'Ragu',
        description:
          'Fresh pasta with a tomato-based wine sauce, sausage, and parmesan.',
        price: 16,
        notes: 'Make it VEGETARIAN or VEGAN!'
      },
      {
        name: 'Pasta Pepperoncini',
        description:
          "Fresh pasta, cream, ricotta, pepperoncini, Daily's bacon, sausage, and shredded mozzarella.",
        price: 17
      },
      {
        name: 'Pasta Americana',
        description:
          'Fresh pasta in a light cream sauce, wood-fired chicken, bacon, tomatoes, our own ricotta & roasted lemon. Topped with Parmigiana Reggiano & basil.',
        price: 17
      }
    ],
    rice_bowls: [
      {
        name: 'Mediterranean Rice Bowl',
        description:
          'Spinach, mushrooms, peppers, onions, corn, all-white chicken, wood-fired with Jasmine rice and a zesty cream sauce.',
        price: 12,
        notes: 'Available VEGETARIAN or VEGAN.'
      },
      {
        name: 'Pineapple Chipotle Rice Bowl',
        description:
          'Ham, peppers, onions, and pineapple, all wood-fired with Jasmine rice and a chipotle sour cream sauce. Topped with cilantro & lime.',
        price: 12,
        add_ons: [{ description: 'Add chicken', price: 1 }]
      }
    ],
    desserts: [
      {
        name: 'Tiramisu',
        description:
          'From Parma to you, this recipe is the real deal! No alcohol, no raw eggs, and not too sweet! Ours is made with our own in-house wood-oven roasted coffee, mascarpone, cream, eggs, and lady fingers, dusted with gorgeous French cocoa.',
        price: 9
      },
      {
        name: 'Blueberry Cream Calzone',
        description:
          '4" calzone with our own ricotta, white chocolate, and blueberries, topped with a sweet glaze.',
        price: 5
      },
      {
        name: "S'more Calzone",
        description:
          '4" calzone filled with cookie butter, marshmallow, and Ghirardelli chocolate, topped with a sweet glaze.',
        price: 5
      }
    ]
  };

  const categoryInfo = {
    appetizers: {
      description: 'Start your meal off right with our delicious appetizers!',
    },
    stuffed_pita_wraps: {
      description: 'Ask for a house-made pickle for an additional $.50!'
    },
    wood_fired_pastas: {
      description: 'We make our own rotini noodles from scratch daily with 100% semolina flour! All pastas are served with a side of our focaccia bread.'
    },
    rice_bowls: {
    },
    desserts: {
    },
    pizzas: {
      description: '9” Gluten Free crust available, add $3.\n9" Personal Size / 14" Family Size.\nHalf & half pizzas are priced as two small pizzas.',
    },
  };

  return (
    <section className="relative min-h-screen w-full">
      {/* Reservation Bar */}
      <div className="w-full">
        <ReservationForm />
      </div>

      <div className="
        relative min-h-[50vh] md:min-h-[80vh] 
        bg-rewards-image bg-center bg-cover 
        h-full
        flex flex-col items-center justify-center
        "
      >
        <Icon name="ribbon" className="
          block absolute top-[40px] md:top-[80px] left-0 
          h-auto md:h-[30%] 
          w-[80%] md:w-auto
        " />

        <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[50vh] md:min-h-[80vh]">
          <div className="w-full bg-black/75 md:bg-transparent min-h-[19vh]">
          </div>

          <div className="
            animate-fade-in 
            flex flex-col gap-8 items-center justify-center
            rounded-md bg-black/75 px-8 pt-8 pb-16
            text-white rounded-none md:rounded-md md:py-12 lg:px-16 lg:py-16">
            <Icon name="pizza" className="text-secondary" />
            <h2 className="font-logo text-2xl md:text-3xl text-center">Sign up for our rewards program!</h2>
            <p className="font-serif text-base md:text-xl text-center">
              Sign up for our rewards program and get exclusive offers and discounts.
              For every $1 dollar you spend, earn 5 rewards points that you can redeem
              for items in our store!
            </p>
            <Button className="
              w-full md:w-[200px]
              bg-secondary text-secondary-foreground 
              hover:text-secondary-foreground hover:bg-secondary/80
            ">Sign Up!</Button>
          </div>
        </div>
      </div>


      <div ref={menuSectionRef} className={`relative z-10 mx-auto`}>
        <div className={`relative pb-8 pt-8 text-center bg-gray-600 bg-secondary
          ${isSticky ? 'static lg:fixed lg:top-[64px] right-0 left-0 z-20 shadow-md' : ''}
        `}>
          <Icon name="curlyLeft" className="
            text-primary 
            absolute
            bottom-[-5px] left-[24px]
            md:left-[3rem]
            rotate-[-30deg]
            " />
          <Icon name="curlyright" className="
            text-primary absolute 
            top-[10px] right-[24px] 
            md:right-[3rem] md:top-[1rem]
            rotate-[-40deg]" />
          <h1 className="font-logo text-4xl text-secondary-foreground pb-6">Our Menu</h1>
          <p className="font-serif text-lg text-secondary-foreground">
            Explore our handcrafted dishes made with the finest ingredients!
          </p>
        </div>

        {/* Tabs for larger screens */}
        <div className={`hidden lg:block`}>
          <Tabs className={`w-full`} defaultValue="pizzas">
            <div className={`${
              isSticky ? 'fixed lg:top-[220px] left-0 right-0 z-20 text-secondary shadow-md' : ''
            }`}>
              <TabsList className={`rounded-tr-none rounded-tl-none rounded-br-none rounded-bl-none flex justify-center space-x-2 bg-secondary-foreground shadow-md z-10`}>
              {Object.keys(menuData).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="
                  z-10 relative px-6 py-3 text-lg font-bold text-white uppercase transition-all 
                  hover:bg-secondary hover:text-secondary-foreground hover:border hover:border-secondary-foreground focus:outline-none hover:shadow-md
                  data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-md
                  data-[state=active]:border data-[state=active]:border-secondary-foreground
                  "
                >
                  {category.replace(/_/g, ' ').toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
            </div>
            {Object.entries(menuData).map(([category, items]) => (
              <TabsContent key={category} value={category} className={`mt-0 ${
                isSticky ? 'lg:pt-[192px]' : ''
              }`}>
                <div className="bg-paper-texture bg-center bg-cover p-6 mt-0">
                  <div className="flex justify-evenly items-center px-6 py-6">
                    <Icon name="pizzaSlice" className="text-primary" />
                    <Icon name="pizza" className="text-primary" />
                    <Icon name="pizzaSlice" className="text-primary" />
                    <Icon name="pizza" className="text-primary" />
                    <Icon name="pizzaSlice" className="text-primary" />
                  </div>
                  <p className="max-w-[85%] text-lg text-gray-600 whitespace-pre-line mb-6 mx-auto">{categoryInfo[category]?.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 animate-fade-in max-w-[85%] mx-auto">
                    {items.map((item, index) => (
                      <li
                        key={index}
                        className={`p-6 flex justify-between border-black/50 border-b relative ${
                          index < 2 ? 'border-t' : ''
                        } ${index % 2 === 0 ? 'sm:border-r' : ''}`}
                      >
                        <div className="flex-grow max-w-[70%]">
                          <h3 className="font-logo text-2xl text-black">{item.name}</h3>
                          {item.description && (
                            <p className="text-lg mt-2 text-gray-600">{item.description}</p>
                          )}
                          {item.options && (
                            <ul className="mt-4 space-y-2">
                              {item.options.map((option, i) => (
                                <li key={i} className="text-lg text-gray-600">
                                  <span>{option.description}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div
                          className="w-32 flex-shrink-0 flex flex-col items-center justify-center border-l-4"
                          style={{
                            borderLeft: '4px double hsl(10, 72%, 50%)',
                            minHeight: '100%',
                          }}
                        >
                          <p className="text-lg font-semibold text-secondary-foreground text-center">
                            {item.price
                              ? typeof item.price === 'object'
                                ? Object.values(item.price)
                                    .map((price) => `$${price}`)
                                    .join(' / ')
                                : `$${item.price}`
                              : item.options
                              ? item.options.map((option) => `$${option.price || '-'}`).join(' / ')
                              : 'Price unavailable'}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-evenly items-center mt-12">
                    <Icon name="pizza" className="text-primary" />
                    <Icon name="pizzaSlice" className="text-primary" />
                    <Icon name="pizza" className="text-primary" />
                    <Icon name="pizzaSlice" className="text-primary" />
                    <Icon name="pizza" className="text-primary" />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Accordion for mobile */}
        <div className="block w-full lg:hidden">
          <Accordion type="single" collapsible defaultValue="pizzas">
            {Object.entries(menuData).map(([category, items]) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="text-lg font-bold text-white uppercase bg-secondary-foreground px-4 py-2">
                  {category.replace(/_/g, ' ').toUpperCase()}
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="bg-paper-texture">
                    <p className="text-base text-gray-600 whitespace-pre-line mb-4 pl-4 pr-4 pt-4">
                      {categoryInfo[category]?.description}
                    </p>
                    <ul className="grid grid-cols-1">
                      {items.map((item, index) => (
                        <li
                          key={index}
                          className="p-4 flex justify-between border-secondary-foreground border-b"
                        >
                          <div className="flex-grow pr-4">
                            <h3 className="font-logo text-xl text-secondary-foreground">{item.name}</h3>
                            {item.description && (
                              <p className="text-base mt-2 text-gray-600">{item.description}</p>
                            )}
                            {item.options && (
                              <ul className="mt-4 space-y-2">
                                {item.options.map((option, i) => (
                                  <li key={i} className="text-base text-gray-600">
                                    <span>{option.description}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div
                            className="w-24 flex-shrink-0 flex flex-col items-center justify-center border-l-4"
                            style={{
                              borderLeft: '4px double hsl(10, 72%, 50%)',
                              minHeight: '100%',
                            }}
                          >
                            <p className="text-base font-semibold text-secondary-foreground text-center">
                              {item.price
                                ? typeof item.price === 'object'
                                  ? Object.values(item.price)
                                      .map((price) => `$${price}`)
                                      .join(' / ')
                                  : `$${item.price}`
                                : item.options
                                ? item.options.map((option) => `$${option.price || '-'}`).join(' / ')
                                : 'Price unavailable'}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div> 
      </div>
    </section>
  );
};

export default Menu;