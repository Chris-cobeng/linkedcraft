import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

type FormValues = {
  topic: string;
  writingStyles: string[];
  industries: string[];
  jobDescriptions: string[];
  contentCategories: string[];
  postingGoals: string[];
  customCta: string;
  fineTuningNotes: string;
};

const writingStyleOptions = ['Professional', 'Casual', 'Authoritative', 'Inspirational', 'Educational'];
const industryOptions = ['Technology', 'Marketing', 'Finance', 'Healthcare', 'Education', 'Consulting'];
const contentCategoryOptions = ['Thought Leadership', 'Industry News', 'Tips & Advice', 'Case Study', 'Personal Story'];
const postingGoalOptions = ['Engagement', 'Brand Awareness', 'Lead Generation', 'Networking', 'Hiring'];

export default function GeneratePostPage() {
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      topic: '',
      writingStyles: [],
      industries: [],
      jobDescriptions: [],
      contentCategories: [],
      postingGoals: [],
      customCta: '',
      fineTuningNotes: '',
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsGenerating(true);
    setGeneratedContent('');
    
    try {
      const response = await fetch('https://kjthowdyywptosrqcuxs.supabase.co/functions/v1/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: data.topic,
          userPreferences: {
            writing_styles: data.writingStyles,
            industries: data.industries,
            job_descriptions: data.jobDescriptions,
            content_categories: data.contentCategories,
            posting_goals: data.postingGoals,
            custom_cta: data.customCta,
            fine_tuning_notes: data.fineTuningNotes,
          }
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate content');
      }
      
      setGeneratedContent(result.content);
      toast({
        title: 'Content generated successfully',
        description: 'Your LinkedIn post has been created!',
      });
    } catch (error: any) {
      toast({
        title: 'Error generating content',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: 'Copied to clipboard',
      description: 'The content has been copied to your clipboard',
    });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Generate LinkedIn Post</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>
                  Fill in the details to generate a LinkedIn post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic <span className="text-destructive">*</span></Label>
                  <Input
                    id="topic"
                    placeholder="Enter your post topic"
                    {...register('topic', { required: 'Topic is required' })}
                  />
                  {errors.topic && (
                    <p className="text-destructive text-sm">{errors.topic.message}</p>
                  )}
                </div>
                
                <Tabs defaultValue="basic">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Writing Style</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {writingStyleOptions.map((style) => (
                          <div key={style} className="flex items-center space-x-2">
                            <Checkbox
                              id={`style-${style}`}
                              value={style}
                              {...register('writingStyles')}
                            />
                            <Label htmlFor={`style-${style}`} className="text-sm font-normal">
                              {style}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {industryOptions.map((industry) => (
                          <div key={industry} className="flex items-center space-x-2">
                            <Checkbox
                              id={`industry-${industry}`}
                              value={industry}
                              {...register('industries')}
                            />
                            <Label htmlFor={`industry-${industry}`} className="text-sm font-normal">
                              {industry}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Content Category</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {contentCategoryOptions.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category}`}
                              value={category}
                              {...register('contentCategories')}
                            />
                            <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="advanced" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Posting Goal</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {postingGoalOptions.map((goal) => (
                          <div key={goal} className="flex items-center space-x-2">
                            <Checkbox
                              id={`goal-${goal}`}
                              value={goal}
                              {...register('postingGoals')}
                            />
                            <Label htmlFor={`goal-${goal}`} className="text-sm font-normal">
                              {goal}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="customCta">Custom Call-to-Action</Label>
                      <Input
                        id="customCta"
                        placeholder="E.g., 'Check out our latest report'"
                        {...register('customCta')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fineTuningNotes">Fine-Tuning Notes</Label>
                      <Textarea
                        id="fineTuningNotes"
                        placeholder="Any specific instructions or preferences"
                        {...register('fineTuningNotes')}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isGenerating}>
                  {isGenerating ? 'Generating...' : 'Generate Post'}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
        
        <div>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>
                Your LinkedIn post will appear here
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {generatedContent ? (
                <div className="whitespace-pre-wrap bg-muted p-4 rounded-md h-full min-h-[300px] overflow-auto">
                  {generatedContent}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px] bg-muted/50 rounded-md text-muted-foreground">
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
                      <p>Generating your content...</p>
                    </div>
                  ) : (
                    <p>Fill out the form and click "Generate Post"</p>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-between border-t pt-4">
              <Button
                variant="outline"
                onClick={() => setGeneratedContent('')}
                disabled={!generatedContent || isGenerating}
              >
                Clear
              </Button>
              <Button
                variant="default"
                onClick={handleCopyToClipboard}
                disabled={!generatedContent || isGenerating}
              >
                Copy to Clipboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
