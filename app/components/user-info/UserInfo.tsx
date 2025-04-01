import React from 'react';
import { Button } from '~/components/ui/button';
import { getInfos, setInfos } from '~/stores/ContactStore';

interface IProps {
  onSubmit: () => void;
}

export default function UserInfo({ onSubmit }: IProps) {
  const userInfos = getInfos();

  // const handleSubmit = (e: React.FormEvent) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setInfos(Object.fromEntries(new FormData(e.currentTarget).entries()));
    onSubmit();
  };

  // NOTE: the code below could have stayed as before, this refactoring was just because I was bored :P
  return (
    <div className="mx-auto max-w-md bg-white p-3">
      <h2 className="mb-6 text-center text-2xl font-bold">Kontaktformular</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(FIELDS)
          .filter((label): label is TRequiredField => label !== 'bemerkungen')
          .map((field: TRequiredField) => (
            <FormField
              key={field}
              name={field}
              defaultValue={userInfos[field]}
              required
            />
          ))}
        <FormField
          name="bemerkungen"
          defaultValue={userInfos['bemerkungen']}
          isTextArea
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="secondary"
            className="w-2/3 outline-double"
          >
            Weiter
          </Button>
        </div>
      </form>
    </div>
  );
}

// Helper component for form fields
const FormField = ({
  name,
  value,
  defaultValue,
  onChange,
  required = false,
  isTextArea = false,
}: {
  name: TLabels;
  value?: string;
  defaultValue?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  isTextArea?: boolean;
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      {getFieldLabel(name)}
      {required && '*'}
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
          rows={4}
        />
      ) : (
        <input
          type={getInputType(name)}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
          autoComplete={name === 'email' ? 'off' : 'on'}
        />
      )}
    </label>
  </div>
);

// Helper functions
const FIELDS = {
  vorname: 'Vorname',
  nachname: 'Nachname',
  telefon: 'Telefon',
  email: 'E-Mail',
  adresse: 'Adresse',
  bemerkungen: 'Bemerkungen',
} as const;
type TLabels = keyof typeof FIELDS;
type TRequiredField = Exclude<TLabels, 'bemerkungen'>;

const types = {
  email: 'email',
  telefon: 'tel',
  default: 'text',
};

const getFieldLabel = (name: TLabels) => FIELDS[name] || name;
const getInputType = (name: TLabels): string =>
  types[name as keyof typeof types] || types.default;
