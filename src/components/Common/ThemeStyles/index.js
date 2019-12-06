import * as colors from '../../../constants/colors';
export const lightTheme = {
    screenTitleText: {
        color: colors.black
    },
    titleText: {
        color: colors.black
    },
    settingLabel: {
        color: colors.black
    },
    contentContainer: {
        backgroundColor: '#ffffffdd'
    }
}

export const darkTheme = {
    screenTitleText: {
        color: colors.white
    },
    titleText: {
       color: colors.white,
    }, 
    settingLabel: {
        color: colors.white
    },
    contentContainer: {
        backgroundColor: '#000000cc'
    }
}

export const commonStyle = {
    screenTitleContainer: {
        width: '100%',
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenTitleText: {
        fontSize: 22,
        lineHeight: 24,
        fontWeight: '700'
    },
    contentContainer: {
        width: '90%',
        height: '100%',
        paddingHorizontal: 20,
    },
    titleContainer: {
        marginTop: 20,
        marginBottom: 10,
    },
    titleText: {
        fontSize: 18,
        lineHeight: 20,
    },
    settingLabel: {
        marginVertical: 10
    },
    slider: {
        width: 200
    },
    settingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonContainer: {
        width: 180,
        height: 40,
        marginVertical: 10
    },
    buttonTouch: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.mainContrast,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        lineHeight: 20,
        color: colors.white,
    }


}