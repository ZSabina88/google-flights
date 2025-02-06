import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

const DatePickerInput: React.FC<{
    name: string,
    value?: any,
    label: string,
    onChange: (date: Dayjs | null) => void
}> =
    ({
        name,
        value,
        label,
        onChange
    }) => {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{ width: "100%" }}
                    name={name}
                    value={value}
                    onChange={onChange}
                    label= {label}
                />
            </LocalizationProvider>
        )
    }

export default DatePickerInput;
