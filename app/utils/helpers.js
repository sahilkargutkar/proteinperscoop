export const getDBCategory = (categoryId) => {
    const categories = {
        protein: 'Protein Supplements',
        health: 'Health Supplements',
        performance: 'Performance Supplements',
        general: 'General',
        home: 'Home',
        beauty: 'Beauty',
        sports: 'Sports',
    };
    return categories[categoryId] || 'General';
};

// Function to convert full category names to route slugs
export const getCategorySlug = (categoryName) => {
    const slugMap = {
        'Protein Supplements': 'protein',
        'Health Supplements': 'health',
        'Performance Supplements': 'performance',
        'General': 'general',
        'Home': 'home',
        'Beauty': 'beauty',
        'Sports': 'sports',
    };
    return slugMap[categoryName] || categoryName.split(" ")[0].toLowerCase();
};



export function getAllDeals(responseObject) {
  // Check if the input is a valid object.
  if (typeof responseObject !== 'object' || responseObject === null) {
    console.error("Input is not a valid object.");
    return [];
  }

  // Initialize an empty array to hold all the deals.
  let allDeals = [];

  // Iterate over each category (key) in the response object.
  for (const category in responseObject) {
    // Ensure the property is directly on the object and not from its prototype chain.
    if (responseObject.hasOwnProperty(category)) {
      const dealsInCategory = responseObject[category];

      // Check if the value for the category is an array.
      if (Array.isArray(dealsInCategory.deals)) {
        // Concatenate the deals from the current category to the main array.
        allDeals = allDeals.concat(dealsInCategory.deals);
      } else {
        console.warn(`Category '${category}' does not contain a valid array of deals and will be skipped.`);
      }
    }
  }

  return allDeals;
}