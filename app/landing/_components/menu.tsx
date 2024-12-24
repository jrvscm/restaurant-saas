
'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Icon } from '@/components/custom-icons';
import { ReservationForm } from './reservation-form';

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
    <section ref={menuSectionRef} className="relative min-h-screen w-full">
      {/* Reservation Bar */}
      <div className="w-full">
        <ReservationForm />
      </div>
      <div className={`relative z-10 mx-auto`}>
        <div className={`pb-8 pt-8 text-center bg-gray-600 ${isSticky ? 'fixed top-[64px] right-0 left-0 z-20 shadow-md text-muted' : ''}`}>
          <h1 className="font-logo text-4xl font-bold text-white">Our Menu</h1>
          <p className="text-lg text-gray-200">
            Explore our handcrafted dishes made with the finest ingredients!
          </p>
        </div>

        {/* Tabs for larger screens */}
        <div className={`hidden lg:block`}>
          <Tabs className={`w-full`} defaultValue="appetizers">
            <div className={`${
              isSticky ? 'fixed top-[196px] left-0 right-0 z-20 bg-gray-900 shadow-md' : ''
            }`}>
              <TabsList className={`rounded-tr-none rounded-tl-none rounded-br-none rounded-bl-none flex justify-center space-x-2 bg-gray-900 shadow-md z-10`}>
              {Object.keys(menuData).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="z-10 relative px-6 py-3 text-lg font-bold text-white uppercase transition-all hover:bg-yellow-400 hover:text-black focus:outline-none data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                >
                  {category.replace(/_/g, ' ').toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
            </div>
            {Object.entries(menuData).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="bg-paper-texture bg-center bg-cover p-6 mt-0">
                  <div className="flex justify-evenly items-center px-6 py-6">
                    <Icon name="pizzaSlice" className="text-primary" />
                    <Icon name="pizza" className="text-primary" />
                    <Icon name="pizzaSlice" className="text-primary" />
                    <Icon name="pizza" className="text-primary" />
                    <Icon name="pizzaSlice" className="text-primary" />
                  </div>
                  <p className="max-w-[85%] text-sm text-gray-700 whitespace-pre-line mb-6 mx-auto">{categoryInfo[category]?.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 animate-fade-in max-w-[85%] mx-auto">
                    {items.map((item, index) => (
                      <li
                        key={index}
                        className={`p-6 flex justify-between border-black/50 border-b relative ${
                          index < 2 ? 'border-t' : ''
                        } ${index % 2 === 0 ? 'sm:border-r' : ''}`}
                      >
                        <div className="flex-grow max-w-[70%]">
                          <h3 className="font-logo text-xl font-bold text-black">{item.name}</h3>
                          {item.description && (
                            <p className="text-sm mt-2 text-gray-600">{item.description}</p>
                          )}
                          {item.options && (
                            <ul className="mt-4 space-y-2">
                              {item.options.map((option, i) => (
                                <li key={i} className="text-sm text-gray-600">
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
        <div className="block lg:hidden">
          <Accordion type="single" collapsible defaultValue="pizzas">
            {Object.entries(menuData).map(([category, items]) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="text-lg font-bold text-white uppercase bg-gray-900 px-4 py-2">
                  {category.replace(/_/g, ' ').toUpperCase()}
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="bg-paper-texture">
                    <p className="text-sm text-gray-700 whitespace-pre-line mb-4 pl-4 pr-4 pt-4">
                      {categoryInfo[category]?.description}
                    </p>
                    <ul className="grid grid-cols-1">
                      {items.map((item, index) => (
                        <li
                          key={index}
                          className="p-4 flex justify-between border-black/50 border-b"
                        >
                          <div className="flex-grow pr-4">
                            <h3 className="font-logo text-xl font-bold text-black">{item.name}</h3>
                            {item.description && (
                              <p className="text-sm mt-2 text-gray-600">{item.description}</p>
                            )}
                            {item.options && (
                              <ul className="mt-4 space-y-2">
                                {item.options.map((option, i) => (
                                  <li key={i} className="text-sm text-gray-600">
                                    <span>{option.description}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div
                            className="w-24 flex-shrink-0 flex flex-col items-center justify-center border-l-4"
                            style={{
                              borderLeft: '4px double #FF4D4D',
                              minHeight: '100%',
                            }}
                          >
                            <p className="text-lg font-semibold text-yellow-500 text-center">
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