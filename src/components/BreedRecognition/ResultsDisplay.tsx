import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Target, 
  Heart, 
  Utensils, 
  AlertCircle,
  CheckCircle2,
  MapPin 
} from 'lucide-react';

interface AnalysisResult {
  breedName: string;
  confidence: string;
  category: 'cattle' | 'buffalo';
  characteristics: string[];
  region: string;
  primaryUse: string;
  temperament: string;
  nutritionalNeeds: string;
  careRecommendations: string[];
  additionalInfo: string;
}

interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const getConfidenceColor = (confidence: string) => {
    const percentage = parseInt(confidence.replace('%', ''));
    if (percentage >= 80) return 'bg-primary text-primary-foreground';
    if (percentage >= 60) return 'bg-secondary text-secondary-foreground';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 shadow-agricultural">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Target className="w-8 h-8 text-primary" />
              {result.breedName}
            </CardTitle>
            <Badge className={getConfidenceColor(result.confidence)}>
              {result.confidence} Confidence
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="capitalize">{result.category}</span>
            {result.region && (
              <>
                <span>•</span>
                <span>{result.region}</span>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary" />
                  Key Characteristics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.characteristics.map((trait, index) => (
                    <Badge key={index} variant="outline">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-accent" />
                  Temperament
                </h4>
                <p className="text-sm text-muted-foreground">
                  {result.temperament}
                </p>
              </div>

              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Utensils className="w-4 h-4 text-secondary" />
                  Primary Use
                </h4>
                <p className="text-sm text-muted-foreground">
                  {result.primaryUse}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-accent" />
                  Nutritional Needs
                </h4>
                <p className="text-sm text-muted-foreground">
                  {result.nutritionalNeeds}
                </p>
              </div>

              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Care Recommendations
                </h4>
                <ul className="space-y-1">
                  {result.careRecommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {result.additionalInfo && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Additional Information</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.additionalInfo}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;