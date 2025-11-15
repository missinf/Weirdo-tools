import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { copy } from '@/copy';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Settings as SettingsIcon, Moon } from 'lucide-react';

export function SettingsPage() {
  const { isDark, toggle } = useDarkMode();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">
          {copy.settings.title}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{copy.settings.appearance.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center gap-3 flex-1">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col gap-1">
                <label htmlFor="dark-mode" className="text-sm font-medium text-foreground cursor-pointer">
                  {copy.settings.appearance.darkMode.label}
                </label>
                <p className="text-sm text-muted-foreground">
                  {copy.settings.appearance.darkMode.description}
                </p>
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Switch
                    id="dark-mode"
                    checked={isDark}
                    onCheckedChange={toggle}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copy.settings.appearance.darkMode.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
