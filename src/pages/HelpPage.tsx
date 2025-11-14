import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { copy } from '@/copy';
import { HelpCircle, ExternalLink } from 'lucide-react';

export function HelpPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <HelpCircle className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">
          {copy.help.title}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{copy.help.about.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">
            {copy.help.about.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{copy.help.howTo.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 list-decimal list-inside">
            {copy.help.howTo.steps.map((step, index) => (
              <li key={index} className="text-foreground leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{copy.help.faq.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {copy.help.faq.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{copy.help.credits.title}</CardTitle>
          <CardDescription>{copy.help.credits.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(copy.help.credits.patreonLink, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Support on Patreon
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(copy.help.credits.discordLink, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Join Discord
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
