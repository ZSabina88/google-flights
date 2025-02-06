import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';

const TravellerAmount: React.FC<{ traveller: number; setTraveller: (value: number) => void }> = ({ traveller, setTraveller }) => {
    const handleIncrease = () => setTraveller(traveller + 1);
    const handleDecrease = () => {
        if (traveller > 1) setTraveller(traveller - 1);
    };

    return (
        <Dropdown>
            <MenuButton sx={{ width: "100%", height: "56px", fontSize: "18px", paddingX: "5px" }}>
                <span className='mr-2'>{traveller}</span> Traveller
            </MenuButton>
            <Menu sx={{ width: "240px", padding: "15px" }}>
                <div className='flex flex-row justify-between'>
                    <p>Adult:</p>
                    <p className='flex flex-row gap-4'>
                        <button className='bg-slate-200 w-6 rounded-sm text-base' onClick={handleDecrease}>
                            -
                        </button>
                        {traveller}
                        <button className='bg-blue-200 w-6 rounded-sm text-base' onClick={handleIncrease}>
                            +
                        </button>
                    </p>
                </div>
            </Menu>
        </Dropdown>
    );
};

export default TravellerAmount;