import React, { useState, useCallback } from 'react';
import { Upload, Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UploadSectionProps {
  onAnalysisComplete: (result: any) => void;
}

const regions = [
  'North India', 'South India', 'Central India', 'Northeast India',
  'Punjab', 'Haryana', 'Gujarat', 'Maharashtra', 'Karnataka',
  'Tamil Nadu', 'Andhra Pradesh', 'West Bengal', 'Uttar Pradesh'
];

const UploadSection: React.FC<UploadSectionProps> = ({ onAnalysisComplete }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleImageSelect = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
    }
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageSelect(files[0]);
    }
  }, [handleImageSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleImageSelect(files[0]);
    }
  }, [handleImageSelect]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const analyzeBreed = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const imageBase64 = await convertToBase64(selectedImage);
      
      const { data, error } = await supabase.functions.invoke('breed-recognition', {
        body: { 
          imageBase64, 
          region: selectedRegion 
        }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        onAnalysisComplete(data.analysis);
        toast({
          title: "Analysis complete!",
          description: `Breed identified: ${data.analysis.breedName}`,
        });
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : 'Failed to analyze image',
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-2 border-dashed border-muted hover:border-primary transition-colors">
        <div
          className="text-center space-y-4"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {previewUrl ? (
            <div className="space-y-4">
              <img
                src={previewUrl}
                alt="Selected"
                className="max-w-full max-h-64 mx-auto rounded-lg shadow-warm"
              />
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedImage(null);
                  setPreviewUrl(null);
                }}
              >
                Choose Different Image
              </Button>
            </div>
          ) : (
            <>
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Upload Cattle or Buffalo Image</h3>
              <p className="text-muted-foreground">
                Drag and drop an image here, or click to select
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="hero" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Camera className="w-4 h-4" />
                    Select Image
                  </label>
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            </>
          )}
        </div>
      </Card>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Select Region (Optional)</label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Choose your region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="agricultural"
          size="lg"
          onClick={analyzeBreed}
          disabled={!selectedImage || isAnalyzing}
          className="w-full"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing Breed...
            </>
          ) : (
            'Analyze Breed'
          )}
        </Button>
      </div>
    </div>
  );
};

export default UploadSection;