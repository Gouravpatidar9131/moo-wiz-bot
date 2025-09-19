import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MapPin, Wheat, Leaf, Droplets, TrendingUp } from 'lucide-react';

interface FoodData {
  region: string;
  feeds: {
    name: string;
    availability: number;
    season: string;
    price: 'Low' | 'Medium' | 'High';
    nutritionalValue: string;
  }[];
  climate: string;
  recommendations: string[];
}

const foodAvailabilityData: FoodData[] = [
  {
    region: 'Punjab',
    climate: 'Semi-arid, wheat belt',
    feeds: [
      { name: 'Wheat Straw', availability: 95, season: 'Post-harvest', price: 'Low', nutritionalValue: 'High fiber, moderate protein' },
      { name: 'Rice Straw', availability: 80, season: 'Post-harvest', price: 'Low', nutritionalValue: 'Low protein, high fiber' },
      { name: 'Alfalfa', availability: 70, season: 'Year-round', price: 'Medium', nutritionalValue: 'High protein, high calcium' },
      { name: 'Maize Silage', availability: 85, season: 'Winter', price: 'Medium', nutritionalValue: 'High energy, digestible' },
    ],
    recommendations: [
      'Supplement rice straw with protein sources',
      'Utilize abundant wheat straw for roughage',
      'Consider maize silage for energy needs'
    ]
  },
  {
    region: 'Gujarat',
    climate: 'Arid to semi-arid',
    feeds: [
      { name: 'Cotton Seed Cake', availability: 90, season: 'Year-round', price: 'Medium', nutritionalValue: 'High protein, high energy' },
      { name: 'Groundnut Straw', availability: 75, season: 'Post-harvest', price: 'Low', nutritionalValue: 'Moderate protein, good palatability' },
      { name: 'Pearl Millet', availability: 85, season: 'Year-round', price: 'Medium', nutritionalValue: 'High energy, drought tolerant' },
      { name: 'Sorghum', availability: 80, season: 'Year-round', price: 'Low', nutritionalValue: 'Good energy source' },
    ],
    recommendations: [
      'Maximize use of cotton seed cake for protein',
      'Combine pearl millet with legume hays',
      'Groundnut straw excellent for maintenance diets'
    ]
  },
  {
    region: 'Kerala',
    climate: 'Tropical, high rainfall',
    feeds: [
      { name: 'Coconut Cake', availability: 95, season: 'Year-round', price: 'Low', nutritionalValue: 'High protein, good digestibility' },
      { name: 'Rice Bran', availability: 85, season: 'Year-round', price: 'Low', nutritionalValue: 'High fat, good energy' },
      { name: 'Banana Leaves', availability: 90, season: 'Year-round', price: 'Low', nutritionalValue: 'Good palatability, moderate nutrition' },
      { name: 'Cassava Leaves', availability: 70, season: 'Year-round', price: 'Low', nutritionalValue: 'High protein when young' },
    ],
    recommendations: [
      'Coconut cake is excellent local protein source',
      'Rice bran provides good energy supplementation',
      'Fresh banana leaves improve feed intake'
    ]
  }
];

const FoodAvailability: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('Punjab');
  
  const currentData = foodAvailabilityData.find(data => data.region === selectedRegion) || foodAvailabilityData[0];

  const getPriceColor = (price: string) => {
    switch (price) {
      case 'Low': return 'bg-primary text-primary-foreground';
      case 'Medium': return 'bg-secondary text-secondary-foreground';
      case 'High': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAvailabilityColor = (availability: number) => {
    if (availability >= 80) return 'bg-primary';
    if (availability >= 60) return 'bg-secondary';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-warm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />
              Regional Food Availability
            </CardTitle>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {foodAvailabilityData.map((data) => (
                  <SelectItem key={data.region} value={data.region}>
                    {data.region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Droplets className="w-4 h-4" />
            <span>{currentData.climate}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Wheat className="w-4 h-4 text-accent" />
              Available Feed Sources
            </h4>
            
            <div className="grid gap-4 md:grid-cols-2">
              {currentData.feeds.map((feed, index) => (
                <Card key={index} className="border-muted">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">{feed.name}</h5>
                        <Badge className={getPriceColor(feed.price)}>
                          {feed.price}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Availability</span>
                          <span className="font-medium">{feed.availability}%</span>
                        </div>
                        <Progress 
                          value={feed.availability} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Leaf className="w-3 h-3 text-primary" />
                          <span className="text-muted-foreground">Season:</span>
                          <span>{feed.season}</span>
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {feed.nutritionalValue}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Regional Recommendations
            </h4>
            <ul className="space-y-2">
              {currentData.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodAvailability;