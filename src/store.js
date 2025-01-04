import { create } from "zustand";

export const useTimeRangeStore = create((set) => ({
    isPopupOpen: false,
    togglePopup: (value) =>
        set((state) => ({ isPopupOpen: (state.isPopupOpen = value) })),

    dayStructure: [
        {
            id: 0,
            time: "01:00",
        },
        {
            id: 1,
            time: "02:00",
        },
        {
            id: 2,
            time: "03:00",
        },
        {
            id: 3,
            time: "04:00",
        },
        {
            id: 4,
            time: "05:00",
        },
        {
            id: 5,
            time: "06:00",
        },
        {
            id: 6,
            time: "07:00",
        },
        {
            id: 7,
            time: "08:00",
        },
        {
            id: 8,
            time: "09:00",
        },
        {
            id: 9,
            time: "10:00",
        },
        {
            id: 10,
            time: "11:00",
        },
        {
            id: 11,
            time: "12:00",
        },
        {
            id: 12,
            time: "13:00",
        },
        {
            id: 13,
            time: "14:00",
        },
        {
            id: 14,
            time: "15:00",
        },
        {
            id: 15,
            time: "16:00",
        },
        {
            id: 16,
            time: "17:00",
        },
        {
            id: 17,
            time: "18:00",
        },
        {
            id: 18,
            time: "19:00",
        },
        {
            id: 19,
            time: "20:00",
        },
        {
            id: 20,
            time: "21:00",
        },
        {
            id: 21,
            time: "22:00",
        },
        {
            id: 22,
            time: "23:00",
        },
        {
            id: 23,
            time: "00:00",
        },
    ],

    setRangePosition: (mark) =>
        set((state) => {
            let updatedDayStructure = [...state.dayStructure];

            const updatedStructure = updatedDayStructure.map((day) => {
                if (day.id === mark.id) {
                    // Update the position values with the new ones
                    return {
                        ...day,
                        positionX: mark.positionX,
                        positionY: mark.positionY,
                    };
                }
                return day;
            });

            return { dayStructure: updatedStructure };
        }),

    timeRanges: [
        {
            id: 1,
            name: "work",
            desc: "1233213123123123213",
            timeStart: "13:00",
            timeEnd: "14:00",
            duration: "",
        },
    ],

    addTimeRange: (timeRange) =>
        set((state) => ({ timeRanges: [...state.timeRanges, timeRange] })),

    plannerZoneRef: null,

    setPlannerZoneRef: (newRef) => set({ plannerZoneRef: newRef }),

    zoomLevel: null,
    setNewZoomLevel: (newZoomLevel) => set({ zoomLevel: newZoomLevel }),
}));
