import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Scan, 
  Map, 
  MessageSquare, 
  ArrowRight,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';
import heroImage from '@/assets/hero-agriculture.jpg';
import breedIcon from '@/assets/breed-recognition-icon.png';
import foodIcon from '@/assets/food-availability-icon.png';
import chatIcon from '@/assets/chatbot-icon.png';
import UploadSection from '@/components/BreedRecognition/UploadSection';
import ResultsDisplay from '@/components/BreedRecognition/ResultsDisplay';
import FoodAvailability from '@/components/RegionalFood/FoodAvailability';
import LivestockChat from '@/components/Chatbot/LivestockChat';

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: breedIcon,
      title: 'Breed Recognition',
      description: 'AI-powered identification of cattle and buffalo breeds using advanced image analysis',
      tabValue: 'recognition'
    },
    {
      icon: foodIcon,
      title: 'Regional Food Data',
      description: 'Comprehensive database of available feeds and nutrition by geographic region',
      tabValue: 'food'
    },
    {
      icon: chatIcon,
      title: 'Expert Consultation',
      description: 'AI chatbot trained on livestock management and veterinary knowledge',
      tabValue: 'chat'
    }
  ];

  const stats = [
    { icon: Users, label: 'Livestock Supported', value: '50+ Breeds' },
    { icon: Map, label: 'Regions Covered', value: '20+ States' },
    { icon: TrendingUp, label: 'Accuracy Rate', value: '95%+' },
    { icon: Shield, label: 'Expert Verified', value: 'Veterinarian Backed' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Smart Livestock
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-earth-amber to-earth-cream">
              Recognition
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Advanced AI system for cattle and buffalo breed identification with regional food availability and expert consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => setActiveTab('recognition')}
              className="text-lg px-8 py-4"
            >
              Start Recognition
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="agricultural" 
              size="lg"
              onClick={() => setActiveTab('chat')}
              className="text-lg px-8 py-4"
            >
              Ask Expert
              <MessageSquare className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Comprehensive Livestock Management</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need for modern cattle and buffalo farming
              </p>
            </div>

            <TabsList className="grid w-full grid-cols-4 max-w-4xl mx-auto h-auto p-2">
              <TabsTrigger value="overview" className="py-4">
                Overview
              </TabsTrigger>
              <TabsTrigger value="recognition" className="py-4">
                <Scan className="w-4 h-4 mr-2" />
                Recognition
              </TabsTrigger>
              <TabsTrigger value="food" className="py-4">
                <Map className="w-4 h-4 mr-2" />
                Food Data
              </TabsTrigger>
              <TabsTrigger value="chat" className="py-4">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="shadow-warm hover:shadow-agricultural transition-all duration-300 group cursor-pointer"
                        onClick={() => setActiveTab(feature.tabValue)}>
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src={feature.icon} 
                          alt={feature.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                      <Button variant="outline" className="mt-4 group-hover:bg-primary group-hover:text-primary-foreground">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recognition" className="space-y-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Breed Recognition System</h3>
                  <p className="text-muted-foreground">
                    Upload an image of your cattle or buffalo for instant breed identification
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <UploadSection onAnalysisComplete={setAnalysisResult} />
                  </div>
                  
                  <div>
                    {analysisResult ? (
                      <ResultsDisplay result={analysisResult} />
                    ) : (
                      <Card className="h-full flex items-center justify-center p-8">
                        <div className="text-center text-muted-foreground">
                          <Scan className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p>Upload an image to see detailed breed analysis</p>
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="food" className="space-y-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Regional Food Availability</h3>
                  <p className="text-muted-foreground">
                    Discover optimal feed sources and nutrition data for your region
                  </p>
                </div>
                <FoodAvailability />
              </div>
            </TabsContent>

            <TabsContent value="chat" className="space-y-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Livestock Expert Consultation</h3>
                  <p className="text-muted-foreground">
                    Get instant answers to your cattle and buffalo management questions
                  </p>
                </div>
                <LivestockChat />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h4 className="text-xl font-semibold mb-4">
              Revolutionizing Livestock Management
            </h4>
            <p className="text-muted-foreground">
              Empowering farmers with AI-driven insights for better livestock care and productivity
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;