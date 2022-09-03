import {FC} from 'react';
import {observer} from 'mobx-react';
import {roomStore, userStore} from '../../../stores';
import {Button} from '../../../components';
import {ISeat} from '../../../types';
import {SeatTableHeadline} from './SeatTableHeadline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import deskImg from '../../../static/images/desk.jpg'

interface Props {
    seat: ISeat;
    isDisabled: boolean;
    isSeatAvailable?: boolean;
    buttonText: string;
}

export const SeatTableCard: FC<Props> = observer(({seat, isDisabled, isSeatAvailable, buttonText}) => {
    const {toggleSeatAvailability, removeSeat, changeSeatField} = roomStore;
    const {isAdmin} = userStore;
    const seatId = seat.id;
    return (
        (
            <Card sx={{ maxWidth: 345, margin: 3}} key={seat.id}>
                <CardMedia
                    component="img"
                    height="140"
                    image={deskImg}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <SeatTableHeadline onChange={(value: string) => changeSeatField(seatId, 'name', value)} value={seat.name}/>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Reserve this desk office
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => toggleSeatAvailability(seatId)}
                        disabled={isDisabled}
                        className={isSeatAvailable ? 'bg-green-600' : 'bg-red-700'}
                    >
                        {buttonText}
                    </Button>
                    {isAdmin() && (
                            <Button
                                className={'bg-red-700'}
                                onClick={() => removeSeat(seatId)}>
                                {'Remove'}
                            </Button>)}
                </CardActions>
            </Card>

        //     {/*<td>*/}
        //     {/*    <Button*/}
        //     {/*        onClick={() => toggleSeatAvailability(seatId)}*/}
        //     {/*        disabled={isDisabled}*/}
        //     {/*        className={isSeatAvailable ? 'bg-green-600' : 'bg-red-700'}*/}
        //     {/*    >*/}
        //     {/*        {buttonText}*/}
        //     {/*    </Button>*/}
        //     {/*</td>*/}
        //     {/*{isAdmin() && (*/}
        //     {/*    <td>*/}
        //     {/*        <Button*/}
        //     {/*            className={'bg-red-700'}*/}
        //     {/*            onClick={() => removeSeat(seatId)}>*/}
        //     {/*            {'Remove'}*/}
        //     {/*        </Button>*/}
        //     {/*    </td>*/}
        //     {/*)}*/}

    ));
});