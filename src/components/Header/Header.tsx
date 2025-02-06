import { Typography } from "@mui/material";
import FlightIcon from '@mui/icons-material/Flight';


const Header: React.FC = () => {
    return (
        <header className="h-80 bg-[#181a25] py-4  -z-1">
            <div className="border-b-1 border-white flex flex-row gap-2 md:pl-20 pl-10 py-4 items-center">
                <FlightIcon fontSize="medium" sx={{ width: "40px", height: "40px" }}
                    className="bg-orange-300 rounded-full transform rotate-90" />
                <Typography variant="h5" className="uppercase text-white">flight
                    <span className="text-orange-300">-</span>
                    fare</Typography>
            </div>
                    <Typography className="text-white py-6 md:pl-[7%] pl-[5%]" variant="h5">Millions of cheap flights with just one search!</Typography>
        </header>

    )
}

export default Header
