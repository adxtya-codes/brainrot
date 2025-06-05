import React from 'react';

const SizeGuidePage = () => (
  <div className="container mx-auto px-4 py-16 max-w-2xl">
    <h1 className="text-3xl font-bold mb-8">Oversized Tshirts - Size Guide</h1>
    <p className="text-muted-foreground mb-4 text-lg">
      Use the size chart below to determine your size.
    </p>
    <div className="overflow-x-auto rounded-lg border mb-8">
      <table className="min-w-full bg-background text-base text-center">
        <thead>
          <tr>
            <th className="py-2 px-4">Size</th>
            <th className="py-2 px-4">Chest<br />in</th>
            <th className="py-2 px-4">Length<br />in</th>
            <th className="py-2 px-4">Sleeve<br />in</th>
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-muted/30">
            <td className="py-2 font-medium">XS</td>
            <td className="py-2">41-42</td>
            <td className="py-2">27</td>
            <td className="py-2">8</td>
          </tr>
          <tr className="even:bg-muted/30">
            <td className="py-2 font-medium">S</td>
            <td className="py-2">44</td>
            <td className="py-2">28</td>
            <td className="py-2">9</td>
          </tr>
          <tr className="even:bg-muted/30">
            <td className="py-2 font-medium">M</td>
            <td className="py-2">45-46</td>
            <td className="py-2">28-29</td>
            <td className="py-2">9.5</td>
          </tr>
          <tr className="even:bg-muted/30">
            <td className="py-2 font-medium">L</td>
            <td className="py-2">48</td>
            <td className="py-2">30</td>
            <td className="py-2">10</td>
          </tr>
          <tr className="even:bg-muted/30">
            <td className="py-2 font-medium">XL</td>
            <td className="py-2">49-50</td>
            <td className="py-2">31</td>
            <td className="py-2">11</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="text-base text-muted-foreground space-y-2 font-normal">
      <p className="font-bold mt-6 mb-1 text-xl">How to Measure</p>
      <p><strong>Chest:</strong> Measure from side to side from armpits stitches</p>
      <p><strong>Length:</strong> Measure from collar seam to the hem</p>
    </div>
  </div>
);

export default SizeGuidePage;
