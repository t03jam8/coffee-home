import { createSwitchNavigator, createAppContainer } from "react-navigation"
import { PoweredWelcomeScreen } from "./WelcomeScreen"
import { PoweredMapScreen } from "./MapScreen/MapScreen"
import { PoweredYieldScreen } from "./YeildScreen"
import { WELCOME_SCREEN, MAP_SCREEN, YEILD_SCREEN } from "./utils/constants"

export const AppNavigation = createSwitchNavigator(
  {
    [WELCOME_SCREEN]: {
      screen: PoweredWelcomeScreen
    },
    [MAP_SCREEN]: {
      screen: PoweredMapScreen
    },
    [YEILD_SCREEN]: {
      screen: PoweredYieldScreen
    }
  },
  { initialRouteName: WELCOME_SCREEN }
)

export const MainNavigation = createAppContainer(AppNavigation)
