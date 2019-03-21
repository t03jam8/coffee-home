import React, { FunctionComponent } from "react"
import { Container, View } from "native-base"
import { withNavigation } from "react-navigation"
import { NavigationProps } from "../../types"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import {
  SystemContent,
  SystemAbsolute,
  SystemFlex
} from "../../system-components"
import {
  SET_PARAMETERS_SCREEN,
  YIELD,
  MODEL_RESULTS_SCREEN,
  OPTIMIZE
} from "../../utils/constants"
import { observer } from "mobx-react"
import { compose, lifecycle, withProps } from "recompose"
import { StatusBar } from "react-native"
import { Store } from "./Store"
import { AnimatedMapMarker } from "./components/MapMarker"
import BurgerIcon from "../../assets/BurgerIcon/BurgerIcon"
import { IconPlus } from "../../assets/IconPlus/IconPlus"
import {
  selectPercentageHeight,
  selectPercentageWidth,
  selectPrimary,
  selectThird
} from "../../utils/selectors"
import { CloseIcon } from "../../assets/"
import { SAVE_DATA_LOCALLY } from "../../utils/constants"
import { AsyncStorage, Alert } from "react-native"
import { theme } from "../../system-components/system-theme/theme"
import NavigationServices from "../../utils/NavigationServices"
import { demoStore, IDataAddition } from "../../store/demoStore"
import { SystemTouch } from "../../system-components/SystemTouch"

const power = compose<any, any>(
  withNavigation,
  lifecycle({
    async componentDidMount() {
      const getPoints = async () => {
        return await AsyncStorage.getItem(SAVE_DATA_LOCALLY)
      }

      const savedPoints = await getPoints()
      this.setState({ savedPoints: JSON.parse(savedPoints!) })
    }
  }),
  withProps({
    store: new Store()
  }),
  observer
)

const Map = ({
  store,
  selectPoint
}: {
  store: Store
  selectPoint: boolean
}) => {
  const { handlePointLocation, pointLocation } = store
  return (
    <>
      <MapView
        showsUserLocation={true}
        mapType="hybrid"
        showsCompass={true}
        showsScale={true}
        provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height: "100%" }}
        onRegionChange={handlePointLocation}
      >
        {demoStore.savedPoints.map((point: IDataAddition, i: number) => {
          return (
            <Marker
              key={i}
              zIndex={99}
              coordinate={{ latitude: point.lat, longitude: point.lng }}
              onPress={() => {
                Alert.alert(point.pointName, " would you like to...", [
                  {
                    text: "Calculate yield",
                    onPress: () =>
                      NavigationServices.navigate(MODEL_RESULTS_SCREEN, {
                        point,
                        type: YIELD
                      })
                  },
                  {
                    text: "Optimize shade",
                    onPress: () =>
                      NavigationServices.navigate(MODEL_RESULTS_SCREEN, {
                        point,
                        type: OPTIMIZE
                      })
                  },
                  { text: "Cancel", style: "destructive" }
                ])
              }}
            >
              <View
                style={{
                  backgroundColor: selectThird({ theme: theme }),
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  borderWidth: 1.5,
                  borderColor: "white"
                }}
              />
            </Marker>
          )
        })}
      </MapView>
      {selectPoint && (
        <SystemAbsolute bottom={0} left={0}>
          <View
            style={{
              width: selectPercentageWidth({ percent: 1 }),
              height: 100
            }}
          >
            <SystemFlex justify="center" align="center">
              <SystemTouch
                onPress={() => {
                  demoStore.handleUpdateCoordinates({
                    coordinates: {
                      lat: pointLocation.latitude,
                      lng: pointLocation.longitude
                    }
                  })
                  NavigationServices.navigate(SET_PARAMETERS_SCREEN, {})
                }}
              >
                <IconPlus />
              </SystemTouch>
            </SystemFlex>
          </View>
        </SystemAbsolute>
      )}
    </>
  )
}

const PoweredMap = power(Map)

export const MapScreen: FunctionComponent<NavigationProps & any> = ({
  navigation
}) => {
  const selectPoint = navigation.getParam("selectPoint")

  return (
    <Container>
      <StatusBar backgroundColor="transparent" />
      <SystemContent fill>
        {!selectPoint && <BurgerIcon />}
        {selectPoint && <CloseIcon />}
        <PoweredMap selectPoint={selectPoint} />

        {selectPoint && (
          <SystemAbsolute
            left={selectPercentageWidth({ percent: 0.5 }) - 40}
            bottom={selectPercentageHeight({ percent: 0.5 }) - 40}
          >
            <AnimatedMapMarker maxDimention={80} color={selectPrimary} />
          </SystemAbsolute>
        )}
      </SystemContent>
    </Container>
  )
}

export const PoweredMapScreen = MapScreen
