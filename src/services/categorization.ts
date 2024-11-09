const categories = ['Technology', 'Entertainment', 'Politics', 'Sports', 'Business', 'Science', 'Health']

export function categorizeAccount(description: string): string {
  // This is a simple categorization based on keyword matching
  // In a real-world scenario, you'd want to use a more sophisticated NLP approach
  const lowerDescription = description.toLowerCase()
  
  for (const category of categories) {
    if (lowerDescription.includes(category.toLowerCase())) {
      return category
    }
  }

  return 'Other'
}