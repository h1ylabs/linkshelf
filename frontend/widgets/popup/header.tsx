import {
  Badge,
  Button,
  Logo,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@frontend/shared/ui";
import { SettingsIcon } from "lucide-react";

export default function PopupHeader() {
  return (
    <header className="sticky top-0 flex items-center gap-2">
      <Logo />
      <h1 className="text-xl font-bold">Linkshelf</h1>
      <Badge>v0.1.0</Badge>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto">
              <SettingsIcon size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Settings</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  );
}
