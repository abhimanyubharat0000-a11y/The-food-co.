import React, { useState } from 'react';
import { MenuItem } from '../types/burger';
import { Sparkles, Flame, Check, Utensils, Info } from 'lucide-react';

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'b1',
    name: 'The Heritage Truffle Burger',
    category: 'Burgers',
    tagline: 'Signature House Creation',
    description: 'Golden quinoa-lentil smash patty, molten vegetarian cheddar, crisp hydroponic greens, caramelized onions, and slow-roasted garlic truffle relish on toasted sesame brioche.',
    ingredients: ['Quinoa & Lentil Patty', 'Vegetarian Cheddar', 'Truffle Relish', 'Toasted Sesame Brioche'],
    spiceLevel: 1,
    chefSpecial: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    badge: 'Chef Signature',
  },
  {
    id: 'b2',
    name: 'Golden Crisp Paneer Burger',
    category: 'Burgers',
    tagline: 'Fiery & Tender',
    description: 'Thick hand-cut cottage cheese steak with an herb-crusted crispy exterior, melted cheese blanket, pickled gherkins, and smoked tomato chipotle glaze.',
    ingredients: ['Herb-Crusted Paneer', 'Molten Cheese', 'Pickled Gherkins', 'Smoked Tomato Glaze'],
    spiceLevel: 2,
    chefSpecial: false,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80',
    badge: 'Crispy & Bold',
  },
  {
    id: 'b3',
    name: 'Fiery Jalapeno Smash Burger',
    category: 'Burgers',
    tagline: 'High Heat Masterpiece',
    description: 'Spiced vegetable and sweet potato cutlet with charred jalapeno relish, crisp iceberg lettuce, purple onion rings, and cilantro-lime emulsion.',
    ingredients: ['Spiced Vegetable Cutlet', 'Charred Jalapeno', 'Purple Onions', 'Cilantro-Lime Emulsion'],
    spiceLevel: 3,
    chefSpecial: false,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    badge: 'Spicy Kick',
  },
  {
    id: 'r1',
    name: 'Paneer Tikka Charcoal Roll',
    category: 'Rolls',
    tagline: 'Smoky Tandoor Classic',
    description: 'Tender cottage cheese charred over open flame, crunchy laccha onion rings, and zesty fresh mint labneh rolled snugly inside a flaky layered whole wheat paratha.',
    ingredients: ['Tandoor Paneer', 'Laccha Onions', 'Mint Labneh', 'Flaky Paratha'],
    spiceLevel: 2,
    chefSpecial: true,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular Favorite',
  },
  {
    id: 'r2',
    name: 'Crispy Mushroom & Sweetcorn Roll',
    category: 'Rolls',
    tagline: 'Rich Umami Texture',
    description: 'Button mushrooms sautéed in garlic butter, golden sweetcorn niblets, melted vegetarian cheese, and freshly crushed black pepper wrapped warm.',
    ingredients: ['Garlic Sautéed Mushrooms', 'Sweetcorn', 'Melted Cheese', 'Herb Wrap'],
    spiceLevel: 1,
    chefSpecial: false,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    badge: 'Umami Rich',
  },
  {
    id: 'c1',
    name: 'Wok-Tossed Hakka Chowmein',
    category: 'Chowmein',
    tagline: 'High-Flame Wok Heirloom',
    description: 'Fresh wheat noodles tossed at high flame with julienned bell peppers, shredded cabbage, toasted sesame seeds, dark soy reduction, and crispy scallions.',
    ingredients: ['Fresh Wheat Noodles', 'Crisp Peppers', 'Dark Soy Reduction', 'Toasted Sesame'],
    spiceLevel: 1,
    chefSpecial: true,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    badge: 'Wok Mastered',
  },
  {
    id: 'c2',
    name: 'Fiery Schezwan Chilli Chowmein',
    category: 'Chowmein',
    tagline: 'Pounded Peppercorn Heat',
    description: 'Smoky noodles charred with our house-crafted Sichuan chilli paste, roasted garlic flakes, crunchy baby corn, and fresh celery shoots.',
    ingredients: ['Sichuan Chilli Paste', 'Roasted Garlic Crisps', 'Baby Corn', 'Celery Shoots'],
    spiceLevel: 3,
    chefSpecial: false,
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    badge: 'Fiery Wok',
  },
  {
    id: 's1',
    name: 'Truffle & Rosemary Loaded Fries',
    category: 'Sides',
    tagline: 'Double-Crisped Perfection',
    description: 'Hand-cut russet potatoes fried to a glass-shattering crunch, tossed in aromatic white truffle oil, coarse sea salt, and aged vegetarian parmesan.',
    ingredients: ['Hand-Cut Russets', 'White Truffle Oil', 'Rosemary Salt', 'Aged Veg Parmesan'],
    spiceLevel: 1,
    chefSpecial: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    badge: 'Crispy Obsession',
  },
];

export const SignatureBitesMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = ['All', 'Burgers', 'Rolls', 'Chowmein', 'Sides'];

  const filteredItems =
    activeCategory === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="signature-bites" className="relative py-28 md:py-36 bg-[#08080a] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-cinzel font-semibold tracking-widest uppercase mb-4">
            <Utensils className="w-3.5 h-3.5" />
            Curated Vegetarian Menu
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-gradient uppercase tracking-tight mb-4">
            Our Signature Bites
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light max-w-xl mx-auto">
            Crafted fresh to order in our dedicated 100% vegetarian kitchen. Every bite features artisanal textures, natural crunch, and layered spices.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-cinzel tracking-wider uppercase transition-all ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#101014] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col hover:-translate-y-1.5 shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              {/* Food Visual Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-black/40" />

                {/* Badge Top Left */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-cinzel font-semibold tracking-wider uppercase bg-amber-500/90 text-black shadow">
                    {item.badge}
                  </span>
                </div>

                {/* Spice Meter Top Right */}
                <div className="absolute top-3 right-3 flex items-center gap-0.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <Flame
                      key={idx}
                      className={`w-3 h-3 ${
                        idx < item.spiceLevel ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      100% Pure Veg
                    </span>
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-white group-hover:text-amber-200 transition-colors mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Ingredients & Details Action */}
                <div className="pt-3 border-t border-zinc-800/80">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.ingredients.slice(0, 2).map((ing, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-amber-500/20 text-zinc-300 hover:text-amber-200 border border-zinc-800 hover:border-amber-500/40 text-xs font-cinzel font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Ingredients</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nutritional & Dietary Guarantee Note */}
        <div className="mt-14 text-center">
          <p className="text-xs text-zinc-500 font-mono">
            All preparation strictly conforms to 100% vegetarian culinary standards. No meat, fish, gelatin, or poultry derivatives are ever permitted in our premise.
          </p>
        </div>
      </div>

      {/* Ingredient Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-[#121217] border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold">
                  {selectedItem.category} • {selectedItem.badge}
                </span>
                <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white mt-1">
                  {selectedItem.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-zinc-400 hover:text-white text-lg p-1"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed mb-6">
              {selectedItem.description}
            </p>

            <h4 className="font-cinzel text-xs font-semibold text-amber-300 uppercase tracking-wider mb-3">
              Key Ingredients & Craft
            </h4>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {selectedItem.ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200"
                >
                  <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="truncate">{ing}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800 text-xs">
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Pure Vegetarian Kitchen
              </span>
              <a
                href="#location"
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-full bg-amber-500 text-black font-cinzel font-bold text-xs uppercase hover:bg-amber-400 transition-colors"
              >
                Order At Counter
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
