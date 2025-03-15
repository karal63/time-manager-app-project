import { create } from "zustand";

export const useTimeRangeStore = create((set, get) => ({
    popup: {
        isOpen: false,
        message: "",
    },
    setPopup: (value, message) =>
        set(() => ({
            popup: {
                isOpen: value,
                message: message,
            },
        })),
    isPopupOpen: false,
    togglePopup: (value) =>
        set((state) => ({
            popup: { ...state.popup, isOpen: (state.isPopupOpen = value) },
        })),

    // Mode Switcher
    currentMode: "Editing",
    setCurrentMode: (value) =>
        set(() => ({
            currentMode: value,
        })),

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
            name: "Morning routine",
            desc: "Studies show that the first 30 minutes of your morning can set the tone for the entire day.",
            timeStart: "07:00",
            timeEnd: "08:00",
            locked: false,
        },
        {
            id: 2,
            name: "Breakfast",
            desc: "A balanced breakfast stabilizes blood sugar levels.",
            timeStart: "08:00",
            timeEnd: "08:30",
            locked: false,
        },
        {
            id: 3,
            name: "Work",
            desc: "Working on projects, collaborating with teammates, realizing ideas.",
            timeStart: "10:00",
            timeEnd: "16:00",
            locked: false,
        },
        {
            id: 4,
            name: "Meeting with team",
            desc: "Discussing our goals, promotions and generally current situation.",
            timeStart: "12:00",
            timeEnd: "13:30",
            locked: false,
        },
        {
            id: 5,
            name: "Relaxation",
            desc: "Eating, talking to loved ones",
            timeStart: "16:30",
            timeEnd: "17:30",
            locked: false,
        },
        {
            id: 6,
            name: "Workout",
            desc: "Consistency is key for fitness results.",
            timeStart: "18:00",
            timeEnd: "20:00",
            locked: false,
        },
        {
            id: 7,
            name: "Rest & Refuel",
            desc: "",
            timeStart: "20:00",
            timeEnd: "21:00",
            locked: false,
        },
        {
            id: 8,
            name: "Preparing for sleep",
            desc: "Consistency is key for fitness results.",
            timeStart: "21:00",
            timeEnd: "22:00",
            locked: false,
        },
    ],

    getNextId: (items) => {
        return items.length > 0
            ? Math.max(...items.map((item) => item.id)) + 1
            : 1;
    },

    addTimeRange: (timeRange) =>
        set((state) => {
            const newTimeRange = {
                ...timeRange,
                id: get().getNextId(state.timeRanges),
                locked: false,
            };

            const newTimeRanges = [...state.timeRanges, newTimeRange];
            state.saveTimeRangesToLocalStorage(newTimeRanges);

            return { timeRanges: newTimeRanges };
        }),

    deletedTimeRange: null,
    setDeletedTimeRange: (range) => set(() => ({ deletedTimeRange: range })),

    deleteTimeRange: (range) =>
        set((state) => {
            const newTimeRanges = state.timeRanges.filter(
                (timeRange) => timeRange.id !== range.id
            );

            state.saveTimeRangesToLocalStorage(newTimeRanges);

            return {
                deletedTimeRange: range,
                timeRanges: newTimeRanges,
            };
        }),

    editTimeRange: (range) =>
        set((state) => {
            const { id, name, desc, timeStart, timeEnd } = range;

            const newTimeRanges = state.timeRanges.map((el) => {
                if (el.id === id) {
                    return {
                        ...el,
                        name,
                        desc,
                        timeStart,
                        timeEnd,
                    };
                }
                return el;
            });

            state.saveTimeRangesToLocalStorage(newTimeRanges);

            return {
                timeRanges: newTimeRanges,
            };
        }),

    setIsLockedRange: (range, value) =>
        set((state) => {
            const newTimeRanges = state.timeRanges.map((el) => {
                if (range.id === el.id) {
                    return {
                        ...el,
                        locked: value,
                    };
                }
                return el;
            });

            state.saveTimeRangesToLocalStorage(newTimeRanges);

            return {
                timeRanges: newTimeRanges,
            };
        }),

    plannerZoneRef: null,
    setPlannerZoneRef: (newRef) => set({ plannerZoneRef: newRef }),

    addTimeRangePanelRef: null,
    setAddTimeRangePanelRef: (newRef) => set({ addTimeRangePanelRef: newRef }),

    zoomLevel: 1,
    setZoomLevel: (newZoomLevel) => set({ zoomLevel: newZoomLevel }),

    blockMenuRef: null,
    setBlockMenuRef: (newRef) => set({ blockMenuRef: newRef }),

    timeRangePanel: {
        isOpen: false,
        id: "",
        name: "",
        description: "",
        timeStart: "",
        timeEnd: "",
        type: "Create",
    },
    setTimeRangePanel: (value, type) =>
        set((state) => ({
            timeRangePanel: {
                ...state.timeRangePanel,
                isOpen: value,
                type: type,
            },
        })),

    updateTimeRangePanel: (range) =>
        set((state) => ({
            timeRangePanel: {
                ...state.timeRangePanel,
                id: range.id,
                name: range.name,
                description: range.desc,
                timeStart: range.timeStart,
                timeEnd: range.timeEnd,
            },
        })),

    saveTimeRangesToLocalStorage: (timeRanges) => {
        localStorage.setItem("timeRanges", JSON.stringify(timeRanges));
    },

    getTimeRangesFromLocalStorage: () =>
        set((state) => {
            const newTimeRangesJSON = localStorage.getItem("timeRanges");
            const newTimeRanges = newTimeRangesJSON
                ? JSON.parse(newTimeRangesJSON)
                : state.timeRanges;

            return {
                timeRanges: newTimeRanges,
            };
        }),

    userPreferences: {
        isTimeAxisOpen: true,
        isCurrentRangesOpen: true,
    },

    isCurrentRangesOpen: true,
    setIsCurrentRangesOpen: (value) =>
        set((state) => {
            const userPreferences = {
                isCurrentRangesOpen: value,
                isTimeAxisOpen: state.isTimeAxisOpen,
            };
            state.saveToLocalStorage("userPreferences", userPreferences);
            return {
                isCurrentRangesOpen: value,
            };
        }),

    isTimeAxisOpen: true,
    setIsTimeAxisOpen: (value) =>
        set((state) => {
            const userPreferences = {
                isCurrentRangesOpen: state.isCurrentRangesOpen,
                isTimeAxisOpen: value,
            };
            state.saveToLocalStorage("userPreferences", userPreferences);

            return {
                isTimeAxisOpen: value,
            };
        }),

    initializePreferences: () =>
        set((state) => {
            const preferences = state.returnFromLocalStorage(
                "userPreferences"
            ) || {
                isTimeAxisOpen: true,
                isCurrentRangesOpen: true,
            };

            const { isTimeAxisOpen, isCurrentRangesOpen } = preferences;
            return {
                isTimeAxisOpen: isTimeAxisOpen,
                isCurrentRangesOpen: isCurrentRangesOpen,
            };
        }),

    taskMarks: [
        {
            id: 1,
            name: "Name",
            selected: true,
        },
        {
            id: 2,
            name: "Description",
            selected: true,
        },
        {
            id: 3,
            name: "Duration",
            selected: false,
        },
    ],

    prevTaskMarks: {},

    selectMark: (id, value) =>
        set((state) => {
            const newTaskMarks = state.taskMarks.map((mark) => {
                if (mark.id === id) {
                    return {
                        ...mark,
                        selected: value,
                    };
                }
                return mark;
            });

            return { taskMarks: newTaskMarks };
        }),

    saveToLocalStorage: (name, data) => {
        localStorage.setItem(name, JSON.stringify(data));
    },

    getFromLocalStorage: (key, localStorageKey) =>
        set((state) => {
            const response = localStorage.getItem(localStorageKey);
            const data = response ? JSON.parse(response) : state[key];

            return {
                [key]: data,
            };
        }),

    setPrevTaskMarks: () =>
        set((state) => ({ prevTaskMarks: state.taskMarks })),

    cancelMarks: () => set((state) => ({ taskMarks: state.prevTaskMarks })),

    returnFromLocalStorage: (key) => {
        const response = localStorage.getItem(key);
        return response ? JSON.parse(response) : null;
    },

    achievements: [],

    initializeAchievements: () => {
        const localData = get().returnFromLocalStorage("achievements");

        set({
            achievements: localData || [
                {
                    id: 1,
                    name: "HG hello world",
                    category: "Testing",
                    time: "01:00:00",
                },
                {
                    id: 2,
                    name: "HG creating some new feature",
                    category: "Creating",
                    time: "30:00",
                },
            ],
        });
    },

    currentAchievement: {
        name: "",
        category: "None",
        time: "",
    },

    isRunning: false,

    setIsRunning: (value) =>
        set(() => ({
            isRunning: value,
        })),

    isPaused: false,
    setIsPaused: (value) =>
        set(() => ({
            isPaused: value,
        })),

    seconds: 0,
    minutes: 0,
    hours: 0,
    setSeconds: (prevSeconds) =>
        set(() => ({
            seconds: prevSeconds + 1,
        })),
    setMinutes: (prevMinutes) =>
        set(() => ({
            minutes: prevMinutes + 1,
        })),
    setHours: (prevHours) =>
        set(() => ({
            hours: prevHours + 1,
        })),

    clearTime: () =>
        set(() => ({
            seconds: 0,
            minutes: 0,
            hours: 0,
        })),

    setAchievement: (achievement) =>
        set(() => ({
            currentAchievement: { ...achievement },
        })),

    addAchievement: (achieve) =>
        set((state) => {
            const newAchievements = [
                ...state.achievements,
                {
                    ...achieve,
                    id: get().getNextId(state.achievements),
                },
            ];

            state.saveToLocalStorage("achievements", newAchievements);

            return {
                achievements: newAchievements,
            };
        }),

    selectedAchievements: [],

    selectAchievement: (isSelected, achieve) =>
        set((state) => {
            const newSelectedAchievements = isSelected
                ? [...state.selectedAchievements, achieve]
                : state.selectedAchievements.filter(
                      (el) => el.id !== achieve.id
                  );

            return {
                selectedAchievements: newSelectedAchievements,
            };
        }),

    deleteSelectedAchievements: () =>
        set((state) => {
            const newAchievements = state.achievements.filter(
                (achieve) =>
                    !state.selectedAchievements.some(
                        (selected) => selected.id === achieve.id
                    )
            );

            state.saveToLocalStorage("achievements", newAchievements);

            return {
                achievements: newAchievements,
                selectedAchievements: [],
            };
        }),

    isEditingAchievements: false,
    enableEditing: () => set(() => ({ isEditingAchievements: true })),
    disableEditing: () => set(() => ({ isEditingAchievements: false })),
    isSavedAchievements: false,
    setIsSavedAchievements: (value) =>
        set(() => ({ isSavedAchievements: value })),

    editAchievement: (id, { name, category, time }) =>
        set((state) => {
            const newAchievements = state.achievements.map((achieve) => {
                if (achieve.id === id) {
                    return {
                        ...achieve,
                        name,
                        category,
                        time,
                    };
                }
                return achieve;
            });

            // Make that when you edit achieve it doesnt in some magic way create additional selected achieve
            // const newSelectedAchievements = state.selectedAchievements.filter(
            //     (el) => el.id !== id
            // );

            state.saveToLocalStorage("achievements", newAchievements);

            return {
                achievements: newAchievements,
                selectedAchievements: state.selectedAchievements,
            };
        }),

    duplicateAchievement: () =>
        set((state) => {
            const achievementCopy = [...state.achievements];
            const newSelectedAchievements = state.selectedAchievements.map(
                (achieve) => {
                    const newAchieve = {
                        ...achieve,
                        id: state.getNextId(achievementCopy),
                        name: achieve.name + " (copy)",
                    };
                    achievementCopy.push(newAchieve);
                    return newAchieve;
                }
            );

            const newAchievements = state.achievements.concat(
                newSelectedAchievements
            );

            state.saveToLocalStorage("achievements", newAchievements);

            return {
                achievements: newAchievements,
            };
        }),

    warningWindow: {
        isOpen: false,
        records: [],
    },

    setWarningWindow: (value) =>
        set((state) => ({
            warningWindow: {
                isOpen: value,
                records: state.selectedAchievements,
            },
        })),

    currentTimeRanges: [],

    setCurrentTimeRanges: (timeRange) =>
        set((state) => {
            // Filter out any existing instance of timeRange.id
            const filteredRanges = state.currentTimeRanges.filter(
                (el) => el.id !== timeRange.id
            );

            return {
                currentTimeRanges: [...filteredRanges, timeRange], // Create new array, avoiding mutation
            };
        }),

    removeCurrentTimeRanges: (timeRange) =>
        set((state) => {
            const newCurrentTimeRanges = state.currentTimeRanges.filter(
                (el) => el.id !== timeRange.id
            );

            return {
                currentTimeRanges: newCurrentTimeRanges,
            };
        }),

    projectName: "",
    setProjectName: (name) => {
        get().saveToLocalStorage("projectName", name); // Save correctly
        set({ projectName: name });
    },

    initializeProjectName: () => {
        const name = get().returnFromLocalStorage("projectName");

        set({
            projectName: name || "Project1",
        });
    },

    // Drag and drop
    draggableAchievement: {},
    setDraggedAchievement: (achieve) =>
        set(() => ({
            draggableAchievement: { ...achieve },
        })),

    isDarkMode: false,
    setIsDarkMode: (value) =>
        set((state) => {
            state.saveToLocalStorage("isDarkMode", value);

            return {
                isDarkMode: value,
            };
        }),

    initializeDarkMode: () => {
        const value = get().returnFromLocalStorage("isDarkMode");

        set({
            isDarkMode: value || false,
        });
    },

    isSidebarOpen: false,
    setIsSidebarOpen: (value) => set(() => ({ isSidebarOpen: value })),
}));
