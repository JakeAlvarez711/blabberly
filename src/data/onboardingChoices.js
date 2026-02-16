export const TASTE_CATEGORIES = {
  food: {
    label: "Food",
    subtitle: "What do you crave?",
    items: [
      { token: "sushi", label: "Sushi" },
      { token: "brunch", label: "Brunch" },
      { token: "cheap_eats", label: "Cheap Eats" },
      { token: "pizza", label: "Pizza" },
      { token: "tacos", label: "Tacos" },
      { token: "ramen", label: "Ramen" },
      { token: "bbq", label: "BBQ" },
      { token: "seafood", label: "Seafood" },
      { token: "burgers", label: "Burgers" },
      { token: "street_food", label: "Street Food" },
      { token: "fine_dining", label: "Fine Dining" },
      { token: "comfort_food", label: "Comfort Food" },
      { token: "desserts", label: "Desserts" },
    ],
  },
  drinks: {
    label: "Drinks",
    subtitle: "What are you sipping?",
    items: [
      { token: "espresso_martini", label: "Espresso Martinis" },
      { token: "craft_cocktails", label: "Craft Cocktails" },
      { token: "craft_beer", label: "Craft Beer" },
      { token: "wine", label: "Wine" },
      { token: "coffee", label: "Coffee" },
      { token: "boba", label: "Boba" },
      { token: "margaritas", label: "Margaritas" },
      { token: "mocktails", label: "Mocktails" },
      { token: "natural_wine", label: "Natural Wine" },
    ],
  },
  vibe: {
    label: "Vibe",
    subtitle: "What's the scene?",
    items: [
      { token: "dive_bar", label: "Dive Bars" },
      { token: "rooftop", label: "Rooftops" },
      { token: "date_night", label: "Date Night" },
      { token: "late_night", label: "Late Night" },
      { token: "laptop_friendly", label: "Laptop Friendly" },
      { token: "speakeasy", label: "Speakeasy" },
      { token: "outdoor_patio", label: "Outdoor Patio" },
      { token: "cozy", label: "Cozy" },
      { token: "trendy", label: "Trendy" },
      { token: "live_music", label: "Live Music" },
      { token: "family_friendly", label: "Family-Friendly" },
      { token: "sports_bar", label: "Sports Bar" },
      { token: "pet_friendly", label: "Pet-Friendly" },
    ],
  },
};

export const CATEGORY_ORDER = ["food", "drinks", "vibe"];

export const MIN_TOTAL_TAGS = 3;
export const MAX_TOTAL_TAGS = 5;
export const MAX_PER_SECTION = 3;
