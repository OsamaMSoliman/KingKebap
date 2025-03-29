import { options as OverallOptions } from '~/data/menu.json';

import type { Dispatch, SetStateAction } from 'react';
import { ToggleGroup, ToggleItem } from '~/components/toggle-group/ToggleGroup';
import { Checkbox } from '~/components/ui/checkbox';

const Options = ({
  options,
  selectedOptions,
  setSelectedOptions,
}: {
  options: Array<string>;
  selectedOptions: {
    [key: string]: string | string[];
  };
  setSelectedOptions: Dispatch<
    SetStateAction<{
      [key: string]: string | string[];
    }>
  >;
}) => {
  return options.map((option, i) => {
    const optionValues = OverallOptions[option as keyof typeof OverallOptions];
    const isMultiple = false; // values.length > 1;

    const value =
      selectedOptions[option] ||
      (isMultiple ? [optionValues[0]] : optionValues[0]);

    return (
      <OptionRenderer
        key={i}
        option={option}
        optionValues={optionValues}
        value={value}
        isMultiple={isMultiple}
        onChange={(newValue) =>
          setSelectedOptions((prev) => ({ ...prev, [option]: newValue }))
        }
      />
    );
  });
};

const OptionRenderer = ({
  option,
  optionValues,
  value,
  isMultiple,
  onChange,
}: {
  option: string;
  optionValues: string[];
  value: string | string[];
  isMultiple: boolean;
  onChange: (newValue: string | string[]) => void;
}) => {
  if (optionValues[0] === 'true' || optionValues[0] === 'false') {
    return (
      <div className="mb-8 flex items-center space-x-2">
        <Checkbox
          id={option}
          checked={value === 'true'}
          onCheckedChange={(checked) => onChange(checked ? 'true' : 'false')}
        />
        <label
          htmlFor={option}
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {option}
        </label>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <p className="mb-2 font-semibold">{option}:</p>
      <ToggleGroup
        value={value}
        onValueChange={(newValue) => onChange(newValue as string | string[])}
        multiple={isMultiple}
        className="h-auto w-full flex-wrap gap-x-3 gap-y-1"
      >
        {optionValues.map((value, j) => (
          <ToggleItem key={j} value={value} className="flex-auto">
            {value}
          </ToggleItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default Options;
