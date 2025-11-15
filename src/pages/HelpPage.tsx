import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { copy } from '@/copy';
import { HelpCircle, ExternalLink } from 'lucide-react';

export function HelpPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">
            {copy.help.title}
          </h1>
        </div>
        <Button
          onClick={() => window.open(copy.help.credits.discordLink, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          <span className="hidden min-[500px]:inline">{copy.help.feedback.full}</span>
          <span className="min-[500px]:hidden">{copy.help.feedback.short}</span>
        </Button>
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
                  {'link' in item && (
                    <>
                      {' '}
                      <a
                        href={item.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        {item.link.text}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      .
                    </>
                  )}
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
        <CardContent>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(copy.help.credits.patreonLink, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            {copy.help.credits.patreon.button}
          </Button>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
