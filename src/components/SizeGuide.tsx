
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const SizeGuide = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Size Guide</DialogTitle>
        </DialogHeader>
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Oversized Tshirts</h2>
            <p className="text-muted-foreground mb-4 text-lg">
              Use the size chart below to determine your size.
            </p>
            <div className="overflow-x-auto rounded-lg border">
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
          </div>
          <div className="text-lg text-muted-foreground space-y-2 font-normal">
            <p className="font-bold mt-8 mb-1 text-2xl">How to Measure</p>
            <p><strong>Chest:</strong> Measure from side to side from armpits stitches</p>
            <p><strong>Length:</strong> Measure from collar seam to the hem</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuide;
