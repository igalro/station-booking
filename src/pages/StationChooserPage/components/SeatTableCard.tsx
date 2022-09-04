import {FC} from 'react';
import {observer} from 'mobx-react';
import {roomStore, userActionsStore, userStore} from '../../../stores';
import {Button} from '../../../components';
import {ISeat} from '../../../types';
import {SeatTableHeadline} from './SeatTableHeadline';
import {Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import deskImg from '../../../assets/images/desk.jpg'

interface Props {
    seat: ISeat;
}

export const SeatTableCard: FC<Props> = observer(({seat}) => {
    const {toggleSeatAvailability, removeSeat, changeSeatField} = roomStore;
    const {user, isAdmin} = userStore;
    const {daySelected} = userActionsStore;

    const takenBy = seat.schedule?.[daySelected];
    const isSeatAvailable = !takenBy;
    const isTakenByCurrentUser = takenBy === user?.id || isAdmin();
    const isDisabled = takenBy && !isTakenByCurrentUser;
    const buttonText = (() => {
        if (isSeatAvailable) return 'Reserve';
        if (isTakenByCurrentUser) return 'Reserved';
        return 'Not available';
    })();

    return (
        (
            <Card sx={{maxWidth: 345, margin: 3}} key={seat.id}>
                <CardMedia
                    component="img"
                    height="140"
                    image={deskImg}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <SeatTableHeadline onChange={(value: string) => changeSeatField(seat.id, 'name', value)}
                                           value={seat.name}/>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Reserve this desk office
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => toggleSeatAvailability(seat)}
                        disabled={isDisabled}
                        className={isSeatAvailable ? 'bg-green-600' : 'bg-red-700'}
                    >
                        {buttonText}
                    </Button>
                    {isAdmin() && (
                        <Button
                            className={'bg-red-700'}
                            onClick={() => removeSeat(seat.id)}>
                            {'Remove'}
                        </Button>)}
                </CardActions>
            </Card>
        ));
});