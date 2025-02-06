import { Grid2, TextField, InputAdornment, } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ChangeEvent } from "react";

interface InputProps {
    label: string,
    name: string,
    value: string,
    airports: React.ReactNode,
    inputRef: any,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const CityInput: React.FC<InputProps> = ({ label, name, handleChange, value, airports, inputRef }) => {
    return (
        <Grid2 sx={{ position: "relative" }} size={{ lg: 3, md: 6, sm: 12, xs: 12 }}>
            <TextField
                required
                inputRef={inputRef}
                type="text"
                label={label}
                name={name}
                value={value}
                placeholder={label}
                onChange={handleChange}
                variant="outlined"
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">
                            <LocationOnIcon />
                        </InputAdornment>,
                    }
                }}
                sx={{ width: "100%" }}
            ></TextField>
            {value !== "" && <>{airports}</>}
        </Grid2>
    )
}

export default CityInput
