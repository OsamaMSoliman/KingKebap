import * as React from "react";
import { cn } from "~/lib/utils";

interface ToggleGroupProps<T> {
  value: T;
  onValueChange: React.Dispatch<React.SetStateAction<T>>;
  multiple?: boolean;
  className?: string;
  children: React.ReactNode;
}

function ToggleGroup<T>({
  value,
  onValueChange,
  multiple = false,
  className,
  children,
}: ToggleGroupProps<T>) {
  const handleClick = (selectedValue: T) => {
    if (multiple) {
      const currentValues: T[] = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(selectedValue)
        ? currentValues.filter((v) => v !== selectedValue)
        : [...currentValues, selectedValue];
      onValueChange(newValues as T); // Type assertion to T
    } else {
      onValueChange((selectedValue === value ? "" : selectedValue) as T); // Type assertion to T
    }
  };

  return (
    <div
      data-slot="toggle-button"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className,
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ToggleItemProps>(child)) {
          return React.cloneElement(child, {
            onClick: () => handleClick(child.props.value as T),
            isActive: multiple
              ? Array.isArray(value) && value.includes(child.props.value)
              : value === child.props.value,
          });
        }
        return child;
      })}
    </div>
  );
}

interface ToggleItemProps {
  value: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

function ToggleItem({
  value,
  isActive = false,
  onClick,
  className,
  children,
}: ToggleItemProps) {
  return (
    <button
      data-slot="toggle-button-item"
      className={cn(
        "data-[state=active]:bg-background data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/50 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        isActive && "bg-background text-foreground shadow-sm",
        className,
      )}
      onClick={onClick}
      data-state={isActive ? "active" : "inactive"}
    >
      {children}
    </button>
  );
}

export { ToggleGroup, ToggleItem };

import { Button } from "../ui/button";

export default function ToggleTesting() {
  const [singleValue, setSingleValue] = React.useState("option1");
  const [multipleValues, setMultipleValues] = React.useState<string[]>([]);
  const [values, setValues] = React.useState<string | string[]>([]);
  const [multiple, setMultiple] = React.useState<boolean>(false);

  return (
    <div className="space-y-4">
      <div>
        <h2>Single Selection</h2>
        <ToggleGroup<string> value={singleValue} onValueChange={setSingleValue}>
          <ToggleItem value="option1">Option 1</ToggleItem>
          <ToggleItem value="option2">Option 2</ToggleItem>
          <ToggleItem value="option3">Option 3</ToggleItem>
        </ToggleGroup>
      </div>

      <div>
        <h2>Multiple Selection</h2>
        <ToggleGroup<string[]>
          value={multipleValues}
          onValueChange={setMultipleValues}
          multiple
        >
          <ToggleItem value="option1">Option 1</ToggleItem>
          <ToggleItem value="option2">Option 2</ToggleItem>
          <ToggleItem value="option3">Option 3</ToggleItem>
        </ToggleGroup>
      </div>

      <div>
        <h2>Single/Multiple Selection</h2>
        <Button variant="ghost" onClick={() => setMultiple(!multiple)}>
          Toggle Multiple
        </Button>
        <ToggleGroup
          value={values}
          onValueChange={setValues}
          multiple={multiple}
        >
          <ToggleItem value="option1">Option 1</ToggleItem>
          <ToggleItem value="option2">Option 2</ToggleItem>
          <ToggleItem value="option3">Option 3</ToggleItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
