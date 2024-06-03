import { forwardRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const SelectTrigger = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, className, ...props }: any, forwardedRef) => {
  return (
    <SelectPrimitive.Trigger
      ref={forwardedRef}
      className={cn(
        "group h-[36px] text-gray12 text-sm font-medium flex justify-between items-center relative px-3 py-2 w-full bg-gray1 hover:bg-gray2 border border-gray6 rounded-lg outline-none focus:ring-1 focus:ring-gray9",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDownIcon
          width={18}
          height={18}
          className="group-data-[state=open]:hidden group-data-[state=closed]:block"
        />
        <ChevronUpIcon
          width={18}
          height={18}
          className="group-data-[state=open]:block group-data-[state=closed]:hidden"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, className, ...props }: any, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      ref={forwardedRef}
      className={cn(
        "text-sm font-medium text-grayText px-3 py-2 rounded-md outline-none hover:cursor-pointer data-[highlighted]:bg-gray5/50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectContent = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Content
      ref={forwardedRef}
      className={cn(
        "w-[var(--radix-select-trigger-width)] bg-gray1/80 backdrop-blur-md overflow-hidden rounded-md p-1 border border-gray6",
        className
      )}
      position="popper"
      side="bottom"
      sideOffset={6}
      {...props}
    >
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  );
});

SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "py-1.5 px-3 text-sm font-semibold text-grayTextContrast",
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectSeparator = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px border border-gray6", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const Item = SelectItem;
const Label = SelectLabel;
const Trigger = SelectTrigger;
const Content = SelectContent;
const Root = SelectPrimitive.Root;
const Separator = SelectSeparator;
const Group = SelectPrimitive.Group;
const Value = SelectPrimitive.Value;
const Portal = SelectPrimitive.Portal;

export { Item, Root, Value, Trigger, Content, Group, Separator, Label, Portal };
