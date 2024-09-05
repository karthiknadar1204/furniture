import React from 'react'

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center">About Urban Furniture</h1>
      
      <div className="space-y-6 text-lg">
        <p>
          Urban Furniture is your premier destination for modern, stylish, and functional 
          home furnishings. Since our establishment in 2010, we've been passionate about 
          bringing contemporary design into homes across the country.
        </p>
        
        <p>
          Our curated collection showcases the best in urban living, featuring sleek lines, 
          innovative materials, and versatile pieces that adapt to your lifestyle. From 
          minimalist sofas to statement lighting, we offer furniture that transforms houses 
          into homes.
        </p>
        
        <p>
          At Urban Furniture, we believe that great design should be accessible to everyone. 
          That's why we partner with both established and emerging designers to bring you 
          high-quality furniture at competitive prices.
        </p>
        
        <p>
          Our commitment extends beyond just selling furniture. We're dedicated to 
          sustainable practices, working with manufacturers who prioritize eco-friendly 
          materials and production methods. When you choose Urban Furniture, you're not 
          just furnishing your home you're making a choice for a better planet.
        </p>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Visit Our Showroom</h2>
        <p className="text-lg">
          123 Design Street, Metropolis, NY 10001<br />
          Open Monday - Saturday, 10am - 7pm
        </p>
      </div>
    </div>
  )
}

export default AboutPage