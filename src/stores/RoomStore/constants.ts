export const schedule1 = {
    '1': {
        isAvailable: true,
    },
    '2': {
        isAvailable: false,
        takenByUserId: '2',
    },
    '3': {
        isAvailable: true,
    },
    '4': {
        isAvailable: false,
        takenByUserId: '3',
    },
    '5': {
        isAvailable: true,
    },
    '6': {
        isAvailable: false,
        takenByUserId: '4',
    },
    '7': {
        isAvailable: true,
    },
};

export const seat1 = {
    id: 'seat-1',
    name: 'Seat 1',
    price: 90,
    schedule: schedule1,
};

export const seat2 = {
    id: 'seat-2',
    name: 'Seat 2',
    price: 110,
    schedule: schedule1,
};

export const seat3 = {
    id: 'seat-3',
    name: 'Seat 3',
    price: 60,
    schedule: schedule1,
};

export const seat4 = {
    id: 'seat-4',
    name: 'Seat 4',
    price: 75,
    schedule: schedule1,
};