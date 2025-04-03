import type { Dispatch, SetStateAction } from 'react';
import { ToggleGroup, ToggleItem } from '~/components/toggle-group/ToggleGroup';
import { Checkbox } from '~/components/ui/checkbox';
import { options as OPTIONS } from '~/data/menu.json';

export type TOptions = { [key: string]: string | string[] };

interface IProps {
  selectedOptions: TOptions;
  // selectedOptions: { [key: string]: IOption };
  setSelectedOptions: Dispatch<SetStateAction<TOptions>>;
}

export default function Options({
  selectedOptions,
  setSelectedOptions,
}: IProps) {
  return Object.entries(selectedOptions).map(([opKey, option], i) => {
    return (
      <OptionRenderer
        key={i}
        opKey={opKey}
        opValue={option}
        allOpChoices={OPTIONS[opKey as keyof typeof OPTIONS]}
        forceIsMultiple={undefined}
        // opValue={option.opValue}
        // allOpChoices={option.allOpChoices}
        // forceIsMultiple={option.forceIsMultiple}
        onChange={(newValue) =>
          setSelectedOptions((prev) => ({ ...prev, [opKey]: newValue }))
        }
      />
    );
  });
}

interface IOption {
  opKey: string; // option key
  opValue: string | string[]; // option default or selected values
  allOpChoices: string[]; // all possible values for the option
  forceIsMultiple?: boolean; // if multiple values can be selected
}

const OptionRenderer = ({
  opKey,
  allOpChoices,
  opValue,
  forceIsMultiple,
  onChange,
}: IOption & {
  onChange: (newValue: string | string[]) => void;
}) => {
  if (allOpChoices[0] === 'true' || allOpChoices[0] === 'false') {
    return (
      <div className="mb-8 flex items-center space-x-2">
        <Checkbox
          id={opKey}
          checked={opValue === 'true'}
          onCheckedChange={(checked) => onChange(checked ? 'true' : 'false')}
        />
        <label
          htmlFor={opKey}
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {opKey}
        </label>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <p className="mb-2 font-semibold">{opKey}:</p>
      <ToggleGroup
        value={opValue}
        onValueChange={(newValue: string | string[]) => onChange(newValue)}
        multiple={forceIsMultiple}
        className="h-auto w-full flex-wrap gap-x-3 gap-y-1"
      >
        {allOpChoices.map((value, j) => (
          <ToggleItem key={j} value={value} className="flex-auto">
            {value}
          </ToggleItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
