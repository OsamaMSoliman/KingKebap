import * as React from 'react';
import { cn } from '~/lib/utils';

type ToggleType = string | string[];

interface ToggleGroupProps<T extends ToggleType> {
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void; // React.Dispatch<React.SetStateAction<T>>;
  multiple?: boolean;
  className?: string;
  children: React.ReactNode;
}

function ToggleGroup<T extends ToggleType>({
  value: valueProp,
  defaultValue,
  onValueChange,
  multiple,
  className,
  children,
}: ToggleGroupProps<T>) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = React.useState<ToggleType>(
    defaultValue ?? (multiple ? [] : '')
  );

  const value = isControlled ? valueProp : internalValue;
  const isValueArray = Array.isArray(value);
  const isMultiple = multiple ?? isValueArray;

  const handleChange = (newValue: T) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const handleClick = (selectedValue: string) => {
    if (isMultiple) {
      const currentValues: string[] = isValueArray ? value : [];
      const newValues = currentValues.includes(selectedValue)
        ? currentValues.filter((v) => v !== selectedValue)
        : [...currentValues, selectedValue];
      handleChange(newValues as T);
    } else {
      handleChange((selectedValue === value ? '' : selectedValue) as T);
    }
  };

  return (
    <div
      data-slot="toggle-button"
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ToggleItemProps>(child)) {
          return React.cloneElement(child, {
            onClick: () => handleClick(child.props.value),
            isActive: isMultiple
              ? isValueArray && value.includes(child.props.value)
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
        isActive && 'bg-background text-foreground shadow-sm',
        className
      )}
      onClick={onClick}
      data-state={isActive ? 'active' : 'inactive'}
    >
      {children}
    </button>
  );
}

export { ToggleGroup, ToggleItem, type ToggleType };

import { Button } from '../ui/button';

export default function ToggleTesting() {
  const [singleValue, setSingleValue] = React.useState('option1');
  const [multipleValues, setMultipleValues] = React.useState<string[]>([]);
  const [multiple, setMultiple] = React.useState<boolean>(false);

  return (
    <div className="space-y-4">
      <div>
        <h2>Single Selection</h2>
        <ToggleGroup value={singleValue} onValueChange={setSingleValue}>
          <ToggleItem value="option1">Option 1</ToggleItem>
          <ToggleItem value="option2">Option 2</ToggleItem>
          <ToggleItem value="option3">Option 3</ToggleItem>
        </ToggleGroup>
      </div>

      <div>
        <h2>Multiple Selection</h2>
        <ToggleGroup value={multipleValues} onValueChange={setMultipleValues}>
          <ToggleItem value="option1">Option 1</ToggleItem>
          <ToggleItem value="option2">Option 2</ToggleItem>
          <ToggleItem value="option3">Option 3</ToggleItem>
        </ToggleGroup>
      </div>

      <div>
        <h2>Controlled Single/Multiple Selection</h2>
        <Button variant="ghost" onClick={() => setMultiple(!multiple)}>
          Toggle Multiple
        </Button>
        <ToggleGroup multiple={multiple}>
          <ToggleItem value="option1">Option 1</ToggleItem>
          <ToggleItem value="option2">Option 2</ToggleItem>
          <ToggleItem value="option3">Option 3</ToggleItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
