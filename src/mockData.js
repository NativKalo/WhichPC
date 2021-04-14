export default {
    questions: [
        {
            title: "Budget",
            type: "range",
            defaultMinValue: 1500,
            defaultMaxValue: 3500,
            maxValue: 5000,
            minValue: 0,
        },
        {
            title: "What for",
            type: "multiple select",
            options: [
                { name: "Internet", icon: "wifi-router" },
                { name: "Movies", icon: "wifi-router" },
                { name: "Office", icon: "wifi-router" },
                { name: "Code", icon: "wifi-router" },
                { name: "Gaming", icon: "wifi-router" },
                { name: "Gaming+", icon: "wifi-router" },
                { name: "Studying", icon: "wifi-router" },
                { name: "Editing", icon: "wifi-router" },
            ],
        },
        {
            title: "PC Type",
            type: "multiple select",
            options: [
                { name: "Laptop", icon: "wifi-router" },
                { name: "Standalone", icon: "wifi-router" },
            ],
        },
        {
            title: "Size",
            type: "multiple select",
            options: [
                { name: "Small", icon: "wifi-router" },
                { name: "Medium", icon: "wifi-router" },
                { name: "Large", icon: "wifi-router" },
                { name: "Very Large", icon: "wifi-router" },
            ],
        },
    ],
};
