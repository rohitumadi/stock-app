"use client";
import { useMemo, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import countryList from "react-select-country-list";
import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

// Function to get country flag emoji from country code
const getCountryFlag = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// Enhanced country option type with flag
type CountryOption = {
  value: string;
  label: string;
  flag: string;
};

const CountrySelectField = ({
  name,
  label,
  control,
  required,
}: CountrySelectProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const options = useMemo(() => {
    const countryData = countryList().getData();
    return countryData.map(
      (country): CountryOption => ({
        ...country,
        flag: getCountryFlag(country.value),
      })
    );
  }, []);

  const changeHandler = (selectedValue: string) => {
    setValue(selectedValue === value ? "" : selectedValue);
    setOpen(false);
  };

  const selectedCountry = options.find((option) => option.value === value);

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `Please select ${label}` : false }}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              >
                <div className="flex items-center gap-2">
                  {selectedCountry && (
                    <span className="text-lg">{selectedCountry.flag}</span>
                  )}
                  <span>
                    {selectedCountry
                      ? selectedCountry.label
                      : "Select country..."}
                  </span>
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-gray-800 border-gray-600">
              <Command>
                <CommandInput
                  placeholder="Search country..."
                  className="bg-gray-800 text-white border-gray-600"
                />
                <CommandList className="max-h-[200px]">
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={() => {
                          changeHandler(option.value);
                          field.onChange(option.value);
                        }}
                        className="text-white hover:bg-gray-700"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="mr-2 text-lg">{option.flag}</span>
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
};
export default CountrySelectField;
