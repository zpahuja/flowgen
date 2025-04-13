import {
  ArrowUpOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { type KeyboardEvent, useCallback, useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { setEnabledTeamMembers, useStore } from "~/core/store";
import { cn } from "~/core/utils";

export function InputBox({
  className,
  size,
  responding,
  onSend,
  onCancel,
}: {
  className?: string;
  size?: "large" | "normal";
  responding?: boolean;
  onSend?: (message: string) => void;
  onCancel?: () => void;
}) {
  const teamMembers = useStore((state) => state.teamMembers);
  const enabledTeamMembers = useStore((state) => state.enabledTeamMembers);

  const [message, setMessage] = useState("");
  const [imeStatus, setImeStatus] = useState<"active" | "inactive">("inactive");

  const handleSendMessage = useCallback(() => {
    if (responding) {
      onCancel?.();
    } else {
      if (message.trim() === "") {
        return;
      }
      if (onSend) {
        onSend(message);
        setMessage("");
      }
    }
  }, [responding, onCancel, message, onSend]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (responding) {
        return;
      }
      if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !event.metaKey &&
        !event.ctrlKey &&
        imeStatus === "inactive"
      ) {
        event.preventDefault();
        handleSendMessage();
      }
    },
    [responding, imeStatus, handleSendMessage],
  );

  return (
    <div className={cn(className)}>
      <div className="w-full">
        <textarea
          className={cn(
            "m-0 w-full resize-none border-none px-4 py-3 text-lg",
            size === "large" ? "min-h-12" : "min-h-4",
          )}
          placeholder="What will you automate today?"
          value={message}
          onCompositionStart={() => setImeStatus("active")}
          onCompositionEnd={() => setImeStatus("inactive")}
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
      </div>
      <div className="flex items-center px-4 py-2">
        <div className="flex grow items-center gap-2">
          <Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("rounded-2xl px-4 text-sm", {
                      "border-blue-300 bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-600":
                        true,
                    })}
                  >
                    <RobotOutlined className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {teamMembers
                  .filter((member) => member.is_optional)
                  .map((member) => (
                  <Tooltip key={member.name}>
                    <TooltipTrigger asChild>
                      <DropdownMenuCheckboxItem
                        key={member.name}
                        checked={enabledTeamMembers.includes(member.name)}
                        onCheckedChange={() => {
                          setEnabledTeamMembers(
                            enabledTeamMembers.includes(member.name)
                              ? enabledTeamMembers.filter(
                                  (name) => name !== member.name,
                                )
                              : [...enabledTeamMembers, member.name],
                          );
                        }}
                      >
                        {member.name.charAt(0).toUpperCase() +
                          member.name.slice(1)}
                      </DropdownMenuCheckboxItem>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{member.desc}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipContent>
              <p>Enable or disable agents</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full",
                  responding ? "bg-button-hover" : "bg-button",
                )}
                onClick={handleSendMessage}
              >
                {responding ? (
                  <div className="flex h-10 w-10 items-center justify-center">
                    <div className="h-4 w-4 rounded-sm bg-red-300" />
                  </div>
                ) : (
                  <ArrowUpOutlined className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{responding ? "Stop" : "Send"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
