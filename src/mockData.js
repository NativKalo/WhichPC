import landingBackground from './media/stockPhone1.jpg'
import frontCamera from './media/stockPhone2.jpg'
import selfies from './media/stockPhone3.jpg'
import battery from './media/stockPhone4.jpg'
import mobileGames from './media/stockPhone5.jpg'
import apple from './media/stockPhone6.jpg'


export default {

    questions: [
        {
            title: "Price Range",
            type: "range",
            defaultMinValue: 1500,
            defaultMaxValue: 3500,
            maxValue: 5000,
            minValue: 0,
            bg: landingBackground
        },
        {
            title: "How important is the Front Camera To you?",
            type: "multi",
            options: [
                { name: "Very Important", icon: "wifi-router" },
                { name: "Required", icon: "wifi-router" },
                { name: "Irrelevant", icon: "wifi-router" },
            ],
            bg: frontCamera


        },
        {
            title: "How important are Selfies To you?",
            type: "multi",
            options: [
                { name: "Very Important", icon: "wifi-router" },
                { name: "Required", icon: "wifi-router" },
                { name: "Irrelevant", icon: "wifi-router" },
            ],
            bg: selfies

        },
        {
            title: "How important is the Battery Capacity To you?",
            type: "multi",
            options: [
                { name: "Very Important", icon: "wifi-router" },
                { name: "Required", icon: "wifi-router" },
                { name: "Irrelevant", icon: "wifi-router" },
            ],
            bg: battery

        },
        {
            title: "Are Mobile Games important to you?",
            type: "multi",
            options: [
                { name: "Very Important", icon: "wifi-router" },
                { name: "Required", icon: "wifi-router" },
                { name: "Irrelevant", icon: "wifi-router" },
            ],
            bg: mobileGames

        },
        {
            title: "do you prefer IPhones over other products",
            type: "multi",
            options: [
                { name: "A Must", icon: "wifi-router" },
                { name: "Irrelevant", icon: "wifi-router" },
                { name: "No Apple", icon: "wifi-router" },
            ],
            bg: apple

        },
    ],
};
