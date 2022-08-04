import { Dimensions } from 'react-native'
// import Config from 'react-native-config'

export default Constant = {
    baseURL: 'https://best-manga-anime-wallpapers.p.rapidapi.com/',
    screen: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    screenName: {
        TabBarNavigation: 'TabBarNavigation',
        Home: 'Home',
        RootNavigation: 'RootNavigation'
    },
    color: {
        green: '#3FC44E',
        blue: '#4C9EEB',
        link: '#3168FF',
        grayText: '#92929D',
        grayBackground: '#92929D',
        separator: '#d1d1d1',
        text: '#fff',
        buttonPrimary: '#00CEFF',
        plusPoint: '#3FC44E',
        minusPoint: '#4C4C4C',
        placeholder: '#E2E2E2',
        yellow: '#FFB02A',
        backgroundColor: '#141416',
        whiteText: '#ffffff',
        whiteBackground: '#ffffff',
        heart: '#ad1c2a',
        grayBG: '#2E2E2E'
    },
    keys: {
        currentUser: 'currentUser'
    },
    icons: {},
    fonts: {
        poppinsBold: 'Poppins-Bold',
        poppinsMedium: 'Poppins-Medium',
        poppinsRegular: 'Poppins-Regular',
        poppinsThin: 'Poppins-Thin',
        poppinsLight: 'Poppins-Light',
        poppinsSemiBold: 'Poppins-SemiBold'
    },
    dateFormatter: {
        ddMMHHmm: 'dd/MM HH:mm',
        ddMMyyyyHHmm: 'dd/MM/yyyy HH:mm',
        yyyyMMddHHmm: 'yyyy-MM-dd HH:mm'
    },
    categories: ['waifu', 'neko', 'shinobu', 'megumin']
}
