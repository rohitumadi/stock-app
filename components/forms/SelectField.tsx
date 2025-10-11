import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectField = ({
  name,
  label,
  control,
  required=false,
  placeholder,
  options,
  error,
}: SelectFieldProps) => {
  return <div className="space-y-2">
    <Label htmlFor={name} className="form-label">
      {label}
    </Label>
    <Controller
      name={name}
      control={control}
      rules={{ required: required?`Please select ${label}`: false }}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
        <SelectTrigger className="select-trigger">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-600 text-white
        ">
          {options.map((option) => (
            <SelectItem className="focus:bg-gray-700 focus:text-white" key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
        {error && <p className="text-sm text-red-500">{error.message}</p>}
      </Select>
      )}
    />
  </div>;
};
export default SelectField;
