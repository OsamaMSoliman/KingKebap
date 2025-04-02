import { options as OPTIONS } from '~/data/menu.json';

import type { Dispatch, SetStateAction } from 'react';
import { ToggleGroup, ToggleItem } from '~/components/toggle-group/ToggleGroup';
import { Checkbox } from '~/components/ui/checkbox';

export type TOptions = { [key: string]: string | string[] };

interface IProps {
  optionKeys: Array<string>;
  selectedOptions: TOptions;
  setSelectedOptions: Dispatch<SetStateAction<TOptions>>;
  multipleOptionSelection?: { [optionKey: string]: boolean };
}

export default function Options({
  optionKeys,
  selectedOptions,
  setSelectedOptions,
  multipleOptionSelection,
}: IProps) {
  return optionKeys.map((opKey, i) => {
    // const [firstOption] = OPTIONS[opKey as keyof typeof OPTIONS];
    // multipleOptionSelection?.[opKey] ? [firstOption] : firstOption;
    const options = OPTIONS[opKey as keyof typeof OPTIONS];

    const value =
      selectedOptions[opKey] ||
      (multipleOptionSelection?.[opKey] ? [options[0]] : options[0]);

    return (
      <OptionRenderer
        key={i}
        option={opKey}
        optionValues={options}
        value={value}
        isMultiple={multipleOptionSelection?.[opKey]}
        onChange={(newValue) =>
          setSelectedOptions((prev) => ({ ...prev, [opKey]: newValue }))
        }
      />
    );
  });
}

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
  isMultiple?: boolean;
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
        onValueChange={(newValue: string | string[]) => onChange(newValue)}
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
