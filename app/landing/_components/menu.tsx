import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Menu = () => {
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
        sizes: [
          { size: 'Half Order', price: 12 },
          { size: 'Full Order', price: 18 }
        ]
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

  return (
    <section className="relative min-h-screen w-full bg-menu-image bg-cover bg-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-logo text-4xl font-bold text-white">Our Menu</h1>
          <p className="text-lg text-gray-200">
            Explore our handcrafted dishes made with the finest ingredients!
          </p>
        </div>

        {/* Tabs */}
        <Tabs className="w-full">
          <TabsList className="mb-6 flex justify-center space-x-4">
            {Object.keys(menuData).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:ribbon-tab relative px-6 py-2 text-lg font-semibold uppercase text-white transition-all hover:text-yellow-400 focus:outline-none data-[state=active]:bg-yellow-500"
              >
                {category.replace(/_/g, ' ').toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Render Menu Items */}
          {Object.entries(menuData).map(([category, items]) => (
            <TabsContent
              key={category}
              value={category}
              className="animate-fade-in p-6"
            >
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg"
                  >
                    <h3 className="font-logo text-xl font-bold text-black">
                      {item.name}
                    </h3>

                    {/* Render Description */}
                    {item.description && (
                      <p className="mt-2 text-gray-600">{item.description}</p>
                    )}

                    {/* Render Price */}
                    {typeof item.price === 'object' ? (
                      <div className="mt-2">
                        {Object.entries(item.price).map(([size, price]) => (
                          <p key={size} className="text-sm text-gray-700">
                            <span className="font-bold capitalize">
                              {size}:
                            </span>{' '}
                            ${price}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-4 text-lg font-semibold text-yellow-500">
                        {item?.price && `$${item.price}`}
                      </p>
                    )}

                    {/* Render Options */}
                    {item.options && (
                      <ul className="mt-4 space-y-2">
                        {item.options.map((option, i) => (
                          <li
                            key={i}
                            className="flex justify-between text-sm text-gray-600"
                          >
                            <span>{option.description}</span>
                            <span className="font-semibold text-yellow-500">
                              {option?.price && `$${option.price}`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Render Add-ons */}
                    {item.add_ons && (
                      <ul className="mt-4 space-y-2">
                        {item.add_ons.map((add_on, i) => (
                          <li
                            key={i}
                            className="flex justify-between text-sm text-gray-600"
                          >
                            <span>{add_on.description}</span>
                            {typeof add_on.price === 'object' ? (
                              Object.entries(add_on.price).map(
                                ([size, price]) => (
                                  <span key={size} className="text-yellow-500">
                                    {size}: ${price}
                                  </span>
                                )
                              )
                            ) : (
                              <span className="font-semibold text-yellow-500">
                                ${add_on.price}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Render Notes */}
                    {item.notes && (
                      <p className="mt-4 text-sm italic text-gray-500">
                        {item.notes}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Menu;
